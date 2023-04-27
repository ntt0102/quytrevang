(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/devextreme-vue/chart.js":
/*!**********************************************!*\
  !*** ./node_modules/devextreme-vue/chart.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * devextreme-vue
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
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
exports.DxLegendTitle = exports.DxLegend = exports.DxLabel = exports.DxImage = exports.DxHoverStyle = exports.DxHorizontalLineLabel = exports.DxHorizontalLine = exports.DxHeight = exports.DxHatching = exports.DxGrid = exports.DxFormat = exports.DxFont = exports.DxExport = exports.DxDragBoxStyle = exports.DxDataPrepareSettings = exports.DxCrosshair = exports.DxConstantLineStyle = exports.DxConstantLineLabel = exports.DxConstantLine = exports.DxConnector = exports.DxCommonSeriesSettingsSelectionStyle = exports.DxCommonSeriesSettingsLabel = exports.DxCommonSeriesSettingsHoverStyle = exports.DxCommonSeriesSettings = exports.DxCommonPaneSettings = exports.DxCommonAxisSettingsTitle = exports.DxCommonAxisSettingsLabel = exports.DxCommonAxisSettingsConstantLineStyleLabel = exports.DxCommonAxisSettingsConstantLineStyle = exports.DxCommonAxisSettings = exports.DxCommonAnnotationSettings = exports.DxChartTitleSubtitle = exports.DxChartTitle = exports.DxBreakStyle = exports.DxBreak = exports.DxBorder = exports.DxAxisTitle = exports.DxAxisLabel = exports.DxAxisConstantLineStyleLabel = exports.DxAxisConstantLineStyle = exports.DxArgumentFormat = exports.DxArgumentAxis = exports.DxAnnotationImage = exports.DxAnnotationBorder = exports.DxAnnotation = exports.DxAnimation = exports.DxAggregationInterval = exports.DxAggregation = exports.DxAdaptiveLayout = exports.DxChart = void 0;
exports.DxZoomAndPan = exports.DxWidth = exports.DxWholeRange = exports.DxVisualRange = exports.DxVerticalLine = exports.DxValueErrorBar = exports.DxValueAxis = exports.DxUrl = exports.DxTooltipBorder = exports.DxTooltip = exports.DxTitle = exports.DxTickInterval = exports.DxTick = exports.DxSubtitle = exports.DxStripStyleLabel = exports.DxStripStyle = exports.DxStripLabel = exports.DxStrip = exports.DxSize = exports.DxShadow = exports.DxSeriesTemplate = exports.DxSeriesBorder = exports.DxSeries = exports.DxSelectionStyle = exports.DxScrollBar = exports.DxReduction = exports.DxPointSelectionStyle = exports.DxPointImage = exports.DxPointHoverStyle = exports.DxPointBorder = exports.DxPoint = exports.DxPaneBorder = exports.DxPane = exports.DxMinVisualRangeLength = exports.DxMinorTickInterval = exports.DxMinorTick = exports.DxMinorGrid = exports.DxMargin = exports.DxLoadingIndicator = exports.DxLength = exports.DxLegendTitleSubtitle = void 0;
var chart_1 = __importDefault(__webpack_require__(/*! devextreme/viz/chart */ "./node_modules/devextreme/esm/viz/chart.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxChart = index_1.createComponent({
    props: {
        adaptiveLayout: Object,
        adjustOnZoom: Boolean,
        animation: [Boolean, Object],
        annotations: Array,
        argumentAxis: Object,
        autoHidePointMarkers: Boolean,
        barGroupPadding: Number,
        barGroupWidth: Number,
        commonAnnotationSettings: Object,
        commonAxisSettings: Object,
        commonPaneSettings: Object,
        commonSeriesSettings: Object,
        containerBackgroundColor: String,
        crosshair: Object,
        customizeAnnotation: Function,
        customizeLabel: Function,
        customizePoint: Function,
        dataPrepareSettings: Object,
        dataSource: {},
        defaultPane: String,
        disabled: Boolean,
        elementAttr: Object,
        export: Object,
        legend: Object,
        loadingIndicator: Object,
        margin: Object,
        maxBubbleSize: Number,
        minBubbleSize: Number,
        negativesAsZeroes: Boolean,
        onArgumentAxisClick: Function,
        onDisposing: Function,
        onDone: Function,
        onDrawn: Function,
        onExported: Function,
        onExporting: Function,
        onFileSaving: Function,
        onIncidentOccurred: Function,
        onInitialized: Function,
        onLegendClick: Function,
        onOptionChanged: Function,
        onPointClick: Function,
        onPointHoverChanged: Function,
        onPointSelectionChanged: Function,
        onSeriesClick: Function,
        onSeriesHoverChanged: Function,
        onSeriesSelectionChanged: Function,
        onTooltipHidden: Function,
        onTooltipShown: Function,
        onZoomEnd: Function,
        onZoomStart: Function,
        palette: [Array, String],
        paletteExtensionMode: String,
        panes: [Array, Object],
        pathModified: Boolean,
        pointSelectionMode: String,
        redrawOnResize: Boolean,
        resizePanesOnZoom: Boolean,
        resolveLabelOverlapping: String,
        rotated: Boolean,
        rtlEnabled: Boolean,
        scrollBar: Object,
        series: [Array, Object],
        seriesSelectionMode: String,
        seriesTemplate: Object,
        size: Object,
        stickyHovering: Boolean,
        synchronizeMultiAxes: Boolean,
        theme: String,
        title: [Object, String],
        tooltip: Object,
        valueAxis: [Array, Object],
        zoomAndPan: Object
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:adaptiveLayout": null,
        "update:adjustOnZoom": null,
        "update:animation": null,
        "update:annotations": null,
        "update:argumentAxis": null,
        "update:autoHidePointMarkers": null,
        "update:barGroupPadding": null,
        "update:barGroupWidth": null,
        "update:commonAnnotationSettings": null,
        "update:commonAxisSettings": null,
        "update:commonPaneSettings": null,
        "update:commonSeriesSettings": null,
        "update:containerBackgroundColor": null,
        "update:crosshair": null,
        "update:customizeAnnotation": null,
        "update:customizeLabel": null,
        "update:customizePoint": null,
        "update:dataPrepareSettings": null,
        "update:dataSource": null,
        "update:defaultPane": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:export": null,
        "update:legend": null,
        "update:loadingIndicator": null,
        "update:margin": null,
        "update:maxBubbleSize": null,
        "update:minBubbleSize": null,
        "update:negativesAsZeroes": null,
        "update:onArgumentAxisClick": null,
        "update:onDisposing": null,
        "update:onDone": null,
        "update:onDrawn": null,
        "update:onExported": null,
        "update:onExporting": null,
        "update:onFileSaving": null,
        "update:onIncidentOccurred": null,
        "update:onInitialized": null,
        "update:onLegendClick": null,
        "update:onOptionChanged": null,
        "update:onPointClick": null,
        "update:onPointHoverChanged": null,
        "update:onPointSelectionChanged": null,
        "update:onSeriesClick": null,
        "update:onSeriesHoverChanged": null,
        "update:onSeriesSelectionChanged": null,
        "update:onTooltipHidden": null,
        "update:onTooltipShown": null,
        "update:onZoomEnd": null,
        "update:onZoomStart": null,
        "update:palette": null,
        "update:paletteExtensionMode": null,
        "update:panes": null,
        "update:pathModified": null,
        "update:pointSelectionMode": null,
        "update:redrawOnResize": null,
        "update:resizePanesOnZoom": null,
        "update:resolveLabelOverlapping": null,
        "update:rotated": null,
        "update:rtlEnabled": null,
        "update:scrollBar": null,
        "update:series": null,
        "update:seriesSelectionMode": null,
        "update:seriesTemplate": null,
        "update:size": null,
        "update:stickyHovering": null,
        "update:synchronizeMultiAxes": null,
        "update:theme": null,
        "update:title": null,
        "update:tooltip": null,
        "update:valueAxis": null,
        "update:zoomAndPan": null,
    },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = chart_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            adaptiveLayout: { isCollectionItem: false, optionName: "adaptiveLayout" },
            animation: { isCollectionItem: false, optionName: "animation" },
            annotation: { isCollectionItem: true, optionName: "annotations" },
            argumentAxis: { isCollectionItem: false, optionName: "argumentAxis" },
            chartTitle: { isCollectionItem: false, optionName: "title" },
            commonAnnotationSettings: { isCollectionItem: false, optionName: "commonAnnotationSettings" },
            commonAxisSettings: { isCollectionItem: false, optionName: "commonAxisSettings" },
            commonPaneSettings: { isCollectionItem: false, optionName: "commonPaneSettings" },
            commonSeriesSettings: { isCollectionItem: false, optionName: "commonSeriesSettings" },
            crosshair: { isCollectionItem: false, optionName: "crosshair" },
            dataPrepareSettings: { isCollectionItem: false, optionName: "dataPrepareSettings" },
            export: { isCollectionItem: false, optionName: "export" },
            legend: { isCollectionItem: false, optionName: "legend" },
            loadingIndicator: { isCollectionItem: false, optionName: "loadingIndicator" },
            margin: { isCollectionItem: false, optionName: "margin" },
            pane: { isCollectionItem: true, optionName: "panes" },
            scrollBar: { isCollectionItem: false, optionName: "scrollBar" },
            series: { isCollectionItem: true, optionName: "series" },
            seriesTemplate: { isCollectionItem: false, optionName: "seriesTemplate" },
            size: { isCollectionItem: false, optionName: "size" },
            title: { isCollectionItem: false, optionName: "title" },
            tooltip: { isCollectionItem: false, optionName: "tooltip" },
            valueAxis: { isCollectionItem: true, optionName: "valueAxis" },
            zoomAndPan: { isCollectionItem: false, optionName: "zoomAndPan" }
        };
    }
});
exports.DxChart = DxChart;
var DxAdaptiveLayout = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:height": null,
        "update:keepLabels": null,
        "update:width": null,
    },
    props: {
        height: Number,
        keepLabels: Boolean,
        width: Number
    }
});
exports.DxAdaptiveLayout = DxAdaptiveLayout;
DxAdaptiveLayout.$_optionName = "adaptiveLayout";
var DxAggregation = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:calculate": null,
        "update:enabled": null,
        "update:method": null,
    },
    props: {
        calculate: Function,
        enabled: Boolean,
        method: String
    }
});
exports.DxAggregation = DxAggregation;
DxAggregation.$_optionName = "aggregation";
var DxAggregationInterval = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:days": null,
        "update:hours": null,
        "update:milliseconds": null,
        "update:minutes": null,
        "update:months": null,
        "update:quarters": null,
        "update:seconds": null,
        "update:weeks": null,
        "update:years": null,
    },
    props: {
        days: Number,
        hours: Number,
        milliseconds: Number,
        minutes: Number,
        months: Number,
        quarters: Number,
        seconds: Number,
        weeks: Number,
        years: Number
    }
});
exports.DxAggregationInterval = DxAggregationInterval;
DxAggregationInterval.$_optionName = "aggregationInterval";
var DxAnimation = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:duration": null,
        "update:easing": null,
        "update:enabled": null,
        "update:maxPointCountSupported": null,
    },
    props: {
        duration: Number,
        easing: String,
        enabled: Boolean,
        maxPointCountSupported: Number
    }
});
exports.DxAnimation = DxAnimation;
DxAnimation.$_optionName = "animation";
var DxAnnotation = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:allowDragging": null,
        "update:argument": null,
        "update:arrowLength": null,
        "update:arrowWidth": null,
        "update:axis": null,
        "update:border": null,
        "update:color": null,
        "update:customizeTooltip": null,
        "update:data": null,
        "update:description": null,
        "update:font": null,
        "update:height": null,
        "update:image": null,
        "update:name": null,
        "update:offsetX": null,
        "update:offsetY": null,
        "update:opacity": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:series": null,
        "update:shadow": null,
        "update:template": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:tooltipEnabled": null,
        "update:tooltipTemplate": null,
        "update:type": null,
        "update:value": null,
        "update:width": null,
        "update:wordWrap": null,
        "update:x": null,
        "update:y": null,
    },
    props: {
        allowDragging: Boolean,
        argument: {},
        arrowLength: Number,
        arrowWidth: Number,
        axis: String,
        border: Object,
        color: String,
        customizeTooltip: Function,
        data: {},
        description: String,
        font: Object,
        height: Number,
        image: [Object, String],
        name: String,
        offsetX: Number,
        offsetY: Number,
        opacity: Number,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        series: String,
        shadow: Object,
        template: {},
        text: String,
        textOverflow: String,
        tooltipEnabled: Boolean,
        tooltipTemplate: {},
        type: String,
        value: {},
        width: Number,
        wordWrap: String,
        x: Number,
        y: Number
    }
});
exports.DxAnnotation = DxAnnotation;
DxAnnotation.$_optionName = "annotations";
DxAnnotation.$_isCollectionItem = true;
DxAnnotation.$_expectedChildren = {
    annotationBorder: { isCollectionItem: false, optionName: "border" },
    annotationImage: { isCollectionItem: false, optionName: "image" },
    border: { isCollectionItem: false, optionName: "border" },
    font: { isCollectionItem: false, optionName: "font" },
    image: { isCollectionItem: false, optionName: "image" },
    shadow: { isCollectionItem: false, optionName: "shadow" }
};
var DxAnnotationBorder = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:cornerRadius": null,
        "update:dashStyle": null,
        "update:opacity": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        cornerRadius: Number,
        dashStyle: String,
        opacity: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxAnnotationBorder = DxAnnotationBorder;
DxAnnotationBorder.$_optionName = "border";
var DxAnnotationImage = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:height": null,
        "update:url": null,
        "update:width": null,
    },
    props: {
        height: Number,
        url: String,
        width: Number
    }
});
exports.DxAnnotationImage = DxAnnotationImage;
DxAnnotationImage.$_optionName = "image";
var DxArgumentAxis = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:aggregateByCategory": null,
        "update:aggregatedPointsPosition": null,
        "update:aggregationGroupWidth": null,
        "update:aggregationInterval": null,
        "update:allowDecimals": null,
        "update:argumentType": null,
        "update:axisDivisionFactor": null,
        "update:breaks": null,
        "update:breakStyle": null,
        "update:categories": null,
        "update:color": null,
        "update:constantLines": null,
        "update:constantLineStyle": null,
        "update:customPosition": null,
        "update:customPositionAxis": null,
        "update:discreteAxisDivisionMode": null,
        "update:endOnTick": null,
        "update:grid": null,
        "update:holidays": null,
        "update:hoverMode": null,
        "update:inverted": null,
        "update:label": null,
        "update:linearThreshold": null,
        "update:logarithmBase": null,
        "update:maxValueMargin": null,
        "update:minorGrid": null,
        "update:minorTick": null,
        "update:minorTickCount": null,
        "update:minorTickInterval": null,
        "update:minValueMargin": null,
        "update:minVisualRangeLength": null,
        "update:offset": null,
        "update:opacity": null,
        "update:placeholderSize": null,
        "update:position": null,
        "update:singleWorkdays": null,
        "update:strips": null,
        "update:stripStyle": null,
        "update:tick": null,
        "update:tickInterval": null,
        "update:title": null,
        "update:type": null,
        "update:valueMarginsEnabled": null,
        "update:visible": null,
        "update:visualRange": null,
        "update:visualRangeUpdateMode": null,
        "update:wholeRange": null,
        "update:width": null,
        "update:workdaysOnly": null,
        "update:workWeek": null,
    },
    props: {
        aggregateByCategory: Boolean,
        aggregatedPointsPosition: String,
        aggregationGroupWidth: Number,
        aggregationInterval: [Number, Object, String],
        allowDecimals: Boolean,
        argumentType: String,
        axisDivisionFactor: Number,
        breaks: Array,
        breakStyle: Object,
        categories: Array,
        color: String,
        constantLines: Array,
        constantLineStyle: Object,
        customPosition: {},
        customPositionAxis: String,
        discreteAxisDivisionMode: String,
        endOnTick: Boolean,
        grid: Object,
        holidays: Array,
        hoverMode: String,
        inverted: Boolean,
        label: Object,
        linearThreshold: Number,
        logarithmBase: Number,
        maxValueMargin: Number,
        minorGrid: Object,
        minorTick: Object,
        minorTickCount: Number,
        minorTickInterval: [Number, Object, String],
        minValueMargin: Number,
        minVisualRangeLength: [Number, Object, String],
        offset: Number,
        opacity: Number,
        placeholderSize: Number,
        position: String,
        singleWorkdays: Array,
        strips: Array,
        stripStyle: Object,
        tick: Object,
        tickInterval: [Number, Object, String],
        title: [Object, String],
        type: String,
        valueMarginsEnabled: Boolean,
        visible: Boolean,
        visualRange: [Array, Object],
        visualRangeUpdateMode: String,
        wholeRange: [Array, Object],
        width: Number,
        workdaysOnly: Boolean,
        workWeek: Array
    }
});
exports.DxArgumentAxis = DxArgumentAxis;
DxArgumentAxis.$_optionName = "argumentAxis";
DxArgumentAxis.$_expectedChildren = {
    aggregationInterval: { isCollectionItem: false, optionName: "aggregationInterval" },
    axisConstantLineStyle: { isCollectionItem: false, optionName: "constantLineStyle" },
    axisLabel: { isCollectionItem: false, optionName: "label" },
    axisTitle: { isCollectionItem: false, optionName: "title" },
    break: { isCollectionItem: true, optionName: "breaks" },
    breakStyle: { isCollectionItem: false, optionName: "breakStyle" },
    constantLine: { isCollectionItem: true, optionName: "constantLines" },
    constantLineStyle: { isCollectionItem: false, optionName: "constantLineStyle" },
    grid: { isCollectionItem: false, optionName: "grid" },
    label: { isCollectionItem: false, optionName: "label" },
    minorGrid: { isCollectionItem: false, optionName: "minorGrid" },
    minorTick: { isCollectionItem: false, optionName: "minorTick" },
    minorTickInterval: { isCollectionItem: false, optionName: "minorTickInterval" },
    minVisualRangeLength: { isCollectionItem: false, optionName: "minVisualRangeLength" },
    strip: { isCollectionItem: true, optionName: "strips" },
    stripStyle: { isCollectionItem: false, optionName: "stripStyle" },
    tick: { isCollectionItem: false, optionName: "tick" },
    tickInterval: { isCollectionItem: false, optionName: "tickInterval" },
    title: { isCollectionItem: false, optionName: "title" },
    visualRange: { isCollectionItem: false, optionName: "visualRange" },
    wholeRange: { isCollectionItem: false, optionName: "wholeRange" }
};
var DxArgumentFormat = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:currency": null,
        "update:formatter": null,
        "update:parser": null,
        "update:precision": null,
        "update:type": null,
    },
    props: {
        currency: String,
        formatter: Function,
        parser: Function,
        precision: Number,
        type: String
    }
});
exports.DxArgumentFormat = DxArgumentFormat;
DxArgumentFormat.$_optionName = "argumentFormat";
var DxAxisConstantLineStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:label": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        label: Object,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        width: Number
    }
});
exports.DxAxisConstantLineStyle = DxAxisConstantLineStyle;
DxAxisConstantLineStyle.$_optionName = "constantLineStyle";
var DxAxisConstantLineStyleLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:position": null,
        "update:verticalAlignment": null,
        "update:visible": null,
    },
    props: {
        font: Object,
        horizontalAlignment: String,
        position: String,
        verticalAlignment: String,
        visible: Boolean
    }
});
exports.DxAxisConstantLineStyleLabel = DxAxisConstantLineStyleLabel;
DxAxisConstantLineStyleLabel.$_optionName = "label";
var DxAxisLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:customizeHint": null,
        "update:customizeText": null,
        "update:displayMode": null,
        "update:font": null,
        "update:format": null,
        "update:indentFromAxis": null,
        "update:overlappingBehavior": null,
        "update:position": null,
        "update:rotationAngle": null,
        "update:staggeringSpacing": null,
        "update:template": null,
        "update:textOverflow": null,
        "update:visible": null,
        "update:wordWrap": null,
    },
    props: {
        alignment: String,
        customizeHint: Function,
        customizeText: Function,
        displayMode: String,
        font: Object,
        format: [Object, Function, String],
        indentFromAxis: Number,
        overlappingBehavior: String,
        position: String,
        rotationAngle: Number,
        staggeringSpacing: Number,
        template: {},
        textOverflow: String,
        visible: Boolean,
        wordWrap: String
    }
});
exports.DxAxisLabel = DxAxisLabel;
DxAxisLabel.$_optionName = "label";
var DxAxisTitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:font": null,
        "update:margin": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:wordWrap": null,
    },
    props: {
        alignment: String,
        font: Object,
        margin: Number,
        text: String,
        textOverflow: String,
        wordWrap: String
    }
});
exports.DxAxisTitle = DxAxisTitle;
DxAxisTitle.$_optionName = "title";
var DxBorder = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:bottom": null,
        "update:color": null,
        "update:cornerRadius": null,
        "update:dashStyle": null,
        "update:left": null,
        "update:opacity": null,
        "update:right": null,
        "update:top": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        bottom: Boolean,
        color: String,
        cornerRadius: Number,
        dashStyle: String,
        left: Boolean,
        opacity: Number,
        right: Boolean,
        top: Boolean,
        visible: Boolean,
        width: Number
    }
});
exports.DxBorder = DxBorder;
DxBorder.$_optionName = "border";
var DxBreak = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:endValue": null,
        "update:startValue": null,
    },
    props: {
        endValue: {},
        startValue: {}
    }
});
exports.DxBreak = DxBreak;
DxBreak.$_optionName = "breaks";
DxBreak.$_isCollectionItem = true;
var DxBreakStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:line": null,
        "update:width": null,
    },
    props: {
        color: String,
        line: String,
        width: Number
    }
});
exports.DxBreakStyle = DxBreakStyle;
DxBreakStyle.$_optionName = "breakStyle";
var DxChartTitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:margin": null,
        "update:placeholderSize": null,
        "update:subtitle": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:verticalAlignment": null,
        "update:wordWrap": null,
    },
    props: {
        font: Object,
        horizontalAlignment: String,
        margin: [Number, Object],
        placeholderSize: Number,
        subtitle: [Object, String],
        text: String,
        textOverflow: String,
        verticalAlignment: String,
        wordWrap: String
    }
});
exports.DxChartTitle = DxChartTitle;
DxChartTitle.$_optionName = "title";
DxChartTitle.$_expectedChildren = {
    chartTitleSubtitle: { isCollectionItem: false, optionName: "subtitle" },
    font: { isCollectionItem: false, optionName: "font" },
    margin: { isCollectionItem: false, optionName: "margin" },
    subtitle: { isCollectionItem: false, optionName: "subtitle" }
};
var DxChartTitleSubtitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:offset": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:wordWrap": null,
    },
    props: {
        font: Object,
        offset: Number,
        text: String,
        textOverflow: String,
        wordWrap: String
    }
});
exports.DxChartTitleSubtitle = DxChartTitleSubtitle;
DxChartTitleSubtitle.$_optionName = "subtitle";
DxChartTitleSubtitle.$_expectedChildren = {
    font: { isCollectionItem: false, optionName: "font" }
};
var DxCommonAnnotationSettings = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:allowDragging": null,
        "update:argument": null,
        "update:arrowLength": null,
        "update:arrowWidth": null,
        "update:axis": null,
        "update:border": null,
        "update:color": null,
        "update:customizeTooltip": null,
        "update:data": null,
        "update:description": null,
        "update:font": null,
        "update:height": null,
        "update:image": null,
        "update:offsetX": null,
        "update:offsetY": null,
        "update:opacity": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:series": null,
        "update:shadow": null,
        "update:template": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:tooltipEnabled": null,
        "update:tooltipTemplate": null,
        "update:type": null,
        "update:value": null,
        "update:width": null,
        "update:wordWrap": null,
        "update:x": null,
        "update:y": null,
    },
    props: {
        allowDragging: Boolean,
        argument: {},
        arrowLength: Number,
        arrowWidth: Number,
        axis: String,
        border: Object,
        color: String,
        customizeTooltip: Function,
        data: {},
        description: String,
        font: Object,
        height: Number,
        image: [Object, String],
        offsetX: Number,
        offsetY: Number,
        opacity: Number,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        series: String,
        shadow: Object,
        template: {},
        text: String,
        textOverflow: String,
        tooltipEnabled: Boolean,
        tooltipTemplate: {},
        type: String,
        value: {},
        width: Number,
        wordWrap: String,
        x: Number,
        y: Number
    }
});
exports.DxCommonAnnotationSettings = DxCommonAnnotationSettings;
DxCommonAnnotationSettings.$_optionName = "commonAnnotationSettings";
var DxCommonAxisSettings = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:aggregatedPointsPosition": null,
        "update:allowDecimals": null,
        "update:breakStyle": null,
        "update:color": null,
        "update:constantLineStyle": null,
        "update:discreteAxisDivisionMode": null,
        "update:endOnTick": null,
        "update:grid": null,
        "update:inverted": null,
        "update:label": null,
        "update:maxValueMargin": null,
        "update:minorGrid": null,
        "update:minorTick": null,
        "update:minValueMargin": null,
        "update:opacity": null,
        "update:placeholderSize": null,
        "update:stripStyle": null,
        "update:tick": null,
        "update:title": null,
        "update:valueMarginsEnabled": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        aggregatedPointsPosition: String,
        allowDecimals: Boolean,
        breakStyle: Object,
        color: String,
        constantLineStyle: Object,
        discreteAxisDivisionMode: String,
        endOnTick: Boolean,
        grid: Object,
        inverted: Boolean,
        label: Object,
        maxValueMargin: Number,
        minorGrid: Object,
        minorTick: Object,
        minValueMargin: Number,
        opacity: Number,
        placeholderSize: Number,
        stripStyle: Object,
        tick: Object,
        title: Object,
        valueMarginsEnabled: Boolean,
        visible: Boolean,
        width: Number
    }
});
exports.DxCommonAxisSettings = DxCommonAxisSettings;
DxCommonAxisSettings.$_optionName = "commonAxisSettings";
DxCommonAxisSettings.$_expectedChildren = {
    commonAxisSettingsConstantLineStyle: { isCollectionItem: false, optionName: "constantLineStyle" },
    commonAxisSettingsLabel: { isCollectionItem: false, optionName: "label" },
    commonAxisSettingsTitle: { isCollectionItem: false, optionName: "title" },
    constantLineStyle: { isCollectionItem: false, optionName: "constantLineStyle" },
    label: { isCollectionItem: false, optionName: "label" },
    title: { isCollectionItem: false, optionName: "title" }
};
var DxCommonAxisSettingsConstantLineStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:label": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        label: Object,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        width: Number
    }
});
exports.DxCommonAxisSettingsConstantLineStyle = DxCommonAxisSettingsConstantLineStyle;
DxCommonAxisSettingsConstantLineStyle.$_optionName = "constantLineStyle";
DxCommonAxisSettingsConstantLineStyle.$_expectedChildren = {
    commonAxisSettingsConstantLineStyleLabel: { isCollectionItem: false, optionName: "label" },
    label: { isCollectionItem: false, optionName: "label" }
};
var DxCommonAxisSettingsConstantLineStyleLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:position": null,
        "update:visible": null,
    },
    props: {
        font: Object,
        position: String,
        visible: Boolean
    }
});
exports.DxCommonAxisSettingsConstantLineStyleLabel = DxCommonAxisSettingsConstantLineStyleLabel;
DxCommonAxisSettingsConstantLineStyleLabel.$_optionName = "label";
var DxCommonAxisSettingsLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:displayMode": null,
        "update:font": null,
        "update:indentFromAxis": null,
        "update:overlappingBehavior": null,
        "update:position": null,
        "update:rotationAngle": null,
        "update:staggeringSpacing": null,
        "update:template": null,
        "update:textOverflow": null,
        "update:visible": null,
        "update:wordWrap": null,
    },
    props: {
        alignment: String,
        displayMode: String,
        font: Object,
        indentFromAxis: Number,
        overlappingBehavior: String,
        position: String,
        rotationAngle: Number,
        staggeringSpacing: Number,
        template: {},
        textOverflow: String,
        visible: Boolean,
        wordWrap: String
    }
});
exports.DxCommonAxisSettingsLabel = DxCommonAxisSettingsLabel;
DxCommonAxisSettingsLabel.$_optionName = "label";
var DxCommonAxisSettingsTitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:font": null,
        "update:margin": null,
        "update:textOverflow": null,
        "update:wordWrap": null,
    },
    props: {
        alignment: String,
        font: Object,
        margin: Number,
        textOverflow: String,
        wordWrap: String
    }
});
exports.DxCommonAxisSettingsTitle = DxCommonAxisSettingsTitle;
DxCommonAxisSettingsTitle.$_optionName = "title";
var DxCommonPaneSettings = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:backgroundColor": null,
        "update:border": null,
    },
    props: {
        backgroundColor: String,
        border: Object
    }
});
exports.DxCommonPaneSettings = DxCommonPaneSettings;
DxCommonPaneSettings.$_optionName = "commonPaneSettings";
DxCommonPaneSettings.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    paneBorder: { isCollectionItem: false, optionName: "border" }
};
var DxCommonSeriesSettings = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:aggregation": null,
        "update:area": null,
        "update:argumentField": null,
        "update:axis": null,
        "update:bar": null,
        "update:barOverlapGroup": null,
        "update:barPadding": null,
        "update:barWidth": null,
        "update:border": null,
        "update:bubble": null,
        "update:candlestick": null,
        "update:closeValueField": null,
        "update:color": null,
        "update:cornerRadius": null,
        "update:dashStyle": null,
        "update:fullstackedarea": null,
        "update:fullstackedbar": null,
        "update:fullstackedline": null,
        "update:fullstackedspline": null,
        "update:fullstackedsplinearea": null,
        "update:highValueField": null,
        "update:hoverMode": null,
        "update:hoverStyle": null,
        "update:ignoreEmptyPoints": null,
        "update:innerColor": null,
        "update:label": null,
        "update:line": null,
        "update:lowValueField": null,
        "update:maxLabelCount": null,
        "update:minBarSize": null,
        "update:opacity": null,
        "update:openValueField": null,
        "update:pane": null,
        "update:point": null,
        "update:rangearea": null,
        "update:rangebar": null,
        "update:rangeValue1Field": null,
        "update:rangeValue2Field": null,
        "update:reduction": null,
        "update:scatter": null,
        "update:selectionMode": null,
        "update:selectionStyle": null,
        "update:showInLegend": null,
        "update:sizeField": null,
        "update:spline": null,
        "update:splinearea": null,
        "update:stack": null,
        "update:stackedarea": null,
        "update:stackedbar": null,
        "update:stackedline": null,
        "update:stackedspline": null,
        "update:stackedsplinearea": null,
        "update:steparea": null,
        "update:stepline": null,
        "update:stock": null,
        "update:tagField": null,
        "update:type": null,
        "update:valueErrorBar": null,
        "update:valueField": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        aggregation: Object,
        area: {},
        argumentField: String,
        axis: String,
        bar: {},
        barOverlapGroup: String,
        barPadding: Number,
        barWidth: Number,
        border: Object,
        bubble: {},
        candlestick: {},
        closeValueField: String,
        color: String,
        cornerRadius: Number,
        dashStyle: String,
        fullstackedarea: {},
        fullstackedbar: {},
        fullstackedline: {},
        fullstackedspline: {},
        fullstackedsplinearea: {},
        highValueField: String,
        hoverMode: String,
        hoverStyle: Object,
        ignoreEmptyPoints: Boolean,
        innerColor: String,
        label: Object,
        line: {},
        lowValueField: String,
        maxLabelCount: Number,
        minBarSize: Number,
        opacity: Number,
        openValueField: String,
        pane: String,
        point: Object,
        rangearea: {},
        rangebar: {},
        rangeValue1Field: String,
        rangeValue2Field: String,
        reduction: Object,
        scatter: {},
        selectionMode: String,
        selectionStyle: Object,
        showInLegend: Boolean,
        sizeField: String,
        spline: {},
        splinearea: {},
        stack: String,
        stackedarea: {},
        stackedbar: {},
        stackedline: {},
        stackedspline: {},
        stackedsplinearea: {},
        steparea: {},
        stepline: {},
        stock: {},
        tagField: String,
        type: String,
        valueErrorBar: Object,
        valueField: String,
        visible: Boolean,
        width: Number
    }
});
exports.DxCommonSeriesSettings = DxCommonSeriesSettings;
DxCommonSeriesSettings.$_optionName = "commonSeriesSettings";
DxCommonSeriesSettings.$_expectedChildren = {
    aggregation: { isCollectionItem: false, optionName: "aggregation" },
    border: { isCollectionItem: false, optionName: "border" },
    commonSeriesSettingsHoverStyle: { isCollectionItem: false, optionName: "hoverStyle" },
    commonSeriesSettingsLabel: { isCollectionItem: false, optionName: "label" },
    commonSeriesSettingsSelectionStyle: { isCollectionItem: false, optionName: "selectionStyle" },
    hoverStyle: { isCollectionItem: false, optionName: "hoverStyle" },
    label: { isCollectionItem: false, optionName: "label" },
    point: { isCollectionItem: false, optionName: "point" },
    reduction: { isCollectionItem: false, optionName: "reduction" },
    selectionStyle: { isCollectionItem: false, optionName: "selectionStyle" },
    seriesBorder: { isCollectionItem: false, optionName: "border" },
    valueErrorBar: { isCollectionItem: false, optionName: "valueErrorBar" }
};
var DxCommonSeriesSettingsHoverStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:hatching": null,
        "update:width": null,
    },
    props: {
        border: Object,
        color: String,
        dashStyle: String,
        hatching: Object,
        width: Number
    }
});
exports.DxCommonSeriesSettingsHoverStyle = DxCommonSeriesSettingsHoverStyle;
DxCommonSeriesSettingsHoverStyle.$_optionName = "hoverStyle";
DxCommonSeriesSettingsHoverStyle.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    hatching: { isCollectionItem: false, optionName: "hatching" },
    seriesBorder: { isCollectionItem: false, optionName: "border" }
};
var DxCommonSeriesSettingsLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:argumentFormat": null,
        "update:backgroundColor": null,
        "update:border": null,
        "update:connector": null,
        "update:customizeText": null,
        "update:font": null,
        "update:format": null,
        "update:horizontalOffset": null,
        "update:position": null,
        "update:rotationAngle": null,
        "update:showForZeroValues": null,
        "update:verticalOffset": null,
        "update:visible": null,
    },
    props: {
        alignment: String,
        argumentFormat: [Object, Function, String],
        backgroundColor: String,
        border: Object,
        connector: Object,
        customizeText: Function,
        font: Object,
        format: [Object, Function, String],
        horizontalOffset: Number,
        position: String,
        rotationAngle: Number,
        showForZeroValues: Boolean,
        verticalOffset: Number,
        visible: Boolean
    }
});
exports.DxCommonSeriesSettingsLabel = DxCommonSeriesSettingsLabel;
DxCommonSeriesSettingsLabel.$_optionName = "label";
DxCommonSeriesSettingsLabel.$_expectedChildren = {
    argumentFormat: { isCollectionItem: false, optionName: "argumentFormat" },
    border: { isCollectionItem: false, optionName: "border" },
    connector: { isCollectionItem: false, optionName: "connector" },
    font: { isCollectionItem: false, optionName: "font" },
    format: { isCollectionItem: false, optionName: "format" },
    seriesBorder: { isCollectionItem: false, optionName: "border" }
};
var DxCommonSeriesSettingsSelectionStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:hatching": null,
        "update:width": null,
    },
    props: {
        border: Object,
        color: String,
        dashStyle: String,
        hatching: Object,
        width: Number
    }
});
exports.DxCommonSeriesSettingsSelectionStyle = DxCommonSeriesSettingsSelectionStyle;
DxCommonSeriesSettingsSelectionStyle.$_optionName = "selectionStyle";
DxCommonSeriesSettingsSelectionStyle.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    hatching: { isCollectionItem: false, optionName: "hatching" },
    seriesBorder: { isCollectionItem: false, optionName: "border" }
};
var DxConnector = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        visible: Boolean,
        width: Number
    }
});
exports.DxConnector = DxConnector;
DxConnector.$_optionName = "connector";
var DxConstantLine = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:displayBehindSeries": null,
        "update:extendAxis": null,
        "update:label": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:value": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        displayBehindSeries: Boolean,
        extendAxis: Boolean,
        label: Object,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        value: {},
        width: Number
    }
});
exports.DxConstantLine = DxConstantLine;
DxConstantLine.$_optionName = "constantLines";
DxConstantLine.$_isCollectionItem = true;
var DxConstantLineLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:position": null,
        "update:text": null,
        "update:verticalAlignment": null,
        "update:visible": null,
    },
    props: {
        font: Object,
        horizontalAlignment: String,
        position: String,
        text: String,
        verticalAlignment: String,
        visible: Boolean
    }
});
exports.DxConstantLineLabel = DxConstantLineLabel;
DxConstantLineLabel.$_optionName = "label";
var DxConstantLineStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:label": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        label: Object,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        width: Number
    }
});
exports.DxConstantLineStyle = DxConstantLineStyle;
DxConstantLineStyle.$_optionName = "constantLineStyle";
var DxCrosshair = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:enabled": null,
        "update:horizontalLine": null,
        "update:label": null,
        "update:opacity": null,
        "update:verticalLine": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        enabled: Boolean,
        horizontalLine: [Boolean, Object],
        label: Object,
        opacity: Number,
        verticalLine: [Boolean, Object],
        width: Number
    }
});
exports.DxCrosshair = DxCrosshair;
DxCrosshair.$_optionName = "crosshair";
DxCrosshair.$_expectedChildren = {
    horizontalLine: { isCollectionItem: false, optionName: "horizontalLine" },
    horizontalLineLabel: { isCollectionItem: false, optionName: "label" },
    label: { isCollectionItem: false, optionName: "label" },
    verticalLine: { isCollectionItem: false, optionName: "verticalLine" }
};
var DxDataPrepareSettings = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:checkTypeForAllData": null,
        "update:convertToAxisDataType": null,
        "update:sortingMethod": null,
    },
    props: {
        checkTypeForAllData: Boolean,
        convertToAxisDataType: Boolean,
        sortingMethod: [Boolean, Function]
    }
});
exports.DxDataPrepareSettings = DxDataPrepareSettings;
DxDataPrepareSettings.$_optionName = "dataPrepareSettings";
var DxDragBoxStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:opacity": null,
    },
    props: {
        color: String,
        opacity: Number
    }
});
exports.DxDragBoxStyle = DxDragBoxStyle;
DxDragBoxStyle.$_optionName = "dragBoxStyle";
var DxExport = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:backgroundColor": null,
        "update:enabled": null,
        "update:fileName": null,
        "update:formats": null,
        "update:margin": null,
        "update:printingEnabled": null,
        "update:proxyUrl": null,
        "update:svgToCanvas": null,
    },
    props: {
        backgroundColor: String,
        enabled: Boolean,
        fileName: String,
        formats: Array,
        margin: Number,
        printingEnabled: Boolean,
        proxyUrl: String,
        svgToCanvas: Function
    }
});
exports.DxExport = DxExport;
DxExport.$_optionName = "export";
var DxFont = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:family": null,
        "update:opacity": null,
        "update:size": null,
        "update:weight": null,
    },
    props: {
        color: String,
        family: String,
        opacity: Number,
        size: [Number, String],
        weight: Number
    }
});
exports.DxFont = DxFont;
DxFont.$_optionName = "font";
var DxFormat = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:currency": null,
        "update:formatter": null,
        "update:parser": null,
        "update:precision": null,
        "update:type": null,
    },
    props: {
        currency: String,
        formatter: Function,
        parser: Function,
        precision: Number,
        type: String
    }
});
exports.DxFormat = DxFormat;
DxFormat.$_optionName = "format";
var DxGrid = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:opacity": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        opacity: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxGrid = DxGrid;
DxGrid.$_optionName = "grid";
var DxHatching = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:direction": null,
        "update:opacity": null,
        "update:step": null,
        "update:width": null,
    },
    props: {
        direction: String,
        opacity: Number,
        step: Number,
        width: Number
    }
});
exports.DxHatching = DxHatching;
DxHatching.$_optionName = "hatching";
var DxHeight = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:rangeMaxPoint": null,
        "update:rangeMinPoint": null,
    },
    props: {
        rangeMaxPoint: Number,
        rangeMinPoint: Number
    }
});
exports.DxHeight = DxHeight;
DxHeight.$_optionName = "height";
var DxHorizontalLine = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:label": null,
        "update:opacity": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        label: Object,
        opacity: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxHorizontalLine = DxHorizontalLine;
DxHorizontalLine.$_optionName = "horizontalLine";
DxHorizontalLine.$_expectedChildren = {
    horizontalLineLabel: { isCollectionItem: false, optionName: "label" },
    label: { isCollectionItem: false, optionName: "label" }
};
var DxHorizontalLineLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:backgroundColor": null,
        "update:customizeText": null,
        "update:font": null,
        "update:format": null,
        "update:visible": null,
    },
    props: {
        backgroundColor: String,
        customizeText: Function,
        font: Object,
        format: [Object, Function, String],
        visible: Boolean
    }
});
exports.DxHorizontalLineLabel = DxHorizontalLineLabel;
DxHorizontalLineLabel.$_optionName = "label";
var DxHoverStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:hatching": null,
        "update:size": null,
        "update:width": null,
    },
    props: {
        border: Object,
        color: String,
        dashStyle: String,
        hatching: Object,
        size: Number,
        width: Number
    }
});
exports.DxHoverStyle = DxHoverStyle;
DxHoverStyle.$_optionName = "hoverStyle";
var DxImage = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:height": null,
        "update:url": null,
        "update:width": null,
    },
    props: {
        height: Number,
        url: String,
        width: Number
    }
});
exports.DxImage = DxImage;
DxImage.$_optionName = "image";
var DxLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:argumentFormat": null,
        "update:backgroundColor": null,
        "update:border": null,
        "update:connector": null,
        "update:customizeHint": null,
        "update:customizeText": null,
        "update:displayMode": null,
        "update:font": null,
        "update:format": null,
        "update:horizontalAlignment": null,
        "update:horizontalOffset": null,
        "update:indentFromAxis": null,
        "update:overlappingBehavior": null,
        "update:position": null,
        "update:rotationAngle": null,
        "update:showForZeroValues": null,
        "update:staggeringSpacing": null,
        "update:template": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:verticalAlignment": null,
        "update:verticalOffset": null,
        "update:visible": null,
        "update:wordWrap": null,
    },
    props: {
        alignment: String,
        argumentFormat: [Object, Function, String],
        backgroundColor: String,
        border: Object,
        connector: Object,
        customizeHint: Function,
        customizeText: Function,
        displayMode: String,
        font: Object,
        format: [Object, Function, String],
        horizontalAlignment: String,
        horizontalOffset: Number,
        indentFromAxis: Number,
        overlappingBehavior: String,
        position: String,
        rotationAngle: Number,
        showForZeroValues: Boolean,
        staggeringSpacing: Number,
        template: {},
        text: String,
        textOverflow: String,
        verticalAlignment: String,
        verticalOffset: Number,
        visible: Boolean,
        wordWrap: String
    }
});
exports.DxLabel = DxLabel;
DxLabel.$_optionName = "label";
var DxLegend = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:backgroundColor": null,
        "update:border": null,
        "update:columnCount": null,
        "update:columnItemSpacing": null,
        "update:customizeHint": null,
        "update:customizeItems": null,
        "update:customizeText": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:hoverMode": null,
        "update:itemsAlignment": null,
        "update:itemTextPosition": null,
        "update:margin": null,
        "update:markerSize": null,
        "update:markerTemplate": null,
        "update:orientation": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:position": null,
        "update:rowCount": null,
        "update:rowItemSpacing": null,
        "update:title": null,
        "update:verticalAlignment": null,
        "update:visible": null,
    },
    props: {
        backgroundColor: String,
        border: Object,
        columnCount: Number,
        columnItemSpacing: Number,
        customizeHint: Function,
        customizeItems: Function,
        customizeText: Function,
        font: Object,
        horizontalAlignment: String,
        hoverMode: String,
        itemsAlignment: String,
        itemTextPosition: String,
        margin: [Number, Object],
        markerSize: Number,
        markerTemplate: {},
        orientation: String,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        position: String,
        rowCount: Number,
        rowItemSpacing: Number,
        title: [Object, String],
        verticalAlignment: String,
        visible: Boolean
    }
});
exports.DxLegend = DxLegend;
DxLegend.$_optionName = "legend";
DxLegend.$_expectedChildren = {
    annotationBorder: { isCollectionItem: false, optionName: "border" },
    border: { isCollectionItem: false, optionName: "border" },
    font: { isCollectionItem: false, optionName: "font" },
    legendTitle: { isCollectionItem: false, optionName: "title" },
    margin: { isCollectionItem: false, optionName: "margin" },
    title: { isCollectionItem: false, optionName: "title" }
};
var DxLegendTitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:margin": null,
        "update:placeholderSize": null,
        "update:subtitle": null,
        "update:text": null,
        "update:verticalAlignment": null,
    },
    props: {
        font: Object,
        horizontalAlignment: String,
        margin: Object,
        placeholderSize: Number,
        subtitle: [Object, String],
        text: String,
        verticalAlignment: String
    }
});
exports.DxLegendTitle = DxLegendTitle;
DxLegendTitle.$_optionName = "title";
DxLegendTitle.$_expectedChildren = {
    font: { isCollectionItem: false, optionName: "font" },
    legendTitleSubtitle: { isCollectionItem: false, optionName: "subtitle" },
    margin: { isCollectionItem: false, optionName: "margin" },
    subtitle: { isCollectionItem: false, optionName: "subtitle" }
};
var DxLegendTitleSubtitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:offset": null,
        "update:text": null,
    },
    props: {
        font: Object,
        offset: Number,
        text: String
    }
});
exports.DxLegendTitleSubtitle = DxLegendTitleSubtitle;
DxLegendTitleSubtitle.$_optionName = "subtitle";
DxLegendTitleSubtitle.$_expectedChildren = {
    font: { isCollectionItem: false, optionName: "font" }
};
var DxLength = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:days": null,
        "update:hours": null,
        "update:milliseconds": null,
        "update:minutes": null,
        "update:months": null,
        "update:quarters": null,
        "update:seconds": null,
        "update:weeks": null,
        "update:years": null,
    },
    props: {
        days: Number,
        hours: Number,
        milliseconds: Number,
        minutes: Number,
        months: Number,
        quarters: Number,
        seconds: Number,
        weeks: Number,
        years: Number
    }
});
exports.DxLength = DxLength;
DxLength.$_optionName = "length";
var DxLoadingIndicator = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:backgroundColor": null,
        "update:enabled": null,
        "update:font": null,
        "update:show": null,
        "update:text": null,
    },
    props: {
        backgroundColor: String,
        enabled: Boolean,
        font: Object,
        show: Boolean,
        text: String
    }
});
exports.DxLoadingIndicator = DxLoadingIndicator;
DxLoadingIndicator.$_optionName = "loadingIndicator";
DxLoadingIndicator.$_expectedChildren = {
    font: { isCollectionItem: false, optionName: "font" }
};
var DxMargin = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:bottom": null,
        "update:left": null,
        "update:right": null,
        "update:top": null,
    },
    props: {
        bottom: Number,
        left: Number,
        right: Number,
        top: Number
    }
});
exports.DxMargin = DxMargin;
DxMargin.$_optionName = "margin";
var DxMinorGrid = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:opacity": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        opacity: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxMinorGrid = DxMinorGrid;
DxMinorGrid.$_optionName = "minorGrid";
var DxMinorTick = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:length": null,
        "update:opacity": null,
        "update:shift": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        length: Number,
        opacity: Number,
        shift: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxMinorTick = DxMinorTick;
DxMinorTick.$_optionName = "minorTick";
var DxMinorTickInterval = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:days": null,
        "update:hours": null,
        "update:milliseconds": null,
        "update:minutes": null,
        "update:months": null,
        "update:quarters": null,
        "update:seconds": null,
        "update:weeks": null,
        "update:years": null,
    },
    props: {
        days: Number,
        hours: Number,
        milliseconds: Number,
        minutes: Number,
        months: Number,
        quarters: Number,
        seconds: Number,
        weeks: Number,
        years: Number
    }
});
exports.DxMinorTickInterval = DxMinorTickInterval;
DxMinorTickInterval.$_optionName = "minorTickInterval";
var DxMinVisualRangeLength = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:days": null,
        "update:hours": null,
        "update:milliseconds": null,
        "update:minutes": null,
        "update:months": null,
        "update:quarters": null,
        "update:seconds": null,
        "update:weeks": null,
        "update:years": null,
    },
    props: {
        days: Number,
        hours: Number,
        milliseconds: Number,
        minutes: Number,
        months: Number,
        quarters: Number,
        seconds: Number,
        weeks: Number,
        years: Number
    }
});
exports.DxMinVisualRangeLength = DxMinVisualRangeLength;
DxMinVisualRangeLength.$_optionName = "minVisualRangeLength";
var DxPane = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:backgroundColor": null,
        "update:border": null,
        "update:height": null,
        "update:name": null,
    },
    props: {
        backgroundColor: String,
        border: Object,
        height: [Number, String],
        name: String
    }
});
exports.DxPane = DxPane;
DxPane.$_optionName = "panes";
DxPane.$_isCollectionItem = true;
var DxPaneBorder = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:bottom": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:left": null,
        "update:opacity": null,
        "update:right": null,
        "update:top": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        bottom: Boolean,
        color: String,
        dashStyle: String,
        left: Boolean,
        opacity: Number,
        right: Boolean,
        top: Boolean,
        visible: Boolean,
        width: Number
    }
});
exports.DxPaneBorder = DxPaneBorder;
DxPaneBorder.$_optionName = "border";
var DxPoint = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:hoverMode": null,
        "update:hoverStyle": null,
        "update:image": null,
        "update:selectionMode": null,
        "update:selectionStyle": null,
        "update:size": null,
        "update:symbol": null,
        "update:visible": null,
    },
    props: {
        border: Object,
        color: String,
        hoverMode: String,
        hoverStyle: Object,
        image: [Object, String],
        selectionMode: String,
        selectionStyle: Object,
        size: Number,
        symbol: String,
        visible: Boolean
    }
});
exports.DxPoint = DxPoint;
DxPoint.$_optionName = "point";
DxPoint.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    hoverStyle: { isCollectionItem: false, optionName: "hoverStyle" },
    image: { isCollectionItem: false, optionName: "image" },
    pointBorder: { isCollectionItem: false, optionName: "border" },
    pointHoverStyle: { isCollectionItem: false, optionName: "hoverStyle" },
    pointImage: { isCollectionItem: false, optionName: "image" },
    pointSelectionStyle: { isCollectionItem: false, optionName: "selectionStyle" },
    selectionStyle: { isCollectionItem: false, optionName: "selectionStyle" }
};
var DxPointBorder = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        visible: Boolean,
        width: Number
    }
});
exports.DxPointBorder = DxPointBorder;
DxPointBorder.$_optionName = "border";
var DxPointHoverStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:size": null,
    },
    props: {
        border: Object,
        color: String,
        size: Number
    }
});
exports.DxPointHoverStyle = DxPointHoverStyle;
DxPointHoverStyle.$_optionName = "hoverStyle";
DxPointHoverStyle.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    pointBorder: { isCollectionItem: false, optionName: "border" }
};
var DxPointImage = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:height": null,
        "update:url": null,
        "update:width": null,
    },
    props: {
        height: [Number, Object],
        url: [Object, String],
        width: [Number, Object]
    }
});
exports.DxPointImage = DxPointImage;
DxPointImage.$_optionName = "image";
DxPointImage.$_expectedChildren = {
    height: { isCollectionItem: false, optionName: "height" },
    url: { isCollectionItem: false, optionName: "url" },
    width: { isCollectionItem: false, optionName: "width" }
};
var DxPointSelectionStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:size": null,
    },
    props: {
        border: Object,
        color: String,
        size: Number
    }
});
exports.DxPointSelectionStyle = DxPointSelectionStyle;
DxPointSelectionStyle.$_optionName = "selectionStyle";
DxPointSelectionStyle.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    pointBorder: { isCollectionItem: false, optionName: "border" }
};
var DxReduction = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:level": null,
    },
    props: {
        color: String,
        level: String
    }
});
exports.DxReduction = DxReduction;
DxReduction.$_optionName = "reduction";
var DxScrollBar = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:offset": null,
        "update:opacity": null,
        "update:position": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        offset: Number,
        opacity: Number,
        position: String,
        visible: Boolean,
        width: Number
    }
});
exports.DxScrollBar = DxScrollBar;
DxScrollBar.$_optionName = "scrollBar";
var DxSelectionStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:hatching": null,
        "update:size": null,
        "update:width": null,
    },
    props: {
        border: Object,
        color: String,
        dashStyle: String,
        hatching: Object,
        size: Number,
        width: Number
    }
});
exports.DxSelectionStyle = DxSelectionStyle;
DxSelectionStyle.$_optionName = "selectionStyle";
var DxSeries = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:aggregation": null,
        "update:argumentField": null,
        "update:axis": null,
        "update:barOverlapGroup": null,
        "update:barPadding": null,
        "update:barWidth": null,
        "update:border": null,
        "update:closeValueField": null,
        "update:color": null,
        "update:cornerRadius": null,
        "update:dashStyle": null,
        "update:highValueField": null,
        "update:hoverMode": null,
        "update:hoverStyle": null,
        "update:ignoreEmptyPoints": null,
        "update:innerColor": null,
        "update:label": null,
        "update:lowValueField": null,
        "update:maxLabelCount": null,
        "update:minBarSize": null,
        "update:name": null,
        "update:opacity": null,
        "update:openValueField": null,
        "update:pane": null,
        "update:point": null,
        "update:rangeValue1Field": null,
        "update:rangeValue2Field": null,
        "update:reduction": null,
        "update:selectionMode": null,
        "update:selectionStyle": null,
        "update:showInLegend": null,
        "update:sizeField": null,
        "update:stack": null,
        "update:tag": null,
        "update:tagField": null,
        "update:type": null,
        "update:valueErrorBar": null,
        "update:valueField": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        aggregation: Object,
        argumentField: String,
        axis: String,
        barOverlapGroup: String,
        barPadding: Number,
        barWidth: Number,
        border: Object,
        closeValueField: String,
        color: String,
        cornerRadius: Number,
        dashStyle: String,
        highValueField: String,
        hoverMode: String,
        hoverStyle: Object,
        ignoreEmptyPoints: Boolean,
        innerColor: String,
        label: Object,
        lowValueField: String,
        maxLabelCount: Number,
        minBarSize: Number,
        name: String,
        opacity: Number,
        openValueField: String,
        pane: String,
        point: Object,
        rangeValue1Field: String,
        rangeValue2Field: String,
        reduction: Object,
        selectionMode: String,
        selectionStyle: Object,
        showInLegend: Boolean,
        sizeField: String,
        stack: String,
        tag: {},
        tagField: String,
        type: String,
        valueErrorBar: Object,
        valueField: String,
        visible: Boolean,
        width: Number
    }
});
exports.DxSeries = DxSeries;
DxSeries.$_optionName = "series";
DxSeries.$_isCollectionItem = true;
var DxSeriesBorder = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        visible: Boolean,
        width: Number
    }
});
exports.DxSeriesBorder = DxSeriesBorder;
DxSeriesBorder.$_optionName = "border";
var DxSeriesTemplate = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:customizeSeries": null,
        "update:nameField": null,
    },
    props: {
        customizeSeries: Function,
        nameField: String
    }
});
exports.DxSeriesTemplate = DxSeriesTemplate;
DxSeriesTemplate.$_optionName = "seriesTemplate";
var DxShadow = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:blur": null,
        "update:color": null,
        "update:offsetX": null,
        "update:offsetY": null,
        "update:opacity": null,
    },
    props: {
        blur: Number,
        color: String,
        offsetX: Number,
        offsetY: Number,
        opacity: Number
    }
});
exports.DxShadow = DxShadow;
DxShadow.$_optionName = "shadow";
var DxSize = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:height": null,
        "update:width": null,
    },
    props: {
        height: Number,
        width: Number
    }
});
exports.DxSize = DxSize;
DxSize.$_optionName = "size";
var DxStrip = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:endValue": null,
        "update:label": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:startValue": null,
    },
    props: {
        color: String,
        endValue: {},
        label: Object,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        startValue: {}
    }
});
exports.DxStrip = DxStrip;
DxStrip.$_optionName = "strips";
DxStrip.$_isCollectionItem = true;
var DxStripLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:text": null,
        "update:verticalAlignment": null,
    },
    props: {
        font: Object,
        horizontalAlignment: String,
        text: String,
        verticalAlignment: String
    }
});
exports.DxStripLabel = DxStripLabel;
DxStripLabel.$_optionName = "label";
var DxStripStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:label": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
    },
    props: {
        label: Object,
        paddingLeftRight: Number,
        paddingTopBottom: Number
    }
});
exports.DxStripStyle = DxStripStyle;
DxStripStyle.$_optionName = "stripStyle";
DxStripStyle.$_expectedChildren = {
    label: { isCollectionItem: false, optionName: "label" },
    stripStyleLabel: { isCollectionItem: false, optionName: "label" }
};
var DxStripStyleLabel = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:verticalAlignment": null,
    },
    props: {
        font: Object,
        horizontalAlignment: String,
        verticalAlignment: String
    }
});
exports.DxStripStyleLabel = DxStripStyleLabel;
DxStripStyleLabel.$_optionName = "label";
var DxSubtitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:font": null,
        "update:offset": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:wordWrap": null,
    },
    props: {
        font: Object,
        offset: Number,
        text: String,
        textOverflow: String,
        wordWrap: String
    }
});
exports.DxSubtitle = DxSubtitle;
DxSubtitle.$_optionName = "subtitle";
var DxTick = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:length": null,
        "update:opacity": null,
        "update:shift": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        length: Number,
        opacity: Number,
        shift: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxTick = DxTick;
DxTick.$_optionName = "tick";
var DxTickInterval = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:days": null,
        "update:hours": null,
        "update:milliseconds": null,
        "update:minutes": null,
        "update:months": null,
        "update:quarters": null,
        "update:seconds": null,
        "update:weeks": null,
        "update:years": null,
    },
    props: {
        days: Number,
        hours: Number,
        milliseconds: Number,
        minutes: Number,
        months: Number,
        quarters: Number,
        seconds: Number,
        weeks: Number,
        years: Number
    }
});
exports.DxTickInterval = DxTickInterval;
DxTickInterval.$_optionName = "tickInterval";
var DxTitle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:font": null,
        "update:horizontalAlignment": null,
        "update:margin": null,
        "update:placeholderSize": null,
        "update:subtitle": null,
        "update:text": null,
        "update:textOverflow": null,
        "update:verticalAlignment": null,
        "update:wordWrap": null,
    },
    props: {
        alignment: String,
        font: Object,
        horizontalAlignment: String,
        margin: Number,
        placeholderSize: Number,
        subtitle: [Object, String],
        text: String,
        textOverflow: String,
        verticalAlignment: String,
        wordWrap: String
    }
});
exports.DxTitle = DxTitle;
DxTitle.$_optionName = "title";
var DxTooltip = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:argumentFormat": null,
        "update:arrowLength": null,
        "update:border": null,
        "update:color": null,
        "update:container": null,
        "update:contentTemplate": null,
        "update:cornerRadius": null,
        "update:customizeTooltip": null,
        "update:enabled": null,
        "update:font": null,
        "update:format": null,
        "update:interactive": null,
        "update:location": null,
        "update:opacity": null,
        "update:paddingLeftRight": null,
        "update:paddingTopBottom": null,
        "update:shadow": null,
        "update:shared": null,
        "update:zIndex": null,
    },
    props: {
        argumentFormat: [Object, Function, String],
        arrowLength: Number,
        border: Object,
        color: String,
        container: {},
        contentTemplate: {},
        cornerRadius: Number,
        customizeTooltip: Function,
        enabled: Boolean,
        font: Object,
        format: [Object, Function, String],
        interactive: Boolean,
        location: String,
        opacity: Number,
        paddingLeftRight: Number,
        paddingTopBottom: Number,
        shadow: Object,
        shared: Boolean,
        zIndex: Number
    }
});
exports.DxTooltip = DxTooltip;
DxTooltip.$_optionName = "tooltip";
DxTooltip.$_expectedChildren = {
    argumentFormat: { isCollectionItem: false, optionName: "argumentFormat" },
    border: { isCollectionItem: false, optionName: "border" },
    font: { isCollectionItem: false, optionName: "font" },
    format: { isCollectionItem: false, optionName: "format" },
    shadow: { isCollectionItem: false, optionName: "shadow" },
    tooltipBorder: { isCollectionItem: false, optionName: "border" }
};
var DxTooltipBorder = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:opacity": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        opacity: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxTooltipBorder = DxTooltipBorder;
DxTooltipBorder.$_optionName = "border";
var DxUrl = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:rangeMaxPoint": null,
        "update:rangeMinPoint": null,
    },
    props: {
        rangeMaxPoint: String,
        rangeMinPoint: String
    }
});
exports.DxUrl = DxUrl;
DxUrl.$_optionName = "url";
var DxValueAxis = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:aggregatedPointsPosition": null,
        "update:allowDecimals": null,
        "update:autoBreaksEnabled": null,
        "update:axisDivisionFactor": null,
        "update:breaks": null,
        "update:breakStyle": null,
        "update:categories": null,
        "update:color": null,
        "update:constantLines": null,
        "update:constantLineStyle": null,
        "update:customPosition": null,
        "update:discreteAxisDivisionMode": null,
        "update:endOnTick": null,
        "update:grid": null,
        "update:inverted": null,
        "update:label": null,
        "update:linearThreshold": null,
        "update:logarithmBase": null,
        "update:maxAutoBreakCount": null,
        "update:maxValueMargin": null,
        "update:minorGrid": null,
        "update:minorTick": null,
        "update:minorTickCount": null,
        "update:minorTickInterval": null,
        "update:minValueMargin": null,
        "update:minVisualRangeLength": null,
        "update:multipleAxesSpacing": null,
        "update:name": null,
        "update:offset": null,
        "update:opacity": null,
        "update:pane": null,
        "update:placeholderSize": null,
        "update:position": null,
        "update:showZero": null,
        "update:strips": null,
        "update:stripStyle": null,
        "update:synchronizedValue": null,
        "update:tick": null,
        "update:tickInterval": null,
        "update:title": null,
        "update:type": null,
        "update:valueMarginsEnabled": null,
        "update:valueType": null,
        "update:visible": null,
        "update:visualRange": null,
        "update:visualRangeUpdateMode": null,
        "update:wholeRange": null,
        "update:width": null,
    },
    props: {
        aggregatedPointsPosition: String,
        allowDecimals: Boolean,
        autoBreaksEnabled: Boolean,
        axisDivisionFactor: Number,
        breaks: Array,
        breakStyle: Object,
        categories: Array,
        color: String,
        constantLines: Array,
        constantLineStyle: Object,
        customPosition: {},
        discreteAxisDivisionMode: String,
        endOnTick: Boolean,
        grid: Object,
        inverted: Boolean,
        label: Object,
        linearThreshold: Number,
        logarithmBase: Number,
        maxAutoBreakCount: Number,
        maxValueMargin: Number,
        minorGrid: Object,
        minorTick: Object,
        minorTickCount: Number,
        minorTickInterval: [Number, Object, String],
        minValueMargin: Number,
        minVisualRangeLength: [Number, Object, String],
        multipleAxesSpacing: Number,
        name: String,
        offset: Number,
        opacity: Number,
        pane: String,
        placeholderSize: Number,
        position: String,
        showZero: Boolean,
        strips: Array,
        stripStyle: Object,
        synchronizedValue: Number,
        tick: Object,
        tickInterval: [Number, Object, String],
        title: [Object, String],
        type: String,
        valueMarginsEnabled: Boolean,
        valueType: String,
        visible: Boolean,
        visualRange: [Array, Object],
        visualRangeUpdateMode: String,
        wholeRange: [Array, Object],
        width: Number
    }
});
exports.DxValueAxis = DxValueAxis;
DxValueAxis.$_optionName = "valueAxis";
DxValueAxis.$_isCollectionItem = true;
DxValueAxis.$_expectedChildren = {
    axisConstantLineStyle: { isCollectionItem: false, optionName: "constantLineStyle" },
    axisLabel: { isCollectionItem: false, optionName: "label" },
    axisTitle: { isCollectionItem: false, optionName: "title" },
    break: { isCollectionItem: true, optionName: "breaks" },
    constantLine: { isCollectionItem: true, optionName: "constantLines" },
    constantLineStyle: { isCollectionItem: false, optionName: "constantLineStyle" },
    label: { isCollectionItem: false, optionName: "label" },
    minorTickInterval: { isCollectionItem: false, optionName: "minorTickInterval" },
    minVisualRangeLength: { isCollectionItem: false, optionName: "minVisualRangeLength" },
    strip: { isCollectionItem: true, optionName: "strips" },
    tickInterval: { isCollectionItem: false, optionName: "tickInterval" },
    title: { isCollectionItem: false, optionName: "title" },
    visualRange: { isCollectionItem: false, optionName: "visualRange" },
    wholeRange: { isCollectionItem: false, optionName: "wholeRange" }
};
var DxValueErrorBar = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:displayMode": null,
        "update:edgeLength": null,
        "update:highValueField": null,
        "update:lineWidth": null,
        "update:lowValueField": null,
        "update:opacity": null,
        "update:type": null,
        "update:value": null,
    },
    props: {
        color: String,
        displayMode: String,
        edgeLength: Number,
        highValueField: String,
        lineWidth: Number,
        lowValueField: String,
        opacity: Number,
        type: String,
        value: Number
    }
});
exports.DxValueErrorBar = DxValueErrorBar;
DxValueErrorBar.$_optionName = "valueErrorBar";
var DxVerticalLine = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:color": null,
        "update:dashStyle": null,
        "update:label": null,
        "update:opacity": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        color: String,
        dashStyle: String,
        label: Object,
        opacity: Number,
        visible: Boolean,
        width: Number
    }
});
exports.DxVerticalLine = DxVerticalLine;
DxVerticalLine.$_optionName = "verticalLine";
DxVerticalLine.$_expectedChildren = {
    horizontalLineLabel: { isCollectionItem: false, optionName: "label" },
    label: { isCollectionItem: false, optionName: "label" }
};
var DxVisualRange = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:endValue": null,
        "update:length": null,
        "update:startValue": null,
    },
    props: {
        endValue: {},
        length: [Number, Object, String],
        startValue: {}
    }
});
exports.DxVisualRange = DxVisualRange;
DxVisualRange.$_optionName = "visualRange";
var DxWholeRange = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:endValue": null,
        "update:length": null,
        "update:startValue": null,
    },
    props: {
        endValue: {},
        length: [Number, Object, String],
        startValue: {}
    }
});
exports.DxWholeRange = DxWholeRange;
DxWholeRange.$_optionName = "wholeRange";
var DxWidth = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:rangeMaxPoint": null,
        "update:rangeMinPoint": null,
    },
    props: {
        rangeMaxPoint: Number,
        rangeMinPoint: Number
    }
});
exports.DxWidth = DxWidth;
DxWidth.$_optionName = "width";
var DxZoomAndPan = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:allowMouseWheel": null,
        "update:allowTouchGestures": null,
        "update:argumentAxis": null,
        "update:dragBoxStyle": null,
        "update:dragToZoom": null,
        "update:panKey": null,
        "update:valueAxis": null,
    },
    props: {
        allowMouseWheel: Boolean,
        allowTouchGestures: Boolean,
        argumentAxis: String,
        dragBoxStyle: Object,
        dragToZoom: Boolean,
        panKey: String,
        valueAxis: String
    }
});
exports.DxZoomAndPan = DxZoomAndPan;
DxZoomAndPan.$_optionName = "zoomAndPan";
DxZoomAndPan.$_expectedChildren = {
    dragBoxStyle: { isCollectionItem: false, optionName: "dragBoxStyle" }
};
exports.default = DxChart;


/***/ }),

/***/ "./node_modules/devextreme/esm/events/transform.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/events/transform.js ***!
  \*********************************************************/
/*! exports provided: transformstart, transform, transformend, translatestart, translate, translateend, zoomstart, zoom, zoomend, pinchstart, pinch, pinchend, rotatestart, rotate, rotateend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformstart", function() { return transformstart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformend", function() { return transformend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translatestart", function() { return translatestart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translateend", function() { return translateend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoomstart", function() { return zoomstart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoom", function() { return zoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoomend", function() { return zoomend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pinchstart", function() { return pinchstart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pinch", function() { return pinch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pinchend", function() { return pinchend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotatestart", function() { return rotatestart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateend", function() { return rotateend; });
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/emitter */ "./node_modules/devextreme/esm/events/core/emitter.js");
/* harmony import */ var _core_emitter_registrator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/**
 * DevExtreme (esm/events/transform.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var DX_PREFIX = "dx";
var TRANSFORM = "transform";
var TRANSLATE = "translate";
var PINCH = "pinch";
var ROTATE = "rotate";
var START_POSTFIX = "start";
var UPDATE_POSTFIX = "";
var END_POSTFIX = "end";
var eventAliases = [];
var addAlias = function(eventName, eventArgs) {
    eventAliases.push({
        name: eventName,
        args: eventArgs
    })
};
addAlias(TRANSFORM, {
    scale: true,
    deltaScale: true,
    rotation: true,
    deltaRotation: true,
    translation: true,
    deltaTranslation: true
});
addAlias(TRANSLATE, {
    translation: true,
    deltaTranslation: true
});
addAlias(PINCH, {
    scale: true,
    deltaScale: true
});
addAlias(ROTATE, {
    rotation: true,
    deltaRotation: true
});
var getVector = function(first, second) {
    return {
        x: second.pageX - first.pageX,
        y: -second.pageY + first.pageY,
        centerX: .5 * (second.pageX + first.pageX),
        centerY: .5 * (second.pageY + first.pageY)
    }
};
var getEventVector = function(e) {
    var pointers = e.pointers;
    return getVector(pointers[0], pointers[1])
};
var getDistance = function(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
};
var getScale = function(firstVector, secondVector) {
    return getDistance(firstVector) / getDistance(secondVector)
};
var getRotation = function(firstVector, secondVector) {
    var scalarProduct = firstVector.x * secondVector.x + firstVector.y * secondVector.y;
    var distanceProduct = getDistance(firstVector) * getDistance(secondVector);
    if (0 === distanceProduct) {
        return 0
    }
    var sign = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_0__["sign"])(firstVector.x * secondVector.y - secondVector.x * firstVector.y);
    var angle = Math.acos(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_0__["fitIntoRange"])(scalarProduct / distanceProduct, -1, 1));
    return sign * angle
};
var getTranslation = function(firstVector, secondVector) {
    return {
        x: firstVector.centerX - secondVector.centerX,
        y: firstVector.centerY - secondVector.centerY
    }
};
var TransformEmitter = _core_emitter__WEBPACK_IMPORTED_MODULE_3__["default"].inherit({
    validatePointers: function(e) {
        return Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__["hasTouches"])(e) > 1
    },
    start: function(e) {
        this._accept(e);
        var startVector = getEventVector(e);
        this._startVector = startVector;
        this._prevVector = startVector;
        this._fireEventAliases(START_POSTFIX, e)
    },
    move: function(e) {
        var currentVector = getEventVector(e);
        var eventArgs = this._getEventArgs(currentVector);
        this._fireEventAliases(UPDATE_POSTFIX, e, eventArgs);
        this._prevVector = currentVector
    },
    end: function(e) {
        var eventArgs = this._getEventArgs(this._prevVector);
        this._fireEventAliases(END_POSTFIX, e, eventArgs)
    },
    _getEventArgs: function(vector) {
        return {
            scale: getScale(vector, this._startVector),
            deltaScale: getScale(vector, this._prevVector),
            rotation: getRotation(vector, this._startVector),
            deltaRotation: getRotation(vector, this._prevVector),
            translation: getTranslation(vector, this._startVector),
            deltaTranslation: getTranslation(vector, this._prevVector)
        }
    },
    _fireEventAliases: function(eventPostfix, originalEvent, eventArgs) {
        eventArgs = eventArgs || {};
        _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"](eventAliases, function(_, eventAlias) {
            var args = {};
            _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"](eventAlias.args, (function(name) {
                if (name in eventArgs) {
                    args[name] = eventArgs[name]
                }
            }));
            this._fireEvent(DX_PREFIX + eventAlias.name + eventPostfix, originalEvent, args)
        }.bind(this))
    }
});
var eventNames = eventAliases.reduce((result, eventAlias) => {
    [START_POSTFIX, UPDATE_POSTFIX, END_POSTFIX].forEach(eventPostfix => {
        result.push(DX_PREFIX + eventAlias.name + eventPostfix)
    });
    return result
}, []);
Object(_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])({
    emitter: TransformEmitter,
    events: eventNames
});
var exportNames = {};
_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"](eventNames, (function(_, eventName) {
    exportNames[eventName.substring(DX_PREFIX.length)] = eventName
}));
var {
    transformstart: transformstart,
    transform: transform,
    transformend: transformend,
    translatestart: translatestart,
    translate: translate,
    translateend: translateend,
    zoomstart: zoomstart,
    zoom: zoom,
    zoomend: zoomend,
    pinchstart: pinchstart,
    pinch: pinch,
    pinchend: pinchend,
    rotatestart: rotatestart,
    rotate: rotate,
    rotateend: rotateend
} = exportNames;


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/axes_constants.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/axes_constants.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/axes/axes_constants.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = ({
    logarithmic: "logarithmic",
    discrete: "discrete",
    numeric: "numeric",
    left: "left",
    right: "right",
    top: "top",
    bottom: "bottom",
    center: "center",
    horizontal: "horizontal",
    vertical: "vertical",
    convertTicksToValues: function(ticks) {
        return Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(ticks || [], (function(item) {
            return item.value
        }))
    },
    validateOverlappingMode: function(mode) {
        return "ignore" === mode || "none" === mode ? mode : "hide"
    },
    getTicksCountInRange: function(ticks, valueKey, range) {
        var i = 1;
        if (ticks.length > 1) {
            for (; i < ticks.length; i++) {
                if (Math.abs(ticks[i].coords[valueKey] - ticks[0].coords[valueKey]) >= range) {
                    break
                }
            }
        }
        return i
    },
    areLabelsOverlap: function(bBox1, bBox2, spacing, alignment) {
        var horizontalInverted = bBox1.x > bBox2.x;
        var verticalInverted = bBox1.y > bBox2.y;
        var x1 = bBox1.x;
        var x2 = bBox2.x;
        var width1 = bBox1.width;
        var width2 = bBox2.width;
        if ("left" === alignment) {
            x1 += width1 / 2;
            x2 += width2 / 2
        } else if ("right" === alignment) {
            x1 -= width1 / 2;
            x2 -= width2 / 2
        }
        var hasHorizontalOverlapping = horizontalInverted ? x2 + width2 + spacing > x1 : x1 + width1 + spacing > x2;
        var hasVerticalOverlapping = verticalInverted ? bBox2.y + bBox2.height > bBox1.y : bBox1.y + bBox1.height > bBox2.y;
        return hasHorizontalOverlapping && hasVerticalOverlapping
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/axes_utils.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/axes_utils.js ***!
  \************************************************************/
/*! exports provided: calculateCanvasMargins, measureLabels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateCanvasMargins", function() { return calculateCanvasMargins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measureLabels", function() { return measureLabels; });
/**
 * DevExtreme (esm/viz/axes/axes_utils.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var _max = Math.max;
var calculateCanvasMargins = function(bBoxes, canvas) {
    var cLeft = canvas.left;
    var cTop = canvas.top;
    var cRight = canvas.width - canvas.right;
    var cBottom = canvas.height - canvas.bottom;
    return bBoxes.reduce((function(margins, bBox) {
        if (!bBox || bBox.isEmpty) {
            return margins
        }
        return {
            left: _max(margins.left, cLeft - bBox.x),
            top: _max(margins.top, cTop - bBox.y),
            right: _max(margins.right, bBox.x + bBox.width - cRight),
            bottom: _max(margins.bottom, bBox.y + bBox.height - cBottom)
        }
    }), {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    })
};
var measureLabels = function(items) {
    items.forEach((function(item) {
        var label = item.getContentContainer();
        item.labelBBox = label ? label.getBBox() : {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    }))
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/base_axis.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/base_axis.js ***!
  \***********************************************************/
/*! exports provided: Axis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Axis", function() { return Axis; });
/* harmony import */ var _smart_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./smart_formatter */ "./node_modules/devextreme/esm/viz/axes/smart_formatter.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _axes_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./axes_constants */ "./node_modules/devextreme/esm/viz/axes/axes_constants.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _format_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../format_helper */ "./node_modules/devextreme/esm/format_helper.js");
/* harmony import */ var _components_parse_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/parse_utils */ "./node_modules/devextreme/esm/viz/components/parse_utils.js");
/* harmony import */ var _tick_generator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tick_generator */ "./node_modules/devextreme/esm/viz/axes/tick_generator.js");
/* harmony import */ var _translators_translator2d__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../translators/translator2d */ "./node_modules/devextreme/esm/viz/translators/translator2d.js");
/* harmony import */ var _translators_range__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../translators/range */ "./node_modules/devextreme/esm/viz/translators/range.js");
/* harmony import */ var _tick__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tick */ "./node_modules/devextreme/esm/viz/axes/tick.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _xy_axes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./xy_axes */ "./node_modules/devextreme/esm/viz/axes/xy_axes.js");
/* harmony import */ var _polar_axes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./polar_axes */ "./node_modules/devextreme/esm/viz/axes/polar_axes.js");
/* harmony import */ var _constant_line__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./constant_line */ "./node_modules/devextreme/esm/viz/axes/constant_line.js");
/* harmony import */ var _strip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./strip */ "./node_modules/devextreme/esm/viz/axes/strip.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _axes_utils__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./axes_utils */ "./node_modules/devextreme/esm/viz/axes/axes_utils.js");
/**
 * DevExtreme (esm/viz/axes/base_axis.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





















var convertTicksToValues = _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].convertTicksToValues;
var _math = Math;
var _abs = _math.abs;
var _max = _math.max;
var _min = _math.min;
var _isArray = Array.isArray;
var DEFAULT_AXIS_LABEL_SPACING = 5;
var MAX_GRID_BORDER_ADHENSION = 4;
var TOP = _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].top;
var BOTTOM = _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].bottom;
var LEFT = _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].left;
var RIGHT = _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].right;
var CENTER = _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].center;
var KEEP = "keep";
var SHIFT = "shift";
var RESET = "reset";
var ROTATE = "rotate";
var DEFAULT_AXIS_DIVISION_FACTOR = 50;
var DEFAULT_MINOR_AXIS_DIVISION_FACTOR = 15;
var SCROLL_THRESHOLD = 5;
var MIN_BAR_MARGIN = 5;
var MAX_MARGIN_VALUE = .8;
var dateIntervals = {
    day: 864e5,
    week: 6048e5
};

function getTickGenerator(options, incidentOccurred, skipTickGeneration, rangeIsEmpty, adjustDivisionFactor, _ref) {
    var _options$workWeek;
    var {
        allowNegatives: allowNegatives,
        linearThreshold: linearThreshold
    } = _ref;
    return Object(_tick_generator__WEBPACK_IMPORTED_MODULE_8__["tickGenerator"])({
        axisType: options.type,
        dataType: options.dataType,
        logBase: options.logarithmBase,
        allowNegatives: allowNegatives,
        linearThreshold: linearThreshold,
        axisDivisionFactor: adjustDivisionFactor(options.axisDivisionFactor || DEFAULT_AXIS_DIVISION_FACTOR),
        minorAxisDivisionFactor: adjustDivisionFactor(options.minorAxisDivisionFactor || DEFAULT_MINOR_AXIS_DIVISION_FACTOR),
        numberMultipliers: options.numberMultipliers,
        calculateMinors: options.minorTick.visible || options.minorGrid.visible || options.calculateMinors,
        allowDecimals: options.allowDecimals,
        endOnTick: options.endOnTick,
        incidentOccurred: incidentOccurred,
        firstDayOfWeek: null === (_options$workWeek = options.workWeek) || void 0 === _options$workWeek ? void 0 : _options$workWeek[0],
        skipTickGeneration: skipTickGeneration,
        skipCalculationLimits: options.skipCalculationLimits,
        generateExtraTick: options.generateExtraTick,
        minTickInterval: options.minTickInterval,
        rangeIsEmpty: rangeIsEmpty
    })
}

function createMajorTick(axis, renderer, skippedCategory) {
    var options = axis.getOptions();
    return Object(_tick__WEBPACK_IMPORTED_MODULE_11__["tick"])(axis, renderer, options.tick, options.grid, skippedCategory, false)
}

function createMinorTick(axis, renderer) {
    var options = axis.getOptions();
    return Object(_tick__WEBPACK_IMPORTED_MODULE_11__["tick"])(axis, renderer, options.minorTick, options.minorGrid)
}

function createBoundaryTick(axis, renderer, isFirst) {
    var options = axis.getOptions();
    return Object(_tick__WEBPACK_IMPORTED_MODULE_11__["tick"])(axis, renderer, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, options.tick, {
        visible: options.showCustomBoundaryTicks
    }), options.grid, void 0, false, isFirst ? -1 : 1)
}

function callAction(elements, action, actionArgument1, actionArgument2) {
    (elements || []).forEach(e => e[action](actionArgument1, actionArgument2))
}

function initTickCoords(ticks) {
    callAction(ticks, "initCoords")
}

function drawTickMarks(ticks, options) {
    callAction(ticks, "drawMark", options)
}

function drawGrids(ticks, drawLine) {
    callAction(ticks, "drawGrid", drawLine)
}

function updateTicksPosition(ticks, options, animate) {
    callAction(ticks, "updateTickPosition", options, animate)
}

function updateGridsPosition(ticks, animate) {
    callAction(ticks, "updateGridPosition", animate)
}

function cleanUpInvalidTicks(ticks) {
    var i = ticks.length - 1;
    for (i; i >= 0; i--) {
        if (!removeInvalidTick(ticks, i)) {
            break
        }
    }
    for (i = 0; i < ticks.length; i++) {
        if (removeInvalidTick(ticks, i)) {
            i--
        } else {
            break
        }
    }
}

function removeInvalidTick(ticks, i) {
    if (null === ticks[i].coords.x || null === ticks[i].coords.y) {
        ticks.splice(i, 1);
        return true
    }
    return false
}

function validateAxisOptions(options) {
    var _labelOptions$minSpac;
    var labelOptions = options.label;
    var position = options.position;
    var defaultPosition = options.isHorizontal ? BOTTOM : LEFT;
    var secondaryPosition = options.isHorizontal ? TOP : RIGHT;
    var labelPosition = labelOptions.position;
    if (position !== defaultPosition && position !== secondaryPosition) {
        position = defaultPosition
    }
    if (!labelPosition || "outside" === labelPosition) {
        labelPosition = position
    } else if ("inside" === labelPosition) {
        labelPosition = {
            [TOP]: BOTTOM,
            [BOTTOM]: TOP,
            [LEFT]: RIGHT,
            [RIGHT]: LEFT
        } [position]
    }
    if (labelPosition !== defaultPosition && labelPosition !== secondaryPosition) {
        labelPosition = position
    }
    if (labelOptions.alignment !== CENTER && !labelOptions.userAlignment) {
        labelOptions.alignment = {
            [TOP]: CENTER,
            [BOTTOM]: CENTER,
            [LEFT]: RIGHT,
            [RIGHT]: LEFT
        } [labelPosition]
    }
    options.position = position;
    labelOptions.position = labelPosition;
    options.hoverMode = options.hoverMode ? options.hoverMode.toLowerCase() : "none";
    labelOptions.minSpacing = null !== (_labelOptions$minSpac = labelOptions.minSpacing) && void 0 !== _labelOptions$minSpac ? _labelOptions$minSpac : DEFAULT_AXIS_LABEL_SPACING;
    options.type && (options.type = options.type.toLowerCase());
    options.argumentType && (options.argumentType = options.argumentType.toLowerCase());
    options.valueType && (options.valueType = options.valueType.toLowerCase())
}

function getOptimalAngle(boxes, labelOpt) {
    var angle = 180 * _math.asin((boxes[0].height + labelOpt.minSpacing) / (boxes[1].x - boxes[0].x)) / _math.PI;
    return angle < 45 ? -45 : -90
}

function updateLabels(ticks, step, func) {
    ticks.forEach((function(tick, index) {
        if (tick.getContentContainer()) {
            if (index % step !== 0) {
                tick.removeLabel()
            } else if (func) {
                func(tick, index)
            }
        }
    }))
}

function getZoomBoundValue(optionValue, dataValue) {
    if (void 0 === optionValue) {
        return dataValue
    } else if (null === optionValue) {
        return
    } else {
        return optionValue
    }
}

function configureGenerator(options, axisDivisionFactor, viewPort, screenDelta, minTickInterval) {
    var tickGeneratorOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, options, {
        endOnTick: true,
        axisDivisionFactor: axisDivisionFactor,
        skipCalculationLimits: true,
        generateExtraTick: true,
        minTickInterval: minTickInterval
    });
    return function(tickInterval, skipTickGeneration, min, max, breaks) {
        return getTickGenerator(tickGeneratorOptions, _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"], skipTickGeneration, viewPort.isEmpty(), v => v, viewPort)({
            min: min,
            max: max,
            categories: viewPort.categories,
            isSpacedMargin: viewPort.isSpacedMargin
        }, screenDelta, tickInterval, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(tickInterval), void 0, void 0, void 0, breaks)
    }
}

function getConstantLineSharpDirection(coord, axisCanvas) {
    return Math.max(axisCanvas.start, axisCanvas.end) !== coord ? 1 : -1
}
var Axis = function(renderSettings) {
    this._renderer = renderSettings.renderer;
    this._incidentOccurred = renderSettings.incidentOccurred;
    this._eventTrigger = renderSettings.eventTrigger;
    this._stripsGroup = renderSettings.stripsGroup;
    this._stripLabelAxesGroup = renderSettings.stripLabelAxesGroup;
    this._labelsAxesGroup = renderSettings.labelsAxesGroup;
    this._constantLinesGroup = renderSettings.constantLinesGroup;
    this._scaleBreaksGroup = renderSettings.scaleBreaksGroup;
    this._axesContainerGroup = renderSettings.axesContainerGroup;
    this._gridContainerGroup = renderSettings.gridGroup;
    this._axisCssPrefix = renderSettings.widgetClass + "-" + (renderSettings.axisClass ? renderSettings.axisClass + "-" : "");
    this._setType(renderSettings.axisType, renderSettings.drawingType);
    this._createAxisGroups();
    this._translator = this._createTranslator();
    this.isArgumentAxis = renderSettings.isArgumentAxis;
    this._viewport = {};
    this._prevDataInfo = {};
    this._firstDrawing = true;
    this._initRange = {};
    this._getTemplate = renderSettings.getTemplate
};
Axis.prototype = {
    constructor: Axis,
    _drawAxis() {
        var options = this._options;
        if (!options.visible) {
            return
        }
        this._axisElement = this._createAxisElement();
        this._updateAxisElementPosition();
        this._axisElement.attr({
            "stroke-width": options.width,
            stroke: options.color,
            "stroke-opacity": options.opacity
        }).sharp(this._getSharpParam(true), this.getAxisSharpDirection()).append(this._axisLineGroup)
    },
    _createPathElement(points, attr, sharpDirection) {
        return this.sharp(this._renderer.path(points, "line").attr(attr), sharpDirection)
    },
    sharp(svgElement) {
        var sharpDirection = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return svgElement.sharp(this._getSharpParam(), sharpDirection)
    },
    customPositionIsAvailable: () => false,
    getOrthogonalAxis: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    getCustomPosition: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    getCustomBoundaryPosition: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    resolveOverlappingForCustomPositioning: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    hasNonBoundaryPosition: () => false,
    customPositionIsBoundaryOrthogonalAxis: () => false,
    getResolvedBoundaryPosition() {
        return this.getOptions().position
    },
    getAxisSharpDirection() {
        var position = this.getResolvedBoundaryPosition();
        return this.hasNonBoundaryPosition() || position !== BOTTOM && position !== RIGHT ? 1 : -1
    },
    getSharpDirectionByCoords(coords) {
        var canvas = this._getCanvasStartEnd();
        var maxCoord = Math.max(canvas.start, canvas.end);
        return this.getRadius ? 0 : maxCoord !== coords[this._isHorizontal ? "x" : "y"] ? 1 : -1
    },
    _getGridLineDrawer: function() {
        var that = this;
        return function(tick, gridStyle) {
            var grid = that._getGridPoints(tick.coords);
            if (grid.points) {
                return that._createPathElement(grid.points, gridStyle, that.getSharpDirectionByCoords(tick.coords))
            }
            return null
        }
    },
    _getGridPoints: function(coords) {
        var isHorizontal = this._isHorizontal;
        var tickPositionField = isHorizontal ? "x" : "y";
        var orthogonalPositions = this._orthogonalPositions;
        var positionFrom = orthogonalPositions.start;
        var positionTo = orthogonalPositions.end;
        var borderOptions = this.borderOptions;
        var canvasStart = isHorizontal ? LEFT : TOP;
        var canvasEnd = isHorizontal ? RIGHT : BOTTOM;
        var axisCanvas = this.getCanvas();
        var canvas = {
            left: axisCanvas.left,
            right: axisCanvas.width - axisCanvas.right,
            top: axisCanvas.top,
            bottom: axisCanvas.height - axisCanvas.bottom
        };
        var firstBorderLinePosition = borderOptions.visible && borderOptions[canvasStart] ? canvas[canvasStart] : void 0;
        var lastBorderLinePosition = borderOptions.visible && borderOptions[canvasEnd] ? canvas[canvasEnd] : void 0;
        var minDelta = MAX_GRID_BORDER_ADHENSION + firstBorderLinePosition;
        var maxDelta = lastBorderLinePosition - MAX_GRID_BORDER_ADHENSION;
        if (this.areCoordsOutsideAxis(coords) || void 0 === coords[tickPositionField] || coords[tickPositionField] < minDelta || coords[tickPositionField] > maxDelta) {
            return {
                points: null
            }
        }
        return {
            points: isHorizontal ? null !== coords[tickPositionField] ? [coords[tickPositionField], positionFrom, coords[tickPositionField], positionTo] : null : null !== coords[tickPositionField] ? [positionFrom, coords[tickPositionField], positionTo, coords[tickPositionField]] : null
        }
    },
    _getConstantLinePos: function(parsedValue, canvasStart, canvasEnd) {
        var value = this._getTranslatedCoord(parsedValue);
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(value) || value < _min(canvasStart, canvasEnd) || value > _max(canvasStart, canvasEnd)) {
            return
        }
        return value
    },
    _getConstantLineGraphicAttributes: function(value) {
        var positionFrom = this._orthogonalPositions.start;
        var positionTo = this._orthogonalPositions.end;
        return {
            points: this._isHorizontal ? [value, positionFrom, value, positionTo] : [positionFrom, value, positionTo, value]
        }
    },
    _createConstantLine: function(value, attr) {
        return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr, getConstantLineSharpDirection(value, this._getCanvasStartEnd()))
    },
    _drawConstantLineLabelText: function(text, x, y, _ref2, group) {
        var {
            font: font,
            cssClass: cssClass
        } = _ref2;
        return this._renderer.text(text, x, y).css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["patchFontOptions"])(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, this._options.label.font, font))).attr({
            align: "center",
            class: cssClass
        }).append(group)
    },
    _drawConstantLineLabels: function(parsedValue, lineLabelOptions, value, group) {
        var _text;
        var text = lineLabelOptions.text;
        var options = this._options;
        var labelOptions = options.label;
        this._checkAlignmentConstantLineLabels(lineLabelOptions);
        text = null !== (_text = text) && void 0 !== _text ? _text : this.formatLabel(parsedValue, labelOptions);
        var coords = this._getConstantLineLabelsCoords(value, lineLabelOptions);
        return this._drawConstantLineLabelText(text, coords.x, coords.y, lineLabelOptions, group)
    },
    _getStripPos: function(startValue, endValue, canvasStart, canvasEnd, range) {
        var isContinuous = !!(range.minVisible || range.maxVisible);
        var categories = (range.categories || []).reduce((function(result, cat) {
            result.push(cat.valueOf());
            return result
        }), []);
        var start;
        var end;
        var swap;
        var startCategoryIndex;
        var endCategoryIndex;
        if (!isContinuous) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(startValue) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(endValue)) {
                var parsedStartValue = this.parser(startValue);
                var parsedEndValue = this.parser(endValue);
                startCategoryIndex = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_5__["inArray"])(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(parsedStartValue) ? parsedStartValue.valueOf() : void 0, categories);
                endCategoryIndex = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_5__["inArray"])(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(parsedEndValue) ? parsedEndValue.valueOf() : void 0, categories);
                if (-1 === startCategoryIndex || -1 === endCategoryIndex) {
                    return {
                        from: 0,
                        to: 0,
                        outOfCanvas: true
                    }
                }
                if (startCategoryIndex > endCategoryIndex) {
                    swap = endValue;
                    endValue = startValue;
                    startValue = swap
                }
            }
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(startValue)) {
            startValue = this.validateUnit(startValue, "E2105", "strip");
            start = this._getTranslatedCoord(startValue, -1)
        } else {
            start = canvasStart
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(endValue)) {
            endValue = this.validateUnit(endValue, "E2105", "strip");
            end = this._getTranslatedCoord(endValue, 1)
        } else {
            end = canvasEnd
        }
        var stripPosition = start < end ? {
            from: start,
            to: end
        } : {
            from: end,
            to: start
        };
        var visibleArea = this.getVisibleArea();
        if (stripPosition.from <= visibleArea[0] && stripPosition.to <= visibleArea[0] || stripPosition.from >= visibleArea[1] && stripPosition.to >= visibleArea[1]) {
            stripPosition.outOfCanvas = true
        }
        return stripPosition
    },
    _getStripGraphicAttributes: function(fromPoint, toPoint) {
        var x;
        var y;
        var width;
        var height;
        var orthogonalPositions = this._orthogonalPositions;
        var positionFrom = orthogonalPositions.start;
        var positionTo = orthogonalPositions.end;
        if (this._isHorizontal) {
            x = fromPoint;
            y = _min(positionFrom, positionTo);
            width = toPoint - fromPoint;
            height = _abs(positionFrom - positionTo)
        } else {
            x = _min(positionFrom, positionTo);
            y = fromPoint;
            width = _abs(positionFrom - positionTo);
            height = _abs(fromPoint - toPoint)
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    },
    _createStrip: function(attrs) {
        return this._renderer.rect(attrs.x, attrs.y, attrs.width, attrs.height)
    },
    _adjustStripLabels: function() {
        var that = this;
        this._strips.forEach((function(strip) {
            if (strip.label) {
                strip.label.attr(that._getAdjustedStripLabelCoords(strip))
            }
        }))
    },
    _adjustLabelsCoord(offset, maxWidth, checkCanvas) {
        var getContainerAttrs = tick => this._getLabelAdjustedCoord(tick, offset + (tick.labelOffset || 0), maxWidth, checkCanvas);
        this._majorTicks.forEach((function(tick) {
            if (tick.label) {
                tick.updateMultilineTextAlignment();
                tick.label.attr(getContainerAttrs(tick))
            } else {
                tick.templateContainer && tick.templateContainer.attr(getContainerAttrs(tick))
            }
        }))
    },
    _adjustLabels: function(offset) {
        var options = this.getOptions();
        var positionsAreConsistent = options.position === options.label.position;
        var maxSize = this._majorTicks.reduce((function(size, tick) {
            if (!tick.getContentContainer()) {
                return size
            }
            var bBox = tick.labelRotationAngle ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["rotateBBox"])(tick.labelBBox, [tick.labelCoords.x, tick.labelCoords.y], -tick.labelRotationAngle) : tick.labelBBox;
            return {
                width: _max(size.width || 0, bBox.width),
                height: _max(size.height || 0, bBox.height),
                offset: _max(size.offset || 0, tick.labelOffset || 0)
            }
        }), {});
        var additionalOffset = positionsAreConsistent ? this._isHorizontal ? maxSize.height : maxSize.width : 0;
        this._adjustLabelsCoord(offset, maxSize.width);
        return offset + additionalOffset + (additionalOffset && this._options.label.indentFromAxis) + (positionsAreConsistent ? maxSize.offset : 0)
    },
    _getLabelAdjustedCoord: function(tick, offset, maxWidth) {
        offset = offset || 0;
        var options = this._options;
        var templateBox = tick.templateContainer && tick.templateContainer.getBBox();
        var box = templateBox || Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["rotateBBox"])(tick.labelBBox, [tick.labelCoords.x, tick.labelCoords.y], -tick.labelRotationAngle || 0);
        var textAlign = tick.labelAlignment || options.label.alignment;
        var isDiscrete = "discrete" === this._options.type;
        var isFlatLabel = tick.labelRotationAngle % 90 === 0;
        var indentFromAxis = options.label.indentFromAxis;
        var labelPosition = options.label.position;
        var axisPosition = this._axisPosition;
        var labelCoords = tick.labelCoords;
        var labelX = labelCoords.x;
        var translateX;
        var translateY;
        if (this._isHorizontal) {
            if (labelPosition === BOTTOM) {
                translateY = axisPosition + indentFromAxis - box.y + offset
            } else {
                translateY = axisPosition - indentFromAxis - (box.y + box.height) - offset
            }
            if (textAlign === RIGHT) {
                translateX = isDiscrete && isFlatLabel ? tick.coords.x - (box.x + box.width) : labelX - box.x - box.width
            } else if (textAlign === LEFT) {
                translateX = isDiscrete && isFlatLabel ? labelX - box.x - (tick.coords.x - labelX) : labelX - box.x
            } else {
                translateX = labelX - box.x - box.width / 2
            }
        } else {
            translateY = labelCoords.y - box.y - box.height / 2;
            if (labelPosition === LEFT) {
                if (textAlign === LEFT) {
                    translateX = axisPosition - indentFromAxis - maxWidth - box.x
                } else if (textAlign === CENTER) {
                    translateX = axisPosition - indentFromAxis - maxWidth / 2 - box.x - box.width / 2
                } else {
                    translateX = axisPosition - indentFromAxis - box.x - box.width
                }
                translateX -= offset
            } else {
                if (textAlign === RIGHT) {
                    translateX = axisPosition + indentFromAxis + maxWidth - box.x - box.width
                } else if (textAlign === CENTER) {
                    translateX = axisPosition + indentFromAxis + maxWidth / 2 - box.x - box.width / 2
                } else {
                    translateX = axisPosition + indentFromAxis - box.x
                }
                translateX += offset
            }
        }
        return {
            translateX: translateX,
            translateY: translateY
        }
    },
    _createAxisConstantLineGroups: function() {
        var renderer = this._renderer;
        var classSelector = this._axisCssPrefix;
        var constantLinesClass = classSelector + "constant-lines";
        var insideGroup = renderer.g().attr({
            class: constantLinesClass
        });
        var outsideGroup1 = renderer.g().attr({
            class: constantLinesClass
        });
        var outsideGroup2 = renderer.g().attr({
            class: constantLinesClass
        });
        return {
            inside: insideGroup,
            outside1: outsideGroup1,
            left: outsideGroup1,
            top: outsideGroup1,
            outside2: outsideGroup2,
            right: outsideGroup2,
            bottom: outsideGroup2,
            remove: function() {
                this.inside.remove();
                this.outside1.remove();
                this.outside2.remove()
            },
            clear: function() {
                this.inside.clear();
                this.outside1.clear();
                this.outside2.clear()
            }
        }
    },
    _createAxisGroups: function() {
        var renderer = this._renderer;
        var classSelector = this._axisCssPrefix;
        this._axisGroup = renderer.g().attr({
            class: classSelector + "axis"
        }).enableLinks();
        this._axisStripGroup = renderer.g().attr({
            class: classSelector + "strips"
        });
        this._axisGridGroup = renderer.g().attr({
            class: classSelector + "grid"
        });
        this._axisElementsGroup = renderer.g().attr({
            class: classSelector + "elements"
        });
        this._axisLineGroup = renderer.g().attr({
            class: classSelector + "line"
        }).linkOn(this._axisGroup, "axisLine").linkAppend();
        this._axisTitleGroup = renderer.g().attr({
            class: classSelector + "title"
        }).append(this._axisGroup);
        this._axisConstantLineGroups = {
            above: this._createAxisConstantLineGroups(),
            under: this._createAxisConstantLineGroups()
        };
        this._axisStripLabelGroup = renderer.g().attr({
            class: classSelector + "axis-labels"
        })
    },
    _clearAxisGroups: function() {
        this._axisGroup.remove();
        this._axisStripGroup.remove();
        this._axisStripLabelGroup.remove();
        this._axisConstantLineGroups.above.remove();
        this._axisConstantLineGroups.under.remove();
        this._axisGridGroup.remove();
        this._axisTitleGroup.clear();
        if (!this._options.label.template || !this.isRendered()) {
            this._axisElementsGroup.remove();
            this._axisElementsGroup.clear()
        }
        this._axisLineGroup && this._axisLineGroup.clear();
        this._axisStripGroup && this._axisStripGroup.clear();
        this._axisGridGroup && this._axisGridGroup.clear();
        this._axisConstantLineGroups.above.clear();
        this._axisConstantLineGroups.under.clear();
        this._axisStripLabelGroup && this._axisStripLabelGroup.clear()
    },
    _getLabelFormatObject: function(value, labelOptions, range, point, tickInterval, ticks) {
        range = range || this._getViewportRange();
        var formatObject = {
            value: value,
            valueText: Object(_smart_formatter__WEBPACK_IMPORTED_MODULE_0__["smartFormatter"])(value, {
                labelOptions: labelOptions,
                ticks: ticks || convertTicksToValues(this._majorTicks),
                tickInterval: null !== tickInterval && void 0 !== tickInterval ? tickInterval : this._tickInterval,
                dataType: this._options.dataType,
                logarithmBase: this._options.logarithmBase,
                type: this._options.type,
                showTransition: !this._options.marker.visible,
                point: point
            }) || "",
            min: range.minVisible,
            max: range.maxVisible
        };
        if (point) {
            formatObject.point = point
        }
        return formatObject
    },
    formatLabel: function(value, labelOptions, range, point, tickInterval, ticks) {
        var formatObject = this._getLabelFormatObject(value, labelOptions, range, point, tickInterval, ticks);
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(labelOptions.customizeText) ? labelOptions.customizeText.call(formatObject, formatObject) : formatObject.valueText
    },
    formatHint: function(value, labelOptions, range) {
        var formatObject = this._getLabelFormatObject(value, labelOptions, range);
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(labelOptions.customizeHint) ? labelOptions.customizeHint.call(formatObject, formatObject) : void 0
    },
    formatRange(startValue, endValue, interval, argumentFormat) {
        return Object(_smart_formatter__WEBPACK_IMPORTED_MODULE_0__["formatRange"])({
            startValue: startValue,
            endValue: endValue,
            tickInterval: interval,
            argumentFormat: argumentFormat,
            axisOptions: this.getOptions()
        })
    },
    _setTickOffset: function() {
        var options = this._options;
        var discreteAxisDivisionMode = options.discreteAxisDivisionMode;
        this._tickOffset = +("crossLabels" !== discreteAxisDivisionMode || !discreteAxisDivisionMode)
    },
    aggregatedPointBetweenTicks() {
        return "crossTicks" === this._options.aggregatedPointsPosition
    },
    resetApplyingAnimation: function(isFirstDrawing) {
        this._resetApplyingAnimation = true;
        if (isFirstDrawing) {
            this._firstDrawing = true
        }
    },
    isFirstDrawing() {
        return this._firstDrawing
    },
    getMargins: function() {
        var that = this;
        var {
            position: position,
            offset: offset,
            customPosition: customPosition,
            placeholderSize: placeholderSize,
            grid: grid,
            tick: tick,
            crosshairMargin: crosshairMargin
        } = that._options;
        var isDefinedCustomPositionOption = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(customPosition);
        var boundaryPosition = that.getResolvedBoundaryPosition();
        var canvas = that.getCanvas();
        var cLeft = canvas.left;
        var cTop = canvas.top;
        var cRight = canvas.width - canvas.right;
        var cBottom = canvas.height - canvas.bottom;
        var edgeMarginCorrection = _max(grid.visible && grid.width || 0, tick.visible && tick.width || 0);
        var constantLineAboveSeries = that._axisConstantLineGroups.above;
        var constantLineUnderSeries = that._axisConstantLineGroups.under;
        var boxes = [that._axisElementsGroup, constantLineAboveSeries.outside1, constantLineAboveSeries.outside2, constantLineUnderSeries.outside1, constantLineUnderSeries.outside2, that._axisLineGroup].map(group => group && group.getBBox()).concat(function(group) {
            var box = group && group.getBBox();
            if (!box || box.isEmpty) {
                return box
            }
            if (that._isHorizontal) {
                box.x = cLeft;
                box.width = cRight - cLeft
            } else {
                box.y = cTop;
                box.height = cBottom - cTop
            }
            return box
        }(that._axisTitleGroup));
        var margins = Object(_axes_utils__WEBPACK_IMPORTED_MODULE_20__["calculateCanvasMargins"])(boxes, canvas);
        margins[position] += crosshairMargin;
        if (that.hasNonBoundaryPosition() && isDefinedCustomPositionOption) {
            margins[boundaryPosition] = 0
        }
        if (placeholderSize) {
            margins[position] = placeholderSize
        }
        if (edgeMarginCorrection) {
            if (that._isHorizontal && canvas.right < edgeMarginCorrection && margins.right < edgeMarginCorrection) {
                margins.right = edgeMarginCorrection
            }
            if (!that._isHorizontal && canvas.bottom < edgeMarginCorrection && margins.bottom < edgeMarginCorrection) {
                margins.bottom = edgeMarginCorrection
            }
        }
        if (!isDefinedCustomPositionOption && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(offset)) {
            var moveByOffset = that.customPositionIsBoundary() && (offset > 0 && (boundaryPosition === LEFT || boundaryPosition === TOP) || offset < 0 && (boundaryPosition === RIGHT || boundaryPosition === BOTTOM));
            margins[boundaryPosition] -= moveByOffset ? offset : 0
        }
        return margins
    },
    validateUnit: function(unit, idError, parameters) {
        unit = this.parser(unit);
        if (void 0 === unit && idError) {
            this._incidentOccurred(idError, [parameters])
        }
        return unit
    },
    _setType: function(axisType, drawingType) {
        var axisTypeMethods;
        switch (axisType) {
            case "xyAxes":
                axisTypeMethods = _xy_axes__WEBPACK_IMPORTED_MODULE_15__["default"];
                break;
            case "polarAxes":
                axisTypeMethods = _polar_axes__WEBPACK_IMPORTED_MODULE_16__
        }
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(this, axisTypeMethods[drawingType])
    },
    _getSharpParam: function() {
        return true
    },
    _disposeBreaksGroup: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    dispose: function() {
        [this._axisElementsGroup, this._axisStripGroup, this._axisGroup].forEach((function(g) {
            g.dispose()
        }));
        this._strips = this._title = null;
        this._axisStripGroup = this._axisConstantLineGroups = this._axisStripLabelGroup = this._axisBreaksGroup = null;
        this._axisLineGroup = this._axisElementsGroup = this._axisGridGroup = null;
        this._axisGroup = this._axisTitleGroup = null;
        this._axesContainerGroup = this._stripsGroup = this._constantLinesGroup = this._labelsAxesGroup = null;
        this._renderer = this._options = this._textOptions = this._textFontStyles = null;
        this._translator = null;
        this._majorTicks = this._minorTicks = null;
        this._disposeBreaksGroup();
        this._templatesRendered && this._templatesRendered.reject()
    },
    getOptions: function() {
        return this._options
    },
    setPane: function(pane) {
        this.pane = pane;
        this._options.pane = pane
    },
    setTypes: function(type, axisType, typeSelector) {
        this._options.type = type || this._options.type;
        this._options[typeSelector] = axisType || this._options[typeSelector];
        this._updateTranslator()
    },
    resetTypes: function(typeSelector) {
        this._options.type = this._initTypes.type;
        this._options[typeSelector] = this._initTypes[typeSelector]
    },
    getTranslator: function() {
        return this._translator
    },
    updateOptions: function(options) {
        var that = this;
        var labelOpt = options.label;
        validateAxisOptions(options);
        that._options = options;
        options.tick = options.tick || {};
        options.minorTick = options.minorTick || {};
        options.grid = options.grid || {};
        options.minorGrid = options.minorGrid || {};
        options.title = options.title || {};
        options.marker = options.marker || {};
        that._initTypes = {
            type: options.type,
            argumentType: options.argumentType,
            valueType: options.valueType
        };
        that._setTickOffset();
        that._isHorizontal = options.isHorizontal;
        that.pane = options.pane;
        that.name = options.name;
        that.priority = options.priority;
        that._hasLabelFormat = "" !== labelOpt.format && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(labelOpt.format);
        that._textOptions = {
            opacity: labelOpt.opacity,
            align: "center",
            class: labelOpt.cssClass
        };
        that._textFontStyles = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["patchFontOptions"])(labelOpt.font);
        if (options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].logarithmic) {
            if (options.logarithmBaseError) {
                that._incidentOccurred("E2104");
                delete options.logarithmBaseError
            }
        }
        that._updateTranslator();
        that._createConstantLines();
        that._strips = (options.strips || []).map(o => Object(_strip__WEBPACK_IMPORTED_MODULE_18__["default"])(that, o));
        that._majorTicks = that._minorTicks = null;
        that._firstDrawing = true
    },
    calculateInterval: function(value, prevValue) {
        var options = this._options;
        if (!options || options.type !== _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].logarithmic) {
            return _abs(value - prevValue)
        }
        var {
            allowNegatives: allowNegatives,
            linearThreshold: linearThreshold
        } = new _translators_range__WEBPACK_IMPORTED_MODULE_10__["Range"](this.getTranslator().getBusinessRange());
        return _abs(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getLogExt"])(value, options.logarithmBase, allowNegatives, linearThreshold) - Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getLogExt"])(prevValue, options.logarithmBase, allowNegatives, linearThreshold))
    },
    getCanvasRange() {
        var translator = this._translator;
        return {
            startValue: translator.from(translator.translate("canvas_position_start")),
            endValue: translator.from(translator.translate("canvas_position_end"))
        }
    },
    _processCanvas: function(canvas) {
        return canvas
    },
    updateCanvas: function(canvas, canvasRedesign) {
        if (!canvasRedesign) {
            var positions = this._orthogonalPositions = {
                start: !this._isHorizontal ? canvas.left : canvas.top,
                end: !this._isHorizontal ? canvas.width - canvas.right : canvas.height - canvas.bottom
            };
            positions.center = positions.start + (positions.end - positions.start) / 2
        } else {
            this._orthogonalPositions = null
        }
        this._canvas = canvas;
        this._translator.updateCanvas(this._processCanvas(canvas));
        this._initAxisPositions()
    },
    getCanvas: function() {
        return this._canvas
    },
    getAxisShift() {
        return this._axisShift || 0
    },
    hideTitle: function() {
        if (this._options.title.text) {
            this._incidentOccurred("W2105", [this._isHorizontal ? "horizontal" : "vertical"]);
            this._axisTitleGroup.clear()
        }
    },
    getTitle: function() {
        return this._title
    },
    hideOuterElements: function() {
        var options = this._options;
        if ((options.label.visible || this._outsideConstantLines.length) && !this._translator.getBusinessRange().isEmpty()) {
            this._incidentOccurred("W2106", [this._isHorizontal ? "horizontal" : "vertical"]);
            this._axisElementsGroup.clear();
            callAction(this._outsideConstantLines, "removeLabel")
        }
    },
    _resolveLogarithmicOptionsForRange(range) {
        var options = this._options;
        if (options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].logarithmic) {
            range.addRange({
                allowNegatives: void 0 !== options.allowNegatives ? options.allowNegatives : range.min <= 0
            });
            if (!isNaN(options.linearThreshold)) {
                range.linearThreshold = options.linearThreshold
            }
        }
    },
    adjustViewport(businessRange) {
        var options = this._options;
        var isDiscrete = options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete;
        var categories = this._seriesData && this._seriesData.categories || [];
        var wholeRange = this.adjustRange(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getVizRangeObject"])(options.wholeRange));
        var visualRange = this.getViewport() || {};
        var result = new _translators_range__WEBPACK_IMPORTED_MODULE_10__["Range"](businessRange);
        this._addConstantLinesToRange(result, "minVisible", "maxVisible");
        var minDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(visualRange.startValue);
        var maxDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(visualRange.endValue);
        if (!isDiscrete) {
            minDefined = minDefined && (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(wholeRange.endValue) || visualRange.startValue < wholeRange.endValue);
            maxDefined = maxDefined && (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(wholeRange.startValue) || visualRange.endValue > wholeRange.startValue)
        }
        var minVisible = minDefined ? visualRange.startValue : result.minVisible;
        var maxVisible = maxDefined ? visualRange.endValue : result.maxVisible;
        if (!isDiscrete) {
            var _wholeRange$startValu, _wholeRange$endValue;
            result.min = null !== (_wholeRange$startValu = wholeRange.startValue) && void 0 !== _wholeRange$startValu ? _wholeRange$startValu : result.min;
            result.max = null !== (_wholeRange$endValue = wholeRange.endValue) && void 0 !== _wholeRange$endValue ? _wholeRange$endValue : result.max
        } else {
            var categoriesInfo = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getCategoriesInfo"])(categories, wholeRange.startValue, wholeRange.endValue);
            categories = categoriesInfo.categories;
            result.categories = categories
        }
        var adjustedVisualRange = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["adjustVisualRange"])({
            axisType: options.type,
            dataType: options.dataType,
            base: options.logarithmBase
        }, {
            startValue: minDefined ? visualRange.startValue : void 0,
            endValue: maxDefined ? visualRange.endValue : void 0,
            length: visualRange.length
        }, {
            categories: categories,
            min: wholeRange.startValue,
            max: wholeRange.endValue
        }, {
            categories: categories,
            min: minVisible,
            max: maxVisible
        });
        result.minVisible = adjustedVisualRange.startValue;
        result.maxVisible = adjustedVisualRange.endValue;
        !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(result.min) && (result.min = result.minVisible);
        !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(result.max) && (result.max = result.maxVisible);
        result.addRange({});
        this._resolveLogarithmicOptionsForRange(result);
        return result
    },
    adjustRange(range) {
        range = range || {};
        var isDiscrete = this._options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete;
        var isLogarithmic = this._options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].logarithmic;
        var disabledNegatives = false === this._options.allowNegatives;
        if (isLogarithmic) {
            range.startValue = disabledNegatives && range.startValue <= 0 ? null : range.startValue;
            range.endValue = disabledNegatives && range.endValue <= 0 ? null : range.endValue
        }
        if (!isDiscrete && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(range.startValue) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(range.endValue) && range.startValue > range.endValue) {
            var tmp = range.endValue;
            range.endValue = range.startValue;
            range.startValue = tmp
        }
        return range
    },
    _getVisualRangeUpdateMode(viewport, newRange, oppositeValue) {
        var value = this._options.visualRangeUpdateMode;
        var translator = this._translator;
        var range = this._seriesData;
        var prevDataInfo = this._prevDataInfo;
        if (prevDataInfo.isEmpty && !prevDataInfo.containsConstantLine) {
            return KEEP
        }
        if (!this.isArgumentAxis) {
            var _viewport = this.getViewport();
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(_viewport.startValue) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(_viewport.endValue) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(_viewport.length)) {
                return RESET
            }
        }
        if (this.isArgumentAxis) {
            if (-1 === [SHIFT, KEEP, RESET].indexOf(value)) {
                if (range.axisType === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete) {
                    var categories = range.categories;
                    var newCategories = newRange.categories;
                    var visualRange = this.visualRange();
                    if (categories && newCategories && categories.length && -1 !== newCategories.map(c => c.valueOf()).join(",").indexOf(categories.map(c => c.valueOf()).join(",")) && (visualRange.startValue.valueOf() !== categories[0].valueOf() || visualRange.endValue.valueOf() !== categories[categories.length - 1].valueOf())) {
                        value = KEEP
                    } else {
                        value = RESET
                    }
                } else {
                    var minPoint = translator.translate(range.min);
                    var minVisiblePoint = translator.translate(viewport.startValue);
                    var maxPoint = translator.translate(range.max);
                    var maxVisiblePoint = translator.translate(viewport.endValue);
                    if (minPoint === minVisiblePoint && maxPoint === maxVisiblePoint) {
                        value = RESET
                    } else if (minPoint !== minVisiblePoint && maxPoint === maxVisiblePoint) {
                        value = SHIFT
                    } else {
                        value = KEEP
                    }
                }
                if (value === KEEP && prevDataInfo.isEmpty && prevDataInfo.containsConstantLine) {
                    value = RESET
                }
            }
        } else if (-1 === [KEEP, RESET].indexOf(value)) {
            if (oppositeValue === KEEP) {
                value = KEEP
            } else {
                value = RESET
            }
        }
        return value
    },
    _handleBusinessRangeChanged(oppositeVisualRangeUpdateMode, axisReinitialized, newRange) {
        var visualRange = this.visualRange();
        if (axisReinitialized || this._translator.getBusinessRange().isEmpty()) {
            return
        }
        var visualRangeUpdateMode = this._lastVisualRangeUpdateMode = this._getVisualRangeUpdateMode(visualRange, newRange, oppositeVisualRangeUpdateMode);
        if (visualRangeUpdateMode === KEEP) {
            this._setVisualRange([visualRange.startValue, visualRange.endValue])
        } else if (visualRangeUpdateMode === RESET) {
            this._setVisualRange([null, null])
        } else if (visualRangeUpdateMode === SHIFT) {
            this._setVisualRange({
                length: this.getVisualRangeLength()
            })
        }
    },
    getVisualRangeLength(range) {
        var currentBusinessRange = range || this._translator.getBusinessRange();
        var {
            type: type
        } = this._options;
        var length;
        if (type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].logarithmic) {
            length = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_12__["adjust"])(this.calculateInterval(currentBusinessRange.maxVisible, currentBusinessRange.minVisible))
        } else if (type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete) {
            var categoriesInfo = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getCategoriesInfo"])(currentBusinessRange.categories, currentBusinessRange.minVisible, currentBusinessRange.maxVisible);
            length = categoriesInfo.categories.length
        } else {
            length = currentBusinessRange.maxVisible - currentBusinessRange.minVisible
        }
        return length
    },
    getVisualRangeCenter(range, useMerge) {
        var translator = this.getTranslator();
        var businessRange = translator.getBusinessRange();
        var currentBusinessRange = useMerge ? Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(true, {}, businessRange, range || {}) : range || businessRange;
        var {
            type: type,
            logarithmBase: logarithmBase
        } = this._options;
        var center;
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(currentBusinessRange.minVisible) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(currentBusinessRange.maxVisible)) {
            return
        }
        if (type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].logarithmic) {
            var {
                allowNegatives: allowNegatives,
                linearThreshold: linearThreshold,
                minVisible: minVisible,
                maxVisible: maxVisible
            } = currentBusinessRange;
            center = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["raiseToExt"])(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_12__["adjust"])(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getLogExt"])(maxVisible, logarithmBase, allowNegatives, linearThreshold) + Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getLogExt"])(minVisible, logarithmBase, allowNegatives, linearThreshold)) / 2, logarithmBase, allowNegatives, linearThreshold)
        } else if (type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete) {
            var categoriesInfo = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getCategoriesInfo"])(currentBusinessRange.categories, currentBusinessRange.minVisible, currentBusinessRange.maxVisible);
            var index = Math.ceil(categoriesInfo.categories.length / 2) - 1;
            center = businessRange.categories.indexOf(categoriesInfo.categories[index])
        } else {
            center = translator.toValue((currentBusinessRange.maxVisible.valueOf() + currentBusinessRange.minVisible.valueOf()) / 2)
        }
        return center
    },
    setBusinessRange(range, axisReinitialized, oppositeVisualRangeUpdateMode, argCategories) {
        var _that$_seriesData$min, _that$_seriesData$max;
        var options = this._options;
        var isDiscrete = options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete;
        this._handleBusinessRangeChanged(oppositeVisualRangeUpdateMode, axisReinitialized, range);
        this._seriesData = new _translators_range__WEBPACK_IMPORTED_MODULE_10__["Range"](range);
        var dataIsEmpty = this._seriesData.isEmpty();
        var rangeWithConstantLines = new _translators_range__WEBPACK_IMPORTED_MODULE_10__["Range"](this._seriesData);
        this._addConstantLinesToRange(rangeWithConstantLines, "minVisible", "maxVisible");
        this._prevDataInfo = {
            isEmpty: dataIsEmpty,
            containsConstantLine: rangeWithConstantLines.containsConstantLine
        };
        this._seriesData.addRange({
            categories: options.categories,
            dataType: options.dataType,
            axisType: options.type,
            base: options.logarithmBase,
            invert: options.inverted
        });
        this._resolveLogarithmicOptionsForRange(this._seriesData);
        if (!isDiscrete) {
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(this._seriesData.min) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(this._seriesData.max)) {
                var visualRange = this.getViewport();
                visualRange && this._seriesData.addRange({
                    min: visualRange.startValue,
                    max: visualRange.endValue
                })
            }
            var synchronizedValue = options.synchronizedValue;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(synchronizedValue)) {
                this._seriesData.addRange({
                    min: synchronizedValue,
                    max: synchronizedValue
                })
            }
        }
        this._seriesData.minVisible = null !== (_that$_seriesData$min = this._seriesData.minVisible) && void 0 !== _that$_seriesData$min ? _that$_seriesData$min : this._seriesData.min;
        this._seriesData.maxVisible = null !== (_that$_seriesData$max = this._seriesData.maxVisible) && void 0 !== _that$_seriesData$max ? _that$_seriesData$max : this._seriesData.max;
        if (!this.isArgumentAxis && options.showZero) {
            this._seriesData.correctValueZeroLevel()
        }
        this._seriesData.sortCategories(this.getCategoriesSorter(argCategories));
        this._seriesData.userBreaks = this._seriesData.isEmpty() ? [] : this._getScaleBreaks(options, this._seriesData, this._series, this.isArgumentAxis);
        this._translator.updateBusinessRange(this._getViewportRange())
    },
    _addConstantLinesToRange(dataRange, minValueField, maxValueField) {
        this._outsideConstantLines.concat(this._insideConstantLines || []).forEach(cl => {
            if (cl.options.extendAxis) {
                var value = cl.getParsedValue();
                dataRange.addRange({
                    containsConstantLine: true,
                    [minValueField]: value,
                    [maxValueField]: value
                })
            }
        })
    },
    setGroupSeries: function(series) {
        this._series = series
    },
    getLabelsPosition: function() {
        var options = this._options;
        var position = options.position;
        var labelShift = options.label.indentFromAxis + (this._axisShift || 0) + this._constantLabelOffset;
        var axisPosition = this._axisPosition;
        return position === TOP || position === LEFT ? axisPosition - labelShift : axisPosition + labelShift
    },
    getFormattedValue: function(value, options, point) {
        var labelOptions = this._options.label;
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(value) ? this.formatLabel(value, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(true, {}, labelOptions, options), void 0, point) : null
    },
    _getBoundaryTicks: function(majors, viewPort) {
        var length = majors.length;
        var options = this._options;
        var customBounds = options.customBoundTicks;
        var min = viewPort.minVisible;
        var max = viewPort.maxVisible;
        var addMinMax = options.showCustomBoundaryTicks ? this._boundaryTicksVisibility : {};
        var boundaryTicks = [];
        if (options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete) {
            if (this._tickOffset && 0 !== majors.length) {
                boundaryTicks = [majors[0], majors[majors.length - 1]]
            }
        } else if (customBounds) {
            if (addMinMax.min && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(customBounds[0])) {
                boundaryTicks.push(customBounds[0])
            }
            if (addMinMax.max && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(customBounds[1])) {
                boundaryTicks.push(customBounds[1])
            }
        } else {
            if (addMinMax.min && (0 === length || majors[0] > min)) {
                boundaryTicks.push(min)
            }
            if (addMinMax.max && (0 === length || majors[length - 1] < max)) {
                boundaryTicks.push(max)
            }
        }
        return boundaryTicks
    },
    setPercentLabelFormat: function() {
        if (!this._hasLabelFormat) {
            this._options.label.format = "percent"
        }
    },
    resetAutoLabelFormat: function() {
        if (!this._hasLabelFormat) {
            delete this._options.label.format
        }
    },
    getMultipleAxesSpacing: function() {
        return this._options.multipleAxesSpacing || 0
    },
    getTicksValues: function() {
        return {
            majorTicksValues: convertTicksToValues(this._majorTicks),
            minorTicksValues: convertTicksToValues(this._minorTicks)
        }
    },
    estimateTickInterval: function(canvas) {
        this.updateCanvas(canvas);
        return this._tickInterval !== this._getTicks(this._getViewportRange(), _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"], true).tickInterval
    },
    setTicks: function(ticks) {
        var majors = ticks.majorTicks || [];
        this._majorTicks = majors.map(createMajorTick(this, this._renderer, this._getSkippedCategory(majors)));
        this._minorTicks = (ticks.minorTicks || []).map(createMinorTick(this, this._renderer));
        this._isSynchronized = true
    },
    _adjustDivisionFactor: function(val) {
        return val
    },
    _getTicks: function(viewPort, incidentOccurred, skipTickGeneration) {
        var options = this._options;
        var customTicks = options.customTicks;
        var customMinorTicks = options.customMinorTicks;
        return getTickGenerator(options, incidentOccurred || this._incidentOccurred, skipTickGeneration, this._translator.getBusinessRange().isEmpty(), this._adjustDivisionFactor.bind(this), viewPort)({
            min: viewPort.minVisible,
            max: viewPort.maxVisible,
            categories: viewPort.categories,
            isSpacedMargin: viewPort.isSpacedMargin
        }, this._getScreenDelta(), options.tickInterval, "ignore" === options.label.overlappingBehavior || options.forceUserTickInterval, {
            majors: customTicks,
            minors: customMinorTicks
        }, options.minorTickInterval, options.minorTickCount, this._initialBreaks)
    },
    _createTicksAndLabelFormat: function(range, incidentOccurred) {
        var options = this._options;
        var ticks = this._getTicks(range, incidentOccurred, false);
        if (!range.isEmpty() && options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete && "datetime" === options.dataType && !this._hasLabelFormat && ticks.ticks.length) {
            options.label.format = _format_helper__WEBPACK_IMPORTED_MODULE_6__["default"].getDateFormatByTicks(ticks.ticks)
        }
        return ticks
    },
    getAggregationInfo(useAllAggregatedPoints, range) {
        var _visualRange$startVal, _visualRange$endValue, _that$_seriesData;
        var options = this._options;
        var marginOptions = this._marginOptions;
        var businessRange = new _translators_range__WEBPACK_IMPORTED_MODULE_10__["Range"](this.getTranslator().getBusinessRange()).addRange(range);
        var visualRange = this.getViewport();
        var minVisible = null !== (_visualRange$startVal = null === visualRange || void 0 === visualRange ? void 0 : visualRange.startValue) && void 0 !== _visualRange$startVal ? _visualRange$startVal : businessRange.minVisible;
        var maxVisible = null !== (_visualRange$endValue = null === visualRange || void 0 === visualRange ? void 0 : visualRange.endValue) && void 0 !== _visualRange$endValue ? _visualRange$endValue : businessRange.maxVisible;
        var ticks = [];
        if (options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete && options.aggregateByCategory) {
            return {
                aggregateByCategory: true
            }
        }
        var aggregationInterval = options.aggregationInterval;
        var aggregationGroupWidth = options.aggregationGroupWidth;
        if (!aggregationGroupWidth && marginOptions) {
            if (marginOptions.checkInterval) {
                aggregationGroupWidth = options.axisDivisionFactor
            }
            if (marginOptions.sizePointNormalState) {
                aggregationGroupWidth = Math.min(marginOptions.sizePointNormalState, options.axisDivisionFactor)
            }
        }
        var minInterval = !options.aggregationGroupWidth && !aggregationInterval && range.interval;
        var generateTicks = configureGenerator(options, aggregationGroupWidth, businessRange, this._getScreenDelta(), minInterval);
        var tickInterval = generateTicks(aggregationInterval, true, minVisible, maxVisible, null === (_that$_seriesData = this._seriesData) || void 0 === _that$_seriesData ? void 0 : _that$_seriesData.breaks).tickInterval;
        if (options.type !== _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete) {
            var min = useAllAggregatedPoints ? businessRange.min : minVisible;
            var max = useAllAggregatedPoints ? businessRange.max : maxVisible;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(min) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(max)) {
                var add = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getAddFunction"])({
                    base: options.logarithmBase,
                    axisType: options.type,
                    dataType: options.dataType
                }, false);
                var start = min;
                var end = max;
                if (!useAllAggregatedPoints && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(tickInterval)) {
                    var maxMinDistance = Math.max(this.calculateInterval(max, min), "datetime" === options.dataType ? _core_utils_date__WEBPACK_IMPORTED_MODULE_13__["default"].dateToMilliseconds(tickInterval) : tickInterval);
                    start = add(min, maxMinDistance, -1);
                    end = add(max, maxMinDistance)
                }
                start = start < businessRange.min ? businessRange.min : start;
                end = end > businessRange.max ? businessRange.max : end;
                var breaks = this._getScaleBreaks(options, {
                    minVisible: start,
                    maxVisible: end
                }, this._series, this.isArgumentAxis);
                var filteredBreaks = this._filterBreaks(breaks, {
                    minVisible: start,
                    maxVisible: end
                }, options.breakStyle);
                ticks = generateTicks(tickInterval, false, start, end, filteredBreaks).ticks
            }
        }
        this._aggregationInterval = tickInterval;
        return {
            interval: tickInterval,
            ticks: ticks
        }
    },
    getTickInterval() {
        return this._tickInterval
    },
    getAggregationInterval() {
        return this._aggregationInterval
    },
    createTicks: function(canvas) {
        var that = this;
        var renderer = that._renderer;
        var options = that._options;
        if (!canvas) {
            return
        }
        that._isSynchronized = false;
        that.updateCanvas(canvas);
        var range = that._getViewportRange();
        that._initialBreaks = range.breaks = this._seriesData.breaks = that._filterBreaks(this._seriesData.userBreaks, range, options.breakStyle);
        that._estimatedTickInterval = that._getTicks(that.adjustViewport(this._seriesData), _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"], true).tickInterval;
        var margins = this._calculateValueMargins();
        range.addRange({
            minVisible: margins.minValue,
            maxVisible: margins.maxValue,
            isSpacedMargin: margins.isSpacedMargin
        });
        var ticks = that._createTicksAndLabelFormat(range);
        var boundaryTicks = that._getBoundaryTicks(ticks.ticks, that._getViewportRange());
        if (options.showCustomBoundaryTicks && boundaryTicks.length) {
            that._boundaryTicks = [boundaryTicks[0]].map(createBoundaryTick(that, renderer, true));
            if (boundaryTicks.length > 1) {
                that._boundaryTicks = that._boundaryTicks.concat([boundaryTicks[1]].map(createBoundaryTick(that, renderer, false)))
            }
        } else {
            that._boundaryTicks = []
        }
        var minors = (ticks.minorTicks || []).filter((function(minor) {
            return !boundaryTicks.some((function(boundary) {
                return Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(boundary) === Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(minor)
            }))
        }));
        that._tickInterval = ticks.tickInterval;
        that._minorTickInterval = ticks.minorTickInterval;
        var oldMajorTicks = that._majorTicks || [];
        var majorTicksByValues = oldMajorTicks.reduce((r, t) => {
            r[t.value.valueOf()] = t;
            return r
        }, {});
        var sameType = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["type"])(ticks.ticks[0]) === Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["type"])(oldMajorTicks[0] && oldMajorTicks[0].value);
        var skippedCategory = that._getSkippedCategory(ticks.ticks);
        var majorTicks = ticks.ticks.map(v => {
            var tick = majorTicksByValues[v.valueOf()];
            if (tick && sameType) {
                delete majorTicksByValues[v.valueOf()];
                tick.setSkippedCategory(skippedCategory);
                return tick
            } else {
                return createMajorTick(that, renderer, skippedCategory)(v)
            }
        });
        that._majorTicks = majorTicks;
        var oldMinorTicks = that._minorTicks || [];
        that._minorTicks = minors.map((v, i) => {
            var minorTick = oldMinorTicks[i];
            if (minorTick) {
                minorTick.updateValue(v);
                return minorTick
            }
            return createMinorTick(that, renderer)(v)
        });
        that._ticksToRemove = Object.keys(majorTicksByValues).map(k => majorTicksByValues[k]).concat(oldMinorTicks.slice(that._minorTicks.length, oldMinorTicks.length));
        that._ticksToRemove.forEach(t => {
            var _t$label;
            return null === (_t$label = t.label) || void 0 === _t$label ? void 0 : _t$label.removeTitle()
        });
        if (ticks.breaks) {
            that._seriesData.breaks = ticks.breaks
        }
        that._reinitTranslator(that._getViewportRange())
    },
    _reinitTranslator: function(range) {
        var translator = this._translator;
        if (this._isSynchronized) {
            return
        }
        translator.updateBusinessRange(range)
    },
    _getViewportRange() {
        return this.adjustViewport(this._seriesData)
    },
    setMarginOptions: function(options) {
        this._marginOptions = options
    },
    getMarginOptions() {
        var _this$_marginOptions;
        return null !== (_this$_marginOptions = this._marginOptions) && void 0 !== _this$_marginOptions ? _this$_marginOptions : {}
    },
    _calculateRangeInterval: function(interval) {
        var isDateTime = "datetime" === this._options.dataType;
        var minArgs = [];
        var addToArgs = function(value) {
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(value) && minArgs.push(isDateTime ? _core_utils_date__WEBPACK_IMPORTED_MODULE_13__["default"].dateToMilliseconds(value) : value)
        };
        addToArgs(this._tickInterval);
        addToArgs(this._estimatedTickInterval);
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(interval) && minArgs.push(interval);
        addToArgs(this._aggregationInterval);
        return this._calculateWorkWeekInterval(_min.apply(this, minArgs))
    },
    _calculateWorkWeekInterval(businessInterval) {
        var options = this._options;
        if ("datetime" === options.dataType && options.workdaysOnly && businessInterval) {
            var workWeek = options.workWeek.length * dateIntervals.day;
            var weekend = dateIntervals.week - workWeek;
            if (workWeek !== businessInterval && weekend < businessInterval) {
                var weekendsCount = Math.ceil(businessInterval / dateIntervals.week);
                businessInterval -= weekend * weekendsCount
            } else if (weekend >= businessInterval && businessInterval > dateIntervals.day) {
                businessInterval = dateIntervals.day
            }
        }
        return businessInterval
    },
    _getConvertIntervalCoefficient(intervalInPx, screenDelta) {
        var ratioOfCanvasRange = this._translator.ratioOfCanvasRange();
        return ratioOfCanvasRange / (ratioOfCanvasRange * screenDelta / (intervalInPx + screenDelta))
    },
    _calculateValueMargins(ticks) {
        this._resetMargins();
        var margins = this.getMarginOptions();
        var marginSize = (margins.size || 0) / 2;
        var options = this._options;
        var dataRange = this._getViewportRange();
        var viewPort = this.getViewport();
        var screenDelta = this._getScreenDelta();
        var isDiscrete = -1 !== (options.type || "").indexOf(_axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete);
        var valueMarginsEnabled = options.valueMarginsEnabled && !isDiscrete && !this.customPositionIsBoundaryOrthogonalAxis();
        var translator = this._translator;
        var minValueMargin = options.minValueMargin;
        var maxValueMargin = options.maxValueMargin;
        var minPadding = 0;
        var maxPadding = 0;
        var interval = 0;
        var rangeInterval;
        if (dataRange.stubData || !screenDelta) {
            return {
                startPadding: 0,
                endPadding: 0
            }
        }
        if (this.isArgumentAxis && margins.checkInterval) {
            rangeInterval = this._calculateRangeInterval(dataRange.interval);
            var pxInterval = translator.getInterval(rangeInterval);
            if (isFinite(pxInterval)) {
                interval = Math.ceil(pxInterval / (2 * this._getConvertIntervalCoefficient(pxInterval, screenDelta)))
            } else {
                rangeInterval = 0
            }
        }
        var minPercentPadding;
        var maxPercentPadding;
        var maxPaddingValue = screenDelta * MAX_MARGIN_VALUE / 2;
        if (valueMarginsEnabled) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(minValueMargin)) {
                minPercentPadding = isFinite(minValueMargin) ? minValueMargin : 0
            } else if (!this.isArgumentAxis && margins.checkInterval && Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(dataRange.minVisible) > 0 && Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(dataRange.minVisible) === Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(dataRange.min)) {
                minPadding = MIN_BAR_MARGIN
            } else {
                minPadding = Math.max(marginSize, interval);
                minPadding = Math.min(maxPaddingValue, minPadding)
            }
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(maxValueMargin)) {
                maxPercentPadding = isFinite(maxValueMargin) ? maxValueMargin : 0
            } else if (!this.isArgumentAxis && margins.checkInterval && Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(dataRange.maxVisible) < 0 && Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(dataRange.maxVisible) === Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(dataRange.max)) {
                maxPadding = MIN_BAR_MARGIN
            } else {
                maxPadding = Math.max(marginSize, interval);
                maxPadding = Math.min(maxPaddingValue, maxPadding)
            }
        }
        var percentStick = margins.percentStick && !this.isArgumentAxis;
        if (percentStick) {
            if (1 === _abs(dataRange.max)) {
                maxPadding = 0
            }
            if (1 === _abs(dataRange.min)) {
                minPadding = 0
            }
        }
        var canvasStartEnd = this._getCanvasStartEnd();
        var commonMargin = 1 + (minPercentPadding || 0) + (maxPercentPadding || 0);
        var screenDeltaWithMargins = (screenDelta - minPadding - maxPadding) / commonMargin || screenDelta;
        if (void 0 !== minPercentPadding || void 0 !== maxPercentPadding) {
            if (void 0 !== minPercentPadding) {
                minPadding = screenDeltaWithMargins * minPercentPadding
            }
            if (void 0 !== maxPercentPadding) {
                maxPadding = screenDeltaWithMargins * maxPercentPadding
            }
        }
        var minValue;
        var maxValue;
        if (options.type !== _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete && ticks && ticks.length > 1 && !options.skipViewportExtending && !viewPort.action && false !== options.endOnTick) {
            var length = ticks.length;
            var firstTickPosition = translator.translate(ticks[0].value);
            var lastTickPosition = translator.translate(ticks[length - 1].value);
            var invertMultiplier = firstTickPosition > lastTickPosition ? -1 : 1;
            var minTickPadding = _max(invertMultiplier * (canvasStartEnd.start - firstTickPosition), 0);
            var maxTickPadding = _max(invertMultiplier * (lastTickPosition - canvasStartEnd.end), 0);
            if (minTickPadding > minPadding || maxTickPadding > maxPadding) {
                var commonPadding = maxTickPadding + minTickPadding;
                var coeff = this._getConvertIntervalCoefficient(commonPadding, screenDelta);
                if (minTickPadding >= minPadding) {
                    minValue = ticks[0].value
                }
                if (maxTickPadding >= maxPadding) {
                    maxValue = ticks[length - 1].value
                }
                minPadding = _max(minTickPadding, minPadding) / coeff;
                maxPadding = _max(maxTickPadding, maxPadding) / coeff
            }
        }
        minPercentPadding = void 0 === minPercentPadding ? minPadding / screenDeltaWithMargins : minPercentPadding;
        maxPercentPadding = void 0 === maxPercentPadding ? maxPadding / screenDeltaWithMargins : maxPercentPadding;
        if (!isDiscrete) {
            if (this._translator.isInverted()) {
                var _minValue, _maxValue;
                minValue = null !== (_minValue = minValue) && void 0 !== _minValue ? _minValue : translator.from(canvasStartEnd.start + screenDelta * minPercentPadding, -1);
                maxValue = null !== (_maxValue = maxValue) && void 0 !== _maxValue ? _maxValue : translator.from(canvasStartEnd.end - screenDelta * maxPercentPadding, 1)
            } else {
                var _minValue2, _maxValue2;
                minValue = null !== (_minValue2 = minValue) && void 0 !== _minValue2 ? _minValue2 : translator.from(canvasStartEnd.start - screenDelta * minPercentPadding, -1);
                maxValue = null !== (_maxValue2 = maxValue) && void 0 !== _maxValue2 ? _maxValue2 : translator.from(canvasStartEnd.end + screenDelta * maxPercentPadding, 1)
            }
        }
        var {
            correctedMin: correctedMin,
            correctedMax: correctedMax,
            start: start,
            end: end
        } = this.getCorrectedValuesToZero(minValue, maxValue);
        minPadding = null !== start && void 0 !== start ? start : minPadding;
        maxPadding = null !== end && void 0 !== end ? end : maxPadding;
        return {
            startPadding: translator.isInverted() ? maxPadding : minPadding,
            endPadding: translator.isInverted() ? minPadding : maxPadding,
            minValue: null !== correctedMin && void 0 !== correctedMin ? correctedMin : minValue,
            maxValue: null !== correctedMax && void 0 !== correctedMax ? correctedMax : maxValue,
            interval: rangeInterval,
            isSpacedMargin: minPadding === maxPadding && 0 !== minPadding
        }
    },
    getCorrectedValuesToZero(minValue, maxValue) {
        var that = this;
        var translator = that._translator;
        var canvasStartEnd = that._getCanvasStartEnd();
        var dataRange = that._getViewportRange();
        var screenDelta = that._getScreenDelta();
        var options = that._options;
        var start;
        var end;
        var correctedMin;
        var correctedMax;
        var correctZeroLevel = (minPoint, maxPoint) => {
            var minExpectedPadding = _abs(canvasStartEnd.start - minPoint);
            var maxExpectedPadding = _abs(canvasStartEnd.end - maxPoint);
            var coeff = that._getConvertIntervalCoefficient(minExpectedPadding + maxExpectedPadding, screenDelta);
            start = minExpectedPadding / coeff;
            end = maxExpectedPadding / coeff
        };
        if (!that.isArgumentAxis && "datetime" !== options.dataType) {
            if (minValue * dataRange.min <= 0 && minValue * dataRange.minVisible <= 0) {
                correctZeroLevel(translator.translate(0), translator.translate(maxValue));
                correctedMin = 0
            }
            if (maxValue * dataRange.max <= 0 && maxValue * dataRange.maxVisible <= 0) {
                correctZeroLevel(translator.translate(minValue), translator.translate(0));
                correctedMax = 0
            }
        }
        return {
            start: isFinite(start) ? start : null,
            end: isFinite(end) ? end : null,
            correctedMin: correctedMin,
            correctedMax: correctedMax
        }
    },
    applyMargins() {
        if (this._isSynchronized) {
            return
        }
        var margins = this._calculateValueMargins(this._majorTicks);
        var canvas = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, this._canvas, {
            startPadding: margins.startPadding,
            endPadding: margins.endPadding
        });
        this._translator.updateCanvas(this._processCanvas(canvas));
        if (isFinite(margins.interval)) {
            var br = this._translator.getBusinessRange();
            br.addRange({
                interval: margins.interval
            });
            this._translator.updateBusinessRange(br)
        }
    },
    _resetMargins: function() {
        this._reinitTranslator(this._getViewportRange());
        if (this._canvas) {
            this._translator.updateCanvas(this._processCanvas(this._canvas))
        }
    },
    _createConstantLines() {
        var constantLines = (this._options.constantLines || []).map(o => Object(_constant_line__WEBPACK_IMPORTED_MODULE_17__["default"])(this, o));
        this._outsideConstantLines = constantLines.filter(l => "outside" === l.labelPosition);
        this._insideConstantLines = constantLines.filter(l => "inside" === l.labelPosition)
    },
    draw: function(canvas, borderOptions) {
        var that = this;
        var options = this._options;
        that.borderOptions = borderOptions || {
            visible: false
        };
        that._resetMargins();
        that.createTicks(canvas);
        that.applyMargins();
        that._clearAxisGroups();
        initTickCoords(that._majorTicks);
        initTickCoords(that._minorTicks);
        initTickCoords(that._boundaryTicks);
        that._axisGroup.append(that._axesContainerGroup);
        that._drawAxis();
        that._drawTitle();
        drawTickMarks(that._majorTicks, options.tick);
        drawTickMarks(that._minorTicks, options.minorTick);
        drawTickMarks(that._boundaryTicks, options.tick);
        var drawGridLine = that._getGridLineDrawer();
        drawGrids(that._majorTicks, drawGridLine);
        drawGrids(that._minorTicks, drawGridLine);
        callAction(that._majorTicks, "drawLabel", that._getViewportRange(), that._getTemplate(options.label.template));
        that._templatesRendered && that._templatesRendered.reject();
        that._templatesRendered = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_19__["Deferred"];
        that._majorTicks.forEach((function(tick) {
            tick.labelRotationAngle = 0;
            tick.labelAlignment = void 0;
            tick.labelOffset = 0
        }));
        callAction(that._outsideConstantLines.concat(that._insideConstantLines), "draw");
        callAction(that._strips, "draw");
        that._dateMarkers = that._drawDateMarkers() || [];
        that._stripLabelAxesGroup && that._axisStripLabelGroup.append(that._stripLabelAxesGroup);
        that._gridContainerGroup && that._axisGridGroup.append(that._gridContainerGroup);
        that._stripsGroup && that._axisStripGroup.append(that._stripsGroup);
        that._labelsAxesGroup && that._axisElementsGroup.append(that._labelsAxesGroup);
        if (that._constantLinesGroup) {
            that._axisConstantLineGroups.above.inside.append(that._constantLinesGroup.above);
            that._axisConstantLineGroups.above.outside1.append(that._constantLinesGroup.above);
            that._axisConstantLineGroups.above.outside2.append(that._constantLinesGroup.above);
            that._axisConstantLineGroups.under.inside.append(that._constantLinesGroup.under);
            that._axisConstantLineGroups.under.outside1.append(that._constantLinesGroup.under);
            that._axisConstantLineGroups.under.outside2.append(that._constantLinesGroup.under)
        }
        that._measureTitle();
        Object(_axes_utils__WEBPACK_IMPORTED_MODULE_20__["measureLabels"])(that._majorTicks);
        !options.label.template && that._applyWordWrap();
        Object(_axes_utils__WEBPACK_IMPORTED_MODULE_20__["measureLabels"])(that._outsideConstantLines);
        Object(_axes_utils__WEBPACK_IMPORTED_MODULE_20__["measureLabels"])(that._insideConstantLines);
        Object(_axes_utils__WEBPACK_IMPORTED_MODULE_20__["measureLabels"])(that._strips);
        Object(_axes_utils__WEBPACK_IMPORTED_MODULE_20__["measureLabels"])(that._dateMarkers);
        that._adjustConstantLineLabels(that._insideConstantLines);
        that._adjustStripLabels();
        var offset = that._constantLabelOffset = that._adjustConstantLineLabels(that._outsideConstantLines);
        if (!that._translator.getBusinessRange().isEmpty()) {
            that._setLabelsPlacement();
            offset = that._adjustLabels(offset)
        }
        _core_utils_deferred__WEBPACK_IMPORTED_MODULE_19__["when"].apply(this, that._majorTicks.map(tick => tick.getTemplateDeferred())).done(() => {
            that._templatesRendered.resolve()
        });
        offset = that._adjustDateMarkers(offset);
        that._adjustTitle(offset)
    },
    getTemplatesDef() {
        return this._templatesRendered
    },
    setRenderedState(state) {
        this._drawn = state
    },
    isRendered() {
        return this._drawn
    },
    _applyWordWrap() {
        var convertedTickInterval;
        var textWidth;
        var textHeight;
        var options = this._options;
        var tickInterval = this._tickInterval;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(tickInterval)) {
            convertedTickInterval = this.getTranslator().getInterval("datetime" === options.dataType ? _core_utils_date__WEBPACK_IMPORTED_MODULE_13__["default"].dateToMilliseconds(tickInterval) : tickInterval)
        }
        var displayMode = this._validateDisplayMode(options.label.displayMode);
        var overlappingMode = this._validateOverlappingMode(options.label.overlappingBehavior, displayMode);
        var wordWrapMode = options.label.wordWrap || "none";
        var overflowMode = options.label.textOverflow || "none";
        if (("none" !== wordWrapMode || "none" !== overflowMode) && displayMode !== ROTATE && overlappingMode !== ROTATE && "auto" !== overlappingMode) {
            var usefulSpace = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(options.placeholderSize) ? options.placeholderSize - options.label.indentFromAxis : void 0;
            if (this._isHorizontal) {
                textWidth = convertedTickInterval;
                textHeight = usefulSpace
            } else {
                textWidth = usefulSpace;
                textHeight = convertedTickInterval
            }
            var correctByWidth = false;
            var correctByHeight = false;
            if (textWidth) {
                if (this._majorTicks.some(tick => tick.labelBBox.width > textWidth)) {
                    correctByWidth = true
                }
            }
            if (textHeight) {
                if (this._majorTicks.some(tick => tick.labelBBox.height > textHeight)) {
                    correctByHeight = true
                }
            }
            if (correctByWidth || correctByHeight) {
                this._majorTicks.forEach(tick => {
                    tick.label && tick.label.setMaxSize(textWidth, textHeight, options.label)
                });
                Object(_axes_utils__WEBPACK_IMPORTED_MODULE_20__["measureLabels"])(this._majorTicks)
            }
        }
    },
    _measureTitle: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    animate() {
        callAction(this._majorTicks, "animateLabels")
    },
    updateSize(canvas, animate) {
        var updateTitle = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : true;
        this.updateCanvas(canvas);
        if (updateTitle) {
            this._checkTitleOverflow();
            this._measureTitle();
            this._updateTitleCoords()
        }
        this._reinitTranslator(this._getViewportRange());
        this.applyMargins();
        var animationEnabled = !this._firstDrawing && animate;
        var options = this._options;
        initTickCoords(this._majorTicks);
        initTickCoords(this._minorTicks);
        initTickCoords(this._boundaryTicks);
        if (this._resetApplyingAnimation && !this._firstDrawing) {
            this._resetStartCoordinates()
        }
        cleanUpInvalidTicks(this._majorTicks);
        cleanUpInvalidTicks(this._minorTicks);
        cleanUpInvalidTicks(this._boundaryTicks);
        if (this._axisElement) {
            this._updateAxisElementPosition()
        }
        updateTicksPosition(this._majorTicks, options.tick, animationEnabled);
        updateTicksPosition(this._minorTicks, options.minorTick, animationEnabled);
        updateTicksPosition(this._boundaryTicks, options.tick);
        callAction(this._majorTicks, "updateLabelPosition", animationEnabled);
        this._outsideConstantLines.concat(this._insideConstantLines || []).forEach(l => l.updatePosition(animationEnabled));
        callAction(this._strips, "updatePosition", animationEnabled);
        updateGridsPosition(this._majorTicks, animationEnabled);
        updateGridsPosition(this._minorTicks, animationEnabled);
        if (animationEnabled) {
            callAction(this._ticksToRemove || [], "fadeOutElements")
        }
        this.prepareAnimation();
        this._ticksToRemove = null;
        if (!this._translator.getBusinessRange().isEmpty()) {
            this._firstDrawing = false
        }
        this._resetApplyingAnimation = false;
        this._updateLabelsPosition()
    },
    _updateLabelsPosition: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    prepareAnimation() {
        var action = "saveCoords";
        callAction(this._majorTicks, action);
        callAction(this._minorTicks, action);
        callAction(this._insideConstantLines, action);
        callAction(this._outsideConstantLines, action);
        callAction(this._strips, action)
    },
    _resetStartCoordinates() {
        var action = "resetCoordinates";
        callAction(this._majorTicks, action);
        callAction(this._minorTicks, action);
        callAction(this._insideConstantLines, action);
        callAction(this._outsideConstantLines, action);
        callAction(this._strips, action)
    },
    applyClipRects: function(elementsClipID, canvasClipID) {
        this._axisGroup.attr({
            "clip-path": canvasClipID
        });
        this._axisStripGroup.attr({
            "clip-path": elementsClipID
        });
        this._axisElementsGroup.attr({
            "clip-path": canvasClipID
        })
    },
    _validateVisualRange(optionValue) {
        var range = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getVizRangeObject"])(optionValue);
        if (void 0 !== range.startValue) {
            range.startValue = this.validateUnit(range.startValue)
        }
        if (void 0 !== range.endValue) {
            range.endValue = this.validateUnit(range.endValue)
        }
        return Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["convertVisualRangeObject"])(range, !_isArray(optionValue))
    },
    _validateOptions(options) {
        options.wholeRange = this._validateVisualRange(options.wholeRange);
        options.visualRange = options._customVisualRange = this._validateVisualRange(options._customVisualRange);
        this._setVisualRange(options._customVisualRange)
    },
    validate() {
        var options = this._options;
        var dataType = this.isArgumentAxis ? options.argumentType : options.valueType;
        var parser = dataType ? Object(_components_parse_utils__WEBPACK_IMPORTED_MODULE_7__["getParser"])(dataType) : function(unit) {
            return unit
        };
        this.parser = parser;
        options.dataType = dataType;
        this._validateOptions(options)
    },
    resetVisualRange(isSilent) {
        this._seriesData.minVisible = this._seriesData.min;
        this._seriesData.maxVisible = this._seriesData.max;
        this.handleZooming([null, null], {
            start: !!isSilent,
            end: !!isSilent
        })
    },
    _setVisualRange(visualRange, allowPartialUpdate) {
        var range = this.adjustRange(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getVizRangeObject"])(visualRange));
        if (allowPartialUpdate) {
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(range.startValue) && (this._viewport.startValue = range.startValue);
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(range.endValue) && (this._viewport.endValue = range.endValue)
        } else {
            this._viewport = range
        }
    },
    _applyZooming(visualRange, allowPartialUpdate) {
        this._resetVisualRangeOption();
        this._setVisualRange(visualRange, allowPartialUpdate);
        var viewPort = this.getViewport();
        this._seriesData.userBreaks = this._getScaleBreaks(this._options, {
            minVisible: viewPort.startValue,
            maxVisible: viewPort.endValue
        }, this._series, this.isArgumentAxis);
        this._translator.updateBusinessRange(this._getViewportRange())
    },
    getZoomStartEventArg(event, actionType) {
        return {
            axis: this,
            range: this.visualRange(),
            cancel: false,
            event: event,
            actionType: actionType
        }
    },
    _getZoomEndEventArg(previousRange, event, actionType, zoomFactor, shift) {
        var newRange = this.visualRange();
        return {
            axis: this,
            previousRange: previousRange,
            range: newRange,
            cancel: false,
            event: event,
            actionType: actionType,
            zoomFactor: zoomFactor,
            shift: shift,
            rangeStart: newRange.startValue,
            rangeEnd: newRange.endValue
        }
    },
    getZoomBounds() {
        var wholeRange = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getVizRangeObject"])(this._options.wholeRange);
        var range = this.getTranslator().getBusinessRange();
        var secondPriorityRange = {
            startValue: getZoomBoundValue(this._initRange.startValue, range.min),
            endValue: getZoomBoundValue(this._initRange.endValue, range.max)
        };
        return {
            startValue: getZoomBoundValue(wholeRange.startValue, secondPriorityRange.startValue),
            endValue: getZoomBoundValue(wholeRange.endValue, secondPriorityRange.endValue)
        }
    },
    setInitRange() {
        this._initRange = {};
        if (0 === Object.keys(this._options.wholeRange || {}).length) {
            this._initRange = this.getZoomBounds()
        }
    },
    _resetVisualRangeOption() {
        this._options._customVisualRange = {}
    },
    getTemplatesGroups() {
        var ticks = this._majorTicks;
        if (ticks) {
            return this._majorTicks.map(tick => tick.templateContainer).filter(item => Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(item))
        } else {
            return []
        }
    },
    setCustomVisualRange(range) {
        this._options._customVisualRange = range
    },
    visualRange() {
        var args = arguments;
        var visualRange;
        if (0 === args.length) {
            var adjustedRange = this._getAdjustedBusinessRange();
            var startValue = adjustedRange.minVisible;
            var endValue = adjustedRange.maxVisible;
            if (this._options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete) {
                var _startValue, _endValue;
                startValue = null !== (_startValue = startValue) && void 0 !== _startValue ? _startValue : adjustedRange.categories[0];
                endValue = null !== (_endValue = endValue) && void 0 !== _endValue ? _endValue : adjustedRange.categories[adjustedRange.categories.length - 1];
                return {
                    startValue: startValue,
                    endValue: endValue,
                    categories: Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getCategoriesInfo"])(adjustedRange.categories, startValue, endValue).categories
                }
            }
            return {
                startValue: startValue,
                endValue: endValue
            }
        } else if (_isArray(args[0])) {
            visualRange = args[0]
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(args[0])) {
            visualRange = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, args[0])
        } else {
            visualRange = [args[0], args[1]]
        }
        var zoomResults = this.handleZooming(visualRange, args[1]);
        if (!zoomResults.isPrevented) {
            this._visualRange(this, zoomResults)
        }
    },
    handleZooming(visualRange, preventEvents, domEvent, action) {
        preventEvents = preventEvents || {};
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(visualRange)) {
            visualRange = this._validateVisualRange(visualRange);
            visualRange.action = action
        }
        var zoomStartEvent = this.getZoomStartEventArg(domEvent, action);
        var previousRange = zoomStartEvent.range;
        !preventEvents.start && this._eventTrigger("zoomStart", zoomStartEvent);
        var zoomResults = {
            isPrevented: zoomStartEvent.cancel,
            skipEventRising: preventEvents.skipEventRising,
            range: visualRange || zoomStartEvent.range
        };
        if (!zoomStartEvent.cancel) {
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(visualRange) && this._applyZooming(visualRange, preventEvents.allowPartialUpdate);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(this._storedZoomEndParams)) {
                this._storedZoomEndParams = {
                    startRange: previousRange,
                    type: this.getOptions().type
                }
            }
            this._storedZoomEndParams.event = domEvent;
            this._storedZoomEndParams.action = action;
            this._storedZoomEndParams.prevent = !!preventEvents.end
        }
        return zoomResults
    },
    handleZoomEnd() {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(this._storedZoomEndParams) && !this._storedZoomEndParams.prevent) {
            var previousRange = this._storedZoomEndParams.startRange;
            var domEvent = this._storedZoomEndParams.event;
            var action = this._storedZoomEndParams.action;
            var previousBusinessRange = {
                minVisible: previousRange.startValue,
                maxVisible: previousRange.endValue,
                categories: previousRange.categories
            };
            var typeIsNotChanged = this.getOptions().type === this._storedZoomEndParams.type;
            var shift = typeIsNotChanged ? Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_12__["adjust"])(this.getVisualRangeCenter() - this.getVisualRangeCenter(previousBusinessRange, false)) : NaN;
            var zoomFactor = typeIsNotChanged ? +(Math.round(this.getVisualRangeLength(previousBusinessRange) / (this.getVisualRangeLength() || 1) + "e+2") + "e-2") : NaN;
            var zoomEndEvent = this._getZoomEndEventArg(previousRange, domEvent, action, zoomFactor, shift);
            zoomEndEvent.cancel = this.checkZoomingLowerLimitOvercome(1 === zoomFactor ? "pan" : "zoom", zoomFactor).stopInteraction;
            this._eventTrigger("zoomEnd", zoomEndEvent);
            if (zoomEndEvent.cancel) {
                this._restorePreviousVisualRange(previousRange)
            }
            this._storedZoomEndParams = null
        }
    },
    _restorePreviousVisualRange(previousRange) {
        this._storedZoomEndParams = null;
        this._applyZooming(previousRange);
        this._visualRange(this, previousRange)
    },
    checkZoomingLowerLimitOvercome(actionType, zoomFactor, range) {
        var options = this._options;
        var translator = this._translator;
        var minZoom = options.minVisualRangeLength;
        var correctedRange = range;
        var visualRange;
        var isOvercoming = "zoom" === actionType && zoomFactor >= 1;
        var businessRange = translator.getBusinessRange();
        if (range) {
            visualRange = this.adjustRange(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getVizRangeObject"])(range));
            visualRange = {
                minVisible: visualRange.startValue,
                maxVisible: visualRange.endValue,
                categories: businessRange.categories
            }
        }
        var beforeVisualRangeLength = this.getVisualRangeLength(businessRange);
        var afterVisualRangeLength = this.getVisualRangeLength(visualRange);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(minZoom) || "discrete" === options.type) {
            minZoom = translator.convert(minZoom);
            if (visualRange && minZoom < beforeVisualRangeLength && minZoom >= afterVisualRangeLength) {
                correctedRange = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getVizRangeObject"])(translator.getRangeByMinZoomValue(minZoom, visualRange));
                isOvercoming = false
            } else {
                isOvercoming &= minZoom > afterVisualRangeLength
            }
        } else {
            var canvasLength = this._translator.canvasLength;
            var fullRange = {
                minVisible: businessRange.min,
                maxVisible: businessRange.max,
                categories: businessRange.categories
            };
            isOvercoming &= this.getVisualRangeLength(fullRange) / canvasLength >= afterVisualRangeLength
        }
        return {
            stopInteraction: !!isOvercoming,
            correctedRange: correctedRange
        }
    },
    isExtremePosition(isMax) {
        var extremeDataValue;
        var seriesData;
        if ("discrete" === this._options.type) {
            seriesData = this._translator.getBusinessRange();
            extremeDataValue = isMax ? seriesData.categories[seriesData.categories.length - 1] : seriesData.categories[0]
        } else {
            seriesData = this.getZoomBounds();
            extremeDataValue = isMax ? seriesData.endValue : seriesData.startValue
        }
        var translator = this.getTranslator();
        var extremePoint = translator.translate(extremeDataValue);
        var visualRange = this.visualRange();
        var visualRangePoint = isMax ? translator.translate(visualRange.endValue) : translator.translate(visualRange.startValue);
        return _abs(visualRangePoint - extremePoint) < SCROLL_THRESHOLD
    },
    getViewport() {
        return this._viewport
    },
    getFullTicks: function() {
        var majors = this._majorTicks || [];
        if (this._options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete) {
            return convertTicksToValues(majors)
        } else {
            return convertTicksToValues(majors.concat(this._minorTicks, this._boundaryTicks)).sort((function(a, b) {
                return Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(a) - Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["valueOf"])(b)
            }))
        }
    },
    measureLabels: function(canvas, withIndents) {
        var that = this;
        var options = that._options;
        var widthAxis = options.visible ? options.width : 0;
        var ticks;
        var indent = withIndents ? options.label.indentFromAxis + .5 * options.tick.length : 0;
        var tickInterval;
        var viewportRange = that._getViewportRange();
        if (viewportRange.isEmpty() || !options.label.visible || !that._axisElementsGroup) {
            return {
                height: widthAxis,
                width: widthAxis,
                x: 0,
                y: 0
            }
        }
        if (that._majorTicks) {
            ticks = convertTicksToValues(that._majorTicks)
        } else {
            that.updateCanvas(canvas);
            ticks = that._createTicksAndLabelFormat(viewportRange, _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"]);
            tickInterval = ticks.tickInterval;
            ticks = ticks.ticks
        }
        var maxText = ticks.reduce((function(prevLabel, tick, index) {
            var label = that.formatLabel(tick, options.label, viewportRange, void 0, tickInterval, ticks);
            if (prevLabel.length < label.length) {
                return label
            } else {
                return prevLabel
            }
        }), that.formatLabel(ticks[0], options.label, viewportRange, void 0, tickInterval, ticks));
        var text = that._renderer.text(maxText, 0, 0).css(that._textFontStyles).attr(that._textOptions).append(that._renderer.root);
        var box = text.getBBox();
        text.remove();
        return {
            x: box.x,
            y: box.y,
            width: box.width + indent,
            height: box.height + indent
        }
    },
    _setLabelsPlacement: function() {
        if (!this._options.label.visible) {
            return
        }
        var labelOpt = this._options.label;
        var displayMode = this._validateDisplayMode(labelOpt.displayMode);
        var overlappingMode = this._validateOverlappingMode(labelOpt.overlappingBehavior, displayMode);
        var ignoreOverlapping = "none" === overlappingMode || "ignore" === overlappingMode;
        var behavior = {
            rotationAngle: labelOpt.rotationAngle,
            staggeringSpacing: labelOpt.staggeringSpacing
        };
        var notRecastStep;
        var boxes = this._majorTicks.map((function(tick) {
            return tick.labelBBox
        }));
        var step = this._getStep(boxes);
        switch (displayMode) {
            case ROTATE:
                if (ignoreOverlapping) {
                    notRecastStep = true;
                    step = 1
                }
                this._applyLabelMode(displayMode, step, boxes, labelOpt, notRecastStep);
                break;
            case "stagger":
                if (ignoreOverlapping) {
                    step = 2
                }
                this._applyLabelMode(displayMode, _max(step, 2), boxes, labelOpt);
                break;
            default:
                this._applyLabelOverlapping(boxes, overlappingMode, step, behavior)
        }
    },
    _applyLabelOverlapping: function(boxes, mode, step, behavior) {
        var labelOpt = this._options.label;
        var majorTicks = this._majorTicks;
        if ("none" === mode || "ignore" === mode) {
            return
        }
        if (step > 1 && boxes.some((function(box, index, array) {
                if (0 === index) {
                    return false
                }
                return _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].areLabelsOverlap(box, array[index - 1], labelOpt.minSpacing, labelOpt.alignment)
            }))) {
            this._applyLabelMode(mode, step, boxes, behavior)
        }
        this._checkBoundedLabelsOverlapping(majorTicks, boxes, mode);
        this._checkShiftedLabels(majorTicks, boxes, labelOpt.minSpacing, labelOpt.alignment)
    },
    _applyLabelMode: function(mode, step, boxes, behavior, notRecastStep) {
        var majorTicks = this._majorTicks;
        var labelOpt = this._options.label;
        var angle = behavior.rotationAngle;
        var labelHeight;
        var alignment;
        var func;
        switch (mode) {
            case ROTATE:
                if (!labelOpt.userAlignment) {
                    alignment = angle < 0 ? RIGHT : LEFT;
                    if (angle % 90 === 0) {
                        alignment = CENTER
                    }
                }
                step = notRecastStep ? step : this._getStep(boxes, angle);
                func = function(tick) {
                    var contentContainer = tick.getContentContainer();
                    if (!contentContainer) {
                        return
                    }
                    contentContainer.rotate(angle);
                    tick.labelRotationAngle = angle;
                    alignment && (tick.labelAlignment = alignment)
                };
                updateLabels(majorTicks, step, func);
                break;
            case "stagger":
                labelHeight = this._getMaxLabelHeight(boxes, behavior.staggeringSpacing);
                func = function(tick, index) {
                    if (index / (step - 1) % 2 !== 0) {
                        tick.labelOffset = labelHeight
                    }
                };
                updateLabels(majorTicks, step - 1, func);
                break;
            case "auto":
            case "_auto":
                if (2 === step) {
                    this._applyLabelMode("stagger", step, boxes, behavior)
                } else {
                    this._applyLabelMode(ROTATE, step, boxes, {
                        rotationAngle: getOptimalAngle(boxes, labelOpt)
                    })
                }
                break;
            default:
                updateLabels(majorTicks, step)
        }
    },
    getMarkerTrackers: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _drawDateMarkers: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _adjustDateMarkers: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    coordsIn: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    areCoordsOutsideAxis: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _getSkippedCategory: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _initAxisPositions: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _drawTitle: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _updateTitleCoords: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _adjustConstantLineLabels: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _createTranslator: function() {
        return new _translators_translator2d__WEBPACK_IMPORTED_MODULE_9__["Translator2D"]({}, {}, {})
    },
    _updateTranslator: function() {
        var translator = this._translator;
        translator.update(translator.getBusinessRange(), this._canvas || {}, this._getTranslatorOptions())
    },
    _getTranslatorOptions: function() {
        var _options$workWeek2, _options$breakStyle$w, _options$breakStyle;
        var options = this._options;
        return {
            isHorizontal: this._isHorizontal,
            shiftZeroValue: !this.isArgumentAxis,
            interval: options.semiDiscreteInterval,
            firstDayOfWeek: null === (_options$workWeek2 = options.workWeek) || void 0 === _options$workWeek2 ? void 0 : _options$workWeek2[0],
            stick: this._getStick(),
            breaksSize: null !== (_options$breakStyle$w = null === (_options$breakStyle = options.breakStyle) || void 0 === _options$breakStyle ? void 0 : _options$breakStyle.width) && void 0 !== _options$breakStyle$w ? _options$breakStyle$w : 0
        }
    },
    getVisibleArea() {
        var canvas = this._getCanvasStartEnd();
        return [canvas.start, canvas.end].sort((a, b) => a - b)
    },
    _getCanvasStartEnd: function() {
        var isHorizontal = this._isHorizontal;
        var canvas = this._canvas || {};
        var invert = this._translator.getBusinessRange().invert;
        var coords = isHorizontal ? [canvas.left, canvas.width - canvas.right] : [canvas.height - canvas.bottom, canvas.top];
        invert && coords.reverse();
        return {
            start: coords[0],
            end: coords[1]
        }
    },
    _getScreenDelta: function() {
        var canvas = this._getCanvasStartEnd();
        var breaks = this._seriesData ? this._seriesData.breaks || [] : [];
        var breaksLength = breaks.length;
        var screenDelta = _abs(canvas.start - canvas.end);
        return screenDelta - (breaksLength ? breaks[breaksLength - 1].cumulativeWidth : 0)
    },
    _getScaleBreaks: function() {
        return []
    },
    _filterBreaks: function() {
        return []
    },
    _adjustTitle: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _checkTitleOverflow: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    getSpiderTicks: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    setSpiderTicks: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _checkBoundedLabelsOverlapping: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _checkShiftedLabels: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    drawScaleBreaks: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _visualRange: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    _rotateConstantLine: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"],
    applyVisualRangeSetter(visualRangeSetter) {
        this._visualRange = visualRangeSetter
    },
    getCategoriesSorter(argCategories) {
        var sort;
        if (this.isArgumentAxis) {
            sort = argCategories
        } else {
            var categoriesSortingMethod = this._options.categoriesSortingMethod;
            sort = null !== categoriesSortingMethod && void 0 !== categoriesSortingMethod ? categoriesSortingMethod : this._options.categories
        }
        return sort
    },
    _getAdjustedBusinessRange() {
        return this.adjustViewport(this._translator.getBusinessRange())
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/constant_line.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/constant_line.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createConstantLine; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/axes/constant_line.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

function createConstantLine(axis, options) {
    var labelOptions = options.label || {};
    var labelPosition = labelOptions.position || "inside";
    var parsedValue;
    var valueIsParsed = false;
    var lastStoredCoordinates;
    axis._checkAlignmentConstantLineLabels(labelOptions);
    var storedCoord;
    return {
        options: options,
        labelOptions: labelOptions,
        labelPosition: labelPosition,
        label: null,
        line: null,
        getParsedValue() {
            if (!valueIsParsed) {
                parsedValue = axis.validateUnit(options.value, "E2105", "constantLine");
                valueIsParsed = true;
                return parsedValue
            }
            return parsedValue
        },
        draw() {
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.value) || axis._translator.getBusinessRange().isEmpty()) {
                return this
            }
            var canvas = axis._getCanvasStartEnd();
            var parsedValue = this.getParsedValue();
            this.coord = axis._getConstantLinePos(parsedValue, canvas.start, canvas.end);
            var rootGroup = options.displayBehindSeries ? axis._axisConstantLineGroups.under : axis._axisConstantLineGroups.above;
            var group = rootGroup[labelPosition];
            if (!group) {
                var side = axis._isHorizontal ? labelOptions.verticalAlignment : labelOptions.horizontalAlignment;
                group = rootGroup[side]
            }
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(this.coord)) {
                return this
            }
            var path = axis._createConstantLine(this.coord, {
                stroke: options.color,
                "stroke-width": options.width,
                dashStyle: options.dashStyle
            });
            this.line = path.append(rootGroup.inside);
            this.label = labelOptions.visible ? axis._drawConstantLineLabels(parsedValue, labelOptions, this.coord, group) : null;
            this.updatePosition();
            return this
        },
        getContentContainer() {
            return this.label
        },
        removeLabel() {
            this.label && this.label.remove()
        },
        updatePosition(animate) {
            var canvas = axis._getCanvasStartEnd();
            var coord = axis._getConstantLinePos(this.getParsedValue(), canvas.start, canvas.end);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(coord)) {
                return
            }
            this.coord = coord;
            if (animate && storedCoord) {
                this.label && this.label.attr(axis._getConstantLineLabelsCoords(storedCoord, this.labelOptions));
                this.line && this.line.attr(axis._getConstantLineGraphicAttributes(storedCoord));
                this.label && this.label.animate(axis._getConstantLineLabelsCoords(this.coord, this.labelOptions));
                this.line && this.line.animate(axis._getConstantLineGraphicAttributes(this.coord))
            } else {
                this.label && this.label.attr(axis._getConstantLineLabelsCoords(this.coord, this.labelOptions));
                this.line && this.line.attr(axis._getConstantLineGraphicAttributes(this.coord));
                axis._rotateConstantLine(this.line, this.coord)
            }
        },
        saveCoords() {
            lastStoredCoordinates = storedCoord;
            storedCoord = this.coord
        },
        resetCoordinates() {
            storedCoord = lastStoredCoordinates
        }
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/datetime_breaks.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/datetime_breaks.js ***!
  \*****************************************************************/
/*! exports provided: generateDateBreaks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateDateBreaks", function() { return generateDateBreaks; });
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/**
 * DevExtreme (esm/viz/axes/datetime_breaks.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var days = [0, 1, 2, 3, 4, 5, 6];

function getWeekendDays(workdays) {
    return days.filter((function(day) {
        return !workdays.some((function(workDay) {
            return workDay === day
        }))
    }))
}

function getNextDayIndex(dayIndex) {
    return (dayIndex + 1) % 7
}

function dayBetweenWeekend(weekend, day) {
    var start = weekend.start;
    var end = weekend.end;
    while (start !== end) {
        if (start === day) {
            return true
        }
        start = getNextDayIndex(start)
    }
    return false
}

function getDaysDistance(day, end) {
    var length = 0;
    while (day !== end) {
        day = getNextDayIndex(day);
        length++
    }
    return length
}

function separateBreak(scaleBreak, day) {
    var result = [];
    var dayEnd = new Date(day);
    dayEnd.setDate(day.getDate() + 1);
    if (day > scaleBreak.from) {
        result.push({
            from: scaleBreak.from,
            to: day
        })
    }
    if (dayEnd < scaleBreak.to) {
        result.push({
            from: dayEnd,
            to: scaleBreak.to
        })
    }
    return result
}

function getWeekEndDayIndices(workDays) {
    var indices = getWeekendDays(workDays);
    if (indices.length < 7) {
        while (getNextDayIndex(indices[indices.length - 1]) === indices[0]) {
            indices.unshift(indices.pop())
        }
    }
    return indices
}

function generateDateBreaksForWeekend(min, max, weekendDayIndices) {
    var day = min.getDate();
    var breaks = [];
    var weekends = weekendDayIndices.reduce((function(obj, day) {
        var currentWeekEnd = obj[1];
        if (void 0 === currentWeekEnd.start) {
            currentWeekEnd = {
                start: day,
                end: getNextDayIndex(day)
            };
            obj[0].push(currentWeekEnd);
            return [obj[0], currentWeekEnd]
        } else if (currentWeekEnd.end === day) {
            currentWeekEnd.end = getNextDayIndex(day);
            return obj
        }
        currentWeekEnd = {
            start: day,
            end: getNextDayIndex(day)
        };
        obj[0].push(currentWeekEnd);
        return [obj[0], currentWeekEnd]
    }), [
        [], {}
    ]);
    weekends[0].forEach((function(weekend) {
        var currentDate = new Date(min);
        currentDate = _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].trimTime(currentDate);
        while (currentDate < max) {
            day = currentDate.getDay();
            var date = currentDate.getDate();
            if (dayBetweenWeekend(weekend, day)) {
                var from = new Date(currentDate);
                currentDate.setDate(date + getDaysDistance(day, weekend.end));
                var to = new Date(currentDate);
                breaks.push({
                    from: from,
                    to: to
                })
            }
            currentDate.setDate(currentDate.getDate() + 1)
        }
    }));
    return breaks
}

function excludeWorkDaysFromWeekEndBreaks(breaks, exactWorkDays) {
    var result = breaks.slice();
    var i;
    var processWorkDay = function(workday) {
        workday = _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].trimTime(new Date(workday));
        if (result[i].from <= workday && result[i].to > workday) {
            var separatedBreak = separateBreak(result[i], workday);
            if (2 === separatedBreak.length) {
                result.splice(i, 1, separatedBreak[0], separatedBreak[1])
            } else if (1 === separatedBreak.length) {
                result.splice(i, 1, separatedBreak[0])
            } else {
                result.splice(i, 1)
            }
        }
    };
    for (i = 0; i < result.length; i++) {
        exactWorkDays.forEach(processWorkDay)
    }
    return result
}

function generateBreaksForHolidays(min, max, holidays, weekendDayIndices) {
    var day;
    var dayInWeekend = function(dayIndex) {
        return dayIndex === day
    };
    var adjustedMin = _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].trimTime(min);
    var adjustedMax = _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].trimTime(max);
    adjustedMax.setDate(max.getDate() + 1);
    return holidays.reduce((function(breaks, holiday) {
        var holidayStart;
        var holidayEnd;
        holiday = new Date(holiday);
        day = holiday.getDay();
        if (!weekendDayIndices.some(dayInWeekend) && holiday >= adjustedMin && holiday <= adjustedMax) {
            holidayStart = _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].trimTime(holiday);
            holidayEnd = new Date(holidayStart);
            holidayEnd.setDate(holidayStart.getDate() + 1);
            breaks.push({
                from: holidayStart,
                to: holidayEnd
            })
        }
        return breaks
    }), [])
}

function calculateGaps(breaks) {
    return breaks.map((function(b) {
        return {
            from: b.from,
            to: b.to,
            gapSize: _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].convertMillisecondsToDateUnits(b.to - b.from)
        }
    }))
}
function generateDateBreaks(min, max, workWeek, singleWorkdays, holidays) {
    var weekendDayIndices = getWeekEndDayIndices(workWeek);
    var breaks = generateDateBreaksForWeekend(min, max, weekendDayIndices);
    breaks.push.apply(breaks, generateBreaksForHolidays(min, max, holidays || [], weekendDayIndices));
    return calculateGaps(excludeWorkDaysFromWeekEndBreaks(breaks, singleWorkdays || []))
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/polar_axes.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/polar_axes.js ***!
  \************************************************************/
/*! exports provided: circular, circularSpider, linear, linearSpider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circular", function() { return circular; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circularSpider", function() { return circularSpider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linearSpider", function() { return linearSpider; });
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _axes_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./axes_constants */ "./node_modules/devextreme/esm/viz/axes/axes_constants.js");
/* harmony import */ var _xy_axes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./xy_axes */ "./node_modules/devextreme/esm/viz/axes/xy_axes.js");
/* harmony import */ var _tick__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tick */ "./node_modules/devextreme/esm/viz/axes/tick.js");
/* harmony import */ var _axes_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./axes_utils */ "./node_modules/devextreme/esm/viz/axes/axes_utils.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/axes/polar_axes.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */








var {
    PI: PI,
    abs: abs,
    atan: atan,
    round: round
} = Math;
var _min = Math.min;
var _max = Math.max;
var xyAxesLinear = _xy_axes__WEBPACK_IMPORTED_MODULE_4__["default"].linear;
var HALF_PI_ANGLE = 90;

function getPolarQuarter(angle) {
    var quarter;
    angle = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["normalizeAngle"])(angle);
    if (angle >= 315 && angle <= 360 || angle < 45 && angle >= 0) {
        quarter = 1
    } else if (angle >= 45 && angle < 135) {
        quarter = 2
    } else if (angle >= 135 && angle < 225) {
        quarter = 3
    } else if (angle >= 225 && angle < 315) {
        quarter = 4
    }
    return quarter
}
var circularAxes = {
    _calculateValueMargins(ticks) {
        var {
            minVisible: minVisible,
            maxVisible: maxVisible
        } = this._getViewportRange();
        if (ticks && ticks.length > 1) {
            minVisible = minVisible < ticks[0].value ? minVisible : ticks[0].value;
            maxVisible = minVisible > ticks[ticks.length - 1].value ? maxVisible : ticks[ticks.length - 1].value
        }
        return {
            minValue: minVisible,
            maxValue: maxVisible
        }
    },
    applyMargins() {
        var margins = this._calculateValueMargins(this._majorTicks);
        var br = this._translator.getBusinessRange();
        br.addRange({
            minVisible: margins.minValue,
            maxVisible: margins.maxValue,
            interval: this._calculateRangeInterval(br.interval)
        });
        this._translator.updateBusinessRange(br)
    },
    _getTranslatorOptions: function() {
        return {
            isHorizontal: true,
            conversionValue: true,
            addSpiderCategory: this._getSpiderCategoryOption(),
            stick: this._getStick()
        }
    },
    getCenter: function() {
        return this._center
    },
    getRadius: function() {
        return this._radius
    },
    getAngles: function() {
        var options = this._options;
        return [options.startAngle, options.endAngle]
    },
    _updateRadius(canvas) {
        var rad = _min(canvas.width - canvas.left - canvas.right, canvas.height - canvas.top - canvas.bottom) / 2;
        this._radius = rad < 0 ? 0 : rad
    },
    _updateCenter: function(canvas) {
        this._center = {
            x: canvas.left + (canvas.width - canvas.right - canvas.left) / 2,
            y: canvas.top + (canvas.height - canvas.top - canvas.bottom) / 2
        }
    },
    _processCanvas: function(canvas) {
        this._updateRadius(canvas);
        this._updateCenter(canvas);
        return {
            left: 0,
            right: 0,
            width: this._getScreenDelta()
        }
    },
    _createAxisElement: function() {
        return this._renderer.circle()
    },
    _updateAxisElementPosition: function() {
        var center = this.getCenter();
        this._axisElement.attr({
            cx: center.x,
            cy: center.y,
            r: this.getRadius()
        })
    },
    _boundaryTicksVisibility: {
        min: true
    },
    _getSpiderCategoryOption: function() {
        return this._options.firstPointOnStartAngle
    },
    _validateOptions(options) {
        var originValue = options.originValue;
        var wholeRange = options.wholeRange = {};
        var period = options.period;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(originValue)) {
            originValue = this.validateUnit(originValue)
        }
        if (period > 0 && options.argumentType === _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].numeric) {
            originValue = originValue || 0;
            wholeRange.endValue = originValue + period;
            this._viewport = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getVizRangeObject"])([originValue, wholeRange.endValue])
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(originValue)) {
            wholeRange.startValue = originValue
        }
    },
    getMargins() {
        var tickOptions = this._options.tick;
        var tickOuterLength = _max(tickOptions.visible ? tickOptions.length / 2 + tickOptions.shift : 0, 0);
        var radius = this.getRadius();
        var {
            x: x,
            y: y
        } = this._center;
        var labelBoxes = this._majorTicks.map(t => t.label && t.label.getBBox()).filter(b => b);
        var canvas = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, this._canvas, {
            left: x - radius,
            top: y - radius,
            right: this._canvas.width - (x + radius),
            bottom: this._canvas.height - (y + radius)
        });
        var margins = Object(_axes_utils__WEBPACK_IMPORTED_MODULE_6__["calculateCanvasMargins"])(labelBoxes, canvas);
        Object.keys(margins).forEach(k => margins[k] = margins[k] < tickOuterLength ? tickOuterLength : margins[k]);
        return margins
    },
    _updateLabelsPosition() {
        Object(_axes_utils__WEBPACK_IMPORTED_MODULE_6__["measureLabels"])(this._majorTicks);
        this._adjustLabelsCoord(0, 0, true);
        this._checkBoundedLabelsOverlapping(this._majorTicks, this._majorTicks.map(t => t.labelBBox))
    },
    _setVisualRange: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    applyVisualRangeSetter: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    _getStick: function() {
        return this._options.firstPointOnStartAngle || this._options.type !== _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].discrete
    },
    _getTranslatedCoord: function(value, offset) {
        return this._translator.translate(value, offset) - HALF_PI_ANGLE
    },
    _getCanvasStartEnd: function() {
        return {
            start: 0 - HALF_PI_ANGLE,
            end: 360 - HALF_PI_ANGLE
        }
    },
    _getStripGraphicAttributes: function(fromAngle, toAngle) {
        var center = this.getCenter();
        var angle = this.getAngles()[0];
        var r = this.getRadius();
        return {
            x: center.x,
            y: center.y,
            innerRadius: 0,
            outerRadius: r,
            startAngle: -toAngle - angle,
            endAngle: -fromAngle - angle
        }
    },
    _createStrip: function(coords) {
        return this._renderer.arc(coords.x, coords.y, coords.innerRadius, coords.outerRadius, coords.startAngle, coords.endAngle)
    },
    _getStripLabelCoords: function(from, to) {
        var coords = this._getStripGraphicAttributes(from, to);
        var angle = coords.startAngle + (coords.endAngle - coords.startAngle) / 2;
        var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getCosAndSin"])(angle);
        var halfRad = this.getRadius() / 2;
        var center = this.getCenter();
        var x = round(center.x + halfRad * cosSin.cos);
        var y = round(center.y - halfRad * cosSin.sin);
        return {
            x: x,
            y: y,
            align: _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].center
        }
    },
    _getConstantLineGraphicAttributes: function(value) {
        var center = this.getCenter();
        var r = this.getRadius();
        return {
            points: [center.x, center.y, center.x + r, center.y]
        }
    },
    _createConstantLine: function(value, attr) {
        return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr)
    },
    _rotateConstantLine(line, value) {
        var {
            x: x,
            y: y
        } = this.getCenter();
        line.rotate(value + this.getAngles()[0], x, y)
    },
    _getConstantLineLabelsCoords: function(value) {
        var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getCosAndSin"])(-value - this.getAngles()[0]);
        var halfRad = this.getRadius() / 2;
        var center = this.getCenter();
        var x = round(center.x + halfRad * cosSin.cos);
        var y = round(center.y - halfRad * cosSin.sin);
        return {
            x: x,
            y: y
        }
    },
    _checkAlignmentConstantLineLabels: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    _adjustDivisionFactor: function(val) {
        return 180 * val / (this.getRadius() * PI)
    },
    _getScreenDelta: function() {
        var angles = this.getAngles();
        return abs(angles[0] - angles[1])
    },
    _getTickMarkPoints: function(coords, length, _ref) {
        var {
            shift: shift = 0
        } = _ref;
        var center = this.getCenter();
        var radiusWithTicks = this.getRadius() + length * {
            inside: -1,
            center: -.5,
            outside: 0
        } [this._options.tickOrientation || "center"];
        return [center.x + radiusWithTicks + shift, center.y, center.x + radiusWithTicks + length + shift, center.y]
    },
    _getLabelAdjustedCoord: function(tick, _offset, _maxWidth, checkCanvas) {
        var labelCoords = tick.labelCoords;
        var labelY = labelCoords.y;
        var labelAngle = labelCoords.angle;
        var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getCosAndSin"])(labelAngle);
        var cos = cosSin.cos;
        var sin = cosSin.sin;
        var box = tick.labelBBox;
        var halfWidth = box.width / 2;
        var halfHeight = box.height / 2;
        var indentFromAxis = this._options.label.indentFromAxis || 0;
        var x = labelCoords.x + indentFromAxis * cos;
        var y = labelY + (labelY - box.y - halfHeight) + indentFromAxis * sin;
        var shiftX = 0;
        var shiftY = 0;
        switch (getPolarQuarter(labelAngle)) {
            case 1:
                shiftX = halfWidth;
                shiftY = halfHeight * sin;
                break;
            case 2:
                shiftX = halfWidth * cos;
                shiftY = halfHeight;
                break;
            case 3:
                shiftX = -halfWidth;
                shiftY = halfHeight * sin;
                break;
            case 4:
                shiftX = halfWidth * cos;
                shiftY = -halfHeight
        }
        if (checkCanvas) {
            var canvas = this._canvas;
            var boxShiftX = x - labelCoords.x + shiftX;
            var boxShiftY = y - labelCoords.y + shiftY;
            if (box.x + boxShiftX < canvas.originalLeft) {
                shiftX -= box.x + boxShiftX - canvas.originalLeft
            }
            if (box.x + box.width + boxShiftX > canvas.width - canvas.originalRight) {
                shiftX -= box.x + box.width + boxShiftX - (canvas.width - canvas.originalRight)
            }
            if (box.y + boxShiftY < canvas.originalTop) {
                shiftY -= box.y + boxShiftY - canvas.originalTop
            }
            if (box.y + box.height + boxShiftY > canvas.height - canvas.originalBottom) {
                shiftY -= box.y + box.height + boxShiftY - (canvas.height - canvas.originalBottom)
            }
        }
        return {
            x: x + shiftX,
            y: y + shiftY
        }
    },
    _getGridLineDrawer: function() {
        var that = this;
        return function(tick, gridStyle) {
            var center = that.getCenter();
            return that._createPathElement(that._getGridPoints().points, gridStyle).rotate(tick.coords.angle, center.x, center.y)
        }
    },
    _getGridPoints: function() {
        var r = this.getRadius();
        var center = this.getCenter();
        return {
            points: [center.x, center.y, center.x + r, center.y]
        }
    },
    _getTranslatedValue: function(value, offset) {
        var startAngle = this.getAngles()[0];
        var angle = this._translator.translate(value, -offset);
        var coords = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["convertPolarToXY"])(this.getCenter(), startAngle, angle, this.getRadius());
        return {
            x: coords.x,
            y: coords.y,
            angle: this.getTranslatedAngle(angle)
        }
    },
    _getAdjustedStripLabelCoords: function(strip) {
        var box = strip.labelBBox;
        return {
            translateY: strip.label.attr("y") - box.y - box.height / 2
        }
    },
    coordsIn: function(x, y) {
        return Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["convertXYToPolar"])(this.getCenter(), x, y).r > this.getRadius()
    },
    _rotateTick: function(element, coords) {
        var center = this.getCenter();
        element.rotate(coords.angle, center.x, center.y)
    },
    _validateOverlappingMode: function(mode) {
        return _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].validateOverlappingMode(mode)
    },
    _validateDisplayMode: function() {
        return "standard"
    },
    _getStep: function(boxes) {
        var radius = this.getRadius() + (this._options.label.indentFromAxis || 0);
        var maxLabelBox = boxes.reduce((function(prevValue, box) {
            var curValue = prevValue;
            if (prevValue.width < box.width) {
                curValue.width = box.width
            }
            if (prevValue.height < box.height) {
                curValue.height = box.height
            }
            return curValue
        }), {
            width: 0,
            height: 0
        });
        var angle1 = abs(2 * atan(maxLabelBox.height / (2 * radius - maxLabelBox.width)) * 180 / PI);
        var angle2 = abs(2 * atan(maxLabelBox.width / (2 * radius - maxLabelBox.height)) * 180 / PI);
        return _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].getTicksCountInRange(this._majorTicks, "angle", _max(angle1, angle2))
    },
    _checkBoundedLabelsOverlapping: function(majorTicks, boxes, mode) {
        var labelOpt = this._options.label;
        mode = mode || this._validateOverlappingMode(labelOpt.overlappingBehavior);
        if ("hide" !== mode) {
            return
        }
        var lastVisibleLabelIndex = majorTicks.reduce((lastVisibleLabelIndex, tick, index) => tick.label ? index : lastVisibleLabelIndex, null);
        if (!lastVisibleLabelIndex) {
            return
        }
        if (_axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].areLabelsOverlap(boxes[0], boxes[lastVisibleLabelIndex], labelOpt.minSpacing, _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].center)) {
            "first" === labelOpt.hideFirstOrLast ? majorTicks[0].removeLabel() : majorTicks[lastVisibleLabelIndex].removeLabel()
        }
    },
    shift: function(margins) {
        this._axisGroup.attr({
            translateX: margins.right,
            translateY: margins.bottom
        });
        this._axisElementsGroup.attr({
            translateX: margins.right,
            translateY: margins.bottom
        })
    },
    getTranslatedAngle(angle) {
        var startAngle = this.getAngles()[0];
        return angle + startAngle - HALF_PI_ANGLE
    }
};
var circular = circularAxes;
var circularSpider = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, circularAxes, {
    _createAxisElement: function() {
        return this._renderer.path([], "area")
    },
    _updateAxisElementPosition: function() {
        this._axisElement.attr({
            points: Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(this.getSpiderTicks(), (function(tick) {
                return {
                    x: tick.coords.x,
                    y: tick.coords.y
                }
            }))
        })
    },
    _getStick: function() {
        return true
    },
    _getSpiderCategoryOption: function() {
        return true
    },
    getSpiderTicks: function() {
        var ticks = this.getFullTicks();
        this._spiderTicks = ticks.map(Object(_tick__WEBPACK_IMPORTED_MODULE_5__["tick"])(this, this.renderer, {}, {}, this._getSkippedCategory(ticks), true));
        this._spiderTicks.forEach((function(tick) {
            tick.initCoords()
        }));
        return this._spiderTicks
    },
    _getStripGraphicAttributes: function(fromAngle, toAngle) {
        var center = this.getCenter();
        var spiderTicks = this.getSpiderTicks();
        var firstTick;
        var lastTick;
        var nextTick;
        var tick;
        var points = [];
        var i = 0;
        var len = spiderTicks.length;
        while (i < len) {
            tick = spiderTicks[i].coords;
            if (tick.angle >= fromAngle && tick.angle <= toAngle) {
                if (!firstTick) {
                    firstTick = (spiderTicks[i - 1] || spiderTicks[spiderTicks.length - 1]).coords;
                    points.push((tick.x + firstTick.x) / 2, (tick.y + firstTick.y) / 2)
                }
                points.push(tick.x, tick.y);
                nextTick = (spiderTicks[i + 1] || spiderTicks[0]).coords;
                lastTick = {
                    x: (tick.x + nextTick.x) / 2,
                    y: (tick.y + nextTick.y) / 2
                }
            }
            i++
        }
        points.push(lastTick.x, lastTick.y);
        points.push(center.x, center.y);
        return {
            points: points
        }
    },
    _createStrip: function(_ref2) {
        var {
            points: points
        } = _ref2;
        return this._renderer.path(points, "area")
    },
    _getTranslatedCoord: function(value, offset) {
        return this._translator.translate(value, offset) - HALF_PI_ANGLE
    },
    _setTickOffset: function() {
        this._tickOffset = false
    }
});
var linear = {
    _resetMargins() {
        this._reinitTranslator(this._getViewportRange())
    },
    _getStick: xyAxesLinear._getStick,
    _getSpiderCategoryOption: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    _getTranslatorOptions: function() {
        return {
            isHorizontal: true,
            stick: this._getStick()
        }
    },
    getRadius: circularAxes.getRadius,
    getCenter: circularAxes.getCenter,
    getAngles: circularAxes.getAngles,
    _updateRadius: circularAxes._updateRadius,
    _updateCenter: circularAxes._updateCenter,
    _processCanvas(canvas) {
        this._updateRadius(canvas);
        this._updateCenter(canvas);
        return {
            left: 0,
            right: 0,
            startPadding: canvas.startPadding,
            endPadding: canvas.endPadding,
            width: this.getRadius()
        }
    },
    _createAxisElement: xyAxesLinear._createAxisElement,
    _updateAxisElementPosition: function() {
        var centerCoord = this.getCenter();
        this._axisElement.attr({
            points: [centerCoord.x, centerCoord.y, centerCoord.x + this.getRadius(), centerCoord.y]
        }).rotate(this.getAngles()[0] - HALF_PI_ANGLE, centerCoord.x, centerCoord.y)
    },
    _getScreenDelta: function() {
        return this.getRadius()
    },
    _getTickMarkPoints: function(coords, length) {
        return [coords.x - length / 2, coords.y, coords.x + length / 2, coords.y]
    },
    _getLabelAdjustedCoord: function(tick) {
        var labelCoords = tick.labelCoords;
        var labelY = labelCoords.y;
        var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getCosAndSin"])(labelCoords.angle);
        var indentFromAxis = this._options.label.indentFromAxis || 0;
        var box = tick.labelBBox;
        var x = labelCoords.x - abs(indentFromAxis * cosSin.sin) + abs(box.width / 2 * cosSin.cos) - box.width / 2;
        var y = labelY + (labelY - box.y) - abs(box.height / 2 * cosSin.sin) + abs(indentFromAxis * cosSin.cos);
        return {
            x: x,
            y: y
        }
    },
    _getGridLineDrawer: function() {
        var that = this;
        return function(tick, gridStyle) {
            var grid = that._getGridPoints(tick.coords);
            return that._renderer.circle(grid.cx, grid.cy, grid.r).attr(gridStyle).sharp()
        }
    },
    _getGridPoints: function(coords) {
        var pos = this.getCenter();
        var radius = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos.x, pos.y, coords.x, coords.y);
        if (radius > this.getRadius()) {
            return {
                cx: null,
                cy: null,
                r: null
            }
        }
        return {
            cx: pos.x,
            cy: pos.y,
            r: radius
        }
    },
    _getTranslatedValue: function(value, offset) {
        var startAngle = this.getAngles()[0];
        var xy = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["convertPolarToXY"])(this.getCenter(), startAngle, 0, this._translator.translate(value, offset));
        return {
            x: xy.x,
            y: xy.y,
            angle: startAngle - HALF_PI_ANGLE
        }
    },
    _getTranslatedCoord: function(value, offset) {
        return this._translator.translate(value, offset)
    },
    _getCanvasStartEnd() {
        var invert = this.getTranslator().getBusinessRange().invert;
        var coords = [0, this.getRadius()];
        invert && coords.reverse();
        return {
            start: coords[0],
            end: coords[1]
        }
    },
    _getStripGraphicAttributes: function(fromPoint, toPoint) {
        var center = this.getCenter();
        return {
            x: center.x,
            y: center.y,
            innerRadius: fromPoint,
            outerRadius: toPoint
        }
    },
    _createStrip: function(attrs) {
        return this._renderer.arc(attrs.x, attrs.y, attrs.innerRadius, attrs.outerRadius, 0, 360)
    },
    _getAdjustedStripLabelCoords: circularAxes._getAdjustedStripLabelCoords,
    _getStripLabelCoords: function(from, to) {
        var labelPos = from + (to - from) / 2;
        var center = this.getCenter();
        var y = round(center.y - labelPos);
        return {
            x: center.x,
            y: y,
            align: _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].center
        }
    },
    _getConstantLineGraphicAttributes: function(value) {
        var center = this.getCenter();
        return {
            cx: center.x,
            cy: center.y,
            r: value
        }
    },
    _createConstantLine: function(value, attr) {
        var attrs = this._getConstantLineGraphicAttributes(value);
        return this._renderer.circle(attrs.cx, attrs.cy, attrs.r).attr(attr).sharp()
    },
    _getConstantLineLabelsCoords: function(value) {
        var center = this.getCenter();
        var y = round(center.y - value);
        return {
            x: center.x,
            y: y
        }
    },
    _checkAlignmentConstantLineLabels: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    _rotateTick: function(element, coords, isGridLine) {
        !isGridLine && element.rotate(coords.angle + HALF_PI_ANGLE, coords.x, coords.y)
    },
    _validateOverlappingMode: circularAxes._validateOverlappingMode,
    _validateDisplayMode: circularAxes._validateDisplayMode,
    _getStep: function(boxes) {
        var quarter = getPolarQuarter(this.getAngles()[0]);
        var spacing = this._options.label.minSpacing;
        var func = 2 === quarter || 4 === quarter ? function(box) {
            return box.width + spacing
        } : function(box) {
            return box.height
        };
        var maxLabelLength = boxes.reduce((prevValue, box) => _max(prevValue, func(box)), 0);
        return _axes_constants__WEBPACK_IMPORTED_MODULE_3__["default"].getTicksCountInRange(this._majorTicks, 2 === quarter || 4 === quarter ? "x" : "y", maxLabelLength)
    }
};
var linearSpider = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, linear, {
    _createPathElement: function(points, attr) {
        return this._renderer.path(points, "area").attr(attr).sharp()
    },
    setSpiderTicks: function(ticks) {
        this._spiderTicks = ticks
    },
    _getGridLineDrawer: function() {
        var that = this;
        return function(tick, gridStyle) {
            return that._createPathElement(that._getGridPoints(tick.coords).points, gridStyle)
        }
    },
    _getGridPoints: function(coords) {
        var pos = this.getCenter();
        var radius = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos.x, pos.y, coords.x, coords.y);
        return this._getGridPointsByRadius(radius)
    },
    _getGridPointsByRadius: function(radius) {
        var pos = this.getCenter();
        if (radius > this.getRadius()) {
            return {
                points: null
            }
        }
        return {
            points: Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(this._spiderTicks, (function(tick) {
                var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getCosAndSin"])(tick.coords.angle);
                return {
                    x: round(pos.x + radius * cosSin.cos),
                    y: round(pos.y + radius * cosSin.sin)
                }
            }))
        }
    },
    _getStripGraphicAttributes: function(fromPoint, toPoint) {
        var innerPoints = this._getGridPointsByRadius(toPoint).points;
        var outerPoints = this._getGridPointsByRadius(fromPoint).points;
        return {
            points: [outerPoints, innerPoints.reverse()]
        }
    },
    _createStrip: circularSpider._createStrip,
    _getConstantLineGraphicAttributes: function(value) {
        return this._getGridPointsByRadius(value)
    },
    _createConstantLine: function(value, attr) {
        return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr)
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/smart_formatter.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/smart_formatter.js ***!
  \*****************************************************************/
/*! exports provided: smartFormatter, formatRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smartFormatter", function() { return smartFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRange", function() { return formatRange; });
/* harmony import */ var _format_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../format_helper */ "./node_modules/devextreme/esm/format_helper.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/axes/smart_formatter.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var _format = _format_helper__WEBPACK_IMPORTED_MODULE_0__["default"].format;
var {
    abs: abs,
    floor: floor
} = Math;
var EXPONENTIAL = "exponential";
var formats = ["fixedPoint", "thousands", "millions", "billions", "trillions", EXPONENTIAL];
var dateUnitIntervals = ["millisecond", "second", "minute", "hour", "day", "month", "year"];

function getDatesDifferences(prevDate, curDate, nextDate, tickFormat) {
    var prevDifferences;
    var nextDifferences;
    var dateUnitInterval;
    var dateUnitsLength = dateUnitIntervals.length;
    var i;
    var j;
    if ("week" === tickFormat) {
        tickFormat = "day"
    } else if ("quarter" === tickFormat) {
        tickFormat = "month"
    } else if ("shorttime" === tickFormat) {
        tickFormat = "hour"
    } else if ("longtime" === tickFormat) {
        tickFormat = "second"
    }
    var tickFormatIndex = dateUnitIntervals.indexOf(tickFormat);
    if (nextDate) {
        nextDifferences = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getDatesDifferences(curDate, nextDate);
        prevDifferences = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getDatesDifferences(curDate, prevDate);
        if (nextDifferences[tickFormat]) {
            for (i = dateUnitsLength - 1; i >= tickFormatIndex; i--) {
                dateUnitInterval = dateUnitIntervals[i];
                if (i === tickFormatIndex) {
                    setDateUnitInterval(nextDifferences, tickFormatIndex + (nextDifferences.millisecond ? 2 : 1))
                } else if (nextDifferences[dateUnitInterval]) {
                    resetDateUnitInterval(nextDifferences, i);
                    break
                }
            }
        }
    } else {
        prevDifferences = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getDatesDifferences(prevDate, curDate);
        for (i = dateUnitsLength - 1; i >= tickFormatIndex; i--) {
            dateUnitInterval = dateUnitIntervals[i];
            if (prevDifferences[dateUnitInterval]) {
                if (i - tickFormatIndex > 1) {
                    for (j = tickFormatIndex + 1; j >= 0; j--) {
                        resetDateUnitInterval(prevDifferences, j)
                    }
                    break
                } else if (isDateTimeStart(curDate, dateUnitInterval)) {
                    for (j = i - 1; j > 0; j--) {
                        resetDateUnitInterval(prevDifferences, j)
                    }
                    break
                }
            }
        }
    }
    return nextDate ? nextDifferences : prevDifferences
}

function isDateTimeStart(date, dateUnitInterval) {
    var unitNumbers = [date.getMilliseconds(), date.getSeconds(), date.getMinutes(), date.getHours(), date.getDate(), date.getMonth()];
    var unitIndex = dateUnitIntervals.indexOf(dateUnitInterval);
    var i;
    for (i = 0; i < unitIndex; i++) {
        if (4 === i && 1 !== unitNumbers[i] || 4 !== i && 0 !== unitNumbers[i]) {
            return false
        }
    }
    return true
}

function resetDateUnitInterval(differences, intervalIndex) {
    var dateUnitInterval = dateUnitIntervals[intervalIndex];
    if (differences[dateUnitInterval]) {
        differences[dateUnitInterval] = false;
        differences.count--
    }
}

function setDateUnitInterval(differences, intervalIndex) {
    var dateUnitInterval = dateUnitIntervals[intervalIndex];
    if (false === differences[dateUnitInterval]) {
        differences[dateUnitInterval] = true;
        differences.count++
    }
}

function getNoZeroIndex(str) {
    return str.length - parseInt(str).toString().length
}

function getTransitionTickIndex(ticks, value) {
    var i;
    var curDiff;
    var minDiff;
    var nearestTickIndex = 0;
    minDiff = abs(value - ticks[0]);
    for (i = 1; i < ticks.length; i++) {
        curDiff = abs(value - ticks[i]);
        if (curDiff < minDiff) {
            minDiff = curDiff;
            nearestTickIndex = i
        }
    }
    return nearestTickIndex
}

function splitDecimalNumber(value) {
    return value.toString().split(".")
}

function createFormat(type) {
    var formatter;
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(type)) {
        formatter = type;
        type = null
    }
    return {
        type: type,
        formatter: formatter
    }
}
function smartFormatter(tick, options) {
    var tickInterval = options.tickInterval;
    var tickIntervalIndex;
    var tickIndex;
    var actualIndex;
    var stringTick = abs(tick).toString();
    var precision = 0;
    var typeFormat;
    var offset = 0;
    var separatedTickInterval;
    var indexOfFormat = 0;
    var indexOfTick = -1;
    var datesDifferences;
    var format = options.labelOptions.format;
    var ticks = options.ticks;
    var log10Tick;
    var prevDateIndex;
    var nextDateIndex;
    var isLogarithmic = "logarithmic" === options.type;
    if (1 === ticks.length && 0 === ticks.indexOf(tick) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(tickInterval)) {
        tickInterval = abs(tick) >= 1 ? 1 : Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(1 - abs(tick), tick)
    }
    if (Object.is(tick, -0)) {
        tick = 0
    }
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(format) && "discrete" !== options.type && tick && (10 === options.logarithmBase || !isLogarithmic)) {
        if ("datetime" !== options.dataType && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(tickInterval)) {
            if (ticks.length && -1 === ticks.indexOf(tick)) {
                indexOfTick = getTransitionTickIndex(ticks, tick);
                tickInterval = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(abs(tick - ticks[indexOfTick]), tick)
            }
            separatedTickInterval = splitDecimalNumber(tickInterval);
            if (separatedTickInterval < 2) {
                separatedTickInterval = splitDecimalNumber(tick)
            }
            if (isLogarithmic) {
                log10Tick = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["getAdjustedLog10"])(abs(tick));
                if (log10Tick > 0) {
                    typeFormat = formats[floor(log10Tick / 3)] || EXPONENTIAL
                } else if (log10Tick < -4) {
                    typeFormat = EXPONENTIAL
                } else {
                    return _format(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(tick))
                }
            } else if (separatedTickInterval.length > 1 && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isExponential"])(tickInterval)) {
                precision = separatedTickInterval[1].length;
                typeFormat = formats[indexOfFormat]
            } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isExponential"])(tickInterval) && (-1 !== stringTick.indexOf(".") || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isExponential"])(tick))) {
                typeFormat = EXPONENTIAL;
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isExponential"])(tick)) {
                    precision = abs(getNoZeroIndex(stringTick.split(".")[1]) - Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["getExponent"])(tickInterval) + 1)
                } else {
                    precision = Math.max(abs(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["getExponent"])(tick) - Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["getExponent"])(tickInterval)), abs(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["getPrecision"])(tick) - Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["getPrecision"])(tickInterval)))
                }
            } else {
                tickIntervalIndex = floor(Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["getAdjustedLog10"])(tickInterval));
                actualIndex = tickIndex = floor(Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["getAdjustedLog10"])(abs(tick)));
                if (tickIndex - tickIntervalIndex >= 2) {
                    actualIndex = tickIntervalIndex
                }
                indexOfFormat = floor(actualIndex / 3);
                offset = 3 * indexOfFormat;
                if (indexOfFormat < 5) {
                    if (tickIntervalIndex - offset === 2 && tickIndex >= 3) {
                        indexOfFormat++;
                        offset = 3 * indexOfFormat
                    }
                    typeFormat = formats[indexOfFormat]
                } else {
                    typeFormat = formats[formats.length - 1]
                }
                if (offset > 0) {
                    separatedTickInterval = splitDecimalNumber(tickInterval / Math.pow(10, offset));
                    if (separatedTickInterval[1]) {
                        precision = separatedTickInterval[1].length
                    }
                }
            }
            if (void 0 !== typeFormat || void 0 !== precision) {
                format = {
                    type: typeFormat,
                    precision: precision
                }
            }
        } else if ("datetime" === options.dataType) {
            typeFormat = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getDateFormatByTickInterval(tickInterval);
            if (options.showTransition && ticks.length) {
                indexOfTick = ticks.map(Number).indexOf(+tick);
                if (1 === ticks.length && 0 === indexOfTick) {
                    typeFormat = _format_helper__WEBPACK_IMPORTED_MODULE_0__["default"].getDateFormatByTicks(ticks)
                } else {
                    if (-1 === indexOfTick) {
                        prevDateIndex = getTransitionTickIndex(ticks, tick)
                    } else {
                        prevDateIndex = 0 === indexOfTick ? ticks.length - 1 : indexOfTick - 1;
                        nextDateIndex = 0 === indexOfTick ? 1 : -1
                    }
                    datesDifferences = getDatesDifferences(ticks[prevDateIndex], tick, ticks[nextDateIndex], typeFormat);
                    typeFormat = _format_helper__WEBPACK_IMPORTED_MODULE_0__["default"].getDateFormatByDifferences(datesDifferences, typeFormat)
                }
            }
            format = createFormat(typeFormat)
        }
    }
    return _format(tick, format)
}

function getHighDiffFormat(diff) {
    var stop = false;
    for (var i in diff) {
        if (true === diff[i] || "hour" === i || stop) {
            diff[i] = false;
            stop = true
        } else if (false === diff[i]) {
            diff[i] = true
        }
    }
    return createFormat(_format_helper__WEBPACK_IMPORTED_MODULE_0__["default"].getDateFormatByDifferences(diff))
}

function getHighAndSelfDiffFormat(diff, interval) {
    var stop = false;
    for (var i in diff) {
        if (stop) {
            diff[i] = false
        } else if (i === interval) {
            stop = true
        } else {
            diff[i] = true
        }
    }
    return createFormat(_format_helper__WEBPACK_IMPORTED_MODULE_0__["default"].getDateFormatByDifferences(diff))
}

function formatDateRange(startValue, endValue, tickInterval) {
    var diff = getDatesDifferences(startValue, endValue);
    var typeFormat = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getDateFormatByTickInterval(tickInterval);
    var diffFormatType = _format_helper__WEBPACK_IMPORTED_MODULE_0__["default"].getDateFormatByDifferences(diff, typeFormat);
    var diffFormat = createFormat(diffFormatType);
    var values = [];
    if (tickInterval in diff) {
        var rangeFormat = getHighAndSelfDiffFormat(getDatesDifferences(startValue, endValue), tickInterval);
        var value = _format(startValue, rangeFormat);
        if (value) {
            values.push(value)
        }
    } else {
        var _rangeFormat = getHighDiffFormat(getDatesDifferences(startValue, endValue));
        var highValue = _format(startValue, _rangeFormat);
        if (highValue) {
            values.push(highValue)
        }
        values.push("".concat(_format(startValue, diffFormat), " - ").concat(_format(endValue, diffFormat)))
    }
    return values.join(", ")
}

function processDateInterval(interval) {
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(interval)) {
        var dateUnits = Object.keys(interval);
        var sum = dateUnits.reduce((sum, k) => interval[k] + sum, 0);
        if (1 === sum) {
            var dateUnit = dateUnits.filter(k => 1 === interval[k])[0];
            return dateUnit.slice(0, dateUnit.length - 1)
        }
    }
    return interval
}
function formatRange(_ref) {
    var {
        startValue: startValue,
        endValue: endValue,
        tickInterval: tickInterval,
        argumentFormat: argumentFormat,
        axisOptions: {
            dataType: dataType,
            type: type,
            logarithmBase: logarithmBase
        }
    } = _ref;
    if ("discrete" === type) {
        return ""
    }
    if ("datetime" === dataType) {
        return formatDateRange(startValue, endValue, processDateInterval(tickInterval))
    }
    var formatOptions = {
        ticks: [],
        type: type,
        dataType: dataType,
        tickInterval: tickInterval,
        logarithmBase: logarithmBase,
        labelOptions: {
            format: argumentFormat
        }
    };
    return "".concat(smartFormatter(startValue, formatOptions), " - ").concat(smartFormatter(endValue, formatOptions))
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/strip.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/strip.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createStrip; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/**
 * DevExtreme (esm/viz/axes/strip.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



function createStrip(axis, options) {
    var storedCoord;
    var lastStoredCoordinates;
    var labelOptions = options.label || {};
    return {
        options: options,
        label: null,
        rect: null,
        _getCoord() {
            var canvas = axis._getCanvasStartEnd();
            var range = axis._translator.getBusinessRange();
            return axis._getStripPos(options.startValue, options.endValue, canvas.start, canvas.end, range)
        },
        _drawLabel: coords => axis._renderer.text(labelOptions.text, coords.x, coords.y).css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["patchFontOptions"])(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, axis.getOptions().label.font, labelOptions.font))).attr({
            align: "center",
            class: labelOptions.cssClass
        }).append(axis._axisStripLabelGroup),
        draw() {
            if (axis._translator.getBusinessRange().isEmpty()) {
                return
            }
            if ((Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.startValue) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.endValue)) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.color)) {
                var stripPos = this._getCoord();
                this.labelCoords = labelOptions.text ? axis._getStripLabelCoords(stripPos.from, stripPos.to, labelOptions) : null;
                if (stripPos.outOfCanvas || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(stripPos.to) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(stripPos.from)) {
                    return
                }
                this.rect = axis._createStrip(axis._getStripGraphicAttributes(stripPos.from, stripPos.to)).attr({
                    fill: options.color
                }).append(axis._axisStripGroup);
                this.label = labelOptions.text ? this._drawLabel(this.labelCoords) : null
            }
        },
        getContentContainer() {
            return this.label
        },
        removeLabel() {},
        updatePosition(animate) {
            var stripPos = this._getCoord();
            if (animate && storedCoord) {
                this.label && this.label.attr(axis._getStripLabelCoords(storedCoord.from, storedCoord.to, options.label));
                this.rect && this.rect.attr(axis._getStripGraphicAttributes(storedCoord.from, storedCoord.to));
                this.label && this.label.animate(axis._getStripLabelCoords(stripPos.from, stripPos.to, options.label));
                this.rect && this.rect.animate(axis._getStripGraphicAttributes(stripPos.from, stripPos.to))
            } else {
                this.label && this.label.attr(axis._getStripLabelCoords(stripPos.from, stripPos.to, options.label));
                this.rect && this.rect.attr(axis._getStripGraphicAttributes(stripPos.from, stripPos.to))
            }
        },
        saveCoords() {
            lastStoredCoordinates = storedCoord;
            storedCoord = this._getCoord()
        },
        resetCoordinates() {
            storedCoord = lastStoredCoordinates
        }
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/tick.js":
/*!******************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/tick.js ***!
  \******************************************************/
/*! exports provided: tick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return createTick; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/viz/axes/tick.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




function getPathStyle(options) {
    return {
        stroke: options.color,
        "stroke-width": options.width,
        "stroke-opacity": options.opacity,
        opacity: 1
    }
}

function createTick(axis, renderer, tickOptions, gridOptions, skippedCategory, skipLabels, offset) {
    var tickOffset = offset || axis._tickOffset;
    var lineGroup = axis._axisLineGroup;
    var elementsGroup = axis._axisElementsGroup;
    var tickStyle = getPathStyle(tickOptions);
    var gridStyle = getPathStyle(gridOptions);
    var emptyStrRegExp = /^\s+$/;
    var axisOptions = axis.getOptions();
    var labelOptions = axisOptions.label;
    var labelStyle = axis._textOptions;

    function getLabelFontStyle(tick) {
        var fontStyle = axis._textFontStyles;
        var customizeColor = labelOptions.customizeColor;
        if (customizeColor && customizeColor.call) {
            fontStyle = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, axis._textFontStyles, {
                fill: customizeColor.call(tick, tick)
            })
        }
        return fontStyle
    }

    function createLabelHint(tick, range) {
        var labelHint = axis.formatHint(tick.value, labelOptions, range);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(labelHint) && "" !== labelHint) {
            tick.getContentContainer().setTitle(labelHint)
        }
    }
    return function(value) {
        var tick = {
            value: value,
            updateValue(newValue) {
                this.value = value = newValue
            },
            initCoords: function() {
                this.coords = axis._getTranslatedValue(value, tickOffset);
                this.labelCoords = axis._getTranslatedValue(value)
            },
            saveCoords() {
                this._lastStoredCoordinates = {
                    coords: this._storedCoords,
                    labelCoords: this._storedLabelsCoords
                };
                this._storedCoords = this.coords;
                this._storedLabelsCoords = this.templateContainer ? this._getTemplateCoords() : this.labelCoords
            },
            resetCoordinates() {
                if (this._lastStoredCoordinates) {
                    this._storedCoords = this._lastStoredCoordinates.coords;
                    this._storedLabelsCoords = this._lastStoredCoordinates.labelCoords
                }
            },
            drawMark(options) {
                if (!tickOptions.visible || skippedCategory === value) {
                    return
                }
                if (axis.areCoordsOutsideAxis(this.coords)) {
                    return
                }
                if (this.mark) {
                    this.mark.append(lineGroup);
                    axis.sharp(this.mark, axis.getSharpDirectionByCoords(this.coords));
                    this.updateTickPosition(options)
                } else {
                    this.mark = axis._createPathElement([], tickStyle, axis.getSharpDirectionByCoords(this.coords)).append(lineGroup);
                    this.updateTickPosition(options)
                }
            },
            setSkippedCategory(category) {
                skippedCategory = category
            },
            _updateLine(lineElement, settings, storedSettings, animate, isGridLine) {
                if (!lineElement) {
                    return
                }
                if (null === settings.points || null === settings.r) {
                    lineElement.remove();
                    return
                }
                if (animate && storedSettings && null !== storedSettings.points) {
                    settings.opacity = 1;
                    lineElement.attr(storedSettings);
                    lineElement.animate(settings)
                } else {
                    settings.opacity = animate ? 0 : 1;
                    lineElement.attr(settings);
                    animate && lineElement.animate({
                        opacity: 1
                    }, {
                        delay: .5,
                        partitionDuration: .5
                    })
                }
                this.coords.angle && axis._rotateTick(lineElement, this.coords, isGridLine)
            },
            updateTickPosition: function(options, animate) {
                this._updateLine(this.mark, {
                    points: axis._getTickMarkPoints(tick.coords, tickOptions.length, options)
                }, this._storedCoords && {
                    points: axis._getTickMarkPoints(tick._storedCoords, tickOptions.length, options)
                }, animate, false)
            },
            drawLabel: function(range, template) {
                if (this.templateContainer && axis.isRendered()) {
                    this.updateLabelPosition();
                    return
                }
                var labelIsVisible = labelOptions.visible && !skipLabels && !axis.getTranslator().getBusinessRange().isEmpty() && !axis.areCoordsOutsideAxis(this.labelCoords);
                if (!labelIsVisible) {
                    if (this.label) {
                        this.removeLabel()
                    }
                    return
                }
                var templateOption = labelOptions.template;
                var text = axis.formatLabel(value, labelOptions, range);
                if (this.label) {
                    this.label.attr({
                        text: text,
                        rotate: 0
                    }).append(elementsGroup);
                    createLabelHint(this, range);
                    this.updateLabelPosition();
                    return
                }
                if (templateOption) {
                    this.templateContainer = renderer.g().append(elementsGroup);
                    this._templateDef && this._templateDef.reject();
                    this._templateDef = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"];
                    template.render({
                        model: {
                            valueText: text,
                            value: this.value,
                            labelFontStyle: getLabelFontStyle(this),
                            labelStyle: labelStyle
                        },
                        container: this.templateContainer.element,
                        onRendered: () => {
                            this.updateLabelPosition();
                            this._templateDef && this._templateDef.resolve()
                        }
                    })
                } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(text) && "" !== text && !emptyStrRegExp.test(text)) {
                    this.label = renderer.text(text).css(getLabelFontStyle(this)).attr(labelStyle).append(elementsGroup);
                    this.updateLabelPosition();
                    createLabelHint(this, range)
                }
                var containerForData = this.getContentContainer();
                containerForData && containerForData.data("chart-data-argument", this.value);
                this.templateContainer && createLabelHint(this, range)
            },
            getTemplateDeferred() {
                return this._templateDef
            },
            getContentContainer() {
                return this.templateContainer || this.label
            },
            fadeOutElements() {
                var startSettings = {
                    opacity: 1
                };
                var endSettings = {
                    opacity: 0
                };
                var animationSettings = {
                    partitionDuration: .5
                };
                if (this.getContentContainer()) {
                    this._fadeOutLabel()
                }
                if (this.grid) {
                    this.grid.append(axis._axisGridGroup).attr(startSettings).animate(endSettings, animationSettings)
                }
                if (this.mark) {
                    this.mark.append(axis._axisLineGroup).attr(startSettings).animate(endSettings, animationSettings)
                }
            },
            _fadeInLabel() {
                var group = axis._renderer.g().attr({
                    opacity: 0
                }).append(axis._axisElementsGroup).animate({
                    opacity: 1
                }, {
                    delay: .5,
                    partitionDuration: .5
                });
                this.getContentContainer().append(group)
            },
            _fadeOutLabel() {
                var group = axis._renderer.g().attr({
                    opacity: 1
                }).animate({
                    opacity: 0
                }, {
                    partitionDuration: .5
                }).append(axis._axisElementsGroup).toBackground();
                this.getContentContainer().append(group)
            },
            _getTemplateCoords() {
                return axis._getLabelAdjustedCoord(this, (axis._constantLabelOffset || 0) + (tick.labelOffset || 0))
            },
            updateLabelPosition: function(animate) {
                var templateContainer = this.templateContainer;
                if (!this.getContentContainer()) {
                    return
                }
                if (animate && this._storedLabelsCoords) {
                    if (templateContainer) {
                        templateContainer.attr(this._storedLabelsCoords);
                        var lCoords = this._getTemplateCoords();
                        templateContainer.animate(lCoords)
                    } else {
                        this.label.attr({
                            x: this._storedLabelsCoords.x,
                            y: this._storedLabelsCoords.y
                        });
                        this.label.animate({
                            x: this.labelCoords.x,
                            y: this.labelCoords.y
                        })
                    }
                } else {
                    if (templateContainer) {
                        var _lCoords = this._getTemplateCoords();
                        templateContainer.attr(_lCoords)
                    } else {
                        this.label.attr({
                            x: this.labelCoords.x,
                            y: this.labelCoords.y
                        })
                    }
                    if (animate) {
                        this._fadeInLabel()
                    }
                }
            },
            updateMultilineTextAlignment() {
                if (labelOptions.template || !this.label) {
                    return
                }
                this.label.attr({
                    textsAlignment: this.labelAlignment || axis.getOptions().label.alignment
                })
            },
            drawGrid: function(drawLine) {
                if (gridOptions.visible && skippedCategory !== this.value) {
                    if (this.grid) {
                        this.grid.append(axis._axisGridGroup);
                        axis.sharp(this.grid, axis.getSharpDirectionByCoords(this.coords));
                        this.updateGridPosition()
                    } else {
                        this.grid = drawLine(this, gridStyle);
                        this.grid && this.grid.append(axis._axisGridGroup)
                    }
                }
            },
            updateGridPosition: function(animate) {
                this._updateLine(this.grid, axis._getGridPoints(tick.coords), this._storedCoords && axis._getGridPoints(this._storedCoords), animate, true)
            },
            removeLabel() {
                var contentContainer = this.getContentContainer();
                contentContainer && contentContainer.remove();
                this._templateDef && this._templateDef.reject();
                this._templateDef = this.templateContainer = this.label = null
            }
        };
        return tick
    }
}



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/tick_generator.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/tick_generator.js ***!
  \****************************************************************/
/*! exports provided: tickGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tickGenerator", function() { return tickGenerator; });
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/**
 * DevExtreme (esm/viz/axes/tick_generator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var convertDateUnitToMilliseconds = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].convertDateUnitToMilliseconds;
var dateToMilliseconds = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].dateToMilliseconds;
var math = Math;
var mathAbs = math.abs;
var mathFloor = math.floor;
var mathCeil = math.ceil;
var mathPow = math.pow;
var NUMBER_MULTIPLIERS = [1, 2, 2.5, 5];
var LOGARITHMIC_MULTIPLIERS = [1, 2, 3, 5];
var DATETIME_MULTIPLIERS = {
    millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    second: [1, 2, 3, 5, 10, 15, 20, 30],
    minute: [1, 2, 3, 5, 10, 15, 20, 30],
    hour: [1, 2, 3, 4, 6, 8, 12],
    day: [1, 2],
    week: [1, 2],
    month: [1, 2, 3, 6]
};
var DATETIME_MULTIPLIERS_WITH_BIG_WEEKEND = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, DATETIME_MULTIPLIERS, {
    day: [1]
});
var DATETIME_MINOR_MULTIPLIERS = {
    millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    second: [1, 2, 3, 5, 10, 15, 20, 30],
    minute: [1, 2, 3, 5, 10, 15, 20, 30],
    hour: [1, 2, 3, 4, 6, 8, 12],
    day: [1, 2, 3, 7, 14],
    month: [1, 2, 3, 6]
};
var MINOR_DELIMITERS = [2, 4, 5, 8, 10];
var VISIBILITY_DELIMITER = 3;
var MINUTE = 6e4;

function dummyGenerator(options) {
    return function(data, screenDelta, tickInterval, forceTickInterval) {
        var count = mathFloor(screenDelta / options.axisDivisionFactor);
        count = count < 1 ? 1 : count;
        var interval = screenDelta / count;
        return {
            ticks: interval > 0 ? Array.apply(null, new Array(count + 1)).map((_, i) => interval * i) : [],
            tickInterval: interval
        }
    }
}

function discreteGenerator(options) {
    return function(data, screenDelta, tickInterval, forceTickInterval) {
        var categories = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getCategoriesInfo"])(data.categories, data.min, data.max).categories;
        return {
            ticks: categories,
            tickInterval: mathCeil(categories.length * options.axisDivisionFactor / screenDelta)
        }
    }
}
var getValue = value => value;
var getLogValue = (base, allowNegatives, linearThreshold) => value => Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLogExt"])(value, base, allowNegatives, linearThreshold);
var raiseTo = (base, allowNegatives, linearThreshold) => value => Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["raiseToExt"])(value, base, allowNegatives, linearThreshold);
var mathRaiseTo = base => value => Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["raiseTo"])(value, base);
var logAbsValue = base => value => 0 === value ? 0 : Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLog"])(mathAbs(value), base);
var correctValueByInterval = (post, round, getValue) => (value, interval) => Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(post(round(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(getValue(value) / interval)) * interval));

function correctMinValueByEndOnTick(floorFunc, ceilFunc, resolveEndOnTick, endOnTick) {
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(endOnTick)) {
        return endOnTick ? floorFunc : ceilFunc
    }
    return function(value, interval, businessViewInfo, forceEndOnTick) {
        var floorTickValue = floorFunc(value, interval);
        if (value - floorTickValue === 0 || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(businessViewInfo) || resolveEndOnTick(value, floorTickValue, interval, businessViewInfo) || forceEndOnTick) {
            return floorTickValue
        }
        return ceilFunc(value, interval)
    }
}

function resolveEndOnTick(curValue, tickValue, interval, businessViewInfo) {
    var prevTickDataDiff = interval - mathAbs(tickValue - curValue);
    var intervalCount = math.max(mathCeil(businessViewInfo.businessDelta / interval), 2);
    var businessRatio = businessViewInfo.screenDelta / (intervalCount * interval);
    var potentialTickScreenDiff = math.round(businessRatio * prevTickDataDiff);
    var delimiterFactor = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLogExt"])(businessRatio * interval / businessViewInfo.axisDivisionFactor, 2) + 1;
    var delimiterMultiplier = (businessViewInfo.isSpacedMargin ? 2 : 1) * delimiterFactor;
    var screenDelimiter = math.round(VISIBILITY_DELIMITER * delimiterMultiplier);
    return businessViewInfo.businessDelta > businessViewInfo.interval && potentialTickScreenDiff >= screenDelimiter
}

function resolveEndOnTickLog(base) {
    return function(curValue, tickValue, interval, businessViewInfo) {
        return resolveEndOnTick(Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLogExt"])(curValue, base), Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLogExt"])(tickValue, base), interval, businessViewInfo)
    }
}

function resolveEndOnTickDate(curValue, tickValue, interval, businessViewInfo) {
    return resolveEndOnTick(curValue.valueOf(), tickValue.valueOf(), dateToMilliseconds(interval), businessViewInfo)
}

function getBusinessDelta(data, breaks) {
    var spacing = 0;
    if (breaks) {
        spacing = breaks.reduce((prev, item) => prev + (item.to - item.from), 0)
    }
    return mathAbs(data.max - data.min - spacing)
}

function getBusinessDeltaLog(base, allowNegatives, linearThreshold) {
    var getLog = getLogValue(base, allowNegatives, linearThreshold);
    return function(data, breaks) {
        var spacing = 0;
        if (breaks) {
            spacing = breaks.reduce((prev, item) => prev + mathAbs(getLog(item.to / item.from)), 0)
        }
        return mathCeil(mathAbs(getLog(data.max) - getLog(data.min)) - spacing)
    }
}

function getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor, addTickCount) {
    var count = screenDelta / axisDivisionFactor - (addTickCount || 0);
    count = count < 1 ? 1 : count;
    return businessDelta / count
}

function getMultiplierFactor(interval, factorDelta) {
    return mathPow(10, mathFloor(Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLogExt"])(interval, 10)) + (factorDelta || 0))
}

function calculateTickInterval(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, addTickCount, _, minTickInterval) {
    var interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor, addTickCount);
    var result = 1;
    var onlyIntegers = false === allowDecimals;
    if (!forceTickInterval || !tickInterval) {
        if (interval >= 1 || !onlyIntegers && interval > 0) {
            result = adjustInterval(interval, multipliers, onlyIntegers)
        }
        if (!tickInterval || !forceTickInterval && tickInterval < result) {
            tickInterval = result
        }
    }
    if (!forceTickInterval && minTickInterval) {
        minTickInterval = adjustInterval(minTickInterval, multipliers, onlyIntegers);
        if (minTickInterval > tickInterval) {
            tickInterval = minTickInterval
        }
    }
    return tickInterval
}

function adjustInterval(interval, multipliers, onlyIntegers) {
    var factor = getMultiplierFactor(interval, -1);
    var result = 1;
    multipliers = multipliers || NUMBER_MULTIPLIERS;
    if (interval > 0) {
        interval /= factor;
        result = multipliers.concat(10 * multipliers[0]).map(m => 10 * m).reduce((r, m) => {
            if (.1 === factor && onlyIntegers && 25 === m) {
                return r
            }
            return r < interval ? m : r
        }, 0);
        result = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(result * factor, factor)
    }
    return result
}

function calculateMinorTickInterval(businessDelta, screenDelta, tickInterval, axisDivisionFactor) {
    var interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor);
    return tickInterval || MINOR_DELIMITERS.reduce((r, d) => {
        var cur = businessDelta / d;
        return cur >= interval ? cur : r
    }, 0)
}

function getCalculateTickIntervalLog(skipCalculationLimits) {
    return function(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, _, __, minTickInterval) {
        var interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor);
        var result = 0;
        var adjustInterval = getAdjustIntervalLog(skipCalculationLimits);
        if (!forceTickInterval || !tickInterval) {
            if (interval > 0) {
                result = adjustInterval(interval, multipliers)
            }
            if (!tickInterval || !forceTickInterval && tickInterval < result) {
                tickInterval = result
            }
        }
        if (!forceTickInterval && minTickInterval) {
            minTickInterval = adjustInterval(minTickInterval, multipliers);
            if (minTickInterval > tickInterval) {
                tickInterval = minTickInterval
            }
        }
        return tickInterval
    }
}

function getAdjustIntervalLog(skipCalculationLimits) {
    return function(interval, multipliers) {
        var factor = getMultiplierFactor(interval);
        multipliers = multipliers || LOGARITHMIC_MULTIPLIERS;
        if (!skipCalculationLimits && factor < 1) {
            factor = 1
        }
        return multipliers.concat(10 * multipliers[0]).reduce((r, m) => r < interval ? m * factor : r, 0)
    }
}

function getDataTimeMultipliers(gapSize) {
    if (gapSize && gapSize > 2) {
        return DATETIME_MULTIPLIERS_WITH_BIG_WEEKEND
    } else {
        return DATETIME_MULTIPLIERS
    }
}

function numbersReducer(interval, key) {
    return function(r, m) {
        if (!r && interval <= convertDateUnitToMilliseconds(key, m)) {
            r = {};
            r[key + "s"] = m
        }
        return r
    }
}

function yearsReducer(interval, factor) {
    return function(r, m) {
        var years = factor * m;
        if (!r && interval <= convertDateUnitToMilliseconds("year", years) && 2.5 !== years) {
            r = {
                years: years
            }
        }
        return r
    }
}

function calculateTickIntervalDateTime(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, addTickCount, gapSize, minTickInterval) {
    if (!forceTickInterval || !tickInterval) {
        var result = adjustIntervalDateTime(getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor), multipliers, null, gapSize);
        if (!tickInterval || !forceTickInterval && dateToMilliseconds(tickInterval) <= dateToMilliseconds(result)) {
            tickInterval = result
        }
    }
    if (!forceTickInterval && minTickInterval) {
        minTickInterval = adjustIntervalDateTime(minTickInterval, multipliers, null, gapSize);
        if (dateToMilliseconds(minTickInterval) > dateToMilliseconds(tickInterval)) {
            tickInterval = minTickInterval
        }
    }
    return tickInterval
}

function adjustIntervalDateTime(interval, multipliers, _, gapSize) {
    var result;
    multipliers = multipliers || getDataTimeMultipliers(gapSize);
    for (var key in multipliers) {
        result = multipliers[key].reduce(numbersReducer(interval, key), result);
        if (result) {
            break
        }
    }
    if (!result) {
        for (var factor = 1;; factor *= 10) {
            result = NUMBER_MULTIPLIERS.reduce(yearsReducer(interval, factor), result);
            if (result) {
                break
            }
        }
    }
    return result
}

function calculateMinorTickIntervalDateTime(businessDelta, screenDelta, tickInterval, axisDivisionFactor) {
    return calculateTickIntervalDateTime(businessDelta, screenDelta, tickInterval, true, axisDivisionFactor, DATETIME_MINOR_MULTIPLIERS)
}

function getTickIntervalByCustomTicks(getValue, postProcess) {
    return ticks => ticks ? postProcess(mathAbs(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(getValue(ticks[1]) - getValue(ticks[0])))) || void 0 : void 0
}

function addInterval(value, interval, isNegative) {
    return _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].addInterval(value, interval, isNegative)
}

function addIntervalLog(log, raise) {
    return (value, interval, isNegative) => raise(addInterval(log(value), interval, isNegative))
}

function addIntervalDate(value, interval, isNegative) {
    return addInterval(value, interval, isNegative)
}

function addIntervalWithBreaks(addInterval, breaks, correctValue) {
    breaks = breaks.filter(b => !b.gapSize);
    return function(value, interval, isNegative) {
        var breakSize;
        value = addInterval(value, interval, isNegative);
        if (!breaks.every(item => {
                if (value >= addInterval(item.from, interval) && addInterval(value, interval) < item.to) {
                    breakSize = item.to - item.from - 2 * (addInterval(item.from, interval) - item.from)
                }
                return !breakSize
            })) {
            value = correctValue(addInterval(value, breakSize), interval)
        }
        return value
    }
}

function calculateTicks(addInterval, correctMinValue, adjustInterval, resolveEndOnTick) {
    return function(data, tickInterval, endOnTick, gaps, breaks, businessDelta, screenDelta, axisDivisionFactor, generateExtraTick) {
        var correctTickValue = correctTickValueOnGapSize(addInterval, gaps);
        var min = data.min;
        var max = data.max;
        var businessViewInfo = {
            screenDelta: screenDelta,
            businessDelta: businessDelta,
            axisDivisionFactor: axisDivisionFactor,
            isSpacedMargin: data.isSpacedMargin,
            interval: tickInterval
        };
        var cur = correctMinValue(min, tickInterval, businessViewInfo);
        var ticks = [];
        if (null !== breaks && void 0 !== breaks && breaks.length) {
            addInterval = addIntervalWithBreaks(addInterval, breaks, correctMinValue)
        }
        if (cur > max) {
            cur = correctMinValue(min, adjustInterval(businessDelta / 2), businessViewInfo);
            if (cur > max) {
                endOnTick = true;
                cur = correctMinValue(min, tickInterval, businessViewInfo, endOnTick)
            }
        }
        cur = correctTickValue(cur);
        var prev;
        while (cur < max && cur !== prev || generateExtraTick && cur <= max) {
            ticks.push(cur);
            prev = cur;
            cur = correctTickValue(addInterval(cur, tickInterval))
        }
        if (endOnTick || cur - max === 0 || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(endOnTick) && resolveEndOnTick(max, cur, tickInterval, businessViewInfo)) {
            ticks.push(cur)
        }
        return ticks
    }
}

function calculateMinorTicks(updateTickInterval, addInterval, correctMinValue, correctTickValue, ceil) {
    return function(min, max, majorTicks, minorTickInterval, tickInterval, breaks, maxCount) {
        var factor = tickInterval / minorTickInterval;
        var lastMajor = majorTicks[majorTicks.length - 1];
        var firstMajor = majorTicks[0];
        var tickBalance = maxCount - 1;
        if (null !== breaks && void 0 !== breaks && breaks.length) {
            addInterval = addIntervalWithBreaks(addInterval, breaks, correctMinValue)
        }
        minorTickInterval = updateTickInterval(minorTickInterval, firstMajor, firstMajor, factor);
        if (0 === minorTickInterval) {
            return []
        }
        var cur = correctTickValue(correctMinValue(min, tickInterval, min), minorTickInterval);
        minorTickInterval = updateTickInterval(minorTickInterval, firstMajor, cur, factor);
        var ticks = [];
        while (cur < firstMajor && (!tickBalance || tickBalance > 0)) {
            cur >= min && ticks.push(cur);
            tickBalance--;
            cur = addInterval(cur, minorTickInterval)
        }
        var middleTicks = majorTicks.reduce((r, tick) => {
            tickBalance = maxCount - 1;
            if (null === r.prevTick) {
                r.prevTick = tick;
                return r
            }
            minorTickInterval = updateTickInterval(minorTickInterval, tick, r.prevTick, factor);
            var cur = correctTickValue(r.prevTick, minorTickInterval);
            while (cur < tick && (!tickBalance || tickBalance > 0)) {
                cur !== r.prevTick && r.minors.push(cur);
                tickBalance--;
                cur = addInterval(cur, minorTickInterval)
            }
            r.prevTick = tick;
            return r
        }, {
            prevTick: null,
            minors: []
        });
        ticks = ticks.concat(middleTicks.minors);
        var maxValue = ceil(max, tickInterval, min);
        minorTickInterval = updateTickInterval(minorTickInterval, maxValue, maxValue, factor);
        cur = correctTickValue(lastMajor, minorTickInterval);
        var prev;
        while (cur < max && cur !== prev) {
            ticks.push(cur);
            prev = cur;
            cur = addInterval(cur, minorTickInterval)
        }
        if (lastMajor - max !== 0 && cur - max === 0) {
            ticks.push(cur)
        }
        return ticks
    }
}

function filterTicks(ticks, breaks) {
    if (breaks.length) {
        var result = breaks.reduce((result, b) => {
            var tmpTicks = [];
            var i;
            for (i = result[1]; i < ticks.length; i++) {
                var tickValue = ticks[i];
                if (tickValue < b.from) {
                    tmpTicks.push(tickValue)
                }
                if (tickValue >= b.to) {
                    break
                }
            }
            return [result[0].concat(tmpTicks), i]
        }, [
            [], 0
        ]);
        return result[0].concat(ticks.slice(result[1]))
    }
    return ticks
}

function correctTickValueOnGapSize(addInterval, breaks) {
    return function(value) {
        var gapSize;
        if (!breaks.every(item => {
                if (value >= item.from && value < item.to) {
                    gapSize = item.gapSize
                }
                return !gapSize
            })) {
            value = addInterval(value, gapSize)
        }
        return value
    }
}

function generator(options, getBusinessDelta, calculateTickInterval, calculateMinorTickInterval, getMajorTickIntervalByCustomTicks, getMinorTickIntervalByCustomTicks, convertTickInterval, calculateTicks, calculateMinorTicks, processScaleBreaks) {
    function correctUserTickInterval(tickInterval, businessDelta, limit) {
        if (tickInterval && businessDelta / convertTickInterval(tickInterval) >= limit + 1) {
            options.incidentOccurred("W2003");
            tickInterval = void 0
        }
        return tickInterval
    }
    return function(data, screenDelta, tickInterval, forceTickInterval, customTicks, minorTickInterval, minorTickCount, breaks) {
        customTicks = customTicks || {};
        var businessDelta = getBusinessDelta(data, breaks);
        var result = function(customTicks) {
            return {
                tickInterval: getMajorTickIntervalByCustomTicks(customTicks.majors),
                ticks: customTicks.majors || [],
                minorTickInterval: getMinorTickIntervalByCustomTicks(customTicks.minors),
                minorTicks: customTicks.minors || []
            }
        }(customTicks);
        if (!isNaN(businessDelta)) {
            if (0 === businessDelta && !customTicks.majors) {
                result.ticks = [data.min]
            } else {
                result = function(ticks, data, businessDelta, screenDelta, tickInterval, forceTickInterval, customTicks, breaks) {
                    if (customTicks.majors) {
                        ticks.breaks = breaks;
                        return ticks
                    }
                    var gaps = breaks.filter(b => b.gapSize);
                    var majorTicks;
                    tickInterval = options.skipCalculationLimits ? tickInterval : correctUserTickInterval(tickInterval, businessDelta, screenDelta);
                    tickInterval = calculateTickInterval(businessDelta, screenDelta, tickInterval, forceTickInterval, options.axisDivisionFactor, options.numberMultipliers, options.allowDecimals, breaks.length, gaps[0] && gaps[0].gapSize.days, options.minTickInterval);
                    if (!options.skipTickGeneration) {
                        majorTicks = calculateTicks(data, tickInterval, options.endOnTick, gaps, breaks, businessDelta, screenDelta, options.axisDivisionFactor, options.generateExtraTick);
                        breaks = processScaleBreaks(breaks, majorTicks, tickInterval);
                        majorTicks = filterTicks(majorTicks, breaks);
                        ticks.breaks = breaks;
                        ticks.ticks = ticks.ticks.concat(majorTicks)
                    }
                    ticks.tickInterval = tickInterval;
                    return ticks
                }(result, data, businessDelta, screenDelta, tickInterval, forceTickInterval, customTicks, breaks || []);
                if (!options.skipTickGeneration && businessDelta > 0) {
                    result = function(ticks, data, businessDelta, screenDelta, minorTickInterval, minorTickCount, customTicks) {
                        if (!options.calculateMinors) {
                            return ticks
                        }
                        if (customTicks.minors) {
                            return ticks
                        }
                        var minorBusinessDelta = convertTickInterval(ticks.tickInterval);
                        var minorScreenDelta = screenDelta * minorBusinessDelta / businessDelta;
                        var breaks = ticks.breaks;
                        if (!minorTickInterval && minorTickCount) {
                            minorTickInterval = getMinorTickIntervalByCustomTicks([minorBusinessDelta / (minorTickCount + 1), minorBusinessDelta / (minorTickCount + 1) * 2])
                        } else {
                            minorTickCount = void 0
                        }
                        minorTickInterval = correctUserTickInterval(minorTickInterval, minorBusinessDelta, minorScreenDelta);
                        minorTickInterval = calculateMinorTickInterval(minorBusinessDelta, minorScreenDelta, minorTickInterval, options.minorAxisDivisionFactor);
                        ticks.minorTicks = filterTicks(ticks.minorTicks.concat(calculateMinorTicks(data.min, data.max, ticks.ticks, minorTickInterval, ticks.tickInterval, breaks, minorTickCount)), breaks);
                        ticks.minorTickInterval = minorTickInterval;
                        return ticks
                    }(result, data, businessDelta, screenDelta, minorTickInterval, minorTickCount, customTicks)
                }
            }
        }
        return result
    }
}

function getBaseTick(breakValue, _ref, interval, getValue) {
    var [tick, insideTick] = _ref;
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(tick) || mathAbs(getValue(breakValue) - getValue(tick)) / interval > .25) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(insideTick) && mathAbs(getValue(insideTick) - getValue(tick)) / interval < 2) {
            tick = insideTick
        } else if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(tick)) {
            tick = breakValue
        }
    }
    return tick
}

function getScaleBreaksProcessor(convertTickInterval, getValue, addCorrection) {
    return function(breaks, ticks, tickInterval) {
        var interval = convertTickInterval(tickInterval);
        var correction = .5 * interval;
        return breaks.reduce((result, b) => {
            var breakTicks = ticks.filter(tick => tick <= b.from);
            var from = addCorrection(getBaseTick(b.from, [].concat(breakTicks[breakTicks.length - 1], ticks[breakTicks.length]), interval, getValue), correction);
            breakTicks = ticks.filter(tick => tick >= b.to);
            var to = addCorrection(getBaseTick(b.to, [].concat(breakTicks[0], ticks[ticks.length - breakTicks.length - 1]), interval, getValue), -correction);
            if (getValue(to) - getValue(from) < interval && !b.gapSize) {
                return result
            }
            if (b.gapSize) {
                return result.concat([b])
            }
            return result.concat([{
                from: from,
                to: to,
                cumulativeWidth: b.cumulativeWidth
            }])
        }, [])
    }
}

function numericGenerator(options) {
    var floor = correctValueByInterval(getValue, mathFloor, getValue);
    var ceil = correctValueByInterval(getValue, mathCeil, getValue);
    var calculateTickIntervalByCustomTicks = getTickIntervalByCustomTicks(getValue, getValue);
    return generator(options, getBusinessDelta, calculateTickInterval, calculateMinorTickInterval, calculateTickIntervalByCustomTicks, calculateTickIntervalByCustomTicks, getValue, calculateTicks(addInterval, correctMinValueByEndOnTick(floor, ceil, resolveEndOnTick, options.endOnTick), adjustInterval, resolveEndOnTick), calculateMinorTicks(getValue, addInterval, floor, addInterval, getValue), getScaleBreaksProcessor(getValue, getValue, (value, correction) => value + correction))
}
var correctValueByIntervalLog = (post, getRound, getValue) => (value, interval) => Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["sign"])(value) * Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(post(getRound(value)(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["adjust"])(getValue(value) / interval)) * interval));

function logarithmicGenerator(options) {
    var base = options.logBase;
    var raise = raiseTo(base, options.allowNegatives, options.linearThreshold);
    var log = getLogValue(base, options.allowNegatives, options.linearThreshold);
    var absLog = logAbsValue(base);
    var absRaise = mathRaiseTo(base);
    var floor = correctValueByIntervalLog(absRaise, value => value < 0 ? mathCeil : mathFloor, absLog);
    var ceil = correctValueByIntervalLog(absRaise, value => value < 0 ? mathFloor : mathCeil, absLog);
    var ceilNumber = correctValueByInterval(getValue, mathCeil, getValue);
    return generator(options, getBusinessDeltaLog(base, options.allowNegatives, options.linearThreshold), getCalculateTickIntervalLog(options.skipCalculationLimits), calculateMinorTickInterval, getTickIntervalByCustomTicks(log, getValue), getTickIntervalByCustomTicks(getValue, getValue), getValue, calculateTicks(addIntervalLog(log, raise), correctMinValueByEndOnTick(floor, ceil, resolveEndOnTickLog(base), options.endOnTick), getAdjustIntervalLog(options.skipCalculationLimits), resolveEndOnTickLog(base)), calculateMinorTicks((_, tick, prevTick, factor) => Math.max(Math.abs(tick), Math.abs(prevTick)) / factor, addInterval, floor, ceilNumber, ceil), getScaleBreaksProcessor(getValue, log, (value, correction) => raise(log(value) + correction)))
}

function dateGenerator(options) {
    function floor(value, interval) {
        var floorNumber = correctValueByInterval(getValue, mathFloor, getValue);
        var intervalObject = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isString"])(interval) ? _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].getDateIntervalByString(interval.toLowerCase()) : interval;
        var divider = dateToMilliseconds(interval);
        if (intervalObject.days % 7 === 0 || interval.quarters) {
            intervalObject = adjustIntervalDateTime(divider)
        }
        var correctDateWithUnitBeginning = v => _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].correctDateWithUnitBeginning(v, intervalObject, null, options.firstDayOfWeek);
        var floorAtStartDate = v => new Date(mathFloor((v.getTime() - v.getTimezoneOffset() * MINUTE) / divider) * divider + v.getTimezoneOffset() * MINUTE);
        value = correctDateWithUnitBeginning(value);
        if ("years" in intervalObject) {
            value.setFullYear(floorNumber(value.getFullYear(), intervalObject.years))
        } else if ("quarters" in intervalObject) {
            value = correctDateWithUnitBeginning(floorAtStartDate(value))
        } else if ("months" in intervalObject) {
            value.setMonth(floorNumber(value.getMonth(), intervalObject.months))
        } else if ("weeks" in intervalObject || "days" in intervalObject) {
            value = correctDateWithUnitBeginning(floorAtStartDate(value))
        } else if ("hours" in intervalObject) {
            value.setHours(floorNumber(value.getHours(), intervalObject.hours))
        } else if ("minutes" in intervalObject) {
            value.setMinutes(floorNumber(value.getMinutes(), intervalObject.minutes))
        } else if ("seconds" in intervalObject) {
            value.setSeconds(floorNumber(value.getSeconds(), intervalObject.seconds))
        } else if ("milliseconds" in intervalObject) {
            value = floorAtStartDate(value)
        }
        return value
    }
    var calculateTickIntervalByCustomTicks = getTickIntervalByCustomTicks(getValue, _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].convertMillisecondsToDateUnits);
    return generator(options, getBusinessDelta, calculateTickIntervalDateTime, calculateMinorTickIntervalDateTime, calculateTickIntervalByCustomTicks, calculateTickIntervalByCustomTicks, dateToMilliseconds, calculateTicks(addIntervalDate, correctMinValueByEndOnTick(floor, (function(value, interval) {
        var newValue = floor(value, interval);
        while (value - newValue > 0) {
            newValue = addIntervalDate(newValue, interval)
        }
        return newValue
    }), resolveEndOnTickDate, options.endOnTick), adjustIntervalDateTime, resolveEndOnTickDate), calculateMinorTicks(getValue, addIntervalDate, floor, addIntervalDate, getValue), getScaleBreaksProcessor(dateToMilliseconds, getValue, (value, correction) => new Date(value.getTime() + correction)))
}
var tickGenerator = function(options) {
    var result;
    if (options.rangeIsEmpty) {
        result = dummyGenerator(options)
    } else if ("discrete" === options.axisType) {
        result = discreteGenerator(options)
    } else if ("logarithmic" === options.axisType) {
        result = logarithmicGenerator(options)
    } else if ("datetime" === options.dataType) {
        result = dateGenerator(options)
    } else {
        result = numericGenerator(options)
    }
    return result
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/axes/xy_axes.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/axes/xy_axes.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _translators_range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../translators/range */ "./node_modules/devextreme/esm/viz/translators/range.js");
/* harmony import */ var _format_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../format_helper */ "./node_modules/devextreme/esm/format_helper.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _datetime_breaks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datetime_breaks */ "./node_modules/devextreme/esm/viz/axes/datetime_breaks.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _axes_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./axes_constants */ "./node_modules/devextreme/esm/viz/axes/axes_constants.js");
/**
 * DevExtreme (esm/viz/axes/xy_axes.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var getNextDateUnit = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getNextDateUnit;
var correctDateWithUnitBeginning = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].correctDateWithUnitBeginning;
var _math = Math;
var _max = _math.max;
var TOP = _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].top;
var BOTTOM = _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].bottom;
var LEFT = _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].left;
var RIGHT = _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].right;
var CENTER = _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].center;
var SCALE_BREAK_OFFSET = 3;
var RANGE_RATIO = .3;
var WAVED_LINE_CENTER = 2;
var WAVED_LINE_TOP = 0;
var WAVED_LINE_BOTTOM = 4;
var WAVED_LINE_LENGTH = 24;
var TICKS_CORRECTIONS = {
    left: -1,
    top: -1,
    right: 0,
    bottom: 0,
    center: -.5
};

function prepareDatesDifferences(datesDifferences, tickInterval) {
    var dateUnitInterval;
    var i;
    if ("week" === tickInterval) {
        tickInterval = "day"
    }
    if ("quarter" === tickInterval) {
        tickInterval = "month"
    }
    if (datesDifferences[tickInterval]) {
        for (i = 0; i < _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].dateUnitIntervals.length; i++) {
            dateUnitInterval = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].dateUnitIntervals[i];
            if (datesDifferences[dateUnitInterval]) {
                datesDifferences[dateUnitInterval] = false;
                datesDifferences.count--
            }
            if (dateUnitInterval === tickInterval) {
                break
            }
        }
    }
}

function sortingBreaks(breaks) {
    return breaks.sort((function(a, b) {
        return a.from - b.from
    }))
}

function getMarkerDates(min, max, markerInterval) {
    var origMin = min;
    var dates;
    min = correctDateWithUnitBeginning(min, markerInterval);
    max = correctDateWithUnitBeginning(max, markerInterval);
    dates = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getSequenceByInterval(min, max, markerInterval);
    if (dates.length && origMin > dates[0]) {
        dates = dates.slice(1)
    }
    return dates
}

function getStripHorizontalAlignmentPosition(alignment) {
    var position = "start";
    if ("center" === alignment) {
        position = "center"
    }
    if ("right" === alignment) {
        position = "end"
    }
    return position
}

function getStripVerticalAlignmentPosition(alignment) {
    var position = "start";
    if ("center" === alignment) {
        position = "center"
    }
    if ("bottom" === alignment) {
        position = "end"
    }
    return position
}

function getMarkerInterval(tickInterval) {
    var markerInterval = getNextDateUnit(tickInterval);
    if ("quarter" === markerInterval) {
        markerInterval = getNextDateUnit(markerInterval)
    }
    return markerInterval
}

function getMarkerFormat(curDate, prevDate, tickInterval, markerInterval) {
    var format = markerInterval;
    var datesDifferences = prevDate && _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getDatesDifferences(prevDate, curDate);
    if (prevDate && "year" !== tickInterval) {
        prepareDatesDifferences(datesDifferences, tickInterval);
        format = _format_helper__WEBPACK_IMPORTED_MODULE_1__["default"].getDateFormatByDifferences(datesDifferences)
    }
    return format
}

function getMaxSide(act, boxes) {
    return boxes.reduce((function(prevValue, box) {
        return _max(prevValue, act(box))
    }), 0)
}

function getDistanceByAngle(bBox, rotationAngle) {
    rotationAngle = _math.abs(rotationAngle);
    rotationAngle = rotationAngle % 180 >= 90 ? 90 - rotationAngle % 90 : rotationAngle % 90;
    var a = rotationAngle * (_math.PI / 180);
    if (a >= _math.atan(bBox.height / bBox.width)) {
        return bBox.height / _math.abs(_math.sin(a))
    } else {
        return bBox.width
    }
}

function getMaxConstantLinePadding(constantLines) {
    return constantLines.reduce((function(padding, options) {
        return _max(padding, options.paddingTopBottom)
    }), 0)
}

function getConstantLineLabelMarginForVerticalAlignment(constantLines, alignment, labelHeight) {
    return constantLines.some((function(options) {
        return options.label.verticalAlignment === alignment
    })) && labelHeight || 0
}

function getLeftMargin(bBox) {
    return _math.abs(bBox.x) || 0
}

function getRightMargin(bBox) {
    return _math.abs(bBox.width - _math.abs(bBox.x)) || 0
}

function generateRangesOnPoints(points, edgePoints, getRange) {
    var i;
    var length;
    var maxRange = null;
    var ranges = [];
    var curValue;
    var prevValue;
    var curRange;
    for (i = 1, length = points.length; i < length; i++) {
        curValue = points[i];
        prevValue = points[i - 1];
        curRange = getRange(curValue, prevValue);
        if (edgePoints.indexOf(curValue) >= 0) {
            if (!maxRange || curRange > maxRange.length) {
                maxRange = {
                    start: curValue,
                    end: prevValue,
                    length: curRange
                }
            }
        } else {
            if (maxRange && curRange < maxRange.length) {
                ranges.push(maxRange)
            } else {
                ranges.push({
                    start: curValue,
                    end: prevValue,
                    length: curRange
                })
            }
            maxRange = null
        }
    }
    if (maxRange) {
        ranges.push(maxRange)
    }
    return ranges
}

function generateAutoBreaks(_ref, series, _ref2) {
    var {
        logarithmBase: logarithmBase,
        type: type,
        maxAutoBreakCount: maxAutoBreakCount
    } = _ref;
    var {
        minVisible: minVisible,
        maxVisible: maxVisible
    } = _ref2;
    var breaks = [];
    var getRange = "logarithmic" === type ? (min, max) => Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["getLog"])(max / min, logarithmBase) : (min, max) => max - min;
    var visibleRange = getRange(minVisible, maxVisible);
    var points = series.reduce((result, s) => {
        var points = s.getPointsInViewPort();
        result[0] = result[0].concat(points[0]);
        result[1] = result[1].concat(points[1]);
        return result
    }, [
        [],
        []
    ]);
    var sortedAllPoints = points[0].concat(points[1]).sort((a, b) => b - a);
    var edgePoints = points[1].filter(p => points[0].indexOf(p) < 0);
    var minDiff = RANGE_RATIO * visibleRange;
    var ranges = generateRangesOnPoints(sortedAllPoints, edgePoints, getRange).sort((a, b) => b.length - a.length);
    var epsilon = _math.min.apply(null, ranges.map(r => r.length)) / 1e3;
    var _maxAutoBreakCount = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(maxAutoBreakCount) ? _math.min(maxAutoBreakCount, ranges.length) : ranges.length;
    for (var i = 0; i < _maxAutoBreakCount; i++) {
        if (ranges[i].length >= minDiff) {
            if (visibleRange <= ranges[i].length) {
                break
            }
            visibleRange -= ranges[i].length;
            if (visibleRange > epsilon || visibleRange < -epsilon) {
                breaks.push({
                    from: ranges[i].start,
                    to: ranges[i].end
                });
                minDiff = RANGE_RATIO * visibleRange
            }
        } else {
            break
        }
    }
    sortingBreaks(breaks);
    return breaks
}
/* harmony default export */ __webpack_exports__["default"] = ({
    linear: {
        _getStep: function(boxes, rotationAngle) {
            var spacing = this._options.label.minSpacing;
            var func = this._isHorizontal ? function(box) {
                return box.width + spacing
            } : function(box) {
                return box.height
            };
            var maxLabelLength = getMaxSide(func, boxes);
            if (rotationAngle) {
                maxLabelLength = getDistanceByAngle({
                    width: maxLabelLength,
                    height: this._getMaxLabelHeight(boxes, 0)
                }, rotationAngle)
            }
            return _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].getTicksCountInRange(this._majorTicks, this._isHorizontal ? "x" : "y", maxLabelLength)
        },
        _getMaxLabelHeight: function(boxes, spacing) {
            return getMaxSide((function(box) {
                return box.height
            }), boxes) + spacing
        },
        _validateOverlappingMode: function(mode, displayMode) {
            if (this._isHorizontal && ("rotate" === displayMode || "stagger" === displayMode) || !this._isHorizontal) {
                return _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].validateOverlappingMode(mode)
            }
            return mode
        },
        _validateDisplayMode: function(mode) {
            return this._isHorizontal ? mode : "standard"
        },
        getMarkerTrackers: function() {
            return this._markerTrackers
        },
        _getSharpParam: function(opposite) {
            return this._isHorizontal ^ opposite ? "h" : "v"
        },
        _createAxisElement: function() {
            return this._renderer.path([], "line")
        },
        _updateAxisElementPosition: function() {
            var axisCoord = this._axisPosition;
            var canvas = this._getCanvasStartEnd();
            this._axisElement.attr({
                points: this._isHorizontal ? [canvas.start, axisCoord, canvas.end, axisCoord] : [axisCoord, canvas.start, axisCoord, canvas.end]
            })
        },
        _getTranslatedCoord: function(value, offset) {
            return this._translator.translate(value, offset)
        },
        _initAxisPositions() {
            if (this.customPositionIsAvailable()) {
                this._customBoundaryPosition = this.getCustomBoundaryPosition()
            }
            if (!this.customPositionIsAvailable() || this.customPositionIsBoundary()) {
                this._axisPosition = this.getPredefinedPosition(this.getResolvedBoundaryPosition())
            } else {
                this._axisPosition = this.getCustomPosition()
            }
        },
        _getTickMarkPoints(coords, length, tickOptions) {
            var isHorizontal = this._isHorizontal;
            var tickOrientation = this._options.tickOrientation;
            var labelPosition = this._options.label.position;
            var tickStartCoord;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(tickOrientation)) {
                tickStartCoord = TICKS_CORRECTIONS[tickOrientation] * length
            } else {
                var shift = tickOptions.shift || 0;
                if (!isHorizontal && labelPosition === LEFT || isHorizontal && labelPosition !== BOTTOM) {
                    shift = -shift
                }
                tickStartCoord = shift + this.getTickStartPositionShift(length)
            }
            return [coords.x + (isHorizontal ? 0 : tickStartCoord), coords.y + (isHorizontal ? tickStartCoord : 0), coords.x + (isHorizontal ? 0 : tickStartCoord + length), coords.y + (isHorizontal ? tickStartCoord + length : 0)]
        },
        getTickStartPositionShift(length) {
            var width = this._options.width;
            var position = this.getResolvedBoundaryPosition();
            return length % 2 === 1 ? width % 2 === 0 && (position === LEFT || position === TOP) || width % 2 === 1 && (position === RIGHT || position === BOTTOM) && !this.hasNonBoundaryPosition() ? Math.floor(-length / 2) : -Math.floor(length / 2) : -length / 2 + (width % 2 === 0 ? 0 : position === BOTTOM || position === RIGHT ? -1 : 1)
        },
        _getTitleCoords: function() {
            var horizontal = this._isHorizontal;
            var x = this._axisPosition;
            var y = this._axisPosition;
            var align = this._options.title.alignment;
            var canvas = this._getCanvasStartEnd();
            var fromStartToEnd = horizontal || this._options.position === LEFT;
            var canvasStart = fromStartToEnd ? canvas.start : canvas.end;
            var canvasEnd = fromStartToEnd ? canvas.end : canvas.start;
            var coord = align === LEFT ? canvasStart : align === RIGHT ? canvasEnd : canvas.start + (canvas.end - canvas.start) / 2;
            if (horizontal) {
                x = coord
            } else {
                y = coord
            }
            return {
                x: x,
                y: y
            }
        },
        _drawTitleText: function(group, coords) {
            var options = this._options;
            var titleOptions = options.title;
            var attrs = {
                opacity: titleOptions.opacity,
                align: titleOptions.alignment,
                class: titleOptions.cssClass
            };
            if (!titleOptions.text || !group) {
                return
            }
            coords = coords || this._getTitleCoords();
            if (!this._isHorizontal) {
                attrs.rotate = options.position === LEFT ? 270 : 90
            }
            var text = this._renderer.text(titleOptions.text, coords.x, coords.y).css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["patchFontOptions"])(titleOptions.font)).attr(attrs).append(group);
            this._checkTitleOverflow(text);
            return text
        },
        _updateTitleCoords: function() {
            this._title && this._title.element.attr(this._getTitleCoords())
        },
        _drawTitle: function() {
            var title = this._drawTitleText(this._axisTitleGroup);
            if (title) {
                this._title = {
                    element: title
                }
            }
        },
        _measureTitle: function() {
            if (this._title) {
                if (this._title.bBox && !this._title.originalSize) {
                    this._title.originalSize = this._title.bBox
                }
                this._title.bBox = this._title.element.getBBox()
            }
        },
        _drawDateMarker: function(date, options, range) {
            var markerOptions = this._options.marker;
            var invert = this._translator.getBusinessRange().invert;
            var textIndent = markerOptions.width + markerOptions.textLeftIndent;
            var pathElement;
            if (null === options.x) {
                return
            }
            if (!options.withoutStick) {
                pathElement = this._renderer.path([options.x, options.y, options.x, options.y + markerOptions.separatorHeight], "line").attr({
                    "stroke-width": markerOptions.width,
                    stroke: markerOptions.color,
                    "stroke-opacity": markerOptions.opacity,
                    sharp: "h"
                }).append(this._axisElementsGroup)
            }
            var text = String(this.formatLabel(date, options.labelOptions, range));
            return {
                date: date,
                x: options.x,
                y: options.y,
                cropped: options.withoutStick,
                label: this._renderer.text(text, options.x, options.y).css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["patchFontOptions"])(markerOptions.label.font)).append(this._axisElementsGroup),
                line: pathElement,
                getContentContainer() {
                    return this.label
                },
                getEnd: function() {
                    return this.x + (invert ? -1 : 1) * (textIndent + this.labelBBox.width)
                },
                setTitle: function() {
                    this.title = text
                },
                hideLabel: function() {
                    this.label.dispose();
                    this.label = null;
                    this.title = text
                },
                hide: function() {
                    if (pathElement) {
                        pathElement.dispose();
                        pathElement = null
                    }
                    this.label.dispose();
                    this.label = null;
                    this.hidden = true
                }
            }
        },
        _drawDateMarkers: function() {
            var that = this;
            var options = that._options;
            var translator = that._translator;
            var viewport = that._getViewportRange();
            var minBound = viewport.minVisible;
            var dateMarkers = [];
            var dateMarker;

            function draw(markerDate, format, withoutStick) {
                return that._drawDateMarker(markerDate, {
                    x: translator.translate(markerDate),
                    y: markersAreaTop,
                    labelOptions: that._getLabelFormatOptions(format),
                    withoutStick: withoutStick
                }, viewport)
            }
            if (viewport.isEmpty() || !options.marker.visible || "datetime" !== options.argumentType || "discrete" === options.type || that._majorTicks.length <= 1) {
                return []
            }
            var markersAreaTop = that._axisPosition + options.marker.topIndent;
            var tickInterval = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].getDateUnitInterval(this._tickInterval);
            var markerInterval = getMarkerInterval(tickInterval);
            var markerDates = getMarkerDates(minBound, viewport.maxVisible, markerInterval);
            if (markerDates.length > 1 || 1 === markerDates.length && minBound < markerDates[0]) {
                dateMarkers = markerDates.reduce((function(markers, curDate, i, dates) {
                    var marker = draw(curDate, getMarkerFormat(curDate, dates[i - 1] || minBound < curDate && minBound, tickInterval, markerInterval));
                    marker && markers.push(marker);
                    return markers
                }), []);
                if (minBound < markerDates[0]) {
                    dateMarker = draw(minBound, getMarkerFormat(minBound, markerDates[0], tickInterval, markerInterval), true);
                    dateMarker && dateMarkers.unshift(dateMarker)
                }
            }
            return dateMarkers
        },
        _adjustDateMarkers: function(offset) {
            offset = offset || 0;
            var that = this;
            var markerOptions = this._options.marker;
            var textIndent = markerOptions.width + markerOptions.textLeftIndent;
            var invert = this._translator.getBusinessRange().invert;
            var canvas = that._getCanvasStartEnd();
            var dateMarkers = this._dateMarkers;
            if (!dateMarkers.length) {
                return offset
            }
            if (dateMarkers[0].cropped) {
                if (!this._checkMarkersPosition(invert, dateMarkers[1], dateMarkers[0])) {
                    dateMarkers[0].hideLabel()
                }
            }
            var prevDateMarker;
            dateMarkers.forEach((function(marker, i, markers) {
                if (marker.cropped) {
                    return
                }
                if (invert ? marker.getEnd() < canvas.end : marker.getEnd() > canvas.end) {
                    marker.hideLabel()
                } else if (that._checkMarkersPosition(invert, marker, prevDateMarker)) {
                    prevDateMarker = marker
                } else {
                    marker.hide()
                }
            }));
            this._dateMarkers.forEach((function(marker) {
                if (marker.label) {
                    var labelBBox = marker.labelBBox;
                    var dy = marker.y + markerOptions.textTopIndent - labelBBox.y;
                    marker.label.attr({
                        translateX: invert ? marker.x - textIndent - labelBBox.x - labelBBox.width : marker.x + textIndent - labelBBox.x,
                        translateY: dy + offset
                    })
                }
                if (marker.line) {
                    marker.line.attr({
                        translateY: offset
                    })
                }
            }));
            that._initializeMarkersTrackers(offset);
            return offset + markerOptions.topIndent + markerOptions.separatorHeight
        },
        _checkMarkersPosition: function(invert, dateMarker, prevDateMarker) {
            if (void 0 === prevDateMarker) {
                return true
            }
            return invert ? dateMarker.x < prevDateMarker.getEnd() : dateMarker.x > prevDateMarker.getEnd()
        },
        _initializeMarkersTrackers: function(offset) {
            var separatorHeight = this._options.marker.separatorHeight;
            var renderer = this._renderer;
            var businessRange = this._translator.getBusinessRange();
            var canvas = this._getCanvasStartEnd();
            var group = this._axisElementsGroup;
            this._markerTrackers = this._dateMarkers.filter((function(marker) {
                return !marker.hidden
            })).map((function(marker, i, markers) {
                var nextMarker = markers[i + 1] || {
                    x: canvas.end,
                    date: businessRange.max
                };
                var x = marker.x;
                var y = marker.y + offset;
                var markerTracker = renderer.path([x, y, x, y + separatorHeight, nextMarker.x, y + separatorHeight, nextMarker.x, y, x, y], "area").attr({
                    "stroke-width": 1,
                    stroke: "grey",
                    fill: "grey",
                    opacity: 1e-4
                }).append(group);
                markerTracker.data("range", {
                    startValue: marker.date,
                    endValue: nextMarker.date
                });
                if (marker.title) {
                    markerTracker.setTitle(marker.title)
                }
                return markerTracker
            }))
        },
        _getLabelFormatOptions: function(formatString) {
            var markerLabelOptions = this._markerLabelOptions;
            if (!markerLabelOptions) {
                this._markerLabelOptions = markerLabelOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, {}, this._options.marker.label)
            }
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(this._options.marker.label.format)) {
                markerLabelOptions.format = formatString
            }
            return markerLabelOptions
        },
        _adjustConstantLineLabels: function(constantLines) {
            var that = this;
            var axisPosition = that._options.position;
            var canvas = that.getCanvas();
            var canvasLeft = canvas.left;
            var canvasRight = canvas.width - canvas.right;
            var canvasTop = canvas.top;
            var canvasBottom = canvas.height - canvas.bottom;
            var verticalCenter = canvasTop + (canvasBottom - canvasTop) / 2;
            var horizontalCenter = canvasLeft + (canvasRight - canvasLeft) / 2;
            var maxLabel = 0;
            constantLines.forEach((function(item) {
                var isHorizontal = that._isHorizontal;
                var linesOptions = item.options;
                var paddingTopBottom = linesOptions.paddingTopBottom;
                var paddingLeftRight = linesOptions.paddingLeftRight;
                var labelOptions = linesOptions.label;
                var labelVerticalAlignment = labelOptions.verticalAlignment;
                var labelHorizontalAlignment = labelOptions.horizontalAlignment;
                var labelIsInside = "inside" === labelOptions.position;
                var label = item.label;
                var box = item.labelBBox;
                var translateX;
                var translateY;
                if (null === label || box.isEmpty) {
                    return
                }
                if (isHorizontal) {
                    if (labelIsInside) {
                        if (labelHorizontalAlignment === LEFT) {
                            translateX = item.coord - paddingLeftRight - box.x - box.width
                        } else {
                            translateX = item.coord + paddingLeftRight - box.x
                        }
                        switch (labelVerticalAlignment) {
                            case CENTER:
                                translateY = verticalCenter - box.y - box.height / 2;
                                break;
                            case BOTTOM:
                                translateY = canvasBottom - paddingTopBottom - box.y - box.height;
                                break;
                            default:
                                translateY = canvasTop + paddingTopBottom - box.y
                        }
                    } else {
                        if (axisPosition === labelVerticalAlignment) {
                            maxLabel = _max(maxLabel, box.height + paddingTopBottom)
                        }
                        translateX = item.coord - box.x - box.width / 2;
                        if (labelVerticalAlignment === BOTTOM) {
                            translateY = canvasBottom + paddingTopBottom - box.y
                        } else {
                            translateY = canvasTop - paddingTopBottom - box.y - box.height
                        }
                    }
                } else if (labelIsInside) {
                    if (labelVerticalAlignment === BOTTOM) {
                        translateY = item.coord + paddingTopBottom - box.y
                    } else {
                        translateY = item.coord - paddingTopBottom - box.y - box.height
                    }
                    switch (labelHorizontalAlignment) {
                        case CENTER:
                            translateX = horizontalCenter - box.x - box.width / 2;
                            break;
                        case RIGHT:
                            translateX = canvasRight - paddingLeftRight - box.x - box.width;
                            break;
                        default:
                            translateX = canvasLeft + paddingLeftRight - box.x
                    }
                } else {
                    if (axisPosition === labelHorizontalAlignment) {
                        maxLabel = _max(maxLabel, box.width + paddingLeftRight)
                    }
                    translateY = item.coord - box.y - box.height / 2;
                    if (labelHorizontalAlignment === RIGHT) {
                        translateX = canvasRight + paddingLeftRight - box.x
                    } else {
                        translateX = canvasLeft - paddingLeftRight - box.x - box.width
                    }
                }
                label.attr({
                    translateX: translateX,
                    translateY: translateY
                })
            }));
            return maxLabel
        },
        _drawConstantLinesForEstimating: function(constantLines) {
            var that = this;
            var renderer = this._renderer;
            var group = renderer.g();
            constantLines.forEach((function(options) {
                that._drawConstantLineLabelText(options.label.text, 0, 0, options.label, group).attr({
                    align: "center"
                })
            }));
            return group.append(renderer.root)
        },
        _estimateLabelHeight: function(bBox, labelOptions) {
            var height = bBox.height;
            var drawingType = labelOptions.drawingType;
            if ("stagger" === this._validateDisplayMode(drawingType) || "stagger" === this._validateOverlappingMode(labelOptions.overlappingBehavior, drawingType)) {
                height = 2 * height + labelOptions.staggeringSpacing
            }
            if ("rotate" === this._validateDisplayMode(drawingType) || "rotate" === this._validateOverlappingMode(labelOptions.overlappingBehavior, drawingType)) {
                var sinCos = Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["getCosAndSin"])(labelOptions.rotationAngle);
                height = height * sinCos.cos + bBox.width * sinCos.sin
            }
            return height && (height + labelOptions.indentFromAxis || 0) || 0
        },
        estimateMargins: function(canvas) {
            this.updateCanvas(canvas);
            var range = this._getViewportRange();
            var ticksData = this._createTicksAndLabelFormat(range);
            var ticks = ticksData.ticks;
            var tickInterval = ticksData.tickInterval;
            var options = this._options;
            var constantLineOptions = this._outsideConstantLines.filter(l => l.labelOptions.visible).map(l => l.options);
            var rootElement = this._renderer.root;
            var labelIsVisible = options.label.visible && !range.isEmpty() && ticks.length;
            var labelValue = labelIsVisible && this.formatLabel(ticks[ticks.length - 1], options.label, void 0, void 0, tickInterval, ticks);
            var labelElement = labelIsVisible && this._renderer.text(labelValue, 0, 0).css(this._textFontStyles).attr(this._textOptions).append(rootElement);
            var titleElement = this._drawTitleText(rootElement, {
                x: 0,
                y: 0
            });
            var constantLinesLabelsElement = this._drawConstantLinesForEstimating(constantLineOptions);
            var labelBox = !options.label.template && labelElement && labelElement.getBBox() || {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            var titleBox = titleElement && titleElement.getBBox() || {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            var constantLinesBox = constantLinesLabelsElement.getBBox();
            var titleHeight = titleBox.height ? titleBox.height + options.title.margin : 0;
            var labelHeight = this._estimateLabelHeight(labelBox, options.label);
            var constantLinesHeight = constantLinesBox.height ? constantLinesBox.height + getMaxConstantLinePadding(constantLineOptions) : 0;
            var height = labelHeight + titleHeight;
            var margins = {
                left: _max(getLeftMargin(labelBox), getLeftMargin(constantLinesBox)),
                right: _max(getRightMargin(labelBox), getRightMargin(constantLinesBox)),
                top: ("top" === options.position ? height : 0) + getConstantLineLabelMarginForVerticalAlignment(constantLineOptions, "top", constantLinesHeight),
                bottom: ("top" !== options.position ? height : 0) + getConstantLineLabelMarginForVerticalAlignment(constantLineOptions, "bottom", constantLinesHeight)
            };
            labelElement && labelElement.remove();
            titleElement && titleElement.remove();
            constantLinesLabelsElement && constantLinesLabelsElement.remove();
            return margins
        },
        _checkAlignmentConstantLineLabels: function(labelOptions) {
            var position = labelOptions.position;
            var verticalAlignment = (labelOptions.verticalAlignment || "").toLowerCase();
            var horizontalAlignment = (labelOptions.horizontalAlignment || "").toLowerCase();
            if (this._isHorizontal) {
                if ("outside" === position) {
                    verticalAlignment = verticalAlignment === BOTTOM ? BOTTOM : TOP;
                    horizontalAlignment = CENTER
                } else {
                    verticalAlignment = verticalAlignment === CENTER ? CENTER : verticalAlignment === BOTTOM ? BOTTOM : TOP;
                    horizontalAlignment = horizontalAlignment === LEFT ? LEFT : RIGHT
                }
            } else if ("outside" === position) {
                verticalAlignment = CENTER;
                horizontalAlignment = horizontalAlignment === LEFT ? LEFT : RIGHT
            } else {
                verticalAlignment = verticalAlignment === BOTTOM ? BOTTOM : TOP;
                horizontalAlignment = horizontalAlignment === RIGHT ? RIGHT : horizontalAlignment === CENTER ? CENTER : LEFT
            }
            labelOptions.verticalAlignment = verticalAlignment;
            labelOptions.horizontalAlignment = horizontalAlignment
        },
        _getConstantLineLabelsCoords: function(value, lineLabelOptions) {
            var x = value;
            var y = value;
            if (this._isHorizontal) {
                y = this._orthogonalPositions["top" === lineLabelOptions.verticalAlignment ? "start" : "end"]
            } else {
                x = this._orthogonalPositions["right" === lineLabelOptions.horizontalAlignment ? "end" : "start"]
            }
            return {
                x: x,
                y: y
            }
        },
        _getAdjustedStripLabelCoords: function(strip) {
            var stripOptions = strip.options;
            var paddingTopBottom = stripOptions.paddingTopBottom;
            var paddingLeftRight = stripOptions.paddingLeftRight;
            var horizontalAlignment = stripOptions.label.horizontalAlignment;
            var verticalAlignment = stripOptions.label.verticalAlignment;
            var box = strip.labelBBox;
            var labelHeight = box.height;
            var labelWidth = box.width;
            var labelCoords = strip.labelCoords;
            var y = labelCoords.y - box.y;
            var x = labelCoords.x - box.x;
            if (verticalAlignment === TOP) {
                y += paddingTopBottom
            } else if (verticalAlignment === CENTER) {
                y -= labelHeight / 2
            } else if (verticalAlignment === BOTTOM) {
                y -= paddingTopBottom + labelHeight
            }
            if (horizontalAlignment === LEFT) {
                x += paddingLeftRight
            } else if (horizontalAlignment === CENTER) {
                x -= labelWidth / 2
            } else if (horizontalAlignment === RIGHT) {
                x -= paddingLeftRight + labelWidth
            }
            return {
                translateX: x,
                translateY: y
            }
        },
        _adjustTitle: function(offset) {
            offset = offset || 0;
            if (!this._title) {
                return
            }
            var options = this._options;
            var position = options.position;
            var margin = options.title.margin;
            var title = this._title;
            var boxTitle = title.bBox;
            var x = boxTitle.x;
            var y = boxTitle.y;
            var width = boxTitle.width;
            var height = boxTitle.height;
            var axisPosition = this._axisPosition;
            var loCoord = axisPosition - margin - offset;
            var hiCoord = axisPosition + margin + offset;
            var params = {};
            if (this._isHorizontal) {
                if (position === TOP) {
                    params.translateY = loCoord - (y + height)
                } else {
                    params.translateY = hiCoord - y
                }
            } else if (position === LEFT) {
                params.translateX = loCoord - (x + width)
            } else {
                params.translateX = hiCoord - x
            }
            title.element.attr(params)
        },
        _checkTitleOverflow: function(titleElement) {
            if (!this._title && !titleElement) {
                return
            }
            var canvasLength = this._getScreenDelta();
            var title = titleElement ? {
                bBox: titleElement.getBBox(),
                element: titleElement
            } : this._title;
            var titleOptions = this._options.title;
            var boxTitle = title.bBox;
            if ((this._isHorizontal ? boxTitle.width : boxTitle.height) > canvasLength) {
                title.element.setMaxSize(canvasLength, void 0, {
                    wordWrap: titleOptions.wordWrap || "none",
                    textOverflow: titleOptions.textOverflow || "ellipsis"
                });
                this._wrapped = titleOptions.wordWrap && "none" !== titleOptions.wordWrap
            } else {
                var moreThanOriginalSize = title.originalSize && canvasLength > (this._isHorizontal ? title.originalSize.width : title.originalSize.height);
                !this._wrapped && moreThanOriginalSize && title.element.restoreText()
            }
        },
        coordsIn: function(x, y) {
            var canvas = this.getCanvas();
            var isHorizontal = this._options.isHorizontal;
            var position = this._options.position;
            var coord = isHorizontal ? y : x;
            if (isHorizontal && (x < canvas.left || x > canvas.width - canvas.right) || !isHorizontal && (y < canvas.top || y > canvas.height - canvas.bottom)) {
                return false
            }
            if (isHorizontal && position === _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].top || !isHorizontal && position === _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].left) {
                return coord < canvas[position]
            }
            return coord > canvas[isHorizontal ? "height" : "width"] - canvas[position]
        },
        _boundaryTicksVisibility: {
            min: true,
            max: true
        },
        adjust() {
            var seriesData = this._seriesData;
            var viewport = this._series.filter(s => s.isVisible()).reduce((range, s) => {
                var seriesRange = s.getViewport();
                range.min = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(seriesRange.min) ? range.min < seriesRange.min ? range.min : seriesRange.min : range.min;
                range.max = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(seriesRange.max) ? range.max > seriesRange.max ? range.max : seriesRange.max : range.max;
                if (s.showZero) {
                    range = new _translators_range__WEBPACK_IMPORTED_MODULE_0__["Range"](range);
                    range.correctValueZeroLevel()
                }
                return range
            }, {});
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(viewport.min) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(viewport.max)) {
                seriesData.minVisible = viewport.min;
                seriesData.maxVisible = viewport.max
            }
            seriesData.userBreaks = this._getScaleBreaks(this._options, {
                minVisible: seriesData.minVisible,
                maxVisible: seriesData.maxVisible
            }, this._series, this.isArgumentAxis);
            this._translator.updateBusinessRange(this._getViewportRange())
        },
        hasWrap() {
            return this._wrapped
        },
        getAxisPosition() {
            return this._axisPosition
        },
        _getStick: function() {
            return !this._options.valueMarginsEnabled
        },
        _getStripLabelCoords: function(from, to, stripLabelOptions) {
            var orthogonalPositions = this._orthogonalPositions;
            var isHorizontal = this._isHorizontal;
            var horizontalAlignment = stripLabelOptions.horizontalAlignment;
            var verticalAlignment = stripLabelOptions.verticalAlignment;
            var x;
            var y;
            if (isHorizontal) {
                if (horizontalAlignment === CENTER) {
                    x = from + (to - from) / 2
                } else if (horizontalAlignment === LEFT) {
                    x = from
                } else if (horizontalAlignment === RIGHT) {
                    x = to
                }
                y = orthogonalPositions[getStripVerticalAlignmentPosition(verticalAlignment)]
            } else {
                x = orthogonalPositions[getStripHorizontalAlignmentPosition(horizontalAlignment)];
                if (verticalAlignment === TOP) {
                    y = from
                } else if (verticalAlignment === CENTER) {
                    y = to + (from - to) / 2
                } else if (verticalAlignment === BOTTOM) {
                    y = to
                }
            }
            return {
                x: x,
                y: y
            }
        },
        _getTranslatedValue: function(value, offset) {
            var pos1 = this._translator.translate(value, offset, "semidiscrete" === this._options.type && this._options.tickInterval);
            var pos2 = this._axisPosition;
            var isHorizontal = this._isHorizontal;
            return {
                x: isHorizontal ? pos1 : pos2,
                y: isHorizontal ? pos2 : pos1
            }
        },
        areCoordsOutsideAxis: function(coords) {
            var coord = this._isHorizontal ? coords.x : coords.y;
            var visibleArea = this.getVisibleArea();
            if (coord < visibleArea[0] || coord > visibleArea[1]) {
                return true
            }
            return false
        },
        _getSkippedCategory: function(ticks) {
            var skippedCategory;
            if (this._options.type === _axes_constants__WEBPACK_IMPORTED_MODULE_8__["default"].discrete && this._tickOffset && 0 !== ticks.length) {
                skippedCategory = ticks[ticks.length - 1]
            }
            return skippedCategory
        },
        _filterBreaks: function(breaks, viewport, breakStyle) {
            var minVisible = viewport.minVisible;
            var maxVisible = viewport.maxVisible;
            var breakSize = breakStyle ? breakStyle.width : 0;
            return breaks.reduce((function(result, currentBreak) {
                var from = currentBreak.from;
                var to = currentBreak.to;
                var lastResult = result[result.length - 1];
                var newBreak;
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(from) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(to)) {
                    return result
                }
                if (from > to) {
                    to = [from, from = to][0]
                }
                if (result.length && from < lastResult.to) {
                    if (to > lastResult.to) {
                        lastResult.to = to > maxVisible ? maxVisible : to;
                        if (lastResult.gapSize) {
                            lastResult.gapSize = void 0;
                            lastResult.cumulativeWidth += breakSize
                        }
                    }
                } else if (from >= minVisible && from < maxVisible || to <= maxVisible && to > minVisible) {
                    from = from >= minVisible ? from : minVisible;
                    to = to <= maxVisible ? to : maxVisible;
                    if (to - from < maxVisible - minVisible) {
                        var _lastResult$cumulativ;
                        newBreak = {
                            from: from,
                            to: to,
                            cumulativeWidth: (null !== (_lastResult$cumulativ = null === lastResult || void 0 === lastResult ? void 0 : lastResult.cumulativeWidth) && void 0 !== _lastResult$cumulativ ? _lastResult$cumulativ : 0) + breakSize
                        };
                        if (currentBreak.gapSize) {
                            var _lastResult$cumulativ2;
                            newBreak.gapSize = _core_utils_date__WEBPACK_IMPORTED_MODULE_2__["default"].convertMillisecondsToDateUnits(to - from);
                            newBreak.cumulativeWidth = null !== (_lastResult$cumulativ2 = null === lastResult || void 0 === lastResult ? void 0 : lastResult.cumulativeWidth) && void 0 !== _lastResult$cumulativ2 ? _lastResult$cumulativ2 : 0
                        }
                        result.push(newBreak)
                    }
                }
                return result
            }), [])
        },
        _getScaleBreaks: function(axisOptions, viewport, series, isArgumentAxis) {
            var that = this;
            var breaks = (axisOptions.breaks || []).map((function(b) {
                return {
                    from: that.parser(b.startValue),
                    to: that.parser(b.endValue)
                }
            }));
            if ("discrete" !== axisOptions.type && "datetime" === axisOptions.dataType && axisOptions.workdaysOnly) {
                breaks = breaks.concat(Object(_datetime_breaks__WEBPACK_IMPORTED_MODULE_4__["generateDateBreaks"])(viewport.minVisible, viewport.maxVisible, axisOptions.workWeek, axisOptions.singleWorkdays, axisOptions.holidays))
            }
            if (!isArgumentAxis && "discrete" !== axisOptions.type && "datetime" !== axisOptions.dataType && axisOptions.autoBreaksEnabled && 0 !== axisOptions.maxAutoBreakCount) {
                breaks = breaks.concat(generateAutoBreaks(axisOptions, series, viewport))
            }
            return sortingBreaks(breaks)
        },
        _drawBreak: function(translatedEnd, positionFrom, positionTo, width, options, group) {
            var breakStart = translatedEnd - (!this._translator.isInverted() ? width + 1 : 0);
            var attr = {
                "stroke-width": 1,
                stroke: options.borderColor,
                sharp: !options.isWaved ? options.isHorizontal ? "h" : "v" : void 0
            };
            var spaceAttr = {
                stroke: options.color,
                "stroke-width": width
            };
            var getPoints = this._isHorizontal ? rotateLine : function(p) {
                return p
            };
            var drawer = getLineDrawer(this._renderer, group, getPoints, positionFrom, breakStart, positionTo, options.isWaved);
            drawer(width / 2, spaceAttr);
            drawer(0, attr);
            drawer(width, attr)
        },
        _createBreakClipRect: function(from, to) {
            var canvas = this._canvas;
            var clipWidth = to - from;
            var clipRect;
            if (this._isHorizontal) {
                clipRect = this._renderer.clipRect(canvas.left, from, canvas.width, clipWidth)
            } else {
                clipRect = this._renderer.clipRect(from, canvas.top, clipWidth, canvas.height)
            }
            this._breaksElements = this._breaksElements || [];
            this._breaksElements.push(clipRect);
            return clipRect.id
        },
        _createBreaksGroup: function(clipFrom, clipTo) {
            var group = this._renderer.g().attr({
                class: this._axisCssPrefix + "breaks",
                "clip-path": this._createBreakClipRect(clipFrom, clipTo)
            }).append(this._scaleBreaksGroup);
            this._breaksElements = this._breaksElements || [];
            this._breaksElements.push(group);
            return group
        },
        _disposeBreaksGroup: function() {
            (this._breaksElements || []).forEach((function(clipRect) {
                clipRect.dispose()
            }));
            this._breaksElements = null
        },
        drawScaleBreaks: function(customCanvas) {
            var that = this;
            var options = that._options;
            var breakStyle = options.breakStyle;
            var position = options.position;
            var positionFrom;
            var positionTo;
            var breaks = that._translator.getBusinessRange().breaks || [];
            var additionGroup;
            var additionBreakFrom;
            var additionBreakTo;
            that._disposeBreaksGroup();
            if (!(breaks && breaks.length)) {
                return
            }
            var breakOptions = {
                color: that._options.containerColor,
                borderColor: breakStyle.color,
                isHorizontal: that._isHorizontal,
                isWaved: "straight" !== breakStyle.line.toLowerCase()
            };
            if (customCanvas) {
                positionFrom = customCanvas.start;
                positionTo = customCanvas.end
            } else {
                positionFrom = that._orthogonalPositions.start - (options.visible && !that._axisShift && (position === LEFT || position === TOP) ? SCALE_BREAK_OFFSET : 0);
                positionTo = that._orthogonalPositions.end + (options.visible && (position === RIGHT || position === BOTTOM) ? SCALE_BREAK_OFFSET : 0)
            }
            var mainGroup = that._createBreaksGroup(positionFrom, positionTo);
            if (that._axisShift && options.visible) {
                additionBreakFrom = that._axisPosition - that._axisShift - SCALE_BREAK_OFFSET;
                additionBreakTo = additionBreakFrom + 2 * SCALE_BREAK_OFFSET;
                additionGroup = that._createBreaksGroup(additionBreakFrom, additionBreakTo)
            }
            breaks.forEach((function(br) {
                if (!br.gapSize) {
                    var breakCoord = that._getTranslatedCoord(br.to);
                    that._drawBreak(breakCoord, positionFrom, positionTo, breakStyle.width, breakOptions, mainGroup);
                    if (that._axisShift && options.visible) {
                        that._drawBreak(breakCoord, additionBreakFrom, additionBreakTo, breakStyle.width, breakOptions, additionGroup)
                    }
                }
            }))
        },
        _getSpiderCategoryOption: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
        shift: function(margins) {
            var options = this._options;
            var isHorizontal = options.isHorizontal;
            var axesSpacing = this.getMultipleAxesSpacing();
            var constantLinesGroups = this._axisConstantLineGroups;

            function shiftGroup(side, group) {
                var attr = {
                    translateX: 0,
                    translateY: 0
                };
                var shift = margins[side] ? margins[side] + axesSpacing : 0;
                attr[isHorizontal ? "translateY" : "translateX"] = (side === LEFT || side === TOP ? -1 : 1) * shift;
                (group[side] || group).attr(attr);
                return shift
            }
            this._axisShift = shiftGroup(options.position, this._axisGroup);
            shiftGroup(options.position, this._axisElementsGroup);
            (isHorizontal ? [TOP, BOTTOM] : [LEFT, RIGHT]).forEach(side => {
                shiftGroup(side, constantLinesGroups.above);
                shiftGroup(side, constantLinesGroups.under)
            })
        },
        getCustomPosition(position) {
            var orthogonalAxis = this.getOrthogonalAxis();
            var resolvedPosition = null !== position && void 0 !== position ? position : this.getResolvedPositionOption();
            var offset = this.getOptions().offset;
            var orthogonalTranslator = orthogonalAxis.getTranslator();
            var orthogonalAxisType = orthogonalAxis.getOptions().type;
            var validPosition = orthogonalAxis.validateUnit(resolvedPosition);
            var currentPosition;
            if ("discrete" === orthogonalAxisType && (!orthogonalTranslator._categories || orthogonalTranslator._categories.indexOf(validPosition) < 0)) {
                validPosition = void 0
            }
            if (this.positionIsBoundary(resolvedPosition)) {
                currentPosition = this.getPredefinedPosition(resolvedPosition)
            } else if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(validPosition)) {
                currentPosition = this.getPredefinedPosition(this.getOptions().position)
            } else {
                currentPosition = orthogonalTranslator.to(validPosition, -1)
            }
            if (isFinite(currentPosition) && isFinite(offset)) {
                currentPosition += offset
            }
            return currentPosition
        },
        getCustomBoundaryPosition(position) {
            var {
                customPosition: customPosition,
                offset: offset
            } = this.getOptions();
            var resolvedPosition = null !== position && void 0 !== position ? position : this.getResolvedPositionOption();
            var orthogonalAxis = this.getOrthogonalAxis();
            var orthogonalTranslator = orthogonalAxis.getTranslator();
            var visibleArea = orthogonalTranslator.getCanvasVisibleArea();
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(orthogonalAxis._orthogonalPositions) || 0 === orthogonalTranslator.canvasLength) {
                return
            }
            var currentPosition = this.getCustomPosition(resolvedPosition);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(currentPosition)) {
                return this.getResolvedBoundaryPosition()
            } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(customPosition)) {
                if (currentPosition <= visibleArea.min) {
                    return this._isHorizontal ? TOP : LEFT
                } else if (currentPosition >= visibleArea.max) {
                    return this._isHorizontal ? BOTTOM : RIGHT
                }
            } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(offset)) {
                if (currentPosition <= this._orthogonalPositions.start) {
                    return this._isHorizontal ? TOP : LEFT
                } else if (currentPosition >= this._orthogonalPositions.end) {
                    return this._isHorizontal ? BOTTOM : RIGHT
                }
            }
            return currentPosition
        },
        getResolvedPositionOption() {
            var _options$customPositi;
            var options = this.getOptions();
            return null !== (_options$customPositi = options.customPosition) && void 0 !== _options$customPositi ? _options$customPositi : options.position
        },
        customPositionIsAvailable() {
            var options = this.getOptions();
            return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(this.getOrthogonalAxis()) && (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(options.customPosition) || isFinite(options.offset))
        },
        hasNonBoundaryPosition() {
            return this.customPositionIsAvailable() && !this.customPositionIsBoundary()
        },
        getResolvedBoundaryPosition() {
            return this.customPositionIsBoundary() ? this._customBoundaryPosition : this.getOptions().position
        },
        customPositionEqualsToPredefined() {
            return this.customPositionIsBoundary() && this._customBoundaryPosition === this.getOptions().position
        },
        customPositionIsBoundary() {
            return this.positionIsBoundary(this._customBoundaryPosition)
        },
        positionIsBoundary: position => [TOP, LEFT, BOTTOM, RIGHT].indexOf(position) >= 0,
        getPredefinedPosition(position) {
            var _this$_orthogonalPosi;
            return null === (_this$_orthogonalPosi = this._orthogonalPositions) || void 0 === _this$_orthogonalPosi ? void 0 : _this$_orthogonalPosi[position === TOP || position === LEFT ? "start" : "end"]
        },
        resolveOverlappingForCustomPositioning(oppositeAxes) {
            var that = this;
            if (!that.hasNonBoundaryPosition() && !that.customPositionIsBoundary() && !oppositeAxes.some(a => a.hasNonBoundaryPosition())) {
                return
            }
            var overlappingObj = {
                axes: [],
                ticks: []
            };
            oppositeAxes.filter(orthogonalAxis => orthogonalAxis.pane === that.pane).forEach(orthogonalAxis => {
                for (var i = 0; i < that._majorTicks.length; i++) {
                    var tick = that._majorTicks[i];
                    var label = tick.label;
                    if (label) {
                        if (overlappingObj.axes.indexOf(orthogonalAxis) < 0 && that._detectElementsOverlapping(label, orthogonalAxis._axisElement)) {
                            overlappingObj.axes.push(orthogonalAxis);
                            that._shiftThroughOrthogonalAxisOverlappedTick(label, orthogonalAxis)
                        }
                        for (var j = 0; j < orthogonalAxis._majorTicks.length; j++) {
                            var oppositeTick = orthogonalAxis._majorTicks[j];
                            var oppositeLabel = oppositeTick.label;
                            if (oppositeLabel && that._detectElementsOverlapping(label, oppositeLabel)) {
                                overlappingObj.ticks.push(tick);
                                that._shiftThroughAxisOverlappedTick(tick);
                                i = that._majorTicks.length;
                                break
                            }
                        }
                    }
                    if (tick.mark && overlappingObj.ticks.indexOf(tick) < 0) {
                        if (that._isHorizontal && tick.mark.attr("translateY")) {
                            tick.mark.attr({
                                translateY: 0
                            })
                        } else if (!that._isHorizontal && tick.mark.attr("translateX")) {
                            tick.mark.attr({
                                translateX: 0
                            })
                        }
                    }
                }
            })
        },
        _shiftThroughOrthogonalAxisOverlappedTick(label, orthogonalAxis) {
            var labelBBox = label.getBBox();
            var orthogonalAxisPosition = orthogonalAxis.getAxisPosition();
            var orthogonalAxisLabelOptions = orthogonalAxis.getOptions().label;
            var orthogonalAxisLabelPosition = orthogonalAxisLabelOptions.position;
            var orthogonalAxisLabelIndent = orthogonalAxisLabelOptions.indentFromAxis / 2;
            var translateCoordName = this._isHorizontal ? "translateX" : "translateY";
            var defaultOrthogonalAxisLabelPosition = this._isHorizontal ? LEFT : TOP;
            var translate = label.attr(translateCoordName);
            var labelCoord = (this._isHorizontal ? labelBBox.x : labelBBox.y) + translate;
            var labelSize = this._isHorizontal ? labelBBox.width : labelBBox.height;
            var outsidePart = orthogonalAxisPosition - labelCoord;
            var insidePart = labelCoord + labelSize - orthogonalAxisPosition;
            var attr = {};
            attr[translateCoordName] = translate;
            if (outsidePart > 0 && insidePart > 0) {
                if (insidePart - outsidePart > 1) {
                    attr[translateCoordName] += outsidePart + orthogonalAxisLabelIndent
                } else if (outsidePart - insidePart > 1) {
                    attr[translateCoordName] -= insidePart + orthogonalAxisLabelIndent
                } else {
                    attr[translateCoordName] += orthogonalAxisLabelPosition === defaultOrthogonalAxisLabelPosition ? outsidePart + orthogonalAxisLabelIndent : -(insidePart + orthogonalAxisLabelIndent)
                }
                label.attr(attr)
            }
        },
        _shiftThroughAxisOverlappedTick(tick) {
            var _tick$mark;
            var label = tick.label;
            if (!label) {
                return
            }
            var labelBBox = label.getBBox();
            var tickMarkBBox = null === (_tick$mark = tick.mark) || void 0 === _tick$mark ? void 0 : _tick$mark.getBBox();
            var axisPosition = this.getAxisPosition();
            var labelOptions = this.getOptions().label;
            var labelIndent = labelOptions.indentFromAxis;
            var labelPosition = labelOptions.position;
            var defaultLabelPosition = this._isHorizontal ? TOP : LEFT;
            var translateCoordName = this._isHorizontal ? "translateY" : "translateX";
            var translate = label.attr(translateCoordName);
            var labelCoord = (this._isHorizontal ? labelBBox.y : labelBBox.x) + translate;
            var labelSize = this._isHorizontal ? labelBBox.height : labelBBox.width;
            var attr = {};
            attr[translateCoordName] = translate + (labelPosition === defaultLabelPosition ? axisPosition - labelCoord + labelIndent : -(labelCoord - axisPosition + labelSize + labelIndent));
            label.attr(attr);
            if (tick.mark) {
                var markerSize = this._isHorizontal ? tickMarkBBox.height : tickMarkBBox.width;
                var dir = labelPosition === defaultLabelPosition ? 1 : -1;
                attr[translateCoordName] = dir * (markerSize - 1);
                tick.mark.attr(attr)
            }
        },
        _detectElementsOverlapping(element1, element2) {
            if (!element1 || !element2) {
                return false
            }
            var bBox1 = element1.getBBox();
            var x1 = bBox1.x + element1.attr("translateX");
            var y1 = bBox1.y + element1.attr("translateY");
            var bBox2 = element2.getBBox();
            var x2 = bBox2.x + element2.attr("translateX");
            var y2 = bBox2.y + element2.attr("translateY");
            return (x2 >= x1 && x2 <= x1 + bBox1.width || x1 >= x2 && x1 <= x2 + bBox2.width) && (y2 >= y1 && y2 <= y1 + bBox1.height || y1 >= y2 && y1 <= y2 + bBox2.height)
        }
    }
});

function getLineDrawer(renderer, root, rotatePoints, positionFrom, breakStart, positionTo, isWaved) {
    var elementType = isWaved ? "bezier" : "line";
    var group = renderer.g().append(root);
    return function(offset, attr) {
        renderer.path(rotatePoints(getPoints(positionFrom, breakStart, positionTo, offset, isWaved)), elementType).attr(attr).append(group)
    }
}

function getPoints(positionFrom, breakStart, positionTo, offset, isWaved) {
    if (!isWaved) {
        return [positionFrom, breakStart + offset, positionTo, breakStart + offset]
    }
    breakStart += offset;
    var currentPosition;
    var topPoint = breakStart + WAVED_LINE_TOP;
    var centerPoint = breakStart + WAVED_LINE_CENTER;
    var bottomPoint = breakStart + WAVED_LINE_BOTTOM;
    var points = [
        [positionFrom, centerPoint]
    ];
    for (currentPosition = positionFrom; currentPosition < positionTo + WAVED_LINE_LENGTH; currentPosition += WAVED_LINE_LENGTH) {
        points.push([currentPosition + 6, topPoint, currentPosition + 6, topPoint, currentPosition + 12, centerPoint, currentPosition + 18, bottomPoint, currentPosition + 18, bottomPoint, currentPosition + 24, centerPoint])
    }
    return [].concat.apply([], points)
}

function rotateLine(lineCoords) {
    var points = [];
    var i;
    for (i = 0; i < lineCoords.length; i += 2) {
        points.push(lineCoords[i + 1]);
        points.push(lineCoords[i])
    }
    return points
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/utils.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _chart_components_base_chart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./chart_components/base_chart */ "./node_modules/devextreme/esm/viz/chart_components/base_chart.js");
/* harmony import */ var _chart_components_multi_axes_synchronizer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./chart_components/multi_axes_synchronizer */ "./node_modules/devextreme/esm/viz/chart_components/multi_axes_synchronizer.js");
/* harmony import */ var _chart_components_advanced_chart__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./chart_components/advanced_chart */ "./node_modules/devextreme/esm/viz/chart_components/advanced_chart.js");
/* harmony import */ var _chart_components_scroll_bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./chart_components/scroll_bar */ "./node_modules/devextreme/esm/viz/chart_components/scroll_bar.js");
/* harmony import */ var _chart_components_crosshair__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./chart_components/crosshair */ "./node_modules/devextreme/esm/viz/chart_components/crosshair.js");
/* harmony import */ var _series_helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./series/helpers/range_data_calculator */ "./node_modules/devextreme/esm/viz/series/helpers/range_data_calculator.js");
/* harmony import */ var _chart_components_layout_manager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./chart_components/layout_manager */ "./node_modules/devextreme/esm/viz/chart_components/layout_manager.js");
/* harmony import */ var _translators_range__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./translators/range */ "./node_modules/devextreme/esm/viz/translators/range.js");
/* harmony import */ var _chart_components_shutter_zoom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./chart_components/shutter_zoom */ "./node_modules/devextreme/esm/viz/chart_components/shutter_zoom.js");
/* harmony import */ var _chart_components_zoom_and_pan__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./chart_components/zoom_and_pan */ "./node_modules/devextreme/esm/viz/chart_components/zoom_and_pan.js");
/* harmony import */ var _core_annotations__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./core/annotations */ "./node_modules/devextreme/esm/viz/core/annotations.js");
/**
 * DevExtreme (esm/viz/chart.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



















var DEFAULT_PANE_NAME = "default";
var VISUAL_RANGE = "VISUAL_RANGE";
var DEFAULT_PANES = [{
    name: DEFAULT_PANE_NAME,
    border: {}
}];
var DISCRETE = "discrete";
var _isArray = Array.isArray;

function getFirstAxisNameForPane(axes, paneName, defaultPane) {
    var result;
    for (var i = 0; i < axes.length; i++) {
        if (axes[i].pane === paneName || void 0 === axes[i].pane && paneName === defaultPane) {
            result = axes[i].name;
            break
        }
    }
    if (!result) {
        result = axes[0].name
    }
    return result
}

function changeVisibilityAxisGrids(axis, gridVisibility, minorGridVisibility) {
    var gridOpt = axis.getOptions().grid;
    var minorGridOpt = axis.getOptions().minorGrid;
    gridOpt.visible = gridVisibility;
    minorGridOpt && (minorGridOpt.visible = minorGridVisibility)
}

function hideGridsOnNonFirstValueAxisForPane(axesForPane) {
    var axisShown = false;
    var hiddenStubAxis = [];
    var minorGridVisibility = axesForPane.some((function(axis) {
        var minorGridOptions = axis.getOptions().minorGrid;
        return minorGridOptions && minorGridOptions.visible
    }));
    var gridVisibility = axesForPane.some((function(axis) {
        var gridOptions = axis.getOptions().grid;
        return gridOptions && gridOptions.visible
    }));
    if (axesForPane.length > 1) {
        axesForPane.forEach((function(axis) {
            var gridOpt = axis.getOptions().grid;
            if (axisShown) {
                changeVisibilityAxisGrids(axis, false, false)
            } else if (gridOpt && gridOpt.visible) {
                if (axis.getTranslator().getBusinessRange().isEmpty()) {
                    changeVisibilityAxisGrids(axis, false, false);
                    hiddenStubAxis.push(axis)
                } else {
                    axisShown = true;
                    changeVisibilityAxisGrids(axis, gridVisibility, minorGridVisibility)
                }
            }
        }));
        !axisShown && hiddenStubAxis.length && changeVisibilityAxisGrids(hiddenStubAxis[0], gridVisibility, minorGridVisibility)
    }
}

function findAxisOptions(valueAxes, valueAxesOptions, axisName) {
    var result;
    var axInd;
    for (axInd = 0; axInd < valueAxesOptions.length; axInd++) {
        if (valueAxesOptions[axInd].name === axisName) {
            result = valueAxesOptions[axInd];
            result.priority = axInd;
            break
        }
    }
    if (!result) {
        for (axInd = 0; axInd < valueAxes.length; axInd++) {
            if (valueAxes[axInd].name === axisName) {
                result = valueAxes[axInd].getOptions();
                result.priority = valueAxes[axInd].priority;
                break
            }
        }
    }
    return result
}

function findAxis(paneName, axisName, axes) {
    var axis;
    var i;
    for (i = 0; i < axes.length; i++) {
        axis = axes[i];
        if (axis.name === axisName && axis.pane === paneName) {
            return axis
        }
    }
    if (paneName) {
        return findAxis(void 0, axisName, axes)
    }
}

function compareAxes(a, b) {
    return a.priority - b.priority
}

function doesPaneExist(panes, paneName) {
    var found = false;
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(panes, (function(_, pane) {
        if (pane.name === paneName) {
            found = true;
            return false
        }
    }));
    return found
}

function accumulate(field, src1, src2, auxSpacing) {
    var val1 = src1[field] || 0;
    var val2 = src2[field] || 0;
    return val1 + val2 + (val1 && val2 ? auxSpacing : 0)
}

function pickMax(field, src1, src2) {
    return pickMaxValue(src1[field], src2[field])
}

function pickMaxValue(val1, val2) {
    return Math.max(val1 || 0, val2 || 0)
}

function getAxisMargins(axis) {
    return axis.getMargins()
}

function getHorizontalAxesMargins(axes, getMarginsFunc) {
    return axes.reduce((function(margins, axis) {
        var _axis$getOrthogonalAx;
        var axisMargins = getMarginsFunc(axis);
        var paneMargins = margins.panes[axis.pane] = margins.panes[axis.pane] || {};
        var spacing = axis.getMultipleAxesSpacing();
        paneMargins.top = accumulate("top", paneMargins, axisMargins, spacing);
        paneMargins.bottom = accumulate("bottom", paneMargins, axisMargins, spacing);
        paneMargins.left = pickMax("left", paneMargins, axisMargins);
        paneMargins.right = pickMax("right", paneMargins, axisMargins);
        margins.top = pickMax("top", paneMargins, margins);
        margins.bottom = pickMax("bottom", paneMargins, margins);
        margins.left = pickMax("left", paneMargins, margins);
        margins.right = pickMax("right", paneMargins, margins);
        var orthogonalAxis = null === (_axis$getOrthogonalAx = axis.getOrthogonalAxis) || void 0 === _axis$getOrthogonalAx ? void 0 : _axis$getOrthogonalAx.call(axis);
        if (orthogonalAxis && orthogonalAxis.customPositionIsAvailable() && (!axis.customPositionIsBoundaryOrthogonalAxis() || !orthogonalAxis.customPositionEqualsToPredefined())) {
            margins[orthogonalAxis.getResolvedBoundaryPosition()] = 0
        }
        return margins
    }), {
        panes: {}
    })
}

function getVerticalAxesMargins(axes) {
    return axes.reduce((function(margins, axis) {
        var axisMargins = axis.getMargins();
        var paneMargins = margins.panes[axis.pane] = margins.panes[axis.pane] || {};
        var spacing = axis.getMultipleAxesSpacing();
        paneMargins.top = pickMax("top", paneMargins, axisMargins);
        paneMargins.bottom = pickMax("bottom", paneMargins, axisMargins);
        paneMargins.left = accumulate("left", paneMargins, axisMargins, spacing);
        paneMargins.right = accumulate("right", paneMargins, axisMargins, spacing);
        margins.top = pickMax("top", paneMargins, margins);
        margins.bottom = pickMax("bottom", paneMargins, margins);
        margins.left = pickMax("left", paneMargins, margins);
        margins.right = pickMax("right", paneMargins, margins);
        return margins
    }), {
        panes: {}
    })
}

function performActionOnAxes(axes, action, actionArgument1, actionArgument2, actionArgument3) {
    axes.forEach((function(axis) {
        axis[action](actionArgument1 && actionArgument1[axis.pane], actionArgument2 && actionArgument2[axis.pane] || actionArgument2, actionArgument3)
    }))
}

function shrinkCanvases(isRotated, canvases, sizes, verticalMargins, horizontalMargins) {
    function getMargin(side, margins, pane) {
        var m = -1 === (isRotated ? ["left", "right"] : ["top", "bottom"]).indexOf(side) ? margins : margins.panes[pane] || {};
        return m[side]
    }

    function getMaxMargin(side, margins1, margins2, pane) {
        return pickMaxValue(getMargin(side, margins1, pane), getMargin(side, margins2, pane))
    }
    var getOriginalField = field => "original".concat(field[0].toUpperCase()).concat(field.slice(1));

    function shrink(canvases, paneNames, sizeField, startMargin, endMargin, oppositeMargins) {
        paneNames = paneNames.sort((p1, p2) => canvases[p2][startMargin] - canvases[p1][startMargin]);
        paneNames.forEach(pane => {
            var canvas = canvases[pane];
            oppositeMargins.forEach(margin => {
                canvas[margin] = canvas[getOriginalField(margin)] + getMaxMargin(margin, verticalMargins, horizontalMargins, pane)
            })
        });
        var firstPane = canvases[paneNames[0]];
        var emptySpace = paneNames.reduce((space, paneName) => {
            space -= getMaxMargin(startMargin, verticalMargins, horizontalMargins, paneName) + getMaxMargin(endMargin, verticalMargins, horizontalMargins, paneName);
            return space
        }, firstPane[sizeField] - firstPane[getOriginalField(endMargin)] - canvases[paneNames[paneNames.length - 1]][getOriginalField(startMargin)]) - _core_utils__WEBPACK_IMPORTED_MODULE_8__["PANE_PADDING"] * (paneNames.length - 1);
        emptySpace -= Object.keys(sizes).reduce((prev, key) => prev + (!Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["isRelativeHeightPane"])(sizes[key]) ? sizes[key].height : 0), 0);
        paneNames.reduce((offset, pane) => {
            var canvas = canvases[pane];
            var paneSize = sizes[pane];
            offset -= getMaxMargin(endMargin, verticalMargins, horizontalMargins, pane);
            canvas[endMargin] = firstPane[sizeField] - offset;
            offset -= !Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["isRelativeHeightPane"])(paneSize) ? paneSize.height : Math.floor(emptySpace * paneSize.height);
            canvas[startMargin] = offset;
            offset -= getMaxMargin(startMargin, verticalMargins, horizontalMargins, pane) + _core_utils__WEBPACK_IMPORTED_MODULE_8__["PANE_PADDING"];
            return offset
        }, firstPane[sizeField] - firstPane[getOriginalField(endMargin)] - (emptySpace < 0 ? emptySpace : 0))
    }
    var paneNames = Object.keys(canvases);
    if (!isRotated) {
        shrink(canvases, paneNames, "height", "top", "bottom", ["left", "right"])
    } else {
        shrink(canvases, paneNames, "width", "left", "right", ["top", "bottom"])
    }
    return canvases
}

function drawAxesWithTicks(axes, condition, canvases, panesBorderOptions) {
    if (condition) {
        performActionOnAxes(axes, "createTicks", canvases);
        _chart_components_multi_axes_synchronizer__WEBPACK_IMPORTED_MODULE_12__["default"].synchronize(axes)
    }
    performActionOnAxes(axes, "draw", !condition && canvases, panesBorderOptions)
}

function shiftAxis(side1, side2) {
    var shifts = {};
    return function(axis) {
        if (!axis.customPositionIsAvailable() || axis.customPositionEqualsToPredefined()) {
            var shift = shifts[axis.pane] = shifts[axis.pane] || {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            };
            var spacing = axis.getMultipleAxesSpacing();
            var margins = axis.getMargins();
            axis.shift(shift);
            shift[side1] = accumulate(side1, shift, margins, spacing);
            shift[side2] = accumulate(side2, shift, margins, spacing)
        } else {
            axis.shift({
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            })
        }
    }
}

function getCommonSize(side, margins) {
    var size = 0;
    var pane;
    var paneMargins;
    for (pane in margins.panes) {
        paneMargins = margins.panes[pane];
        size += "height" === side ? paneMargins.top + paneMargins.bottom : paneMargins.left + paneMargins.right
    }
    return size
}

function checkUsedSpace(sizeShortage, side, axes, getMarginFunc) {
    var size = 0;
    if (sizeShortage[side] > 0) {
        size = getCommonSize(side, getMarginFunc(axes, getAxisMargins));
        performActionOnAxes(axes, "hideTitle");
        sizeShortage[side] -= size - getCommonSize(side, getMarginFunc(axes, getAxisMargins))
    }
    if (sizeShortage[side] > 0) {
        performActionOnAxes(axes, "hideOuterElements")
    }
}

function axisAnimationEnabled(drawOptions, pointsToAnimation) {
    var pointsCount = pointsToAnimation.reduce((sum, count) => sum + count, 0) / pointsToAnimation.length;
    return drawOptions.animate && pointsCount <= drawOptions.animationPointsLimit
}

function collectMarkersInfoBySeries(allSeries, filteredSeries, argAxis) {
    var series = [];
    var overloadedSeries = {};
    var argVisualRange = argAxis.visualRange();
    var argTranslator = argAxis.getTranslator();
    var argViewPortFilter = _series_helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_16__["default"].getViewPortFilter(argVisualRange || {});
    filteredSeries.forEach(s => {
        var valAxis = s.getValueAxis();
        var valVisualRange = valAxis.getCanvasRange();
        var valTranslator = valAxis.getTranslator();
        var seriesIndex = allSeries.indexOf(s);
        var valViewPortFilter = _series_helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_16__["default"].getViewPortFilter(valVisualRange || {});
        overloadedSeries[seriesIndex] = {};
        filteredSeries.forEach(sr => overloadedSeries[seriesIndex][allSeries.indexOf(sr)] = 0);
        var seriesPoints = [];
        s.getPoints().filter(p => p.getOptions().visible && argViewPortFilter(p.argument) && (valViewPortFilter(p.getMinValue(true)) || valViewPortFilter(p.getMaxValue(true)))).forEach(p => {
            var tp = {
                seriesIndex: seriesIndex,
                argument: p.argument,
                value: p.getMaxValue(true),
                size: p.bubbleSize || p.getOptions().size
            };
            if (p.getMinValue(true) !== p.getMaxValue(true)) {
                var mp = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, tp);
                mp.value = p.getMinValue(true);
                mp.x = argTranslator.to(mp.argument, 1);
                mp.y = valTranslator.to(mp.value, 1);
                seriesPoints.push(mp)
            }
            tp.x = argTranslator.to(tp.argument, 1);
            tp.y = valTranslator.to(tp.value, 1);
            seriesPoints.push(tp)
        });
        overloadedSeries[seriesIndex].pointsCount = seriesPoints.length;
        overloadedSeries[seriesIndex].total = 0;
        overloadedSeries[seriesIndex].continuousSeries = 0;
        series.push({
            name: s.name,
            index: seriesIndex,
            points: seriesPoints
        })
    });
    return {
        series: series,
        overloadedSeries: overloadedSeries
    }
}

function applyAutoHidePointMarkers(allSeries, filteredSeries, overloadedSeries, argAxis) {
    var argAxisType = argAxis.getOptions().type;
    filteredSeries.forEach(s => {
        var seriesIndex = allSeries.indexOf(s);
        s.autoHidePointMarkers = false;
        var tickCount = argAxis.getTicksValues().majorTicksValues.length;
        if (s.autoHidePointMarkersEnabled() && (argAxisType === DISCRETE || overloadedSeries[seriesIndex].pointsCount > tickCount)) {
            for (var index in overloadedSeries[seriesIndex]) {
                var i = parseInt(index);
                if (isNaN(i) || overloadedSeries[seriesIndex].total / overloadedSeries[seriesIndex].continuousSeries < 3) {
                    continue
                }
                if (i === seriesIndex) {
                    if (2 * overloadedSeries[i][i] >= overloadedSeries[i].pointsCount) {
                        s.autoHidePointMarkers = true;
                        break
                    }
                } else if (overloadedSeries[seriesIndex].total >= overloadedSeries[seriesIndex].pointsCount) {
                    s.autoHidePointMarkers = true;
                    break
                }
            }
        }
    })
}

function fastHidingPointMarkersByArea(canvas, markersInfo, series) {
    var area = canvas.width * canvas.height;
    var seriesPoints = markersInfo.series;
    var _loop = function(i) {
        var currentSeries = series.filter(s => s.name === seriesPoints[i].name)[0];
        var points = seriesPoints[i].points;
        var pointSize = points.length ? points[0].size : 0;
        var pointsArea = pointSize * pointSize * points.length;
        if (currentSeries.autoHidePointMarkersEnabled() && pointsArea >= area / seriesPoints.length) {
            var index = seriesPoints[i].index;
            currentSeries.autoHidePointMarkers = true;
            seriesPoints.splice(i, 1);
            series.splice(series.indexOf(currentSeries), 1);
            delete markersInfo.overloadedSeries[index]
        }
    };
    for (var i = seriesPoints.length - 1; i >= 0; i--) {
        _loop(i)
    }
}

function updateMarkersInfo(points, overloadedSeries) {
    var isContinuousSeries = false;
    for (var i = 0; i < points.length - 1; i++) {
        var curPoint = points[i];
        var size = curPoint.size;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(curPoint.x) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(curPoint.y)) {
            for (var j = i + 1; j < points.length; j++) {
                var nextPoint = points[j];
                var next_x = null === nextPoint || void 0 === nextPoint ? void 0 : nextPoint.x;
                var next_y = null === nextPoint || void 0 === nextPoint ? void 0 : nextPoint.y;
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(next_x) || Math.abs(curPoint.x - next_x) >= size) {
                    isContinuousSeries &= j !== i + 1;
                    break
                } else {
                    var distance = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(next_x) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(next_y) && Math.sqrt(Math.pow(curPoint.x - next_x, 2) + Math.pow(curPoint.y - next_y, 2));
                    if (distance && distance < size) {
                        overloadedSeries[curPoint.seriesIndex][nextPoint.seriesIndex]++;
                        overloadedSeries[curPoint.seriesIndex].total++;
                        if (!isContinuousSeries) {
                            overloadedSeries[curPoint.seriesIndex].continuousSeries++;
                            isContinuousSeries = true
                        }
                    }
                }
            }
        }
    }
}
var dxChart = _chart_components_advanced_chart__WEBPACK_IMPORTED_MODULE_13__["AdvancedChart"].inherit({
    _themeSection: "chart",
    _fontFields: ["crosshair.label.font"],
    _initCore: function() {
        this.paneAxis = {};
        this.callBase()
    },
    _init() {
        this._containerInitialHeight = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["hasWindow"])() ? Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$element) : 0;
        this.callBase()
    },
    _correctAxes: function() {
        this._correctValueAxes(true)
    },
    _getExtraOptions: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _createPanes: function() {
        var panes = this.option("panes");
        var panesNameCounter = 0;
        var defaultPane;
        if (!panes || _isArray(panes) && !panes.length) {
            panes = DEFAULT_PANES
        }
        this.callBase();
        defaultPane = this.option("defaultPane");
        panes = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, [], _isArray(panes) ? panes : [panes]);
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(panes, (function(_, pane) {
            pane.name = !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(pane.name) ? DEFAULT_PANE_NAME + panesNameCounter++ : pane.name
        }));
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(defaultPane)) {
            if (!doesPaneExist(panes, defaultPane)) {
                this._incidentOccurred("W2101", [defaultPane]);
                defaultPane = panes[panes.length - 1].name
            }
        } else {
            defaultPane = panes[panes.length - 1].name
        }
        this.defaultPane = defaultPane;
        panes = this._isRotated() ? panes.reverse() : panes;
        return panes
    },
    _getAxisRenderingOptions: function() {
        return {
            axisType: "xyAxes",
            drawingType: "linear"
        }
    },
    _prepareAxisOptions: function(typeSelector, userOptions, rotated) {
        return {
            isHorizontal: "argumentAxis" === typeSelector !== rotated,
            containerColor: this._themeManager.getOptions("containerBackgroundColor")
        }
    },
    _checkPaneName: function(seriesTheme) {
        var paneList = Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["map"])(this.panes, (function(pane) {
            return pane.name
        }));
        seriesTheme.pane = seriesTheme.pane || this.defaultPane;
        return -1 !== Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_3__["inArray"])(seriesTheme.pane, paneList)
    },
    _initCustomPositioningAxes() {
        var that = this;
        var argumentAxis = that.getArgumentAxis();
        var valueAxisName = argumentAxis.getOptions().customPositionAxis;
        var valueAxis = that._valueAxes.filter(v => v.pane === argumentAxis.pane && (!valueAxisName || valueAxisName === v.name))[0];
        that._valueAxes.forEach(v => {
            if (argumentAxis !== v.getOrthogonalAxis()) {
                v.getOrthogonalAxis = () => argumentAxis;
                v.customPositionIsBoundaryOrthogonalAxis = () => argumentAxis.customPositionIsBoundary()
            }
        });
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(valueAxis) && valueAxis !== argumentAxis.getOrthogonalAxis()) {
            argumentAxis.getOrthogonalAxis = () => valueAxis;
            argumentAxis.customPositionIsBoundaryOrthogonalAxis = () => that._valueAxes.some(v => v.customPositionIsBoundary())
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(argumentAxis.getOrthogonalAxis()) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(valueAxis)) {
            argumentAxis.getOrthogonalAxis = _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"]
        }
    },
    _getAllAxes() {
        return this._argumentAxes.concat(this._valueAxes)
    },
    _resetAxesAnimation(isFirstDrawing, isHorizontal) {
        var axes = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(isHorizontal) ? isHorizontal ^ this._isRotated() ? this._argumentAxes : this._valueAxes : this._getAllAxes();
        axes.forEach(a => {
            a.resetApplyingAnimation(isFirstDrawing)
        })
    },
    _axesBoundaryPositioning() {
        var allAxes = this._getAllAxes();
        var boundaryStateChanged = false;
        allAxes.forEach(a => {
            if (!a.customPositionIsAvailable()) {
                return false
            }
            var prevBoundaryState = a.customPositionIsBoundary();
            a._customBoundaryPosition = a.getCustomBoundaryPosition();
            boundaryStateChanged |= prevBoundaryState !== a.customPositionIsBoundary()
        });
        return boundaryStateChanged
    },
    _getCrosshairMargins: function() {
        var crosshairOptions = this._getCrosshairOptions() || {};
        var crosshairEnabled = crosshairOptions.enabled;
        var margins = Object(_chart_components_crosshair__WEBPACK_IMPORTED_MODULE_15__["getMargins"])();
        var horizontalLabel = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, crosshairOptions.label, crosshairOptions.horizontalLine.label);
        var verticalLabel = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, crosshairOptions.label, crosshairOptions.verticalLine.label);
        return {
            x: crosshairEnabled && crosshairOptions.horizontalLine.visible && horizontalLabel.visible ? margins.x : 0,
            y: crosshairEnabled && crosshairOptions.verticalLine.visible && verticalLabel.visible ? margins.y : 0
        }
    },
    _getValueAxis: function(paneName, axisName) {
        var valueAxes = this._valueAxes;
        var valueAxisOptions = this.option("valueAxis") || {};
        var valueAxesOptions = _isArray(valueAxisOptions) ? valueAxisOptions : [valueAxisOptions];
        var rotated = this._isRotated();
        var crosshairMargins = this._getCrosshairMargins();
        var axisOptions;
        var axis;
        axisName = axisName || getFirstAxisNameForPane(valueAxes, paneName, this.defaultPane);
        axis = findAxis(paneName, axisName, valueAxes);
        if (!axis) {
            axisOptions = findAxisOptions(valueAxes, valueAxesOptions, axisName);
            if (!axisOptions) {
                this._incidentOccurred("W2102", [axisName]);
                axisOptions = {
                    name: axisName,
                    priority: valueAxes.length
                }
            }
            axis = this._createAxis(false, this._populateAxesOptions("valueAxis", axisOptions, {
                pane: paneName,
                name: axisName,
                optionPath: _isArray(valueAxisOptions) ? "valueAxis[".concat(axisOptions.priority, "]") : "valueAxis",
                crosshairMargin: rotated ? crosshairMargins.y : crosshairMargins.x
            }, rotated));
            axis.applyVisualRangeSetter(this._getVisualRangeSetter());
            valueAxes.push(axis)
        }
        axis.setPane(paneName);
        return axis
    },
    _correctValueAxes: function(needHideGrids) {
        var that = this;
        var synchronizeMultiAxes = that._themeManager.getOptions("synchronizeMultiAxes");
        var valueAxes = that._valueAxes;
        var paneWithAxis = {};
        that.series.forEach((function(series) {
            var axis = series.getValueAxis();
            paneWithAxis[axis.pane] = true
        }));
        that.panes.forEach((function(pane) {
            var paneName = pane.name;
            if (!paneWithAxis[paneName]) {
                that._getValueAxis(paneName)
            }
            if (needHideGrids && synchronizeMultiAxes) {
                hideGridsOnNonFirstValueAxisForPane(valueAxes.filter((function(axis) {
                    return axis.pane === paneName
                })))
            }
        }));
        that._valueAxes = valueAxes.filter((function(axis) {
            if (!axis.pane) {
                axis.setPane(that.defaultPane)
            }
            var paneExists = doesPaneExist(that.panes, axis.pane);
            if (!paneExists) {
                axis.dispose();
                axis = null
            }
            return paneExists
        })).sort(compareAxes);
        var defaultAxis = this.getValueAxis();
        that._valueAxes.forEach(axis => {
            var optionPath = axis.getOptions().optionPath;
            if (optionPath) {
                var axesWithSamePath = that._valueAxes.filter(a => a.getOptions().optionPath === optionPath);
                if (axesWithSamePath.length > 1) {
                    if (axesWithSamePath.some(a => a === defaultAxis)) {
                        axesWithSamePath.forEach(a => {
                            if (a !== defaultAxis) {
                                a.getOptions().optionPath = null
                            }
                        })
                    } else {
                        axesWithSamePath.forEach((a, i) => {
                            if (0 !== i) {
                                a.getOptions().optionPath = null
                            }
                        })
                    }
                }
            }
        })
    },
    _getSeriesForPane: function(paneName) {
        var paneSeries = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(this.series, (function(_, oneSeries) {
            if (oneSeries.pane === paneName) {
                paneSeries.push(oneSeries)
            }
        }));
        return paneSeries
    },
    _createPanesBorderOptions: function() {
        var commonBorderOptions = this._themeManager.getOptions("commonPaneSettings").border;
        var panesBorderOptions = {};
        this.panes.forEach(pane => panesBorderOptions[pane.name] = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, commonBorderOptions, pane.border));
        return panesBorderOptions
    },
    _createScrollBar: function() {
        var scrollBarOptions = this._themeManager.getOptions("scrollBar") || {};
        var scrollBarGroup = this._scrollBarGroup;
        if (scrollBarOptions.visible) {
            scrollBarOptions.rotated = this._isRotated();
            this._scrollBar = (this._scrollBar || new _chart_components_scroll_bar__WEBPACK_IMPORTED_MODULE_14__["ScrollBar"](this._renderer, scrollBarGroup)).update(scrollBarOptions)
        } else {
            scrollBarGroup.linkRemove();
            this._scrollBar && this._scrollBar.dispose();
            this._scrollBar = null
        }
    },
    _executeAppendAfterSeries(append) {
        append()
    },
    _prepareToRender(drawOptions) {
        var panesBorderOptions = this._createPanesBorderOptions();
        this._createPanesBackground();
        this._appendAxesGroups();
        this._adjustViewport();
        return panesBorderOptions
    },
    _adjustViewport() {
        var adjustOnZoom = this._themeManager.getOptions("adjustOnZoom");
        if (!adjustOnZoom) {
            return
        }
        this._valueAxes.forEach(axis => axis.adjust())
    },
    _recreateSizeDependentObjects(isCanvasChanged) {
        var that = this;
        var series = that._getVisibleSeries();
        var useAggregation = series.some(s => s.useAggregation());
        var zoomChanged = that._isZooming();
        if (!useAggregation) {
            return
        }
        that._argumentAxes.forEach((function(axis) {
            axis.updateCanvas(that._canvas, true)
        }));
        series.forEach((function(series) {
            if (series.useAggregation() && (isCanvasChanged || zoomChanged || !series._useAllAggregatedPoints)) {
                series.createPoints()
            }
        }));
        that._processSeriesFamilies()
    },
    _isZooming() {
        var argumentAxis = this.getArgumentAxis();
        if (!argumentAxis || !argumentAxis.getTranslator()) {
            return false
        }
        var businessRange = argumentAxis.getTranslator().getBusinessRange();
        var zoomRange = argumentAxis.getViewport();
        var min = zoomRange ? zoomRange.min : 0;
        var max = zoomRange ? zoomRange.max : 0;
        if ("logarithmic" === businessRange.axisType) {
            min = Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["getLog"])(min, businessRange.base);
            max = Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["getLog"])(max, businessRange.base)
        }
        var viewportDistance = businessRange.axisType === DISCRETE ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["getCategoriesInfo"])(businessRange.categories, min, max).categories.length : Math.abs(max - min);
        var precision = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["getPrecision"])(viewportDistance);
        precision = precision > 1 ? Math.pow(10, precision - 2) : 1;
        var zoomChanged = Math.round((this._zoomLength - viewportDistance) * precision) / precision !== 0;
        this._zoomLength = viewportDistance;
        return zoomChanged
    },
    _handleSeriesDataUpdated: function() {
        var that = this;
        var viewport = new _translators_range__WEBPACK_IMPORTED_MODULE_18__["Range"];
        that.series.forEach((function(s) {
            viewport.addRange(s.getArgumentRange())
        }));
        that._argumentAxes.forEach((function(axis) {
            axis.updateCanvas(that._canvas, true);
            axis.setBusinessRange(viewport, that._axesReinitialized)
        }));
        that.callBase()
    },
    _isLegendInside: function() {
        return this._legend && "inside" === this._legend.getPosition()
    },
    _isRotated: function() {
        return this._themeManager.getOptions("rotated")
    },
    _getLayoutTargets: function() {
        return this.panes
    },
    _applyClipRects: function(panesBorderOptions) {
        this._drawPanesBorders(panesBorderOptions);
        this._createClipRectsForPanes();
        this._applyClipRectsForAxes();
        this._fillPanesBackground()
    },
    _updateLegendPosition: function(drawOptions, legendHasInsidePosition) {
        if (drawOptions.drawLegend && this._legend && legendHasInsidePosition) {
            var panes = this.panes;
            var newCanvas = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, panes[0].canvas);
            var layoutManager = new _chart_components_layout_manager__WEBPACK_IMPORTED_MODULE_17__["LayoutManager"];
            newCanvas.right = panes[panes.length - 1].canvas.right;
            newCanvas.bottom = panes[panes.length - 1].canvas.bottom;
            layoutManager.layoutInsideLegend(this._legend, newCanvas)
        }
    },
    _allowLegendInsidePosition: () => true,
    _applyExtraSettings: function(series) {
        var paneIndex = this._getPaneIndex(series.pane);
        var panesClipRects = this._panesClipRects;
        var wideClipRect = panesClipRects.wide[paneIndex];
        series.setClippingParams(panesClipRects.base[paneIndex].id, wideClipRect && wideClipRect.id, this._getPaneBorderVisibility(paneIndex))
    },
    _updatePanesCanvases: function(drawOptions) {
        if (!drawOptions.recreateCanvas) {
            return
        }
        Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["updatePanesCanvases"])(this.panes, this._canvas, this._isRotated())
    },
    _normalizePanesHeight: function() {
        Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["normalizePanesHeight"])(this.panes)
    },
    _renderScaleBreaks: function() {
        this._valueAxes.concat(this._argumentAxes).forEach((function(axis) {
            axis.drawScaleBreaks()
        }))
    },
    _getArgFilter() {
        return _series_helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_16__["default"].getViewPortFilter(this.getArgumentAxis().visualRange() || {})
    },
    _applyPointMarkersAutoHiding() {
        var that = this;
        var allSeries = that.series;
        if (!that._themeManager.getOptions("autoHidePointMarkers")) {
            allSeries.forEach(s => s.autoHidePointMarkers = false);
            return
        }
        that.panes.forEach(_ref => {
            var {
                borderCoords: borderCoords,
                name: name
            } = _ref;
            var series = allSeries.filter(s => s.pane === name && s.usePointsToDefineAutoHiding());
            var argAxis = that.getArgumentAxis();
            var markersInfo = collectMarkersInfoBySeries(allSeries, series, argAxis);
            fastHidingPointMarkersByArea(borderCoords, markersInfo, series);
            if (markersInfo.series.length) {
                var argVisualRange = argAxis.visualRange();
                var argAxisIsDiscrete = argAxis.getOptions().type === DISCRETE;
                var sortingCallback = argAxisIsDiscrete ? (p1, p2) => argVisualRange.categories.indexOf(p1.argument) - argVisualRange.categories.indexOf(p2.argument) : (p1, p2) => p1.argument - p2.argument;
                var points = [];
                markersInfo.series.forEach(s => points = points.concat(s.points));
                points.sort(sortingCallback);
                updateMarkersInfo(points, markersInfo.overloadedSeries);
                applyAutoHidePointMarkers(allSeries, series, markersInfo.overloadedSeries, argAxis)
            }
        })
    },
    _renderAxes: function(drawOptions, panesBorderOptions) {
        function calculateTitlesWidth(axes) {
            return axes.map(axis => {
                if (!axis.getTitle) {
                    return 0
                }
                var title = axis.getTitle();
                return title ? title.bBox.width : 0
            })
        }
        var that = this;
        var rotated = that._isRotated();
        var synchronizeMultiAxes = that._themeManager.getOptions("synchronizeMultiAxes");
        var scrollBar = that._scrollBar ? [that._scrollBar] : [];
        var extendedArgAxes = that._isArgumentAxisBeforeScrollBar() ? that._argumentAxes.concat(scrollBar) : scrollBar.concat(that._argumentAxes);
        var verticalAxes = rotated ? that._argumentAxes : that._valueAxes;
        var verticalElements = rotated ? extendedArgAxes : that._valueAxes;
        var horizontalAxes = rotated ? that._valueAxes : that._argumentAxes;
        var horizontalElements = rotated ? that._valueAxes : extendedArgAxes;
        var allAxes = verticalAxes.concat(horizontalAxes);
        var allElements = allAxes.concat(scrollBar);
        var verticalAxesFirstDrawing = verticalAxes.some(v => v.isFirstDrawing());
        that._normalizePanesHeight();
        that._updatePanesCanvases(drawOptions);
        var panesCanvases = that.panes.reduce((function(canvases, pane) {
            canvases[pane.name] = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, pane.canvas);
            return canvases
        }), {});
        var paneSizes = that.panes.reduce((sizes, pane) => {
            sizes[pane.name] = {
                height: pane.height,
                unit: pane.unit
            };
            return sizes
        }, {});
        var cleanPanesCanvases = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, panesCanvases);
        that._initCustomPositioningAxes();
        var needCustomAdjustAxes = that._axesBoundaryPositioning();
        if (!drawOptions.adjustAxes && !needCustomAdjustAxes) {
            drawAxesWithTicks(verticalAxes, !rotated && synchronizeMultiAxes, panesCanvases, panesBorderOptions);
            drawAxesWithTicks(horizontalAxes, rotated && synchronizeMultiAxes, panesCanvases, panesBorderOptions);
            performActionOnAxes(allAxes, "prepareAnimation");
            that._renderScaleBreaks();
            horizontalAxes.forEach(a => a.resolveOverlappingForCustomPositioning(verticalAxes));
            verticalAxes.forEach(a => a.resolveOverlappingForCustomPositioning(horizontalAxes));
            return false
        }
        if (needCustomAdjustAxes) {
            allAxes.forEach(a => a.customPositionIsAvailable() && a.shift({
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }))
        }
        if (that._scrollBar) {
            that._scrollBar.setPane(that.panes)
        }
        var vAxesMargins = {
            panes: {}
        };
        var hAxesMargins = getHorizontalAxesMargins(horizontalElements, axis => axis.estimateMargins(panesCanvases[axis.pane]));
        panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, vAxesMargins, hAxesMargins);
        var drawAxesAndSetCanvases = isHorizontal => {
            var axes = isHorizontal ? horizontalAxes : verticalAxes;
            var condition = (isHorizontal ? rotated : !rotated) && synchronizeMultiAxes;
            drawAxesWithTicks(axes, condition, panesCanvases, panesBorderOptions);
            if (isHorizontal) {
                hAxesMargins = getHorizontalAxesMargins(horizontalElements, getAxisMargins)
            } else {
                vAxesMargins = getVerticalAxesMargins(verticalElements)
            }
            panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, vAxesMargins, hAxesMargins)
        };
        drawAxesAndSetCanvases(false);
        drawAxesAndSetCanvases(true);
        if (!that._changesApplying && that._estimateTickIntervals(verticalAxes, panesCanvases)) {
            drawAxesAndSetCanvases(false)
        }
        var oldTitlesWidth = calculateTitlesWidth(verticalAxes);
        var visibleSeries = that._getVisibleSeries();
        var pointsToAnimation = that._getPointsToAnimation(visibleSeries);
        var axesIsAnimated = axisAnimationEnabled(drawOptions, pointsToAnimation);
        performActionOnAxes(allElements, "updateSize", panesCanvases, axesIsAnimated);
        horizontalElements.forEach(shiftAxis("top", "bottom"));
        verticalElements.forEach(shiftAxis("left", "right"));
        that._renderScaleBreaks();
        that.panes.forEach((function(pane) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(pane.canvas, panesCanvases[pane.name])
        }));
        that._valueAxes.forEach(axis => {
            axis.setInitRange()
        });
        verticalAxes.forEach((axis, i) => {
            var _axis$hasWrap;
            if (null !== (_axis$hasWrap = axis.hasWrap) && void 0 !== _axis$hasWrap && _axis$hasWrap.call(axis)) {
                var title = axis.getTitle();
                var newTitleWidth = title ? title.bBox.width : 0;
                var offset = newTitleWidth - oldTitlesWidth[i];
                if ("right" === axis.getOptions().position) {
                    vAxesMargins.right += offset
                } else {
                    vAxesMargins.left += offset;
                    that.panes.forEach(_ref2 => {
                        var {
                            name: name
                        } = _ref2;
                        return vAxesMargins.panes[name].left += offset
                    })
                }
                panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, vAxesMargins, hAxesMargins);
                performActionOnAxes(allElements, "updateSize", panesCanvases, false, false);
                oldTitlesWidth = calculateTitlesWidth(verticalAxes)
            }
        });
        if (verticalAxes.some(v => v.customPositionIsAvailable() && v.getCustomPosition() !== v._axisPosition)) {
            axesIsAnimated && that._resetAxesAnimation(verticalAxesFirstDrawing, false);
            performActionOnAxes(verticalAxes, "updateSize", panesCanvases, axesIsAnimated)
        }
        horizontalAxes.forEach(a => a.resolveOverlappingForCustomPositioning(verticalAxes));
        verticalAxes.forEach(a => a.resolveOverlappingForCustomPositioning(horizontalAxes));
        return cleanPanesCanvases
    },
    _getExtraTemplatesItems() {
        var allAxes = (this._argumentAxes || []).concat(this._valueAxes || []);
        var elements = this._collectTemplatesFromItems(allAxes);
        return {
            items: elements.items,
            groups: elements.groups,
            launchRequest() {
                allAxes.forEach((function(a) {
                    a.setRenderedState(true)
                }))
            },
            doneRequest() {
                allAxes.forEach((function(a) {
                    a.setRenderedState(false)
                }))
            }
        }
    },
    _estimateTickIntervals: (axes, canvases) => axes.some(axis => axis.estimateTickInterval(canvases[axis.pane])),
    checkForMoreSpaceForPanesCanvas() {
        var rotated = this._isRotated();
        var panesAreCustomSized = this.panes.filter(p => p.unit).length === this.panes.length;
        var needSpace = false;
        if (panesAreCustomSized) {
            var needHorizontalSpace = 0;
            var needVerticalSpace = 0;
            if (rotated) {
                var argAxisRightMargin = this.getArgumentAxis().getMargins().right;
                var rightPanesIndent = Math.min.apply(Math, this.panes.map(p => p.canvas.right));
                needHorizontalSpace = this._canvas.right + argAxisRightMargin - rightPanesIndent
            } else {
                var argAxisBottomMargin = this.getArgumentAxis().getMargins().bottom;
                var bottomPanesIndent = Math.min.apply(Math, this.panes.map(p => p.canvas.bottom));
                needVerticalSpace = this._canvas.bottom + argAxisBottomMargin - bottomPanesIndent
            }
            needSpace = needHorizontalSpace > 0 || needVerticalSpace > 0 ? {
                width: needHorizontalSpace,
                height: needVerticalSpace
            } : false;
            if (0 !== needVerticalSpace) {
                var realSize = this.getSize();
                var customSize = this.option("size");
                var container = this._$element[0];
                var containerHasStyledHeight = !!parseInt(container.style.height) || 0 !== this._containerInitialHeight;
                if (!rotated && !(customSize && customSize.height) && !containerHasStyledHeight) {
                    this._forceResize(realSize.width, realSize.height + needVerticalSpace);
                    needSpace = false
                }
            }
        } else {
            needSpace = this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), rotated, pane => ({
                width: rotated && !!pane.unit,
                height: !rotated && !!pane.unit
            }))
        }
        return needSpace
    },
    _forceResize(width, height) {
        this._renderer.resize(width, height);
        this._updateSize();
        this._setContentSize();
        this._preserveOriginalCanvas();
        this._updateCanvasClipRect(this._canvas)
    },
    _shrinkAxes(sizeShortage, panesCanvases) {
        if (!sizeShortage || !panesCanvases) {
            return
        }
        this._renderer.stopAllAnimations(true);
        var rotated = this._isRotated();
        var scrollBar = this._scrollBar ? [this._scrollBar] : [];
        var extendedArgAxes = this._isArgumentAxisBeforeScrollBar() ? this._argumentAxes.concat(scrollBar) : scrollBar.concat(this._argumentAxes);
        var verticalAxes = rotated ? extendedArgAxes : this._valueAxes;
        var horizontalAxes = rotated ? this._valueAxes : extendedArgAxes;
        var allAxes = verticalAxes.concat(horizontalAxes);
        if (sizeShortage.width || sizeShortage.height) {
            checkUsedSpace(sizeShortage, "height", horizontalAxes, getHorizontalAxesMargins);
            checkUsedSpace(sizeShortage, "width", verticalAxes, getVerticalAxesMargins);
            performActionOnAxes(allAxes, "updateSize", panesCanvases);
            var paneSizes = this.panes.reduce((sizes, pane) => {
                sizes[pane.name] = {
                    height: pane.height,
                    unit: pane.unit
                };
                return sizes
            }, {});
            panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, getVerticalAxesMargins(verticalAxes), getHorizontalAxesMargins(horizontalAxes, getAxisMargins));
            performActionOnAxes(allAxes, "updateSize", panesCanvases);
            horizontalAxes.forEach(shiftAxis("top", "bottom"));
            verticalAxes.forEach(shiftAxis("left", "right"));
            this.panes.forEach(pane => Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(pane.canvas, panesCanvases[pane.name]))
        }
    },
    _isArgumentAxisBeforeScrollBar() {
        var argumentAxis = this.getArgumentAxis();
        if (this._scrollBar) {
            var _argumentAxis$getOpti;
            var argAxisPosition = argumentAxis.getResolvedBoundaryPosition();
            var argAxisLabelPosition = null === (_argumentAxis$getOpti = argumentAxis.getOptions().label) || void 0 === _argumentAxis$getOpti ? void 0 : _argumentAxis$getOpti.position;
            var scrollBarPosition = this._scrollBar.getOptions().position;
            return argumentAxis.hasNonBoundaryPosition() || scrollBarPosition === argAxisPosition && argAxisLabelPosition !== scrollBarPosition
        }
        return false
    },
    _getPanesParameters: function() {
        var panes = this.panes;
        var i;
        var params = [];
        for (i = 0; i < panes.length; i++) {
            if (this._getPaneBorderVisibility(i)) {
                params.push({
                    coords: panes[i].borderCoords,
                    clipRect: this._panesClipRects.fixed[i]
                })
            }
        }
        return params
    },
    _createCrosshairCursor: function() {
        var options = this._themeManager.getOptions("crosshair") || {};
        var argumentAxis = this.getArgumentAxis();
        var axes = !this._isRotated() ? [
            [argumentAxis], this._valueAxes
        ] : [this._valueAxes, [argumentAxis]];
        var parameters = {
            canvas: this._getCommonCanvas(),
            panes: this._getPanesParameters(),
            axes: axes
        };
        if (!options || !options.enabled) {
            return
        }
        if (!this._crosshair) {
            this._crosshair = new _chart_components_crosshair__WEBPACK_IMPORTED_MODULE_15__["Crosshair"](this._renderer, options, parameters, this._crosshairCursorGroup)
        } else {
            this._crosshair.update(options, parameters)
        }
        this._crosshair.render()
    },
    _getCommonCanvas: function() {
        var i;
        var canvas;
        var commonCanvas;
        var panes = this.panes;
        for (i = 0; i < panes.length; i++) {
            canvas = panes[i].canvas;
            if (!commonCanvas) {
                commonCanvas = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, canvas)
            } else {
                commonCanvas.right = canvas.right;
                commonCanvas.bottom = canvas.bottom
            }
        }
        return commonCanvas
    },
    _createPanesBackground: function() {
        var defaultBackgroundColor = this._themeManager.getOptions("commonPaneSettings").backgroundColor;
        var backgroundColor;
        var renderer = this._renderer;
        var rect;
        var i;
        var rects = [];
        this._panesBackgroundGroup.clear();
        for (i = 0; i < this.panes.length; i++) {
            backgroundColor = this.panes[i].backgroundColor || defaultBackgroundColor;
            if (!backgroundColor || "none" === backgroundColor) {
                rects.push(null);
                continue
            }
            rect = renderer.rect(0, 0, 0, 0).attr({
                fill: backgroundColor,
                "stroke-width": 0
            }).append(this._panesBackgroundGroup);
            rects.push(rect)
        }
        this.panesBackground = rects
    },
    _fillPanesBackground: function() {
        var that = this;
        var bc;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(that.panes, (function(i, pane) {
            bc = pane.borderCoords;
            if (null !== that.panesBackground[i]) {
                that.panesBackground[i].attr({
                    x: bc.left,
                    y: bc.top,
                    width: bc.width,
                    height: bc.height
                })
            }
        }))
    },
    _calcPaneBorderCoords: function(pane) {
        var canvas = pane.canvas;
        var bc = pane.borderCoords = pane.borderCoords || {};
        bc.left = canvas.left;
        bc.top = canvas.top;
        bc.right = canvas.width - canvas.right;
        bc.bottom = canvas.height - canvas.bottom;
        bc.width = Math.max(bc.right - bc.left, 0);
        bc.height = Math.max(bc.bottom - bc.top, 0)
    },
    _drawPanesBorders: function(panesBorderOptions) {
        var that = this;
        var rotated = that._isRotated();
        that._panesBorderGroup.linkRemove().clear();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(that.panes, (function(i, pane) {
            var borderOptions = panesBorderOptions[pane.name];
            var attr = {
                fill: "none",
                stroke: borderOptions.color,
                "stroke-opacity": borderOptions.opacity,
                "stroke-width": borderOptions.width,
                dashStyle: borderOptions.dashStyle,
                "stroke-linecap": "square"
            };
            that._calcPaneBorderCoords(pane, rotated);
            if (!borderOptions.visible) {
                return
            }
            var bc = pane.borderCoords;
            var segmentRectParams = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["prepareSegmentRectPoints"])(bc.left, bc.top, bc.width, bc.height, borderOptions);
            that._renderer.path(segmentRectParams.points, segmentRectParams.pathType).attr(attr).append(that._panesBorderGroup)
        }));
        that._panesBorderGroup.linkAppend()
    },
    _createClipRect: function(clipArray, index, left, top, width, height) {
        var clipRect = clipArray[index];
        if (!clipRect) {
            clipRect = this._renderer.clipRect(left, top, width, height);
            clipArray[index] = clipRect
        } else {
            clipRect.attr({
                x: left,
                y: top,
                width: width,
                height: height
            })
        }
    },
    _createClipRectsForPanes: function() {
        var that = this;
        var canvas = that._canvas;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(that.panes, (function(i, pane) {
            var needWideClipRect = false;
            var bc = pane.borderCoords;
            var left = bc.left;
            var top = bc.top;
            var width = bc.width;
            var height = bc.height;
            var panesClipRects = that._panesClipRects;
            that._createClipRect(panesClipRects.fixed, i, left, top, width, height);
            that._createClipRect(panesClipRects.base, i, left, top, width, height);
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(that.series, (function(_, series) {
                if (series.pane === pane.name && (series.isFinancialSeries() || series.areErrorBarsVisible())) {
                    needWideClipRect = true
                }
            }));
            if (needWideClipRect) {
                if (that._isRotated()) {
                    top = 0;
                    height = canvas.height
                } else {
                    left = 0;
                    width = canvas.width
                }
                that._createClipRect(panesClipRects.wide, i, left, top, width, height)
            } else {
                panesClipRects.wide[i] = null
            }
        }))
    },
    _applyClipRectsForAxes() {
        var axes = this._getAllAxes();
        var chartCanvasClipRectID = this._getCanvasClipRectID();
        for (var i = 0; i < axes.length; i++) {
            var elementsClipRectID = this._getElementsClipRectID(axes[i].pane);
            axes[i].applyClipRects(elementsClipRectID, chartCanvasClipRectID)
        }
    },
    _getPaneBorderVisibility: function(paneIndex) {
        var commonPaneBorderVisible = this._themeManager.getOptions("commonPaneSettings").border.visible;
        var pane = this.panes[paneIndex] || {};
        var paneBorder = pane.border || {};
        return "visible" in paneBorder ? paneBorder.visible : commonPaneBorderVisible
    },
    _getCanvasForPane: function(paneName) {
        var panes = this.panes;
        var panesNumber = panes.length;
        var i;
        for (i = 0; i < panesNumber; i++) {
            if (panes[i].name === paneName) {
                return panes[i].canvas
            }
        }
    },
    _getTrackerSettings: function() {
        var themeManager = this._themeManager;
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(this.callBase(), {
            chart: this,
            rotated: this._isRotated(),
            crosshair: this._getCrosshairOptions().enabled ? this._crosshair : null,
            stickyHovering: themeManager.getOptions("stickyHovering")
        })
    },
    _resolveLabelOverlappingStack: function() {
        var that = this;
        var isRotated = that._isRotated();
        var shiftDirection = isRotated ? function(box, length) {
            return {
                x: box.x - length,
                y: box.y
            }
        } : function(box, length) {
            return {
                x: box.x,
                y: box.y - length
            }
        };
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(that._getStackPoints(), (function(_, stacks) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(stacks, (function(_, points) {
                var isInverted = points[0].series.getValueAxis().getOptions().inverted;
                _chart_components_base_chart__WEBPACK_IMPORTED_MODULE_11__["overlapping"].resolveLabelOverlappingInOneDirection(points, that._getCommonCanvas(), isRotated, isInverted, shiftDirection, (a, b) => {
                    var coordPosition = isRotated ? 1 : 0;
                    var figureCenter1 = a.labels[0].getFigureCenter()[coordPosition];
                    var figureCenter12 = b.labels[0].getFigureCenter()[coordPosition];
                    if (figureCenter1 - figureCenter12 === 0) {
                        return (a.value() - b.value()) * (a.labels[0].getPoint().series.getValueAxis().getTranslator().isInverted() ? -1 : 1)
                    }
                    return 0
                })
            }))
        }))
    },
    _getStackPoints: function() {
        var stackPoints = {};
        var visibleSeries = this._getVisibleSeries();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(visibleSeries, (function(_, singleSeries) {
            var points = singleSeries.getPoints();
            var stackName = singleSeries.getStackName() || null;
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(points, (function(_, point) {
                var argument = point.argument;
                if (!stackPoints[argument]) {
                    stackPoints[argument] = {}
                }
                if (!stackPoints[argument][stackName]) {
                    stackPoints[argument][stackName] = []
                }
                stackPoints[argument][stackName].push(point)
            }))
        }));
        return stackPoints
    },
    _getCrosshairOptions: function() {
        return this._getOption("crosshair")
    },
    zoomArgument(min, max) {
        if (!this._initialized || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(min) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(max)) {
            return
        }
        this.getArgumentAxis().visualRange([min, max])
    },
    resetVisualRange() {
        var that = this;
        var axes = that._argumentAxes;
        var nonVirtualArgumentAxis = that.getArgumentAxis();
        axes.forEach(axis => {
            axis.resetVisualRange(nonVirtualArgumentAxis !== axis);
            that._applyCustomVisualRangeOption(axis)
        });
        that.callBase()
    },
    getVisibleArgumentBounds: function() {
        var translator = this._argumentAxes[0].getTranslator();
        var range = translator.getBusinessRange();
        var isDiscrete = range.axisType === DISCRETE;
        var categories = range.categories;
        return {
            minVisible: isDiscrete ? range.minVisible || categories[0] : range.minVisible,
            maxVisible: isDiscrete ? range.maxVisible || categories[categories.length - 1] : range.maxVisible
        }
    },
    _change_FULL_RENDER() {
        this.callBase();
        if (this._changes.has(VISUAL_RANGE)) {
            this._raiseZoomEndHandlers()
        }
    },
    _getAxesForScaling() {
        return [this.getArgumentAxis()].concat(this._valueAxes)
    },
    _applyVisualRangeByVirtualAxes(axis, range) {
        if (axis.isArgumentAxis) {
            if (axis !== this.getArgumentAxis()) {
                return true
            }
            this._argumentAxes.filter(a => a !== axis).forEach(a => a.visualRange(range, {
                start: true,
                end: true
            }))
        }
        return false
    },
    _raiseZoomEndHandlers() {
        this._argumentAxes.forEach(axis => axis.handleZoomEnd());
        this.callBase()
    },
    _setOptionsByReference() {
        this.callBase();
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(this._optionsByReference, {
            "argumentAxis.visualRange": true
        })
    },
    option() {
        var option = this.callBase.apply(this, arguments);
        var valueAxis = this._options.silent("valueAxis");
        if ("array" === Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["type"])(valueAxis)) {
            for (var i = 0; i < valueAxis.length; i++) {
                var optionPath = "valueAxis[".concat(i, "].visualRange");
                this._optionsByReference[optionPath] = true
            }
        }
        return option
    },
    _notifyVisualRange() {
        var argAxis = this._argumentAxes[0];
        var argumentVisualRange = Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["convertVisualRangeObject"])(argAxis.visualRange(), !_isArray(this.option("argumentAxis.visualRange")));
        if (!argAxis.skipEventRising || !Object(_core_utils__WEBPACK_IMPORTED_MODULE_8__["rangesAreEqual"])(argumentVisualRange, this.option("argumentAxis.visualRange"))) {
            this.option("argumentAxis.visualRange", argumentVisualRange)
        } else {
            argAxis.skipEventRising = null
        }
        this.callBase()
    }
});



dxChart.addPlugin(_chart_components_shutter_zoom__WEBPACK_IMPORTED_MODULE_19__["default"]);
dxChart.addPlugin(_chart_components_zoom_and_pan__WEBPACK_IMPORTED_MODULE_20__["default"]);
dxChart.addPlugin(_core_annotations__WEBPACK_IMPORTED_MODULE_21__["plugins"].core);
dxChart.addPlugin(_core_annotations__WEBPACK_IMPORTED_MODULE_21__["plugins"].chart);
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_6__["default"])("dxChart", dxChart);
/* harmony default export */ __webpack_exports__["default"] = (dxChart);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/advanced_chart.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/advanced_chart.js ***!
  \****************************************************************************/
/*! exports provided: AdvancedChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedChart", function() { return AdvancedChart; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _translators_range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../translators/range */ "./node_modules/devextreme/esm/viz/translators/range.js");
/* harmony import */ var _axes_base_axis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../axes/base_axis */ "./node_modules/devextreme/esm/viz/axes/base_axis.js");
/* harmony import */ var _core_series_family__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/series_family */ "./node_modules/devextreme/esm/viz/core/series_family.js");
/* harmony import */ var _base_chart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base_chart */ "./node_modules/devextreme/esm/viz/chart_components/base_chart.js");
/* harmony import */ var _series_helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../series/helpers/range_data_calculator */ "./node_modules/devextreme/esm/viz/series/helpers/range_data_calculator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/chart_components/advanced_chart.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */












var _isArray = Array.isArray;
var DEFAULT_AXIS_NAME = "defaultAxisName";
var FONT = "font";
var COMMON_AXIS_SETTINGS = "commonAxisSettings";
var DEFAULT_PANE_NAME = "default";
var VISUAL_RANGE = "VISUAL_RANGE";

function prepareAxis(axisOptions) {
    return _isArray(axisOptions) ? 0 === axisOptions.length ? [{}] : axisOptions : [axisOptions]
}

function processBubbleMargin(opt, bubbleSize) {
    if (opt.processBubbleSize) {
        opt.size = bubbleSize
    }
    return opt
}

function estimateBubbleSize(size, panesCount, maxSize, rotated) {
    var width = rotated ? size.width / panesCount : size.width;
    var height = rotated ? size.height : size.height / panesCount;
    return Math.min(width, height) * maxSize
}

function setAxisVisualRangeByOption(arg, axis, isDirectOption, index) {
    var options;
    var visualRange;
    if (isDirectOption) {
        visualRange = arg.value;
        options = {
            skipEventRising: true
        };
        var wrappedVisualRange = wrapVisualRange(arg.fullName, visualRange);
        if (wrappedVisualRange) {
            options = {
                allowPartialUpdate: true
            };
            visualRange = wrappedVisualRange
        }
    } else {
        visualRange = (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(index) ? arg.value[index] : arg.value).visualRange
    }
    axis.visualRange(visualRange, options)
}

function getAxisTypes(groupsData, axis, isArgumentAxes) {
    if (isArgumentAxes) {
        return {
            argumentAxisType: groupsData.argumentAxisType,
            argumentType: groupsData.argumentType
        }
    }
    var {
        valueAxisType: valueAxisType,
        valueType: valueType
    } = groupsData.groups.filter(g => g.valueAxis === axis)[0];
    return {
        valueAxisType: valueAxisType,
        valueType: valueType
    }
}

function wrapVisualRange(fullName, value) {
    var pathElements = fullName.split(".");
    var destElem = pathElements[pathElements.length - 1];
    if ("endValue" === destElem || "startValue" === destElem) {
        return {
            [destElem]: value
        }
    }
}
var AdvancedChart = _base_chart__WEBPACK_IMPORTED_MODULE_7__["BaseChart"].inherit({
    _fontFields: [COMMON_AXIS_SETTINGS + ".label." + FONT, COMMON_AXIS_SETTINGS + ".title." + FONT],
    _partialOptionChangesMap: {
        visualRange: VISUAL_RANGE,
        _customVisualRange: VISUAL_RANGE,
        strips: "REFRESH_AXES",
        constantLines: "REFRESH_AXES"
    },
    _partialOptionChangesPath: {
        argumentAxis: ["strips", "constantLines", "visualRange", "_customVisualRange"],
        valueAxis: ["strips", "constantLines", "visualRange", "_customVisualRange"]
    },
    _initCore() {
        this._panesClipRects = {};
        this.callBase()
    },
    _disposeCore() {
        var disposeObjectsInArray = this._disposeObjectsInArray;
        var panesClipRects = this._panesClipRects;
        this.callBase();
        disposeObjectsInArray.call(panesClipRects, "fixed");
        disposeObjectsInArray.call(panesClipRects, "base");
        disposeObjectsInArray.call(panesClipRects, "wide");
        this._panesClipRects = null;
        this._labelsAxesGroup.linkOff();
        this._labelsAxesGroup.dispose();
        this._labelsAxesGroup = null
    },
    _dispose: function() {
        var disposeObjectsInArray = this._disposeObjectsInArray;
        this.callBase();
        this.panes = null;
        if (this._legend) {
            this._legend.dispose();
            this._legend = null
        }
        disposeObjectsInArray.call(this, "panesBackground");
        disposeObjectsInArray.call(this, "seriesFamilies");
        this._disposeAxes()
    },
    _createPanes: function() {
        this._cleanPanesClipRects("fixed");
        this._cleanPanesClipRects("base");
        this._cleanPanesClipRects("wide")
    },
    _cleanPanesClipRects(clipArrayName) {
        var clipArray = this._panesClipRects[clipArrayName];
        (clipArray || []).forEach(clipRect => clipRect && clipRect.dispose());
        this._panesClipRects[clipArrayName] = []
    },
    _getElementsClipRectID(paneName) {
        var clipShape = this._panesClipRects.fixed[this._getPaneIndex(paneName)];
        return clipShape && clipShape.id
    },
    _getPaneIndex(paneName) {
        var paneIndex;
        var name = paneName || DEFAULT_PANE_NAME;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.panes, (index, pane) => {
            if (pane.name === name) {
                paneIndex = index;
                return false
            }
        });
        return paneIndex
    },
    _updateSize() {
        this.callBase();
        Object(_core_utils__WEBPACK_IMPORTED_MODULE_11__["setCanvasValues"])(this._canvas)
    },
    _reinitAxes: function() {
        this.panes = this._createPanes();
        this._populateAxes();
        this._axesReinitialized = true
    },
    _populateAxes() {
        var that = this;
        var panes = that.panes;
        var rotated = that._isRotated();
        var argumentAxesOptions = prepareAxis(that.option("argumentAxis") || {})[0];
        var valueAxisOption = that.option("valueAxis");
        var valueAxesOptions = prepareAxis(valueAxisOption || {});
        var argumentAxesPopulatedOptions;
        var valueAxesPopulatedOptions = [];
        var axisNames = [];
        var valueAxesCounter = 0;
        var paneWithNonVirtualAxis;
        var crosshairMargins = that._getCrosshairMargins();
        if (rotated) {
            paneWithNonVirtualAxis = "right" === argumentAxesOptions.position ? panes[panes.length - 1].name : panes[0].name
        } else {
            paneWithNonVirtualAxis = "top" === argumentAxesOptions.position ? panes[0].name : panes[panes.length - 1].name
        }
        argumentAxesPopulatedOptions = Object(_core_utils__WEBPACK_IMPORTED_MODULE_11__["map"])(panes, pane => {
            var virtual = pane.name !== paneWithNonVirtualAxis;
            return that._populateAxesOptions("argumentAxis", argumentAxesOptions, {
                pane: pane.name,
                name: null,
                optionPath: "argumentAxis",
                crosshairMargin: rotated ? crosshairMargins.x : crosshairMargins.y
            }, rotated, virtual)
        });
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(valueAxesOptions, (priority, axisOptions) => {
            var _axisOptions$panes;
            var axisPanes = [];
            var name = axisOptions.name;
            if (name && -1 !== Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(name, axisNames)) {
                that._incidentOccurred("E2102");
                return
            }
            name && axisNames.push(name);
            if (axisOptions.pane) {
                axisPanes.push(axisOptions.pane)
            }
            if (null !== (_axisOptions$panes = axisOptions.panes) && void 0 !== _axisOptions$panes && _axisOptions$panes.length) {
                axisPanes = axisPanes.concat(axisOptions.panes.slice(0))
            }
            axisPanes = Object(_core_utils__WEBPACK_IMPORTED_MODULE_11__["unique"])(axisPanes);
            if (!axisPanes.length) {
                axisPanes.push(void 0)
            }
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(axisPanes, (_, pane) => {
                var optionPath = _isArray(valueAxisOption) ? "valueAxis[".concat(priority, "]") : "valueAxis";
                valueAxesPopulatedOptions.push(that._populateAxesOptions("valueAxis", axisOptions, {
                    name: name || DEFAULT_AXIS_NAME + valueAxesCounter++,
                    pane: pane,
                    priority: priority,
                    optionPath: optionPath,
                    crosshairMargin: rotated ? crosshairMargins.y : crosshairMargins.x
                }, rotated))
            })
        });
        that._redesignAxes(argumentAxesPopulatedOptions, true, paneWithNonVirtualAxis);
        that._redesignAxes(valueAxesPopulatedOptions, false)
    },
    _redesignAxes(options, isArgumentAxes, paneWithNonVirtualAxis) {
        var that = this;
        var axesBasis = [];
        var axes = isArgumentAxes ? that._argumentAxes : that._valueAxes;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(options, (_, opt) => {
            var curAxes = axes && axes.filter(a => a.name === opt.name && (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(opt.pane) && that.panes.some(p => p.name === a.pane) || a.pane === opt.pane));
            if (curAxes && curAxes.length > 0) {
                Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(curAxes, (_, axis) => {
                    var axisTypes = getAxisTypes(that._groupsData, axis, isArgumentAxes);
                    axis.updateOptions(opt);
                    if (isArgumentAxes) {
                        axis.setTypes(axisTypes.argumentAxisType, axisTypes.argumentType, "argumentType")
                    } else {
                        axis.setTypes(axisTypes.valueAxisType, axisTypes.valueType, "valueType")
                    }
                    axis.validate();
                    axesBasis.push({
                        axis: axis
                    })
                })
            } else {
                axesBasis.push({
                    options: opt
                })
            }
        });
        if (axes) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["reverseEach"])(axes, (index, axis) => {
                if (!axesBasis.some(basis => basis.axis && basis.axis === axis)) {
                    that._disposeAxis(index, isArgumentAxes)
                }
            })
        } else if (isArgumentAxes) {
            axes = that._argumentAxes = []
        } else {
            axes = that._valueAxes = []
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(axesBasis, (_, basis) => {
            var axis = basis.axis;
            if (basis.axis && isArgumentAxes) {
                basis.axis.isVirtual = basis.axis.pane !== paneWithNonVirtualAxis
            } else if (basis.options) {
                axis = that._createAxis(isArgumentAxes, basis.options, isArgumentAxes ? basis.options.pane !== paneWithNonVirtualAxis : void 0);
                axes.push(axis)
            }
            axis.applyVisualRangeSetter(that._getVisualRangeSetter())
        })
    },
    _disposeAxis(index, isArgumentAxis) {
        var axes = isArgumentAxis ? this._argumentAxes : this._valueAxes;
        var axis = axes[index];
        if (!axis) {
            return
        }
        axis.dispose();
        axes.splice(index, 1)
    },
    _disposeAxes: function() {
        var disposeObjectsInArray = this._disposeObjectsInArray;
        disposeObjectsInArray.call(this, "_argumentAxes");
        disposeObjectsInArray.call(this, "_valueAxes")
    },
    _appendAdditionalSeriesGroups: function() {
        this._crosshairCursorGroup.linkAppend();
        this._scrollBar && this._scrollBarGroup.linkAppend()
    },
    _getLegendTargets: function() {
        return (this.series || []).map(s => {
            var item = this._getLegendOptions(s);
            item.legendData.series = s;
            if (!s.getOptions().showInLegend) {
                item.legendData.visible = false
            }
            return item
        })
    },
    _legendItemTextField: "name",
    _seriesPopulatedHandlerCore: function() {
        this._processSeriesFamilies();
        this._processValueAxisFormat()
    },
    _renderTrackers: function() {
        var i;
        for (i = 0; i < this.series.length; ++i) {
            this.series[i].drawTrackers()
        }
    },
    _specialProcessSeries: function() {
        this._processSeriesFamilies()
    },
    _processSeriesFamilies: function() {
        var _that$seriesFamilies;
        var that = this;
        var types = [];
        var families = [];
        var paneSeries;
        var themeManager = that._themeManager;
        var negativesAsZeroes = themeManager.getOptions("negativesAsZeroes");
        var negativesAsZeros = themeManager.getOptions("negativesAsZeros");
        var familyOptions = {
            minBubbleSize: themeManager.getOptions("minBubbleSize"),
            maxBubbleSize: themeManager.getOptions("maxBubbleSize"),
            barGroupPadding: themeManager.getOptions("barGroupPadding"),
            barGroupWidth: themeManager.getOptions("barGroupWidth"),
            negativesAsZeroes: Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(negativesAsZeroes) ? negativesAsZeroes : negativesAsZeros
        };
        if (null !== (_that$seriesFamilies = that.seriesFamilies) && void 0 !== _that$seriesFamilies && _that$seriesFamilies.length) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(that.seriesFamilies, (function(_, family) {
                family.updateOptions(familyOptions);
                family.adjustSeriesValues()
            }));
            return
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(that.series, (function(_, item) {
            if (-1 === Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(item.type, types)) {
                types.push(item.type)
            }
        }));
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(that._getLayoutTargets(), (function(_, pane) {
            paneSeries = that._getSeriesForPane(pane.name);
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(types, (function(_, type) {
                var family = new _core_series_family__WEBPACK_IMPORTED_MODULE_6__["SeriesFamily"]({
                    type: type,
                    pane: pane.name,
                    minBubbleSize: familyOptions.minBubbleSize,
                    maxBubbleSize: familyOptions.maxBubbleSize,
                    barGroupPadding: familyOptions.barGroupPadding,
                    barGroupWidth: familyOptions.barGroupWidth,
                    negativesAsZeroes: familyOptions.negativesAsZeroes,
                    rotated: that._isRotated()
                });
                family.add(paneSeries);
                family.adjustSeriesValues();
                families.push(family)
            }))
        }));
        that.seriesFamilies = families
    },
    _updateSeriesDimensions: function() {
        var i;
        var seriesFamilies = this.seriesFamilies || [];
        for (i = 0; i < seriesFamilies.length; i++) {
            var family = seriesFamilies[i];
            family.updateSeriesValues();
            family.adjustSeriesDimensions()
        }
    },
    _getLegendCallBack: function(series) {
        return this._legend && this._legend.getActionCallback(series)
    },
    _appendAxesGroups: function() {
        this._stripsGroup.linkAppend();
        this._gridGroup.linkAppend();
        this._axesGroup.linkAppend();
        this._labelsAxesGroup.linkAppend();
        this._constantLinesGroup.linkAppend();
        this._stripLabelAxesGroup.linkAppend();
        this._scaleBreaksGroup.linkAppend()
    },
    _populateMarginOptions() {
        var that = this;
        var bubbleSize = estimateBubbleSize(that.getSize(), that.panes.length, that._themeManager.getOptions("maxBubbleSize"), that._isRotated());
        var argumentMarginOptions = {};
        that._valueAxes.forEach(valueAxis => {
            var groupSeries = that.series.filter((function(series) {
                return series.getValueAxis() === valueAxis
            }));
            var marginOptions = {};
            groupSeries.forEach(series => {
                if (series.isVisible()) {
                    var seriesMarginOptions = processBubbleMargin(series.getMarginOptions(), bubbleSize);
                    marginOptions = Object(_core_utils__WEBPACK_IMPORTED_MODULE_11__["mergeMarginOptions"])(marginOptions, seriesMarginOptions);
                    argumentMarginOptions = Object(_core_utils__WEBPACK_IMPORTED_MODULE_11__["mergeMarginOptions"])(argumentMarginOptions, seriesMarginOptions)
                }
            });
            valueAxis.setMarginOptions(marginOptions)
        });
        that._argumentAxes.forEach(a => a.setMarginOptions(argumentMarginOptions))
    },
    _populateBusinessRange(updatedAxis, keepRange) {
        var that = this;
        var rotated = that._isRotated();
        var series = that._getVisibleSeries();
        var argRanges = {};
        var commonArgRange = new _translators_range__WEBPACK_IMPORTED_MODULE_4__["Range"]({
            rotated: !!rotated
        });
        var getPaneName = axis => axis.pane || DEFAULT_PANE_NAME;
        that.panes.forEach(p => argRanges[p.name] = new _translators_range__WEBPACK_IMPORTED_MODULE_4__["Range"]({
            rotated: !!rotated
        }));
        that._valueAxes.forEach(valueAxis => {
            var groupRange = new _translators_range__WEBPACK_IMPORTED_MODULE_4__["Range"]({
                rotated: !!rotated,
                pane: valueAxis.pane,
                axis: valueAxis.name
            });
            var groupSeries = series.filter(series => series.getValueAxis() === valueAxis);
            groupSeries.forEach(series => {
                var seriesRange = series.getRangeData();
                groupRange.addRange(seriesRange.val);
                argRanges[getPaneName(valueAxis)].addRange(seriesRange.arg)
            });
            if (!updatedAxis || updatedAxis && groupSeries.length && valueAxis === updatedAxis) {
                valueAxis.setGroupSeries(groupSeries);
                valueAxis.setBusinessRange(groupRange, that._axesReinitialized || keepRange, that._argumentAxes[0]._lastVisualRangeUpdateMode)
            }
        });
        if (!updatedAxis || updatedAxis && series.length) {
            Object.keys(argRanges).forEach(p => commonArgRange.addRange(argRanges[p]));
            var commonInterval = commonArgRange.interval;
            that._argumentAxes.forEach(a => {
                var _argRanges$getPaneNam;
                var currentInterval = null !== (_argRanges$getPaneNam = argRanges[getPaneName(a)].interval) && void 0 !== _argRanges$getPaneNam ? _argRanges$getPaneNam : commonInterval;
                a.setBusinessRange(new _translators_range__WEBPACK_IMPORTED_MODULE_4__["Range"](Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonArgRange, {
                    interval: currentInterval
                })), that._axesReinitialized, void 0, that._groupsData.categories)
            })
        }
        that._populateMarginOptions()
    },
    getArgumentAxis: function() {
        return (this._argumentAxes || []).filter(a => !a.isVirtual)[0]
    },
    getValueAxis: function(name) {
        return (this._valueAxes || []).filter(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(name) ? a => a.name === name : a => a.pane === this.defaultPane)[0]
    },
    _getGroupsData: function() {
        var that = this;
        var groups = [];
        that._valueAxes.forEach((function(axis) {
            groups.push({
                series: that.series.filter((function(series) {
                    return series.getValueAxis() === axis
                })),
                valueAxis: axis,
                valueOptions: axis.getOptions()
            })
        }));
        return {
            groups: groups,
            argumentAxes: that._argumentAxes,
            argumentOptions: that._argumentAxes[0].getOptions()
        }
    },
    _groupSeries: function() {
        this._correctValueAxes(false);
        this._groupsData = this._getGroupsData()
    },
    _processValueAxisFormat: function() {
        var axesWithFullStackedFormat = [];
        this.series.forEach((function(series) {
            var axis = series.getValueAxis();
            if (series.isFullStackedSeries()) {
                axis.setPercentLabelFormat();
                axesWithFullStackedFormat.push(axis)
            }
        }));
        this._valueAxes.forEach((function(axis) {
            if (-1 === axesWithFullStackedFormat.indexOf(axis)) {
                axis.resetAutoLabelFormat()
            }
        }))
    },
    _populateAxesOptions(typeSelector, userOptions, axisOptions, rotated, virtual) {
        var preparedUserOptions = this._prepareStripsAndConstantLines(typeSelector, userOptions, rotated);
        var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, preparedUserOptions, axisOptions, this._prepareAxisOptions(typeSelector, preparedUserOptions, rotated));
        if (virtual) {
            options.visible = options.tick.visible = options.minorTick.visible = options.label.visible = false;
            options.title = {}
        }
        return options
    },
    _getValFilter: series => _series_helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_8__["default"].getViewPortFilter(series.getValueAxis().visualRange() || {}),
    _createAxis(isArgumentAxes, options, virtual) {
        var that = this;
        var typeSelector = isArgumentAxes ? "argumentAxis" : "valueAxis";
        var renderingSettings = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({
            renderer: that._renderer,
            incidentOccurred: that._incidentOccurred,
            eventTrigger: that._eventTrigger,
            axisClass: isArgumentAxes ? "arg" : "val",
            widgetClass: "dxc",
            stripsGroup: that._stripsGroup,
            stripLabelAxesGroup: that._stripLabelAxesGroup,
            constantLinesGroup: that._constantLinesGroup,
            scaleBreaksGroup: that._scaleBreaksGroup,
            axesContainerGroup: that._axesGroup,
            labelsAxesGroup: that._labelsAxesGroup,
            gridGroup: that._gridGroup,
            isArgumentAxis: isArgumentAxes,
            getTemplate: template => that._getTemplate(template)
        }, that._getAxisRenderingOptions(typeSelector));
        var axis = new _axes_base_axis__WEBPACK_IMPORTED_MODULE_5__["Axis"](renderingSettings);
        axis.updateOptions(options);
        axis.isVirtual = virtual;
        return axis
    },
    _applyVisualRangeByVirtualAxes: (axis, range) => false,
    _applyCustomVisualRangeOption(axis, range) {
        if (axis.getOptions().optionPath) {
            this._parseVisualRangeOption("".concat(axis.getOptions().optionPath, ".visualRange"), range)
        }
    },
    _getVisualRangeSetter() {
        var chart = this;
        return function(axis, _ref) {
            var {
                skipEventRising: skipEventRising,
                range: range
            } = _ref;
            chart._applyCustomVisualRangeOption(axis, range);
            axis.setCustomVisualRange(range);
            axis.skipEventRising = skipEventRising;
            if (!chart._applyVisualRangeByVirtualAxes(axis, range)) {
                if (chart._applyingChanges) {
                    chart._change_VISUAL_RANGE()
                } else {
                    chart._requestChange([VISUAL_RANGE])
                }
            }
        }
    },
    _getTrackerSettings: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(this.callBase(), {
            argumentAxis: this.getArgumentAxis()
        })
    },
    _prepareStripsAndConstantLines: function(typeSelector, userOptions, rotated) {
        userOptions = this._themeManager.getOptions(typeSelector, userOptions, rotated);
        if (userOptions.strips) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(userOptions.strips, (function(i) {
                userOptions.strips[i] = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, userOptions.stripStyle, userOptions.strips[i])
            }))
        }
        if (userOptions.constantLines) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(userOptions.constantLines, (function(i, line) {
                userOptions.constantLines[i] = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, userOptions.constantLineStyle, line)
            }))
        }
        return userOptions
    },
    refresh: function() {
        this._disposeAxes();
        this.callBase()
    },
    _layoutAxes(drawAxes) {
        drawAxes();
        var needSpace = this.checkForMoreSpaceForPanesCanvas();
        if (needSpace) {
            var rect = this._rect.slice();
            var size = this._layout.backward(rect, rect, [needSpace.width, needSpace.height]);
            needSpace.width = Math.max(0, size[0]);
            needSpace.height = Math.max(0, size[1]);
            this._canvas = this._createCanvasFromRect(rect);
            drawAxes(needSpace)
        }
    },
    checkForMoreSpaceForPanesCanvas() {
        return this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), this._isRotated())
    },
    _parseVisualRangeOption(fullName, value) {
        var that = this;
        var name = fullName.split(/[.[]/)[0];
        var index = fullName.match(/\d+/g);
        index = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(index) ? parseInt(index[0]) : index;
        if (fullName.indexOf("visualRange") > 0) {
            if ("object" !== Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["type"])(value)) {
                value = wrapVisualRange(fullName, value) || value
            }
            that._setCustomVisualRange(name, index, value)
        } else if (("object" === Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["type"])(value) || _isArray(value)) && name.indexOf("Axis") > 0 && JSON.stringify(value).indexOf("visualRange") > 0) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(value.visualRange)) {
                that._setCustomVisualRange(name, index, value.visualRange)
            } else if (_isArray(value)) {
                value.forEach((a, i) => Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(a.visualRange) && that._setCustomVisualRange(name, i, a.visualRange))
            }
        }
    },
    _setCustomVisualRange(axesName, index, value) {
        var options = this._options.silent(axesName);
        if (!options) {
            return
        }
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(index)) {
            options._customVisualRange = value
        } else {
            options[index]._customVisualRange = value
        }
        this._axesReinitialized = true
    },
    _raiseZoomEndHandlers() {
        this._valueAxes.forEach(axis => axis.handleZoomEnd())
    },
    _setOptionsByReference() {
        this.callBase();
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(this._optionsByReference, {
            "valueAxis.visualRange": true
        })
    },
    _notifyOptionChanged(option, value, previousValue) {
        this.callBase.apply(this, arguments);
        if (!this._optionChangedLocker) {
            this._parseVisualRangeOption(option, value)
        }
    },
    _notifyVisualRange() {
        var that = this;
        that._valueAxes.forEach(axis => {
            var axisPath = axis.getOptions().optionPath;
            if (axisPath) {
                var path = "".concat(axisPath, ".visualRange");
                var visualRange = Object(_core_utils__WEBPACK_IMPORTED_MODULE_11__["convertVisualRangeObject"])(axis.visualRange(), !_isArray(that.option(path)));
                if (!axis.skipEventRising || !Object(_core_utils__WEBPACK_IMPORTED_MODULE_11__["rangesAreEqual"])(visualRange, that.option(path))) {
                    if (!that.option(axisPath) && "valueAxis" !== axisPath) {
                        that.option(axisPath, {
                            name: axis.name,
                            visualRange: visualRange
                        })
                    } else {
                        that.option(path, visualRange)
                    }
                } else {
                    axis.skipEventRising = null
                }
            }
        })
    },
    _notify() {
        this.callBase();
        this._axesReinitialized = false;
        if (true !== this.option("disableTwoWayBinding")) {
            this.skipOptionsRollBack = true;
            this._notifyVisualRange();
            this.skipOptionsRollBack = false
        }
    },
    _getAxesForScaling() {
        return this._valueAxes
    },
    _getAxesByOptionPath(arg, isDirectOption, optionName) {
        var sourceAxes = this._getAxesForScaling();
        var axes = [];
        if (isDirectOption) {
            var axisPath;
            if (arg.fullName) {
                axisPath = arg.fullName.slice(0, arg.fullName.indexOf("."))
            }
            axes = sourceAxes.filter(a => a.getOptions().optionPath === axisPath)
        } else if ("object" === Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["type"])(arg.value)) {
            axes = sourceAxes.filter(a => a.getOptions().optionPath === arg.name)
        } else if (_isArray(arg.value)) {
            arg.value.forEach((v, index) => {
                var axis = sourceAxes.filter(a => a.getOptions().optionPath === "".concat(arg.name, "[").concat(index, "]"))[0];
                Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(v[optionName]) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(axis) && (axes[index] = axis)
            })
        }
        return axes
    },
    _optionChanged(arg) {
        if (!this._optionChangedLocker) {
            var axes;
            var isDirectOption = arg.fullName.indexOf("visualRange") > 0 ? true : this.getPartialChangeOptionsName(arg).indexOf("visualRange") > -1 ? false : void 0;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(isDirectOption)) {
                axes = this._getAxesByOptionPath(arg, isDirectOption, "visualRange");
                if (axes) {
                    if (axes.length > 1 || _isArray(arg.value)) {
                        axes.forEach((a, index) => setAxisVisualRangeByOption(arg, a, isDirectOption, index))
                    } else if (1 === axes.length) {
                        setAxisVisualRangeByOption(arg, axes[0], isDirectOption)
                    }
                }
            }
        }
        this.callBase(arg)
    },
    _change_VISUAL_RANGE: function() {
        this._recreateSizeDependentObjects(false);
        if (!this._changes.has("FULL_RENDER")) {
            var resizePanesOnZoom = this.option("resizePanesOnZoom");
            this._doRender({
                force: true,
                drawTitle: false,
                drawLegend: false,
                adjustAxes: null !== resizePanesOnZoom && void 0 !== resizePanesOnZoom ? resizePanesOnZoom : this.option("adjustAxesOnZoom") || false,
                animate: false
            });
            this._raiseZoomEndHandlers()
        }
    },
    resetVisualRange() {
        var that = this;
        that._valueAxes.forEach(axis => {
            axis.resetVisualRange(false);
            that._applyCustomVisualRangeOption(axis)
        });
        that._requestChange([VISUAL_RANGE])
    },
    _getCrosshairMargins: () => ({
        x: 0,
        y: 0
    }),
    _legendDataField: "series",
    _adjustSeriesLabels: _core_utils_common__WEBPACK_IMPORTED_MODULE_10__["noop"],
    _correctValueAxes: _core_utils_common__WEBPACK_IMPORTED_MODULE_10__["noop"]
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/crosshair.js":
/*!***********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/crosshair.js ***!
  \***********************************************************************/
/*! exports provided: getMargins, Crosshair */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMargins", function() { return getMargins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Crosshair", function() { return Crosshair; });
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/**
 * DevExtreme (esm/viz/chart_components/crosshair.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var math = Math;
var mathAbs = math.abs;
var mathMin = math.min;
var mathMax = math.max;
var mathFloor = math.floor;
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";
var LABEL_BACKGROUND_PADDING_X = 8;
var LABEL_BACKGROUND_PADDING_Y = 4;
var CENTER = "center";
var RIGHT = "right";
var LEFT = "left";
var TOP = "top";
var BOTTOM = "bottom";
function getMargins() {
    return {
        x: LABEL_BACKGROUND_PADDING_X,
        y: LABEL_BACKGROUND_PADDING_Y
    }
}

function getRectangleBBox(bBox) {
    return {
        x: bBox.x - LABEL_BACKGROUND_PADDING_X,
        y: bBox.y - LABEL_BACKGROUND_PADDING_Y,
        width: bBox.width + 2 * LABEL_BACKGROUND_PADDING_X,
        height: bBox.height + 2 * LABEL_BACKGROUND_PADDING_Y
    }
}

function getLabelCheckerPosition(x, y, isHorizontal, canvas) {
    var params = isHorizontal ? ["x", "width", "y", "height", y, 0] : ["y", "height", "x", "width", x, 1];
    return function(bBox, position, coord) {
        var labelCoord = {
            x: coord.x,
            y: coord.y
        };
        var rectangleBBox = getRectangleBBox(bBox);
        var delta = isHorizontal ? coord.y - bBox.y - bBox.height / 2 : coord.y - bBox.y;
        labelCoord.y = isHorizontal || !isHorizontal && position === BOTTOM ? coord.y + delta : coord.y;
        if (rectangleBBox[params[0]] < 0) {
            labelCoord[params[0]] -= rectangleBBox[params[0]]
        } else if (rectangleBBox[params[0]] + rectangleBBox[params[1]] + delta * params[5] > canvas[params[1]]) {
            labelCoord[params[0]] -= rectangleBBox[params[0]] + rectangleBBox[params[1]] + delta * params[5] - canvas[params[1]]
        }
        if (params[4] - rectangleBBox[params[3]] / 2 < 0) {
            labelCoord[params[2]] -= params[4] - rectangleBBox[params[3]] / 2
        } else if (params[4] + rectangleBBox[params[3]] / 2 > canvas[params[3]]) {
            labelCoord[params[2]] -= params[4] + rectangleBBox[params[3]] / 2 - canvas[params[3]]
        }
        return labelCoord
    }
}
function Crosshair(renderer, options, params, group) {
    this._renderer = renderer;
    this._crosshairGroup = group;
    this._options = {};
    this.update(options, params)
}
Crosshair.prototype = {
    constructor: Crosshair,
    update: function(options, params) {
        var canvas = params.canvas;
        this._canvas = {
            top: canvas.top,
            bottom: canvas.height - canvas.bottom,
            left: canvas.left,
            right: canvas.width - canvas.right,
            width: canvas.width,
            height: canvas.height
        };
        this._axes = params.axes;
        this._panes = params.panes;
        this._prepareOptions(options, HORIZONTAL);
        this._prepareOptions(options, VERTICAL)
    },
    dispose: function() {
        this._renderer = this._crosshairGroup = this._options = this._axes = this._canvas = this._horizontalGroup = this._verticalGroup = this._horizontal = this._vertical = this._circle = this._panes = null
    },
    _prepareOptions: function(options, direction) {
        var lineOptions = options[direction + "Line"];
        this._options[direction] = {
            visible: lineOptions.visible,
            line: {
                stroke: lineOptions.color || options.color,
                "stroke-width": lineOptions.width || options.width,
                dashStyle: lineOptions.dashStyle || options.dashStyle,
                opacity: lineOptions.opacity || options.opacity,
                "stroke-linecap": "butt"
            },
            label: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, options.label, lineOptions.label)
        }
    },
    _createLines: function(options, sharpParam, group) {
        var lines = [];
        var canvas = this._canvas;
        var points = [canvas.left, canvas.top, canvas.left, canvas.top];
        for (var i = 0; i < 2; i++) {
            lines.push(this._renderer.path(points, "line").attr(options).sharp(sharpParam).append(group))
        }
        return lines
    },
    render: function() {
        var renderer = this._renderer;
        var options = this._options;
        var verticalOptions = options.vertical;
        var horizontalOptions = options.horizontal;
        var extraOptions = horizontalOptions.visible ? horizontalOptions.line : verticalOptions.line;
        var circleOptions = {
            stroke: extraOptions.stroke,
            "stroke-width": extraOptions["stroke-width"],
            dashStyle: extraOptions.dashStyle,
            opacity: extraOptions.opacity
        };
        var canvas = this._canvas;
        this._horizontal = {};
        this._vertical = {};
        this._circle = renderer.circle(canvas.left, canvas.top, 0).attr(circleOptions).append(this._crosshairGroup);
        this._horizontalGroup = renderer.g().append(this._crosshairGroup);
        this._verticalGroup = renderer.g().append(this._crosshairGroup);
        if (verticalOptions.visible) {
            this._vertical.lines = this._createLines(verticalOptions.line, "h", this._verticalGroup);
            this._vertical.labels = this._createLabels(this._axes[0], verticalOptions, false, this._verticalGroup)
        }
        if (horizontalOptions.visible) {
            this._horizontal.lines = this._createLines(horizontalOptions.line, "v", this._horizontalGroup);
            this._horizontal.labels = this._createLabels(this._axes[1], horizontalOptions, true, this._horizontalGroup)
        }
        this.hide()
    },
    _createLabels: function(axes, options, isHorizontal, group) {
        var canvas = this._canvas;
        var renderer = this._renderer;
        var x;
        var y;
        var text;
        var labels = [];
        var background;
        var currentLabelPos;
        var labelOptions = options.label;
        if (labelOptions.visible) {
            axes.forEach((function(axis) {
                var position = axis.getOptions().position;
                if (axis.getTranslator().getBusinessRange().isEmpty()) {
                    return
                }
                currentLabelPos = axis.getLabelsPosition();
                if (isHorizontal) {
                    y = canvas.top;
                    x = currentLabelPos
                } else {
                    x = canvas.left;
                    y = currentLabelPos
                }
                var align = position === TOP || position === BOTTOM ? CENTER : position === RIGHT ? LEFT : RIGHT;
                background = renderer.rect(0, 0, 0, 0).attr({
                    fill: labelOptions.backgroundColor || options.line.stroke
                }).append(group);
                text = renderer.text("0", 0, 0).css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["patchFontOptions"])(options.label.font)).attr({
                    align: align,
                    class: labelOptions.cssClass
                }).append(group);
                labels.push({
                    text: text,
                    background: background,
                    axis: axis,
                    options: labelOptions,
                    pos: {
                        coord: currentLabelPos,
                        side: position
                    },
                    startXY: {
                        x: x,
                        y: y
                    }
                })
            }))
        }
        return labels
    },
    _updateText: function(value, axisName, labels, point, func) {
        var that = this;
        labels.forEach((function(label) {
            var axis = label.axis;
            var coord = label.startXY;
            var textElement = label.text;
            var backgroundElement = label.background;
            var text = "";
            if (!axis.name || axis.name === axisName) {
                text = axis.getFormattedValue(value, label.options, point)
            }
            if (text) {
                textElement.attr({
                    text: text,
                    x: coord.x,
                    y: coord.y
                });
                textElement.attr(func(textElement.getBBox(), label.pos.side, coord));
                that._updateLinesCanvas(label);
                backgroundElement.attr(getRectangleBBox(textElement.getBBox()))
            } else {
                textElement.attr({
                    text: ""
                });
                backgroundElement.attr({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                })
            }
        }))
    },
    hide: function() {
        this._crosshairGroup.attr({
            visibility: "hidden"
        })
    },
    _updateLinesCanvas: function(label) {
        var position = label.pos.side;
        var labelCoord = label.pos.coord;
        var coords = this._linesCanvas;
        var canvas = this._canvas;
        coords[position] = coords[position] !== canvas[position] && mathAbs(coords[position] - canvas[position]) < mathAbs(labelCoord - canvas[position]) ? coords[position] : labelCoord
    },
    _updateLines: function(lines, x, y, r, isHorizontal) {
        var coords = this._linesCanvas;
        var canvas = this._canvas;
        var points = isHorizontal ? [
            [mathMin(x - r, coords.left), canvas.top, x - r, canvas.top],
            [x + r, canvas.top, mathMax(coords.right, x + r), canvas.top]
        ] : [
            [canvas.left, mathMin(coords.top, y - r), canvas.left, y - r],
            [canvas.left, y + r, canvas.left, mathMax(coords.bottom, y + r)]
        ];
        for (var i = 0; i < 2; i++) {
            lines[i].attr({
                points: points[i]
            }).sharp(isHorizontal ? "v" : "h", isHorizontal ? y === canvas.bottom ? -1 : 1 : x === canvas.right ? -1 : 1)
        }
    },
    _resetLinesCanvas: function() {
        var canvas = this._canvas;
        this._linesCanvas = {
            left: canvas.left,
            right: canvas.right,
            top: canvas.top,
            bottom: canvas.bottom
        }
    },
    _getClipRectForPane: function(x, y) {
        var panes = this._panes;
        var i;
        var coords;
        for (i = 0; i < panes.length; i++) {
            coords = panes[i].coords;
            if (coords.left <= x && coords.right >= x && coords.top <= y && coords.bottom >= y) {
                return panes[i].clipRect
            }
        }
        return {
            id: null
        }
    },
    show: function(data) {
        var point = data.point;
        var pointData = point.getCrosshairData(data.x, data.y);
        var r = point.getPointRadius();
        var horizontal = this._horizontal;
        var vertical = this._vertical;
        var rad = !r ? 0 : r + 3;
        var canvas = this._canvas;
        var x = mathFloor(pointData.x);
        var y = mathFloor(pointData.y);
        if (x >= canvas.left && x <= canvas.right && y >= canvas.top && y <= canvas.bottom) {
            this._crosshairGroup.attr({
                visibility: "visible"
            });
            this._resetLinesCanvas();
            this._circle.attr({
                cx: x,
                cy: y,
                r: rad,
                "clip-path": this._getClipRectForPane(x, y).id
            });
            if (horizontal.lines) {
                this._updateText(pointData.yValue, pointData.axis, horizontal.labels, point, getLabelCheckerPosition(x, y, true, canvas));
                this._updateLines(horizontal.lines, x, y, rad, true);
                this._horizontalGroup.attr({
                    translateY: y - canvas.top
                })
            }
            if (vertical.lines) {
                this._updateText(pointData.xValue, pointData.axis, vertical.labels, point, getLabelCheckerPosition(x, y, false, canvas));
                this._updateLines(vertical.lines, x, y, rad, false);
                this._verticalGroup.attr({
                    translateX: x - canvas.left
                })
            }
        } else {
            this.hide()
        }
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/multi_axes_synchronizer.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/multi_axes_synchronizer.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/console */ "./node_modules/devextreme/esm/core/utils/console.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/**
 * DevExtreme (esm/viz/chart_components/multi_axes_synchronizer.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var _math = Math;
var _floor = _math.floor;
var _max = _math.max;
var _abs = _math.abs;

function getValueAxesPerPanes(valueAxes) {
    var result = {};
    valueAxes.forEach(axis => {
        var pane = axis.pane;
        if (!result[pane]) {
            result[pane] = []
        }
        result[pane].push(axis)
    });
    return result
}
var linearConverter = br => ({
    transform: function(v, b) {
        return Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(Object(_core_utils__WEBPACK_IMPORTED_MODULE_3__["getLogExt"])(v, b, br.allowNegatives, br.linearThreshold))
    },
    getTicks: function(interval, tickValues, base) {
        var ticks = [];
        var tick = this.transform(tickValues[0], base);
        while (ticks.length < tickValues.length) {
            ticks.push(tick);
            tick = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(tick + interval)
        }
        return ticks
    }
});
var logConverter = br => ({
    transform: function(v, b) {
        return Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(Object(_core_utils__WEBPACK_IMPORTED_MODULE_3__["raiseToExt"])(v, b, br.allowNegatives, br.linearThreshold))
    },
    getTicks: function(interval, tickValues, base) {
        var ticks = [];
        var tick;
        for (var i = 0; i < tickValues.length; i += 1) {
            tick = this.transform(tickValues[i], base);
            ticks.push(tick)
        }
        return ticks
    }
});

function convertAxisInfo(axisInfo, converter) {
    if (!axisInfo.isLogarithmic) {
        return
    }
    var base = axisInfo.logarithmicBase;
    var tickValues = axisInfo.tickValues;
    axisInfo.minValue = converter.transform(axisInfo.minValue, base);
    axisInfo.oldMinValue = converter.transform(axisInfo.oldMinValue, base);
    axisInfo.maxValue = converter.transform(axisInfo.maxValue, base);
    axisInfo.oldMaxValue = converter.transform(axisInfo.oldMaxValue, base);
    axisInfo.tickInterval = _math.round(axisInfo.tickInterval);
    if (axisInfo.tickInterval < 1) {
        axisInfo.tickInterval = 1
    }
    var ticks = converter.getTicks(axisInfo.tickInterval, tickValues, base);
    ticks.tickInterval = axisInfo.tickInterval;
    axisInfo.tickValues = ticks
}

function populateAxesInfo(axes) {
    return axes.reduce((function(result, axis) {
        var ticksValues = axis.getTicksValues();
        var majorTicks = ticksValues.majorTicksValues;
        var options = axis.getOptions();
        var businessRange = axis.getTranslator().getBusinessRange();
        var visibleArea = axis.getVisibleArea();
        var axisInfo;
        var tickInterval = axis._tickInterval;
        var synchronizedValue = options.synchronizedValue;
        var action = axis.getViewport().action;
        if (majorTicks && majorTicks.length > 0 && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(majorTicks[0]) && "discrete" !== options.type && !businessRange.isEmpty() && !(businessRange.breaks && businessRange.breaks.length) && "zoom" !== action && "pan" !== action) {
            axis.applyMargins();
            var startValue = axis.getTranslator().from(visibleArea[0]);
            var endValue = axis.getTranslator().from(visibleArea[1]);
            var minValue = startValue < endValue ? startValue : endValue;
            var maxValue = startValue < endValue ? endValue : startValue;
            if (minValue === maxValue && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(synchronizedValue)) {
                tickInterval = _abs(majorTicks[0] - synchronizedValue) || 1;
                minValue = majorTicks[0] - tickInterval;
                maxValue = majorTicks[0] + tickInterval
            }
            axisInfo = {
                axis: axis,
                isLogarithmic: "logarithmic" === options.type,
                logarithmicBase: businessRange.base,
                tickValues: majorTicks,
                minorValues: ticksValues.minorTicksValues,
                minorTickInterval: axis._minorTickInterval,
                minValue: minValue,
                oldMinValue: minValue,
                maxValue: maxValue,
                oldMaxValue: maxValue,
                inverted: businessRange.invert,
                tickInterval: tickInterval,
                synchronizedValue: synchronizedValue
            };
            convertAxisInfo(axisInfo, linearConverter(axis.getTranslator().getBusinessRange()));
            result.push(axisInfo)
        }
        return result
    }), [])
}

function updateTickValues(axesInfo) {
    var maxTicksCount = axesInfo.reduce((max, axisInfo) => _max(max, axisInfo.tickValues.length), 0);
    axesInfo.forEach(axisInfo => {
        var ticksMultiplier;
        var ticksCount;
        var additionalStartTicksCount = 0;
        var synchronizedValue = axisInfo.synchronizedValue;
        var tickValues = axisInfo.tickValues;
        var tickInterval = axisInfo.tickInterval;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(synchronizedValue)) {
            axisInfo.baseTickValue = axisInfo.invertedBaseTickValue = synchronizedValue;
            axisInfo.tickValues = [axisInfo.baseTickValue]
        } else {
            if (tickValues.length > 1 && tickInterval) {
                ticksMultiplier = _floor((maxTicksCount + 1) / tickValues.length);
                ticksCount = ticksMultiplier > 1 ? _floor((maxTicksCount + 1) / ticksMultiplier) : maxTicksCount;
                additionalStartTicksCount = _floor((ticksCount - tickValues.length) / 2);
                while (additionalStartTicksCount > 0 && 0 !== tickValues[0]) {
                    tickValues.unshift(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(tickValues[0] - tickInterval));
                    additionalStartTicksCount--
                }
                while (tickValues.length < ticksCount) {
                    tickValues.push(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(tickValues[tickValues.length - 1] + tickInterval))
                }
                axisInfo.tickInterval = tickInterval / ticksMultiplier
            }
            axisInfo.baseTickValue = tickValues[0];
            axisInfo.invertedBaseTickValue = tickValues[tickValues.length - 1]
        }
    })
}

function getAxisRange(axisInfo) {
    return axisInfo.maxValue - axisInfo.minValue || 1
}

function getMainAxisInfo(axesInfo) {
    for (var i = 0; i < axesInfo.length; i++) {
        if (!axesInfo[i].stubData) {
            return axesInfo[i]
        }
    }
    return null
}

function correctMinMaxValues(axesInfo) {
    var mainAxisInfo = getMainAxisInfo(axesInfo);
    var mainAxisInfoTickInterval = mainAxisInfo.tickInterval;
    axesInfo.forEach(axisInfo => {
        var scale;
        var move;
        var mainAxisBaseValueOffset;
        var valueFromAxisInfo;
        if (axisInfo !== mainAxisInfo) {
            if (mainAxisInfoTickInterval && axisInfo.tickInterval) {
                if (axisInfo.stubData && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(axisInfo.synchronizedValue)) {
                    axisInfo.oldMinValue = axisInfo.minValue = axisInfo.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.minValue) / mainAxisInfoTickInterval * axisInfo.tickInterval;
                    axisInfo.oldMaxValue = axisInfo.maxValue = axisInfo.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.maxValue) / mainAxisInfoTickInterval * axisInfo.tickInterval
                }
                scale = mainAxisInfoTickInterval / getAxisRange(mainAxisInfo) / axisInfo.tickInterval * getAxisRange(axisInfo);
                axisInfo.maxValue = axisInfo.minValue + getAxisRange(axisInfo) / scale
            }
            if (mainAxisInfo.inverted && !axisInfo.inverted || !mainAxisInfo.inverted && axisInfo.inverted) {
                mainAxisBaseValueOffset = mainAxisInfo.maxValue - mainAxisInfo.invertedBaseTickValue
            } else {
                mainAxisBaseValueOffset = mainAxisInfo.baseTickValue - mainAxisInfo.minValue
            }
            valueFromAxisInfo = getAxisRange(axisInfo);
            move = (mainAxisBaseValueOffset / getAxisRange(mainAxisInfo) - (axisInfo.baseTickValue - axisInfo.minValue) / valueFromAxisInfo) * valueFromAxisInfo;
            axisInfo.minValue -= move;
            axisInfo.maxValue -= move
        }
    })
}

function calculatePaddings(axesInfo) {
    var minPadding;
    var maxPadding;
    var startPadding = 0;
    var endPadding = 0;
    axesInfo.forEach(axisInfo => {
        var inverted = axisInfo.inverted;
        minPadding = axisInfo.minValue > axisInfo.oldMinValue ? (axisInfo.minValue - axisInfo.oldMinValue) / getAxisRange(axisInfo) : 0;
        maxPadding = axisInfo.maxValue < axisInfo.oldMaxValue ? (axisInfo.oldMaxValue - axisInfo.maxValue) / getAxisRange(axisInfo) : 0;
        startPadding = _max(startPadding, inverted ? maxPadding : minPadding);
        endPadding = _max(endPadding, inverted ? minPadding : maxPadding)
    });
    return {
        start: startPadding,
        end: endPadding
    }
}

function correctMinMaxValuesByPaddings(axesInfo, paddings) {
    axesInfo.forEach(info => {
        var range = getAxisRange(info);
        var inverted = info.inverted;
        info.minValue = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(info.minValue - paddings[inverted ? "end" : "start"] * range);
        info.maxValue = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(info.maxValue + paddings[inverted ? "start" : "end"] * range)
    })
}

function updateTickValuesIfSynchronizedValueUsed(axesInfo) {
    var hasSynchronizedValue = false;
    axesInfo.forEach(info => {
        hasSynchronizedValue = hasSynchronizedValue || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(info.synchronizedValue)
    });
    axesInfo.forEach(info => {
        var tickInterval = info.tickInterval;
        var tickValues = info.tickValues;
        var maxValue = info.maxValue;
        var minValue = info.minValue;
        var tick;
        if (hasSynchronizedValue && tickInterval) {
            while ((tick = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(tickValues[0] - tickInterval)) >= minValue) {
                tickValues.unshift(tick)
            }
            tick = tickValues[tickValues.length - 1];
            while ((tick = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(tick + tickInterval)) <= maxValue) {
                tickValues.push(tick)
            }
        }
        while (tickValues[0] + tickInterval / 10 < minValue) {
            tickValues.shift()
        }
        while (tickValues[tickValues.length - 1] - tickInterval / 10 > maxValue) {
            tickValues.pop()
        }
    })
}

function applyMinMaxValues(axesInfo) {
    axesInfo.forEach(info => {
        var axis = info.axis;
        var range = axis.getTranslator().getBusinessRange();
        if (range.min === range.minVisible) {
            range.min = info.minValue
        }
        if (range.max === range.maxVisible) {
            range.max = info.maxValue
        }
        range.minVisible = info.minValue;
        range.maxVisible = info.maxValue;
        if (range.min > range.minVisible) {
            range.min = range.minVisible
        }
        if (range.max < range.maxVisible) {
            range.max = range.maxVisible
        }
        axis.getTranslator().updateBusinessRange(range);
        axis.setTicks({
            majorTicks: info.tickValues,
            minorTicks: info.minorValues
        })
    })
}

function correctAfterSynchronize(axesInfo) {
    var invalidAxisInfo = [];
    var correctValue;
    axesInfo.forEach(info => {
        if (info.oldMaxValue - info.oldMinValue === 0) {
            invalidAxisInfo.push(info)
        } else if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(correctValue) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(info.synchronizedValue)) {
            correctValue = _abs((info.maxValue - info.minValue) / (info.tickValues[_floor(info.tickValues.length / 2)] - info.minValue || info.maxValue))
        }
    });
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(correctValue)) {
        return
    }
    invalidAxisInfo.forEach(info => {
        var firstTick = info.tickValues[0];
        var correctedTick = firstTick * correctValue;
        if (firstTick > 0) {
            info.maxValue = correctedTick;
            info.minValue = 0
        } else if (firstTick < 0) {
            info.minValue = correctedTick;
            info.maxValue = 0
        }
    })
}

function updateMinorTicks(axesInfo) {
    axesInfo.forEach((function(axisInfo) {
        if (!axisInfo.minorTickInterval) {
            return
        }
        var ticks = [];
        var interval = axisInfo.minorTickInterval;
        var tickCount = axisInfo.tickInterval / interval - 1;
        for (var i = 1; i < axisInfo.tickValues.length; i++) {
            var tick = axisInfo.tickValues[i - 1];
            for (var j = 0; j < tickCount; j++) {
                tick += interval;
                ticks.push(tick)
            }
        }
        axisInfo.minorValues = ticks
    }))
}

function correctPaddings(axesInfo, paddings) {
    return axesInfo.reduce((prev, info) => {
        var inverted = info.inverted;
        var {
            start: start,
            end: end
        } = info.axis.getCorrectedValuesToZero(info.minValue, info.maxValue);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(start) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(end)) {
            return inverted ? {
                start: prev.start,
                end: Math.min(prev.end, end)
            } : {
                start: Math.min(prev.start, start),
                end: prev.end
            }
        }
        return prev
    }, paddings)
}
var multiAxesSynchronizer = {
    synchronize: function(valueAxes) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(getValueAxesPerPanes(valueAxes), (function(_, axes) {
            var axesInfo;
            var paddings;
            if (axes.length > 1) {
                axesInfo = populateAxesInfo(axes);
                if (axesInfo.length < 2 || !getMainAxisInfo(axesInfo)) {
                    return
                }
                updateTickValues(axesInfo);
                correctMinMaxValues(axesInfo);
                paddings = calculatePaddings(axesInfo);
                paddings = correctPaddings(axesInfo, paddings);
                correctMinMaxValuesByPaddings(axesInfo, paddings);
                correctAfterSynchronize(axesInfo);
                updateTickValuesIfSynchronizedValueUsed(axesInfo);
                updateMinorTicks(axesInfo);
                axesInfo.forEach(info => {
                    convertAxisInfo(info, logConverter(info.axis.getTranslator().getBusinessRange()))
                });
                applyMinMaxValues(axesInfo)
            }
        }))
    }
};
/* harmony default export */ __webpack_exports__["default"] = (multiAxesSynchronizer);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/scroll_bar.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/scroll_bar.js ***!
  \************************************************************************/
/*! exports provided: ScrollBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollBar", function() { return ScrollBar; });
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _translators_translator2d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../translators/translator2d */ "./node_modules/devextreme/esm/viz/translators/translator2d.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _events_drag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../events/drag */ "./node_modules/devextreme/esm/events/drag.js");
/**
 * DevExtreme (esm/viz/chart_components/scroll_bar.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var _min = Math.min;
var _max = Math.max;
var MIN_SCROLL_BAR_SIZE = 2;
var ScrollBar = function(renderer, group) {
    this._translator = new _translators_translator2d__WEBPACK_IMPORTED_MODULE_3__["Translator2D"]({}, {}, {});
    this._scroll = renderer.rect().append(group);
    this._addEvents()
};

function _getXCoord(canvas, pos, offset, width) {
    var x = 0;
    if ("right" === pos) {
        x = canvas.width - canvas.right + offset
    } else if ("left" === pos) {
        x = canvas.left - offset - width
    }
    return x
}

function _getYCoord(canvas, pos, offset, width) {
    var y = 0;
    if ("top" === pos) {
        y = canvas.top - offset
    } else if ("bottom" === pos) {
        y = canvas.height - canvas.bottom + width + offset
    }
    return y
}
ScrollBar.prototype = {
    _addEvents: function() {
        var scrollElement = this._scroll.element;
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(scrollElement, _events_drag__WEBPACK_IMPORTED_MODULE_6__["start"], e => {
            Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_1__["fireEvent"])({
                type: "dxc-scroll-start",
                originalEvent: e,
                target: scrollElement
            })
        });
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(scrollElement, _events_drag__WEBPACK_IMPORTED_MODULE_6__["move"], e => {
            var dX = -e.offset.x * this._scale;
            var dY = -e.offset.y * this._scale;
            var lx = this._offset - (this._layoutOptions.vertical ? dY : dX) / this._scale;
            this._applyPosition(lx, lx + this._translator.canvasLength / this._scale);
            Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_1__["fireEvent"])({
                type: "dxc-scroll-move",
                originalEvent: e,
                target: scrollElement,
                offset: {
                    x: dX,
                    y: dY
                }
            })
        });
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(scrollElement, _events_drag__WEBPACK_IMPORTED_MODULE_6__["end"], e => {
            Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_1__["fireEvent"])({
                type: "dxc-scroll-end",
                originalEvent: e,
                target: scrollElement,
                offset: {
                    x: -e.offset.x * this._scale,
                    y: -e.offset.y * this._scale
                }
            })
        })
    },
    update: function(options) {
        var position = options.position;
        var isVertical = options.rotated;
        var defaultPosition = isVertical ? "right" : "top";
        var secondaryPosition = isVertical ? "left" : "bottom";
        if (position !== defaultPosition && position !== secondaryPosition) {
            position = defaultPosition
        }
        this._scroll.attr({
            rotate: !options.rotated ? -90 : 0,
            rotateX: 0,
            rotateY: 0,
            fill: options.color,
            width: options.width,
            opacity: options.opacity
        });
        this._layoutOptions = {
            width: options.width,
            offset: options.offset,
            vertical: isVertical,
            position: position
        };
        return this
    },
    init: function(range, stick) {
        var isDiscrete = "discrete" === range.axisType;
        this._translateWithOffset = isDiscrete && !stick ? 1 : 0;
        this._translator.update(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, range, {
            minVisible: null,
            maxVisible: null,
            visibleCategories: null
        }, isDiscrete && {
            min: null,
            max: null
        } || {}), this._canvas, {
            isHorizontal: !this._layoutOptions.vertical,
            stick: stick
        });
        return this
    },
    getOptions: function() {
        return this._layoutOptions
    },
    setPane: function(panes) {
        var position = this._layoutOptions.position;
        var pane;
        if ("left" === position || "top" === position) {
            pane = panes[0]
        } else {
            pane = panes[panes.length - 1]
        }
        this.pane = pane.name;
        return this
    },
    updateSize: function(canvas) {
        this._canvas = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, canvas);
        var options = this._layoutOptions;
        var pos = options.position;
        var offset = options.offset;
        var width = options.width;
        this._scroll.attr({
            translateX: _getXCoord(canvas, pos, offset, width),
            translateY: _getYCoord(canvas, pos, offset, width)
        })
    },
    getMultipleAxesSpacing: function() {
        return 0
    },
    estimateMargins: function() {
        return this.getMargins()
    },
    getMargins: function() {
        var options = this._layoutOptions;
        var margins = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        margins[options.position] = options.width + options.offset;
        return margins
    },
    shift: function(margins) {
        var _that$_scroll$attr, _that$_scroll$attr2;
        var options = this._layoutOptions;
        var side = options.position;
        var isVertical = options.vertical;
        var attr = {
            translateX: null !== (_that$_scroll$attr = this._scroll.attr("translateX")) && void 0 !== _that$_scroll$attr ? _that$_scroll$attr : 0,
            translateY: null !== (_that$_scroll$attr2 = this._scroll.attr("translateY")) && void 0 !== _that$_scroll$attr2 ? _that$_scroll$attr2 : 0
        };
        var shift = margins[side];
        attr[isVertical ? "translateX" : "translateY"] += ("left" === side || "top" === side ? -1 : 1) * shift;
        this._scroll.attr(attr)
    },
    hideTitle: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    hideOuterElements: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    setPosition: function(min, max) {
        var translator = this._translator;
        var minPoint = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(min) ? translator.translate(min, -this._translateWithOffset) : translator.translate("canvas_position_start");
        var maxPoint = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(max) ? translator.translate(max, this._translateWithOffset) : translator.translate("canvas_position_end");
        this._offset = _min(minPoint, maxPoint);
        this._scale = translator.getScale(min, max);
        this._applyPosition(_min(minPoint, maxPoint), _max(minPoint, maxPoint))
    },
    customPositionIsAvailable: () => false,
    dispose: function() {
        this._scroll.dispose();
        this._scroll = this._translator = null
    },
    _applyPosition: function(x1, x2) {
        var visibleArea = this._translator.getCanvasVisibleArea();
        x1 = _max(x1, visibleArea.min);
        x1 = _min(x1, visibleArea.max);
        x2 = _min(x2, visibleArea.max);
        x2 = _max(x2, visibleArea.min);
        var height = Math.abs(x2 - x1);
        this._scroll.attr({
            y: x1,
            height: height < MIN_SCROLL_BAR_SIZE ? MIN_SCROLL_BAR_SIZE : height
        })
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/shutter_zoom.js":
/*!**************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/shutter_zoom.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events_drag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events/drag */ "./node_modules/devextreme/esm/events/drag.js");
/**
 * DevExtreme (esm/viz/chart_components/shutter_zoom.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var SHUTTER_EVENTS_NS = ".shutter-zoom";
var DRAG_START_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_0__["start"] + SHUTTER_EVENTS_NS;
var DRAG_UPDATE_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_0__["move"] + SHUTTER_EVENTS_NS;
var DRAG_END_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_0__["end"] + SHUTTER_EVENTS_NS;

function getPointerCoord(rootOffset, canvas, rotated, e) {
    var coord = Math.floor(rotated ? e.pageY - rootOffset.top : e.pageX - rootOffset.left);
    var min = rotated ? canvas.y1 : canvas.x1;
    var max = rotated ? canvas.y2 : canvas.x2;
    if (coord < min) {
        coord = min
    } else if (coord > max) {
        coord = max
    }
    return coord
}

function checkCoords(rootOffset, canvas, e) {
    var x = e.pageX - rootOffset.left;
    var y = e.pageY - rootOffset.top;
    return x >= canvas.x1 && x <= canvas.x2 && y >= canvas.y1 && y <= canvas.y2
}

function dragStartHandler(ctx) {
    return function(e) {
        var offset = ctx.getRootOffset();
        var canvas = ctx.getCanvas();
        if (!checkCoords(offset, canvas, e)) {
            e.cancel = true;
            return
        }
        ctx.rootOffset = offset;
        ctx.canvas = canvas;
        ctx.startCoord = getPointerCoord(offset, canvas, ctx.rotated, e);
        ctx.triggerStart();
        ctx.rect.attr({
            x: canvas.x1,
            y: canvas.y1,
            width: canvas.width,
            height: canvas.height
        }).append(ctx.root)
    }
}

function dragHandler(ctx) {
    return function(e) {
        var curCoord = getPointerCoord(ctx.rootOffset, ctx.canvas, ctx.rotated, e);
        var attr = {};
        ctx.curCoord = curCoord;
        attr[ctx.rotated ? "y" : "x"] = Math.min(ctx.startCoord, curCoord);
        attr[ctx.rotated ? "height" : "width"] = Math.abs(ctx.startCoord - curCoord);
        ctx.rect.attr(attr)
    }
}

function dragEndHandler(ctx) {
    return function(e) {
        ctx.triggerEnd();
        ctx.rect.remove()
    }
}

function shutterZoom(options) {
    var chart = options.chart;
    var renderer = options.renderer;
    var rotated = options.rotated;
    var rect = renderer.rect(0, 0, 0, 0).attr(options.shutterOptions);
    var shutter = {
        rect: rect,
        root: renderer.root,
        rotated: rotated,
        triggerStart: function() {
            chart._eventTrigger("zoomStart")
        },
        triggerEnd: function() {
            var tr = chart._argumentAxes[0].getTranslator();
            var rangeStart = Math.min(this.startCoord, this.curCoord);
            var rangeEnd = Math.max(this.startCoord, this.curCoord);
            chart._eventTrigger("zoomEnd", {
                rangeStart: tr.from(rangeStart),
                rangeEnd: tr.from(rangeEnd)
            })
        },
        dispose: function() {
            renderer.root.off(SHUTTER_EVENTS_NS);
            rect.dispose()
        },
        getRootOffset: function() {
            return renderer.getRootOffset()
        },
        getCanvas: function() {
            var canvas = chart._canvas;
            var panes = chart.panes;
            var firstPane = panes[0].canvas;
            var lastPane = panes[panes.length - 1].canvas;
            return {
                x1: firstPane.left,
                y1: firstPane.top,
                x2: canvas.width - lastPane.right,
                y2: canvas.height - lastPane.bottom,
                width: canvas.width - firstPane.left - lastPane.right,
                height: canvas.height - firstPane.top - lastPane.bottom
            }
        }
    };
    renderer.root.off(SHUTTER_EVENTS_NS).on(DRAG_START_EVENT_NAME, {
        direction: rotated ? "vertical" : "horizontal",
        immediate: true
    }, dragStartHandler(shutter)).on(DRAG_UPDATE_EVENT_NAME, dragHandler(shutter)).on(DRAG_END_EVENT_NAME, dragEndHandler(shutter));
    return shutter
}
/* harmony default export */ __webpack_exports__["default"] = ({
    name: "shutter_zoom",
    init: function() {
        var options = this.option("shutterZoom") || {};
        if (!options.enabled) {
            return
        }
        this._shutterZoom = shutterZoom({
            chart: this,
            renderer: this._renderer,
            rotated: this.option("rotated"),
            shutterOptions: options
        })
    },
    dispose: function() {
        this._shutterZoom && this._shutterZoom.dispose()
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/zoom_and_pan.js":
/*!**************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/zoom_and_pan.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _events_core_wheel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/core/wheel */ "./node_modules/devextreme/esm/events/core/wheel.js");
/* harmony import */ var _events_transform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/transform */ "./node_modules/devextreme/esm/events/transform.js");
/* harmony import */ var _events_drag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../events/drag */ "./node_modules/devextreme/esm/events/drag.js");
/**
 * DevExtreme (esm/viz/chart_components/zoom_and_pan.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var EVENTS_NS = ".zoomAndPanNS";
var DRAG_START_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_5__["start"] + EVENTS_NS;
var DRAG_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_5__["move"] + EVENTS_NS;
var DRAG_END_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_5__["end"] + EVENTS_NS;
var PINCH_START_EVENT_NAME = _events_transform__WEBPACK_IMPORTED_MODULE_4__["pinchstart"] + EVENTS_NS;
var PINCH_EVENT_NAME = _events_transform__WEBPACK_IMPORTED_MODULE_4__["pinch"] + EVENTS_NS;
var PINCH_END_EVENT_NAME = _events_transform__WEBPACK_IMPORTED_MODULE_4__["pinchend"] + EVENTS_NS;
var SCROLL_BAR_START_EVENT_NAME = "dxc-scroll-start" + EVENTS_NS;
var SCROLL_BAR_MOVE_EVENT_NAME = "dxc-scroll-move" + EVENTS_NS;
var SCROLL_BAR_END_EVENT_NAME = "dxc-scroll-end" + EVENTS_NS;
var GESTURE_TIMEOUT = 300;
var MIN_DRAG_DELTA = 5;
var _min = Math.min;
var _max = Math.max;
var _abs = Math.abs;

function canvasToRect(canvas) {
    return {
        x: canvas.left,
        y: canvas.top,
        width: canvas.width - canvas.left - canvas.right,
        height: canvas.height - canvas.top - canvas.bottom
    }
}

function checkCoords(rect, coords) {
    var x = coords.x;
    var y = coords.y;
    return x >= rect.x && x <= rect.width + rect.x && y >= rect.y && y <= rect.height + rect.y
}

function sortAxes(axes, onlyAxisToNotify) {
    if (onlyAxisToNotify) {
        axes = axes.sort((a, b) => {
            if (a === onlyAxisToNotify) {
                return -1
            }
            if (b === onlyAxisToNotify) {
                return 1
            }
            return 0
        })
    }
    return axes
}

function isNotEmptyAxisBusinessRange(axis) {
    return !axis.getTranslator().getBusinessRange().isEmpty()
}

function axisZoom(axis, onlyAxisToNotify, getRange, getParameters, actionField, scale, e) {
    var silent = onlyAxisToNotify && axis !== onlyAxisToNotify;
    var range = getRange(axis);
    var {
        stopInteraction: stopInteraction,
        correctedRange: correctedRange
    } = axis.checkZoomingLowerLimitOvercome(actionField, scale, range);
    var result = axis.handleZooming(stopInteraction ? null : correctedRange, getParameters(silent), e, actionField);
    stopInteraction && axis.handleZoomEnd();
    return {
        stopInteraction: stopInteraction,
        result: result
    }
}
/* harmony default export */ __webpack_exports__["default"] = ({
    name: "zoom_and_pan",
    init: function() {
        var chart = this;
        var renderer = this._renderer;

        function cancelEvent(e) {
            if (e.originalEvent) {
                cancelEvent(e.originalEvent)
            }
            if (false !== e.cancelable) {
                e.cancel = true
            }
        }

        function startAxesViewportChanging(zoomAndPan, actionField, e) {
            var options = zoomAndPan.options;
            var actionData = zoomAndPan.actionData;
            var axes = [];
            if (options.argumentAxis[actionField]) {
                axes.push(chart.getArgumentAxis())
            }
            if (options.valueAxis[actionField]) {
                axes = axes.concat(actionData.valueAxes)
            }
            axes.reduce((isPrevented, axis) => {
                if (isPrevented) {
                    return isPrevented
                }
                if (isNotEmptyAxisBusinessRange(axis)) {
                    return axis.handleZooming(null, {
                        end: true
                    }, e, actionField).isPrevented
                }
                return isPrevented
            }, false) && cancelEvent(e)
        }

        function axesViewportChanging(zoomAndPan, actionField, e, offsetCalc, centerCalc) {
            function zoomAxes(axes, criteria, coordField, e, actionData) {
                var zoom = {
                    zoomed: false
                };
                criteria && axes.filter(isNotEmptyAxisBusinessRange).forEach(axis => {
                    var options = axis.getOptions();
                    var viewport = axis.visualRange();
                    var scale = axis.getTranslator().getEventScale(e);
                    var translate = -offsetCalc(e, actionData, coordField, scale);
                    zoom = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, zoom, axis.getTranslator().zoom(translate, scale, axis.getZoomBounds()));
                    var range = axis.adjustRange(Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["getVizRangeObject"])([zoom.min, zoom.max]));
                    var {
                        stopInteraction: stopInteraction,
                        correctedRange: correctedRange
                    } = axis.checkZoomingLowerLimitOvercome(actionField, scale, range);
                    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(viewport) || viewport.startValue.valueOf() !== correctedRange.startValue.valueOf() || viewport.endValue.valueOf() !== correctedRange.endValue.valueOf()) {
                        axis.handleZooming(stopInteraction ? null : correctedRange, {
                            start: true,
                            end: true
                        }, e, actionField);
                        if (!stopInteraction) {
                            zoom.zoomed = true;
                            zoom.deltaTranslate = translate - zoom.translate
                        }
                    } else if ("touch" === e.pointerType && "discrete" === options.type) {
                        var isMinPosition = axis.isExtremePosition(false);
                        var isMaxPosition = axis.isExtremePosition(true);
                        var zoomInEnabled = scale > 1 && !stopInteraction;
                        var zoomOutEnabled = scale < 1 && (!isMinPosition || !isMaxPosition);
                        var panningEnabled = 1 === scale && !(isMinPosition && (translate < 0 && !options.inverted || translate > 0 && options.inverted) || isMaxPosition && (translate > 0 && !options.inverted || translate < 0 && options.inverted));
                        zoom.enabled = zoomInEnabled || zoomOutEnabled || panningEnabled
                    }
                });
                return zoom
            }

            function storeOffset(e, actionData, zoom, coordField) {
                if (zoom.zoomed) {
                    actionData.offset[coordField] = (e.offset ? e.offset[coordField] : actionData.offset[coordField]) + zoom.deltaTranslate
                }
            }

            function storeCenter(center, actionData, zoom, coordField) {
                if (zoom.zoomed) {
                    actionData.center[coordField] = center[coordField] + zoom.deltaTranslate
                }
            }
            var rotated = chart.option("rotated");
            var actionData = zoomAndPan.actionData;
            var options = zoomAndPan.options;
            var argZoom = {};
            var valZoom = {};
            if (!actionData.fallback) {
                argZoom = zoomAxes(chart._argumentAxes, options.argumentAxis[actionField], rotated ? "y" : "x", e, actionData);
                valZoom = zoomAxes(actionData.valueAxes, options.valueAxis[actionField], rotated ? "x" : "y", e, actionData);
                chart._requestChange(["VISUAL_RANGE"]);
                storeOffset(e, actionData, argZoom, rotated ? "y" : "x");
                storeOffset(e, actionData, valZoom, rotated ? "x" : "y")
            }
            var center = centerCalc(e);
            storeCenter(center, actionData, argZoom, rotated ? "y" : "x");
            storeCenter(center, actionData, valZoom, rotated ? "x" : "y");
            if (!argZoom.zoomed && !valZoom.zoomed) {
                actionData.center = center
            }
            return argZoom.zoomed || valZoom.zoomed || actionData.fallback || argZoom.enabled || valZoom.enabled
        }

        function finishAxesViewportChanging(zoomAndPan, actionField, e, offsetCalc) {
            function zoomAxes(axes, criteria, coordField, actionData, onlyAxisToNotify) {
                var zoomStarted = false;
                var scale = e.scale || 1;
                var getRange = axis => {
                    var zoom = axis.getTranslator().zoom(-offsetCalc(e, actionData, coordField, scale), scale, axis.getZoomBounds());
                    return {
                        startValue: zoom.min,
                        endValue: zoom.max
                    }
                };
                var getParameters = silent => ({
                    start: true,
                    end: silent
                });
                criteria && axes.forEach(axis => {
                    zoomStarted = !axisZoom(axis, onlyAxisToNotify, getRange, getParameters, actionField, scale, e).stopInteraction
                });
                return zoomStarted
            }
            var rotated = chart.option("rotated");
            var actionData = zoomAndPan.actionData;
            var options = zoomAndPan.options;
            var zoomStarted = true;
            if (actionData.fallback) {
                zoomStarted &= zoomAxes(chart._argumentAxes, options.argumentAxis[actionField], rotated ? "y" : "x", actionData, chart.getArgumentAxis());
                zoomStarted |= zoomAxes(actionData.valueAxes, options.valueAxis[actionField], rotated ? "x" : "y", actionData)
            } else {
                var axes = [];
                if (options.argumentAxis[actionField]) {
                    axes.push(chart.getArgumentAxis())
                }
                if (options.valueAxis[actionField]) {
                    axes = axes.concat(actionData.valueAxes)
                }
                axes.filter(isNotEmptyAxisBusinessRange).forEach(axis => {
                    axis.handleZooming(null, {
                        start: true
                    }, e, actionField)
                });
                zoomStarted = axes.length
            }
            zoomStarted && chart._requestChange(["VISUAL_RANGE"])
        }

        function prepareActionData(coords, action) {
            var axes = chart._argumentAxes.filter(axis => checkCoords(canvasToRect(axis.getCanvas()), coords));
            return {
                fallback: chart._lastRenderingTime > GESTURE_TIMEOUT,
                cancel: !axes.length || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(action),
                action: action,
                curAxisRect: axes.length && canvasToRect(axes[0].getCanvas()),
                valueAxes: axes.length && chart._valueAxes.filter(axis => checkCoords(canvasToRect(axis.getCanvas()), coords)),
                offset: {
                    x: 0,
                    y: 0
                },
                center: coords,
                startCenter: coords
            }
        }

        function getPointerCoord(rect, e) {
            var rootOffset = renderer.getRootOffset();
            return {
                x: _min(_max(e.pageX - rootOffset.left, rect.x), rect.width + rect.x),
                y: _min(_max(e.pageY - rootOffset.top, rect.y), rect.height + rect.y)
            }
        }

        function calcCenterForPinch(e) {
            var rootOffset = renderer.getRootOffset();
            var x1 = e.pointers[0].pageX;
            var x2 = e.pointers[1].pageX;
            var y1 = e.pointers[0].pageY;
            var y2 = e.pointers[1].pageY;
            return {
                x: _min(x1, x2) + _abs(x2 - x1) / 2 - rootOffset.left,
                y: _min(y1, y2) + _abs(y2 - y1) / 2 - rootOffset.top
            }
        }

        function calcCenterForDrag(e) {
            var rootOffset = renderer.getRootOffset();
            return {
                x: e.pageX - rootOffset.left,
                y: e.pageY - rootOffset.top
            }
        }

        function calcOffsetForDrag(e, actionData, coordField) {
            return e.offset[coordField] - actionData.offset[coordField]
        }

        function preventDefaults(e) {
            if (false !== e.cancelable) {
                e.preventDefault();
                e.stopPropagation()
            }
            chart._stopCurrentHandling()
        }
        var zoomAndPan = {
            dragStartHandler: function(e) {
                var options = zoomAndPan.options;
                var isTouch = "touch" === e.pointerType;
                var wantPan = options.argumentAxis.pan || options.valueAxis.pan;
                var wantZoom = options.argumentAxis.zoom || options.valueAxis.zoom;
                var panKeyPressed = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(options.panKey) && e[Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeEnum"])(options.panKey) + "Key"];
                var dragToZoom = options.dragToZoom;
                var action;
                e._cancelPreventDefault = true;
                if (isTouch) {
                    if (options.allowTouchGestures && wantPan) {
                        var cancelPanning = !zoomAndPan.panningVisualRangeEnabled() || zoomAndPan.skipEvent;
                        action = cancelPanning ? null : "pan"
                    }
                } else if (dragToZoom && wantPan && panKeyPressed) {
                    action = "pan"
                } else if (!dragToZoom && wantPan) {
                    action = "pan"
                } else if (dragToZoom && wantZoom) {
                    action = "zoom"
                }
                var actionData = prepareActionData(calcCenterForDrag(e), action);
                if (actionData.cancel) {
                    zoomAndPan.skipEvent = false;
                    if (false !== e.cancelable) {
                        e.cancel = true
                    }
                    return
                }
                zoomAndPan.actionData = actionData;
                if ("zoom" === action) {
                    actionData.startCoords = getPointerCoord(actionData.curAxisRect, e);
                    actionData.rect = renderer.rect(0, 0, 0, 0).attr(options.dragBoxStyle).append(renderer.root)
                } else {
                    startAxesViewportChanging(zoomAndPan, "pan", e)
                }
            },
            dragHandler: function(e) {
                var rotated = chart.option("rotated");
                var options = zoomAndPan.options;
                var actionData = zoomAndPan.actionData;
                var isTouch = "touch" === e.pointerType;
                e._cancelPreventDefault = true;
                if (!actionData || isTouch && !zoomAndPan.panningVisualRangeEnabled()) {
                    return
                }
                if ("zoom" === actionData.action) {
                    preventDefaults(e);
                    var curCanvas = actionData.curAxisRect;
                    var startCoords = actionData.startCoords;
                    var curCoords = getPointerCoord(curCanvas, e);
                    var zoomArg = options.argumentAxis.zoom;
                    var zoomVal = options.valueAxis.zoom;
                    var rect = {
                        x: _min(startCoords.x, curCoords.x),
                        y: _min(startCoords.y, curCoords.y),
                        width: _abs(startCoords.x - curCoords.x),
                        height: _abs(startCoords.y - curCoords.y)
                    };
                    if (!zoomArg || !zoomVal) {
                        if (!zoomArg && !rotated || !zoomVal && rotated) {
                            rect.x = curCanvas.x;
                            rect.width = curCanvas.width
                        } else {
                            rect.y = curCanvas.y;
                            rect.height = curCanvas.height
                        }
                    }
                    actionData.rect.attr(rect)
                } else if ("pan" === actionData.action) {
                    axesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag, e => e.offset);
                    var deltaOffsetY = Math.abs(e.offset.y - actionData.offset.y);
                    var deltaOffsetX = Math.abs(e.offset.x - actionData.offset.x);
                    if (isTouch && (deltaOffsetY > MIN_DRAG_DELTA && deltaOffsetY > Math.abs(actionData.offset.x) || deltaOffsetX > MIN_DRAG_DELTA && deltaOffsetX > Math.abs(actionData.offset.y))) {
                        return
                    }
                    preventDefaults(e)
                }
            },
            dragEndHandler: function(e) {
                var rotated = chart.option("rotated");
                var options = zoomAndPan.options;
                var actionData = zoomAndPan.actionData;
                var isTouch = "touch" === e.pointerType;
                var panIsEmpty = actionData && "pan" === actionData.action && !actionData.fallback && 0 === actionData.offset.x && 0 === actionData.offset.y;
                if (!actionData || isTouch && !zoomAndPan.panningVisualRangeEnabled() || panIsEmpty) {
                    return
                }(!isTouch || !zoomAndPan.actionData.isNative) && preventDefaults(e);
                if ("zoom" === actionData.action) {
                    var zoomAxes = (axes, criteria, coordField, startCoords, curCoords, onlyAxisToNotify) => {
                        axes = sortAxes(axes, onlyAxisToNotify);
                        var curCoord = curCoords[coordField];
                        var startCoord = startCoords[coordField];
                        var zoomStarted = false;
                        var getParameters = silent => ({
                            start: !!silent,
                            end: !!silent
                        });
                        if (criteria && _abs(curCoord - startCoord) > MIN_DRAG_DELTA) {
                            axes.some(axis => {
                                var tr = axis.getTranslator();
                                if (tr.getBusinessRange().isEmpty()) {
                                    return
                                }
                                var {
                                    stopInteraction: stopInteraction,
                                    result: result
                                } = axisZoom(axis, onlyAxisToNotify, () => [tr.from(startCoord), tr.from(curCoord)], getParameters, actionData.action, tr.getMinScale(true), e);
                                zoomStarted = !stopInteraction;
                                return onlyAxisToNotify && result.isPrevented
                            })
                        }
                        return zoomStarted
                    };
                    var curCoords = getPointerCoord(actionData.curAxisRect, e);
                    var argumentAxesZoomed = zoomAxes(chart._argumentAxes, options.argumentAxis.zoom, rotated ? "y" : "x", actionData.startCoords, curCoords, chart.getArgumentAxis());
                    var valueAxesZoomed = zoomAxes(actionData.valueAxes, options.valueAxis.zoom, rotated ? "x" : "y", actionData.startCoords, curCoords);
                    if (valueAxesZoomed || argumentAxesZoomed) {
                        chart._requestChange(["VISUAL_RANGE"])
                    }
                    actionData.rect.dispose()
                } else if ("pan" === actionData.action) {
                    finishAxesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag)
                }
                zoomAndPan.actionData = null
            },
            pinchStartHandler: function(e) {
                var actionData = prepareActionData(calcCenterForPinch(e), "zoom");
                actionData.isNative = !zoomAndPan.panningVisualRangeEnabled();
                if (actionData.cancel) {
                    cancelEvent(e);
                    return
                }
                zoomAndPan.actionData = actionData;
                startAxesViewportChanging(zoomAndPan, "zoom", e)
            },
            pinchHandler: function(e) {
                if (!zoomAndPan.actionData) {
                    return
                }
                var viewportChanged = axesViewportChanging(zoomAndPan, "zoom", e, (e, actionData, coordField, scale) => calcCenterForPinch(e)[coordField] - actionData.center[coordField] + (actionData.center[coordField] - actionData.center[coordField] * scale), calcCenterForPinch);
                zoomAndPan.defineTouchBehavior(!viewportChanged, e);
                !viewportChanged && (zoomAndPan.actionData = null)
            },
            pinchEndHandler: function(e) {
                if (!zoomAndPan.actionData) {
                    return
                }
                finishAxesViewportChanging(zoomAndPan, "zoom", e, (e, actionData, coordField, scale) => actionData.center[coordField] - actionData.startCenter[coordField] + (actionData.startCenter[coordField] - actionData.startCenter[coordField] * scale));
                zoomAndPan.actionData = null
            },
            cleanup: function() {
                renderer.root.off(EVENTS_NS);
                zoomAndPan.actionData && zoomAndPan.actionData.rect && zoomAndPan.actionData.rect.dispose();
                zoomAndPan.actionData = null;
                renderer.root.css({
                    "touch-action": "",
                    "-ms-touch-action": ""
                })
            },
            setup: function(options) {
                zoomAndPan.cleanup();
                if (!options.argumentAxis.pan) {
                    renderer.root.on(SCROLL_BAR_START_EVENT_NAME, cancelEvent)
                }
                if (options.argumentAxis.none && options.valueAxis.none) {
                    return
                }
                zoomAndPan.options = options;
                var rotated = chart.option("rotated");
                if ((options.argumentAxis.zoom || options.valueAxis.zoom) && options.allowMouseWheel) {
                    renderer.root.on(_events_core_wheel__WEBPACK_IMPORTED_MODULE_3__["name"] + EVENTS_NS, (function(e) {
                        function zoomAxes(axes, coord, delta, onlyAxisToNotify) {
                            axes = sortAxes(axes, onlyAxisToNotify);
                            var zoomStarted = false;
                            var getParameters = silent => ({
                                start: !!silent,
                                end: !!silent
                            });
                            axes.some(axis => {
                                var translator = axis.getTranslator();
                                if (translator.getBusinessRange().isEmpty()) {
                                    return
                                }
                                var scale = translator.getMinScale(delta > 0);
                                var {
                                    stopInteraction: stopInteraction,
                                    result: result
                                } = axisZoom(axis, onlyAxisToNotify, () => {
                                    var zoom = translator.zoom(-(coord - coord * scale), scale, axis.getZoomBounds());
                                    return {
                                        startValue: zoom.min,
                                        endValue: zoom.max
                                    }
                                }, getParameters, "zoom", scale, e);
                                zoomStarted = !stopInteraction;
                                return onlyAxisToNotify && result.isPrevented
                            });
                            return zoomStarted
                        }
                        var coords = calcCenterForDrag(e);
                        var axesZoomed = false;
                        var targetAxes;
                        if (options.valueAxis.zoom) {
                            targetAxes = chart._valueAxes.filter(axis => checkCoords(canvasToRect(axis.getCanvas()), coords));
                            if (0 === targetAxes.length) {
                                var targetCanvas = chart._valueAxes.reduce((r, axis) => {
                                    if (!r && axis.coordsIn(coords.x, coords.y)) {
                                        r = axis.getCanvas()
                                    }
                                    return r
                                }, null);
                                if (targetCanvas) {
                                    targetAxes = chart._valueAxes.filter(axis => checkCoords(canvasToRect(axis.getCanvas()), {
                                        x: targetCanvas.left,
                                        y: targetCanvas.top
                                    }))
                                }
                            }
                            axesZoomed |= zoomAxes(targetAxes, rotated ? coords.x : coords.y, e.delta)
                        }
                        if (options.argumentAxis.zoom) {
                            var canZoom = chart._argumentAxes.some(axis => {
                                if (checkCoords(canvasToRect(axis.getCanvas()), coords) || axis.coordsIn(coords.x, coords.y)) {
                                    return true
                                }
                                return false
                            });
                            axesZoomed |= canZoom && zoomAxes(chart._argumentAxes, rotated ? coords.y : coords.x, e.delta, chart.getArgumentAxis())
                        }
                        if (axesZoomed) {
                            chart._requestChange(["VISUAL_RANGE"]);
                            zoomAndPan.panningVisualRangeEnabled(targetAxes) && preventDefaults(e)
                        }
                    }))
                }
                if (options.allowTouchGestures) {
                    if (options.argumentAxis.zoom || options.valueAxis.zoom) {
                        renderer.root.on(PINCH_START_EVENT_NAME, {
                            passive: false
                        }, zoomAndPan.pinchStartHandler).on(PINCH_EVENT_NAME, {
                            passive: false
                        }, zoomAndPan.pinchHandler).on(PINCH_END_EVENT_NAME, zoomAndPan.pinchEndHandler)
                    }
                }
                renderer.root.on(DRAG_START_EVENT_NAME, {
                    immediate: true,
                    passive: false
                }, zoomAndPan.dragStartHandler).on(DRAG_EVENT_NAME, {
                    immediate: true,
                    passive: false
                }, zoomAndPan.dragHandler).on(DRAG_END_EVENT_NAME, zoomAndPan.dragEndHandler);
                if (options.argumentAxis.pan) {
                    renderer.root.on(SCROLL_BAR_START_EVENT_NAME, (function(e) {
                        zoomAndPan.actionData = {
                            valueAxes: [],
                            offset: {
                                x: 0,
                                y: 0
                            },
                            center: {
                                x: 0,
                                y: 0
                            }
                        };
                        preventDefaults(e);
                        startAxesViewportChanging(zoomAndPan, "pan", e)
                    })).on(SCROLL_BAR_MOVE_EVENT_NAME, (function(e) {
                        preventDefaults(e);
                        axesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag, e => e.offset)
                    })).on(SCROLL_BAR_END_EVENT_NAME, (function(e) {
                        preventDefaults(e);
                        finishAxesViewportChanging(zoomAndPan, "pan", e, calcOffsetForDrag);
                        zoomAndPan.actionData = null
                    }))
                }
            },
            defineTouchBehavior: function(isDefault, e) {
                zoomAndPan.actionData && (zoomAndPan.actionData.isNative = isDefault);
                if (!isDefault) {
                    preventDefaults(e)
                }
            },
            panningVisualRangeEnabled: function(targetAxes) {
                if (null !== targetAxes && void 0 !== targetAxes && targetAxes.length) {
                    return targetAxes.some(axis => !axis.isExtremePosition(false) || !axis.isExtremePosition(true))
                }
                var enablePanByValueAxis = chart._valueAxes.some(axis => !axis.isExtremePosition(false) || !axis.isExtremePosition(true));
                var enablePanByArgumentAxis = chart._argumentAxes.some(axis => !axis.isExtremePosition(false) || !axis.isExtremePosition(true));
                return enablePanByValueAxis || enablePanByArgumentAxis
            }
        };
        this._zoomAndPan = zoomAndPan
    },
    members: {
        _setupZoomAndPan: function() {
            this._zoomAndPan.setup(this._themeManager.getOptions("zoomAndPan"))
        }
    },
    dispose: function() {
        this._zoomAndPan.cleanup()
    },
    customize: function(constructor) {
        constructor.addChange({
            code: "ZOOM_AND_PAN",
            handler: function() {
                this._setupZoomAndPan()
            },
            isThemeDependent: true,
            isOptionChange: true,
            option: "zoomAndPan"
        })
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/series_family.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/series_family.js ***!
  \***************************************************************/
/*! exports provided: SeriesFamily */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeriesFamily", function() { return SeriesFamily; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/**
 * DevExtreme (esm/viz/core/series_family.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var {
    round: round,
    abs: abs,
    pow: pow,
    sqrt: sqrt
} = Math;
var _min = Math.min;
var DEFAULT_BAR_GROUP_PADDING = .3;

function validateBarPadding(barPadding) {
    return barPadding < 0 || barPadding > 1 ? void 0 : barPadding
}

function validateBarGroupPadding(barGroupPadding) {
    return barGroupPadding < 0 || barGroupPadding > 1 ? DEFAULT_BAR_GROUP_PADDING : barGroupPadding
}

function isStackExist(series, arg) {
    return series.some((function(s) {
        return !s.getOptions().ignoreEmptyPoints || s.getPointsByArg(arg, true).some((function(point) {
            return point.hasValue()
        }))
    }))
}

function correctStackCoordinates(series, currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback) {
    series.forEach((function(series) {
        var stackIndex = seriesStackIndexCallback(currentStacks.indexOf(stack), currentStacks.length);
        var points = series.getPointsByArg(arg, true);
        var barPadding = validateBarPadding(series.getOptions().barPadding);
        var barWidth = series.getOptions().barWidth;
        var offset = getOffset(stackIndex, parameters);
        var width = parameters.width;
        var extraParameters;
        if (-1 === stackIndex) {
            return
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(barPadding) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(barWidth)) {
            extraParameters = calculateParams(barsArea, currentStacks.length, 1 - barPadding, barWidth);
            width = extraParameters.width;
            if (!series.getBarOverlapGroup()) {
                offset = getOffset(stackIndex, extraParameters)
            }
        }
        correctPointCoordinates(points, width, offset)
    }))
}

function getStackName(series) {
    return series.getStackName() || series.getBarOverlapGroup()
}

function adjustBarSeriesDimensionsCore(series, options, seriesStackIndexCallback) {
    var _series$, _series$2;
    var commonStacks = [];
    var allArguments = [];
    var seriesInStacks = {};
    var barGroupWidth = options.barGroupWidth;
    var argumentAxis = null === (_series$ = series[0]) || void 0 === _series$ ? void 0 : _series$.getArgumentAxis();
    var interval;
    if (null !== (_series$2 = series[0]) && void 0 !== _series$2 && _series$2.useAggregation()) {
        var _series$3;
        var isDateArgAxis = "datetime" === (null === (_series$3 = series[0]) || void 0 === _series$3 ? void 0 : _series$3.argumentType);
        var tickInterval = argumentAxis.getTickInterval();
        var aggregationInterval = argumentAxis.getAggregationInterval();
        tickInterval = isDateArgAxis ? _core_utils_date__WEBPACK_IMPORTED_MODULE_6__["default"].dateToMilliseconds(tickInterval) : tickInterval;
        aggregationInterval = isDateArgAxis ? _core_utils_date__WEBPACK_IMPORTED_MODULE_6__["default"].dateToMilliseconds(aggregationInterval) : aggregationInterval;
        interval = aggregationInterval < tickInterval ? aggregationInterval : tickInterval
    }
    interval = null === argumentAxis || void 0 === argumentAxis ? void 0 : argumentAxis.getTranslator().getInterval(interval);
    var barsArea = barGroupWidth ? interval > barGroupWidth ? barGroupWidth : interval : interval * (1 - validateBarGroupPadding(options.barGroupPadding));
    series.forEach((function(s, i) {
        var stackName = getStackName(s) || i.toString();
        var argument;
        for (argument in s.pointsByArgument) {
            if (-1 === allArguments.indexOf(argument.valueOf())) {
                allArguments.push(argument.valueOf())
            }
        }
        if (-1 === commonStacks.indexOf(stackName)) {
            commonStacks.push(stackName);
            seriesInStacks[stackName] = []
        }
        seriesInStacks[stackName].push(s)
    }));
    allArguments.forEach((function(arg) {
        var currentStacks = commonStacks.reduce((stacks, stack) => {
            if (isStackExist(seriesInStacks[stack], arg)) {
                stacks.push(stack)
            }
            return stacks
        }, []);
        var parameters = calculateParams(barsArea, currentStacks.length);
        commonStacks.forEach(stack => {
            correctStackCoordinates(seriesInStacks[stack], currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback)
        })
    }))
}

function calculateParams(barsArea, count, percentWidth, fixedBarWidth) {
    var spacing;
    var width;
    if (fixedBarWidth) {
        width = _min(fixedBarWidth, barsArea / count);
        spacing = count > 1 ? round((barsArea - round(width) * count) / (count - 1)) : 0
    } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(percentWidth)) {
        width = barsArea * percentWidth / count;
        spacing = count > 1 ? round((barsArea - barsArea * percentWidth) / (count - 1)) : 0
    } else {
        spacing = round(barsArea / count * .2);
        width = (barsArea - spacing * (count - 1)) / count
    }
    return {
        width: width > 1 ? round(width) : 1,
        spacing: spacing,
        middleIndex: count / 2,
        rawWidth: width
    }
}

function getOffset(stackIndex, parameters) {
    var width = parameters.rawWidth < 1 ? parameters.rawWidth : parameters.width;
    return (stackIndex - parameters.middleIndex + .5) * width - (parameters.middleIndex - stackIndex - .5) * parameters.spacing
}

function correctPointCoordinates(points, width, offset) {
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(points, (function(_, point) {
        point.correctCoordinates({
            width: width,
            offset: offset
        })
    }))
}

function getValueType(value) {
    return value >= 0 ? "positive" : "negative"
}

function getVisibleSeries(that) {
    return that.series.filter((function(s) {
        return s.isVisible()
    }))
}

function getAbsStackSumByArg(stackKeepers, stackName, argument) {
    var positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
    var negativeStackValue = -(stackKeepers.negative[stackName] || {})[argument] || 0;
    return positiveStackValue + negativeStackValue
}

function getStackSumByArg(stackKeepers, stackName, argument) {
    var positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
    var negativeStackValue = (stackKeepers.negative[stackName] || {})[argument] || 0;
    return positiveStackValue + negativeStackValue
}

function getSeriesStackIndexCallback(inverted) {
    if (!inverted) {
        return function(index) {
            return index
        }
    } else {
        return function(index, stackCount) {
            return stackCount - index - 1
        }
    }
}

function isInverted(series) {
    return series[0] && series[0].getArgumentAxis().getTranslator().isInverted()
}

function adjustBarSeriesDimensions() {
    var series = getVisibleSeries(this);
    adjustBarSeriesDimensionsCore(series, this._options, getSeriesStackIndexCallback(isInverted(series)))
}

function getFirstValueSign(series) {
    var points = series.getPoints();
    var value;
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        value = point.initialValue && point.initialValue.valueOf();
        if (abs(value) > 0) {
            break
        }
    }
    return Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["sign"])(value)
}

function adjustStackedSeriesValues() {
    var negativesAsZeroes = this._options.negativesAsZeroes;
    var series = getVisibleSeries(this);
    var stackKeepers = {
        positive: {},
        negative: {}
    };
    var holesStack = {
        left: {},
        right: {}
    };
    var lastSeriesInPositiveStack = {};
    var lastSeriesInNegativeStack = {};
    series.forEach((function(singleSeries) {
        var stackName = getStackName(singleSeries);
        var hole = false;
        var stack = getFirstValueSign(singleSeries) < 0 ? lastSeriesInNegativeStack : lastSeriesInPositiveStack;
        singleSeries._prevSeries = stack[stackName];
        stack[stackName] = singleSeries;
        singleSeries.holes = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, holesStack);
        singleSeries.getPoints().forEach((function(point, index, points) {
            var value = point.initialValue && point.initialValue.valueOf();
            var argument = point.argument.valueOf();
            var stacks = value >= 0 ? stackKeepers.positive : stackKeepers.negative;
            var isNotBarSeries = "bar" !== singleSeries.type;
            if (negativesAsZeroes && value < 0) {
                stacks = stackKeepers.positive;
                value = 0;
                point.resetValue()
            }
            stacks[stackName] = stacks[stackName] || {};
            var currentStack = stacks[stackName];
            if (currentStack[argument]) {
                if (isNotBarSeries) {
                    point.correctValue(currentStack[argument])
                }
                currentStack[argument] += value
            } else {
                currentStack[argument] = value;
                if (isNotBarSeries) {
                    point.resetCorrection()
                }
            }
            if (!point.hasValue()) {
                var prevPoint = points[index - 1];
                if (!hole && prevPoint && prevPoint.hasValue()) {
                    argument = prevPoint.argument.valueOf();
                    prevPoint._skipSetRightHole = true;
                    holesStack.right[argument] = (holesStack.right[argument] || 0) + (prevPoint.value.valueOf() - (isFinite(prevPoint.minValue) ? prevPoint.minValue.valueOf() : 0))
                }
                hole = true
            } else if (hole) {
                hole = false;
                holesStack.left[argument] = (holesStack.left[argument] || 0) + (point.value.valueOf() - (isFinite(point.minValue) ? point.minValue.valueOf() : 0));
                point._skipSetLeftHole = true
            }
        }))
    }));
    series.forEach((function(singleSeries) {
        var holes = singleSeries.holes;
        singleSeries.getPoints().forEach((function(point) {
            var argument = point.argument.valueOf();
            point.resetHoles();
            !point._skipSetLeftHole && point.setHole(holes.left[argument] || holesStack.left[argument] && 0, "left");
            !point._skipSetRightHole && point.setHole(holes.right[argument] || holesStack.right[argument] && 0, "right");
            point._skipSetLeftHole = null;
            point._skipSetRightHole = null
        }))
    }));
    this._stackKeepers = stackKeepers;
    series.forEach((function(singleSeries) {
        singleSeries.getPoints().forEach((function(point) {
            var argument = point.argument.valueOf();
            var stackName = getStackName(singleSeries);
            var absTotal = getAbsStackSumByArg(stackKeepers, stackName, argument);
            var total = getStackSumByArg(stackKeepers, stackName, argument);
            point.setPercentValue(absTotal, total, holesStack.left[argument], holesStack.right[argument])
        }))
    }))
}

function updateStackedSeriesValues() {
    var that = this;
    var series = getVisibleSeries(that);
    var stack = that._stackKeepers;
    var stackKeepers = {
        positive: {},
        negative: {}
    };
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(series, (function(_, singleSeries) {
        var minBarSize = singleSeries.getOptions().minBarSize;
        var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
        var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
        var stackName = singleSeries.getStackName();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(singleSeries.getPoints(), (function(index, point) {
            if (!point.hasValue()) {
                return
            }
            var value = point.initialValue && point.initialValue.valueOf();
            var argument = point.argument.valueOf();
            if (that.fullStacked) {
                value = value / getAbsStackSumByArg(stack, stackName, argument) || 0
            }
            var updateValue = valueAxisTranslator.checkMinBarSize(value, minShownBusinessValue, point.value);
            var valueType = getValueType(updateValue);
            var currentStack = stackKeepers[valueType][stackName] = stackKeepers[valueType][stackName] || {};
            if (currentStack[argument]) {
                point.minValue = currentStack[argument];
                currentStack[argument] += updateValue
            } else {
                currentStack[argument] = updateValue
            }
            point.value = currentStack[argument]
        }))
    }));
    if (that.fullStacked) {
        updateFullStackedSeriesValues(series, stackKeepers)
    }
}

function updateFullStackedSeriesValues(series, stackKeepers) {
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(series, (function(_, singleSeries) {
        var stackName = singleSeries.getStackName ? singleSeries.getStackName() : "default";
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(singleSeries.getPoints(), (function(index, point) {
            var stackSum = getAbsStackSumByArg(stackKeepers, stackName, point.argument.valueOf());
            if (0 !== stackSum) {
                point.value = point.value / stackSum;
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(point.minValue)) {
                    point.minValue = point.minValue / stackSum
                }
            }
        }))
    }))
}

function updateBarSeriesValues() {
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(this.series, (function(_, singleSeries) {
        var minBarSize = singleSeries.getOptions().minBarSize;
        var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
        var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
        if (minShownBusinessValue) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(singleSeries.getPoints(), (function(index, point) {
                if (point.hasValue()) {
                    point.value = valueAxisTranslator.checkMinBarSize(point.initialValue, minShownBusinessValue)
                }
            }))
        }
    }))
}

function adjustCandlestickSeriesDimensions() {
    var series = getVisibleSeries(this);
    adjustBarSeriesDimensionsCore(series, {
        barGroupPadding: .3
    }, getSeriesStackIndexCallback(isInverted(series)))
}

function adjustBubbleSeriesDimensions() {
    var series = getVisibleSeries(this);
    if (!series.length) {
        return
    }
    var options = this._options;
    var visibleAreaX = series[0].getArgumentAxis().getVisibleArea();
    var visibleAreaY = series[0].getValueAxis().getVisibleArea();
    var min = _min(visibleAreaX[1] - visibleAreaX[0], visibleAreaY[1] - visibleAreaY[0]);
    var minBubbleArea = pow(options.minBubbleSize, 2);
    var maxBubbleArea = pow(min * options.maxBubbleSize, 2);
    var equalBubbleSize = (min * options.maxBubbleSize + options.minBubbleSize) / 2;
    var minPointSize = 1 / 0;
    var maxPointSize = -1 / 0;
    var pointSize;
    var bubbleArea;
    var sizeProportion;
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(series, (function(_, seriesItem) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(seriesItem.getPoints(), (function(_, point) {
            maxPointSize = maxPointSize > point.size ? maxPointSize : point.size;
            minPointSize = minPointSize < point.size ? minPointSize : point.size
        }))
    }));
    var sizeDispersion = maxPointSize - minPointSize;
    var areaDispersion = abs(maxBubbleArea - minBubbleArea);
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(series, (function(_, seriesItem) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(seriesItem.getPoints(), (function(_, point) {
            if (maxPointSize === minPointSize) {
                pointSize = round(equalBubbleSize)
            } else {
                sizeProportion = abs(point.size - minPointSize) / sizeDispersion;
                bubbleArea = areaDispersion * sizeProportion + minBubbleArea;
                pointSize = round(sqrt(bubbleArea))
            }
            point.correctCoordinates(pointSize)
        }))
    }))
}
function SeriesFamily(options) {
    this.type = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeEnum"])(options.type);
    this.pane = options.pane;
    this.series = [];
    this.updateOptions(options);
    switch (this.type) {
        case "bar":
            this.adjustSeriesDimensions = adjustBarSeriesDimensions;
            this.updateSeriesValues = updateBarSeriesValues;
            this.adjustSeriesValues = adjustStackedSeriesValues;
            break;
        case "rangebar":
            this.adjustSeriesDimensions = adjustBarSeriesDimensions;
            break;
        case "fullstackedbar":
            this.fullStacked = true;
            this.adjustSeriesDimensions = adjustBarSeriesDimensions;
            this.adjustSeriesValues = adjustStackedSeriesValues;
            this.updateSeriesValues = updateStackedSeriesValues;
            break;
        case "stackedbar":
            this.adjustSeriesDimensions = adjustBarSeriesDimensions;
            this.adjustSeriesValues = adjustStackedSeriesValues;
            this.updateSeriesValues = updateStackedSeriesValues;
            break;
        case "fullstackedarea":
        case "fullstackedline":
        case "fullstackedspline":
        case "fullstackedsplinearea":
            this.fullStacked = true;
            this.adjustSeriesValues = adjustStackedSeriesValues;
            break;
        case "stackedarea":
        case "stackedsplinearea":
        case "stackedline":
        case "stackedspline":
            this.adjustSeriesValues = adjustStackedSeriesValues;
            break;
        case "candlestick":
        case "stock":
            this.adjustSeriesDimensions = adjustCandlestickSeriesDimensions;
            break;
        case "bubble":
            this.adjustSeriesDimensions = adjustBubbleSeriesDimensions
    }
}
SeriesFamily.prototype = {
    constructor: SeriesFamily,
    adjustSeriesDimensions: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    adjustSeriesValues: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    updateSeriesValues: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    updateOptions: function(options) {
        this._options = options
    },
    dispose: function() {
        this.series = null
    },
    add: function(series) {
        var type = this.type;
        this.series = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["map"])(series, singleSeries => singleSeries.type === type ? singleSeries : null)
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/translators/category_translator.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/translators/category_translator.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/**
 * DevExtreme (esm/viz/translators/category_translator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var round = Math.round;

function getValue(value) {
    return value
}
/* harmony default export */ __webpack_exports__["default"] = ({
    translate: function(category, directionOffset) {
        var canvasOptions = this._canvasOptions;
        var categoryIndex = this._categoriesToPoints[null === category || void 0 === category ? void 0 : category.valueOf()];
        var specialValue = this.translateSpecialCase(category);
        var startPointIndex = canvasOptions.startPointIndex || 0;
        var stickInterval = this._options.stick ? 0 : .5;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(specialValue)) {
            return round(specialValue)
        }
        if (!categoryIndex && 0 !== categoryIndex) {
            return null
        }
        directionOffset = directionOffset || 0;
        var stickDelta = categoryIndex + stickInterval - startPointIndex + .5 * directionOffset;
        return round(this._calculateProjection(canvasOptions.interval * stickDelta))
    },
    getInterval: function() {
        return this._canvasOptions.interval
    },
    getEventScale: function(zoomEvent) {
        var scale = zoomEvent.deltaScale || 1;
        return 1 - (1 - scale) / (.75 + this.visibleCategories.length / this._categories.length)
    },
    zoom: function(translate, scale) {
        var categories = this._categories;
        var canvasOptions = this._canvasOptions;
        var stick = this._options.stick;
        var invert = canvasOptions.invert;
        var interval = canvasOptions.interval * scale;
        var translateCategories = translate / interval;
        var visibleCount = (this.visibleCategories || []).length;
        var startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + translateCategories + .5);
        var categoriesLength = parseInt(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_1__["adjust"])(canvasOptions.canvasLength / interval) + (stick ? 1 : 0)) || 1;
        var endCategoryIndex;
        if (invert) {
            startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + visibleCount - translateCategories + .5) - categoriesLength
        }
        if (startCategoryIndex < 0) {
            startCategoryIndex = 0
        }
        endCategoryIndex = startCategoryIndex + categoriesLength;
        if (endCategoryIndex > categories.length) {
            endCategoryIndex = categories.length;
            startCategoryIndex = endCategoryIndex - categoriesLength;
            if (startCategoryIndex < 0) {
                startCategoryIndex = 0
            }
        }
        var newVisibleCategories = categories.slice(parseInt(startCategoryIndex), parseInt(endCategoryIndex));
        var newInterval = this._getDiscreteInterval(newVisibleCategories.length, canvasOptions);
        scale = newInterval / canvasOptions.interval;
        translate = this.translate(!invert ? newVisibleCategories[0] : newVisibleCategories[newVisibleCategories.length - 1]) * scale - (canvasOptions.startPoint + (stick ? 0 : newInterval / 2));
        return {
            min: newVisibleCategories[0],
            max: newVisibleCategories[newVisibleCategories.length - 1],
            translate: translate,
            scale: scale
        }
    },
    getMinScale: function(zoom) {
        var canvasOptions = this._canvasOptions;
        var categoriesLength = (this.visibleCategories || this._categories).length;
        categoriesLength += (parseInt(.1 * categoriesLength) || 1) * (zoom ? -2 : 2);
        return canvasOptions.canvasLength / (Math.max(categoriesLength, 1) * canvasOptions.interval)
    },
    getScale: function(min, max) {
        var canvasOptions = this._canvasOptions;
        var visibleArea = this.getCanvasVisibleArea();
        var stickOffset = !this._options.stick && 1;
        var minPoint = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(min) ? this.translate(min, -stickOffset) : null;
        var maxPoint = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(max) ? this.translate(max, +stickOffset) : null;
        if (null === minPoint) {
            minPoint = canvasOptions.invert ? visibleArea.max : visibleArea.min
        }
        if (null === maxPoint) {
            maxPoint = canvasOptions.invert ? visibleArea.min : visibleArea.max
        }
        return this.canvasLength / Math.abs(maxPoint - minPoint)
    },
    isValid: function(value) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value) ? this._categoriesToPoints[value.valueOf()] >= 0 : false
    },
    getCorrectValue: getValue,
    to: function(value, direction) {
        var canvasOptions = this._canvasOptions;
        var categoryIndex = this._categoriesToPoints[null === value || void 0 === value ? void 0 : value.valueOf()];
        var startPointIndex = canvasOptions.startPointIndex || 0;
        var stickDelta = categoryIndex + (this._options.stick ? 0 : .5) - startPointIndex + (this._businessRange.invert ? -1 : 1) * direction * .5;
        return round(this._calculateProjection(canvasOptions.interval * stickDelta))
    },
    from: function(position) {
        var direction = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var canvasOptions = this._canvasOptions;
        var startPoint = canvasOptions.startPoint;
        var categories = this.visibleCategories || this._categories;
        var categoriesLength = categories.length;
        var stickInterval = this._options.stick ? .5 : 0;
        var result = round((position - startPoint) / canvasOptions.interval + stickInterval - .5 - .5 * direction);
        if (result >= categoriesLength) {
            result = categoriesLength - 1
        }
        if (result < 0) {
            result = 0
        }
        if (canvasOptions.invert) {
            result = categoriesLength - result - 1
        }
        return categories[result]
    },
    _add: function() {
        return NaN
    },
    toValue: getValue,
    isValueProlonged: true,
    getRangeByMinZoomValue(minZoom, visualRange) {
        var categories = this._categories;
        var minVisibleIndex = categories.indexOf(visualRange.minVisible);
        var maxVisibleIndex = categories.indexOf(visualRange.maxVisible);
        var startIndex = minVisibleIndex + minZoom - 1;
        var endIndex = maxVisibleIndex - minZoom + 1;
        if (categories[startIndex]) {
            return [visualRange.minVisible, categories[startIndex]]
        } else {
            return [categories[endIndex], visualRange.maxVisible]
        }
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/translators/datetime_translator.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/translators/datetime_translator.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/**
 * DevExtreme (esm/viz/translators/datetime_translator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


function parse(value) {
    return null !== value ? new Date(value) : value
}
/* harmony default export */ __webpack_exports__["default"] = ({
    fromValue: parse,
    toValue: parse,
    _add: _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].addDateInterval,
    convert: _core_utils_date__WEBPACK_IMPORTED_MODULE_0__["default"].dateToMilliseconds
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/translators/interval_translator.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/translators/interval_translator.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/**
 * DevExtreme (esm/viz/translators/interval_translator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var floor = Math.floor;

/* harmony default export */ __webpack_exports__["default"] = ({
    _intervalize: function(value, interval) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value)) {
            return
        }
        if ("datetime" === this._businessRange.dataType) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(value)) {
                value = new Date(value)
            } else {
                value = new Date(value.getTime())
            }
            value = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].correctDateWithUnitBeginning(value, interval, null, this._options.firstDayOfWeek)
        } else {
            value = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_2__["adjust"])(floor(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_2__["adjust"])(value / interval)) * interval, interval)
        }
        return value
    },
    translate: function(bp, direction, interval) {
        var specialValue = this.translateSpecialCase(bp);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(specialValue)) {
            return Math.round(specialValue)
        }
        interval = interval || this._options.interval;
        if (!this.isValid(bp, interval)) {
            return null
        }
        return this.to(bp, direction, interval)
    },
    getInterval: function() {
        return Math.round(this._canvasOptions.ratioOfCanvasRange * (this._businessRange.interval || Math.abs(this._canvasOptions.rangeMax - this._canvasOptions.rangeMin)))
    },
    zoom: function() {},
    getMinScale: function() {},
    getScale: function() {},
    _parse: function(value) {
        return "datetime" === this._businessRange.dataType ? new Date(value) : Number(value)
    },
    fromValue: function(value) {
        return this._parse(value)
    },
    toValue: function(value) {
        return this._parse(value)
    },
    isValid: function(value, interval) {
        var co = this._canvasOptions;
        var rangeMin = co.rangeMin;
        var rangeMax = co.rangeMax;
        interval = interval || this._options.interval;
        if (null === value || isNaN(value)) {
            return false
        }
        value = "datetime" === this._businessRange.dataType && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(value) ? new Date(value) : value;
        if (interval !== this._options.interval) {
            rangeMin = this._intervalize(rangeMin, interval);
            rangeMax = this._intervalize(rangeMax, interval)
        }
        if (value.valueOf() < rangeMin || value.valueOf() >= _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].addInterval(rangeMax, interval)) {
            return false
        }
        return true
    },
    to: function(bp, direction, interval) {
        interval = interval || this._options.interval;
        var v1 = this._intervalize(bp, interval);
        var v2 = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].addInterval(v1, interval);
        var res = this._to(v1);
        var p2 = this._to(v2);
        if (!direction) {
            res = floor((res + p2) / 2)
        } else if (direction > 0) {
            res = p2
        }
        return res
    },
    _to: function(value) {
        var co = this._canvasOptions;
        var rMin = co.rangeMinVisible;
        var rMax = co.rangeMaxVisible;
        var offset = value - rMin;
        if (value < rMin) {
            offset = 0
        } else if (value > rMax) {
            offset = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].addInterval(rMax, this._options.interval) - rMin
        }
        return this._conversionValue(this._calculateProjection(offset * this._canvasOptions.ratioOfCanvasRange))
    },
    from: function(position, direction) {
        var origInterval = this._options.interval;
        var interval = origInterval;
        var co = this._canvasOptions;
        var rMin = co.rangeMinVisible;
        var rMax = co.rangeMaxVisible;
        var value;
        if ("datetime" === this._businessRange.dataType) {
            interval = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].dateToMilliseconds(origInterval)
        }
        value = this._calculateUnProjection((position - this._canvasOptions.startPoint) / this._canvasOptions.ratioOfCanvasRange);
        value = this._intervalize(_core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].addInterval(value, interval / 2, direction > 0), origInterval);
        if (value < rMin) {
            value = rMin
        } else if (value > rMax) {
            value = rMax
        }
        return value
    },
    _add: function() {
        return NaN
    },
    isValueProlonged: true
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/translators/logarithmic_translator.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/translators/logarithmic_translator.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/translators/logarithmic_translator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    fromValue: function(value) {
        return null !== value ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLogExt"])(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value
    },
    toValue: function(value) {
        return null !== value ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["raiseToExt"])(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value
    },
    getMinBarSize: function(minBarSize) {
        var visibleArea = this.getCanvasVisibleArea();
        var minValue = this.from(visibleArea.min + minBarSize);
        var canvasOptions = this._canvasOptions;
        return Math.pow(canvasOptions.base, canvasOptions.rangeMinVisible + this.fromValue(this.from(visibleArea.min)) - this.fromValue(!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(minValue) ? this.from(visibleArea.max) : minValue))
    },
    checkMinBarSize: function(initialValue, minShownValue, stackValue) {
        var canvasOptions = this._canvasOptions;
        var prevValue = stackValue - initialValue;
        var baseMethod = this.constructor.prototype.checkMinBarSize;
        var minBarSize;
        var updateValue;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(minShownValue) && prevValue > 0) {
            minBarSize = baseMethod(this.fromValue(stackValue / prevValue), this.fromValue(minShownValue) - canvasOptions.rangeMinVisible);
            updateValue = Math.pow(canvasOptions.base, this.fromValue(prevValue) + minBarSize) - prevValue
        } else {
            updateValue = baseMethod(initialValue, minShownValue)
        }
        return updateValue
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/translators/translator2d.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/translators/translator2d.js ***!
  \*********************************************************************/
/*! exports provided: Translator2D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Translator2D", function() { return _Translator2d; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./range */ "./node_modules/devextreme/esm/viz/translators/range.js");
/* harmony import */ var _category_translator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category_translator */ "./node_modules/devextreme/esm/viz/translators/category_translator.js");
/* harmony import */ var _interval_translator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interval_translator */ "./node_modules/devextreme/esm/viz/translators/interval_translator.js");
/* harmony import */ var _datetime_translator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datetime_translator */ "./node_modules/devextreme/esm/viz/translators/datetime_translator.js");
/* harmony import */ var _logarithmic_translator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logarithmic_translator */ "./node_modules/devextreme/esm/viz/translators/logarithmic_translator.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/**
 * DevExtreme (esm/viz/translators/translator2d.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */











var _abs = Math.abs;
var CANVAS_PROP = ["width", "height", "left", "top", "bottom", "right"];
var dummyTranslator = {
    to(value) {
        var coord = this._canvasOptions.startPoint + (this._options.conversionValue ? value : Math.round(value));
        return coord > this._canvasOptions.endPoint ? this._canvasOptions.endPoint : coord
    },
    from(value) {
        return value - this._canvasOptions.startPoint
    }
};
var validateCanvas = function(canvas) {
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(CANVAS_PROP, (function(_, prop) {
        canvas[prop] = parseInt(canvas[prop]) || 0
    }));
    return canvas
};
var makeCategoriesToPoints = function(categories) {
    var categoriesToPoints = {};
    categories.forEach((function(item, i) {
        categoriesToPoints[item.valueOf()] = i
    }));
    return categoriesToPoints
};
var validateBusinessRange = function(businessRange) {
    if (!(businessRange instanceof _range__WEBPACK_IMPORTED_MODULE_2__["Range"])) {
        businessRange = new _range__WEBPACK_IMPORTED_MODULE_2__["Range"](businessRange)
    }

    function validate(valueSelector, baseValueSelector) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(businessRange[valueSelector]) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(businessRange[baseValueSelector])) {
            businessRange[valueSelector] = businessRange[baseValueSelector]
        }
    }
    validate("minVisible", "min");
    validate("maxVisible", "max");
    return businessRange
};

function prepareBreaks(breaks, range) {
    var transform = "logarithmic" === range.axisType ? function(value) {
        return Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getLogExt"])(value, range.base)
    } : function(value) {
        return value
    };
    var array = [];
    var br;
    var transformFrom;
    var transformTo;
    var i;
    var length = breaks.length;
    var sum = 0;
    for (i = 0; i < length; i++) {
        br = breaks[i];
        transformFrom = transform(br.from);
        transformTo = transform(br.to);
        sum += transformTo - transformFrom;
        array.push({
            trFrom: transformFrom,
            trTo: transformTo,
            from: br.from,
            to: br.to,
            length: sum,
            cumulativeWidth: br.cumulativeWidth
        })
    }
    return array
}

function getCanvasBounds(range) {
    var min = range.min;
    var max = range.max;
    var minVisible = range.minVisible;
    var maxVisible = range.maxVisible;
    var isLogarithmic = "logarithmic" === range.axisType;
    if (isLogarithmic) {
        maxVisible = Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getLogExt"])(maxVisible, range.base, range.allowNegatives, range.linearThreshold);
        minVisible = Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getLogExt"])(minVisible, range.base, range.allowNegatives, range.linearThreshold);
        min = Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getLogExt"])(min, range.base, range.allowNegatives, range.linearThreshold);
        max = Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getLogExt"])(max, range.base, range.allowNegatives, range.linearThreshold)
    }
    return {
        base: range.base,
        rangeMin: min,
        rangeMax: max,
        rangeMinVisible: minVisible,
        rangeMaxVisible: maxVisible
    }
}

function getCheckingMethodsAboutBreaks(inverted) {
    return {
        isStartSide: !inverted ? function(pos, breaks, start, end) {
            return pos < breaks[0][start]
        } : function(pos, breaks, start, end) {
            return pos <= breaks[breaks.length - 1][end]
        },
        isEndSide: !inverted ? function(pos, breaks, start, end) {
            return pos >= breaks[breaks.length - 1][end]
        } : function(pos, breaks, start, end) {
            return pos > breaks[0][start]
        },
        isInBreak: !inverted ? function(pos, br, start, end) {
            return pos >= br[start] && pos < br[end]
        } : function(pos, br, start, end) {
            return pos > br[end] && pos <= br[start]
        },
        isBetweenBreaks: !inverted ? function(pos, br, prevBreak, start, end) {
            return pos < br[start] && pos >= prevBreak[end]
        } : function(pos, br, prevBreak, start, end) {
            return pos >= br[end] && pos < prevBreak[start]
        },
        getLength: !inverted ? function(br) {
            return br.length
        } : function(br, lastBreak) {
            return lastBreak.length - br.length
        },
        getBreaksSize: !inverted ? function(br) {
            return br.cumulativeWidth
        } : function(br, lastBreak) {
            return lastBreak.cumulativeWidth - br.cumulativeWidth
        }
    }
}
var _Translator2d = function(businessRange, canvas, options) {
    this.update(businessRange, canvas, options)
};
_Translator2d.prototype = {
    constructor: _Translator2d,
    reinit: function() {
        var that = this;
        var options = that._options;
        var range = that._businessRange;
        var categories = range.categories || [];
        var script = {};
        var canvasOptions = that._prepareCanvasOptions();
        var visibleCategories = Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getCategoriesInfo"])(categories, range.minVisible, range.maxVisible).categories;
        var categoriesLength = visibleCategories.length;
        if (range.isEmpty()) {
            script = dummyTranslator
        } else {
            switch (range.axisType) {
                case "logarithmic":
                    script = _logarithmic_translator__WEBPACK_IMPORTED_MODULE_6__["default"];
                    break;
                case "semidiscrete":
                    script = _interval_translator__WEBPACK_IMPORTED_MODULE_4__["default"];
                    canvasOptions.ratioOfCanvasRange = canvasOptions.canvasLength / (_core_utils_date__WEBPACK_IMPORTED_MODULE_10__["default"].addInterval(canvasOptions.rangeMaxVisible, options.interval) - canvasOptions.rangeMinVisible);
                    break;
                case "discrete":
                    script = _category_translator__WEBPACK_IMPORTED_MODULE_3__["default"];
                    that._categories = categories;
                    canvasOptions.interval = that._getDiscreteInterval(options.addSpiderCategory ? categoriesLength + 1 : categoriesLength, canvasOptions);
                    that._categoriesToPoints = makeCategoriesToPoints(categories);
                    if (categoriesLength) {
                        canvasOptions.startPointIndex = that._categoriesToPoints[visibleCategories[0].valueOf()];
                        that.visibleCategories = visibleCategories
                    }
                    break;
                default:
                    if ("datetime" === range.dataType) {
                        script = _datetime_translator__WEBPACK_IMPORTED_MODULE_5__["default"]
                    }
            }
        }(that._oldMethods || []).forEach((function(methodName) {
            delete that[methodName]
        }));
        that._oldMethods = Object.keys(script);
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(that, script);
        that._conversionValue = options.conversionValue ? function(value) {
            return value
        } : function(value) {
            return Math.round(value)
        };
        that.sc = {};
        that._checkingMethodsAboutBreaks = [getCheckingMethodsAboutBreaks(false), getCheckingMethodsAboutBreaks(that.isInverted())];
        that._translateBreaks();
        that._calculateSpecialValues()
    },
    _translateBreaks: function() {
        var breaks = this._breaks;
        var size = this._options.breaksSize;
        var i;
        var b;
        var end;
        var length;
        if (void 0 === breaks) {
            return
        }
        for (i = 0, length = breaks.length; i < length; i++) {
            b = breaks[i];
            end = this.translate(b.to);
            b.end = end;
            b.start = !b.gapSize ? !this.isInverted() ? end - size : end + size : end
        }
    },
    _checkValueAboutBreaks: function(breaks, pos, start, end, methods) {
        var i;
        var length;
        var prop = {
            length: 0,
            breaksSize: void 0,
            inBreak: false
        };
        var br;
        var prevBreak;
        var lastBreak = breaks[breaks.length - 1];
        if (methods.isStartSide(pos, breaks, start, end)) {
            return prop
        } else if (methods.isEndSide(pos, breaks, start, end)) {
            return {
                length: lastBreak.length,
                breaksSize: lastBreak.cumulativeWidth,
                inBreak: false
            }
        }
        for (i = 0, length = breaks.length; i < length; i++) {
            br = breaks[i];
            prevBreak = breaks[i - 1];
            if (methods.isInBreak(pos, br, start, end)) {
                prop.inBreak = true;
                prop.break = br;
                break
            }
            if (prevBreak && methods.isBetweenBreaks(pos, br, prevBreak, start, end)) {
                prop = {
                    length: methods.getLength(prevBreak, lastBreak),
                    breaksSize: methods.getBreaksSize(prevBreak, lastBreak),
                    inBreak: false
                };
                break
            }
        }
        return prop
    },
    isInverted: function() {
        return !(this._options.isHorizontal ^ this._businessRange.invert)
    },
    _getDiscreteInterval: function(categoriesLength, canvasOptions) {
        var correctedCategoriesCount = categoriesLength - (this._options.stick ? 1 : 0);
        return correctedCategoriesCount > 0 ? canvasOptions.canvasLength / correctedCategoriesCount : canvasOptions.canvasLength
    },
    _prepareCanvasOptions() {
        var businessRange = this._businessRange;
        var canvasOptions = this._canvasOptions = getCanvasBounds(businessRange);
        var canvas = this._canvas;
        var breaks = this._breaks;
        var length;
        canvasOptions.startPadding = canvas.startPadding || 0;
        canvasOptions.endPadding = canvas.endPadding || 0;
        if (this._options.isHorizontal) {
            canvasOptions.startPoint = canvas.left + canvasOptions.startPadding;
            length = canvas.width;
            canvasOptions.endPoint = canvas.width - canvas.right - canvasOptions.endPadding;
            canvasOptions.invert = businessRange.invert
        } else {
            canvasOptions.startPoint = canvas.top + canvasOptions.startPadding;
            length = canvas.height;
            canvasOptions.endPoint = canvas.height - canvas.bottom - canvasOptions.endPadding;
            canvasOptions.invert = !businessRange.invert
        }
        this.canvasLength = canvasOptions.canvasLength = canvasOptions.endPoint - canvasOptions.startPoint;
        canvasOptions.rangeDoubleError = Math.pow(10, Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getPower"])(canvasOptions.rangeMax - canvasOptions.rangeMin) - Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["getPower"])(length) - 2);
        canvasOptions.ratioOfCanvasRange = canvasOptions.canvasLength / (canvasOptions.rangeMaxVisible - canvasOptions.rangeMinVisible);
        if (void 0 !== breaks) {
            canvasOptions.ratioOfCanvasRange = (canvasOptions.canvasLength - breaks[breaks.length - 1].cumulativeWidth) / (canvasOptions.rangeMaxVisible - canvasOptions.rangeMinVisible - breaks[breaks.length - 1].length)
        }
        return canvasOptions
    },
    updateCanvas: function(canvas) {
        this._canvas = validateCanvas(canvas);
        this.reinit()
    },
    updateBusinessRange: function(businessRange) {
        var breaks = businessRange.breaks || [];
        this._userBreaks = businessRange.userBreaks || [];
        this._businessRange = validateBusinessRange(businessRange);
        this._breaks = breaks.length ? prepareBreaks(breaks, this._businessRange) : void 0;
        this.reinit()
    },
    update: function(businessRange, canvas, options) {
        this._options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(this._options || {}, options);
        this._canvas = validateCanvas(canvas);
        this.updateBusinessRange(businessRange)
    },
    getBusinessRange: function() {
        return this._businessRange
    },
    getEventScale: function(zoomEvent) {
        return zoomEvent.deltaScale || 1
    },
    getCanvasVisibleArea: function() {
        return {
            min: this._canvasOptions.startPoint,
            max: this._canvasOptions.endPoint
        }
    },
    _calculateSpecialValues: function() {
        var canvasOptions = this._canvasOptions;
        var startPoint = canvasOptions.startPoint - canvasOptions.startPadding;
        var endPoint = canvasOptions.endPoint + canvasOptions.endPadding;
        var range = this._businessRange;
        var minVisible = range.minVisible;
        var maxVisible = range.maxVisible;
        var canvas_position_center_middle = startPoint + canvasOptions.canvasLength / 2;
        var canvas_position_default;
        if (minVisible < 0 && maxVisible > 0 && minVisible !== maxVisible) {
            canvas_position_default = this.translate(0, 1)
        }
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(canvas_position_default)) {
            var invert = range.invert ^ (minVisible < 0 && maxVisible <= 0);
            if (this._options.isHorizontal) {
                canvas_position_default = invert ? endPoint : startPoint
            } else {
                canvas_position_default = invert ? startPoint : endPoint
            }
        }
        this.sc = {
            canvas_position_default: canvas_position_default,
            canvas_position_left: startPoint,
            canvas_position_top: startPoint,
            canvas_position_center: canvas_position_center_middle,
            canvas_position_middle: canvas_position_center_middle,
            canvas_position_right: endPoint,
            canvas_position_bottom: endPoint,
            canvas_position_start: canvasOptions.invert ? endPoint : startPoint,
            canvas_position_end: canvasOptions.invert ? startPoint : endPoint
        }
    },
    translateSpecialCase(value) {
        return this.sc[value]
    },
    _calculateProjection: function(distance) {
        var canvasOptions = this._canvasOptions;
        return canvasOptions.invert ? canvasOptions.endPoint - distance : canvasOptions.startPoint + distance
    },
    _calculateUnProjection: function(distance) {
        var canvasOptions = this._canvasOptions;
        "datetime" === this._businessRange.dataType && (distance = Math.round(distance));
        return canvasOptions.invert ? canvasOptions.rangeMaxVisible.valueOf() - distance : canvasOptions.rangeMinVisible.valueOf() + distance
    },
    getMinBarSize: function(minBarSize) {
        var visibleArea = this.getCanvasVisibleArea();
        var minValue = this.from(visibleArea.min + minBarSize);
        return _abs(this.from(visibleArea.min) - (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(minValue) ? this.from(visibleArea.max) : minValue))
    },
    checkMinBarSize: function(value, minShownValue, stackValue) {
        return _abs(value) < minShownValue ? value >= 0 ? minShownValue : -minShownValue : value
    },
    translate(bp, direction) {
        var specialValue = this.translateSpecialCase(bp);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(specialValue)) {
            return Math.round(specialValue)
        }
        if (isNaN(bp)) {
            return null
        }
        return this.to(bp, direction)
    },
    getInterval: function(interval) {
        var _interval;
        var canvasOptions = this._canvasOptions;
        interval = null !== (_interval = interval) && void 0 !== _interval ? _interval : this._businessRange.interval;
        if (interval) {
            return Math.round(canvasOptions.ratioOfCanvasRange * interval)
        }
        return Math.round(canvasOptions.endPoint - canvasOptions.startPoint)
    },
    zoom(translate, scale, wholeRange) {
        var canvasOptions = this._canvasOptions;
        if (canvasOptions.rangeMinVisible.valueOf() === canvasOptions.rangeMaxVisible.valueOf() && 0 !== translate) {
            return this.zoomZeroLengthRange(translate, scale)
        }
        var startPoint = canvasOptions.startPoint;
        var endPoint = canvasOptions.endPoint;
        var isInverted = this.isInverted();
        var newStart = (startPoint + translate) / scale;
        var newEnd = (endPoint + translate) / scale;
        wholeRange = wholeRange || {};
        var minPoint = this.to(isInverted ? wholeRange.endValue : wholeRange.startValue);
        var maxPoint = this.to(isInverted ? wholeRange.startValue : wholeRange.endValue);
        var min;
        var max;
        if (minPoint > newStart) {
            newEnd -= newStart - minPoint;
            newStart = minPoint;
            min = isInverted ? wholeRange.endValue : wholeRange.startValue
        }
        if (maxPoint < newEnd) {
            newStart -= newEnd - maxPoint;
            newEnd = maxPoint;
            max = isInverted ? wholeRange.startValue : wholeRange.endValue
        }
        if (maxPoint - minPoint < newEnd - newStart) {
            newStart = minPoint;
            newEnd = maxPoint
        }
        translate = (endPoint - startPoint) * newStart / (newEnd - newStart) - startPoint;
        scale = (startPoint + translate) / newStart || 1;
        min = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(min) ? min : Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_9__["adjust"])(this.from(newStart, 1));
        max = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(max) ? max : Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_9__["adjust"])(this.from(newEnd, -1));
        if (scale <= 1) {
            min = this._correctValueAboutBreaks(min, 1 === scale ? translate : -1);
            max = this._correctValueAboutBreaks(max, 1 === scale ? translate : 1)
        }
        if (min > max) {
            min = min > wholeRange.endValue ? wholeRange.endValue : min;
            max = max < wholeRange.startValue ? wholeRange.startValue : max
        } else {
            min = min < wholeRange.startValue ? wholeRange.startValue : min;
            max = max > wholeRange.endValue ? wholeRange.endValue : max
        }
        return {
            min: min,
            max: max,
            translate: Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_9__["adjust"])(translate),
            scale: Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_9__["adjust"])(scale)
        }
    },
    _correctValueAboutBreaks(value, direction) {
        var br = this._userBreaks.filter(br => value >= br.from && value <= br.to);
        if (br.length) {
            return direction > 0 ? br[0].to : br[0].from
        } else {
            return value
        }
    },
    zoomZeroLengthRange(translate, scale) {
        var canvasOptions = this._canvasOptions;
        var min = canvasOptions.rangeMin;
        var max = canvasOptions.rangeMax;
        var correction = (max.valueOf() !== min.valueOf() ? max.valueOf() - min.valueOf() : _abs(canvasOptions.rangeMinVisible.valueOf() - min.valueOf())) / canvasOptions.canvasLength;
        var isDateTime = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDate"])(max) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDate"])(min);
        var isLogarithmic = "logarithmic" === this._businessRange.axisType;
        var newMin = canvasOptions.rangeMinVisible.valueOf() - correction;
        var newMax = canvasOptions.rangeMaxVisible.valueOf() + correction;
        newMin = isLogarithmic ? Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_9__["adjust"])(Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["raiseToExt"])(newMin, canvasOptions.base)) : isDateTime ? new Date(newMin) : newMin;
        newMax = isLogarithmic ? Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_9__["adjust"])(Object(_core_utils__WEBPACK_IMPORTED_MODULE_7__["raiseToExt"])(newMax, canvasOptions.base)) : isDateTime ? new Date(newMax) : newMax;
        return {
            min: newMin,
            max: newMax,
            translate: translate,
            scale: scale
        }
    },
    getMinScale: function(zoom) {
        var {
            dataType: dataType,
            interval: interval
        } = this._businessRange;
        if ("datetime" === dataType && 1 === interval) {
            return this.getDateTimeMinScale(zoom)
        }
        return zoom ? 1.1 : .9
    },
    getDateTimeMinScale(zoom) {
        var canvasOptions = this._canvasOptions;
        var length = canvasOptions.canvasLength / canvasOptions.ratioOfCanvasRange;
        length += (parseInt(.1 * length) || 1) * (zoom ? -2 : 2);
        return canvasOptions.canvasLength / (Math.max(length, 1) * canvasOptions.ratioOfCanvasRange)
    },
    getScale: function(val1, val2) {
        var canvasOptions = this._canvasOptions;
        if (canvasOptions.rangeMax === canvasOptions.rangeMin) {
            return 1
        }
        val1 = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(val1) ? this.fromValue(val1) : canvasOptions.rangeMin;
        val2 = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(val2) ? this.fromValue(val2) : canvasOptions.rangeMax;
        return (canvasOptions.rangeMax - canvasOptions.rangeMin) / Math.abs(val1 - val2)
    },
    isValid: function(value) {
        var co = this._canvasOptions;
        value = this.fromValue(value);
        return null !== value && !isNaN(value) && value.valueOf() + co.rangeDoubleError >= co.rangeMin && value.valueOf() - co.rangeDoubleError <= co.rangeMax
    },
    getCorrectValue: function(value, direction) {
        var breaks = this._breaks;
        var prop;
        value = this.fromValue(value);
        if (this._breaks) {
            prop = this._checkValueAboutBreaks(breaks, value, "trFrom", "trTo", this._checkingMethodsAboutBreaks[0]);
            if (true === prop.inBreak) {
                return this.toValue(direction > 0 ? prop.break.trTo : prop.break.trFrom)
            }
        }
        return this.toValue(value)
    },
    to: function(bp, direction) {
        var range = this.getBusinessRange();
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(range.maxVisible) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(range.minVisible) && range.maxVisible.valueOf() === range.minVisible.valueOf()) {
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(bp) || range.maxVisible.valueOf() !== bp.valueOf()) {
                return null
            }
            return this.translateSpecialCase(0 === bp && this._options.shiftZeroValue ? "canvas_position_default" : "canvas_position_middle")
        }
        bp = this.fromValue(bp);
        var canvasOptions = this._canvasOptions;
        var breaks = this._breaks;
        var prop = {
            length: 0
        };
        var commonBreakSize = 0;
        if (void 0 !== breaks) {
            prop = this._checkValueAboutBreaks(breaks, bp, "trFrom", "trTo", this._checkingMethodsAboutBreaks[0]);
            commonBreakSize = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(prop.breaksSize) ? prop.breaksSize : 0
        }
        if (true === prop.inBreak) {
            if (direction > 0) {
                return prop.break.start
            } else if (direction < 0) {
                return prop.break.end
            } else {
                return null
            }
        }
        return this._conversionValue(this._calculateProjection((bp - canvasOptions.rangeMinVisible - prop.length) * canvasOptions.ratioOfCanvasRange + commonBreakSize))
    },
    from: function(pos, direction) {
        var breaks = this._breaks;
        var prop = {
            length: 0
        };
        var canvasOptions = this._canvasOptions;
        var startPoint = canvasOptions.startPoint;
        var commonBreakSize = 0;
        if (void 0 !== breaks) {
            prop = this._checkValueAboutBreaks(breaks, pos, "start", "end", this._checkingMethodsAboutBreaks[1]);
            commonBreakSize = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(prop.breaksSize) ? prop.breaksSize : 0
        }
        if (true === prop.inBreak) {
            if (direction > 0) {
                return this.toValue(prop.break.trTo)
            } else if (direction < 0) {
                return this.toValue(prop.break.trFrom)
            } else {
                return null
            }
        }
        return this.toValue(this._calculateUnProjection((pos - startPoint - commonBreakSize) / canvasOptions.ratioOfCanvasRange + prop.length))
    },
    isValueProlonged: false,
    getRange: function() {
        return [this.toValue(this._canvasOptions.rangeMin), this.toValue(this._canvasOptions.rangeMax)]
    },
    getScreenRange: function() {
        return [this._canvasOptions.startPoint, this._canvasOptions.endPoint]
    },
    add: function(value, diff, dir) {
        return this._add(value, diff, (this._businessRange.invert ? -1 : 1) * dir)
    },
    _add: function(value, diff, coeff) {
        return this.toValue(this.fromValue(value) + diff * coeff)
    },
    fromValue: function(value) {
        return null !== value ? Number(value) : null
    },
    toValue: function(value) {
        return null !== value ? Number(value) : null
    },
    ratioOfCanvasRange() {
        return this._canvasOptions.ratioOfCanvasRange
    },
    convert: value => value,
    getRangeByMinZoomValue(minZoom, visualRange) {
        if (visualRange.minVisible + minZoom <= this._businessRange.max) {
            return [visualRange.minVisible, visualRange.minVisible + minZoom]
        } else {
            return [visualRange.maxVisible - minZoom, visualRange.maxVisible]
        }
    }
};



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/utils.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/utils.js ***!
  \**************************************************/
/*! exports provided: prepareSegmentRectPoints, refreshPaths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prepareSegmentRectPoints", function() { return prepareSegmentRectPoints; });
/* harmony import */ var _core_renderers_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/renderers/renderer */ "./node_modules/devextreme/esm/viz/core/renderers/renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "refreshPaths", function() { return _core_renderers_renderer__WEBPACK_IMPORTED_MODULE_0__["refreshPaths"]; });

/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/**
 * DevExtreme (esm/viz/utils.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var prepareSegmentRectPoints = function(left, top, width, height, borderOptions) {
    var maxSW = ~~((width < height ? width : height) / 2);
    var sw = borderOptions.width || 0;
    var newSW = sw < maxSW ? sw : maxSW;
    left += newSW / 2;
    top += newSW / 2;
    width -= newSW;
    height -= newSW;
    var right = left + width;
    var bottom = top + height;
    var points = [];
    var segments = [];
    var segmentSequence;
    var visiblyOpt = 0;
    var prevSegmentVisibility = 0;
    var allSegment = {
        top: [
            [left, top],
            [right, top]
        ],
        right: [
            [right, top],
            [right, bottom]
        ],
        bottom: [
            [right, bottom],
            [left, bottom]
        ],
        left: [
            [left, bottom],
            [left, top]
        ]
    };
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(allSegment, (function(seg) {
        var visibility = !!borderOptions[seg];
        visiblyOpt = 2 * visiblyOpt + ~~visibility
    }));
    switch (visiblyOpt) {
        case 13:
        case 9:
            segmentSequence = ["left", "top", "right", "bottom"];
            break;
        case 11:
            segmentSequence = ["bottom", "left", "top", "right"];
            break;
        default:
            segmentSequence = ["top", "right", "bottom", "left"]
    }
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(segmentSequence, (function(_, seg) {
        var segmentVisibility = !!borderOptions[seg];
        if (!prevSegmentVisibility && segments.length) {
            points.push(segments);
            segments = []
        }
        if (segmentVisibility) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(allSegment[seg].slice(prevSegmentVisibility), (function(_, segment) {
                segments = segments.concat(segment)
            }))
        }
        prevSegmentVisibility = ~~segmentVisibility
    }));
    segments.length && points.push(segments);
    1 === points.length && (points = points[0]);
    return {
        points: points,
        pathType: 15 === visiblyOpt ? "area" : "line"
    }
};



/***/ })

}]);