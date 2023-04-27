(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[77],{

/***/ "./node_modules/devextreme-vue/pie-chart.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme-vue/pie-chart.js ***!
  \**************************************************/
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
exports.DxTooltipBorder = exports.DxTooltip = exports.DxTitle = exports.DxSubtitle = exports.DxSmallValuesGrouping = exports.DxSize = exports.DxShadow = exports.DxSeriesTemplate = exports.DxSeriesBorder = exports.DxSeries = exports.DxSelectionStyle = exports.DxPieChartTitleSubtitle = exports.DxPieChartTitle = exports.DxMargin = exports.DxLoadingIndicator = exports.DxLegendTitleSubtitle = exports.DxLegendTitle = exports.DxLegend = exports.DxLabel = exports.DxImage = exports.DxHoverStyle = exports.DxHatching = exports.DxFormat = exports.DxFont = exports.DxExport = exports.DxConnector = exports.DxCommonSeriesSettings = exports.DxCommonAnnotationSettings = exports.DxBorder = exports.DxArgumentFormat = exports.DxAnnotationBorder = exports.DxAnnotation = exports.DxAnimation = exports.DxAdaptiveLayout = exports.DxPieChart = void 0;
var pie_chart_1 = __importDefault(__webpack_require__(/*! devextreme/viz/pie_chart */ "./node_modules/devextreme/esm/viz/pie_chart.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxPieChart = index_1.createComponent({
    props: {
        adaptiveLayout: Object,
        animation: [Boolean, Object],
        annotations: Array,
        centerTemplate: {},
        commonAnnotationSettings: Object,
        commonSeriesSettings: {},
        customizeAnnotation: Function,
        customizeLabel: Function,
        customizePoint: Function,
        dataSource: {},
        diameter: Number,
        disabled: Boolean,
        elementAttr: Object,
        export: Object,
        innerRadius: Number,
        legend: Object,
        loadingIndicator: Object,
        margin: Object,
        minDiameter: Number,
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
        onTooltipHidden: Function,
        onTooltipShown: Function,
        palette: [Array, String],
        paletteExtensionMode: String,
        pathModified: Boolean,
        pointSelectionMode: String,
        redrawOnResize: Boolean,
        resolveLabelOverlapping: String,
        rtlEnabled: Boolean,
        segmentsDirection: String,
        series: [Array, Object],
        seriesTemplate: Object,
        size: Object,
        sizeGroup: String,
        startAngle: Number,
        theme: String,
        title: [Object, String],
        tooltip: Object,
        type: String
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:adaptiveLayout": null,
        "update:animation": null,
        "update:annotations": null,
        "update:centerTemplate": null,
        "update:commonAnnotationSettings": null,
        "update:commonSeriesSettings": null,
        "update:customizeAnnotation": null,
        "update:customizeLabel": null,
        "update:customizePoint": null,
        "update:dataSource": null,
        "update:diameter": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:export": null,
        "update:innerRadius": null,
        "update:legend": null,
        "update:loadingIndicator": null,
        "update:margin": null,
        "update:minDiameter": null,
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
        "update:onTooltipHidden": null,
        "update:onTooltipShown": null,
        "update:palette": null,
        "update:paletteExtensionMode": null,
        "update:pathModified": null,
        "update:pointSelectionMode": null,
        "update:redrawOnResize": null,
        "update:resolveLabelOverlapping": null,
        "update:rtlEnabled": null,
        "update:segmentsDirection": null,
        "update:series": null,
        "update:seriesTemplate": null,
        "update:size": null,
        "update:sizeGroup": null,
        "update:startAngle": null,
        "update:theme": null,
        "update:title": null,
        "update:tooltip": null,
        "update:type": null,
    },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = pie_chart_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            adaptiveLayout: { isCollectionItem: false, optionName: "adaptiveLayout" },
            animation: { isCollectionItem: false, optionName: "animation" },
            annotation: { isCollectionItem: true, optionName: "annotations" },
            commonAnnotationSettings: { isCollectionItem: false, optionName: "commonAnnotationSettings" },
            commonSeriesSettings: { isCollectionItem: false, optionName: "commonSeriesSettings" },
            export: { isCollectionItem: false, optionName: "export" },
            legend: { isCollectionItem: false, optionName: "legend" },
            loadingIndicator: { isCollectionItem: false, optionName: "loadingIndicator" },
            margin: { isCollectionItem: false, optionName: "margin" },
            pieChartTitle: { isCollectionItem: false, optionName: "title" },
            series: { isCollectionItem: true, optionName: "series" },
            seriesTemplate: { isCollectionItem: false, optionName: "seriesTemplate" },
            size: { isCollectionItem: false, optionName: "size" },
            title: { isCollectionItem: false, optionName: "title" },
            tooltip: { isCollectionItem: false, optionName: "tooltip" }
        };
    }
});
exports.DxPieChart = DxPieChart;
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
        "update:border": null,
        "update:color": null,
        "update:customizeTooltip": null,
        "update:data": null,
        "update:description": null,
        "update:font": null,
        "update:height": null,
        "update:image": null,
        "update:location": null,
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
        border: Object,
        color: String,
        customizeTooltip: Function,
        data: {},
        description: String,
        font: Object,
        height: Number,
        image: [Object, String],
        location: String,
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
var DxBorder = index_2.createConfigurationComponent({
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
exports.DxBorder = DxBorder;
DxBorder.$_optionName = "border";
var DxCommonAnnotationSettings = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:allowDragging": null,
        "update:argument": null,
        "update:arrowLength": null,
        "update:arrowWidth": null,
        "update:border": null,
        "update:color": null,
        "update:customizeTooltip": null,
        "update:data": null,
        "update:description": null,
        "update:font": null,
        "update:height": null,
        "update:image": null,
        "update:location": null,
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
        border: Object,
        color: String,
        customizeTooltip: Function,
        data: {},
        description: String,
        font: Object,
        height: Number,
        image: [Object, String],
        location: String,
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
        width: Number,
        wordWrap: String,
        x: Number,
        y: Number
    }
});
exports.DxCommonAnnotationSettings = DxCommonAnnotationSettings;
DxCommonAnnotationSettings.$_optionName = "commonAnnotationSettings";
var DxCommonSeriesSettings = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:argumentField": null,
        "update:argumentType": null,
        "update:border": null,
        "update:color": null,
        "update:hoverMode": null,
        "update:hoverStyle": null,
        "update:label": null,
        "update:maxLabelCount": null,
        "update:minSegmentSize": null,
        "update:selectionMode": null,
        "update:selectionStyle": null,
        "update:smallValuesGrouping": null,
        "update:tagField": null,
        "update:valueField": null,
    },
    props: {
        argumentField: String,
        argumentType: String,
        border: Object,
        color: String,
        hoverMode: String,
        hoverStyle: Object,
        label: Object,
        maxLabelCount: Number,
        minSegmentSize: Number,
        selectionMode: String,
        selectionStyle: Object,
        smallValuesGrouping: Object,
        tagField: String,
        valueField: String
    }
});
exports.DxCommonSeriesSettings = DxCommonSeriesSettings;
DxCommonSeriesSettings.$_optionName = "commonSeriesSettings";
DxCommonSeriesSettings.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    hoverStyle: { isCollectionItem: false, optionName: "hoverStyle" },
    label: { isCollectionItem: false, optionName: "label" },
    selectionStyle: { isCollectionItem: false, optionName: "selectionStyle" },
    seriesBorder: { isCollectionItem: false, optionName: "border" },
    smallValuesGrouping: { isCollectionItem: false, optionName: "smallValuesGrouping" }
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
var DxHoverStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:hatching": null,
    },
    props: {
        border: Object,
        color: String,
        hatching: Object
    }
});
exports.DxHoverStyle = DxHoverStyle;
DxHoverStyle.$_optionName = "hoverStyle";
DxHoverStyle.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    hatching: { isCollectionItem: false, optionName: "hatching" },
    seriesBorder: { isCollectionItem: false, optionName: "border" }
};
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
        "update:argumentFormat": null,
        "update:backgroundColor": null,
        "update:border": null,
        "update:connector": null,
        "update:customizeText": null,
        "update:font": null,
        "update:format": null,
        "update:position": null,
        "update:radialOffset": null,
        "update:rotationAngle": null,
        "update:textOverflow": null,
        "update:visible": null,
        "update:wordWrap": null,
    },
    props: {
        argumentFormat: [Object, Function, String],
        backgroundColor: String,
        border: Object,
        connector: Object,
        customizeText: Function,
        font: Object,
        format: [Object, Function, String],
        position: String,
        radialOffset: Number,
        rotationAngle: Number,
        textOverflow: String,
        visible: Boolean,
        wordWrap: String
    }
});
exports.DxLabel = DxLabel;
DxLabel.$_optionName = "label";
DxLabel.$_expectedChildren = {
    argumentFormat: { isCollectionItem: false, optionName: "argumentFormat" },
    border: { isCollectionItem: false, optionName: "border" },
    connector: { isCollectionItem: false, optionName: "connector" },
    font: { isCollectionItem: false, optionName: "font" },
    format: { isCollectionItem: false, optionName: "format" },
    seriesBorder: { isCollectionItem: false, optionName: "border" }
};
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
var DxPieChartTitle = index_2.createConfigurationComponent({
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
exports.DxPieChartTitle = DxPieChartTitle;
DxPieChartTitle.$_optionName = "title";
DxPieChartTitle.$_expectedChildren = {
    font: { isCollectionItem: false, optionName: "font" },
    margin: { isCollectionItem: false, optionName: "margin" },
    pieChartTitleSubtitle: { isCollectionItem: false, optionName: "subtitle" },
    subtitle: { isCollectionItem: false, optionName: "subtitle" }
};
var DxPieChartTitleSubtitle = index_2.createConfigurationComponent({
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
exports.DxPieChartTitleSubtitle = DxPieChartTitleSubtitle;
DxPieChartTitleSubtitle.$_optionName = "subtitle";
DxPieChartTitleSubtitle.$_expectedChildren = {
    font: { isCollectionItem: false, optionName: "font" }
};
var DxSelectionStyle = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:border": null,
        "update:color": null,
        "update:hatching": null,
    },
    props: {
        border: Object,
        color: String,
        hatching: Object
    }
});
exports.DxSelectionStyle = DxSelectionStyle;
DxSelectionStyle.$_optionName = "selectionStyle";
DxSelectionStyle.$_expectedChildren = {
    border: { isCollectionItem: false, optionName: "border" },
    hatching: { isCollectionItem: false, optionName: "hatching" },
    seriesBorder: { isCollectionItem: false, optionName: "border" }
};
var DxSeries = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:argumentField": null,
        "update:argumentType": null,
        "update:border": null,
        "update:color": null,
        "update:hoverMode": null,
        "update:hoverStyle": null,
        "update:label": null,
        "update:maxLabelCount": null,
        "update:minSegmentSize": null,
        "update:name": null,
        "update:selectionMode": null,
        "update:selectionStyle": null,
        "update:smallValuesGrouping": null,
        "update:tag": null,
        "update:tagField": null,
        "update:valueField": null,
    },
    props: {
        argumentField: String,
        argumentType: String,
        border: Object,
        color: String,
        hoverMode: String,
        hoverStyle: Object,
        label: Object,
        maxLabelCount: Number,
        minSegmentSize: Number,
        name: String,
        selectionMode: String,
        selectionStyle: Object,
        smallValuesGrouping: Object,
        tag: {},
        tagField: String,
        valueField: String
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
var DxSmallValuesGrouping = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:groupName": null,
        "update:mode": null,
        "update:threshold": null,
        "update:topCount": null,
    },
    props: {
        groupName: String,
        mode: String,
        threshold: Number,
        topCount: Number
    }
});
exports.DxSmallValuesGrouping = DxSmallValuesGrouping;
DxSmallValuesGrouping.$_optionName = "smallValuesGrouping";
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
var DxTitle = index_2.createConfigurationComponent({
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
        margin: Object,
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
exports.default = DxPieChart;


/***/ }),

