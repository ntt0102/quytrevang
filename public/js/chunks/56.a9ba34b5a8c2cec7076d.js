(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ "./node_modules/devextreme-vue/tag-box.js":
/*!************************************************!*\
  !*** ./node_modules/devextreme-vue/tag-box.js ***!
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
exports.DxToolbarItem = exports.DxTo = exports.DxShow = exports.DxPosition = exports.DxOptions = exports.DxOffset = exports.DxMy = exports.DxItem = exports.DxHide = exports.DxFrom = exports.DxDropDownOptions = exports.DxCollision = exports.DxButton = exports.DxBoundaryOffset = exports.DxAt = exports.DxAnimation = exports.DxTagBox = void 0;
var tag_box_1 = __importDefault(__webpack_require__(/*! devextreme/ui/tag_box */ "./node_modules/devextreme/esm/ui/tag_box.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxTagBox = index_1.createComponent({
    props: {
        acceptCustomValue: Boolean,
        accessKey: String,
        activeStateEnabled: Boolean,
        applyValueMode: String,
        buttons: Array,
        dataSource: [Array, Object, String],
        deferRendering: Boolean,
        disabled: Boolean,
        displayExpr: [Function, String],
        dropDownButtonTemplate: {},
        dropDownOptions: Object,
        elementAttr: Object,
        fieldTemplate: {},
        focusStateEnabled: Boolean,
        grouped: Boolean,
        groupTemplate: {},
        height: [Function, Number, String],
        hideSelectedItems: Boolean,
        hint: String,
        hoverStateEnabled: Boolean,
        inputAttr: {},
        isValid: Boolean,
        items: Array,
        itemTemplate: {},
        label: String,
        labelMode: String,
        maxDisplayedTags: Number,
        maxFilterQueryLength: Number,
        maxLength: [Number, String],
        minSearchLength: Number,
        multiline: Boolean,
        name: String,
        noDataText: String,
        onChange: Function,
        onClosed: Function,
        onContentReady: Function,
        onCustomItemCreating: Function,
        onDisposing: Function,
        onEnterKey: Function,
        onFocusIn: Function,
        onFocusOut: Function,
        onInitialized: Function,
        onInput: Function,
        onItemClick: Function,
        onKeyDown: Function,
        onKeyUp: Function,
        onMultiTagPreparing: Function,
        onOpened: Function,
        onOptionChanged: Function,
        onSelectAllValueChanged: Function,
        onSelectionChanged: Function,
        onValueChanged: Function,
        opened: Boolean,
        openOnFieldClick: Boolean,
        placeholder: String,
        readOnly: Boolean,
        rtlEnabled: Boolean,
        searchEnabled: Boolean,
        searchExpr: [Array, Function, String],
        searchMode: String,
        searchTimeout: Number,
        selectAllMode: String,
        selectAllText: String,
        selectedItems: Array,
        showClearButton: Boolean,
        showDataBeforeSearch: Boolean,
        showDropDownButton: Boolean,
        showMultiTagOnly: Boolean,
        showSelectionControls: Boolean,
        stylingMode: String,
        tabIndex: Number,
        tagTemplate: {},
        text: String,
        useItemTextAsTitle: Boolean,
        validationError: {},
        validationErrors: Array,
        validationMessageMode: String,
        validationStatus: String,
        value: Array,
        valueExpr: [Function, String],
        visible: Boolean,
        width: [Function, Number, String],
        wrapItemText: Boolean
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:acceptCustomValue": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:applyValueMode": null,
        "update:buttons": null,
        "update:dataSource": null,
        "update:deferRendering": null,
        "update:disabled": null,
        "update:displayExpr": null,
        "update:dropDownButtonTemplate": null,
        "update:dropDownOptions": null,
        "update:elementAttr": null,
        "update:fieldTemplate": null,
        "update:focusStateEnabled": null,
        "update:grouped": null,
        "update:groupTemplate": null,
        "update:height": null,
        "update:hideSelectedItems": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:inputAttr": null,
        "update:isValid": null,
        "update:items": null,
        "update:itemTemplate": null,
        "update:label": null,
        "update:labelMode": null,
        "update:maxDisplayedTags": null,
        "update:maxFilterQueryLength": null,
        "update:maxLength": null,
        "update:minSearchLength": null,
        "update:multiline": null,
        "update:name": null,
        "update:noDataText": null,
        "update:onChange": null,
        "update:onClosed": null,
        "update:onContentReady": null,
        "update:onCustomItemCreating": null,
        "update:onDisposing": null,
        "update:onEnterKey": null,
        "update:onFocusIn": null,
        "update:onFocusOut": null,
        "update:onInitialized": null,
        "update:onInput": null,
        "update:onItemClick": null,
        "update:onKeyDown": null,
        "update:onKeyUp": null,
        "update:onMultiTagPreparing": null,
        "update:onOpened": null,
        "update:onOptionChanged": null,
        "update:onSelectAllValueChanged": null,
        "update:onSelectionChanged": null,
        "update:onValueChanged": null,
        "update:opened": null,
        "update:openOnFieldClick": null,
        "update:placeholder": null,
        "update:readOnly": null,
        "update:rtlEnabled": null,
        "update:searchEnabled": null,
        "update:searchExpr": null,
        "update:searchMode": null,
        "update:searchTimeout": null,
        "update:selectAllMode": null,
        "update:selectAllText": null,
        "update:selectedItems": null,
        "update:showClearButton": null,
        "update:showDataBeforeSearch": null,
        "update:showDropDownButton": null,
        "update:showMultiTagOnly": null,
        "update:showSelectionControls": null,
        "update:stylingMode": null,
        "update:tabIndex": null,
        "update:tagTemplate": null,
        "update:text": null,
        "update:useItemTextAsTitle": null,
        "update:validationError": null,
        "update:validationErrors": null,
        "update:validationMessageMode": null,
        "update:validationStatus": null,
        "update:value": null,
        "update:valueExpr": null,
        "update:visible": null,
        "update:width": null,
        "update:wrapItemText": null,
    },
    model: { prop: "value", event: "update:value" },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = tag_box_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            button: { isCollectionItem: true, optionName: "buttons" },
            dropDownOptions: { isCollectionItem: false, optionName: "dropDownOptions" },
            item: { isCollectionItem: true, optionName: "items" }
        };
    }
});
exports.DxTagBox = DxTagBox;
var DxAnimation = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:hide": null,
        "update:show": null,
    },
    props: {
        hide: [Object, Number, String],
        show: [Object, Number, String]
    }
});
exports.DxAnimation = DxAnimation;
DxAnimation.$_optionName = "animation";
DxAnimation.$_expectedChildren = {
    hide: { isCollectionItem: false, optionName: "hide" },
    show: { isCollectionItem: false, optionName: "show" }
};
var DxAt = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:x": null,
        "update:y": null,
    },
    props: {
        x: String,
        y: String
    }
});
exports.DxAt = DxAt;
DxAt.$_optionName = "at";
var DxBoundaryOffset = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:x": null,
        "update:y": null,
    },
    props: {
        x: Number,
        y: Number
    }
});
exports.DxBoundaryOffset = DxBoundaryOffset;
DxBoundaryOffset.$_optionName = "boundaryOffset";
var DxButton = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:location": null,
        "update:name": null,
        "update:options": null,
    },
    props: {
        location: String,
        name: String,
        options: Object
    }
});
exports.DxButton = DxButton;
DxButton.$_optionName = "buttons";
DxButton.$_isCollectionItem = true;
DxButton.$_expectedChildren = {
    options: { isCollectionItem: false, optionName: "options" }
};
var DxCollision = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:x": null,
        "update:y": null,
    },
    props: {
        x: String,
        y: String
    }
});
exports.DxCollision = DxCollision;
DxCollision.$_optionName = "collision";
var DxDropDownOptions = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:animation": null,
        "update:bindingOptions": null,
        "update:closeOnOutsideClick": null,
        "update:container": null,
        "update:contentTemplate": null,
        "update:copyRootClassesToWrapper": null,
        "update:deferRendering": null,
        "update:disabled": null,
        "update:dragAndResizeArea": null,
        "update:dragEnabled": null,
        "update:dragOutsideBoundary": null,
        "update:elementAttr": null,
        "update:focusStateEnabled": null,
        "update:fullScreen": null,
        "update:height": null,
        "update:hideOnParentScroll": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:maxHeight": null,
        "update:maxWidth": null,
        "update:minHeight": null,
        "update:minWidth": null,
        "update:onContentReady": null,
        "update:onDisposing": null,
        "update:onFocusIn": null,
        "update:onFocusOut": null,
        "update:onHidden": null,
        "update:onHiding": null,
        "update:onInitialized": null,
        "update:onOptionChanged": null,
        "update:onResize": null,
        "update:onResizeEnd": null,
        "update:onResizeStart": null,
        "update:onShowing": null,
        "update:onShown": null,
        "update:onTitleRendered": null,
        "update:position": null,
        "update:resizeEnabled": null,
        "update:restorePosition": null,
        "update:rtlEnabled": null,
        "update:shading": null,
        "update:shadingColor": null,
        "update:showCloseButton": null,
        "update:showTitle": null,
        "update:tabIndex": null,
        "update:title": null,
        "update:titleTemplate": null,
        "update:toolbarItems": null,
        "update:visible": null,
        "update:width": null,
        "update:wrapperAttr": null,
    },
    props: {
        accessKey: String,
        activeStateEnabled: Boolean,
        animation: Object,
        bindingOptions: Object,
        closeOnOutsideClick: [Boolean, Function],
        container: {},
        contentTemplate: {},
        copyRootClassesToWrapper: Boolean,
        deferRendering: Boolean,
        disabled: Boolean,
        dragAndResizeArea: {},
        dragEnabled: Boolean,
        dragOutsideBoundary: Boolean,
        elementAttr: {},
        focusStateEnabled: Boolean,
        fullScreen: Boolean,
        height: [Function, Number, String],
        hideOnParentScroll: Boolean,
        hint: String,
        hoverStateEnabled: Boolean,
        maxHeight: [Function, Number, String],
        maxWidth: [Function, Number, String],
        minHeight: [Function, Number, String],
        minWidth: [Function, Number, String],
        onContentReady: Function,
        onDisposing: Function,
        onFocusIn: Function,
        onFocusOut: Function,
        onHidden: Function,
        onHiding: Function,
        onInitialized: Function,
        onOptionChanged: Function,
        onResize: Function,
        onResizeEnd: Function,
        onResizeStart: Function,
        onShowing: Function,
        onShown: Function,
        onTitleRendered: Function,
        position: [Function, Object, String],
        resizeEnabled: Boolean,
        restorePosition: Boolean,
        rtlEnabled: Boolean,
        shading: Boolean,
        shadingColor: String,
        showCloseButton: Boolean,
        showTitle: Boolean,
        tabIndex: Number,
        title: String,
        titleTemplate: {},
        toolbarItems: Array,
        visible: Boolean,
        width: [Function, Number, String],
        wrapperAttr: {}
    }
});
exports.DxDropDownOptions = DxDropDownOptions;
DxDropDownOptions.$_optionName = "dropDownOptions";
DxDropDownOptions.$_expectedChildren = {
    animation: { isCollectionItem: false, optionName: "animation" },
    position: { isCollectionItem: false, optionName: "position" },
    toolbarItem: { isCollectionItem: true, optionName: "toolbarItems" }
};
var DxFrom = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:left": null,
        "update:opacity": null,
        "update:position": null,
        "update:scale": null,
        "update:top": null,
    },
    props: {
        left: Number,
        opacity: Number,
        position: Object,
        scale: Number,
        top: Number
    }
});
exports.DxFrom = DxFrom;
DxFrom.$_optionName = "from";
DxFrom.$_expectedChildren = {
    position: { isCollectionItem: false, optionName: "position" }
};
var DxHide = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:complete": null,
        "update:delay": null,
        "update:direction": null,
        "update:duration": null,
        "update:easing": null,
        "update:from": null,
        "update:staggerDelay": null,
        "update:start": null,
        "update:to": null,
        "update:type": null,
    },
    props: {
        complete: Function,
        delay: Number,
        direction: String,
        duration: Number,
        easing: String,
        from: Object,
        staggerDelay: Number,
        start: Function,
        to: Object,
        type: String
    }
});
exports.DxHide = DxHide;
DxHide.$_optionName = "hide";
DxHide.$_expectedChildren = {
    from: { isCollectionItem: false, optionName: "from" },
    to: { isCollectionItem: false, optionName: "to" }
};
var DxItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:disabled": null,
        "update:html": null,
        "update:template": null,
        "update:text": null,
        "update:visible": null,
    },
    props: {
        disabled: Boolean,
        html: String,
        template: {},
        text: String,
        visible: Boolean
    }
});
exports.DxItem = DxItem;
DxItem.$_optionName = "items";
DxItem.$_isCollectionItem = true;
var DxMy = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:x": null,
        "update:y": null,
    },
    props: {
        x: String,
        y: String
    }
});
exports.DxMy = DxMy;
DxMy.$_optionName = "my";
var DxOffset = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:x": null,
        "update:y": null,
    },
    props: {
        x: Number,
        y: Number
    }
});
exports.DxOffset = DxOffset;
DxOffset.$_optionName = "offset";
var DxOptions = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:bindingOptions": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:focusStateEnabled": null,
        "update:height": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:icon": null,
        "update:onClick": null,
        "update:onContentReady": null,
        "update:onDisposing": null,
        "update:onFocusIn": null,
        "update:onFocusOut": null,
        "update:onInitialized": null,
        "update:onOptionChanged": null,
        "update:rtlEnabled": null,
        "update:stylingMode": null,
        "update:tabIndex": null,
        "update:template": null,
        "update:text": null,
        "update:type": null,
        "update:useSubmitBehavior": null,
        "update:validationGroup": null,
        "update:visible": null,
        "update:width": null,
    },
    props: {
        accessKey: String,
        activeStateEnabled: Boolean,
        bindingOptions: Object,
        disabled: Boolean,
        elementAttr: Object,
        focusStateEnabled: Boolean,
        height: [Function, Number, String],
        hint: String,
        hoverStateEnabled: Boolean,
        icon: String,
        onClick: Function,
        onContentReady: Function,
        onDisposing: Function,
        onFocusIn: Function,
        onFocusOut: Function,
        onInitialized: Function,
        onOptionChanged: Function,
        rtlEnabled: Boolean,
        stylingMode: String,
        tabIndex: Number,
        template: {},
        text: String,
        type: String,
        useSubmitBehavior: Boolean,
        validationGroup: String,
        visible: Boolean,
        width: [Function, Number, String]
    }
});
exports.DxOptions = DxOptions;
DxOptions.$_optionName = "options";
var DxPosition = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:at": null,
        "update:boundary": null,
        "update:boundaryOffset": null,
        "update:collision": null,
        "update:my": null,
        "update:of": null,
        "update:offset": null,
    },
    props: {
        at: [Object, String],
        boundary: {},
        boundaryOffset: [Object, String],
        collision: [Object, String],
        my: [Object, String],
        of: {},
        offset: [Object, String]
    }
});
exports.DxPosition = DxPosition;
DxPosition.$_optionName = "position";
var DxShow = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:complete": null,
        "update:delay": null,
        "update:direction": null,
        "update:duration": null,
        "update:easing": null,
        "update:from": null,
        "update:staggerDelay": null,
        "update:start": null,
        "update:to": null,
        "update:type": null,
    },
    props: {
        complete: Function,
        delay: Number,
        direction: String,
        duration: Number,
        easing: String,
        from: Object,
        staggerDelay: Number,
        start: Function,
        to: Object,
        type: String
    }
});
exports.DxShow = DxShow;
DxShow.$_optionName = "show";
var DxTo = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:left": null,
        "update:opacity": null,
        "update:position": null,
        "update:scale": null,
        "update:top": null,
    },
    props: {
        left: Number,
        opacity: Number,
        position: Object,
        scale: Number,
        top: Number
    }
});
exports.DxTo = DxTo;
DxTo.$_optionName = "to";
var DxToolbarItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:disabled": null,
        "update:html": null,
        "update:location": null,
        "update:options": null,
        "update:template": null,
        "update:text": null,
        "update:toolbar": null,
        "update:visible": null,
        "update:widget": null,
    },
    props: {
        disabled: Boolean,
        html: String,
        location: String,
        options: {},
        template: {},
        text: String,
        toolbar: String,
        visible: Boolean,
        widget: String
    }
});
exports.DxToolbarItem = DxToolbarItem;
DxToolbarItem.$_optionName = "toolbarItems";
DxToolbarItem.$_isCollectionItem = true;
exports.default = DxTagBox;


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/tag_box.js":
/*!***************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/tag_box.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_selection_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/selection_filter */ "./node_modules/devextreme/esm/core/utils/selection_filter.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _text_box_utils_caret__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./text_box/utils.caret */ "./node_modules/devextreme/esm/ui/text_box/utils.caret.js");
/* harmony import */ var _data_data_source_utils__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../data/data_source/utils */ "./node_modules/devextreme/esm/data/data_source/utils.js");
/* harmony import */ var _select_box__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./select_box */ "./node_modules/devextreme/esm/ui/select_box.js");
/* harmony import */ var _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../core/templates/bindable_template */ "./node_modules/devextreme/esm/core/templates/bindable_template.js");
/* harmony import */ var _text_box_utils_scroll__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./text_box/utils.scroll */ "./node_modules/devextreme/esm/ui/text_box/utils.scroll.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/**
 * DevExtreme (esm/ui/tag_box.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

























var TAGBOX_TAG_DATA_KEY = "dxTagData";
var TAGBOX_CLASS = "dx-tagbox";
var TAGBOX_TAG_CONTAINER_CLASS = "dx-tag-container";
var TAGBOX_TAG_CLASS = "dx-tag";
var TAGBOX_MULTI_TAG_CLASS = "dx-tagbox-multi-tag";
var TAGBOX_CUSTOM_TAG_CLASS = "dx-tag-custom";
var TAGBOX_TAG_REMOVE_BUTTON_CLASS = "dx-tag-remove-button";
var TAGBOX_ONLY_SELECT_CLASS = "dx-tagbox-only-select";
var TAGBOX_SINGLE_LINE_CLASS = "dx-tagbox-single-line";
var TAGBOX_POPUP_WRAPPER_CLASS = "dx-tagbox-popup-wrapper";
var TAGBOX_TAG_CONTENT_CLASS = "dx-tag-content";
var TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS = "dx-tagbox-default-template";
var TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS = "dx-tagbox-custom-template";
var NATIVE_CLICK_CLASS = "dx-native-click";
var TEXTEDITOR_INPUT_CONTAINER_CLASS = "dx-texteditor-input-container";
var TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER = -.3;
var TagBox = _select_box__WEBPACK_IMPORTED_MODULE_21__["default"].inherit({
    _supportedKeys: function() {
        var parent = this.callBase();
        var sendToList = options => this._list._keyboardHandler(options);
        var rtlEnabled = this.option("rtlEnabled");
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_13__["extend"])({}, parent, {
            backspace: function(e) {
                if (!this._isCaretAtTheStart()) {
                    return
                }
                this._processKeyboardEvent(e);
                this._isTagRemoved = true;
                var $tagToDelete = this._$focusedTag || this._tagElements().last();
                if (this._$focusedTag) {
                    this._moveTagFocus("prev", true)
                }
                if (0 === $tagToDelete.length) {
                    return
                }
                this._preserveFocusedTag = true;
                this._removeTagElement($tagToDelete);
                delete this._preserveFocusedTag
            },
            upArrow: (e, opts) => e.altKey || !this._list ? parent.upArrow.call(this, e) : sendToList(opts),
            downArrow: (e, opts) => e.altKey || !this._list ? parent.downArrow.call(this, e) : sendToList(opts),
            del: function(e) {
                if (!this._$focusedTag || !this._isCaretAtTheStart()) {
                    return
                }
                this._processKeyboardEvent(e);
                this._isTagRemoved = true;
                var $tagToDelete = this._$focusedTag;
                this._moveTagFocus("next", true);
                this._preserveFocusedTag = true;
                this._removeTagElement($tagToDelete);
                delete this._preserveFocusedTag
            },
            enter: function(e, options) {
                var isListItemFocused = this._list && null !== this._list.option("focusedElement");
                var isCustomItem = this.option("acceptCustomValue") && !isListItemFocused;
                if (isCustomItem) {
                    e.preventDefault();
                    "" !== this._searchValue() && this._customItemAddedHandler(e);
                    return
                }
                if (this.option("opened")) {
                    this._saveValueChangeEvent(e);
                    sendToList(options);
                    e.preventDefault()
                }
            },
            space: function(e, options) {
                var isOpened = this.option("opened");
                var isInputActive = this._shouldRenderSearchEvent();
                if (isOpened && !isInputActive) {
                    this._saveValueChangeEvent(e);
                    sendToList(options);
                    e.preventDefault()
                }
            },
            leftArrow: function(e) {
                if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && rtlEnabled && !this._$focusedTag) {
                    return
                }
                e.preventDefault();
                var direction = rtlEnabled ? "next" : "prev";
                this._moveTagFocus(direction);
                !this.option("multiline") && this._scrollContainer(direction)
            },
            rightArrow: function(e) {
                if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && !rtlEnabled && !this._$focusedTag) {
                    return
                }
                e.preventDefault();
                var direction = rtlEnabled ? "prev" : "next";
                this._moveTagFocus(direction);
                !this.option("multiline") && this._scrollContainer(direction)
            }
        })
    },
    _processKeyboardEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this._saveValueChangeEvent(e)
    },
    _isEmpty: function() {
        return 0 === this._getValue().length
    },
    _updateTagsContainer: function($element) {
        this._$tagsContainer = $element.addClass(TAGBOX_TAG_CONTAINER_CLASS).addClass(NATIVE_CLICK_CLASS);
        this._$tagsContainer.parent().addClass(NATIVE_CLICK_CLASS)
    },
    _allowSelectItemByTab: function() {
        return false
    },
    _isCaretAtTheStart: function() {
        var position = Object(_text_box_utils_caret__WEBPACK_IMPORTED_MODULE_19__["default"])(this._input());
        return 0 === position.start && 0 === position.end
    },
    _moveTagFocus: function(direction, clearOnBoundary) {
        if (!this._$focusedTag) {
            var tagElements = this._tagElements();
            this._$focusedTag = "next" === direction ? tagElements.first() : tagElements.last();
            this._toggleFocusClass(true, this._$focusedTag);
            return
        }
        var $nextFocusedTag = this._$focusedTag[direction](".".concat(TAGBOX_TAG_CLASS));
        if ($nextFocusedTag.length > 0) {
            this._replaceFocusedTag($nextFocusedTag)
        } else if (clearOnBoundary || "next" === direction && this._isEditable()) {
            this._clearTagFocus()
        }
    },
    _replaceFocusedTag: function($nextFocusedTag) {
        this._toggleFocusClass(false, this._$focusedTag);
        this._$focusedTag = $nextFocusedTag;
        this._toggleFocusClass(true, this._$focusedTag)
    },
    _clearTagFocus: function() {
        if (!this._$focusedTag) {
            return
        }
        this._toggleFocusClass(false, this._$focusedTag);
        delete this._$focusedTag
    },
    _focusClassTarget: function($element) {
        if ($element && $element.length && $element[0] !== this._focusTarget()[0]) {
            return $element
        }
        return this.callBase()
    },
    _getLabelContainer: function() {
        return this._$tagsContainer
    },
    _scrollContainer: function(direction) {
        if (this.option("multiline") || !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_12__["hasWindow"])()) {
            return
        }
        if (!this._$tagsContainer) {
            return
        }
        var scrollPosition = this._getScrollPosition(direction);
        this._$tagsContainer.scrollLeft(scrollPosition)
    },
    _getScrollPosition: function(direction) {
        if ("start" === direction || "end" === direction) {
            return this._getBorderPosition(direction)
        }
        return this._$focusedTag ? this._getFocusedTagPosition(direction) : this._getBorderPosition("end")
    },
    _getBorderPosition: function(direction) {
        var rtlEnabled = this.option("rtlEnabled");
        var isScrollLeft = "end" === direction ^ rtlEnabled;
        var scrollSign = rtlEnabled ? -1 : 1;
        return isScrollLeft ^ !rtlEnabled ? 0 : scrollSign * (this._$tagsContainer.get(0).scrollWidth - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(this._$tagsContainer))
    },
    _getFocusedTagPosition: function(direction) {
        var rtlEnabled = this.option("rtlEnabled");
        var isScrollLeft = "next" === direction ^ rtlEnabled;
        var {
            left: scrollOffset
        } = this._$focusedTag.position();
        var scrollLeft = this._$tagsContainer.scrollLeft();
        if (isScrollLeft) {
            scrollOffset += Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(this._$focusedTag, true) - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(this._$tagsContainer)
        }
        if (isScrollLeft ^ scrollOffset < 0) {
            scrollLeft += scrollOffset
        }
        return scrollLeft
    },
    _setNextValue: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_13__["extend"])(this.callBase(), {
            value: [],
            showDropDownButton: false,
            maxFilterQueryLength: 1500,
            tagTemplate: "tag",
            selectAllText: _localization_message__WEBPACK_IMPORTED_MODULE_16__["default"].format("dxList-selectAll"),
            hideSelectedItems: false,
            selectedItems: [],
            selectAllMode: "page",
            onSelectAllValueChanged: null,
            maxDisplayedTags: void 0,
            showMultiTagOnly: true,
            onMultiTagPreparing: null,
            multiline: true,
            useSubmitBehavior: true
        })
    },
    _init: function() {
        this.callBase();
        this._selectedItems = [];
        this._initSelectAllValueChangedAction()
    },
    _initActions: function() {
        this.callBase();
        this._initMultiTagPreparingAction()
    },
    _initMultiTagPreparingAction: function() {
        this._multiTagPreparingAction = this._createActionByOption("onMultiTagPreparing", {
            beforeExecute: function(e) {
                this._multiTagPreparingHandler(e.args[0])
            }.bind(this),
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _multiTagPreparingHandler: function(args) {
        var {
            length: selectedCount
        } = this._getValue();
        if (!this.option("showMultiTagOnly")) {
            args.text = _localization_message__WEBPACK_IMPORTED_MODULE_16__["default"].getFormatter("dxTagBox-moreSelected")(selectedCount - this.option("maxDisplayedTags") + 1)
        } else {
            args.text = _localization_message__WEBPACK_IMPORTED_MODULE_16__["default"].getFormatter("dxTagBox-selected")(selectedCount)
        }
    },
    _initDynamicTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            tag: new _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_22__["BindableTemplate"](($container, data) => {
                var _data$text;
                var $tagContent = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(TAGBOX_TAG_CONTENT_CLASS);
                Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<span>").text(null !== (_data$text = data.text) && void 0 !== _data$text ? _data$text : data).appendTo($tagContent);
                Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(TAGBOX_TAG_REMOVE_BUTTON_CLASS).appendTo($tagContent);
                $container.append($tagContent)
            }, ["text"], this.option("integrationOptions.watchMethod"), {
                text: this._displayGetter
            })
        })
    },
    _toggleSubmitElement: function(enabled) {
        if (enabled) {
            this._renderSubmitElement();
            this._setSubmitValue()
        } else {
            this._$submitElement && this._$submitElement.remove();
            delete this._$submitElement
        }
    },
    _renderSubmitElement: function() {
        if (!this.option("useSubmitBehavior")) {
            return
        }
        this._$submitElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<select>").attr("multiple", "multiple").css("display", "none").appendTo(this.$element())
    },
    _setSubmitValue: function() {
        if (!this.option("useSubmitBehavior")) {
            return
        }
        var value = this._getValue();
        var $options = [];
        for (var i = 0, n = value.length; i < n; i++) {
            var useDisplayText = this._shouldUseDisplayValue(value[i]);
            $options.push(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<option>").val(useDisplayText ? this._displayGetter(value[i]) : value[i]).attr("selected", "selected"))
        }
        this._getSubmitElement().empty().append($options)
    },
    _initMarkup: function() {
        this._tagElementsCache = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])();
        var isSingleLineMode = !this.option("multiline");
        this.$element().addClass(TAGBOX_CLASS).toggleClass(TAGBOX_ONLY_SELECT_CLASS, !(this.option("searchEnabled") || this.option("acceptCustomValue"))).toggleClass(TAGBOX_SINGLE_LINE_CLASS, isSingleLineMode);
        this._initTagTemplate();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this._renderTagRemoveAction();
        this._renderSingleLineScroll();
        this._scrollContainer("start")
    },
    _initTagTemplate: function() {
        this._tagTemplate = this._getTemplateByOption("tagTemplate")
    },
    _renderField: function() {
        var isDefaultFieldTemplate = !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(this.option("fieldTemplate"));
        this.$element().toggleClass(TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS, isDefaultFieldTemplate).toggleClass(TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS, !isDefaultFieldTemplate);
        this.callBase()
    },
    _renderTagRemoveAction: function() {
        var tagRemoveAction = this._createAction(this._removeTagHandler.bind(this));
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])(_events_click__WEBPACK_IMPORTED_MODULE_18__["name"], "dxTagBoxTagRemove");
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].off(this._$tagsContainer, eventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(this._$tagsContainer, eventName, ".".concat(TAGBOX_TAG_REMOVE_BUTTON_CLASS), event => {
            tagRemoveAction({
                event: event
            })
        })
    },
    _renderSingleLineScroll: function() {
        var mouseWheelEvent = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("dxmousewheel", this.NAME);
        var $element = this.$element();
        var isMultiline = this.option("multiline");
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].off($element, mouseWheelEvent);
        if ("desktop" !== _core_devices__WEBPACK_IMPORTED_MODULE_2__["default"].real().deviceType) {
            this._$tagsContainer && this._$tagsContainer.css("overflowX", isMultiline ? "" : "auto");
            return
        }
        if (isMultiline) {
            return
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on($element, mouseWheelEvent, this._tagContainerMouseWheelHandler.bind(this))
    },
    _tagContainerMouseWheelHandler: function(e) {
        var scrollLeft = this._$tagsContainer.scrollLeft();
        var delta = e.delta * TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER;
        if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["isCommandKeyPressed"])(e) && Object(_text_box_utils_scroll__WEBPACK_IMPORTED_MODULE_23__["allowScroll"])(this._$tagsContainer, delta, true)) {
            this._$tagsContainer.scrollLeft(scrollLeft + delta);
            return false
        }
    },
    _renderEvents: function() {
        this.callBase();
        var input = this._input();
        var namespace = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("keydown", this.NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(input, namespace, e => {
            var keyName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["normalizeKeyName"])(e);
            if (!this._isControlKey(keyName) && this._isEditable()) {
                this._clearTagFocus()
            }
        })
    },
    _popupWrapperClass: function() {
        return this.callBase() + " " + TAGBOX_POPUP_WRAPPER_CLASS
    },
    _renderInput: function() {
        this.callBase();
        this._renderPreventBlurOnInputClick()
    },
    _renderPreventBlurOnInputClick: function() {
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("mousedown", "dxTagBox");
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].off(this._inputWrapper(), eventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(this._inputWrapper(), eventName, e => {
            if (e.target !== this._input()[0]) {
                e.preventDefault()
            }
        })
    },
    _renderInputValueImpl: function() {
        return this._renderMultiSelect()
    },
    _loadInputValue: function() {
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["when"])()
    },
    _clearTextValue: function() {
        this._input().val("");
        this._toggleEmptinessEventHandler();
        this.option("text", "")
    },
    _focusInHandler: function(e) {
        if (!this._preventNestedFocusEvent(e)) {
            this._scrollContainer("end")
        }
        this.callBase(e)
    },
    _renderInputValue: function() {
        this.option("displayValue", this._searchValue());
        return this.callBase()
    },
    _restoreInputText: function(saveEditingValue) {
        if (!saveEditingValue) {
            this._clearTextValue()
        }
    },
    _focusOutHandler: function(e) {
        if (!this._preventNestedFocusEvent(e)) {
            this._clearTagFocus();
            this._scrollContainer("start")
        }
        this.callBase(e)
    },
    _getFirstPopupElement: function() {
        return this.option("showSelectionControls") ? this._list.$element() : this.callBase()
    },
    _initSelectAllValueChangedAction: function() {
        this._selectAllValueChangeAction = this._createActionByOption("onSelectAllValueChanged")
    },
    _renderList: function() {
        this.callBase();
        this._setListDataSourceFilter();
        if (this.option("showSelectionControls")) {
            this._list.registerKeyHandler("tab", e => this._popupElementTabHandler(e));
            this._list.registerKeyHandler("escape", e => this._popupElementEscHandler(e))
        }
    },
    _canListHaveFocus: function() {
        return "useButtons" === this.option("applyValueMode")
    },
    _listConfig: function() {
        var selectionMode = this.option("showSelectionControls") ? "all" : "multiple";
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_13__["extend"])(this.callBase(), {
            selectionMode: selectionMode,
            selectAllText: this.option("selectAllText"),
            onSelectAllValueChanged: _ref => {
                var {
                    value: value
                } = _ref;
                this._selectAllValueChangeAction({
                    value: value
                })
            },
            selectAllMode: this.option("selectAllMode"),
            selectedItems: this._selectedItems,
            onFocusedItemChanged: null
        })
    },
    _renderMultiSelect: function() {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        this._updateTagsContainer(this._$textEditorInputContainer);
        this._renderInputSize();
        this._renderTags().done(() => {
            this._popup && this._popup.refreshPosition();
            d.resolve()
        }).fail(d.reject);
        return d.promise()
    },
    _listItemClickHandler: function(e) {
        !this.option("showSelectionControls") && this._clearTextValue();
        if ("useButtons" === this.option("applyValueMode")) {
            return
        }
        this.callBase(e);
        this._saveValueChangeEvent(void 0)
    },
    _shouldClearFilter: function() {
        var shouldClearFilter = this.callBase();
        var showSelectionControls = this.option("showSelectionControls");
        return !showSelectionControls && shouldClearFilter
    },
    _renderInputSize: function() {
        var $input = this._input();
        var value = $input.val();
        var isEmptyInput = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isString"])(value) && value;
        var width = "";
        var size = "";
        var canTypeText = this.option("searchEnabled") || this.option("acceptCustomValue");
        if (isEmptyInput && canTypeText) {
            var $calculationElement = Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_9__["createTextElementHiddenCopy"])($input, value, {
                includePaddings: true
            });
            $calculationElement.insertAfter($input);
            width = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])($calculationElement) + 5;
            $calculationElement.remove()
        } else if (!value) {
            size = 1
        }
        $input.css("width", width);
        $input.attr("size", size)
    },
    _renderInputSubstitution: function() {
        this.callBase();
        this._updateWidgetHeight()
    },
    _getValue: function() {
        return this.option("value") || []
    },
    _multiTagRequired: function() {
        var values = this._getValue();
        var maxDisplayedTags = this.option("maxDisplayedTags");
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(maxDisplayedTags) && values.length > maxDisplayedTags
    },
    _renderMultiTag: function($input) {
        var $tag = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(TAGBOX_TAG_CLASS).addClass(TAGBOX_MULTI_TAG_CLASS);
        var args = {
            multiTagElement: Object(_core_element__WEBPACK_IMPORTED_MODULE_10__["getPublicElement"])($tag),
            selectedItems: this.option("selectedItems")
        };
        this._multiTagPreparingAction(args);
        if (args.cancel) {
            return false
        }
        $tag.data(TAGBOX_TAG_DATA_KEY, args.text);
        $tag.insertBefore($input);
        this._tagTemplate.render({
            model: args.text,
            container: Object(_core_element__WEBPACK_IMPORTED_MODULE_10__["getPublicElement"])($tag)
        });
        return $tag
    },
    _getFilter: function(creator) {
        var dataSourceFilter = this._dataSource.filter();
        var filterExpr = creator.getCombinedFilter(this.option("valueExpr"), dataSourceFilter);
        var filterQueryLength = encodeURI(JSON.stringify(filterExpr)).length;
        var maxFilterQueryLength = this.option("maxFilterQueryLength");
        if (filterQueryLength <= maxFilterQueryLength) {
            return filterExpr
        }
        _widget_ui_errors__WEBPACK_IMPORTED_MODULE_24__["default"].log("W1019", maxFilterQueryLength)
    },
    _getFilteredItems: function(values) {
        var _this$_loadFilteredIt, _this$_list, _this$_list$getDataSo;
        null === (_this$_loadFilteredIt = this._loadFilteredItemsPromise) || void 0 === _this$_loadFilteredIt ? void 0 : _this$_loadFilteredIt.reject();
        var creator = new _core_utils_selection_filter__WEBPACK_IMPORTED_MODULE_7__["SelectionFilterCreator"](values);
        var listSelectedItems = null === (_this$_list = this._list) || void 0 === _this$_list ? void 0 : _this$_list.option("selectedItems");
        var isListItemsLoaded = !!listSelectedItems && (null === (_this$_list$getDataSo = this._list.getDataSource()) || void 0 === _this$_list$getDataSo ? void 0 : _this$_list$getDataSo.isLoaded());
        var selectedItems = listSelectedItems || this.option("selectedItems");
        var clientFilterFunction = creator.getLocalFilter(this._valueGetter);
        var filteredItems = selectedItems.filter(clientFilterFunction);
        var selectedItemsAlreadyLoaded = filteredItems.length === values.length;
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        var dataSource = this._dataSource;
        if (!dataSource) {
            return d.resolve([]).promise()
        } else if ((!this._isDataSourceChanged || isListItemsLoaded) && selectedItemsAlreadyLoaded) {
            return d.resolve(filteredItems).promise()
        } else {
            var {
                customQueryParams: customQueryParams,
                expand: expand,
                select: select
            } = dataSource.loadOptions();
            var filter = this._getFilter(creator);
            dataSource.store().load({
                filter: filter,
                customQueryParams: customQueryParams,
                expand: expand,
                select: select
            }).done((data, extra) => {
                this._isDataSourceChanged = false;
                if (this._disposed) {
                    d.reject();
                    return
                }
                var {
                    data: items
                } = Object(_data_data_source_utils__WEBPACK_IMPORTED_MODULE_20__["normalizeLoadResult"])(data, extra);
                var mappedItems = dataSource._applyMapFunction(items);
                d.resolve(mappedItems.filter(clientFilterFunction))
            }).fail(d.reject);
            this._loadFilteredItemsPromise = d;
            return d.promise()
        }
    },
    _createTagsData: function(values, filteredItems) {
        var items = [];
        var cache = {};
        var isValueExprSpecified = "this" === this._valueGetterExpr();
        var filteredValues = {};
        filteredItems.forEach(filteredItem => {
            var filteredItemValue = isValueExprSpecified ? JSON.stringify(filteredItem) : this._valueGetter(filteredItem);
            filteredValues[filteredItemValue] = filteredItem
        });
        var loadItemPromises = [];
        values.forEach((value, index) => {
            var currentItem = filteredValues[isValueExprSpecified ? JSON.stringify(value) : value];
            if (isValueExprSpecified && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(currentItem)) {
                loadItemPromises.push(this._loadItem(value, cache).always(item => {
                    var newItem = this._createTagData(items, item, value, index);
                    items.splice(index, 0, newItem)
                }))
            } else {
                var newItem = this._createTagData(items, currentItem, value, index);
                items.splice(index, 0, newItem)
            }
        });
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["when"].apply(this, loadItemPromises).always((function() {
            d.resolve(items)
        }));
        return d.promise()
    },
    _createTagData: function(items, item, value, valueIndex) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(item)) {
            this._selectedItems.push(item);
            return item
        } else {
            var selectedItem = this.option("selectedItem");
            var customItem = this._valueGetter(selectedItem) === value ? selectedItem : value;
            return customItem
        }
    },
    _isGroupedData: function() {
        var _this$_dataSource;
        return this.option("grouped") && !(null !== (_this$_dataSource = this._dataSource) && void 0 !== _this$_dataSource && _this$_dataSource.group())
    },
    _getItemsByValues: function(values) {
        var resultItems = [];
        values.forEach(function(value) {
            var item = this._getItemFromPlain(value);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(item)) {
                resultItems.push(item)
            }
        }.bind(this));
        return resultItems
    },
    _getFilteredGroupedItems: function(values) {
        var selectedItems = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        if (!this._dataSource) {
            return selectedItems.promise()
        }
        if (this._filteredGroupedItemsLoadPromise) {
            this._dataSource.cancel(this._filteredGroupedItemsLoadPromise.operationId)
        }
        if (!this._dataSource.items().length) {
            this._filteredGroupedItemsLoadPromise = this._dataSource.load().done(() => {
                selectedItems.resolve(this._getItemsByValues(values))
            }).fail(() => {
                selectedItems.resolve([])
            }).always(() => {
                this._filteredGroupedItemsLoadPromise = void 0
            })
        } else {
            selectedItems.resolve(this._getItemsByValues(values))
        }
        return selectedItems.promise()
    },
    _loadTagsData: function() {
        var values = this._getValue();
        var tagData = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        this._selectedItems = [];
        var filteredItemsPromise = this._isGroupedData() ? this._getFilteredGroupedItems(values) : this._getFilteredItems(values);
        filteredItemsPromise.done(filteredItems => {
            var items = this._createTagsData(values, filteredItems);
            items.always((function(data) {
                tagData.resolve(data)
            }))
        }).fail(tagData.reject.bind(this));
        return tagData.promise()
    },
    _renderTags: function() {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        var isPlainDataUsed = false;
        if (this._shouldGetItemsFromPlain(this._valuesToUpdate)) {
            this._selectedItems = this._getItemsFromPlain(this._valuesToUpdate);
            if (this._selectedItems.length === this._valuesToUpdate.length) {
                this._renderTagsImpl(this._selectedItems);
                isPlainDataUsed = true;
                d.resolve()
            }
        }
        if (!isPlainDataUsed) {
            this._loadTagsData().done(items => {
                if (this._disposed) {
                    d.reject();
                    return
                }
                this._renderTagsImpl(items);
                d.resolve()
            }).fail(d.reject)
        }
        return d.promise()
    },
    _renderTagsImpl: function(items) {
        this._renderTagsCore(items);
        this._renderEmptyState();
        if (!this._preserveFocusedTag) {
            this._clearTagFocus()
        }
    },
    _shouldGetItemsFromPlain: function(values) {
        return values && this._dataSource.isLoaded() && values.length <= this._getPlainItems().length
    },
    _getItemsFromPlain: function(values) {
        var selectedItems = this._getSelectedItemsFromList(values);
        var needFilterPlainItems = 0 === selectedItems.length && values.length > 0 || selectedItems.length < values.length;
        if (needFilterPlainItems) {
            var plainItems = this._getPlainItems();
            selectedItems = this._filterSelectedItems(plainItems, values)
        }
        return selectedItems
    },
    _getSelectedItemsFromList: function(values) {
        var _this$_list2;
        var listSelectedItems = null === (_this$_list2 = this._list) || void 0 === _this$_list2 ? void 0 : _this$_list2.option("selectedItems");
        var selectedItems = [];
        if (values.length === (null === listSelectedItems || void 0 === listSelectedItems ? void 0 : listSelectedItems.length)) {
            selectedItems = this._filterSelectedItems(listSelectedItems, values)
        }
        return selectedItems
    },
    _filterSelectedItems: function(plainItems, values) {
        var selectedItems = plainItems.filter(dataItem => {
            var currentValue;
            for (var i = 0; i < values.length; i++) {
                currentValue = values[i];
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isObject"])(currentValue)) {
                    if (this._isValueEquals(dataItem, currentValue)) {
                        return true
                    }
                } else if (this._isValueEquals(this._valueGetter(dataItem), currentValue)) {
                    return true
                }
            }
            return false
        }, this);
        return selectedItems
    },
    _integrateInput: function() {
        this._isInputReady.resolve();
        this.callBase();
        this._updateTagsContainer(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(".".concat(TEXTEDITOR_INPUT_CONTAINER_CLASS)));
        this._renderTagRemoveAction()
    },
    _renderTagsCore: function(items) {
        var _this$_isInputReady;
        null === (_this$_isInputReady = this._isInputReady) || void 0 === _this$_isInputReady ? void 0 : _this$_isInputReady.reject();
        this._isInputReady = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        this._renderField();
        this.option("selectedItems", this._selectedItems.slice());
        this._cleanTags();
        if (this._input().length > 0) {
            this._isInputReady.resolve()
        }
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["when"])(this._isInputReady).done(() => {
            this._renderTagsElements(items)
        })
    },
    _renderTagsElements(items) {
        var $multiTag = this._multiTagRequired() && this._renderMultiTag(this._input());
        var showMultiTagOnly = this.option("showMultiTagOnly");
        var maxDisplayedTags = this.option("maxDisplayedTags");
        items.forEach((item, index) => {
            if ($multiTag && showMultiTagOnly || $multiTag && !showMultiTagOnly && index - maxDisplayedTags >= -1) {
                return false
            }
            this._renderTag(item, $multiTag || this._input())
        });
        if (this._isFocused()) {
            this._scrollContainer("end")
        }
        this._refreshTagElements()
    },
    _cleanTags: function() {
        if (this._multiTagRequired()) {
            this._tagElements().remove()
        } else {
            var $tags = this._tagElements();
            var values = this._getValue();
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])($tags, (function(_, tag) {
                var $tag = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(tag);
                var index = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_14__["inArray"])($tag.data(TAGBOX_TAG_DATA_KEY), values);
                if (index < 0) {
                    $tag.remove()
                }
            }))
        }
    },
    _renderEmptyState: function() {
        var isEmpty = !(this._getValue().length || this._selectedItems.length || this._searchValue());
        this._toggleEmptiness(isEmpty);
        this._renderDisplayText()
    },
    _renderDisplayText: function() {
        this._renderInputSize()
    },
    _refreshTagElements: function() {
        this._tagElementsCache = this.$element().find(".".concat(TAGBOX_TAG_CLASS))
    },
    _tagElements: function() {
        return this._tagElementsCache
    },
    _applyTagTemplate: function(item, $tag) {
        this._tagTemplate.render({
            model: item,
            container: Object(_core_element__WEBPACK_IMPORTED_MODULE_10__["getPublicElement"])($tag)
        })
    },
    _renderTag: function(item, $input) {
        var value = this._valueGetter(item);
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(value)) {
            return
        }
        var $tag = this._getTag(value);
        var displayValue = this._displayGetter(item);
        var itemModel = this._getItemModel(item, displayValue);
        if ($tag) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(displayValue)) {
                $tag.empty();
                this._applyTagTemplate(itemModel, $tag)
            }
            $tag.removeClass(TAGBOX_CUSTOM_TAG_CLASS)
        } else {
            $tag = this._createTag(value, $input);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(item)) {
                this._applyTagTemplate(itemModel, $tag)
            } else {
                $tag.addClass(TAGBOX_CUSTOM_TAG_CLASS);
                this._applyTagTemplate(value, $tag)
            }
        }
    },
    _getItemModel: function(item, displayValue) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isObject"])(item) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(displayValue)) {
            return item
        } else {
            return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["ensureDefined"])(displayValue, "")
        }
    },
    _getTag: function(value) {
        var $tags = this._tagElements();
        var tagsLength = $tags.length;
        var result = false;
        for (var i = 0; i < tagsLength; i++) {
            var $tag = $tags[i];
            var tagData = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_3__["data"])($tag, TAGBOX_TAG_DATA_KEY);
            if (value === tagData || Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["equalByValue"])(value, tagData)) {
                result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])($tag);
                break
            }
        }
        return result
    },
    _createTag: function(value, $input) {
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(TAGBOX_TAG_CLASS).data(TAGBOX_TAG_DATA_KEY, value).insertBefore($input)
    },
    _toggleEmptinessEventHandler: function() {
        this._toggleEmptiness(!this._getValue().length && !this._searchValue().length)
    },
    _customItemAddedHandler: function(e) {
        this.callBase(e);
        this._clearTextValue()
    },
    _removeTagHandler: function(args) {
        var e = args.event;
        e.stopPropagation();
        this._saveValueChangeEvent(e);
        var $tag = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest(".".concat(TAGBOX_TAG_CLASS));
        this._removeTagElement($tag)
    },
    _removeTagElement: function($tag) {
        if ($tag.hasClass(TAGBOX_MULTI_TAG_CLASS)) {
            if (!this.option("showMultiTagOnly")) {
                this.option("value", this._getValue().slice(0, this.option("maxDisplayedTags")))
            } else {
                this.reset()
            }
            return
        }
        var itemValue = $tag.data(TAGBOX_TAG_DATA_KEY);
        this._removeTagWithUpdate(itemValue);
        this._refreshTagElements()
    },
    _updateField: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _removeTagWithUpdate: function(itemValue) {
        var value = this._getValue().slice();
        this._removeTag(value, itemValue);
        this.option("value", value);
        if (0 === value.length) {
            this._clearTagFocus()
        }
    },
    _getCurrentValue: function() {
        return this._lastValue()
    },
    _selectionChangeHandler: function(e) {
        if ("useButtons" === this.option("applyValueMode")) {
            return
        }
        var value = this._getValue().slice();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])(e.removedItems || [], (_, removedItem) => {
            this._removeTag(value, this._valueGetter(removedItem))
        });
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])(e.addedItems || [], (_, addedItem) => {
            this._addTag(value, this._valueGetter(addedItem))
        });
        this._updateWidgetHeight();
        if (!Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["equalByValue"])(this._list.option("selectedItemKeys"), this.option("value"))) {
            var listSelectionChangeEvent = this._list._getSelectionChangeEvent();
            listSelectionChangeEvent && this._saveValueChangeEvent(listSelectionChangeEvent);
            this.option("value", value)
        }
        this._list._saveSelectionChangeEvent(void 0)
    },
    _removeTag: function(value, item) {
        var index = this._valueIndex(item, value);
        if (index >= 0) {
            value.splice(index, 1)
        }
    },
    _addTag: function(value, item) {
        var index = this._valueIndex(item);
        if (index < 0) {
            value.push(item)
        }
    },
    _fieldRenderData: function() {
        return this._selectedItems.slice()
    },
    _completeSelection: function(value) {
        if (!this.option("showSelectionControls")) {
            this._setValue(value)
        }
    },
    _setValue: function(value) {
        if (null === value) {
            return
        }
        var useButtons = "useButtons" === this.option("applyValueMode");
        var valueIndex = this._valueIndex(value);
        var values = (useButtons ? this._list.option("selectedItemKeys") : this._getValue()).slice();
        if (valueIndex >= 0) {
            values.splice(valueIndex, 1)
        } else {
            values.push(value)
        }
        if ("useButtons" === this.option("applyValueMode")) {
            this._list.option("selectedItemKeys", values)
        } else {
            this.option("value", values)
        }
    },
    _isSelectedValue: function(value, cache) {
        return this._valueIndex(value, null, cache) > -1
    },
    _valueIndex: function(value, values, cache) {
        var result = -1;
        if (cache && "object" !== typeof value) {
            if (!cache.indexByValues) {
                cache.indexByValues = {};
                values = values || this._getValue();
                values.forEach((function(value, index) {
                    cache.indexByValues[value] = index
                }))
            }
            if (value in cache.indexByValues) {
                return cache.indexByValues[value]
            }
        }
        values = values || this._getValue();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])(values, (index, selectedValue) => {
            if (this._isValueEquals(value, selectedValue)) {
                result = index;
                return false
            }
        });
        return result
    },
    _lastValue: function() {
        var values = this._getValue();
        var lastValue = values[values.length - 1];
        return null !== lastValue && void 0 !== lastValue ? lastValue : null
    },
    _valueChangeEventHandler: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _shouldRenderSearchEvent: function() {
        return this.option("searchEnabled") || this.option("acceptCustomValue")
    },
    _searchHandler: function(e) {
        if (this.option("searchEnabled") && !!e && !this._isTagRemoved) {
            this.callBase(arguments);
            this._setListDataSourceFilter()
        }
        this._updateWidgetHeight();
        delete this._isTagRemoved
    },
    _updateWidgetHeight: function() {
        var element = this.$element();
        var originalHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(element);
        this._renderInputSize();
        var currentHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(element);
        if (this._popup && this.option("opened") && this._isEditable() && currentHeight !== originalHeight) {
            this._popup.repaint()
        }
    },
    _refreshSelected: function() {
        var _this$_list3;
        (null === (_this$_list3 = this._list) || void 0 === _this$_list3 ? void 0 : _this$_list3.getDataSource()) && this._list.option("selectedItems", this._selectedItems)
    },
    _resetListDataSourceFilter: function() {
        var dataSource = this._getDataSource();
        if (!dataSource) {
            return
        }
        delete this._userFilter;
        dataSource.filter(null);
        dataSource.reload()
    },
    _setListDataSourceFilter: function() {
        if (!this.option("hideSelectedItems") || !this._list) {
            return
        }
        var dataSource = this._getDataSource();
        if (!dataSource) {
            return
        }
        var valueGetterExpr = this._valueGetterExpr();
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isString"])(valueGetterExpr) && "this" !== valueGetterExpr) {
            var filter = this._dataSourceFilterExpr();
            if (void 0 === this._userFilter) {
                this._userFilter = dataSource.filter() || null
            }
            this._userFilter && filter.push(this._userFilter);
            filter.length ? dataSource.filter(filter) : dataSource.filter(null)
        } else {
            dataSource.filter(this._dataSourceFilterFunction.bind(this))
        }
        dataSource.load()
    },
    _dataSourceFilterExpr: function() {
        var filter = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])(this._getValue(), (index, value) => {
            filter.push(["!", [this._valueGetterExpr(), value]])
        });
        return filter
    },
    _dataSourceFilterFunction: function(itemData) {
        var itemValue = this._valueGetter(itemData);
        var result = true;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])(this._getValue(), (index, value) => {
            if (this._isValueEquals(value, itemValue)) {
                result = false;
                return false
            }
        });
        return result
    },
    _dataSourceChangedHandler: function() {
        this._isDataSourceChanged = true;
        this.callBase.apply(this, arguments)
    },
    _applyButtonHandler: function(args) {
        this._saveValueChangeEvent(args.event);
        this.option("value", this._getSortedListValues());
        this._clearTextValue();
        this.callBase();
        this._cancelSearchIfNeed()
    },
    _getSortedListValues: function() {
        var listValues = this._getListValues();
        var currentValue = this.option("value") || [];
        var existedItems = listValues.length ? currentValue.filter(item => -1 !== listValues.indexOf(item)) : [];
        var newItems = existedItems.length ? listValues.filter(item => -1 === currentValue.indexOf(item)) : listValues;
        return existedItems.concat(newItems)
    },
    _getListValues: function() {
        if (!this._list) {
            return []
        }
        var selectedItems = this._getPlainItems(this._list.option("selectedItems"));
        var result = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])(selectedItems, (index, item) => {
            result[index] = this._valueGetter(item)
        });
        return result
    },
    _setListDataSource: function() {
        var currentValue = this._getValue();
        this.callBase();
        if (currentValue !== this.option("value")) {
            this.option("value", currentValue)
        }
        this._refreshSelected()
    },
    _renderOpenedState: function() {
        this.callBase();
        if ("useButtons" === this.option("applyValueMode") && !this.option("opened")) {
            this._refreshSelected()
        }
    },
    reset: function() {
        this._restoreInputText();
        var defaultValue = this._getDefaultOptions().value;
        var currentValue = this.option("value");
        if (defaultValue && 0 === defaultValue.length && currentValue && defaultValue.length === currentValue.length) {
            return
        }
        this.callBase()
    },
    _clean: function() {
        this.callBase();
        delete this._defaultTagTemplate;
        delete this._valuesToUpdate;
        delete this._tagTemplate
    },
    _removeDuplicates: function(from, what) {
        var result = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_15__["each"])(from, (_, value) => {
            var filteredItems = what.filter(item => this._valueGetter(value) === this._valueGetter(item));
            if (!filteredItems.length) {
                result.push(value)
            }
        });
        return result
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onSelectAllValueChanged":
                this._initSelectAllValueChangedAction();
                break;
            case "onMultiTagPreparing":
                this._initMultiTagPreparingAction();
                this._renderTags();
                break;
            case "hideSelectedItems":
                if (args.value) {
                    this._setListDataSourceFilter()
                } else {
                    this._resetListDataSourceFilter()
                }
                break;
            case "useSubmitBehavior":
                this._toggleSubmitElement(args.value);
                break;
            case "displayExpr":
                this.callBase(args);
                this._initTemplates();
                this._invalidate();
                break;
            case "tagTemplate":
                this._initTagTemplate();
                this._invalidate();
                break;
            case "selectAllText":
                this._setListOption("selectAllText", this.option("selectAllText"));
                break;
            case "readOnly":
            case "disabled":
                this.callBase(args);
                !args.value && this._refreshEvents();
                break;
            case "value":
                this._valuesToUpdate = null === args || void 0 === args ? void 0 : args.value;
                this.callBase(args);
                this._valuesToUpdate = void 0;
                this._setListDataSourceFilter();
                break;
            case "maxDisplayedTags":
            case "showMultiTagOnly":
                this._renderTags();
                break;
            case "selectAllMode":
                this._setListOption(args.name, args.value);
                break;
            case "selectedItem":
                break;
            case "selectedItems":
                this._selectionChangedAction({
                    addedItems: this._removeDuplicates(args.value, args.previousValue),
                    removedItems: this._removeDuplicates(args.previousValue, args.value)
                });
                break;
            case "multiline":
                this.$element().toggleClass(TAGBOX_SINGLE_LINE_CLASS, !args.value);
                this._renderSingleLineScroll();
                break;
            case "maxFilterQueryLength":
                break;
            default:
                this.callBase(args)
        }
    },
    _getActualSearchValue: function() {
        return this.callBase() || this._searchValue()
    },
    _popupHidingHandler: function() {
        this.callBase();
        this._clearFilter()
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_5__["default"])("dxTagBox", TagBox);
/* harmony default export */ __webpack_exports__["default"] = (TagBox);


/***/ })

}]);