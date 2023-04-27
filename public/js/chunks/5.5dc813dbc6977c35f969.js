(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/devextreme-vue/accordion.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme-vue/accordion.js ***!
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
exports.DxItem = exports.DxAccordion = void 0;
var accordion_1 = __importDefault(__webpack_require__(/*! devextreme/ui/accordion */ "./node_modules/devextreme/esm/ui/accordion.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxAccordion = index_1.createComponent({
    props: {
        accessKey: String,
        activeStateEnabled: Boolean,
        animationDuration: Number,
        collapsible: Boolean,
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
        keyExpr: [Function, String],
        multiple: Boolean,
        noDataText: String,
        onContentReady: Function,
        onDisposing: Function,
        onInitialized: Function,
        onItemClick: Function,
        onItemContextMenu: Function,
        onItemHold: Function,
        onItemRendered: Function,
        onItemTitleClick: Function,
        onOptionChanged: Function,
        onSelectionChanged: Function,
        repaintChangesOnly: Boolean,
        rtlEnabled: Boolean,
        selectedIndex: Number,
        selectedItem: {},
        selectedItemKeys: Array,
        selectedItems: Array,
        tabIndex: Number,
        visible: Boolean,
        width: [Function, Number, String]
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:animationDuration": null,
        "update:collapsible": null,
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
        "update:keyExpr": null,
        "update:multiple": null,
        "update:noDataText": null,
        "update:onContentReady": null,
        "update:onDisposing": null,
        "update:onInitialized": null,
        "update:onItemClick": null,
        "update:onItemContextMenu": null,
        "update:onItemHold": null,
        "update:onItemRendered": null,
        "update:onItemTitleClick": null,
        "update:onOptionChanged": null,
        "update:onSelectionChanged": null,
        "update:repaintChangesOnly": null,
        "update:rtlEnabled": null,
        "update:selectedIndex": null,
        "update:selectedItem": null,
        "update:selectedItemKeys": null,
        "update:selectedItems": null,
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
        this.$_WidgetClass = accordion_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            item: { isCollectionItem: true, optionName: "items" }
        };
    }
});
exports.DxAccordion = DxAccordion;
var DxItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:disabled": null,
        "update:html": null,
        "update:icon": null,
        "update:template": null,
        "update:text": null,
        "update:title": null,
        "update:visible": null,
    },
    props: {
        disabled: Boolean,
        html: String,
        icon: String,
        template: {},
        text: String,
        title: String,
        visible: Boolean
    }
});
exports.DxItem = DxItem;
DxItem.$_optionName = "items";
DxItem.$_isCollectionItem = true;
exports.default = DxAccordion;


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/accordion.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/accordion.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _animation_fx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation/fx */ "./node_modules/devextreme/esm/animation/fx.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _collection_ui_collection_widget_live_update__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./collection/ui.collection_widget.live_update */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.live_update.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/templates/bindable_template */ "./node_modules/devextreme/esm/core/templates/bindable_template.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./themes */ "./node_modules/devextreme/esm/ui/themes.js");
/**
 * DevExtreme (esm/ui/accordion.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



















var ACCORDION_CLASS = "dx-accordion";
var ACCORDION_WRAPPER_CLASS = "dx-accordion-wrapper";
var ACCORDION_ITEM_CLASS = "dx-accordion-item";
var ACCORDION_ITEM_OPENED_CLASS = "dx-accordion-item-opened";
var ACCORDION_ITEM_CLOSED_CLASS = "dx-accordion-item-closed";
var ACCORDION_ITEM_TITLE_CLASS = "dx-accordion-item-title";
var ACCORDION_ITEM_BODY_CLASS = "dx-accordion-item-body";
var ACCORDION_ITEM_TITLE_CAPTION_CLASS = "dx-accordion-item-title-caption";
var ACCORDION_ITEM_DATA_KEY = "dxAccordionItemData";
var Accordion = _collection_ui_collection_widget_live_update__WEBPACK_IMPORTED_MODULE_14__["default"].inherit({
    _activeStateUnit: "." + ACCORDION_ITEM_CLASS,
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(this.callBase(), {
            hoverStateEnabled: true,
            height: void 0,
            itemTitleTemplate: "title",
            onItemTitleClick: null,
            selectedIndex: 0,
            collapsible: false,
            multiple: false,
            animationDuration: 300,
            deferRendering: true,
            selectionByClick: true,
            activeStateEnabled: true,
            _itemAttributes: {
                role: "tab"
            },
            _animationEasing: "ease"
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_5__["default"].real().deviceType && !_core_devices__WEBPACK_IMPORTED_MODULE_5__["default"].isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return Object(_themes__WEBPACK_IMPORTED_MODULE_18__["isMaterial"])()
            },
            options: {
                animationDuration: 200,
                _animationEasing: "cubic-bezier(0.4, 0, 0.2, 1)"
            }
        }])
    },
    _itemElements: function() {
        return this._itemContainer().children(this._itemSelector())
    },
    _init: function() {
        this.callBase();
        this.option("selectionRequired", !this.option("collapsible"));
        this.option("selectionMode", this.option("multiple") ? "multiple" : "single");
        var $element = this.$element();
        $element.addClass(ACCORDION_CLASS);
        this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(ACCORDION_WRAPPER_CLASS);
        $element.append(this._$container)
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            title: new _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_16__["BindableTemplate"]((function($container, data) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isPlainObject"])(data)) {
                    var $iconElement = Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_17__["getImageContainer"])(data.icon);
                    if ($iconElement) {
                        $container.append($iconElement)
                    }
                    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(data.title) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isPlainObject"])(data.title)) {
                        $container.append(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].createTextNode(data.title))
                    }
                } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(data)) {
                    $container.text(String(data))
                }
                $container.wrapInner(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(ACCORDION_ITEM_TITLE_CAPTION_CLASS))
            }), ["title", "icon"], this.option("integrationOptions.watchMethod"))
        })
    },
    _initMarkup: function() {
        this._deferredItems = [];
        this.callBase();
        this.setAria({
            role: "tablist",
            multiselectable: this.option("multiple")
        });
        Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_8__["deferRender"])(() => {
            var selectedItemIndices = this._getSelectedItemIndices();
            this._renderSelection(selectedItemIndices, [])
        })
    },
    _render: function() {
        this.callBase();
        this._updateItemHeightsWrapper(true)
    },
    _itemDataKey: function() {
        return ACCORDION_ITEM_DATA_KEY
    },
    _itemClass: function() {
        return ACCORDION_ITEM_CLASS
    },
    _itemContainer: function() {
        return this._$container
    },
    _itemTitles: function() {
        return this._itemElements().find("." + ACCORDION_ITEM_TITLE_CLASS)
    },
    _itemContents: function() {
        return this._itemElements().find("." + ACCORDION_ITEM_BODY_CLASS)
    },
    _getItemData: function(target) {
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target).parent().data(this._itemDataKey()) || this.callBase.apply(this, arguments)
    },
    _executeItemRenderAction: function(itemData) {
        if (itemData.type) {
            return
        }
        this.callBase.apply(this, arguments)
    },
    _itemSelectHandler: function(e) {
        if (Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest(this._itemContents()).length) {
            return
        }
        this.callBase.apply(this, arguments)
    },
    _afterItemElementDeleted: function($item, deletedActionArgs) {
        this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
        this.callBase.apply(this, arguments)
    },
    _renderItemContent: function(args) {
        var itemTitle = this.callBase(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({}, args, {
            contentClass: ACCORDION_ITEM_TITLE_CLASS,
            templateProperty: "titleTemplate",
            defaultTemplateName: this.option("itemTitleTemplate")
        }));
        this._attachItemTitleClickAction(itemTitle);
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(this._deferredItems[args.index])) {
            this._deferredItems[args.index] = deferred
        } else {
            this._deferredItems.push(deferred)
        }
        if (!this.option("deferRendering") || this._getSelectedItemIndices().indexOf(args.index) >= 0) {
            deferred.resolve()
        }
        deferred.done(this.callBase.bind(this, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({}, args, {
            contentClass: ACCORDION_ITEM_BODY_CLASS,
            container: Object(_core_element__WEBPACK_IMPORTED_MODULE_9__["getPublicElement"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(itemTitle).parent()))
        })))
    },
    _attachItemTitleClickAction: function(itemTitle) {
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])(_events_click__WEBPACK_IMPORTED_MODULE_4__["name"], this.NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(itemTitle, eventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(itemTitle, eventName, this._itemTitleClickHandler.bind(this))
    },
    _itemTitleClickHandler: function(e) {
        this._itemDXEventHandler(e, "onItemTitleClick")
    },
    _renderSelection: function(addedSelection, removedSelection) {
        this._itemElements().addClass(ACCORDION_ITEM_CLOSED_CLASS);
        this.setAria("hidden", true, this._itemContents());
        this._updateItems(addedSelection, removedSelection)
    },
    _updateSelection: function(addedSelection, removedSelection) {
        this._updateItems(addedSelection, removedSelection);
        this._updateItemHeightsWrapper(false)
    },
    _updateItems: function(addedSelection, removedSelection) {
        var $items = this._itemElements();
        _core_utils_iterator__WEBPACK_IMPORTED_MODULE_10__["each"](addedSelection, (_, index) => {
            this._deferredItems[index].resolve();
            var $item = $items.eq(index).addClass(ACCORDION_ITEM_OPENED_CLASS).removeClass(ACCORDION_ITEM_CLOSED_CLASS);
            this.setAria("hidden", false, $item.find("." + ACCORDION_ITEM_BODY_CLASS))
        });
        _core_utils_iterator__WEBPACK_IMPORTED_MODULE_10__["each"](removedSelection, (_, index) => {
            var $item = $items.eq(index).removeClass(ACCORDION_ITEM_OPENED_CLASS);
            this.setAria("hidden", true, $item.find("." + ACCORDION_ITEM_BODY_CLASS))
        })
    },
    _updateItemHeightsWrapper: function(skipAnimation) {
        if (this.option("templatesRenderAsynchronously")) {
            this._animationTimer = setTimeout(function() {
                this._updateItemHeights(skipAnimation)
            }.bind(this))
        } else {
            this._updateItemHeights(skipAnimation)
        }
    },
    _updateItemHeights: function(skipAnimation) {
        var that = this;
        var deferredAnimate = that._deferredAnimate;
        var itemHeight = this._splitFreeSpace(this._calculateFreeSpace());
        clearTimeout(this._animationTimer);
        return _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["when"].apply(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"], [].slice.call(this._itemElements()).map((function(item) {
            return that._updateItemHeight(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(item), itemHeight, skipAnimation)
        }))).done((function() {
            if (deferredAnimate) {
                deferredAnimate.resolveWith(that)
            }
        }))
    },
    _updateItemHeight: function($item, itemHeight, skipAnimation) {
        var $title = $item.children("." + ACCORDION_ITEM_TITLE_CLASS);
        if (_animation_fx__WEBPACK_IMPORTED_MODULE_3__["default"].isAnimating($item)) {
            _animation_fx__WEBPACK_IMPORTED_MODULE_3__["default"].stop($item)
        }
        var startItemHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($item);
        var finalItemHeight;
        if ($item.hasClass(ACCORDION_ITEM_OPENED_CLASS)) {
            finalItemHeight = itemHeight + Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($title);
            if (!finalItemHeight) {
                Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setHeight"])($item, "auto");
                finalItemHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($item)
            }
        } else {
            finalItemHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($title)
        }
        return this._animateItem($item, startItemHeight, finalItemHeight, skipAnimation, !!itemHeight)
    },
    _animateItem: function($element, startHeight, endHeight, skipAnimation, fixedHeight) {
        var d;
        if (skipAnimation || startHeight === endHeight) {
            $element.css("height", endHeight);
            d = (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"]).resolve()
        } else {
            d = _animation_fx__WEBPACK_IMPORTED_MODULE_3__["default"].animate($element, {
                type: "custom",
                from: {
                    height: startHeight
                },
                to: {
                    height: endHeight
                },
                duration: this.option("animationDuration"),
                easing: this.option("_animationEasing")
            })
        }
        return d.done((function() {
            if ($element.hasClass(ACCORDION_ITEM_OPENED_CLASS) && !fixedHeight) {
                $element.css("height", "")
            }
            $element.not("." + ACCORDION_ITEM_OPENED_CLASS).addClass(ACCORDION_ITEM_CLOSED_CLASS)
        }))
    },
    _splitFreeSpace: function(freeSpace) {
        if (!freeSpace) {
            return freeSpace
        }
        return freeSpace / this.option("selectedItems").length
    },
    _calculateFreeSpace: function() {
        var height = this.option("height");
        if (void 0 === height || "auto" === height) {
            return
        }
        var $titles = this._itemTitles();
        var itemsHeight = 0;
        _core_utils_iterator__WEBPACK_IMPORTED_MODULE_10__["each"]($titles, (function(_, title) {
            itemsHeight += Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])(title)
        }));
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this.$element()) - itemsHeight
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _dimensionChanged: function() {
        this._updateItemHeights(true)
    },
    _clean: function() {
        clearTimeout(this._animationTimer);
        this.callBase()
    },
    _tryParseItemPropertyName: function(fullName) {
        var matches = fullName.match(/.*\.(.*)/);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(matches) && matches.length >= 1) {
            return matches[1]
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "items":
                this.callBase(args);
                if ("title" === this._tryParseItemPropertyName(args.fullName)) {
                    this._renderSelection(this._getSelectedItemIndices(), [])
                }
                if ("visible" === this._tryParseItemPropertyName(args.fullName)) {
                    this._updateItemHeightsWrapper(true)
                }
                if (true === this.option("repaintChangesOnly") && "items" === args.fullName) {
                    this._updateItemHeightsWrapper(true);
                    this._renderSelection(this._getSelectedItemIndices(), [])
                }
                break;
            case "animationDuration":
            case "onItemTitleClick":
            case "_animationEasing":
                break;
            case "collapsible":
                this.option("selectionRequired", !this.option("collapsible"));
                break;
            case "itemTitleTemplate":
            case "height":
            case "deferRendering":
                this._invalidate();
                break;
            case "multiple":
                this.option("selectionMode", args.value ? "multiple" : "single");
                break;
            default:
                this.callBase(args)
        }
    },
    expandItem: function(index) {
        this._deferredAnimate = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        this.selectItem(index);
        return this._deferredAnimate.promise()
    },
    collapseItem: function(index) {
        this._deferredAnimate = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        this.unselectItem(index);
        return this._deferredAnimate.promise()
    },
    updateDimensions: function() {
        return this._updateItemHeights(false)
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_12__["default"])("dxAccordion", Accordion);
/* harmony default export */ __webpack_exports__["default"] = (Accordion);


/***/ })

}]);