/***/ "./node_modules/devextreme-vue/tab-panel.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme-vue/tab-panel.js ***!
  \**************************************************/
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
exports.DxItem = exports.DxTabPanel = void 0;
var tab_panel_1 = __importDefault(__webpack_require__(/*! devextreme/ui/tab_panel */ "./node_modules/devextreme/esm/ui/tab_panel.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxTabPanel = index_1.createComponent({
    props: {
        accessKey: String,
        activeStateEnabled: Boolean,
        animationEnabled: Boolean,
        dataSource: {},
        deferRendering: Boolean,
        disabled: Boolean,
        elementAttr: Object,
        focusStateEnabled: Boolean,
        height: [Function, Number, String],
        hint: String,
        hoverStateEnabled: Boolean,
        itemHoldTimeout: Number,
        items: Array,
        itemTemplate: {},
        itemTitleTemplate: {},
        loop: Boolean,
        noDataText: String,
        onContentReady: Function,
        onDisposing: Function,
        onInitialized: Function,
        onItemClick: Function,
        onItemContextMenu: Function,
        onItemHold: Function,
        onItemRendered: Function,
        onOptionChanged: Function,
        onSelectionChanged: Function,
        onTitleClick: Function,
        onTitleHold: Function,
        onTitleRendered: Function,
        repaintChangesOnly: Boolean,
        rtlEnabled: Boolean,
        scrollByContent: Boolean,
        scrollingEnabled: Boolean,
        selectedIndex: Number,
        selectedItem: {},
        showNavButtons: Boolean,
        swipeEnabled: Boolean,
        tabIndex: Number,
        visible: Boolean,
        width: [Function, Number, String]
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:animationEnabled": null,
        "update:dataSource": null,
        "update:deferRendering": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:focusStateEnabled": null,
        "update:height": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:itemHoldTimeout": null,
        "update:items": null,
        "update:itemTemplate": null,
        "update:itemTitleTemplate": null,
        "update:loop": null,
        "update:noDataText": null,
        "update:onContentReady": null,
        "update:onDisposing": null,
        "update:onInitialized": null,
        "update:onItemClick": null,
        "update:onItemContextMenu": null,
        "update:onItemHold": null,
        "update:onItemRendered": null,
        "update:onOptionChanged": null,
        "update:onSelectionChanged": null,
        "update:onTitleClick": null,
        "update:onTitleHold": null,
        "update:onTitleRendered": null,
        "update:repaintChangesOnly": null,
        "update:rtlEnabled": null,
        "update:scrollByContent": null,
        "update:scrollingEnabled": null,
        "update:selectedIndex": null,
        "update:selectedItem": null,
        "update:showNavButtons": null,
        "update:swipeEnabled": null,
        "update:tabIndex": null,
        "update:visible": null,
        "update:width": null,
    },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = tab_panel_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            item: { isCollectionItem: true, optionName: "items" }
        };
    }
});
exports.DxTabPanel = DxTabPanel;
var DxItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:badge": null,
        "update:disabled": null,
        "update:html": null,
        "update:icon": null,
        "update:tabTemplate": null,
        "update:template": null,
        "update:text": null,
        "update:title": null,
        "update:visible": null,
    },
    props: {
        badge: String,
        disabled: Boolean,
        html: String,
        icon: String,
        tabTemplate: {},
        template: {},
        text: String,
        title: String,
        visible: Boolean
    }
});
exports.DxItem = DxItem;
DxItem.$_optionName = "items";
DxItem.$_isCollectionItem = true;
exports.default = DxTabPanel;


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/pie_chart.js":
/*!******************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/pie_chart.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/consts */ "./node_modules/devextreme/esm/viz/components/consts.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _translators_range__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./translators/range */ "./node_modules/devextreme/esm/viz/translators/range.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _chart_components_base_chart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chart_components/base_chart */ "./node_modules/devextreme/esm/viz/chart_components/base_chart.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _translators_translator1d__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./translators/translator1d */ "./node_modules/devextreme/esm/viz/translators/translator1d.js");
/* harmony import */ var _core_annotations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/annotations */ "./node_modules/devextreme/esm/viz/core/annotations.js");
/**
 * DevExtreme (esm/viz/pie_chart.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var {
    states: states
} = _components_consts__WEBPACK_IMPORTED_MODULE_0__["default"];
var seriesSpacing = _components_consts__WEBPACK_IMPORTED_MODULE_0__["default"].pieSeriesSpacing;
var OPTIONS_FOR_REFRESH_SERIES = ["startAngle", "innerRadius", "segmentsDirection", "type"];
var NORMAL_STATE = states.normalMark;
var HOVER_STATE = states.hoverMark;
var SELECTED_STATE = states.selectedMark;
var MAX_RESOLVE_ITERATION_COUNT = 5;
var LEGEND_ACTIONS = [states.resetItem, states.applyHover, states.applySelected, states.applySelected];

function getLegendItemAction(points) {
    var state = NORMAL_STATE;
    points.forEach(point => {
        var _point$series;
        var seriesOptions = null === (_point$series = point.series) || void 0 === _point$series ? void 0 : _point$series.getOptions();
        var pointState = point.fullState;
        if ("none" === (null === seriesOptions || void 0 === seriesOptions ? void 0 : seriesOptions.hoverMode)) {
            pointState &= ~HOVER_STATE
        }
        if ("none" === (null === seriesOptions || void 0 === seriesOptions ? void 0 : seriesOptions.selectionMode)) {
            pointState &= ~SELECTED_STATE
        }
        state |= pointState
    });
    return LEGEND_ACTIONS[state]
}

function correctPercentValue(value) {
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isNumeric"])(value)) {
        if (value > 1) {
            value = 1
        } else if (value < 0) {
            value = 0
        }
    } else {
        value = void 0
    }
    return value
}
var pieSizeEqualizer = function() {
    function removeFromList(list, item) {
        return list.filter((function(li) {
            return li !== item
        }))
    }
    var pies = [];
    var timers = {};
    return {
        queue: function(pie) {
            var group = pie.getSizeGroup();
            pies = (list = pies, item = pie, removeFromList(list, item).concat(item));
            var list, item;
            clearTimeout(timers[group]);
            timers[group] = setTimeout((function() {
                ! function(group, allPies) {
                    var pies = allPies.filter(p => p._isVisible() && p.getSizeGroup() === group);
                    var minRadius = Math.min.apply(null, pies.map(p => p.getSizeGroupLayout().radius));
                    var minPie = pies.filter(p => p.getSizeGroupLayout().radius === minRadius);
                    pies.forEach(p => p.render({
                        force: true,
                        sizeGroupLayout: minPie.length ? minPie[0].getSizeGroupLayout() : {}
                    }))
                }(group, pies)
            }))
        },
        remove: function(pie) {
            pies = removeFromList(pies, pie);
            if (!pies.length) {
                timers = {}
            }
        }
    }
}();
var dxPieChart = _chart_components_base_chart__WEBPACK_IMPORTED_MODULE_7__["BaseChart"].inherit({
    _themeSection: "pie",
    _layoutManagerOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, this.callBase(), {
            piePercentage: correctPercentValue(this._themeManager.getOptions("diameter")),
            minPiePercentage: correctPercentValue(this._themeManager.getOptions("minDiameter"))
        })
    },
    _customChangesOrder: ["CENTER_TEMPLATE"],
    _optionChangesMap: {
        diameter: "REINIT",
        minDiameter: "REINIT",
        sizeGroup: "REINIT",
        centerTemplate: "CENTER_TEMPLATE"
    },
    _change_CENTER_TEMPLATE() {
        this._renderCenterTemplate()
    },
    _disposeCore: function() {
        pieSizeEqualizer.remove(this);
        this.callBase();
        this._centerTemplateGroup.linkOff().dispose()
    },
    _groupSeries: function() {
        var series = this.series;
        this._groupsData = {
            groups: [{
                series: series,
                valueOptions: {
                    valueType: "numeric"
                }
            }],
            argumentOptions: series[0] && series[0].getOptions()
        }
    },
    getArgumentAxis: function() {
        return null
    },
    _getValueAxis: function() {
        var translator = (new _translators_translator1d__WEBPACK_IMPORTED_MODULE_9__["Translator1D"]).setCodomain(360, 0);
        return {
            getTranslator: function() {
                return translator
            },
            setBusinessRange: function(range) {
                translator.setDomain(range.min, range.max)
            }
        }
    },
    _populateBusinessRange: function() {
        this.series.map((function(series) {
            var range = new _translators_range__WEBPACK_IMPORTED_MODULE_5__["Range"];
            range.addRange(series.getRangeData().val);
            series.getValueAxis().setBusinessRange(range);
            return range
        }))
    },
    _specialProcessSeries: function() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(this.series, (function(_, singleSeries) {
            singleSeries.arrangePoints()
        }))
    },
    _checkPaneName: function() {
        return true
    },
    _processSingleSeries: function(singleSeries) {
        this.callBase(singleSeries);
        singleSeries.arrangePoints()
    },
    _handleSeriesDataUpdated: function() {
        var maxPointCount = 0;
        this.series.forEach((function(s) {
            maxPointCount = Math.max(s.getPointsCount(), maxPointCount)
        }));
        this.series.forEach((function(s) {
            s.setMaxPointsCount(maxPointCount)
        }));
        this.callBase()
    },
    _getLegendOptions: function(item) {
        var legendItem = this.callBase(item);
        var legendData = legendItem.legendData;
        legendData.argument = item.argument;
        legendData.argumentIndex = item.argumentIndex;
        legendData.points = [item];
        return legendItem
    },
    _getLegendTargets: function() {
        var that = this;
        var itemsByArgument = {};
        (that.series || []).forEach((function(series) {
            series.getPoints().forEach((function(point) {
                var argument = point.argument.valueOf();
                var index = series.getPointsByArg(argument).indexOf(point);
                var key = argument.valueOf().toString() + index;
                itemsByArgument[key] = itemsByArgument[key] || [];
                var argumentCount = itemsByArgument[key].push(point);
                point.index = itemsByArgument[key][argumentCount - 2] ? itemsByArgument[key][argumentCount - 2].index : Object.keys(itemsByArgument).length - 1;
                point.argumentIndex = index
            }))
        }));
        var items = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(itemsByArgument, (function(_, points) {
            points.forEach((function(point, index) {
                if (0 === index) {
                    items.push(that._getLegendOptions(point));
                    return
                }
                var item = items[items.length - 1];
                item.legendData.points.push(point);
                if (!item.visible) {
                    item.visible = point.isVisible()
                }
            }))
        }));
        return items
    },
    _getLayoutTargets: function() {
        return [{
            canvas: this._canvas
        }]
    },
    _getLayoutSeries: function(series, drawOptions) {
        var layout;
        var canvas = this._canvas;
        var drawnLabels = false;
        layout = this.layoutManager.applyPieChartSeriesLayout(canvas, series, true);
        series.forEach((function(singleSeries) {
            singleSeries.correctPosition(layout, canvas);
            drawnLabels = singleSeries.drawLabelsWOPoints() || drawnLabels
        }));
        if (drawnLabels) {
            layout = this.layoutManager.applyPieChartSeriesLayout(canvas, series, drawOptions.hideLayoutLabels)
        }
        series.forEach((function(singleSeries) {
            singleSeries.hideLabels()
        }));
        this._sizeGroupLayout = {
            x: layout.centerX,
            y: layout.centerY,
            radius: layout.radiusOuter,
            drawOptions: drawOptions
        };
        return layout
    },
    _getLayoutSeriesForEqualPies: function(series, sizeGroupLayout) {
        var canvas = this._canvas;
        var layout = this.layoutManager.applyEqualPieChartLayout(series, sizeGroupLayout);
        series.forEach((function(s) {
            s.correctPosition(layout, canvas);
            s.drawLabelsWOPoints()
        }));
        this.layoutManager.correctPieLabelRadius(series, layout, canvas);
        return layout
    },
    _updateSeriesDimensions: function(drawOptions) {
        var visibleSeries = this._getVisibleSeries();
        var lengthVisibleSeries = visibleSeries.length;
        var innerRad;
        var delta;
        var layout;
        var sizeGroupLayout = drawOptions.sizeGroupLayout;
        if (lengthVisibleSeries) {
            layout = sizeGroupLayout ? this._getLayoutSeriesForEqualPies(visibleSeries, sizeGroupLayout) : this._getLayoutSeries(visibleSeries, drawOptions);
            delta = (layout.radiusOuter - layout.radiusInner - seriesSpacing * (lengthVisibleSeries - 1)) / lengthVisibleSeries;
            innerRad = layout.radiusInner;
            this._setGeometry(layout);
            visibleSeries.forEach((function(singleSeries) {
                singleSeries.correctRadius({
                    radiusInner: innerRad,
                    radiusOuter: innerRad + delta
                });
                innerRad += delta + seriesSpacing
            }))
        }
    },
    _renderSeries: function(drawOptions, isRotated, isLegendInside) {
        this._calculateSeriesLayout(drawOptions, isRotated);
        if (!drawOptions.sizeGroupLayout && this.getSizeGroup()) {
            pieSizeEqualizer.queue(this);
            this._clearCanvas();
            return
        }
        this._renderSeriesElements(drawOptions, isLegendInside)
    },
    _createHtmlStructure() {
        this.callBase();
        this._centerTemplateGroup = this._renderer.g().attr({
            class: "dxc-hole-template"
        }).linkOn(this._renderer.root, "center-template").css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["patchFontOptions"])(this._themeManager._font)).linkAppend()
    },
    _renderExtraElements() {
        this._requestChange(["CENTER_TEMPLATE"])
    },
    _renderCenterTemplate() {
        var template = this.option("centerTemplate");
        var centerTemplateGroup = this._centerTemplateGroup.clear();
        if (!template) {
            return
        }
        centerTemplateGroup.attr({
            visibility: "hidden"
        });
        template = this._getTemplate(template);
        template.render({
            model: this,
            container: centerTemplateGroup.element,
            onRendered: () => {
                var group = centerTemplateGroup;
                var bBox = group.getBBox();
                group.move(this._center.x - (bBox.x + bBox.width / 2), this._center.y - (bBox.y + bBox.height / 2));
                group.attr({
                    visibility: "visible"
                })
            }
        })
    },
    getInnerRadius() {
        return this._innerRadius
    },
    _getLegendCallBack: function() {
        var that = this;
        var legend = this._legend;
        var items = this._getLegendTargets().map((function(i) {
            return i.legendData
        }));
        return function(target) {
            items.forEach((function(data) {
                var points = [];
                var callback = legend.getActionCallback({
                    index: data.id
                });
                that.series.forEach((function(series) {
                    var seriesPoints = series.getPointsByKeys(data.argument, data.argumentIndex);
                    points.push.apply(points, seriesPoints)
                }));
                if (target && target.argument === data.argument && target.argumentIndex === data.argumentIndex) {
                    points.push(target)
                }
                callback(getLegendItemAction(points))
            }))
        }
    },
    _locateLabels(resolveLabelOverlapping) {
        var iterationCount = 0;
        var labelsWereOverlapped;
        var wordWrapApplied;
        do {
            wordWrapApplied = this._adjustSeriesLabels("shift" === resolveLabelOverlapping);
            labelsWereOverlapped = this._resolveLabelOverlapping(resolveLabelOverlapping)
        } while ((labelsWereOverlapped || wordWrapApplied) && ++iterationCount < MAX_RESOLVE_ITERATION_COUNT)
    },
    _adjustSeriesLabels: function(moveLabelsFromCenter) {
        return this.series.reduce((r, s) => s.adjustLabels(moveLabelsFromCenter) || r, false)
    },
    _applyExtraSettings: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _resolveLabelOverlappingShift: function() {
        var that = this;
        var inverseDirection = "anticlockwise" === that.option("segmentsDirection");
        var seriesByPosition = that.series.reduce((function(r, s) {
            (r[s.getOptions().label.position] || r.outside).push(s);
            return r
        }), {
            inside: [],
            columns: [],
            outside: []
        });
        var labelsOverlapped = false;
        if (seriesByPosition.inside.length > 0) {
            labelsOverlapped = resolve(seriesByPosition.inside.reduce((function(r, singleSeries) {
                return singleSeries.getVisiblePoints().reduce((function(r, point) {
                    r.left.push(point);
                    return r
                }), r)
            }), {
                left: [],
                right: []
            }), shiftInColumnFunction) || labelsOverlapped
        }
        labelsOverlapped = seriesByPosition.columns.reduce((r, singleSeries) => resolve(dividePoints(singleSeries), shiftInColumnFunction) || r, labelsOverlapped);
        if (seriesByPosition.outside.length > 0) {
            labelsOverlapped = resolve(seriesByPosition.outside.reduce((function(r, singleSeries) {
                return dividePoints(singleSeries, r)
            }), null), (function(box, length) {
                return Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getVerticallyShiftedAngularCoords"])(box, -length, that._center)
            })) || labelsOverlapped
        }
        return labelsOverlapped;

        function dividePoints(series, points) {
            return series.getVisiblePoints().reduce((function(r, point) {
                var angle = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeAngle"])(point.middleAngle);
                (angle <= 90 || angle >= 270 ? r.right : r.left).push(point);
                return r
            }), points || {
                left: [],
                right: []
            })
        }

        function resolve(points, shiftCallback) {
            var overlapped;
            if (inverseDirection) {
                points.left.reverse();
                points.right.reverse()
            }
            overlapped = _chart_components_base_chart__WEBPACK_IMPORTED_MODULE_7__["overlapping"].resolveLabelOverlappingInOneDirection(points.left, that._canvas, false, false, shiftCallback);
            return _chart_components_base_chart__WEBPACK_IMPORTED_MODULE_7__["overlapping"].resolveLabelOverlappingInOneDirection(points.right, that._canvas, false, false, shiftCallback) || overlapped
        }

        function shiftInColumnFunction(box, length) {
            return {
                x: box.x,
                y: box.y - length
            }
        }
    },
    _setGeometry: function(_ref) {
        var {
            centerX: x,
            centerY: y,
            radiusInner: radiusInner
        } = _ref;
        this._center = {
            x: x,
            y: y
        };
        this._innerRadius = radiusInner
    },
    _disposeSeries(seriesIndex) {
        this.callBase.apply(this, arguments);
        this._abstractSeries = null
    },
    _legendDataField: "point",
    _legendItemTextField: "argument",
    _applyPointMarkersAutoHiding: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _renderTrackers: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _trackerType: "PieTracker",
    _createScrollBar: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _updateAxesLayout: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _applyClipRects: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _appendAdditionalSeriesGroups: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _prepareToRender: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _isLegendInside: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _renderAxes: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _shrinkAxes: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _isRotated: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _seriesPopulatedHandlerCore: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _reinitAxes: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _correctAxes: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _getExtraOptions: function() {
        return {
            startAngle: this.option("startAngle"),
            innerRadius: this.option("innerRadius"),
            segmentsDirection: this.option("segmentsDirection"),
            type: this.option("type")
        }
    },
    getSizeGroup: function() {
        return this._themeManager.getOptions("sizeGroup")
    },
    getSizeGroupLayout: function() {
        return this._sizeGroupLayout || {}
    }
});
Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(OPTIONS_FOR_REFRESH_SERIES, (function(_, name) {
    dxPieChart.prototype._optionChangesMap[name] = "REFRESH_SERIES_DATA_INIT"
}));

dxPieChart.addPlugin(_core_annotations__WEBPACK_IMPORTED_MODULE_10__["plugins"].core);
dxPieChart.addPlugin(_core_annotations__WEBPACK_IMPORTED_MODULE_10__["plugins"].pieChart);
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_6__["default"])("dxPieChart", dxPieChart);
/* harmony default export */ __webpack_exports__["default"] = (dxPieChart);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/translators/translator1d.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/translators/translator1d.js ***!
  \*********************************************************************/
/*! exports provided: Translator1D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Translator1D", function() { return Translator1D; });
/**
 * DevExtreme (esm/viz/translators/translator1d.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var _Number = Number;
function Translator1D() {
    this.setDomain(arguments[0], arguments[1]).setCodomain(arguments[2], arguments[3]).setInverted(false)
}
Translator1D.prototype = {
    constructor: Translator1D,
    setDomain: function(domain1, domain2) {
        this._domain1 = _Number(domain1);
        this._domain2 = _Number(domain2);
        this._domainDelta = this._domain2 - this._domain1;
        return this
    },
    setCodomain: function(codomain1, codomain2) {
        this._codomain1 = _Number(codomain1);
        this._codomain2 = _Number(codomain2);
        this._codomainDelta = this._codomain2 - this._codomain1;
        return this
    },
    setInverted(state) {
        this.inverted = state
    },
    getDomain: function() {
        return [this._domain1, this._domain2]
    },
    getCodomain: function() {
        return [this._codomain1, this._codomain2]
    },
    getDomainStart: function() {
        return this._domain1
    },
    getDomainEnd: function() {
        return this._domain2
    },
    getCodomainStart: function() {
        return this._codomain1
    },
    getCodomainEnd: function() {
        return this._codomain2
    },
    getDomainRange: function() {
        return this._domainDelta
    },
    getCodomainRange: function() {
        return this._codomainDelta
    },
    translate: function(value) {
        var ratio = (_Number(value) - this._domain1) / this._domainDelta;
        this.inverted && (ratio = 1 - ratio);
        return 0 <= ratio && ratio <= 1 ? this._codomain1 + ratio * this._codomainDelta : NaN
    },
    adjust: function(value) {
        var ratio = (_Number(value) - this._domain1) / this._domainDelta;
        var result = NaN;
        if (ratio < 0) {
            result = this._domain1
        } else if (ratio > 1) {
            result = this._domain2
        } else if (0 <= ratio && ratio <= 1) {
            result = _Number(value)
        }
        return result
    }
};


/***/ })

}]);