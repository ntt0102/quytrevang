(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/devextreme-vue/file-manager.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme-vue/file-manager.js ***!
  \*****************************************************/
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
exports.DxUpload = exports.DxToolbarItem = exports.DxToolbar = exports.DxPermissions = exports.DxNotifications = exports.DxItemView = exports.DxItem = exports.DxFileSelectionItem = exports.DxDetails = exports.DxContextMenuItem = exports.DxContextMenu = exports.DxColumn = exports.DxFileManager = void 0;
var file_manager_1 = __importDefault(__webpack_require__(/*! devextreme/ui/file_manager */ "./node_modules/devextreme/esm/ui/file_manager.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxFileManager = index_1.createComponent({
    props: {
        accessKey: String,
        activeStateEnabled: Boolean,
        allowedFileExtensions: Array,
        contextMenu: Object,
        currentPath: String,
        currentPathKeys: Array,
        customizeDetailColumns: Function,
        customizeThumbnail: Function,
        disabled: Boolean,
        elementAttr: Object,
        fileSystemProvider: {},
        focusedItemKey: String,
        focusStateEnabled: Boolean,
        height: [Function, Number, String],
        hint: String,
        hoverStateEnabled: Boolean,
        itemView: Object,
        notifications: Object,
        onContentReady: Function,
        onContextMenuItemClick: Function,
        onContextMenuShowing: Function,
        onCurrentDirectoryChanged: Function,
        onDirectoryCreated: Function,
        onDirectoryCreating: Function,
        onDisposing: Function,
        onErrorOccurred: Function,
        onFileUploaded: Function,
        onFileUploading: Function,
        onFocusedItemChanged: Function,
        onInitialized: Function,
        onItemCopied: Function,
        onItemCopying: Function,
        onItemDeleted: Function,
        onItemDeleting: Function,
        onItemDownloading: Function,
        onItemMoved: Function,
        onItemMoving: Function,
        onItemRenamed: Function,
        onItemRenaming: Function,
        onOptionChanged: Function,
        onSelectedFileOpened: Function,
        onSelectionChanged: Function,
        onToolbarItemClick: Function,
        permissions: Object,
        rootFolderName: String,
        rtlEnabled: Boolean,
        selectedItemKeys: Array,
        selectionMode: String,
        tabIndex: Number,
        toolbar: Object,
        upload: Object,
        visible: Boolean,
        width: [Function, Number, String]
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:allowedFileExtensions": null,
        "update:contextMenu": null,
        "update:currentPath": null,
        "update:currentPathKeys": null,
        "update:customizeDetailColumns": null,
        "update:customizeThumbnail": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:fileSystemProvider": null,
        "update:focusedItemKey": null,
        "update:focusStateEnabled": null,
        "update:height": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:itemView": null,
        "update:notifications": null,
        "update:onContentReady": null,
        "update:onContextMenuItemClick": null,
        "update:onContextMenuShowing": null,
        "update:onCurrentDirectoryChanged": null,
        "update:onDirectoryCreated": null,
        "update:onDirectoryCreating": null,
        "update:onDisposing": null,
        "update:onErrorOccurred": null,
        "update:onFileUploaded": null,
        "update:onFileUploading": null,
        "update:onFocusedItemChanged": null,
        "update:onInitialized": null,
        "update:onItemCopied": null,
        "update:onItemCopying": null,
        "update:onItemDeleted": null,
        "update:onItemDeleting": null,
        "update:onItemDownloading": null,
        "update:onItemMoved": null,
        "update:onItemMoving": null,
        "update:onItemRenamed": null,
        "update:onItemRenaming": null,
        "update:onOptionChanged": null,
        "update:onSelectedFileOpened": null,
        "update:onSelectionChanged": null,
        "update:onToolbarItemClick": null,
        "update:permissions": null,
        "update:rootFolderName": null,
        "update:rtlEnabled": null,
        "update:selectedItemKeys": null,
        "update:selectionMode": null,
        "update:tabIndex": null,
        "update:toolbar": null,
        "update:upload": null,
        "update:visible": null,
        "update:width": null,
    },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = file_manager_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            contextMenu: { isCollectionItem: false, optionName: "contextMenu" },
            itemView: { isCollectionItem: false, optionName: "itemView" },
            notifications: { isCollectionItem: false, optionName: "notifications" },
            permissions: { isCollectionItem: false, optionName: "permissions" },
            toolbar: { isCollectionItem: false, optionName: "toolbar" },
            upload: { isCollectionItem: false, optionName: "upload" }
        };
    }
});
exports.DxFileManager = DxFileManager;
var DxColumn = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:alignment": null,
        "update:caption": null,
        "update:cssClass": null,
        "update:dataField": null,
        "update:dataType": null,
        "update:hidingPriority": null,
        "update:sortIndex": null,
        "update:sortOrder": null,
        "update:visible": null,
        "update:visibleIndex": null,
        "update:width": null,
    },
    props: {
        alignment: String,
        caption: String,
        cssClass: String,
        dataField: String,
        dataType: String,
        hidingPriority: Number,
        sortIndex: Number,
        sortOrder: String,
        visible: Boolean,
        visibleIndex: Number,
        width: [Number, String]
    }
});
exports.DxColumn = DxColumn;
DxColumn.$_optionName = "columns";
DxColumn.$_isCollectionItem = true;
var DxContextMenu = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:items": null,
    },
    props: {
        items: Array
    }
});
exports.DxContextMenu = DxContextMenu;
DxContextMenu.$_optionName = "contextMenu";
DxContextMenu.$_expectedChildren = {
    contextMenuItem: { isCollectionItem: true, optionName: "items" },
    item: { isCollectionItem: true, optionName: "items" }
};
var DxContextMenuItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:beginGroup": null,
        "update:closeMenuOnClick": null,
        "update:disabled": null,
        "update:html": null,
        "update:icon": null,
        "update:items": null,
        "update:name": null,
        "update:selectable": null,
        "update:selected": null,
        "update:template": null,
        "update:text": null,
        "update:visible": null,
    },
    props: {
        beginGroup: Boolean,
        closeMenuOnClick: Boolean,
        disabled: Boolean,
        html: String,
        icon: String,
        items: Array,
        name: String,
        selectable: Boolean,
        selected: Boolean,
        template: {},
        text: String,
        visible: Boolean
    }
});
exports.DxContextMenuItem = DxContextMenuItem;
DxContextMenuItem.$_optionName = "items";
DxContextMenuItem.$_isCollectionItem = true;
var DxDetails = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:columns": null,
    },
    props: {
        columns: Array
    }
});
exports.DxDetails = DxDetails;
DxDetails.$_optionName = "details";
DxDetails.$_expectedChildren = {
    column: { isCollectionItem: true, optionName: "columns" }
};
var DxFileSelectionItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:cssClass": null,
        "update:disabled": null,
        "update:html": null,
        "update:icon": null,
        "update:locateInMenu": null,
        "update:location": null,
        "update:menuItemTemplate": null,
        "update:name": null,
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
        icon: String,
        locateInMenu: String,
        location: String,
        menuItemTemplate: {},
        name: String,
        options: {},
        showText: String,
        template: {},
        text: String,
        visible: Boolean,
        widget: String
    }
});
exports.DxFileSelectionItem = DxFileSelectionItem;
DxFileSelectionItem.$_optionName = "fileSelectionItems";
DxFileSelectionItem.$_isCollectionItem = true;
var DxItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:beginGroup": null,
        "update:closeMenuOnClick": null,
        "update:cssClass": null,
        "update:disabled": null,
        "update:html": null,
        "update:icon": null,
        "update:items": null,
        "update:locateInMenu": null,
        "update:location": null,
        "update:menuItemTemplate": null,
        "update:name": null,
        "update:options": null,
        "update:selectable": null,
        "update:selected": null,
        "update:showText": null,
        "update:template": null,
        "update:text": null,
        "update:visible": null,
        "update:widget": null,
    },
    props: {
        beginGroup: Boolean,
        closeMenuOnClick: Boolean,
        cssClass: String,
        disabled: Boolean,
        html: String,
        icon: String,
        items: Array,
        locateInMenu: String,
        location: String,
        menuItemTemplate: {},
        name: String,
        options: {},
        selectable: Boolean,
        selected: Boolean,
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
var DxItemView = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:details": null,
        "update:mode": null,
        "update:showFolders": null,
        "update:showParentFolder": null,
    },
    props: {
        details: Object,
        mode: String,
        showFolders: Boolean,
        showParentFolder: Boolean
    }
});
exports.DxItemView = DxItemView;
DxItemView.$_optionName = "itemView";
DxItemView.$_expectedChildren = {
    details: { isCollectionItem: false, optionName: "details" }
};
var DxNotifications = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:showPanel": null,
        "update:showPopup": null,
    },
    props: {
        showPanel: Boolean,
        showPopup: Boolean
    }
});
exports.DxNotifications = DxNotifications;
DxNotifications.$_optionName = "notifications";
var DxPermissions = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:copy": null,
        "update:create": null,
        "update:delete": null,
        "update:download": null,
        "update:move": null,
        "update:rename": null,
        "update:upload": null,
    },
    props: {
        copy: Boolean,
        create: Boolean,
        delete: Boolean,
        download: Boolean,
        move: Boolean,
        rename: Boolean,
        upload: Boolean
    }
});
exports.DxPermissions = DxPermissions;
DxPermissions.$_optionName = "permissions";
var DxToolbar = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:fileSelectionItems": null,
        "update:items": null,
    },
    props: {
        fileSelectionItems: Array,
        items: Array
    }
});
exports.DxToolbar = DxToolbar;
DxToolbar.$_optionName = "toolbar";
DxToolbar.$_expectedChildren = {
    fileSelectionItem: { isCollectionItem: true, optionName: "fileSelectionItems" },
    item: { isCollectionItem: true, optionName: "items" },
    toolbarItem: { isCollectionItem: true, optionName: "items" }
};
var DxToolbarItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:cssClass": null,
        "update:disabled": null,
        "update:html": null,
        "update:icon": null,
        "update:locateInMenu": null,
        "update:location": null,
        "update:menuItemTemplate": null,
        "update:name": null,
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
        icon: String,
        locateInMenu: String,
        location: String,
        menuItemTemplate: {},
        name: String,
        options: {},
        showText: String,
        template: {},
        text: String,
        visible: Boolean,
        widget: String
    }
});
exports.DxToolbarItem = DxToolbarItem;
DxToolbarItem.$_optionName = "items";
DxToolbarItem.$_isCollectionItem = true;
var DxUpload = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:chunkSize": null,
        "update:maxFileSize": null,
    },
    props: {
        chunkSize: Number,
        maxFileSize: Number
    }
});
exports.DxUpload = DxUpload;
DxUpload.$_optionName = "upload";
exports.default = DxFileManager;


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/custom_provider.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/custom_provider.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _provider_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./provider_base */ "./node_modules/devextreme/esm/file_management/provider_base.js");
/**
 * DevExtreme (esm/file_management/custom_provider.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




class CustomFileSystemProvider extends _provider_base__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor(options) {
        options = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_0__["ensureDefined"])(options, {});
        super(options);
        this._hasSubDirsGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_2__["compileGetter"])(options.hasSubDirectoriesExpr || "hasSubDirectories");
        this._getItemsFunction = this._ensureFunction(options.getItems, () => []);
        this._renameItemFunction = this._ensureFunction(options.renameItem);
        this._createDirectoryFunction = this._ensureFunction(options.createDirectory);
        this._deleteItemFunction = this._ensureFunction(options.deleteItem);
        this._moveItemFunction = this._ensureFunction(options.moveItem);
        this._copyItemFunction = this._ensureFunction(options.copyItem);
        this._uploadFileChunkFunction = this._ensureFunction(options.uploadFileChunk);
        this._abortFileUploadFunction = this._ensureFunction(options.abortFileUpload);
        this._downloadItemsFunction = this._ensureFunction(options.downloadItems);
        this._getItemsContentFunction = this._ensureFunction(options.getItemsContent)
    }
    getItems(parentDir) {
        var pathInfo = parentDir.getFullPathInfo();
        return this._executeActionAsDeferred(() => this._getItemsFunction(parentDir), true).then(dataItems => this._convertDataObjectsToFileItems(dataItems, pathInfo))
    }
    renameItem(item, name) {
        return this._executeActionAsDeferred(() => this._renameItemFunction(item, name))
    }
    createDirectory(parentDir, name) {
        return this._executeActionAsDeferred(() => this._createDirectoryFunction(parentDir, name))
    }
    deleteItems(items) {
        return items.map(item => this._executeActionAsDeferred(() => this._deleteItemFunction(item)))
    }
    moveItems(items, destinationDirectory) {
        return items.map(item => this._executeActionAsDeferred(() => this._moveItemFunction(item, destinationDirectory)))
    }
    copyItems(items, destinationFolder) {
        return items.map(item => this._executeActionAsDeferred(() => this._copyItemFunction(item, destinationFolder)))
    }
    uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
        return this._executeActionAsDeferred(() => this._uploadFileChunkFunction(fileData, chunksInfo, destinationDirectory))
    }
    abortFileUpload(fileData, chunksInfo, destinationDirectory) {
        return this._executeActionAsDeferred(() => this._abortFileUploadFunction(fileData, chunksInfo, destinationDirectory))
    }
    downloadItems(items) {
        return this._downloadItemsFunction(items)
    }
    getItemsContent(items) {
        return this._executeActionAsDeferred(() => this._getItemsContentFunction(items))
    }
    _hasSubDirs(dataObj) {
        var hasSubDirs = this._hasSubDirsGetter(dataObj);
        return "boolean" === typeof hasSubDirs ? hasSubDirs : true
    }
    _getKeyExpr(options) {
        return options.keyExpr || "key"
    }
    _ensureFunction(functionObject, defaultFunction) {
        defaultFunction = defaultFunction || _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"];
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(functionObject) ? functionObject : defaultFunction
    }
}
/* harmony default export */ __webpack_exports__["default"] = (CustomFileSystemProvider);


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/error.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/error.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/file_management/error.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
class FileSystemError {
    constructor(errorCode, fileSystemItem, errorText) {
        this.errorCode = errorCode;
        this.fileSystemItem = fileSystemItem;
        this.errorText = errorText
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileSystemError);


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/error_codes.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/error_codes.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/file_management/error_codes.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var ErrorCode = {
    NoAccess: 0,
    FileExists: 1,
    FileNotFound: 2,
    DirectoryExists: 3,
    DirectoryNotFound: 4,
    WrongFileExtension: 5,
    MaxFileSizeExceeded: 6,
    InvalidSymbols: 7,
    Other: 32767
};
/* harmony default export */ __webpack_exports__["default"] = (ErrorCode);


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/file_system_item.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/file_system_item.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/file_management/utils.js");
/**
 * DevExtreme (esm/file_management/file_system_item.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


class FileSystemItem {
    constructor() {
        var ctor = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(arguments[0]) ? this._publicCtor : this._internalCtor;
        ctor.apply(this, arguments)
    }
    _internalCtor(pathInfo, name, isDirectory, key) {
        this.name = name || "";
        this.pathInfo = pathInfo && [...pathInfo] || [];
        this.parentPath = this._getPathByPathInfo(this.pathInfo);
        this.relativeName = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["pathCombine"])(this.parentPath, name);
        this.key = key || this._getPathByPathInfo(this.getFullPathInfo(), true);
        this.path = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["pathCombine"])(this.parentPath, name);
        this.pathKeys = this.pathInfo.map(_ref => {
            var {
                key: key
            } = _ref;
            return key
        });
        if (!this.isRoot()) {
            this.pathKeys.push(this.key)
        }
        this._initialize(isDirectory)
    }
    _publicCtor(path, isDirectory, pathKeys) {
        this.path = path || "";
        this.pathKeys = pathKeys || [];
        var pathInfo = [];
        var parts = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getPathParts"])(path, true);
        for (var i = 0; i < parts.length - 1; i++) {
            var part = parts[i];
            var pathInfoPart = {
                key: this.pathKeys[i] || part,
                name: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getName"])(part)
            };
            pathInfo.push(pathInfoPart)
        }
        this.pathInfo = pathInfo;
        this.relativeName = path;
        this.name = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getName"])(path);
        this.key = this.pathKeys.length ? this.pathKeys[this.pathKeys.length - 1] : path;
        this.parentPath = parts.length > 1 ? parts[parts.length - 2] : "";
        this._initialize(isDirectory)
    }
    _initialize(isDirectory) {
        this.isDirectory = !!isDirectory;
        this.size = 0;
        this.dateModified = new Date;
        this.thumbnail = "";
        this.tooltipText = ""
    }
    getFullPathInfo() {
        var pathInfo = [...this.pathInfo];
        if (!this.isRoot()) {
            pathInfo.push({
                key: this.key,
                name: this.name
            })
        }
        return pathInfo
    }
    isRoot() {
        return "" === this.path
    }
    getFileExtension() {
        return this.isDirectory ? "" : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getFileExtension"])(this.name)
    }
    equals(item) {
        return item && this.key === item.key
    }
    createClone() {
        var result = new FileSystemItem(this.pathInfo, this.name, this.isDirectory, this.key);
        result.key = this.key;
        result.size = this.size;
        result.dateModified = this.dateModified;
        result.thumbnail = this.thumbnail;
        result.tooltipText = this.tooltipText;
        result.hasSubDirectories = this.hasSubDirectories;
        result.dataItem = this.dataItem;
        return result
    }
    _getPathByPathInfo(pathInfo, escape) {
        return pathInfo.map(info => escape ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getEscapedFileName"])(info.name) : info.name).join(_utils__WEBPACK_IMPORTED_MODULE_1__["PATH_SEPARATOR"])
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileSystemItem);


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/object_provider.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/object_provider.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _data_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _exporter_file_saver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../exporter/file_saver */ "./node_modules/devextreme/esm/exporter/file_saver.js");
/* harmony import */ var _ui_widget_ui_errors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ui/widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! jszip */ "./node_modules/jszip/dist/jszip.min.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _provider_base__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./provider_base */ "./node_modules/devextreme/esm/file_management/provider_base.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./error */ "./node_modules/devextreme/esm/file_management/error.js");
/* harmony import */ var _error_codes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./error_codes */ "./node_modules/devextreme/esm/file_management/error_codes.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/file_management/utils.js");
/**
 * DevExtreme (esm/file_management/object_provider.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */















var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_7__["getWindow"])();
class ObjectFileSystemProvider extends _provider_base__WEBPACK_IMPORTED_MODULE_11__["default"] {
    constructor(options) {
        options = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_1__["ensureDefined"])(options, {});
        super(options);
        var initialArray = options.data;
        if (initialArray && !Array.isArray(initialArray)) {
            throw _data_errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4006")
        }
        var itemsExpr = options.itemsExpr || "items";
        this._subFileItemsGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_2__["compileGetter"])(itemsExpr);
        this._subFileItemsSetter = this._getSetter(itemsExpr);
        var contentExpr = options.contentExpr || "content";
        this._contentGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_2__["compileGetter"])(contentExpr);
        this._contentSetter = this._getSetter(contentExpr);
        var nameExpr = this._getNameExpr(options);
        this._nameSetter = this._getSetter(nameExpr);
        var isDirExpr = this._getIsDirExpr(options);
        this._getIsDirSetter = this._getSetter(isDirExpr);
        var keyExpr = this._getKeyExpr(options);
        this._keySetter = this._getSetter(keyExpr);
        var sizeExpr = this._getSizeExpr(options);
        this._sizeSetter = this._getSetter(sizeExpr);
        var dateModifiedExpr = this._getDateModifiedExpr(options);
        this._dateModifiedSetter = this._getSetter(dateModifiedExpr);
        this._data = initialArray || []
    }
    getItems(parentDir) {
        return this._executeActionAsDeferred(() => this._getItems(parentDir), true)
    }
    renameItem(item, name) {
        return this._executeActionAsDeferred(() => this._renameItemCore(item, name))
    }
    _renameItemCore(item, name) {
        if (!item) {
            return
        }
        var dataItem = this._findDataObject(item);
        this._nameSetter(dataItem, name);
        item.name = name;
        item.key = this._ensureDataObjectKey(dataItem)
    }
    createDirectory(parentDir, name) {
        return this._executeActionAsDeferred(() => {
            this._validateDirectoryExists(parentDir);
            this._createDataObject(parentDir, name, true)
        })
    }
    deleteItems(items) {
        return items.map(item => this._executeActionAsDeferred(() => this._deleteItem(item)))
    }
    moveItems(items, destinationDir) {
        var destinationDataItem = this._findDataObject(destinationDir);
        var array = this._getDirectoryDataItems(destinationDataItem);
        var deferreds = items.map(item => this._executeActionAsDeferred(() => {
            this._checkAbilityToMoveOrCopyItem(item, destinationDir);
            var dataItem = this._findDataObject(item);
            this._deleteItem(item);
            array.push(dataItem)
        }));
        return deferreds
    }
    copyItems(items, destinationDir) {
        var destinationDataItem = this._findDataObject(destinationDir);
        var array = this._getDirectoryDataItems(destinationDataItem);
        var deferreds = items.map(item => this._executeActionAsDeferred(() => {
            this._checkAbilityToMoveOrCopyItem(item, destinationDir);
            var dataItem = this._findDataObject(item);
            var copiedItem = this._createCopy(dataItem);
            array.push(copiedItem)
        }));
        return deferreds
    }
    uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
        if (chunksInfo.chunkIndex > 0) {
            return chunksInfo.customData.deferred
        }
        this._validateDirectoryExists(destinationDirectory);
        var deferred = chunksInfo.customData.deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"];
        var reader = this._createFileReader();
        reader.readAsDataURL(fileData);
        reader.onload = () => {
            var content = reader.result.split(",")[1];
            var dataObj = this._createDataObject(destinationDirectory, fileData.name, false);
            this._sizeSetter(dataObj, fileData.size);
            this._dateModifiedSetter(dataObj, fileData.lastModifiedDate);
            this._contentSetter(dataObj, content);
            deferred.resolve()
        };
        reader.onerror = error => deferred.reject(error);
        return deferred
    }
    downloadItems(items) {
        if (1 === items.length) {
            this._downloadSingleFile(items[0])
        } else {
            this._downloadMultipleFiles(items)
        }
    }
    _downloadSingleFile(file) {
        var content = this._getFileContent(file);
        var byteString = window.atob(content);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            array[i] = byteString.charCodeAt(i)
        }
        var blob = new window.Blob([arrayBuffer], {
            type: "application/octet-stream"
        });
        _exporter_file_saver__WEBPACK_IMPORTED_MODULE_8__["fileSaver"].saveAs(file.name, null, blob)
    }
    _downloadMultipleFiles(files) {
        var jsZip = getJSZip();
        var zip = new jsZip;
        files.forEach(file => zip.file(file.name, this._getFileContent(file), {
            base64: true
        }));
        var options = {
            type: "blob",
            compression: "DEFLATE",
            mimeType: "application/zip"
        };
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"];
        if (zip.generateAsync) {
            zip.generateAsync(options).then(deferred.resolve)
        } else {
            deferred.resolve(zip.generate(options))
        }
        deferred.done(blob => _exporter_file_saver__WEBPACK_IMPORTED_MODULE_8__["fileSaver"].saveAs("files.zip", null, blob))
    }
    _getFileContent(file) {
        var dataItem = this._findDataObject(file);
        return this._contentGetter(dataItem) || ""
    }
    _validateDirectoryExists(directoryInfo) {
        if (!this._isFileItemExists(directoryInfo) || this._isDirGetter(directoryInfo.fileItem)) {
            throw new _error__WEBPACK_IMPORTED_MODULE_12__["default"](_error_codes__WEBPACK_IMPORTED_MODULE_13__["default"].DirectoryNotFound, directoryInfo)
        }
    }
    _checkAbilityToMoveOrCopyItem(item, destinationDir) {
        var dataItem = this._findDataObject(item);
        var itemKey = this._getKeyFromDataObject(dataItem, item.parentPath);
        var pathInfo = destinationDir.getFullPathInfo();
        var currentPath = "";
        pathInfo.forEach(info => {
            currentPath = Object(_utils__WEBPACK_IMPORTED_MODULE_14__["pathCombine"])(currentPath, info.name);
            var pathKey = this._getDataObjectKey(info.key, currentPath);
            if (pathKey === itemKey) {
                throw new _error__WEBPACK_IMPORTED_MODULE_12__["default"](_error_codes__WEBPACK_IMPORTED_MODULE_13__["default"].Other, item)
            }
        })
    }
    _createDataObject(parentDir, name, isDirectory) {
        var dataObj = {};
        this._nameSetter(dataObj, name);
        this._getIsDirSetter(dataObj, isDirectory);
        this._keySetter(dataObj, String(new _core_guid__WEBPACK_IMPORTED_MODULE_3__["default"]));
        var parentDataItem = this._findDataObject(parentDir);
        var array = this._getDirectoryDataItems(parentDataItem);
        array.push(dataObj);
        return dataObj
    }
    _createCopy(dataObj) {
        var copyObj = {};
        this._nameSetter(copyObj, this._nameGetter(dataObj));
        this._getIsDirSetter(copyObj, this._isDirGetter(dataObj));
        var items = this._subFileItemsGetter(dataObj);
        if (Array.isArray(items)) {
            var itemsCopy = [];
            items.forEach(childItem => {
                var childCopy = this._createCopy(childItem);
                itemsCopy.push(childCopy)
            });
            this._subFileItemsSetter(copyObj, itemsCopy)
        }
        return copyObj
    }
    _deleteItem(fileItem) {
        var dataItem = this._findDataObject(fileItem);
        var parentDirDataObj = this._findFileItemObj(fileItem.pathInfo);
        var array = this._getDirectoryDataItems(parentDirDataObj);
        var index = array.indexOf(dataItem);
        array.splice(index, 1)
    }
    _getDirectoryDataItems(directoryDataObj) {
        if (!directoryDataObj) {
            return this._data
        }
        var dataItems = this._subFileItemsGetter(directoryDataObj);
        if (!Array.isArray(dataItems)) {
            dataItems = [];
            this._subFileItemsSetter(directoryDataObj, dataItems)
        }
        return dataItems
    }
    _getItems(parentDir) {
        this._validateDirectoryExists(parentDir);
        var pathInfo = parentDir.getFullPathInfo();
        var parentDirKey = pathInfo && pathInfo.length > 0 ? pathInfo[pathInfo.length - 1].key : null;
        var dirFileObjects = this._data;
        if (parentDirKey) {
            var directoryEntry = this._findFileItemObj(pathInfo);
            dirFileObjects = directoryEntry && this._subFileItemsGetter(directoryEntry) || []
        }
        this._ensureKeysForDuplicateNameItems(dirFileObjects);
        return this._convertDataObjectsToFileItems(dirFileObjects, pathInfo)
    }
    _ensureKeysForDuplicateNameItems(dataObjects) {
        var names = {};
        dataObjects.forEach(obj => {
            var name = this._nameGetter(obj);
            if (names[name]) {
                this._ensureDataObjectKey(obj)
            } else {
                names[name] = true
            }
        })
    }
    _findDataObject(item) {
        if (item.isRoot()) {
            return null
        }
        var result = this._findFileItemObj(item.getFullPathInfo());
        if (!result) {
            var errorCode = item.isDirectory ? _error_codes__WEBPACK_IMPORTED_MODULE_13__["default"].DirectoryNotFound : _error_codes__WEBPACK_IMPORTED_MODULE_13__["default"].FileNotFound;
            throw new _error__WEBPACK_IMPORTED_MODULE_12__["default"](errorCode, item)
        }
        return result
    }
    _findFileItemObj(pathInfo) {
        var _this = this;
        if (!Array.isArray(pathInfo)) {
            pathInfo = []
        }
        var currentPath = "";
        var fileItemObj = null;
        var fileItemObjects = this._data;
        var _loop = function(i) {
            fileItemObj = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_0__["find"])(fileItemObjects, item => {
                var hasCorrectFileItemType = _this._isDirGetter(item) || i === pathInfo.length - 1;
                return _this._getKeyFromDataObject(item, currentPath) === pathInfo[i].key && _this._nameGetter(item) === pathInfo[i].name && hasCorrectFileItemType
            });
            if (fileItemObj) {
                currentPath = Object(_utils__WEBPACK_IMPORTED_MODULE_14__["pathCombine"])(currentPath, _this._nameGetter(fileItemObj));
                fileItemObjects = _this._subFileItemsGetter(fileItemObj)
            }
        };
        for (var i = 0; i < pathInfo.length && (0 === i || fileItemObj); i++) {
            _loop(i)
        }
        return fileItemObj
    }
    _getKeyFromDataObject(dataObj, defaultKeyPrefix) {
        var key = this._keyGetter(dataObj);
        var relativeName = Object(_utils__WEBPACK_IMPORTED_MODULE_14__["pathCombine"])(defaultKeyPrefix, this._nameGetter(dataObj));
        return this._getDataObjectKey(key, relativeName)
    }
    _getDataObjectKey(key, relativeName) {
        return key ? key : relativeName
    }
    _ensureDataObjectKey(dataObj) {
        var key = this._keyGetter(dataObj);
        if (!key) {
            key = String(new _core_guid__WEBPACK_IMPORTED_MODULE_3__["default"]);
            this._keySetter(dataObj, key)
        }
        return key
    }
    _hasSubDirs(dataObj) {
        var subItems = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_1__["ensureDefined"])(this._subFileItemsGetter(dataObj), []);
        if (!Array.isArray(subItems)) {
            return true
        }
        for (var i = 0; i < subItems.length; i++) {
            if (true === this._isDirGetter(subItems[i])) {
                return true
            }
        }
        return false
    }
    _getSetter(expr) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(expr) ? expr : Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_2__["compileSetter"])(expr)
    }
    _isFileItemExists(fileItem) {
        return fileItem.isDirectory && fileItem.isRoot() || !!this._findFileItemObj(fileItem.getFullPathInfo())
    }
    _createFileReader() {
        return new window.FileReader
    }
}

function getJSZip() {
    if (!jszip__WEBPACK_IMPORTED_MODULE_10___default.a) {
        throw _ui_widget_ui_errors__WEBPACK_IMPORTED_MODULE_9__["default"].Error("E1041", "JSZip")
    }
    return jszip__WEBPACK_IMPORTED_MODULE_10___default.a
}
/* harmony default export */ __webpack_exports__["default"] = (ObjectFileSystemProvider);


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/provider_base.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/provider_base.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_date_serialization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/date_serialization */ "./node_modules/devextreme/esm/core/utils/date_serialization.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _file_system_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./file_system_item */ "./node_modules/devextreme/esm/file_management/file_system_item.js");
/**
 * DevExtreme (esm/file_management/provider_base.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var DEFAULT_FILE_UPLOAD_CHUNK_SIZE = 2e5;
class FileSystemProviderBase {
    constructor(options) {
        options = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_1__["ensureDefined"])(options, {});
        this._keyGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileGetter"])(this._getKeyExpr(options));
        this._nameGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileGetter"])(this._getNameExpr(options));
        this._isDirGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileGetter"])(this._getIsDirExpr(options));
        this._sizeGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileGetter"])(this._getSizeExpr(options));
        this._dateModifiedGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileGetter"])(this._getDateModifiedExpr(options));
        this._thumbnailGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileGetter"])(options.thumbnailExpr || "thumbnail")
    }
    getItems(parentDirectory) {
        return []
    }
    renameItem(item, name) {}
    createDirectory(parentDirectory, name) {}
    deleteItems(items) {}
    moveItems(items, destinationDirectory) {}
    copyItems(items, destinationDirectory) {}
    uploadFileChunk(fileData, chunksInfo, destinationDirectory) {}
    abortFileUpload(fileData, chunksInfo, destinationDirectory) {}
    downloadItems(items) {}
    getItemsContent(items) {}
    getFileUploadChunkSize() {
        return DEFAULT_FILE_UPLOAD_CHUNK_SIZE
    }
    _convertDataObjectsToFileItems(entries, pathInfo) {
        var result = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(entries, (_, entry) => {
            var fileItem = this._createFileItem(entry, pathInfo);
            result.push(fileItem)
        });
        return result
    }
    _createFileItem(dataObj, pathInfo) {
        var key = this._keyGetter(dataObj);
        var fileItem = new _file_system_item__WEBPACK_IMPORTED_MODULE_6__["default"](pathInfo, this._nameGetter(dataObj), !!this._isDirGetter(dataObj), key);
        fileItem.size = this._sizeGetter(dataObj);
        if (void 0 === fileItem.size) {
            fileItem.size = 0
        }
        fileItem.dateModified = _core_utils_date_serialization__WEBPACK_IMPORTED_MODULE_2__["default"].deserializeDate(this._dateModifiedGetter(dataObj));
        if (void 0 === fileItem.dateModified) {
            fileItem.dateModified = new Date
        }
        if (fileItem.isDirectory) {
            fileItem.hasSubDirectories = this._hasSubDirs(dataObj)
        }
        if (!key) {
            fileItem.key = fileItem.relativeName
        }
        fileItem.thumbnail = this._thumbnailGetter(dataObj) || "";
        fileItem.dataItem = dataObj;
        return fileItem
    }
    _hasSubDirs(dataObj) {
        return true
    }
    _getKeyExpr(options) {
        return options.keyExpr || this._defaultKeyExpr
    }
    _defaultKeyExpr(fileItem) {
        if (2 === arguments.length) {
            fileItem.__KEY__ = arguments[1];
            return
        }
        return Object.prototype.hasOwnProperty.call(fileItem, "__KEY__") ? fileItem.__KEY__ : null
    }
    _getNameExpr(options) {
        return options.nameExpr || "name"
    }
    _getIsDirExpr(options) {
        return options.isDirectoryExpr || "isDirectory"
    }
    _getSizeExpr(options) {
        return options.sizeExpr || "size"
    }
    _getDateModifiedExpr(options) {
        return options.dateModifiedExpr || "dateModified"
    }
    _executeActionAsDeferred(action, keepResult) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"];
        try {
            var result = action();
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isPromise"])(result)) {
                Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])(result).done(userResult => deferred.resolve(keepResult && userResult || void 0)).fail(error => deferred.reject(error))
            } else {
                deferred.resolve(keepResult && result || void 0)
            }
        } catch (error) {
            return deferred.reject(error)
        }
        return deferred.promise()
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileSystemProviderBase);


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/remote_provider.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/remote_provider.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/ajax */ "./node_modules/devextreme/esm/core/utils/ajax.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _provider_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./provider_base */ "./node_modules/devextreme/esm/file_management/provider_base.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/file_management/remote_provider.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */











var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["getWindow"])();
var FILE_CHUNK_BLOB_NAME = "chunk";
var FILE_SYSTEM_COMMNAD = {
    GET_DIR_CONTENTS: "GetDirContents",
    CREATE_DIR: "CreateDir",
    RENAME: "Rename",
    MOVE: "Move",
    COPY: "Copy",
    REMOVE: "Remove",
    UPLOAD_CHUNK: "UploadChunk",
    ABORT_UPLOAD: "AbortUpload",
    DOWLOAD: "Download"
};
var REQUEST_METHOD = {
    GET: "GET",
    POST: "POST"
};
class RemoteFileSystemProvider extends _provider_base__WEBPACK_IMPORTED_MODULE_8__["default"] {
    constructor(options) {
        options = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_2__["ensureDefined"])(options, {});
        super(options);
        this._endpointUrl = options.endpointUrl;
        this._beforeAjaxSend = options.beforeAjaxSend;
        this._beforeSubmit = options.beforeSubmit;
        this._requestHeaders = options.requestHeaders;
        this._hasSubDirsGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_9__["compileGetter"])(options.hasSubDirectoriesExpr || "hasSubDirectories")
    }
    getItems(parentDir) {
        var pathInfo = parentDir.getFullPathInfo();
        return this._executeRequest(FILE_SYSTEM_COMMNAD.GET_DIR_CONTENTS, {
            pathInfo: pathInfo
        }).then(result => this._convertDataObjectsToFileItems(result.result, pathInfo))
    }
    renameItem(item, name) {
        return this._executeRequest(FILE_SYSTEM_COMMNAD.RENAME, {
            pathInfo: item.getFullPathInfo(),
            isDirectory: item.isDirectory,
            name: name
        })
    }
    createDirectory(parentDir, name) {
        return this._executeRequest(FILE_SYSTEM_COMMNAD.CREATE_DIR, {
            pathInfo: parentDir.getFullPathInfo(),
            name: name
        })
    }
    deleteItems(items) {
        return items.map(item => this._executeRequest(FILE_SYSTEM_COMMNAD.REMOVE, {
            pathInfo: item.getFullPathInfo(),
            isDirectory: item.isDirectory
        }))
    }
    moveItems(items, destinationDirectory) {
        return items.map(item => this._executeRequest(FILE_SYSTEM_COMMNAD.MOVE, {
            sourcePathInfo: item.getFullPathInfo(),
            sourceIsDirectory: item.isDirectory,
            destinationPathInfo: destinationDirectory.getFullPathInfo()
        }))
    }
    copyItems(items, destinationFolder) {
        return items.map(item => this._executeRequest(FILE_SYSTEM_COMMNAD.COPY, {
            sourcePathInfo: item.getFullPathInfo(),
            sourceIsDirectory: item.isDirectory,
            destinationPathInfo: destinationFolder.getFullPathInfo()
        }))
    }
    uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
        if (0 === chunksInfo.chunkIndex) {
            chunksInfo.customData.uploadId = new _core_guid__WEBPACK_IMPORTED_MODULE_3__["default"]
        }
        var args = {
            destinationPathInfo: destinationDirectory.getFullPathInfo(),
            chunkMetadata: JSON.stringify({
                UploadId: chunksInfo.customData.uploadId,
                FileName: fileData.name,
                Index: chunksInfo.chunkIndex,
                TotalCount: chunksInfo.chunkCount,
                FileSize: fileData.size
            })
        };
        var ajaxSettings = {
            url: this._endpointUrl,
            headers: this._requestHeaders || {},
            method: REQUEST_METHOD.POST,
            dataType: "json",
            data: {
                [FILE_CHUNK_BLOB_NAME]: chunksInfo.chunkBlob,
                arguments: JSON.stringify(args),
                command: FILE_SYSTEM_COMMNAD.UPLOAD_CHUNK
            },
            upload: {
                onprogress: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"],
                onloadstart: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"],
                onabort: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"]
            },
            xhrFields: {},
            cache: false
        };
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"];
        this._beforeSendInternal(ajaxSettings);
        _core_utils_ajax__WEBPACK_IMPORTED_MODULE_1__["default"].sendRequest(ajaxSettings).done(result => {
            !result.success && deferred.reject(result) || deferred.resolve()
        }).fail(deferred.reject);
        return deferred.promise()
    }
    abortFileUpload(fileData, chunksInfo, destinationDirectory) {
        return this._executeRequest(FILE_SYSTEM_COMMNAD.ABORT_UPLOAD, {
            uploadId: chunksInfo.customData.uploadId
        })
    }
    downloadItems(items) {
        var args = this._getDownloadArgs(items);
        var $form = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<form>").css({
            display: "none"
        }).attr({
            method: REQUEST_METHOD.POST,
            action: args.url
        });
        var formDataEntries = {
            command: args.command,
            arguments: args.arguments
        };
        this._beforeSubmitInternal(formDataEntries);
        this._appendFormDataInputsToForm(formDataEntries, $form);
        $form.appendTo("body");
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_7__["default"].trigger($form, "submit");
        setTimeout(() => $form.remove())
    }
    getItemsContent(items) {
        var args = this._getDownloadArgs(items);
        var ajaxSettings = {
            url: args.url,
            headers: this._requestHeaders || {},
            method: REQUEST_METHOD.POST,
            responseType: "arraybuffer",
            data: {
                command: args.command,
                arguments: args.arguments
            },
            upload: {
                onprogress: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"],
                onloadstart: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"],
                onabort: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"]
            },
            xhrFields: {},
            cache: false
        };
        this._beforeSendInternal(ajaxSettings);
        return _core_utils_ajax__WEBPACK_IMPORTED_MODULE_1__["default"].sendRequest(ajaxSettings)
    }
    _getDownloadArgs(items) {
        var pathInfoList = items.map(item => item.getFullPathInfo());
        var args = {
            pathInfoList: pathInfoList
        };
        var argsStr = JSON.stringify(args);
        return {
            url: this._endpointUrl,
            arguments: argsStr,
            command: FILE_SYSTEM_COMMNAD.DOWLOAD
        }
    }
    _getItemsIds(items) {
        return items.map(it => it.relativeName)
    }
    _executeRequest(command, args) {
        var method = command === FILE_SYSTEM_COMMNAD.GET_DIR_CONTENTS ? REQUEST_METHOD.GET : REQUEST_METHOD.POST;
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"];
        var ajaxSettings = {
            url: this._getEndpointUrl(command, args),
            headers: this._requestHeaders || {},
            method: method,
            dataType: "json",
            data: {},
            xhrFields: {},
            cache: false
        };
        this._beforeSendInternal(ajaxSettings);
        _core_utils_ajax__WEBPACK_IMPORTED_MODULE_1__["default"].sendRequest(ajaxSettings).then(result => {
            !result.success && deferred.reject(result) || deferred.resolve(result)
        }, e => deferred.reject(e));
        return deferred.promise()
    }
    _beforeSubmitInternal(formDataEntries) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isFunction"])(this._beforeSubmit)) {
            this._beforeSubmit({
                formData: formDataEntries
            })
        }
    }
    _beforeSendInternal(ajaxSettings) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isFunction"])(this._beforeAjaxSend)) {
            var ajaxArguments = {
                headers: ajaxSettings.headers,
                formData: ajaxSettings.data,
                xhrFields: ajaxSettings.xhrFields
            };
            this._beforeAjaxSend(ajaxArguments);
            ajaxSettings.headers = ajaxArguments.headers;
            ajaxSettings.data = ajaxArguments.formData;
            ajaxSettings.xhrFields = ajaxArguments.xhrFields
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isEmptyObject"])(ajaxSettings.data)) {
            delete ajaxSettings.data
        } else if (ajaxSettings.responseType || ajaxSettings.upload) {
            ajaxSettings.data = this._createFormData(ajaxSettings.data)
        }
    }
    _createFormData(formDataEntries) {
        var formData = new window.FormData;
        for (var entryName in formDataEntries) {
            if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isDefined"])(formDataEntries[entryName])) {
                formData.append(entryName, formDataEntries[entryName])
            }
        }
        return formData
    }
    _appendFormDataInputsToForm(formDataEntries, formElement) {
        for (var entryName in formDataEntries) {
            if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isDefined"])(formDataEntries[entryName])) {
                Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<input>").attr({
                    type: "hidden",
                    name: entryName,
                    value: formDataEntries[entryName]
                }).appendTo(formElement)
            }
        }
    }
    _getEndpointUrl(command, args) {
        var queryString = this._getQueryString({
            command: command,
            arguments: JSON.stringify(args)
        });
        var separator = this._endpointUrl && this._endpointUrl.indexOf("?") > 0 ? "&" : "?";
        return this._endpointUrl + separator + queryString
    }
    _getQueryString(params) {
        var pairs = [];
        var keys = Object.keys(params);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = params[key];
            if (void 0 === value) {
                continue
            }
            if (null === value) {
                value = ""
            }
            if (Array.isArray(value)) {
                this._processQueryStringArrayParam(key, value, pairs)
            } else {
                var pair = this._getQueryStringPair(key, value);
                pairs.push(pair)
            }
        }
        return pairs.join("&")
    }
    _processQueryStringArrayParam(key, array, pairs) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(array, (_, item) => {
            var pair = this._getQueryStringPair(key, item);
            pairs.push(pair)
        })
    }
    _getQueryStringPair(key, value) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value)
    }
    _hasSubDirs(dataObj) {
        var hasSubDirs = this._hasSubDirsGetter(dataObj);
        return "boolean" === typeof hasSubDirs ? hasSubDirs : true
    }
    _getKeyExpr(options) {
        return options.keyExpr || "key"
    }
}
/* harmony default export */ __webpack_exports__["default"] = (RemoteFileSystemProvider);


/***/ }),

/***/ "./node_modules/devextreme/esm/file_management/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/file_management/utils.js ***!
  \**************************************************************/
/*! exports provided: PATH_SEPARATOR, getFileExtension, getName, getParentPath, getPathParts, getEscapedFileName, pathCombine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATH_SEPARATOR", function() { return PATH_SEPARATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileExtension", function() { return getFileExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getName", function() { return getName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentPath", function() { return getParentPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPathParts", function() { return getPathParts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEscapedFileName", function() { return getEscapedFileName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathCombine", function() { return pathCombine; });
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/**
 * DevExtreme (esm/file_management/utils.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var PATH_SEPARATOR = "/";
var getFileExtension = path => {
    var index = path.lastIndexOf(".");
    return -1 !== index ? path.substr(index) : ""
};
var getName = path => {
    var index = path.lastIndexOf(PATH_SEPARATOR);
    return -1 !== index ? path.substr(index + PATH_SEPARATOR.length) : path
};
var getParentPath = path => {
    var index = path.lastIndexOf(PATH_SEPARATOR);
    return -1 !== index ? path.substr(0, index) : ""
};
var getPathParts = (path, includeFullPath) => {
    if (!path || "/" === path) {
        return []
    }
    var result = [];
    var pathPart = "";
    for (var i = 0; i < path.length; i++) {
        var char = path.charAt(i);
        if (char === PATH_SEPARATOR) {
            var nextChar = path.charAt(i + 1);
            if (nextChar !== PATH_SEPARATOR) {
                if (pathPart) {
                    result.push(pathPart);
                    pathPart = ""
                }
                char = nextChar
            }
            i++
        }
        pathPart += char
    }
    if (pathPart) {
        result.push(pathPart)
    }
    if (includeFullPath) {
        for (var _i = 0; _i < result.length; _i++) {
            result[_i] = pathCombine(0 === _i ? "" : result[_i - 1], getEscapedFileName(result[_i]))
        }
    }
    return result
};
var getEscapedFileName = function(fileName) {
    return fileName.replace(/\//g, "//")
};
var pathCombine = function() {
    var result = "";
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__["each"])(arguments, (_, arg) => {
        if (arg) {
            if (result) {
                result += PATH_SEPARATOR
            }
            result += arg
        }
    });
    return result
};


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_manager_ui_file_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file_manager/ui.file_manager */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.js");
/**
 * DevExtreme (esm/ui/file_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = (_file_manager_ui_file_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/file_items_controller.js":
/*!******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/file_items_controller.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FileItemsController; });
/* harmony import */ var _file_management_provider_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../file_management/provider_base */ "./node_modules/devextreme/esm/file_management/provider_base.js");
/* harmony import */ var _file_management_file_system_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../file_management/file_system_item */ "./node_modules/devextreme/esm/file_management/file_system_item.js");
/* harmony import */ var _file_management_object_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../file_management/object_provider */ "./node_modules/devextreme/esm/file_management/object_provider.js");
/* harmony import */ var _file_management_remote_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../file_management/remote_provider */ "./node_modules/devextreme/esm/file_management/remote_provider.js");
/* harmony import */ var _file_management_custom_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../file_management/custom_provider */ "./node_modules/devextreme/esm/file_management/custom_provider.js");
/* harmony import */ var _file_management_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../file_management/error */ "./node_modules/devextreme/esm/file_management/error.js");
/* harmony import */ var _file_management_error_codes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../file_management/error_codes */ "./node_modules/devextreme/esm/file_management/error_codes.js");
/* harmony import */ var _file_management_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../file_management/utils */ "./node_modules/devextreme/esm/file_management/utils.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/ui/file_manager/file_items_controller.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */














var DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME = "Files";
class FileItemsController {
    constructor(options) {
        options = options || {};
        this._options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_11__["extend"])({}, options);
        this._isInitialized = false;
        this._dataLoading = false;
        this._dataLoadingDeferred = null;
        this._rootDirectoryInfo = this._createRootDirectoryInfo(options.rootText);
        this._currentDirectoryInfo = this._rootDirectoryInfo;
        this._defaultIconMap = this._createDefaultIconMap();
        this._setSecurityController();
        this._setProvider(options.fileProvider);
        this._initialize()
    }
    _initialize() {
        var result = this._options.currentPathKeys && this._options.currentPathKeys.length ? this.setCurrentPathByKeys(this._options.currentPathKeys) : this.setCurrentPath(this._options.currentPath);
        var completeInitialization = () => {
            this._isInitialized = true;
            this._raiseInitialized()
        };
        if (result) {
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"])(result).always(completeInitialization)
        } else {
            completeInitialization()
        }
    }
    _setSecurityController() {
        this._securityController = new FileSecurityController({
            allowedFileExtensions: this._options.allowedFileExtensions,
            maxFileSize: this._options.uploadMaxFileSize
        });
        this._resetState()
    }
    setAllowedFileExtensions(allowedFileExtensions) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(allowedFileExtensions)) {
            this._options.allowedFileExtensions = allowedFileExtensions
        }
        this._setSecurityController();
        this.refresh()
    }
    setUploadOptions(_ref) {
        var {
            maxFileSize: maxFileSize,
            chunkSize: chunkSize
        } = _ref;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(chunkSize)) {
            this._options.uploadChunkSize = chunkSize
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(maxFileSize)) {
            this._options.uploadMaxFileSize = maxFileSize;
            this._setSecurityController();
            this.refresh()
        }
    }
    _setProvider(fileProvider) {
        this._fileProvider = this._createFileProvider(fileProvider);
        this._resetState()
    }
    updateProvider(fileProvider, currentPathKeys) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(currentPathKeys)) {
            return this._updateProviderOnly(fileProvider)
        }
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"])(this._getDirectoryByPathParts(this._rootDirectoryInfo, currentPathKeys, true)).then(newDirectory => {
            if (newDirectory !== this._rootDirectoryInfo) {
                this._resetCurrentDirectory()
            }
            this._setProvider(fileProvider)
        }).then(() => this.setCurrentPathByKeys(currentPathKeys))
    }
    _updateProviderOnly(fileProvider) {
        this._resetCurrentDirectory();
        this._setProvider(fileProvider);
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"])(this.refresh())
    }
    _createFileProvider(fileProvider) {
        if (!fileProvider) {
            fileProvider = []
        }
        if (Array.isArray(fileProvider)) {
            return new _file_management_object_provider__WEBPACK_IMPORTED_MODULE_2__["default"]({
                data: fileProvider
            })
        }
        if (fileProvider instanceof _file_management_provider_base__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            return fileProvider
        }
        switch (fileProvider.type) {
            case "remote":
                return new _file_management_remote_provider__WEBPACK_IMPORTED_MODULE_3__["default"](fileProvider);
            case "custom":
                return new _file_management_custom_provider__WEBPACK_IMPORTED_MODULE_4__["default"](fileProvider)
        }
        return new _file_management_object_provider__WEBPACK_IMPORTED_MODULE_2__["default"](fileProvider)
    }
    setCurrentPath(path) {
        var pathParts = Object(_file_management_utils__WEBPACK_IMPORTED_MODULE_7__["getPathParts"])(path);
        var rawPath = Object(_file_management_utils__WEBPACK_IMPORTED_MODULE_7__["pathCombine"])(...pathParts);
        if (this.getCurrentDirectory().fileItem.relativeName === rawPath) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).resolve().promise()
        }
        return this._setCurrentDirectoryByPathParts(pathParts)
    }
    setCurrentPathByKeys(pathKeys) {
        if (Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_12__["equalByValue"])(this.getCurrentDirectory().fileItem.pathKeys, pathKeys, 0, true)) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).resolve().promise()
        }
        return this._setCurrentDirectoryByPathParts(pathKeys, true)
    }
    getCurrentPath() {
        var currentPath = "";
        var directory = this.getCurrentDirectory();
        while (directory && !directory.fileItem.isRoot()) {
            var escapedName = Object(_file_management_utils__WEBPACK_IMPORTED_MODULE_7__["getEscapedFileName"])(directory.fileItem.name);
            currentPath = Object(_file_management_utils__WEBPACK_IMPORTED_MODULE_7__["pathCombine"])(escapedName, currentPath);
            directory = directory.parentDirectory
        }
        return currentPath
    }
    getCurrentPathKeys() {
        return this.getCurrentDirectory().fileItem.pathKeys
    }
    getCurrentDirectory() {
        return this._currentDirectoryInfo
    }
    setCurrentDirectory(directoryInfo, checkActuality) {
        if (!directoryInfo) {
            return
        }
        if (checkActuality) {
            directoryInfo = this._getActualDirectoryInfo(directoryInfo)
        }
        if (this._currentDirectoryInfo && this._currentDirectoryInfo === directoryInfo) {
            this._raisePathPotentiallyChanged();
            return
        }
        var requireRaiseSelectedDirectory = this._currentDirectoryInfo.fileItem.key !== directoryInfo.fileItem.key;
        this._currentDirectoryInfo = directoryInfo;
        if (requireRaiseSelectedDirectory && this._isInitialized) {
            if (!this._dataLoading) {
                this._raiseDataLoading("navigation")
            }
            this._raiseSelectedDirectoryChanged(directoryInfo)
        }
    }
    _resetCurrentDirectory() {
        this._currentDirectoryInfo = this._rootDirectoryInfo
    }
    getCurrentItems(onlyFiles) {
        return this._dataLoadingDeferred ? this._dataLoadingDeferred.then(() => this._getCurrentItemsInternal(onlyFiles)) : this._getCurrentItemsInternal(onlyFiles)
    }
    _getCurrentItemsInternal(onlyFiles) {
        var currentDirectory = this.getCurrentDirectory();
        var getItemsPromise = this.getDirectoryContents(currentDirectory);
        return getItemsPromise.then(items => {
            var separatedItems = this._separateItemsByType(items);
            currentDirectory.fileItem.hasSubDirectories = !!separatedItems.folders.length;
            return onlyFiles ? separatedItems.files : items
        })
    }
    getDirectories(parentDirectoryInfo, skipNavigationOnError) {
        return this.getDirectoryContents(parentDirectoryInfo, skipNavigationOnError).then(itemInfos => itemInfos.filter(info => info.fileItem.isDirectory))
    }
    _separateItemsByType(itemInfos) {
        var folders = [];
        var files = [];
        itemInfos.forEach(info => info.fileItem.isDirectory ? folders.push(info) : files.push(info));
        return {
            folders: folders,
            files: files
        }
    }
    getDirectoryContents(parentDirectoryInfo, skipNavigationOnError) {
        if (!parentDirectoryInfo) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).resolve([this._rootDirectoryInfo]).promise()
        }
        if (parentDirectoryInfo.itemsLoaded) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).resolve(parentDirectoryInfo.items).promise()
        }
        var dirKey = parentDirectoryInfo.getInternalKey();
        var loadItemsDeferred = this._loadedItems[dirKey];
        if (loadItemsDeferred) {
            return loadItemsDeferred
        }
        loadItemsDeferred = this._getFileItems(parentDirectoryInfo, skipNavigationOnError).then(fileItems => {
            fileItems = fileItems || [];
            parentDirectoryInfo.items = fileItems.map(fileItem => fileItem.isDirectory && this._createDirectoryInfo(fileItem, parentDirectoryInfo) || this._createFileInfo(fileItem, parentDirectoryInfo));
            parentDirectoryInfo.itemsLoaded = true;
            return parentDirectoryInfo.items
        });
        this._loadedItems[dirKey] = loadItemsDeferred;
        loadItemsDeferred.always(() => {
            delete this._loadedItems[dirKey]
        });
        return loadItemsDeferred
    }
    _getFileItems(parentDirectoryInfo, skipNavigationOnError) {
        var loadItemsDeferred = null;
        try {
            loadItemsDeferred = this._fileProvider.getItems(parentDirectoryInfo.fileItem)
        } catch (error) {
            return this._handleItemLoadError(parentDirectoryInfo, error, skipNavigationOnError)
        }
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"])(loadItemsDeferred).then(fileItems => this._securityController.getAllowedItems(fileItems), errorInfo => this._handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError))
    }
    createDirectory(parentDirectoryInfo, name) {
        var parentDirItem = parentDirectoryInfo.fileItem;
        var tempDirInfo = this._createDirInfoByName(name, parentDirectoryInfo);
        var actionInfo = this._createEditActionInfo("create", tempDirInfo, parentDirectoryInfo);
        return this._processEditAction(actionInfo, args => {
            args.parentDirectory = parentDirItem;
            args.name = name;
            this._editingEvents.onDirectoryCreating(args)
        }, () => this._fileProvider.createDirectory(parentDirItem, name).done(info => {
            if (!parentDirItem.isRoot()) {
                parentDirItem.hasSubDirectories = true
            }
            return info
        }), () => {
            var args = {
                parentDirectory: parentDirItem,
                name: name
            };
            this._editingEvents.onDirectoryCreated(args)
        }, () => this._resetDirectoryState(parentDirectoryInfo, true))
    }
    renameItem(fileItemInfo, name) {
        var sourceItem = fileItemInfo.fileItem.createClone();
        var actionInfo = this._createEditActionInfo("rename", fileItemInfo, fileItemInfo.parentDirectory, {
            itemNewName: name
        });
        return this._processEditAction(actionInfo, (args, itemInfo) => {
            if (!itemInfo.fileItem.isDirectory) {
                this._securityController.validateExtension(name)
            }
            args.item = sourceItem;
            args.newName = name;
            this._editingEvents.onItemRenaming(args)
        }, item => this._fileProvider.renameItem(item, name), () => {
            var args = {
                sourceItem: sourceItem,
                itemName: name
            };
            this._editingEvents.onItemRenamed(args)
        }, () => {
            var parentDirectory = this._getActualDirectoryInfo(fileItemInfo.parentDirectory);
            this._resetDirectoryState(parentDirectory);
            this.setCurrentDirectory(parentDirectory)
        })
    }
    moveItems(itemInfos, destinationDirectory) {
        var actionInfo = this._createEditActionInfo("move", itemInfos, destinationDirectory);
        return this._processEditAction(actionInfo, (args, itemInfo) => {
            args.item = itemInfo.fileItem;
            args.destinationDirectory = destinationDirectory.fileItem;
            this._editingEvents.onItemMoving(args)
        }, item => this._fileProvider.moveItems([item], destinationDirectory.fileItem), itemInfo => {
            var args = {
                sourceItem: itemInfo.fileItem,
                parentDirectory: destinationDirectory.fileItem,
                itemName: itemInfo.fileItem.name,
                itemPath: Object(_file_management_utils__WEBPACK_IMPORTED_MODULE_7__["pathCombine"])(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
            };
            this._editingEvents.onItemMoved(args)
        }, () => {
            destinationDirectory = this._getActualDirectoryInfo(destinationDirectory);
            itemInfos.forEach(itemInfo => this._resetDirectoryState(itemInfo.parentDirectory, true));
            this._resetDirectoryState(destinationDirectory);
            this.setCurrentDirectory(destinationDirectory);
            destinationDirectory.expanded = true
        })
    }
    copyItems(itemInfos, destinationDirectory) {
        var actionInfo = this._createEditActionInfo("copy", itemInfos, destinationDirectory);
        return this._processEditAction(actionInfo, (args, itemInfo) => {
            args.item = itemInfo.fileItem;
            args.destinationDirectory = destinationDirectory.fileItem;
            this._editingEvents.onItemCopying(args)
        }, item => this._fileProvider.copyItems([item], destinationDirectory.fileItem), itemInfo => {
            var args = {
                sourceItem: itemInfo.fileItem,
                parentDirectory: destinationDirectory.fileItem,
                itemName: itemInfo.fileItem.name,
                itemPath: Object(_file_management_utils__WEBPACK_IMPORTED_MODULE_7__["pathCombine"])(destinationDirectory.fileItem.path, itemInfo.fileItem.name)
            };
            this._editingEvents.onItemCopied(args)
        }, () => {
            destinationDirectory = this._getActualDirectoryInfo(destinationDirectory);
            this._resetDirectoryState(destinationDirectory);
            this.setCurrentDirectory(destinationDirectory);
            destinationDirectory.expanded = true
        })
    }
    deleteItems(itemInfos) {
        var directory = itemInfos.length > 0 ? itemInfos[0].parentDirectory : null;
        var actionInfo = this._createEditActionInfo("delete", itemInfos, directory);
        return this._processEditAction(actionInfo, (args, itemInfo) => {
            args.item = itemInfo.fileItem;
            this._editingEvents.onItemDeleting(args)
        }, item => this._fileProvider.deleteItems([item]), itemInfo => this._editingEvents.onItemDeleted({
            item: itemInfo.fileItem
        }), () => {
            itemInfos.forEach(itemInfo => {
                var parentDir = this._getActualDirectoryInfo(itemInfo.parentDirectory);
                this._resetDirectoryState(parentDir);
                this.setCurrentDirectory(parentDir)
            })
        })
    }
    processUploadSession(sessionInfo, uploadDirectoryInfo) {
        var itemInfos = this._getItemInfosForUploaderFiles(sessionInfo.files, uploadDirectoryInfo);
        var actionInfo = this._createEditActionInfo("upload", itemInfos, uploadDirectoryInfo, {
            sessionInfo: sessionInfo
        });
        return this._processEditAction(actionInfo, () => {}, (_, index) => sessionInfo.deferreds[index], () => {}, () => this._resetDirectoryState(uploadDirectoryInfo, true))
    }
    uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
        var startDeferred = null;
        if (0 === chunksInfo.chunkIndex) {
            this._securityController.validateMaxFileSize(fileData.size);
            this._securityController.validateExtension(fileData.name);
            startDeferred = this._processBeforeItemEditAction(args => {
                args.fileData = fileData;
                args.destinationDirectory = destinationDirectory;
                this._editingEvents.onFileUploading(args)
            })
        } else {
            startDeferred = (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).resolve().promise()
        }
        var result = startDeferred.then(() => this._fileProvider.uploadFileChunk(fileData, chunksInfo, destinationDirectory));
        if (chunksInfo.chunkIndex === chunksInfo.chunkCount - 1) {
            result = result.done(() => {
                var args = {
                    fileData: fileData,
                    parentDirectory: destinationDirectory
                };
                this._editingEvents.onFileUploaded(args)
            })
        }
        return result
    }
    abortFileUpload(fileData, chunksInfo, destinationDirectory) {
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"])(this._fileProvider.abortFileUpload(fileData, chunksInfo, destinationDirectory))
    }
    getFileUploadChunkSize() {
        var chunkSize = this._options.uploadChunkSize;
        if (chunkSize && chunkSize > 0) {
            return chunkSize
        }
        return this._fileProvider.getFileUploadChunkSize()
    }
    downloadItems(itemInfos) {
        var canceled = false;
        var deferreds = itemInfos.map(itemInfo => this._processBeforeItemEditAction(args => {
            args.item = itemInfo.fileItem;
            this._editingEvents.onItemDownloading(args)
        }, itemInfo));
        Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_8__["whenSome"])(deferreds, null, () => {
            canceled = true
        }).then(() => {
            if (!canceled) {
                var items = itemInfos.map(i => i.fileItem);
                this._fileProvider.downloadItems(items)
            }
        })
    }
    getItemContent(itemInfos) {
        var items = itemInfos.map(i => i.fileItem);
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"])(this._fileProvider.getItemsContent(items))
    }
    _handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError) {
        parentDirectoryInfo = this._getActualDirectoryInfo(parentDirectoryInfo);
        var actionInfo = this._createEditActionInfo("getItems", parentDirectoryInfo, parentDirectoryInfo);
        this._raiseEditActionStarting(actionInfo);
        this._raiseEditActionResultAcquired(actionInfo);
        this._raiseEditActionError(actionInfo, {
            errorCode: errorInfo.errorCode,
            errorText: errorInfo.errorText,
            fileItem: parentDirectoryInfo.fileItem,
            index: 0
        });
        this._resetDirectoryState(parentDirectoryInfo);
        parentDirectoryInfo.expanded = false;
        if (!skipNavigationOnError) {
            this.setCurrentDirectory(parentDirectoryInfo.parentDirectory)
        }
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).reject().promise()
    }
    _processEditAction(actionInfo, beforeAction, action, afterAction, completeAction) {
        this._raiseEditActionStarting(actionInfo);
        var actionResult = actionInfo.itemInfos.map((itemInfo, itemIndex) => this._processBeforeItemEditAction(beforeAction, itemInfo).then(() => {
            var itemActionResult = action(itemInfo.fileItem, itemIndex);
            if (Array.isArray(itemActionResult)) {
                itemActionResult = itemActionResult[0]
            }
            return itemActionResult.done(() => afterAction(itemInfo))
        }));
        actionInfo.singleRequest = 1 === actionResult.length;
        this._raiseEditActionResultAcquired(actionInfo);
        return Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_8__["whenSome"])(actionResult, info => this._raiseCompleteEditActionItem(actionInfo, info), errorInfo => this._raiseEditActionItemError(actionInfo, errorInfo)).then(() => {
            completeAction();
            this._raiseCompleteEditAction(actionInfo)
        })
    }
    _createEditActionInfo(name, targetItemInfos, directory, customData) {
        targetItemInfos = Array.isArray(targetItemInfos) ? targetItemInfos : [targetItemInfos];
        customData = customData || {};
        var items = targetItemInfos.map(itemInfo => itemInfo.fileItem);
        return {
            name: name,
            itemInfos: targetItemInfos,
            items: items,
            directory: directory,
            customData: customData,
            singleRequest: true
        }
    }
    _processBeforeItemEditAction(action, itemInfo) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        var args = this._createBeforeActionArgs();
        try {
            action(args, itemInfo)
        } catch (errorInfo) {
            return deferred.reject(errorInfo).promise()
        }
        if (!args.cancel) {
            deferred.resolve()
        } else if (true === args.cancel) {
            return deferred.reject({
                errorText: args.errorText,
                errorCode: args.errorCode
            })
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_13__["isPromise"])(args.cancel)) {
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"])(args.cancel).then(res => {
                if (true === res) {
                    deferred.reject()
                } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_13__["isObject"])(res) && true === res.cancel) {
                    deferred.reject({
                        errorText: res.errorText,
                        errorCode: res.errorCode
                    })
                }
                deferred.resolve()
            }, deferred.resolve)
        }
        return deferred.promise()
    }
    _createBeforeActionArgs() {
        return {
            errorCode: void 0,
            errorText: "",
            cancel: false
        }
    }
    _getItemInfosForUploaderFiles(files, parentDirectoryInfo) {
        var pathInfo = this._getPathInfo(parentDirectoryInfo);
        var result = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var item = new _file_management_file_system_item__WEBPACK_IMPORTED_MODULE_1__["default"](pathInfo, file.name, false);
            var itemInfo = this._createFileInfo(item, parentDirectoryInfo);
            result.push(itemInfo)
        }
        return result
    }
    refresh() {
        if (this._lockRefresh) {
            return this._refreshDeferred
        }
        this._lockRefresh = true;
        return this._executeDataLoad(() => this._refreshDeferred = this._refreshInternal(), "refresh")
    }
    _refreshInternal() {
        var cachedRootInfo = {
            items: this._rootDirectoryInfo.items
        };
        var selectedKeyParts = this._getDirectoryPathKeyParts(this.getCurrentDirectory());
        this._resetDirectoryState(this._rootDirectoryInfo);
        return this._loadItemsRecursive(this._rootDirectoryInfo, cachedRootInfo).then(() => {
            var dirInfo = this._findDirectoryByPathKeyParts(selectedKeyParts);
            this.setCurrentDirectory(dirInfo);
            delete this._lockRefresh
        })
    }
    _loadItemsRecursive(directoryInfo, cachedDirectoryInfo) {
        var _this = this;
        return this.getDirectories(directoryInfo).then(dirInfos => {
            var itemDeferreds = [];
            var _loop = function(i) {
                var cachedItem = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["find"])(cachedDirectoryInfo.items, cache => dirInfos[i].fileItem.key === cache.fileItem.key);
                if (!cachedItem) {
                    return "continue"
                }
                dirInfos[i].expanded = cachedItem.expanded;
                if (dirInfos[i].expanded) {
                    itemDeferreds.push(_this._loadItemsRecursive(dirInfos[i], cachedItem))
                }
            };
            for (var i = 0; i < dirInfos.length; i++) {
                var _ret = _loop(i);
                if ("continue" === _ret) {
                    continue
                }
            }
            return Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_8__["whenSome"])(itemDeferreds)
        }, () => null)
    }
    _setCurrentDirectoryByPathParts(pathParts, useKeys) {
        return this._executeDataLoad(() => this._setCurrentDirectoryByPathPartsInternal(pathParts, useKeys), "navigation")
    }
    _setCurrentDirectoryByPathPartsInternal(pathParts, useKeys) {
        return this._getDirectoryByPathParts(this._rootDirectoryInfo, pathParts, useKeys).then(directoryInfo => {
            for (var info = directoryInfo.parentDirectory; info; info = info.parentDirectory) {
                info.expanded = true
            }
            this.setCurrentDirectory(directoryInfo)
        }, () => {
            this._raisePathPotentiallyChanged()
        })
    }
    _executeDataLoad(action, operation) {
        if (this._dataLoadingDeferred) {
            return this._dataLoadingDeferred.then(() => this._executeDataLoad(action, operation))
        }
        this._dataLoading = true;
        this._dataLoadingDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        if (this._isInitialized) {
            this._raiseDataLoading(operation)
        }
        return action().always(() => {
            var tempDeferred = this._dataLoadingDeferred;
            this._dataLoadingDeferred = null;
            this._dataLoading = false;
            tempDeferred.resolve()
        })
    }
    _getDirectoryByPathParts(parentDirectoryInfo, pathParts, useKeys) {
        if (pathParts.length < 1) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).resolve(parentDirectoryInfo).promise()
        }
        var fieldName = useKeys ? "key" : "name";
        return this.getDirectories(parentDirectoryInfo).then(dirInfos => {
            var subDirInfo = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["find"])(dirInfos, d => d.fileItem[fieldName] === pathParts[0]);
            if (!subDirInfo) {
                return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).reject().promise()
            }
            var restPathParts = [...pathParts].splice(1);
            return this._getDirectoryByPathParts(subDirInfo, restPathParts, useKeys)
        })
    }
    _getDirectoryPathKeyParts(directoryInfo) {
        var pathParts = [];
        while (directoryInfo && directoryInfo.parentDirectory) {
            pathParts.unshift(directoryInfo.fileItem.key);
            directoryInfo = directoryInfo.parentDirectory
        }
        return pathParts
    }
    _findDirectoryByPathKeyParts(keyParts) {
        var selectedDirInfo = this._rootDirectoryInfo;
        if (0 === keyParts.length) {
            return selectedDirInfo
        }
        var i = 0;
        var newSelectedDir = selectedDirInfo;
        while (newSelectedDir && i < keyParts.length) {
            newSelectedDir = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["find"])(selectedDirInfo.items, info => info.fileItem.key === keyParts[i]);
            if (newSelectedDir) {
                selectedDirInfo = newSelectedDir
            }
            i++
        }
        return selectedDirInfo
    }
    _getActualDirectoryInfo(directoryInfo) {
        var keys = this._getDirectoryPathKeyParts(directoryInfo);
        return this._findDirectoryByPathKeyParts(keys)
    }
    _createDirInfoByName(name, parentDirectoryInfo) {
        var dirPathInfo = this._getPathInfo(parentDirectoryInfo);
        var fileItem = new _file_management_file_system_item__WEBPACK_IMPORTED_MODULE_1__["default"](dirPathInfo, name, true);
        return this._createDirectoryInfo(fileItem, parentDirectoryInfo)
    }
    _createDirectoryInfo(fileItem, parentDirectoryInfo) {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_11__["extend"])(this._createFileInfo(fileItem, parentDirectoryInfo), {
            icon: "folder",
            expanded: fileItem.isRoot(),
            items: []
        })
    }
    _createFileInfo(fileItem, parentDirectoryInfo) {
        return {
            fileItem: fileItem,
            parentDirectory: parentDirectoryInfo,
            icon: this._getFileItemDefaultIcon(fileItem),
            getInternalKey() {
                return "FIK_".concat(this.fileItem.key)
            },
            getDisplayName() {
                return this.displayName || this.fileItem.name
            }
        }
    }
    _resetDirectoryState(directoryInfo, isActualDirectoryRequired) {
        if (isActualDirectoryRequired) {
            directoryInfo = this._getActualDirectoryInfo(directoryInfo)
        }
        directoryInfo.itemsLoaded = false;
        directoryInfo.items = []
    }
    _getFileItemDefaultIcon(fileItem) {
        if (fileItem.isDirectory) {
            return "folder"
        }
        var extension = fileItem.getFileExtension();
        var icon = this._defaultIconMap[extension];
        return icon || "doc"
    }
    _createDefaultIconMap() {
        var result = {
            ".txt": "txtfile",
            ".rtf": "rtffile",
            ".doc": "docfile",
            ".docx": "docxfile",
            ".xls": "xlsfile",
            ".xlsx": "xlsxfile",
            ".ppt": "pptfile",
            ".pptx": "pptxfile",
            ".pdf": "pdffile"
        };
        [".png", ".gif", ".jpg", ".jpeg", ".ico", ".bmp"].forEach(extension => {
            result[extension] = "image"
        });
        return result
    }
    _createRootDirectoryInfo(text) {
        var rootDirectory = new _file_management_file_system_item__WEBPACK_IMPORTED_MODULE_1__["default"](null, "", true);
        var result = this._createDirectoryInfo(rootDirectory, null);
        result.displayName = text || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
        return result
    }
    setRootText(rootText) {
        this._rootDirectoryInfo.displayName = rootText || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME
    }
    _raiseInitialized() {
        this._tryCallAction("onInitialized", {
            controller: this
        })
    }
    _raiseDataLoading(operation) {
        this._tryCallAction("onDataLoading", {
            operation: operation
        })
    }
    _raiseSelectedDirectoryChanged(directoryInfo) {
        this._tryCallAction("onSelectedDirectoryChanged", {
            selectedDirectoryInfo: directoryInfo
        })
    }
    _raiseEditActionStarting(actionInfo) {
        this._tryCallAction("onEditActionStarting", actionInfo)
    }
    _raiseEditActionResultAcquired(actionInfo) {
        this._tryCallAction("onEditActionResultAcquired", actionInfo)
    }
    _raiseEditActionError(actionInfo, errorInfo) {
        this._tryCallAction("onEditActionError", actionInfo, errorInfo)
    }
    _raiseEditActionItemError(actionInfo, errorInfo) {
        this._tryCallAction("onEditActionItemError", actionInfo, errorInfo)
    }
    _raiseCompleteEditActionItem(actionInfo, info) {
        this._tryCallAction("onCompleteEditActionItem", actionInfo, info)
    }
    _raiseCompleteEditAction(actionInfo) {
        this._tryCallAction("onCompleteEditAction", actionInfo)
    }
    _raisePathPotentiallyChanged() {
        this._tryCallAction("onPathPotentiallyChanged")
    }
    _tryCallAction(actionName) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (this._options[actionName]) {
            this._options[actionName](...args)
        }
    }
    _resetState() {
        this._selectedDirectory = null;
        this._rootDirectoryInfo.items = [];
        this._rootDirectoryInfo.itemsLoaded = false;
        this._loadedItems = {}
    }
    _getPathInfo(directoryInfo) {
        var pathInfo = [];
        for (var dirInfo = directoryInfo; dirInfo && !dirInfo.fileItem.isRoot(); dirInfo = dirInfo.parentDirectory) {
            pathInfo.unshift({
                key: dirInfo.fileItem.key,
                name: dirInfo.fileItem.name
            })
        }
        return pathInfo
    }
    on(eventName, eventHandler) {
        var finalEventName = "on".concat(eventName);
        this._options[finalEventName] = eventHandler
    }
    get _editingEvents() {
        return this._options.editingEvents
    }
}
class FileSecurityController {
    constructor(options) {
        this._options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_11__["extend"])({
            allowedFileExtensions: [],
            maxFileSize: 0
        }, options);
        this._extensionsMap = {};
        this._allowedFileExtensions.forEach(extension => {
            this._extensionsMap[extension.toUpperCase()] = true
        })
    }
    getAllowedItems(items) {
        if (0 === this._allowedFileExtensions.length) {
            return items
        }
        return items.filter(item => item.isDirectory || this._isValidExtension(item.name))
    }
    validateExtension(name) {
        if (!this._isValidExtension(name)) {
            throw new _file_management_error__WEBPACK_IMPORTED_MODULE_5__["default"](_file_management_error_codes__WEBPACK_IMPORTED_MODULE_6__["default"].WrongFileExtension, null)
        }
    }
    validateMaxFileSize(size) {
        if (this._maxFileSize && size > this._maxFileSize) {
            throw new _file_management_error__WEBPACK_IMPORTED_MODULE_5__["default"](_file_management_error_codes__WEBPACK_IMPORTED_MODULE_6__["default"].MaxFileSizeExceeded, null)
        }
    }
    _isValidExtension(name) {
        if (0 === this._allowedFileExtensions.length) {
            return true
        }
        var extension = Object(_file_management_utils__WEBPACK_IMPORTED_MODULE_7__["getFileExtension"])(name).toUpperCase();
        return this._extensionsMap[extension]
    }
    get _allowedFileExtensions() {
        return this._options.allowedFileExtensions
    }
    get _maxFileSize() {
        return this._options.maxFileSize
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.adaptivity.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.adaptivity.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _drawer_ui_drawer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../drawer/ui.drawer */ "./node_modules/devextreme/esm/ui/drawer/ui.drawer.js");
/* harmony import */ var _splitter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../splitter */ "./node_modules/devextreme/esm/ui/splitter.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.adaptivity.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */








var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["getWindow"])();
var ADAPTIVE_STATE_SCREEN_WIDTH = 573;
var FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS = "dx-filemanager-adaptivity-drawer-panel";
var DRAWER_PANEL_CONTENT_INITIAL = "dx-drawer-panel-content-initial";
var DRAWER_PANEL_CONTENT_ADAPTIVE = "dx-drawer-panel-content-adaptive";
class FileManagerAdaptivityControl extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_5__["default"] {
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        this._isInAdaptiveState = false;
        var $drawer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(this.$element());
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS).appendTo($drawer);
        this._drawer = this._createComponent($drawer, _drawer_ui_drawer__WEBPACK_IMPORTED_MODULE_6__["default"]);
        this._drawer.option({
            opened: true,
            template: this._createDrawerTemplate.bind(this)
        });
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._drawer.content()).addClass(DRAWER_PANEL_CONTENT_INITIAL);
        var $drawerContent = $drawer.find(".".concat(FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS)).first();
        var contentRenderer = this.option("contentTemplate");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(contentRenderer)) {
            contentRenderer($drawerContent)
        }
        this._updateDrawerMaxSize()
    }
    _createDrawerTemplate(container) {
        this.option("drawerTemplate")(container);
        this._splitter = this._createComponent("<div>", _splitter__WEBPACK_IMPORTED_MODULE_7__["default"], {
            container: this.$element(),
            leftElement: Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._drawer.content()),
            rightElement: Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._drawer.viewContent()),
            onApplyPanelSize: this._onApplyPanelSize.bind(this),
            onActiveStateChanged: this._onActiveStateChanged.bind(this)
        });
        this._splitter.$element().appendTo(container);
        this._splitter.disableSplitterCalculation(true)
    }
    _render() {
        super._render();
        this._checkAdaptiveState()
    }
    _onApplyPanelSize(e) {
        if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["hasWindow"])()) {
            return
        }
        if (!this._splitter.isSplitterMoved()) {
            this._setDrawerWidth("");
            return
        }
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._drawer.content()).removeClass(DRAWER_PANEL_CONTENT_INITIAL);
        this._setDrawerWidth(e.leftPanelWidth)
    }
    _onActiveStateChanged(_ref) {
        var {
            isActive: isActive
        } = _ref;
        this._splitter.disableSplitterCalculation(!isActive);
        !isActive && this._splitter.$element().css("left", "auto")
    }
    _setDrawerWidth(width) {
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._drawer.content()).css("width", width);
        this._updateDrawerMaxSize();
        this._drawer.resizeViewContent()
    }
    _updateDrawerMaxSize() {
        this._drawer.option("maxSize", this._drawer.getRealPanelWidth())
    }
    _dimensionChanged(dimension) {
        if (!dimension || "height" !== dimension) {
            this._checkAdaptiveState()
        }
    }
    _checkAdaptiveState() {
        var oldState = this._isInAdaptiveState;
        this._isInAdaptiveState = this._isSmallScreen();
        if (oldState !== this._isInAdaptiveState) {
            this.toggleDrawer(!this._isInAdaptiveState, true);
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._drawer.content()).toggleClass(DRAWER_PANEL_CONTENT_ADAPTIVE, this._isInAdaptiveState);
            this._raiseAdaptiveStateChanged(this._isInAdaptiveState)
        }
        if (this._isInAdaptiveState && this._isDrawerOpened()) {
            this._updateDrawerMaxSize()
        }
    }
    _isSmallScreen() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(window) <= ADAPTIVE_STATE_SCREEN_WIDTH
    }
    _isDrawerOpened() {
        return this._drawer.option("opened")
    }
    _initActions() {
        this._actions = {
            onAdaptiveStateChanged: this._createActionByOption("onAdaptiveStateChanged")
        }
    }
    _raiseAdaptiveStateChanged(enabled) {
        this._actions.onAdaptiveStateChanged({
            enabled: enabled
        })
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(super._getDefaultOptions(), {
            drawerTemplate: null,
            contentTemplate: null,
            onAdaptiveStateChanged: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "drawerTemplate":
            case "contentTemplate":
                this.repaint();
                break;
            case "onAdaptiveStateChanged":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    isInAdaptiveState() {
        return this._isInAdaptiveState
    }
    toggleDrawer(showing, skipAnimation) {
        this._updateDrawerMaxSize();
        this._drawer.option("animationEnabled", !skipAnimation);
        this._drawer.toggle(showing);
        var isSplitterActive = this._isDrawerOpened() && !this.isInAdaptiveState();
        this._splitter.toggleDisabled(!isSplitterActive)
    }
    getSplitterElement() {
        return this._splitter.getSplitterBorderElement().get(0)
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerAdaptivityControl);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.breadcrumbs.js":
/*!************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.breadcrumbs.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _menu_ui_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../menu/ui.menu */ "./node_modules/devextreme/esm/ui/menu/ui.menu.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.breadcrumbs.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var FILE_MANAGER_BREADCRUMBS_CLASS = "dx-filemanager-breadcrumbs";
var FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-parent-folder-item";
var FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-separator-item";
var FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-path-separator-item";
class FileManagerBreadcrumbs extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_2__["default"] {
    _init() {
        super._init();
        this._currentDirectory = null
    }
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        if (this._currentDirectory) {
            this._renderMenu()
        }
        this.$element().addClass(FILE_MANAGER_BREADCRUMBS_CLASS)
    }
    setCurrentDirectory(directory) {
        if (!this._areDirsEqual(this._currentDirectory, directory)) {
            this._currentDirectory = directory;
            this.repaint()
        }
    }
    _renderMenu() {
        var $menu = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this.$element());
        this._menu = this._createComponent($menu, _menu_ui_menu__WEBPACK_IMPORTED_MODULE_3__["default"], {
            dataSource: this._getMenuItems(),
            onItemClick: this._onItemClick.bind(this),
            onItemRendered: this._onItemRendered.bind(this)
        })
    }
    _getMenuItems() {
        var dirLine = this._getParentDirsLine();
        var result = [{
            icon: "arrowup",
            directory: this._currentDirectory.parentDirectory,
            isPathItem: true,
            cssClass: FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS
        }, {
            text: "\xa0",
            cssClass: FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS
        }];
        dirLine.forEach((dir, index) => {
            result.push({
                text: dir.getDisplayName(),
                directory: dir,
                isPathItem: true
            });
            if (index !== dirLine.length - 1) {
                result.push({
                    icon: "spinnext",
                    cssClass: FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS
                })
            }
        });
        return result
    }
    _onItemClick(_ref) {
        var {
            itemData: itemData
        } = _ref;
        if (!itemData.isPathItem) {
            return
        }
        var newDir = itemData.directory;
        if (!this._areDirsEqual(newDir, this._currentDirectory)) {
            this._raiseCurrentDirectoryChanged(newDir)
        }
    }
    _onItemRendered(_ref2) {
        var {
            itemElement: itemElement,
            itemData: itemData
        } = _ref2;
        if (itemData.cssClass) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(itemElement).addClass(itemData.cssClass)
        }
    }
    _getParentDirsLine() {
        var currentDirectory = this._currentDirectory;
        var result = [];
        while (currentDirectory) {
            result.unshift(currentDirectory);
            currentDirectory = currentDirectory.parentDirectory
        }
        return result
    }
    _areDirsEqual(dir1, dir2) {
        return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key
    }
    _initActions() {
        this._actions = {
            onCurrentDirectoryChanging: this._createActionByOption("onCurrentDirectoryChanging")
        }
    }
    _raiseCurrentDirectoryChanged(currentDirectory) {
        this._actions.onCurrentDirectoryChanging({
            currentDirectory: currentDirectory
        })
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            rootFolderDisplayName: "Files",
            onCurrentDirectoryChanging: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "rootFolderDisplayName":
                this.repaint();
                break;
            case "onCurrentDirectoryChanging":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerBreadcrumbs);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.command_manager.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.command_manager.js ***!
  \****************************************************************************************/
/*! exports provided: defaultPermissions, FileManagerCommandManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPermissions", function() { return defaultPermissions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileManagerCommandManager", function() { return FileManagerCommandManager; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.command_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var defaultPermissions = {
    create: false,
    copy: false,
    move: false,
    delete: false,
    rename: false,
    upload: false,
    download: false
};
class FileManagerCommandManager {
    constructor(permissions) {
        this._actions = {};
        this._permissions = permissions || {};
        this._initCommands()
    }
    _initCommands() {
        this._commands = [{
            name: "create",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandCreate"),
            icon: "newfolder",
            enabled: this._permissions.create,
            noFileItemRequired: true
        }, {
            name: "rename",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandRename"),
            icon: "rename",
            enabled: this._permissions.rename,
            isSingleFileItemCommand: true
        }, {
            name: "move",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandMove"),
            icon: "movetofolder",
            enabled: this._permissions.move
        }, {
            name: "copy",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandCopy"),
            icon: "copy",
            enabled: this._permissions.copy
        }, {
            name: "delete",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandDelete"),
            icon: "trash",
            enabled: this._permissions.delete
        }, {
            name: "download",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandDownload"),
            icon: "download",
            enabled: this._permissions.download
        }, {
            name: "upload",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandUpload"),
            icon: "upload",
            enabled: this._permissions.upload,
            noFileItemRequired: true
        }, {
            name: "refresh",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandRefresh"),
            icon: "dx-filemanager-i dx-filemanager-i-refresh",
            enabled: true,
            noFileItemRequired: true
        }, {
            name: "thumbnails",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandThumbnails"),
            icon: "mediumiconslayout",
            enabled: true,
            noFileItemRequired: true
        }, {
            name: "details",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandDetails"),
            icon: "detailslayout",
            enabled: true,
            noFileItemRequired: true
        }, {
            name: "clearSelection",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandClearSelection"),
            icon: "remove",
            enabled: true
        }, {
            name: "showNavPane",
            hint: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-commandShowNavPane"),
            icon: "menu",
            enabled: false,
            noFileItemRequired: true
        }];
        this._commandMap = {};
        this._commands.forEach(command => {
            this._commandMap[command.name] = command
        })
    }
    registerActions(actions) {
        this._actions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(this._actions, actions)
    }
    executeCommand(command, arg) {
        var commandName = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isString"])(command) ? command : command.name;
        var action = this._actions[commandName];
        if (action) {
            return action(arg)
        }
    }
    updatePermissions(permissions) {
        var resultPermissions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, defaultPermissions, permissions);
        this._permissions = resultPermissions;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(this._permissions, permission => {
            this._commandMap[permission].enabled = this._permissions[permission]
        })
    }
    setCommandEnabled(commandName, enabled) {
        var command = this.getCommandByName(commandName);
        if (command) {
            command.enabled = enabled
        }
    }
    getCommandByName(name) {
        return this._commandMap[name]
    }
    isCommandAvailable(commandName, itemInfos) {
        var command = this.getCommandByName(commandName);
        if (!command || !command.enabled) {
            return false
        }
        if (command.noFileItemRequired) {
            return true
        }
        var itemsLength = itemInfos && itemInfos.length || 0;
        if (0 === itemsLength || itemInfos.some(item => item.fileItem.isRoot() || item.fileItem.isParentFolder)) {
            return false
        }
        if ("download" === commandName) {
            return itemInfos.every(itemInfo => !itemInfo.fileItem.isDirectory)
        }
        return !command.isSingleFileItemCommand || 1 === itemsLength
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js ***!
  \*******************************************************************************/
/*! exports provided: whenSome, getDisplayFileSize, extendAttributes, findItemsByKeys, getMapFromObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenSome", function() { return whenSome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDisplayFileSize", function() { return getDisplayFileSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendAttributes", function() { return extendAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findItemsByKeys", function() { return findItemsByKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMapFromObject", function() { return getMapFromObject; });
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.common.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var whenSome = function(arg, onSuccess, onError) {
    onSuccess = onSuccess || _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
    onError = onError || _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
    if (!Array.isArray(arg)) {
        arg = [arg]
    }
    var deferreds = arg.map((item, index) => Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["when"])(item).then(result => {
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(onSuccess) && onSuccess({
            item: item,
            index: index,
            result: result
        });
        return result
    }, error => {
        if (!error) {
            error = {}
        }
        error.index = index;
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(onError) && onError(error);
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["Deferred"]).resolve().promise()
    }));
    return _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["when"].apply(null, deferreds)
};
var getDisplayFileSize = function(byteSize) {
    var sizesTitles = ["B", "KB", "MB", "GB", "TB"];
    var index = 0;
    var displaySize = byteSize;
    while (displaySize >= 1024 && index <= sizesTitles.length - 1) {
        displaySize /= 1024;
        index++
    }
    displaySize = Math.round(10 * displaySize) / 10;
    return "".concat(displaySize, " ").concat(sizesTitles[index])
};
var extendAttributes = function(targetObject, sourceObject, objectKeysArray) {
    objectKeysArray.forEach(objectKey => {
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, targetObject, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(sourceObject[objectKey]) ? {
            [objectKey]: sourceObject[objectKey]
        } : {})
    });
    return targetObject
};
var findItemsByKeys = (itemInfos, keys) => {
    var itemMap = {};
    keys.forEach(key => {
        itemMap[key] = null
    });
    itemInfos.forEach(itemInfo => {
        var key = itemInfo.fileItem.key;
        if (Object.prototype.hasOwnProperty.call(itemMap, key)) {
            itemMap[key] = itemInfo
        }
    });
    var result = [];
    keys.forEach(key => {
        var itemInfo = itemMap[key];
        if (itemInfo) {
            result.push(itemInfo)
        }
    });
    return result
};
var getMapFromObject = function(object) {
    var keys = Object.keys(object);
    var values = [];
    keys.forEach(key => values.push(object[key]));
    return {
        keys: keys,
        values: values
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.context_menu.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.context_menu.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _context_menu_ui_context_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context_menu/ui.context_menu */ "./node_modules/devextreme/esm/ui/context_menu/ui.context_menu.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.context_menu.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var FILEMANAGER_CONTEXT_MEMU_CLASS = "dx-filemanager-context-menu";
var DEFAULT_CONTEXT_MENU_ITEMS = {
    create: {},
    upload: {},
    download: {},
    rename: {},
    move: {},
    copy: {},
    delete: {},
    refresh: {
        beginGroup: true
    }
};
var DEFAULT_ITEM_ALLOWED_PROPERTIES = ["beginGroup", "closeMenuOnClick", "disabled", "icon", "selectable", "selected", "text", "visible"];
class FileManagerContextMenu extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_4__["default"] {
    _initMarkup() {
        this._initActions();
        this._isVisible = false;
        var $menu = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this.$element());
        this._contextMenu = this._createComponent($menu, _context_menu_ui_context_menu__WEBPACK_IMPORTED_MODULE_5__["default"], {
            cssClass: FILEMANAGER_CONTEXT_MEMU_CLASS,
            showEvent: "",
            onItemClick: args => this._onContextMenuItemClick(args.itemData.name, args),
            onShowing: e => this._onContextMenuShowing(e),
            onShown: () => this._onContextMenuShown(),
            onHidden: () => this._onContextMenuHidden()
        });
        super._initMarkup()
    }
    showAt(fileItems, element, event, target) {
        var {
            itemData: itemData,
            itemElement: itemElement,
            isActionButton: isActionButton = false
        } = target;
        if (this._isVisible) {
            this._onContextMenuHidden()
        }
        this._menuShowingContext = {
            targetElement: itemElement,
            itemData: itemData,
            fileItems: fileItems,
            event: event,
            isActionButton: isActionButton
        };
        var position = {
            of: element,
            at: "top left",
            my: "top left",
            offset: ""
        };
        if (event) {
            position.offset = event.offsetX + " " + event.offsetY
        } else {
            position.my = "left top";
            position.at = "left bottom";
            position.boundaryOffset = "1"
        }
        this._contextMenu.option({
            target: element,
            position: position
        });
        this._contextMenu.show()
    }
    createContextMenuItems(fileItems, contextMenuItems, targetFileItem) {
        this._targetFileItems = fileItems;
        this._targetFileItem = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(targetFileItem) ? targetFileItem : null === fileItems || void 0 === fileItems ? void 0 : fileItems[0];
        var result = [];
        var itemArray = contextMenuItems || this.option("items");
        itemArray.forEach(srcItem => {
            var commandName = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isString"])(srcItem) ? srcItem : srcItem.name;
            var item = this._configureItemByCommandName(commandName, srcItem, fileItems, this._targetFileItem);
            if (this._isContextMenuItemAvailable(item, fileItems)) {
                result.push(item)
            }
        });
        return result
    }
    _isContextMenuItemAvailable(menuItem, fileItems) {
        if (!this._isDefaultItem(menuItem.name) || !menuItem._autoHide) {
            return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["ensureDefined"])(menuItem.visible, true)
        }
        if (this._isIsolatedCreationItemCommand(menuItem.name) && fileItems && fileItems.length) {
            return false
        }
        return this._commandManager.isCommandAvailable(menuItem.name, fileItems)
    }
    _isIsolatedCreationItemCommand(commandName) {
        return ("create" === commandName || "upload" === commandName) && this.option("isolateCreationItemCommands")
    }
    _isDefaultItem(commandName) {
        return !!DEFAULT_CONTEXT_MENU_ITEMS[commandName]
    }
    _configureItemByCommandName(commandName, item, fileItems, targetFileItem) {
        if (!this._isDefaultItem(commandName)) {
            var res = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, item);
            res.originalItemData = item;
            this._addItemClickHandler(commandName, res);
            if (Array.isArray(item.items)) {
                res.items = this.createContextMenuItems(fileItems, item.items, targetFileItem)
            }
            return res
        }
        var result = this._createMenuItemByCommandName(commandName);
        var defaultConfig = DEFAULT_CONTEXT_MENU_ITEMS[commandName];
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(result, defaultConfig);
        result.originalItemData = item;
        Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__["extendAttributes"])(result, item, DEFAULT_ITEM_ALLOWED_PROPERTIES);
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(result.visible)) {
            result._autoHide = true
        }
        if (commandName && !result.name) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(result, {
                name: commandName
            })
        }
        return result
    }
    _createMenuItemByCommandName(commandName) {
        var {
            text: text,
            icon: icon
        } = this._commandManager.getCommandByName(commandName);
        var menuItem = {
            name: commandName,
            text: text,
            icon: icon
        };
        this._addItemClickHandler(commandName, menuItem);
        return menuItem
    }
    _addItemClickHandler(commandName, contextMenuItem) {
        contextMenuItem.onItemClick = args => this._onContextMenuItemClick(commandName, args)
    }
    _onContextMenuItemClick(commandName, args) {
        var _this$_targetFileItem;
        var changedArgs = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, args);
        changedArgs.itemData = args.itemData.originalItemData;
        changedArgs.fileSystemItem = null === (_this$_targetFileItem = this._targetFileItem) || void 0 === _this$_targetFileItem ? void 0 : _this$_targetFileItem.fileItem;
        changedArgs.viewArea = this.option("viewArea");
        this._actions.onItemClick(changedArgs);
        if (this._isDefaultItem(commandName)) {
            var targetFileItems = this._isIsolatedCreationItemCommand(commandName) ? null : this._targetFileItems;
            this._commandManager.executeCommand(commandName, targetFileItems)
        }
    }
    _initActions() {
        this._actions = {
            onContextMenuHidden: this._createActionByOption("onContextMenuHidden"),
            onContextMenuShowing: this._createActionByOption("onContextMenuShowing"),
            onItemClick: this._createActionByOption("onItemClick")
        }
    }
    _onContextMenuShowing(e) {
        if (this._isVisible) {
            this._onContextMenuHidden(true)
        }
        e = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(e, this._menuShowingContext, {
            options: this.option(),
            cancel: false
        });
        this._actions.onContextMenuShowing(e);
        if (!e.cancel) {
            var items = this.createContextMenuItems(this._menuShowingContext.fileItems, null, this._menuShowingContext.fileSystemItem);
            this._contextMenu.option("dataSource", items)
        }
    }
    tryUpdateVisibleContextMenu() {
        if (this._isVisible) {
            var items = this.createContextMenuItems(this._targetFileItems);
            this._contextMenu.option("dataSource", items)
        }
    }
    _onContextMenuShown() {
        this._isVisible = true
    }
    _onContextMenuHidden(preserveContext) {
        this._isVisible = false;
        if (!preserveContext) {
            this._menuShowingContext = {}
        }
        this._contextMenu.option("visible", false);
        this._raiseContextMenuHidden()
    }
    _raiseContextMenuHidden() {
        this._actions.onContextMenuHidden()
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            commandManager: null,
            onContextMenuHidden: null,
            onItemClick: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "commandManager":
                this.repaint();
                break;
            case "items":
                this.tryUpdateVisibleContextMenu();
                break;
            case "onItemClick":
            case "onContextMenuShowing":
            case "onContextMenuHidden":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    get _commandManager() {
        return this.option("commandManager")
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerContextMenu);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.delete_item.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.delete_item.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _scroll_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scroll_view */ "./node_modules/devextreme/esm/ui/scroll_view.js");
/* harmony import */ var _ui_file_manager_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui.file_manager.dialog */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.dialog.delete_item.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var FILE_MANAGER_DIALOG_DELETE_ITEM = "dx-filemanager-dialog-delete-item";
var FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP = "dx-filemanager-dialog-delete-item-popup";
class FileManagerDeleteItemDialog extends _ui_file_manager_dialog__WEBPACK_IMPORTED_MODULE_4__["default"] {
    show(_ref) {
        var {
            itemName: itemName,
            itemCount: itemCount
        } = _ref;
        var text = 1 === itemCount ? _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDeleteItemSingleItemConfirmation", itemName) : _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDeleteItemMultipleItemsConfirmation", itemCount);
        if (this._$text) {
            this._$text.text(text)
        } else {
            this._initialText = text
        }
        super.show()
    }
    _getDialogOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDialogOptions(), {
            title: _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDeleteItemTitle"),
            buttonText: _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDeleteItemButtonText"),
            contentCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM,
            popupCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP,
            height: "auto",
            maxHeight: "80vh"
        })
    }
    _createContentTemplate(element) {
        super._createContentTemplate(element);
        this._$text = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").text(this._initialText).appendTo(this._$contentElement);
        this._createComponent(this._$contentElement, _scroll_view__WEBPACK_IMPORTED_MODULE_3__["default"], {
            width: "100%",
            height: "100%"
        })
    }
    _getDialogResult() {
        return {}
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerDeleteItemDialog);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.folder_chooser.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.folder_chooser.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/* harmony import */ var _ui_file_manager_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui.file_manager.dialog */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.js");
/* harmony import */ var _ui_file_manager_files_tree_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui.file_manager.files_tree_view */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.files_tree_view.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.dialog.folder_chooser.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var FILE_MANAGER_DIALOG_FOLDER_CHOOSER = "dx-filemanager-dialog-folder-chooser";
var FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP = "dx-filemanager-dialog-folder-chooser-popup";
class FileManagerFolderChooserDialog extends _ui_file_manager_dialog__WEBPACK_IMPORTED_MODULE_4__["default"] {
    show() {
        var _this$_filesTreeView;
        this._resetDialogSelectedDirectory();
        null === (_this$_filesTreeView = this._filesTreeView) || void 0 === _this$_filesTreeView ? void 0 : _this$_filesTreeView.refresh();
        super.show()
    }
    switchToCopyDialog(targetItemInfos) {
        this._targetItemInfos = targetItemInfos;
        this._setTitle(_localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDirectoryChooserCopyTitle"));
        this._setButtonText(_localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDirectoryChooserCopyButtonText"))
    }
    switchToMoveDialog(targetItemInfos) {
        this._targetItemInfos = targetItemInfos;
        this._setTitle(_localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDirectoryChooserMoveTitle"));
        this._setButtonText(_localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogDirectoryChooserMoveButtonText"))
    }
    _getDialogOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDialogOptions(), {
            contentCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER,
            popupCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP
        })
    }
    _createContentTemplate(element) {
        super._createContentTemplate(element);
        this._filesTreeView = this._createComponent(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>"), _ui_file_manager_files_tree_view__WEBPACK_IMPORTED_MODULE_5__["default"], {
            getDirectories: this.option("getDirectories"),
            getCurrentDirectory: () => this._getDialogSelectedDirectory(),
            onDirectoryClick: e => this._onFilesTreeViewDirectoryClick(e),
            onFilesTreeViewContentReady: () => this._toggleUnavailableLocationsDisabled(true)
        });
        this._$contentElement.append(this._filesTreeView.$element())
    }
    _getDialogResult() {
        var result = this._getDialogSelectedDirectory();
        return result ? {
            folder: result
        } : result
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            getItems: null
        })
    }
    _getDialogSelectedDirectory() {
        return this._selectedDirectoryInfo
    }
    _resetDialogSelectedDirectory() {
        this._selectedDirectoryInfo = null
    }
    _onFilesTreeViewDirectoryClick(_ref) {
        var {
            itemData: itemData
        } = _ref;
        this._selectedDirectoryInfo = itemData;
        this._filesTreeView.updateCurrentDirectory()
    }
    _onPopupShown() {
        this._toggleUnavailableLocationsDisabled(true);
        super._onPopupShown()
    }
    _onPopupHidden() {
        this._toggleUnavailableLocationsDisabled(false);
        super._onPopupHidden()
    }
    _toggleUnavailableLocationsDisabled(isDisabled) {
        if (!this._filesTreeView) {
            return
        }
        var locations = this._getLocationsToProcess(isDisabled);
        this._filesTreeView.toggleDirectoryExpandedStateRecursive(locations.locationsToExpand[0], isDisabled).then(() => this._filesTreeView.toggleDirectoryLineExpandedState(locations.locationsToCollapse, !isDisabled).then(() => locations.locationKeysToDisable.forEach(key => this._filesTreeView.toggleNodeDisabledState(key, isDisabled))))
    }
    _getLocationsToProcess(isDisabled) {
        var expandLocations = {};
        var collapseLocations = {};
        this._targetItemInfos.forEach(itemInfo => {
            if (itemInfo.parentDirectory) {
                expandLocations[itemInfo.parentDirectory.getInternalKey()] = itemInfo.parentDirectory
            }
            if (itemInfo.fileItem.isDirectory) {
                collapseLocations[itemInfo.getInternalKey()] = itemInfo
            }
        });
        var expandMap = Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_3__["getMapFromObject"])(expandLocations);
        var collapseMap = Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_3__["getMapFromObject"])(collapseLocations);
        return {
            locationsToExpand: isDisabled ? expandMap.values : [],
            locationsToCollapse: isDisabled ? collapseMap.values : [],
            locationKeysToDisable: expandMap.keys.concat(...collapseMap.keys)
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerFolderChooserDialog);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../popup */ "./node_modules/devextreme/esm/ui/popup.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.dialog.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var FILE_MANAGER_DIALOG_CONTENT = "dx-filemanager-dialog";
var FILE_MANAGER_DIALOG_POPUP = "dx-filemanager-dialog-popup";
class FileManagerDialogBase extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_4__["default"] {
    _initMarkup() {
        super._initMarkup();
        this._createOnClosedAction();
        var options = this._getDialogOptions();
        var $popup = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_DIALOG_POPUP).appendTo(this.$element());
        if (options.popupCssClass) {
            $popup.addClass(options.popupCssClass)
        }
        var popupOptions = {
            showTitle: true,
            title: options.title,
            visible: false,
            closeOnOutsideClick: true,
            copyRootClassesToWrapper: true,
            _ignoreCopyRootClassesToWrapperDeprecation: true,
            contentTemplate: this._createContentTemplate.bind(this),
            toolbarItems: [{
                widget: "dxButton",
                toolbar: "bottom",
                location: "after",
                options: {
                    text: options.buttonText,
                    onClick: this._applyDialogChanges.bind(this)
                }
            }, {
                widget: "dxButton",
                toolbar: "bottom",
                location: "after",
                options: {
                    text: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxFileManager-dialogButtonCancel"),
                    onClick: this._closeDialog.bind(this)
                }
            }],
            onInitialized: _ref => {
                var {
                    component: component
                } = _ref;
                component.registerKeyHandler("enter", this._applyDialogChanges.bind(this))
            },
            onHidden: this._onPopupHidden.bind(this),
            onShown: this._onPopupShown.bind(this)
        };
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(options.height)) {
            popupOptions.height = options.height
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(options.maxHeight)) {
            popupOptions.maxHeight = options.maxHeight
        }
        this._popup = this._createComponent($popup, _popup__WEBPACK_IMPORTED_MODULE_5__["default"], popupOptions)
    }
    show() {
        this._dialogResult = null;
        this._popup.show()
    }
    _getDialogOptions() {
        return {
            title: "Title",
            buttonText: "ButtonText",
            contentCssClass: "",
            popupCssClass: ""
        }
    }
    _createContentTemplate(element) {
        this._$contentElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(element).addClass(FILE_MANAGER_DIALOG_CONTENT);
        var cssClass = this._getDialogOptions().contentCssClass;
        if (cssClass) {
            this._$contentElement.addClass(cssClass)
        }
    }
    _getDialogResult() {
        return null
    }
    _applyDialogChanges() {
        var result = this._getDialogResult();
        if (result) {
            this._dialogResult = result;
            this._closeDialog()
        }
    }
    _closeDialog() {
        this._popup.hide()
    }
    _onPopupHidden() {
        this._onClosedAction({
            dialogResult: this._dialogResult
        })
    }
    _onPopupShown() {}
    _createOnClosedAction() {
        this._onClosedAction = this._createActionByOption("onClosed")
    }
    _setTitle(newTitle) {
        this._popup.option("title", newTitle)
    }
    _setButtonText(newText) {
        this._popup.option("toolbarItems[0].options.text", newText)
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            onClosed: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "onClosed":
                this._createOnPathChangedAction();
                break;
            default:
                super._optionChanged(args)
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerDialogBase);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.name_editor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.name_editor.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _text_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../text_box */ "./node_modules/devextreme/esm/ui/text_box.js");
/* harmony import */ var _ui_file_manager_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.file_manager.dialog */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.dialog.name_editor.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var FILE_MANAGER_DIALOG_NAME_EDITOR = "dx-filemanager-dialog-name-editor";
var FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP = "dx-filemanager-dialog-name-editor-popup";
class FileManagerNameEditorDialog extends _ui_file_manager_dialog__WEBPACK_IMPORTED_MODULE_3__["default"] {
    show(name) {
        name = name || "";
        if (this._nameTextBox) {
            this._nameTextBox.option("value", name)
        } else {
            this._initialNameValue = name
        }
        super.show()
    }
    _onPopupShown() {
        if (!this._nameTextBox) {
            return
        }
        var $textBoxInput = this._nameTextBox._input();
        $textBoxInput.length && $textBoxInput[0].select();
        this._nameTextBox.focus()
    }
    _getDialogOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDialogOptions(), {
            title: this.option("title"),
            buttonText: this.option("buttonText"),
            contentCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR,
            popupCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP
        })
    }
    _createContentTemplate(element) {
        super._createContentTemplate(element);
        this._nameTextBox = this._createComponent(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>"), _text_box__WEBPACK_IMPORTED_MODULE_2__["default"], {
            value: this._initialNameValue,
            onEnterKey: () => this._hasCompositionJustEnded && this._applyDialogChanges(),
            onKeyDown: e => this._checkCompositionEnded(e)
        });
        this._$contentElement.append(this._nameTextBox.$element())
    }
    _checkCompositionEnded(_ref) {
        var {
            event: event
        } = _ref;
        this._hasCompositionJustEnded = 229 !== event.which
    }
    _getDialogResult() {
        var nameValue = this._nameTextBox.option("value");
        return nameValue ? {
            name: nameValue
        } : null
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            title: "",
            buttonText: ""
        })
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerNameEditorDialog);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog_manager.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog_manager.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _ui_file_manager_dialog_name_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.file_manager.dialog.name_editor */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.name_editor.js");
/* harmony import */ var _ui_file_manager_dialog_folder_chooser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui.file_manager.dialog.folder_chooser */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.folder_chooser.js");
/* harmony import */ var _ui_file_manager_dialog_delete_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui.file_manager.dialog.delete_item */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog.delete_item.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.dialog_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






class FileManagerDialogManager {
    constructor($element, options) {
        this._$element = $element;
        this._options = options;
        var baseDialogOptions = {
            onClosed: this._options.onDialogClosed,
            rtlEnabled: this._options.rtlEnabled
        };
        var $chooseFolderDialog = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this._$element);
        this._chooseDirectoryDialog = new _ui_file_manager_dialog_folder_chooser__WEBPACK_IMPORTED_MODULE_4__["default"]($chooseFolderDialog, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(baseDialogOptions, this._options.chooseDirectoryDialog));
        var $renameDialog = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this._$element);
        this._renameItemDialog = new _ui_file_manager_dialog_name_editor__WEBPACK_IMPORTED_MODULE_3__["default"]($renameDialog, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(baseDialogOptions, {
            title: _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogRenameItemTitle"),
            buttonText: _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogRenameItemButtonText")
        }));
        var $createDialog = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this._$element);
        this._createItemDialog = new _ui_file_manager_dialog_name_editor__WEBPACK_IMPORTED_MODULE_3__["default"]($createDialog, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(baseDialogOptions, {
            title: _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogCreateDirectoryTitle"),
            buttonText: _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("dxFileManager-dialogCreateDirectoryButtonText")
        }));
        var $deleteItemDialog = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this._$element);
        this._deleteItemDialog = new _ui_file_manager_dialog_delete_item__WEBPACK_IMPORTED_MODULE_5__["default"]($deleteItemDialog, baseDialogOptions)
    }
    getCopyDialog(targetItemInfos) {
        this._chooseDirectoryDialog.switchToCopyDialog(targetItemInfos);
        return this._chooseDirectoryDialog
    }
    getMoveDialog(targetItemInfos) {
        this._chooseDirectoryDialog.switchToMoveDialog(targetItemInfos);
        return this._chooseDirectoryDialog
    }
    getRenameItemDialog() {
        return this._renameItemDialog
    }
    getCreateItemDialog() {
        return this._createItemDialog
    }
    getDeleteItemDialog() {
        return this._deleteItemDialog
    }
    updateDialogRtl(value) {
        [this._chooseDirectoryDialog, this._renameItemDialog, this._createItemDialog, this._deleteItemDialog].forEach(dialog => {
            dialog.option("rtlEnabled", value)
        })
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerDialogManager);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.editing.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.editing.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/string */ "./node_modules/devextreme/esm/core/utils/string.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _ui_file_manager_dialog_manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui.file_manager.dialog_manager */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.dialog_manager.js");
/* harmony import */ var _ui_file_manager_file_uploader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui.file_manager.file_uploader */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.file_uploader.js");
/* harmony import */ var _ui_file_manager_messages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui.file_manager.messages */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.messages.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.editing.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










class FileManagerEditingControl extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__["default"] {
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        this._controller = this.option("controller");
        this._controller.on("EditActionStarting", this._onEditActionStarting.bind(this));
        this._controller.on("EditActionResultAcquired", this._onEditActionResultAcquired.bind(this));
        this._controller.on("EditActionItemError", this._onEditActionItemError.bind(this));
        this._controller.on("EditActionError", this._onEditActionError.bind(this));
        this._controller.on("CompleteEditActionItem", this._onCompleteEditActionItem.bind(this));
        this._controller.on("CompleteEditAction", this._onCompleteEditAction.bind(this));
        this._model = this.option("model");
        this._uploadOperationInfoMap = {};
        this._dialogManager = new _ui_file_manager_dialog_manager__WEBPACK_IMPORTED_MODULE_7__["default"](this.$element(), {
            chooseDirectoryDialog: {
                provider: this._controller._fileProvider,
                getDirectories: this._controller.getDirectories.bind(this._controller),
                getCurrentDirectory: this._controller.getCurrentDirectory.bind(this._controller)
            },
            rtlEnabled: this.option("rtlEnabled"),
            onDialogClosed: this._onDialogClosed.bind(this)
        });
        this._fileUploader = this._createFileUploader();
        var notificationControl = this.option("notificationControl");
        if (notificationControl) {
            this._initNotificationControl(notificationControl)
        }
        this._createMetadataMap()
    }
    _initNotificationControl(notificationControl) {
        this._notificationControl = notificationControl;
        this._notificationControl.option({
            onOperationCanceled: _ref => {
                var {
                    info: info
                } = _ref;
                return this._onCancelUploadSession(info)
            },
            onOperationItemCanceled: _ref2 => {
                var {
                    item: item,
                    itemIndex: itemIndex
                } = _ref2;
                return this._onCancelFileUpload(item, itemIndex)
            }
        })
    }
    _getFileUploaderComponent() {
        return _ui_file_manager_file_uploader__WEBPACK_IMPORTED_MODULE_8__["default"]
    }
    _createFileUploader() {
        var $fileUploader = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this.$element());
        return this._createComponent($fileUploader, this._getFileUploaderComponent(), {
            getController: this._getFileUploaderController.bind(this),
            dropZonePlaceholderContainer: this.option("uploadDropZonePlaceholderContainer"),
            onUploadSessionStarted: e => this._onUploadSessionStarted(e),
            onUploadProgress: e => this._onUploadProgress(e)
        })
    }
    setUploaderDropZone($element) {
        this._fileUploader.option("dropZone", $element)
    }
    setUploaderSplitterElement(element) {
        this._fileUploader.option("splitterElement", element)
    }
    _getFileUploaderController() {
        var uploadDirectory = this.uploadDirectoryInfo.fileItem;
        return {
            chunkSize: this._controller.getFileUploadChunkSize(),
            uploadFileChunk: (fileData, chunksInfo) => this._controller.uploadFileChunk(fileData, chunksInfo, uploadDirectory),
            abortFileUpload: (fileData, chunksInfo) => this._controller.abortFileUpload(fileData, chunksInfo, uploadDirectory)
        }
    }
    _createMetadataMap() {
        this._metadataMap = {
            create: {
                action: arg => this._tryCreate(arg),
                affectsAllItems: true,
                singleItemProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCreateSingleItemProcessingMessage"),
                singleItemSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCreateSingleItemSuccessMessage"),
                singleItemErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCreateSingleItemErrorMessage"),
                commonErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCreateCommonErrorMessage")
            },
            rename: {
                action: arg => this._tryRename(arg),
                singleItemProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingRenameSingleItemProcessingMessage"),
                singleItemSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingRenameSingleItemSuccessMessage"),
                singleItemErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingRenameSingleItemErrorMessage"),
                commonErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingRenameCommonErrorMessage")
            },
            delete: {
                action: arg => this._tryDelete(arg),
                singleItemProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingDeleteSingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingDeleteMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingDeleteSingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingDeleteMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingDeleteSingleItemErrorMessage"),
                multipleItemsErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingDeleteMultipleItemsErrorMessage"),
                commonErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingDeleteCommonErrorMessage")
            },
            move: {
                action: arg => this._tryMove(arg),
                singleItemProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingMoveSingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingMoveMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingMoveSingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingMoveMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingMoveSingleItemErrorMessage"),
                multipleItemsErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingMoveMultipleItemsErrorMessage"),
                commonErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingMoveCommonErrorMessage")
            },
            copy: {
                action: arg => this._tryCopy(arg),
                singleItemProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCopySingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCopyMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCopySingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCopyMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCopySingleItemErrorMessage"),
                multipleItemsErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCopyMultipleItemsErrorMessage"),
                commonErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingCopyCommonErrorMessage")
            },
            upload: {
                action: arg => this._tryUpload(arg),
                allowCancel: true,
                allowItemProgress: true,
                singleItemProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingUploadSingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingUploadMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingUploadSingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingUploadMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingUploadSingleItemErrorMessage"),
                multipleItemsErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingUploadMultipleItemsErrorMessage"),
                canceledMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-editingUploadCanceledMessage")
            },
            download: {
                action: arg => this._download(arg)
            },
            getItemContent: {
                action: arg => this._getItemContent(arg)
            },
            getItems: {
                singleItemProcessingMessage: "",
                singleItemErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-errorDirectoryOpenFailed"),
                commonErrorMessage: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-errorDirectoryOpenFailed")
            }
        }
    }
    getCommandActions() {
        var result = {};
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this._metadataMap, name => {
            if (Object.prototype.hasOwnProperty.call(this._metadataMap, name)) {
                result[name] = arg => this._executeAction(name, arg)
            }
        });
        return result
    }
    _executeAction(actionName, arg) {
        var actionMetadata = this._metadataMap[actionName];
        return actionMetadata ? actionMetadata.action(arg) : null
    }
    _onCancelUploadSession(info) {
        this._fileUploader.cancelUpload(info.uploadSessionId)
    }
    _onCancelFileUpload(item, itemIndex) {
        this._fileUploader.cancelFileUpload(item.info.uploadSessionId, itemIndex)
    }
    _onUploadProgress(_ref3) {
        var {
            sessionId: sessionId,
            fileIndex: fileIndex,
            commonValue: commonValue,
            fileValue: fileValue
        } = _ref3;
        var operationInfo = this._uploadOperationInfoMap[sessionId];
        this._notificationControl.updateOperationItemProgress(operationInfo, fileIndex, 100 * fileValue, 100 * commonValue)
    }
    _onUploadSessionStarted(_ref4) {
        var {
            sessionInfo: sessionInfo
        } = _ref4;
        this._controller.processUploadSession(sessionInfo, this.uploadDirectoryInfo)
    }
    _onEditActionStarting(actionInfo) {
        var actionMetadata = this._metadataMap[actionInfo.name];
        var context = new FileManagerActionContext(actionMetadata, actionInfo.itemInfos, actionInfo.directory);
        var operationInfo = this._notificationControl.addOperation(context.processingMessage, actionMetadata.allowCancel, !actionMetadata.allowItemProgress);
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(actionInfo.customData, {
            context: context,
            operationInfo: operationInfo
        });
        switch (actionInfo.name) {
            case "upload":
                var sessionId = actionInfo.customData.sessionInfo.sessionId;
                operationInfo.uploadSessionId = sessionId;
                this._uploadOperationInfoMap[sessionId] = operationInfo;
                break;
            case "rename":
                actionInfo.customData.context.itemNewName = actionInfo.customData.itemNewName
        }
    }
    _onEditActionResultAcquired(actionInfo) {
        var {
            context: context,
            operationInfo: operationInfo
        } = actionInfo.customData;
        context.singleRequest = actionInfo.singleRequest;
        var details = context.itemInfos.map(itemInfo => this._getItemProgressDisplayInfo(itemInfo));
        this._notificationControl.addOperationDetails(operationInfo, details, context.actionMetadata.allowCancel)
    }
    _onEditActionError(actionInfo, errorInfo) {
        var {
            context: context,
            operationInfo: operationInfo
        } = actionInfo.customData;
        context.singleRequest = actionInfo.singleRequest;
        this._handleActionError(operationInfo, context, errorInfo);
        this._completeAction(operationInfo, context)
    }
    _onEditActionItemError(actionInfo, errorInfo) {
        var {
            context: context,
            operationInfo: operationInfo
        } = actionInfo.customData;
        this._handleActionError(operationInfo, context, errorInfo)
    }
    _onCompleteEditActionItem(actionInfo, info) {
        var {
            context: context,
            operationInfo: operationInfo
        } = actionInfo.customData;
        if (!info.result || !info.result.canceled) {
            context.completeOperationItem(info.index);
            this._notificationControl.completeOperationItem(operationInfo, info.index, context.commonProgress)
        }
    }
    _onCompleteEditAction(actionInfo) {
        var {
            context: context,
            operationInfo: operationInfo
        } = actionInfo.customData;
        this._completeAction(operationInfo, context);
        if ("upload" === actionInfo.name) {
            delete this._uploadOperationInfoMap[actionInfo.customData.sessionInfo.sessionId]
        }
    }
    _tryCreate(parentDirectories) {
        var parentDirectoryInfo = parentDirectories && parentDirectories[0] || this._getCurrentDirectory();
        var newDirName = _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-newDirectoryName");
        return this._showDialog(this._dialogManager.getCreateItemDialog(), newDirName).then(_ref5 => {
            var {
                name: name
            } = _ref5;
            return this._controller.createDirectory(parentDirectoryInfo, name)
        })
    }
    _tryRename(itemInfos) {
        var itemInfo = itemInfos && itemInfos[0] || this._model.getMultipleSelectedItems()[0];
        if (!itemInfo) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"]).reject().promise()
        }
        return this._showDialog(this._dialogManager.getRenameItemDialog(), itemInfo.fileItem.name).then(_ref6 => {
            var {
                name: name
            } = _ref6;
            return this._controller.renameItem(itemInfo, name)
        })
    }
    _tryDelete(itemInfos) {
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        if (0 === itemInfos.length) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"]).reject().promise()
        }
        var itemName = itemInfos[0].fileItem.name;
        var itemCount = itemInfos.length;
        return this._showDialog(this._dialogManager.getDeleteItemDialog(), {
            itemName: itemName,
            itemCount: itemCount
        }).then(() => this._controller.deleteItems(itemInfos))
    }
    _tryMove(itemInfos) {
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        if (0 === itemInfos.length) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"]).reject().promise()
        }
        return this._showDialog(this._dialogManager.getMoveDialog(itemInfos)).then(_ref7 => {
            var {
                folder: folder
            } = _ref7;
            return this._controller.moveItems(itemInfos, folder)
        })
    }
    _tryCopy(itemInfos) {
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        if (0 === itemInfos.length) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"]).reject().promise()
        }
        return this._showDialog(this._dialogManager.getCopyDialog(itemInfos)).then(_ref8 => {
            var {
                folder: folder
            } = _ref8;
            return this._controller.copyItems(itemInfos, folder)
        })
    }
    _tryUpload(destinationFolder) {
        this._uploadDirectoryInfo = null === destinationFolder || void 0 === destinationFolder ? void 0 : destinationFolder[0];
        this._fileUploader.tryUpload()
    }
    _download(itemInfos) {
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        if (0 === itemInfos.length) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"]).reject().promise()
        }
        return this._controller.downloadItems(itemInfos)
    }
    _getItemContent(itemInfos) {
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        return this._controller.getItemContent(itemInfos)
    }
    _completeAction(operationInfo, context) {
        this._notificationControl.completeOperation(operationInfo, context.completionMessage, !context.success, context.statusText);
        if (context.hasModifiedItems()) {
            this._raiseOnSuccess(context.onlyFiles)
        }
    }
    _handleActionError(operationInfo, context, errorInfo) {
        operationInfo.hasError = true;
        if (context.singleRequest) {
            this._handleSingleRequestActionError(operationInfo, context, errorInfo)
        } else {
            this._handleMultipleRequestActionError(operationInfo, context, errorInfo)
        }
    }
    _handleSingleRequestActionError(operationInfo, context, errorInfo) {
        var itemInfo = context.getItemForSingleRequestError();
        var itemName = context.itemNewName;
        var errorText = this._getErrorText(errorInfo, itemInfo, itemName);
        context.processSingleRequestError(errorText);
        var operationErrorInfo = this._getOperationErrorInfo(context);
        this._notificationControl.completeSingleOperationWithError(operationInfo, operationErrorInfo);
        if (context.multipleItems) {
            this._raiseOnSuccess(context.onlyFiles)
        }
    }
    _handleMultipleRequestActionError(operationInfo, context, errorInfo) {
        var itemInfo = context.getItemForMultipleRequestError(errorInfo.index);
        var errorText = this._getErrorText(errorInfo, itemInfo);
        context.processMultipleRequestError(errorInfo.index, errorText);
        var operationErrorInfo = this._getOperationErrorInfo(context);
        this._notificationControl.addOperationDetailsError(operationInfo, operationErrorInfo)
    }
    _getOperationErrorInfo(context) {
        var detailError = context.errorState.currentDetailError;
        return {
            commonErrorText: context.errorState.commonErrorText,
            item: detailError.itemInfo ? this._getItemProgressDisplayInfo(detailError.itemInfo) : null,
            itemIndex: detailError.itemIndex,
            detailErrorText: detailError.errorText
        }
    }
    _getErrorText(errorInfo, itemInfo, itemName) {
        itemName = itemName || (null === itemInfo || void 0 === itemInfo ? void 0 : itemInfo.fileItem.name);
        var errorText = errorInfo.errorText || _ui_file_manager_messages__WEBPACK_IMPORTED_MODULE_9__["FileManagerMessages"].get(errorInfo.errorCode, itemName);
        var errorArgs = {
            fileSystemItem: null === itemInfo || void 0 === itemInfo ? void 0 : itemInfo.fileItem,
            errorCode: errorInfo.errorCode,
            errorText: errorText
        };
        this._raiseOnError(errorArgs);
        return errorArgs.errorText
    }
    _getItemProgressDisplayInfo(itemInfo) {
        return {
            commonText: itemInfo.fileItem.name,
            imageUrl: this._getItemThumbnail(itemInfo)
        }
    }
    _showDialog(dialog, dialogArgument) {
        this._dialogDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"];
        dialog.show(dialogArgument);
        return this._dialogDeferred.promise()
    }
    _onDialogClosed(e) {
        var result = e.dialogResult;
        if (result) {
            this._dialogDeferred.resolve(result)
        } else {
            this._dialogDeferred.reject()
        }
    }
    updateDialogRtl(value) {
        this._dialogManager.updateDialogRtl(value)
    }
    _getItemThumbnail(item) {
        var itemThumbnailGetter = this.option("getItemThumbnail");
        if (!itemThumbnailGetter) {
            return null
        }
        var info = itemThumbnailGetter(item);
        return info ? info.thumbnail : null
    }
    _initActions() {
        this._actions = {
            onSuccess: this._createActionByOption("onSuccess"),
            onError: this._createActionByOption("onError")
        }
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            model: {
                getMultipleSelectedItems: null
            },
            notificationControl: null,
            getItemThumbnail: null,
            onSuccess: null,
            onError: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "model":
                this.repaint();
                break;
            case "notificationControl":
                this._initNotificationControl(args.value);
                break;
            case "getItemThumbnail":
                break;
            case "uploadDropZonePlaceholderContainer":
                this._fileUploader.option("dropZonePlaceholderContainer", args.value);
                break;
            case "onSuccess":
            case "onError":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    _raiseOnSuccess(updatedOnlyFiles) {
        this._actions.onSuccess({
            updatedOnlyFiles: updatedOnlyFiles
        })
    }
    _raiseOnError(args) {
        this._actions.onError(args)
    }
    _getCurrentDirectory() {
        return this._controller.getCurrentDirectory()
    }
    get uploadDirectoryInfo() {
        return this._uploadDirectoryInfo || this._getCurrentDirectory()
    }
}
class FileManagerActionContext {
    constructor(actionMetadata, itemInfos, directoryInfo) {
        this._actionMetadata = actionMetadata;
        this._itemInfos = itemInfos;
        this._onlyFiles = !this._actionMetadata.affectsAllItems && this._itemInfos.every(info => !info.fileItem.isDirectory);
        this._items = this._itemInfos.map(itemInfo => itemInfo.fileItem);
        this._multipleItems = this._items.length > 1;
        this._location = directoryInfo.getDisplayName();
        this._singleRequest = true;
        this._completedItems = [];
        this._commonProgress = 0;
        this._errorState = {
            failedCount: 0
        };
        this._itemNewName = ""
    }
    completeOperationItem(itemIndex) {
        if (this._singleRequest) {
            this._completedItems = [...this._items]
        } else {
            var item = this._items[itemIndex];
            this._completedItems.push(item)
        }
        if (!this._actionMetadata.allowItemProgress) {
            this._commonProgress = this._completedItems.length / this._items.length * 100
        }
    }
    processSingleRequestError(errorText) {
        this._errorState.failedCount = 1;
        this._errorState.commonErrorText = this._multipleItems ? this._actionMetadata.commonErrorMessage : this._actionMetadata.singleItemErrorMessage;
        var itemIndex = this._multipleItems ? -1 : 1;
        var itemInfo = this.getItemForSingleRequestError();
        this._setCurrentDetailError(itemIndex, itemInfo, errorText)
    }
    processMultipleRequestError(itemIndex, errorText) {
        this._errorState.failedCount++;
        this._errorState.commonErrorText = this._errorState.failedCount > 1 ? Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_4__["format"])(this._actionMetadata.multipleItemsErrorMessage, this._errorState.failedCount) : this._actionMetadata.singleItemErrorMessage;
        var itemInfo = this.getItemForMultipleRequestError(itemIndex);
        this._setCurrentDetailError(itemIndex, itemInfo, errorText)
    }
    hasModifiedItems() {
        return this._hasCompletedItems() || this._singleRequest && !this.success && this._multipleItems
    }
    getItemForSingleRequestError() {
        return this._multipleItems ? null : this._itemInfos[0]
    }
    getItemForMultipleRequestError(itemIndex) {
        return this._itemInfos[itemIndex]
    }
    _setCurrentDetailError(itemIndex, itemInfo, errorText) {
        this._errorState.currentDetailError = {
            itemIndex: itemIndex,
            itemInfo: itemInfo,
            errorText: errorText
        }
    }
    _hasCompletedItems() {
        return this._completedItems.length > 0
    }
    get actionMetadata() {
        return this._actionMetadata
    }
    get itemInfos() {
        return this._itemInfos
    }
    get itemNewName() {
        return this._itemNewName
    }
    set itemNewName(value) {
        this._itemNewName = value
    }
    get errorState() {
        return this._errorState
    }
    get singleRequest() {
        return this._singleRequest
    }
    set singleRequest(value) {
        this._singleRequest = value
    }
    get multipleItems() {
        return this._multipleItems
    }
    get onlyFiles() {
        return this._onlyFiles
    }
    get processingMessage() {
        return this._multipleItems ? Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_4__["format"])(this._actionMetadata.multipleItemsProcessingMessage, this._items.length, this._location) : Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_4__["format"])(this._actionMetadata.singleItemProcessingMessage, this._location)
    }
    get successMessage() {
        if (this._hasCompletedItems()) {
            return this._multipleItems ? Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_4__["format"])(this._actionMetadata.multipleItemsSuccessMessage, this._completedItems.length, this._location) : Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_4__["format"])(this._actionMetadata.singleItemSuccessMessage, this._location)
        } else {
            return this._multipleItems ? Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_4__["format"])(this._actionMetadata.multipleItemsErrorMessage, this._items.length) : this._actionMetadata.singleItemErrorMessage
        }
    }
    get completionMessage() {
        return this.success ? this.successMessage : this.errorState.commonErrorText
    }
    get statusText() {
        return this.success && !this._hasCompletedItems() ? this._actionMetadata.canceledMessage : void 0
    }
    get commonProgress() {
        return this._commonProgress
    }
    get success() {
        return !this._errorState.failedCount
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerEditingControl);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.file_actions_button.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.file_actions_button.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../button */ "./node_modules/devextreme/esm/ui/button.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.file_actions_button.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var FILE_MANAGER_FILE_ACTIONS_BUTTON = "dx-filemanager-file-actions-button";
var FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED = "dx-filemanager-file-actions-button-activated";
var ACTIVE_STATE_CLASS = "dx-state-active";
class FileManagerFileActionsButton extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_2__["default"] {
    _initMarkup() {
        this._createClickAction();
        var $button = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>");
        this.$element().append($button).addClass(FILE_MANAGER_FILE_ACTIONS_BUTTON);
        this._button = this._createComponent($button, _button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            icon: "overflow",
            stylingMode: "text",
            onClick: e => this._raiseClick(e)
        });
        super._initMarkup()
    }
    _createClickAction() {
        this._clickAction = this._createActionByOption("onClick")
    }
    _raiseClick(e) {
        this._clickAction(e)
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            cssClass: "",
            onClick: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "cssClass":
                this.repaint();
                break;
            case "onClick":
                this._createClickAction();
                break;
            default:
                super._optionChanged(args)
        }
    }
    setActive(active) {
        this.$element().toggleClass(FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED, active);
        setTimeout(() => this._button.$element().toggleClass(ACTIVE_STATE_CLASS, active))
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerFileActionsButton);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.file_uploader.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.file_uploader.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _file_uploader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../file_uploader */ "./node_modules/devextreme/esm/ui/file_uploader.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.file_uploader.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var FILE_MANAGER_FILE_UPLOADER_CLASS = "dx-filemanager-fileuploader";
var FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLER_CLASS = "dx-filemanager-fileuploader-dropzone-placeholder";
class FileManagerFileUploader extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__["default"] {
    _initMarkup() {
        this._initActions();
        this.$element().addClass(FILE_MANAGER_FILE_UPLOADER_CLASS);
        this._uploaderInfos = [];
        this._createInternalFileUploader();
        this._createDropZonePlaceholder();
        this._setDropZonePlaceholderVisible(false);
        super._initMarkup()
    }
    _createInternalFileUploader() {
        var chunkSize = this._getController().chunkSize;
        var $fileUploader = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(this.$element());
        var fileUploader = this._createComponent($fileUploader, _file_uploader__WEBPACK_IMPORTED_MODULE_7__["default"], {
            name: "file",
            multiple: true,
            showFileList: false,
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            labelText: "",
            readyToUploadMessage: "",
            accept: "*",
            chunkSize: chunkSize,
            dropZone: this.option("dropZone"),
            onValueChanged: e => this._onFileUploaderValueChanged(e),
            onProgress: e => this._onFileUploaderProgress(e),
            onUploaded: e => this._onFileUploaderUploaded(e),
            onUploadAborted: e => this._onFileUploaderUploadAborted(e),
            onUploadError: e => this._onFileUploaderUploadError(e),
            onDropZoneEnter: () => this._setDropZonePlaceholderVisible(true),
            onDropZoneLeave: () => this._setDropZonePlaceholderVisible(false)
        });
        fileUploader.option({
            uploadChunk: (file, chunksData) => this._fileUploaderUploadChunk(fileUploader, file, chunksData),
            abortUpload: (file, chunksData) => this._fileUploaderAbortUpload(fileUploader, file, chunksData)
        });
        fileUploader._shouldRaiseDragLeaveBase = fileUploader._shouldRaiseDragLeave;
        fileUploader._shouldRaiseDragLeave = e => this._shouldRaiseDragLeave(e, fileUploader);
        var uploaderInfo = {
            fileUploader: fileUploader
        };
        this._uploaderInfos.push(uploaderInfo)
    }
    tryUpload() {
        var info = this._findAndUpdateAvailableUploaderInfo();
        if (info) {
            info.fileUploader._selectButtonClickHandler()
        }
    }
    cancelUpload(sessionId) {
        this._cancelUpload(sessionId)
    }
    cancelFileUpload(sessionId, fileIndex) {
        this._cancelUpload(sessionId, fileIndex)
    }
    _cancelUpload(sessionId, fileIndex) {
        var {
            fileUploader: fileUploader
        } = this._findUploaderInfoBySessionId(sessionId);
        fileUploader.abortUpload(fileIndex)
    }
    _fileUploaderUploadChunk(fileUploader, file, chunksInfo) {
        var {
            session: session,
            fileIndex: fileIndex
        } = this._findSessionByFile(fileUploader, file);
        var controller = session.controller;
        chunksInfo.fileIndex = fileIndex;
        return controller.uploadFileChunk(file, chunksInfo)
    }
    _fileUploaderAbortUpload(fileUploader, file, chunksInfo) {
        var {
            session: session,
            fileIndex: fileIndex
        } = this._findSessionByFile(fileUploader, file);
        var controller = session.controller;
        chunksInfo.fileIndex = fileIndex;
        return controller.abortFileUpload(file, chunksInfo)
    }
    _onFileUploaderValueChanged(_ref) {
        var {
            component: component,
            value: value
        } = _ref;
        if (0 === value.length) {
            return
        }
        var files = value.slice();
        var uploaderInfo = this._findUploaderInfo(component);
        this._uploadFiles(uploaderInfo, files);
        setTimeout(() => {
            if (!this._findAndUpdateAvailableUploaderInfo()) {
                this._createInternalFileUploader()
            }
        })
    }
    _onFileUploaderProgress(_ref2) {
        var {
            component: component,
            file: file,
            bytesLoaded: bytesLoaded,
            bytesTotal: bytesTotal
        } = _ref2;
        var {
            session: session,
            fileIndex: fileIndex
        } = this._findSessionByFile(component, file);
        var fileValue = 0 !== bytesTotal ? bytesLoaded / bytesTotal : 1;
        var commonValue = component.option("progress") / 100;
        var args = {
            sessionId: session.id,
            fileIndex: fileIndex,
            commonValue: commonValue,
            fileValue: fileValue
        };
        this._raiseUploadProgress(args)
    }
    _onFileUploaderUploaded(_ref3) {
        var {
            component: component,
            file: file
        } = _ref3;
        var deferred = this._getDeferredForFile(component, file);
        deferred.resolve()
    }
    _onFileUploaderUploadAborted(_ref4) {
        var {
            component: component,
            file: file
        } = _ref4;
        var deferred = this._getDeferredForFile(component, file);
        deferred.resolve({
            canceled: true
        })
    }
    _onFileUploaderUploadError(_ref5) {
        var {
            component: component,
            file: file,
            error: error
        } = _ref5;
        var deferred = this._getDeferredForFile(component, file);
        deferred.reject(error)
    }
    _createDropZonePlaceholder() {
        this._$dropZonePlaceholder = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLER_CLASS).appendTo(this.option("dropZonePlaceholderContainer"))
    }
    _adjustDropZonePlaceholder() {
        var $dropZoneTarget = this.option("dropZone");
        if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["hasWindow"])() || 0 === $dropZoneTarget.length) {
            return
        }
        var placeholderBorderTopWidth = parseFloat(this._$dropZonePlaceholder.css("borderTopWidth"));
        var placeholderBorderLeftWidth = parseFloat(this._$dropZonePlaceholder.css("borderLeftWidth"));
        var $placeholderContainer = this.option("dropZonePlaceholderContainer");
        var containerBorderBottomWidth = parseFloat($placeholderContainer.css("borderBottomWidth"));
        var containerBorderLeftWidth = parseFloat($placeholderContainer.css("borderLeftWidth"));
        var containerHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getInnerHeight"])($placeholderContainer);
        var containerOffset = $placeholderContainer.offset();
        var dropZoneOffset = $dropZoneTarget.offset();
        this._$dropZonePlaceholder.css({
            top: dropZoneOffset.top - containerOffset.top - containerHeight - containerBorderBottomWidth,
            left: dropZoneOffset.left - containerOffset.left - containerBorderLeftWidth
        });
        Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setHeight"])(this._$dropZonePlaceholder, $dropZoneTarget.get(0).offsetHeight - 2 * placeholderBorderTopWidth);
        Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setWidth"])(this._$dropZonePlaceholder, $dropZoneTarget.get(0).offsetWidth - 2 * placeholderBorderLeftWidth)
    }
    _setDropZonePlaceholderVisible(visible) {
        if (visible) {
            this._adjustDropZonePlaceholder();
            this._$dropZonePlaceholder.css("display", "")
        } else {
            this._$dropZonePlaceholder.css("display", "none")
        }
    }
    _shouldRaiseDragLeave(e, uploaderInstance) {
        return uploaderInstance.isMouseOverElement(e, this.option("splitterElement")) || uploaderInstance._shouldRaiseDragLeaveBase(e, true)
    }
    _uploadFiles(uploaderInfo, files) {
        this._setDropZonePlaceholderVisible(false);
        var sessionId = (new _core_guid__WEBPACK_IMPORTED_MODULE_5__["default"]).toString();
        var controller = this._getController();
        var deferreds = files.map(() => new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__["Deferred"]);
        var session = {
            id: sessionId,
            controller: controller,
            files: files,
            deferreds: deferreds
        };
        uploaderInfo.session = session;
        var sessionInfo = {
            sessionId: sessionId,
            deferreds: deferreds,
            files: files
        };
        this._raiseUploadSessionStarted(sessionInfo);
        return Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_8__["whenSome"])(deferreds).always(() => setTimeout(() => {
            uploaderInfo.fileUploader.reset();
            uploaderInfo.session = null
        }))
    }
    _getDeferredForFile(fileUploader, file) {
        var {
            session: session,
            fileIndex: fileIndex
        } = this._findSessionByFile(fileUploader, file);
        return session.deferreds[fileIndex]
    }
    _findSessionByFile(fileUploader, file) {
        var uploaderInfo = this._findUploaderInfo(fileUploader);
        var session = uploaderInfo.session;
        var fileIndex = session.files.indexOf(file);
        return {
            session: session,
            fileIndex: fileIndex
        }
    }
    _findUploaderInfoBySessionId(sessionId) {
        for (var i = 0; i < this._uploaderInfos.length; i++) {
            var uploaderInfo = this._uploaderInfos[i];
            var session = uploaderInfo.session;
            if (session && session.id === sessionId) {
                return uploaderInfo
            }
        }
        return null
    }
    _findAndUpdateAvailableUploaderInfo() {
        var _info;
        var info = null;
        for (var i = 0; i < this._uploaderInfos.length; i++) {
            var currentInfo = this._uploaderInfos[i];
            currentInfo.fileUploader.option("dropZone", "");
            if (!info && !currentInfo.session) {
                info = currentInfo
            }
        }
        null === (_info = info) || void 0 === _info ? void 0 : _info.fileUploader.option("dropZone", this.option("dropZone"));
        return info
    }
    _findUploaderInfo(fileUploader) {
        for (var i = 0; i < this._uploaderInfos.length; i++) {
            var info = this._uploaderInfos[i];
            if (info.fileUploader === fileUploader) {
                return info
            }
        }
        return null
    }
    _getController() {
        var controllerGetter = this.option("getController");
        return controllerGetter()
    }
    _raiseUploadSessionStarted(sessionInfo) {
        this._actions.onUploadSessionStarted({
            sessionInfo: sessionInfo
        })
    }
    _raiseUploadProgress(args) {
        this._actions.onUploadProgress(args)
    }
    _initActions() {
        this._actions = {
            onUploadSessionStarted: this._createActionByOption("onUploadSessionStarted"),
            onUploadProgress: this._createActionByOption("onUploadProgress")
        }
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(super._getDefaultOptions(), {
            getController: null,
            onUploadSessionStarted: null,
            onUploadProgress: null,
            splitterElement: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "getController":
                this.repaint();
                break;
            case "onUploadSessionStarted":
            case "onUploadProgress":
                this._actions[name] = this._createActionByOption(name);
                break;
            case "dropZone":
                this._findAndUpdateAvailableUploaderInfo();
                this._adjustDropZonePlaceholder();
                break;
            case "dropZonePlaceholderContainer":
                this._$dropZonePlaceholder.detach();
                this._$dropZonePlaceholder.appendTo(args.value);
                break;
            case "splitterElement":
                break;
            default:
                super._optionChanged(args)
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerFileUploader);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.files_tree_view.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.files_tree_view.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _tree_view_ui_tree_view_search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tree_view/ui.tree_view.search */ "./node_modules/devextreme/esm/ui/tree_view/ui.tree_view.search.js");
/* harmony import */ var _ui_file_manager_file_actions_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.file_manager.file_actions_button */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.file_actions_button.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.files_tree_view.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var FILE_MANAGER_DIRS_TREE_CLASS = "dx-filemanager-dirs-tree";
var FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS = "dx-filemanager-focused-item";
var FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS = "dx-filemanager-dirs-tree-item-text";
var TREE_VIEW_ITEM_CLASS = "dx-treeview-item";
class FileManagerFilesTreeView extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_4__["default"] {
    _initMarkup() {
        this._initActions();
        this._getCurrentDirectory = this.option("getCurrentDirectory");
        this._createFileActionsButton = _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"];
        this._storeExpandedState = this.option("storeExpandedState") || false;
        var $treeView = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_DIRS_TREE_CLASS).appendTo(this.$element());
        var treeViewOptions = {
            dataStructure: "plain",
            rootValue: "",
            createChildren: this._onFilesTreeViewCreateSubDirectories.bind(this),
            itemTemplate: this._createFilesTreeViewItemTemplate.bind(this),
            keyExpr: "getInternalKey",
            parentIdExpr: "parentDirectory.getInternalKey",
            displayExpr: itemInfo => itemInfo.getDisplayName(),
            hasItemsExpr: "fileItem.hasSubDirectories",
            onItemClick: e => this._actions.onDirectoryClick(e),
            onItemExpanded: e => this._onFilesTreeViewItemExpanded(e),
            onItemCollapsed: e => this._onFilesTreeViewItemCollapsed(e),
            onItemRendered: e => this._onFilesTreeViewItemRendered(e),
            onContentReady: () => this._actions.onFilesTreeViewContentReady()
        };
        if (this._contextMenu) {
            this._contextMenu.option("onContextMenuHidden", () => this._onContextMenuHidden());
            treeViewOptions.onItemContextMenu = e => this._onFilesTreeViewItemContextMenu(e);
            this._createFileActionsButton = (element, options) => this._createComponent(element, _ui_file_manager_file_actions_button__WEBPACK_IMPORTED_MODULE_6__["default"], options)
        }
        this._filesTreeView = this._createComponent($treeView, _tree_view_ui_tree_view_search__WEBPACK_IMPORTED_MODULE_5__["default"], treeViewOptions)
    }
    _initActions() {
        this._actions = {
            onDirectoryClick: this._createActionByOption("onDirectoryClick"),
            onFilesTreeViewContentReady: this._createActionByOption("onFilesTreeViewContentReady")
        }
    }
    _render() {
        super._render();
        var that = this;
        setTimeout(() => {
            that._updateFocusedElement()
        })
    }
    _onFilesTreeViewCreateSubDirectories(rootItem) {
        var getDirectories = this.option("getDirectories");
        var directoryInfo = rootItem && rootItem.itemData || null;
        return getDirectories && getDirectories(directoryInfo, true)
    }
    _onFilesTreeViewItemRendered(_ref) {
        var {
            itemData: itemData
        } = _ref;
        var currentDirectory = this._getCurrentDirectory();
        if (currentDirectory && currentDirectory.fileItem.equals(itemData.fileItem)) {
            this._updateFocusedElement();
            this._restoreScrollTopPosition()
        }
    }
    _onFilesTreeViewItemExpanded(_ref2) {
        var {
            itemData: itemData
        } = _ref2;
        if (this._storeExpandedState) {
            itemData.expanded = true
        }
    }
    _onFilesTreeViewItemCollapsed(_ref3) {
        var {
            itemData: itemData
        } = _ref3;
        if (this._storeExpandedState) {
            itemData.expanded = false
        }
    }
    _createFilesTreeViewItemTemplate(itemData, itemIndex, itemElement) {
        var $itemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(itemElement);
        var $itemWrapper = $itemElement.closest(this._filesTreeViewItemSelector);
        $itemWrapper.data("item", itemData);
        var $image = Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_2__["getImageContainer"])(itemData.icon);
        var $text = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<span>").text(itemData.getDisplayName()).addClass(FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS);
        var $button = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>");
        $itemElement.append($image, $text, $button);
        this._createFileActionsButton($button, {
            onClick: e => this._onFileItemActionButtonClick(e)
        })
    }
    _onFilesTreeViewItemContextMenu(_ref4) {
        var {
            itemElement: itemElement,
            event: event
        } = _ref4;
        event.preventDefault();
        event.stopPropagation();
        var itemData = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(itemElement).data("item");
        this._contextMenu.showAt([itemData], itemElement, event, {
            itemData: itemData,
            itemElement: itemElement
        })
    }
    _onFileItemActionButtonClick(_ref5) {
        var {
            component: component,
            element: element,
            event: event
        } = _ref5;
        event.stopPropagation();
        var itemElement = component.$element().closest(this._filesTreeViewItemSelector);
        var itemData = itemElement.data("item");
        var target = {
            itemData: itemData,
            itemElement: itemElement,
            isActionButton: true
        };
        this._contextMenu.showAt([itemData], element, event, target);
        this._activeFileActionsButton = component;
        this._activeFileActionsButton.setActive(true)
    }
    _onContextMenuHidden() {
        if (this._activeFileActionsButton) {
            this._activeFileActionsButton.setActive(false)
        }
    }
    toggleNodeDisabledState(key, state) {
        var node = this._getNodeByKey(key);
        if (!node) {
            return
        }
        var items = this._filesTreeView.option("items");
        var itemIndex = items.map(item => item.getInternalKey()).indexOf(node.getInternalKey());
        if (-1 !== itemIndex) {
            this._filesTreeView.option("items[".concat(itemIndex, "].disabled"), state)
        }
    }
    _saveScrollTopPosition() {
        if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_8__["hasWindow"])()) {
            return
        }
        this._scrollTopPosition = this._filesTreeView.getScrollable().scrollTop()
    }
    _restoreScrollTopPosition() {
        if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_8__["hasWindow"])() || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isNumeric"])(this._scrollTopPosition)) {
            return
        }
        setTimeout(() => this._filesTreeView.getScrollable().scrollTo(this._scrollTopPosition))
    }
    _updateFocusedElement() {
        var directoryInfo = this._getCurrentDirectory();
        var $element = this._getItemElementByKey(null === directoryInfo || void 0 === directoryInfo ? void 0 : directoryInfo.getInternalKey());
        if (this._$focusedElement) {
            this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, false)
        }
        this._$focusedElement = $element || Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, true)
    }
    _getNodeByKey(key) {
        var _this$_filesTreeView;
        return null === (_this$_filesTreeView = this._filesTreeView) || void 0 === _this$_filesTreeView ? void 0 : _this$_filesTreeView._getNode(key)
    }
    _getPublicNode(key) {
        var _this$_filesTreeView2;
        var nodesQueue = [...null === (_this$_filesTreeView2 = this._filesTreeView) || void 0 === _this$_filesTreeView2 ? void 0 : _this$_filesTreeView2.getNodes()];
        while (nodesQueue.length) {
            var node = nodesQueue.shift();
            if (node.itemData.getInternalKey() === key) {
                return node
            } else if (node.children.length) {
                nodesQueue.push(...node.children)
            }
        }
        return
    }
    _getItemElementByKey(key) {
        var node = this._getNodeByKey(key);
        if (node) {
            var $node = this._filesTreeView._getNodeElement(node);
            if ($node) {
                return $node.children(this._filesTreeViewItemSelector)
            }
        }
        return null
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            storeExpandedState: false,
            initialFolder: null,
            contextMenu: null,
            getItems: null,
            getCurrentDirectory: null,
            onDirectoryClick: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "storeExpandedState":
                this._storeExpandedState = this.option(name);
                break;
            case "getItems":
            case "rootFolderDisplayName":
            case "initialFolder":
            case "contextMenu":
                this.repaint();
                break;
            case "getCurrentDirectory":
                this.getCurrentDirectory = this.option(name);
                break;
            case "onDirectoryClick":
            case "onFilesTreeViewContentReady":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    get _filesTreeViewItemSelector() {
        return ".".concat(TREE_VIEW_ITEM_CLASS)
    }
    get _contextMenu() {
        return this.option("contextMenu")
    }
    toggleDirectoryExpandedState(directoryInfo, state) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__["Deferred"];
        var treeViewNode = this._getPublicNode(null === directoryInfo || void 0 === directoryInfo ? void 0 : directoryInfo.getInternalKey());
        if (!treeViewNode) {
            return deferred.reject().promise()
        }
        if (treeViewNode.expanded === state || treeViewNode.itemsLoaded && !treeViewNode.itemData.fileItem.hasSubDirectories) {
            return deferred.resolve().promise()
        }
        var action = state ? "expandItem" : "collapseItem";
        return this._filesTreeView[action](directoryInfo.getInternalKey())
    }
    refresh() {
        this._$focusedElement = null;
        this._saveScrollTopPosition();
        this._filesTreeView.option("dataSource", [])
    }
    updateCurrentDirectory() {
        if (this._disposed) {
            return
        }
        this._updateFocusedElement();
        this._storeExpandedState && this._updateExpandedStateToCurrentDirectory()
    }
    _updateExpandedStateToCurrentDirectory() {
        return this.toggleDirectoryExpandedStateRecursive(this._getCurrentDirectory().parentDirectory, true)
    }
    toggleDirectoryExpandedStateRecursive(directoryInfo, state) {
        var dirLine = [];
        for (var dirInfo = directoryInfo; dirInfo; dirInfo = dirInfo.parentDirectory) {
            dirLine.unshift(dirInfo)
        }
        return this.toggleDirectoryLineExpandedState(dirLine, state)
    }
    toggleDirectoryLineExpandedState(dirLine, state) {
        if (!dirLine.length) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__["Deferred"]).resolve().promise()
        }
        return this.toggleDirectoryExpandedState(dirLine.shift(), state).then(() => this.toggleDirectoryLineExpandedState(dirLine, state))
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerFilesTreeView);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.details.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.details.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _data_grid_ui_data_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data_grid/ui.data_grid */ "./node_modules/devextreme/esm/ui/data_grid/ui.data_grid.js");
/* harmony import */ var _ui_file_manager_item_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.file_manager.item_list */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.js");
/* harmony import */ var _ui_file_manager_file_actions_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui.file_manager.file_actions_button */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.file_actions_button.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.item_list.details.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var FILE_MANAGER_DETAILS_ITEM_LIST_CLASS = "dx-filemanager-details";
var FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS = "dx-filemanager-details-item-thumbnail";
var FILE_MANAGER_DETAILS_ITEM_NAME_CLASS = "dx-filemanager-details-item-name";
var FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS = "dx-filemanager-details-item-name-wrapper";
var FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS = "dx-filemanager-details-item-is-directory";
var FILE_MANAGER_PARENT_DIRECTORY_ITEM = "dx-filemanager-parent-directory-item";
var DATA_GRID_DATA_ROW_CLASS = "dx-data-row";
var DEFAULT_COLUMN_CONFIGS = {
    thumbnail: {
        caption: "",
        calculateSortValue: "isDirectory",
        width: 36,
        alignment: "center",
        cssClass: FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS
    },
    name: {
        caption: _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-listDetailsColumnCaptionName")
    },
    dateModified: {
        caption: _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-listDetailsColumnCaptionDateModified"),
        width: 110,
        hidingPriority: 1
    },
    size: {
        caption: _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-listDetailsColumnCaptionFileSize"),
        width: 90,
        alignment: "right",
        hidingPriority: 0
    },
    isParentFolder: {
        caption: "isParentFolder",
        visible: false,
        sortIndex: 0,
        sortOrder: "asc"
    }
};
class FileManagerDetailsItemList extends _ui_file_manager_item_list__WEBPACK_IMPORTED_MODULE_6__["default"] {
    _initMarkup() {
        this._itemCount = 0;
        this._focusedItem = null;
        this._hasParentDirectoryItem = false;
        this._parentDirectoryItemKey = null;
        this._selectAllCheckBox = null;
        this._selectAllCheckBoxUpdating = false;
        this.$element().addClass(FILE_MANAGER_DETAILS_ITEM_LIST_CLASS);
        this._createFilesView();
        this._contextMenu.option("onContextMenuHidden", () => this._onContextMenuHidden());
        super._initMarkup()
    }
    _createFilesView() {
        var $filesView = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this.$element());
        var selectionMode = this._isMultipleSelectionMode() ? "multiple" : "none";
        this._filesView = this._createComponent($filesView, _data_grid_ui_data_grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
            dataSource: this._createDataSource(),
            hoverStateEnabled: true,
            selection: {
                mode: selectionMode,
                showCheckBoxesMode: this._isDesktop() ? "onClick" : "none"
            },
            selectedRowKeys: this.option("selectedItemKeys"),
            focusedRowKey: this.option("focusedItemKey"),
            focusedRowEnabled: true,
            allowColumnResizing: true,
            scrolling: {
                mode: "virtual"
            },
            sorting: {
                mode: "single",
                showSortIndexes: false
            },
            showColumnLines: false,
            showRowLines: false,
            columnHidingEnabled: false,
            columns: this._createColumns(),
            onEditorPreparing: this._onEditorPreparing.bind(this),
            onRowPrepared: this._onRowPrepared.bind(this),
            onContextMenuPreparing: this._onContextMenuPreparing.bind(this),
            onSelectionChanged: this._onFilesViewSelectionChanged.bind(this),
            onFocusedRowChanged: this._onFilesViewFocusedRowChanged.bind(this),
            onOptionChanged: this._onFilesViewOptionChanged.bind(this),
            onContentReady: () => {
                var _this$_refreshDeferre;
                return null === (_this$_refreshDeferre = this._refreshDeferred) || void 0 === _this$_refreshDeferre ? void 0 : _this$_refreshDeferre.resolve()
            }
        })
    }
    _createColumns() {
        var columns = this.option("detailColumns");
        columns = columns.slice(0);
        columns = columns.map(column => {
            var extendedItem = column;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isString"])(column)) {
                extendedItem = {
                    dataField: column
                }
            }
            return this._getPreparedColumn(extendedItem)
        });
        var customizeDetailColumns = this.option("customizeDetailColumns");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(customizeDetailColumns)) {
            columns = customizeDetailColumns(columns)
        }
        columns.push(this._getPreparedColumn({
            dataField: "isParentFolder"
        }));
        columns.forEach(column => this._updateColumnDataField(column));
        return columns
    }
    _getPreparedColumn(columnOptions) {
        var result = {};
        var resultCssClass = "";
        if (this._isDefaultColumn(columnOptions.dataField)) {
            var defaultConfig = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, DEFAULT_COLUMN_CONFIGS[columnOptions.dataField]);
            resultCssClass = defaultConfig.cssClass || "";
            switch (columnOptions.dataField) {
                case "thumbnail":
                    defaultConfig.cellTemplate = this._createThumbnailColumnCell.bind(this);
                    defaultConfig.calculateSortValue = "fileItem.".concat(defaultConfig.calculateSortValue);
                    break;
                case "name":
                    defaultConfig.cellTemplate = this._createNameColumnCell.bind(this);
                    defaultConfig.caption = _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-listDetailsColumnCaptionName");
                    break;
                case "size":
                    defaultConfig.calculateCellValue = this._calculateSizeColumnCellValue.bind(this);
                    defaultConfig.caption = _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-listDetailsColumnCaptionFileSize");
                    defaultConfig.calculateSortValue = rowData => rowData.fileItem.isDirectory ? -1 : rowData.fileItem.size;
                    break;
                case "dateModified":
                    defaultConfig.caption = _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-listDetailsColumnCaptionDateModified")
            }
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, result, defaultConfig)
        }
        Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_2__["extendAttributes"])(result, columnOptions, ["alignment", "caption", "dataField", "dataType", "hidingPriority", "sortIndex", "sortOrder", "visible", "visibleIndex", "width"]);
        if (columnOptions.cssClass) {
            resultCssClass = "".concat(resultCssClass, " ").concat(columnOptions.cssClass)
        }
        if (resultCssClass) {
            result.cssClass = resultCssClass
        }
        return result
    }
    _updateColumnDataField(column) {
        var dataItemSuffix = this._isDefaultColumn(column.dataField) ? "" : "dataItem.";
        column.dataField = "fileItem." + dataItemSuffix + column.dataField;
        return column
    }
    _isDefaultColumn(columnDataField) {
        return !!DEFAULT_COLUMN_CONFIGS[columnDataField]
    }
    _onFileItemActionButtonClick(_ref) {
        var {
            component: component,
            element: element,
            event: event
        } = _ref;
        event.stopPropagation();
        var $row = component.$element().closest(this._getItemSelector());
        var fileItemInfo = $row.data("item");
        this._selectItem(fileItemInfo);
        var target = {
            itemData: fileItemInfo,
            itemElement: $row,
            isActionButton: true
        };
        var items = this._getFileItemsForContextMenu(fileItemInfo);
        this._showContextMenu(items, element, event, target);
        this._activeFileActionsButton = component;
        this._activeFileActionsButton.setActive(true)
    }
    _onContextMenuHidden() {
        if (this._activeFileActionsButton) {
            this._activeFileActionsButton.setActive(false)
        }
    }
    _getItemThumbnailCssClass() {
        return FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS
    }
    _getItemSelector() {
        return ".".concat(DATA_GRID_DATA_ROW_CLASS)
    }
    _onItemDblClick(e) {
        var $row = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.currentTarget);
        var fileItemInfo = $row.data("item");
        this._raiseSelectedItemOpened(fileItemInfo)
    }
    _isAllItemsSelected() {
        var selectableItemsCount = this._hasParentDirectoryItem ? this._itemCount - 1 : this._itemCount;
        var selectedRowKeys = this._filesView.option("selectedRowKeys");
        if (!selectedRowKeys.length) {
            return false
        }
        return selectedRowKeys.length >= selectableItemsCount ? true : void 0
    }
    _onEditorPreparing(_ref2) {
        var {
            component: component,
            command: command,
            row: row,
            parentType: parentType,
            editorOptions: editorOptions
        } = _ref2;
        if (!this._filesView) {
            this._filesView = component
        }
        if ("select" === command && row) {
            if (this._isParentDirectoryItem(row.data)) {
                editorOptions.disabled = true
            }
        } else if ("headerRow" === parentType) {
            editorOptions.onInitialized = _ref3 => {
                var {
                    component: component
                } = _ref3;
                this._selectAllCheckBox = component
            };
            editorOptions.value = this._isAllItemsSelected();
            editorOptions.onValueChanged = args => this._onSelectAllCheckBoxValueChanged(args)
        }
    }
    _onSelectAllCheckBoxValueChanged(_ref4) {
        var {
            event: event,
            previousValue: previousValue,
            value: value
        } = _ref4;
        if (!event) {
            if (previousValue && !this._selectAllCheckBoxUpdating && this._selectAllCheckBox) {
                this._selectAllCheckBox.option("value", previousValue)
            }
            return
        }
        if (this._isAllItemsSelected() === value) {
            return
        }
        if (value) {
            this._filesView.selectAll()
        } else {
            this._filesView.deselectAll()
        }
        event.preventDefault()
    }
    _onRowPrepared(_ref5) {
        var {
            rowType: rowType,
            rowElement: rowElement,
            data: data
        } = _ref5;
        if ("data" === rowType) {
            var $row = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(rowElement);
            $row.data("item", data);
            if (this._isParentDirectoryItem(data)) {
                $row.addClass(FILE_MANAGER_PARENT_DIRECTORY_ITEM)
            }
        }
    }
    _onContextMenuPreparing(e) {
        if (!this._isDesktop()) {
            return
        }
        var fileItems = null;
        var item = {};
        if (e.row && "data" === e.row.rowType) {
            item = e.row.data;
            this._selectItem(item);
            fileItems = this._getFileItemsForContextMenu(item)
        }
        var eventArgs = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, {
            targetElement: "content" === e.target && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(e.row) ? this._filesView.getRowElement(e.rowIndex) : void 0,
            itemData: item,
            options: this._contextMenu.option(),
            event: e.event,
            isActionButton: false,
            cancel: false
        });
        this._raiseContextMenuShowing(eventArgs);
        e.items = eventArgs.cancel ? [] : this._contextMenu.createContextMenuItems(fileItems, null, item)
    }
    _onFilesViewSelectionChanged(_ref6) {
        var {
            component: component,
            selectedRowsData: selectedRowsData,
            selectedRowKeys: selectedRowKeys,
            currentSelectedRowKeys: currentSelectedRowKeys,
            currentDeselectedRowKeys: currentDeselectedRowKeys
        } = _ref6;
        this._filesView = this._filesView || component;
        if (this._selectAllCheckBox) {
            this._selectAllCheckBoxUpdating = true;
            this._selectAllCheckBox.option("value", this._isAllItemsSelected());
            this._selectAllCheckBoxUpdating = false
        }
        var selectedItems = selectedRowsData.map(itemInfo => itemInfo.fileItem);
        this._tryRaiseSelectionChanged({
            selectedItemInfos: selectedRowsData,
            selectedItems: selectedItems,
            selectedItemKeys: selectedRowKeys,
            currentSelectedItemKeys: currentSelectedRowKeys,
            currentDeselectedItemKeys: currentDeselectedRowKeys
        })
    }
    _onFilesViewFocusedRowChanged(e) {
        var _e$row2;
        if (!this._isMultipleSelectionMode()) {
            var _e$row;
            this._selectItemSingleSelection(null === (_e$row = e.row) || void 0 === _e$row ? void 0 : _e$row.data)
        }
        var fileSystemItem = (null === (_e$row2 = e.row) || void 0 === _e$row2 ? void 0 : _e$row2.data.fileItem) || null;
        this._onFocusedItemChanged({
            item: fileSystemItem,
            itemKey: null === fileSystemItem || void 0 === fileSystemItem ? void 0 : fileSystemItem.key,
            itemElement: e.rowElement
        })
    }
    _onFilesViewOptionChanged(_ref7) {
        var {
            fullName: fullName
        } = _ref7;
        if (fullName.indexOf("sortOrder") > -1) {
            this._filesView.columnOption("isParentFolder", {
                sortOrder: "asc",
                sortIndex: 0
            })
        }
    }
    _resetFocus() {
        this._setFocusedItemKey(void 0)
    }
    _createThumbnailColumnCell(container, cellInfo) {
        this._getItemThumbnailContainer(cellInfo.data).appendTo(container)
    }
    _createNameColumnCell(container, cellInfo) {
        var $button = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>");
        var $name = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<span>").text(cellInfo.data.fileItem.name).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_CLASS);
        var $wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").append($name, $button).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS);
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(container).append($wrapper);
        this._createComponent($button, _ui_file_manager_file_actions_button__WEBPACK_IMPORTED_MODULE_7__["default"], {
            onClick: e => this._onFileItemActionButtonClick(e)
        })
    }
    _calculateSizeColumnCellValue(rowData) {
        return rowData.fileItem.isDirectory ? "" : Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_2__["getDisplayFileSize"])(rowData.fileItem.size)
    }
    _selectItem(fileItemInfo) {
        var selectItemFunc = this._isMultipleSelectionMode() ? this._selectItemMultipleSelection : this._selectItemSingleSelection;
        selectItemFunc.call(this, fileItemInfo)
    }
    _deselectItem(item) {
        this._filesView.deselectRows([item.fileItem.key])
    }
    _selectItemSingleSelection(fileItemInfo) {
        if (!this._focusedItem || !fileItemInfo || this._focusedItem.fileItem.key !== fileItemInfo.fileItem.key) {
            var oldFocusedItem = this._focusedItem;
            this._focusedItem = fileItemInfo;
            var deselectedKeys = [];
            if (oldFocusedItem) {
                deselectedKeys.push(oldFocusedItem.fileItem.key)
            }
            var selectedItems = [];
            var selectedKeys = [];
            if (fileItemInfo && !this._isParentDirectoryItem(fileItemInfo)) {
                selectedItems.push(fileItemInfo.fileItem);
                selectedKeys.push(fileItemInfo.fileItem.key)
            }
            this._raiseSelectionChanged({
                selectedItems: selectedItems,
                selectedItemKeys: selectedKeys,
                currentSelectedItemKeys: [...selectedKeys],
                currentDeselectedItemKeys: deselectedKeys
            })
        }
    }
    _selectItemMultipleSelection(_ref8) {
        var {
            fileItem: fileItem
        } = _ref8;
        if (!this._filesView.isRowSelected(fileItem.key)) {
            var selectionController = this._filesView.getController("selection");
            var preserve = selectionController.isSelectionWithCheckboxes();
            this._filesView.selectRows([fileItem.key], preserve)
        }
    }
    _setSelectedItemKeys(itemKeys) {
        this._filesView.option("selectedRowKeys", itemKeys)
    }
    _setFocusedItemKey(itemKey) {
        var _this$_filesView;
        null === (_this$_filesView = this._filesView) || void 0 === _this$_filesView ? void 0 : _this$_filesView.option("focusedRowKey", itemKey)
    }
    clearSelection() {
        if (this._isMultipleSelectionMode()) {
            this._filesView.clearSelection()
        } else {
            this._filesView.option("focusedRowIndex", -1)
        }
    }
    refresh(options) {
        var actualOptions = {
            dataSource: this._createDataSource()
        };
        if (options && Object.prototype.hasOwnProperty.call(options, "focusedItemKey")) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(options.focusedItemKey)) {
                actualOptions.focusedRowKey = options.focusedItemKey
            } else {
                actualOptions.focusedRowIndex = -1
            }
        }
        this._filesView.option(actualOptions);
        this._refreshDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
        return this._refreshDeferred.promise()
    }
    getSelectedItems() {
        if (this._isMultipleSelectionMode()) {
            return this._filesView.getSelectedRowsData()
        }
        return this._focusedItem && !this._isParentDirectoryItem(this._focusedItem) ? [this._focusedItem] : []
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerDetailsItemList);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _events_double_click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/double_click */ "./node_modules/devextreme/esm/events/double_click.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _data_custom_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../data/custom_store */ "./node_modules/devextreme/esm/data/custom_store.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.item_list.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var FILE_MANAGER_FILES_VIEW_CLASS = "dx-filemanager-files-view";
var FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE = "dxFileManager_open";
class FileManagerItemListBase extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_8__["default"] {
    _init() {
        this._initActions();
        this._lockFocusedItemProcessing = false;
        this._focusedItemKey = this.option("focusedItemKey");
        super._init()
    }
    _initMarkup() {
        this.$element().addClass(FILE_MANAGER_FILES_VIEW_CLASS);
        var dblClickEventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_3__["addNamespace"])(_events_double_click__WEBPACK_IMPORTED_MODULE_2__["name"], FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(this.$element(), dblClickEventName, this._getItemSelector(), this._onItemDblClick.bind(this));
        super._initMarkup()
    }
    _initActions() {
        this._actions = {
            onError: this._createActionByOption("onError"),
            onSelectionChanged: this._createActionByOption("onSelectionChanged"),
            onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged"),
            onSelectedItemOpened: this._createActionByOption("onSelectedItemOpened"),
            onContextMenuShowing: this._createActionByOption("onContextMenuShowing")
        }
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(super._getDefaultOptions(), {
            selectionMode: "single",
            selectedItemKeys: [],
            focusedItemKey: void 0,
            contextMenu: null,
            getItems: null,
            getItemThumbnail: null,
            onError: null,
            onSelectionChanged: null,
            onFocusedItemChanged: null,
            onSelectedItemOpened: null,
            onContextMenuShowing: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "selectionMode":
            case "contextMenu":
            case "getItems":
            case "getItemThumbnail":
                this.repaint();
                break;
            case "selectedItemKeys":
                this._setSelectedItemKeys(args.value);
                break;
            case "focusedItemKey":
                if (!this._lockFocusedItemProcessing) {
                    this._setFocusedItemKey(args.value)
                }
                break;
            case "onError":
            case "onSelectedItemOpened":
            case "onSelectionChanged":
            case "onFocusedItemChanged":
            case "onContextMenuShowing":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    _getItems() {
        return this._getItemsInternal().done(itemInfos => {
            this._itemCount = itemInfos.length;
            if (0 === this._itemCount) {
                this._resetFocus()
            }
            var parentDirectoryItem = this._findParentDirectoryItem(itemInfos);
            this._hasParentDirectoryItem = !!parentDirectoryItem;
            this._parentDirectoryItemKey = parentDirectoryItem ? parentDirectoryItem.fileItem.key : null
        })
    }
    _getItemsInternal() {
        var itemsGetter = this.option("getItems");
        var itemsResult = itemsGetter ? itemsGetter() : [];
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__["when"])(itemsResult)
    }
    _raiseOnError(error) {
        this._actions.onError({
            error: error
        })
    }
    _raiseSelectionChanged(args) {
        this._actions.onSelectionChanged(args)
    }
    _raiseFocusedItemChanged(args) {
        this._actions.onFocusedItemChanged(args)
    }
    _raiseSelectedItemOpened(fileItemInfo) {
        this._actions.onSelectedItemOpened({
            fileItemInfo: fileItemInfo
        })
    }
    _raiseContextMenuShowing(e) {
        this._actions.onContextMenuShowing(e)
    }
    _tryRaiseSelectionChanged(_ref) {
        var {
            selectedItemInfos: selectedItemInfos,
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            currentSelectedItemKeys: currentSelectedItemKeys,
            currentDeselectedItemKeys: currentDeselectedItemKeys
        } = _ref;
        var parentDirectoryItem = this._findParentDirectoryItem(this.getSelectedItems());
        if (parentDirectoryItem) {
            this._deselectItem(parentDirectoryItem)
        }
        var raiseEvent = !this._hasParentDirectoryItem;
        raiseEvent = raiseEvent || this._hasValidKeys(currentSelectedItemKeys) || this._hasValidKeys(currentDeselectedItemKeys);
        if (raiseEvent) {
            selectedItemInfos = this._filterOutItemByPredicate(selectedItemInfos, item => item.fileItem.key === this._parentDirectoryItemKey);
            selectedItems = this._filterOutParentDirectory(selectedItems);
            selectedItemKeys = this._filterOutParentDirectoryKey(selectedItemKeys, true);
            currentSelectedItemKeys = this._filterOutParentDirectoryKey(currentSelectedItemKeys, true);
            currentDeselectedItemKeys = this._filterOutParentDirectoryKey(currentDeselectedItemKeys, true);
            this._raiseSelectionChanged({
                selectedItemInfos: selectedItemInfos,
                selectedItems: selectedItems,
                selectedItemKeys: selectedItemKeys,
                currentSelectedItemKeys: currentSelectedItemKeys,
                currentDeselectedItemKeys: currentDeselectedItemKeys
            })
        }
    }
    _onFocusedItemChanged(args) {
        if (this._focusedItemKey === args.itemKey) {
            return
        }
        this._focusedItemKey = args.itemKey;
        this._lockFocusedItemProcessing = true;
        this.option("focusedItemKey", args.itemKey);
        this._lockFocusedItemProcessing = false;
        this._raiseFocusedItemChanged(args)
    }
    _resetFocus() {}
    _getItemThumbnail(fileInfo) {
        var itemThumbnailGetter = this.option("getItemThumbnail");
        return itemThumbnailGetter ? itemThumbnailGetter(fileInfo) : {
            thumbnail: ""
        }
    }
    _getItemThumbnailContainer(fileInfo) {
        var {
            thumbnail: thumbnail,
            cssClass: cssClass
        } = this._getItemThumbnail(fileInfo);
        var $itemThumbnail = Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_5__["getImageContainer"])(thumbnail).addClass(this._getItemThumbnailCssClass());
        if (cssClass) {
            $itemThumbnail.addClass(cssClass)
        }
        return $itemThumbnail
    }
    _getItemThumbnailCssClass() {
        return ""
    }
    _getItemSelector() {}
    _onItemDblClick(e) {}
    _isDesktop() {
        return "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_6__["default"].real().deviceType
    }
    _showContextMenu(items, element, event, target) {
        this._contextMenu.showAt(items, element, event, target)
    }
    get _contextMenu() {
        return this.option("contextMenu")
    }
    _findParentDirectoryItem(itemInfos) {
        for (var i = 0; i < itemInfos.length; i++) {
            var itemInfo = itemInfos[i];
            if (this._isParentDirectoryItem(itemInfo)) {
                return itemInfo
            }
        }
        return null
    }
    _getFileItemsForContextMenu(fileItem) {
        var result = this.getSelectedItems();
        if (this._isParentDirectoryItem(fileItem)) {
            result.push(fileItem)
        }
        return result
    }
    _isParentDirectoryItem(itemInfo) {
        return itemInfo.fileItem.isParentFolder
    }
    _hasValidKeys(keys) {
        return keys.length > 1 || 1 === keys.length && keys[0] !== this._parentDirectoryItemKey
    }
    _filterOutParentDirectory(array, createNewArray) {
        return this._filterOutItemByPredicate(array, item => item.key === this._parentDirectoryItemKey, createNewArray)
    }
    _filterOutParentDirectoryKey(array, createNewArray) {
        return this._filterOutItemByPredicate(array, key => key === this._parentDirectoryItemKey, createNewArray)
    }
    _filterOutItemByPredicate(array, predicate, createNewArray) {
        var result = array;
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                index = i;
                break
            }
        }
        if (-1 !== index) {
            if (createNewArray) {
                result = [...array]
            }
            result.splice(index, 1)
        }
        return result
    }
    _isMultipleSelectionMode() {
        return "multiple" === this.option("selectionMode")
    }
    _deselectItem(item) {}
    _setSelectedItemKeys(itemKeys) {}
    _setFocusedItemKey(itemKey) {}
    _createDataSource() {
        return {
            store: new _data_custom_store__WEBPACK_IMPORTED_MODULE_7__["default"]({
                key: "fileItem.key",
                load: this._getItems.bind(this)
            })
        }
    }
    getSelectedItems() {}
    clearSelection() {}
    selectItem() {}
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerItemListBase);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.thumbnails.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.thumbnails.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_contextmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../events/contextmenu */ "./node_modules/devextreme/esm/events/contextmenu.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _ui_file_manager_items_list_thumbnails_list_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui.file_manager.items_list.thumbnails.list_box */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.items_list.thumbnails.list_box.js");
/* harmony import */ var _ui_file_manager_item_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui.file_manager.item_list */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.item_list.thumbnails.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS = "dx-filemanager-thumbnails";
var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = "dx-filemanager-thumbnails-item";
var FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS = "dx-filemanager-thumbnails-item-thumbnail";
var FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE = "dxFileManager_thumbnails";
class FileManagerThumbnailsItemList extends _ui_file_manager_item_list__WEBPACK_IMPORTED_MODULE_9__["default"] {
    _initMarkup() {
        super._initMarkup();
        this.$element().addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS);
        var contextMenuEvent = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["addNamespace"])(_events_contextmenu__WEBPACK_IMPORTED_MODULE_5__["name"], FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(this.$element(), contextMenuEvent, this._onContextMenu.bind(this));
        this._createItemList()
    }
    _createItemList() {
        var selectionMode = this._isMultipleSelectionMode() ? "multiple" : "single";
        var $itemListContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this.$element());
        this._itemList = this._createComponent($itemListContainer, _ui_file_manager_items_list_thumbnails_list_box__WEBPACK_IMPORTED_MODULE_8__["default"], {
            dataSource: this._createDataSource(),
            selectionMode: selectionMode,
            selectedItemKeys: this.option("selectedItemKeys"),
            focusedItemKey: this.option("focusedItemKey"),
            activeStateEnabled: true,
            hoverStateEnabled: true,
            loopItemFocus: false,
            focusStateEnabled: true,
            onItemEnterKeyPressed: this._tryOpen.bind(this),
            itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
            getTooltipText: this._getTooltipText.bind(this),
            onSelectionChanged: this._onItemListSelectionChanged.bind(this),
            onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this),
            onContentReady: () => {
                var _this$_refreshDeferre;
                return null === (_this$_refreshDeferre = this._refreshDeferred) || void 0 === _this$_refreshDeferre ? void 0 : _this$_refreshDeferre.resolve()
            }
        })
    }
    _onContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this._isDesktop()) {
            return
        }
        var items = null;
        var targetItemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target).closest(this._getItemSelector());
        var targetItem = null;
        if (targetItemElement.length > 0) {
            targetItem = this._itemList.getItemByItemElement(targetItemElement);
            this._itemList.selectItem(targetItem);
            items = this._getFileItemsForContextMenu(targetItem)
        }
        var target = {
            itemData: targetItem,
            itemElement: targetItemElement.length ? targetItemElement : void 0
        };
        this._showContextMenu(items, e.target, e, target)
    }
    _getItemThumbnailCssClass() {
        return FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS
    }
    _getItemSelector() {
        return ".".concat(FILE_MANAGER_THUMBNAILS_ITEM_CLASS)
    }
    _getTooltipText(fileItemInfo) {
        var item = fileItemInfo.fileItem;
        if (item.tooltipText) {
            return item.tooltipText
        }
        var text = "".concat(item.name, "\r\n");
        if (!item.isDirectory) {
            text += "".concat(_localization_message__WEBPACK_IMPORTED_MODULE_7__["default"].format("dxFileManager-listThumbnailsTooltipTextSize"), ": ").concat(Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__["getDisplayFileSize"])(item.size), "\r\n")
        }
        text += "".concat(_localization_message__WEBPACK_IMPORTED_MODULE_7__["default"].format("dxFileManager-listThumbnailsTooltipTextDateModified"), ": ").concat(item.dateModified);
        return text
    }
    _onItemDblClick(e) {
        var $item = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.currentTarget);
        var item = this._itemList.getItemByItemElement($item);
        this._tryOpen(item)
    }
    _tryOpen(item) {
        if (item) {
            this._raiseSelectedItemOpened(item)
        }
    }
    _getItemsInternal() {
        return super._getItemsInternal().then(items => {
            var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"];
            setTimeout(() => deferred.resolve(items));
            return deferred.promise()
        })
    }
    _disableDragging() {
        return false
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            focusStateEnabled: true
        })
    }
    _onItemListSelectionChanged(_ref) {
        var {
            addedItemKeys: addedItemKeys,
            removedItemKeys: removedItemKeys
        } = _ref;
        var selectedItemInfos = this.getSelectedItems();
        var selectedItems = selectedItemInfos.map(itemInfo => itemInfo.fileItem);
        var selectedItemKeys = selectedItems.map(item => item.key);
        this._tryRaiseSelectionChanged({
            selectedItemInfos: selectedItemInfos,
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            currentSelectedItemKeys: addedItemKeys,
            currentDeselectedItemKeys: removedItemKeys
        })
    }
    _onItemListFocusedItemChanged(_ref2) {
        var {
            item: item,
            itemElement: itemElement
        } = _ref2;
        if (!this._isMultipleSelectionMode()) {
            this._selectItemSingleSelection(item)
        }
        var fileSystemItem = (null === item || void 0 === item ? void 0 : item.fileItem) || null;
        this._onFocusedItemChanged({
            item: fileSystemItem,
            itemKey: null === fileSystemItem || void 0 === fileSystemItem ? void 0 : fileSystemItem.key,
            itemElement: itemElement || void 0
        })
    }
    _setSelectedItemKeys(itemKeys) {
        this._itemList.option("selectedItemKeys", itemKeys)
    }
    _setFocusedItemKey(itemKey) {
        this._itemList.option("focusedItemKey", itemKey)
    }
    refresh(options) {
        var actualOptions = {
            dataSource: this._createDataSource()
        };
        if (options && Object.prototype.hasOwnProperty.call(options, "focusedItemKey")) {
            actualOptions.focusedItemKey = options.focusedItemKey
        }
        if (options && Object.prototype.hasOwnProperty.call(options, "selectedItemKeys")) {
            actualOptions.selectedItemKeys = options.selectedItemKeys
        }
        this._itemList.option(actualOptions);
        this._refreshDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_2__["Deferred"];
        return this._refreshDeferred.promise()
    }
    _deselectItem(item) {
        var itemElement = this._itemList.getItemElementByItem(item);
        this._itemList.unselectItem(itemElement)
    }
    _selectItemSingleSelection(item) {
        if (item) {
            this._itemList.selectItem(item)
        } else {
            this._itemList.clearSelection()
        }
    }
    clearSelection() {
        this._itemList.clearSelection()
    }
    getSelectedItems() {
        return this._itemList.getSelectedItems()
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerThumbnailsItemList);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.items_list.thumbnails.list_box.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.items_list.thumbnails.list_box.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _events_hold__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../events/hold */ "./node_modules/devextreme/esm/events/hold.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/templates/bindable_template */ "./node_modules/devextreme/esm/core/templates/bindable_template.js");
/* harmony import */ var _scroll_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../scroll_view */ "./node_modules/devextreme/esm/ui/scroll_view.js");
/* harmony import */ var _collection_ui_collection_widget_edit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../collection/ui.collection_widget.edit */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.js");
/* harmony import */ var _selection_selection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../selection/selection */ "./node_modules/devextreme/esm/ui/selection/selection.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.items_list.thumbnails.list_box.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */













var FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS = "dx-filemanager-thumbnails-view-port";
var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS = "dx-filemanager-thumbnails-container";
var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = "dx-filemanager-thumbnails-item";
var FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS = "dx-filemanager-thumbnails-item-name";
var FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS = "dx-filemanager-thumbnails-item-spacer";
var FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY = "dxFileManagerItemData";
var FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE = "dxFileManagerThumbnailsListBox";
var FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_7__["addNamespace"])(_events_hold__WEBPACK_IMPORTED_MODULE_6__["default"].name, FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE);
class FileManagerThumbnailListBox extends _collection_ui_collection_widget_edit__WEBPACK_IMPORTED_MODULE_11__["default"] {
    _initMarkup() {
        this._initActions();
        this._lockFocusedItemProcessing = false;
        this.$element().addClass(FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS);
        this._renderScrollView();
        this._renderItemsContainer();
        this._createScrollViewControl();
        super._initMarkup();
        this.onFocusedItemChanged = this._onFocusedItemChanged.bind(this);
        this._layoutUtils = new ListBoxLayoutUtils(this._scrollView, this.$element(), this._$itemContainer, this.itemElements().first());
        this._syncFocusedItemKey()
    }
    _initActions() {
        this._actions = {
            onItemEnterKeyPressed: this._createActionByOption("onItemEnterKeyPressed"),
            onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged")
        }
    }
    _initTemplates() {
        super._initTemplates();
        this._itemThumbnailTemplate = this.option("itemThumbnailTemplate");
        this._getTooltipText = this.option("getTooltipText");
        this._templateManager.addDefaultTemplates({
            item: new _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_9__["BindableTemplate"](function($container, data, itemModel) {
                var $itemElement = this._getDefaultItemTemplate(itemModel, $container);
                $container.append($itemElement)
            }.bind(this), ["fileItem"], this.option("integrationOptions.watchMethod"))
        })
    }
    _createScrollViewControl() {
        if (!this._scrollView) {
            this._scrollView = this._createComponent(this._$scrollView, _scroll_view__WEBPACK_IMPORTED_MODULE_10__["default"], {
                scrollByContent: true,
                scrollByThumb: true,
                useKeyboard: false,
                showScrollbar: "onHover"
            })
        }
    }
    _renderScrollView() {
        if (!this._$scrollView) {
            this._$scrollView = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(this.$element())
        }
    }
    _renderItemsContainer() {
        if (!this._$itemContainer) {
            this._$itemContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS).appendTo(this._$scrollView)
        }
    }
    _render() {
        super._render();
        this._detachEventHandlers();
        this._attachEventHandlers()
    }
    _clean() {
        this._detachEventHandlers();
        super._clean()
    }
    _supportedKeys() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(super._supportedKeys(), {
            upArrow(e) {
                this._beforeKeyProcessing(e);
                this._processArrowKeys(-1, false, e)
            },
            downArrow(e) {
                this._beforeKeyProcessing(e);
                this._processArrowKeys(1, false, e)
            },
            home(e) {
                this._beforeKeyProcessing(e);
                this._processHomeEndKeys(0, true, e)
            },
            end(e) {
                this._beforeKeyProcessing(e);
                this._processHomeEndKeys(this._getItemsLength() - 1, true, e)
            },
            pageUp(e) {
                this._beforeKeyProcessing(e);
                this._processPageChange(true, e)
            },
            pageDown(e) {
                this._beforeKeyProcessing(e);
                this._processPageChange(false, e)
            },
            enter(e) {
                this._beforeKeyProcessing(e);
                this._actions.onItemEnterKeyPressed(this._getFocusedItem())
            },
            A(e) {
                this._beforeKeyProcessing(e);
                if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_7__["isCommandKeyPressed"])(e)) {
                    this.selectAll()
                }
            }
        })
    }
    _beforeKeyProcessing(e) {
        e.preventDefault();
        this._layoutUtils.reset()
    }
    _processArrowKeys(offset, horizontal, eventArgs) {
        var item = this._getFocusedItem();
        if (item) {
            if (!horizontal) {
                var layout = this._layoutUtils.getLayoutModel();
                if (!layout) {
                    return
                }
                offset *= layout.itemPerRowCount
            }
            var newItemIndex = this._getIndexByItem(item) + offset;
            this._focusItemByIndex(newItemIndex, true, eventArgs)
        }
    }
    _processHomeEndKeys(index, scrollToItem, eventArgs) {
        this._focusItemByIndex(index, scrollToItem, eventArgs)
    }
    _processPageChange(pageUp, eventArgs) {
        var item = this._getFocusedItem();
        if (!item) {
            return
        }
        var layout = this._layoutUtils.getLayoutModel();
        if (!layout) {
            return
        }
        var itemLayout = this._layoutUtils.createItemLayoutModel(this._getIndexByItem(item));
        var rowOffset = pageUp ? layout.rowPerPageRate : -layout.rowPerPageRate;
        var newRowRate = itemLayout.itemRowIndex - rowOffset;
        var roundFunc = pageUp ? Math.ceil : Math.floor;
        var newRowIndex = roundFunc(newRowRate);
        var newItemIndex = newRowIndex * layout.itemPerRowCount + itemLayout.itemColumnIndex;
        if (newItemIndex < 0) {
            newItemIndex = 0
        } else if (newItemIndex >= this._getItemsLength()) {
            newItemIndex = this._getItemsLength() - 1
        }
        this._focusItemByIndex(newItemIndex, true, eventArgs)
    }
    _processLongTap(e) {
        var $targetItem = this._closestItemElement(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target));
        var itemIndex = this._getIndexByItemElement($targetItem);
        this._selection.changeItemSelection(itemIndex, {
            control: true
        })
    }
    _attachEventHandlers() {
        if ("multiple" === this.option("selectionMode")) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__["default"].on(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME, ".".concat(this._itemContentClass()), e => {
                this._processLongTap(e);
                e.stopPropagation()
            })
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__["default"].on(this._itemContainer(), "mousedown selectstart", e => {
            if (e.shiftKey) {
                e.preventDefault()
            }
        })
    }
    _detachEventHandlers() {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__["default"].off(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__["default"].off(this._itemContainer(), "mousedown selectstart")
    }
    _itemContainer() {
        return this._$itemContainer
    }
    _itemClass() {
        return FILE_MANAGER_THUMBNAILS_ITEM_CLASS
    }
    _itemDataKey() {
        return FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY
    }
    _getDefaultItemTemplate(fileItemInfo, $itemElement) {
        $itemElement.attr("title", this._getTooltipText(fileItemInfo));
        var $itemThumbnail = this._itemThumbnailTemplate(fileItemInfo);
        var $itemSpacer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS);
        var $itemName = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS).text(fileItemInfo.fileItem.name);
        $itemElement.append($itemThumbnail, $itemSpacer, $itemName)
    }
    _itemSelectHandler(e) {
        var options = {};
        if ("multiple" === this.option("selectionMode")) {
            if (!this._isPreserveSelectionMode) {
                this._isPreserveSelectionMode = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_7__["isCommandKeyPressed"])(e) || e.shiftKey
            }
            options = {
                control: this._isPreserveSelectionMode,
                shift: e.shiftKey
            }
        }
        var index = this._getIndexByItemElement(e.currentTarget);
        this._selection.changeItemSelection(index, options)
    }
    _initSelectionModule() {
        super._initSelectionModule();
        var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(this._selection.options, {
            selectedKeys: this.option("selectedItemKeys"),
            onSelectionChanged: args => {
                this.option("selectedItems", this._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
                this._updateSelectedItems(args)
            }
        });
        this._selection = new _selection_selection__WEBPACK_IMPORTED_MODULE_12__["default"](options)
    }
    _updateSelectedItems(args) {
        var addedItemKeys = args.addedItemKeys;
        var removedItemKeys = args.removedItemKeys;
        if (this._rendered && (addedItemKeys.length || removedItemKeys.length)) {
            var selectionChangePromise = this._selectionChangePromise;
            if (!this._rendering) {
                var addedSelection = [];
                var normalizedIndex;
                var removedSelection = [];
                this._editStrategy.beginCache();
                for (var i = 0; i < removedItemKeys.length; i++) {
                    normalizedIndex = this._getIndexByKey(removedItemKeys[i]);
                    removedSelection.push(normalizedIndex);
                    this._removeSelection(normalizedIndex)
                }
                for (var _i = 0; _i < addedItemKeys.length; _i++) {
                    normalizedIndex = this._getIndexByKey(addedItemKeys[_i]);
                    addedSelection.push(normalizedIndex);
                    this._addSelection(normalizedIndex)
                }
                this._editStrategy.endCache();
                this._updateSelection(addedSelection, removedSelection)
            }
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["when"])(selectionChangePromise).done(() => this._fireSelectionChangeEvent(args))
        }
    }
    _fireSelectionChangeEvent(args) {
        this._createActionByOption("onSelectionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })(args)
    }
    _updateSelection(addedSelection, removedSelection) {
        var selectedItemsCount = this.getSelectedItems().length;
        if (0 === selectedItemsCount) {
            this._isPreserveSelectionMode = false
        }
    }
    _normalizeSelectedItems() {
        var newKeys = this._getKeysByItems(this.option("selectedItems"));
        var oldKeys = this._selection.getSelectedItemKeys();
        if (!this._compareKeys(oldKeys, newKeys)) {
            this._selection.setSelection(newKeys)
        }
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"]).resolve().promise()
    }
    _focusOutHandler() {}
    _getItems() {
        return this.option("items") || []
    }
    _getItemsLength() {
        return this._getItems().length
    }
    _getIndexByItemElement(itemElement) {
        return this._editStrategy.getNormalizedIndex(itemElement)
    }
    _getItemByIndex(index) {
        return this._getItems()[index]
    }
    _getFocusedItem() {
        return this.getItemByItemElement(this.option("focusedElement"))
    }
    _focusItem(item, scrollToItem) {
        this.option("focusedElement", this.getItemElementByItem(item));
        if (scrollToItem) {
            this._layoutUtils.scrollToItem(this._getIndexByItem(item))
        }
    }
    _focusItemByIndex(index, scrollToItem, eventArgs) {
        if (index >= 0 && index < this._getItemsLength()) {
            var item = this._getItemByIndex(index);
            this._focusItem(item, scrollToItem, eventArgs)
        }
    }
    _syncFocusedItemKey() {
        if (!this._syncFocusedItemKeyDeferred) {
            this._syncFocusedItemKeyDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"]
        }
        var deferred = this._syncFocusedItemKeyDeferred;
        if (this._dataSource && this._dataSource.isLoading()) {
            return deferred.promise()
        }
        var focusedItemKey = this.option("focusedItemKey");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(focusedItemKey)) {
            var items = this.option("items");
            var focusedItem = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_3__["find"])(items, item => this.keyOf(item) === focusedItemKey);
            if (focusedItem) {
                this._focusItem(focusedItem, true);
                deferred.resolve()
            } else {
                this.option("focusedItemKey", void 0);
                deferred.reject()
            }
        } else {
            deferred.resolve()
        }
        this._syncFocusedItemKeyDeferred = null;
        return deferred.promise()
    }
    _onFocusedItemChanged() {
        var focusedItem = this._getFocusedItem();
        var newFocusedItemKey = this.keyOf(focusedItem);
        var oldFocusedItemKey = this.option("focusedItemKey");
        if (newFocusedItemKey !== oldFocusedItemKey) {
            this._lockFocusedItemProcessing = true;
            this.option("focusedItemKey", newFocusedItemKey);
            this._lockFocusedItemProcessing = false;
            this._raiseFocusedItemChanged(focusedItem)
        }
    }
    _raiseFocusedItemChanged(focusedItem) {
        var args = {
            item: focusedItem,
            itemElement: this.option("focusedElement")
        };
        this._actions.onFocusedItemChanged(args)
    }
    _changeItemSelection(item, select) {
        if (this.isItemSelected(item) === select) {
            return
        }
        var itemElement = this.getItemElementByItem(item);
        var index = this._getIndexByItemElement(itemElement);
        this._selection.changeItemSelection(index, {
            control: this._isPreserveSelectionMode
        })
    }
    _chooseSelectOption() {
        return "selectedItemKeys"
    }
    getSelectedItems() {
        return this._selection.getSelectedItems()
    }
    getItemElementByItem(item) {
        return this._editStrategy.getItemElement(item)
    }
    getItemByItemElement(itemElement) {
        return this._getItemByIndex(this._getIndexByItemElement(itemElement))
    }
    selectAll() {
        if ("multiple" !== this.option("selectionMode")) {
            return
        }
        this._selection.selectAll();
        this._isPreserveSelectionMode = true
    }
    selectItem(item) {
        this._changeItemSelection(item, true)
    }
    deselectItem(item) {
        this._changeItemSelection(item, false)
    }
    clearSelection() {
        this._selection.deselectAll()
    }
    _optionChanged(args) {
        switch (args.name) {
            case "items":
                if (this._layoutUtils) {
                    this._layoutUtils.updateItems(this.itemElements().first())
                }
                super._optionChanged(args);
                break;
            case "focusedItemKey":
                if (this._lockFocusedItemProcessing) {
                    break
                }
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(args.value)) {
                    this._syncFocusedItemKey().done(() => {
                        var focusedItem = this._getFocusedItem();
                        this._raiseFocusedItemChanged(focusedItem)
                    })
                } else {
                    this.option("focusedElement", null);
                    this._raiseFocusedItemChanged(null)
                }
                break;
            case "onItemEnterKeyPressed":
            case "onFocusedItemChanged":
                this._actions[args.name] = this._createActionByOption(args.name);
                break;
            default:
                super._optionChanged(args)
        }
    }
}
class ListBoxLayoutUtils {
    constructor(scrollView, $viewPort, $itemContainer, $item) {
        this._layoutModel = null;
        this._scrollView = scrollView;
        this._$viewPort = $viewPort;
        this._$itemContainer = $itemContainer;
        this._$item = $item
    }
    updateItems($item) {
        this._$item = $item
    }
    reset() {
        this._layoutModel = null
    }
    getLayoutModel() {
        if (!this._layoutModel) {
            this._layoutModel = this._createLayoutModel()
        }
        return this._layoutModel
    }
    _createLayoutModel() {
        if (!this._$item) {
            return null
        }
        var itemWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(this._$item, true);
        if (0 === itemWidth) {
            return null
        }
        var itemHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])(this._$item, true);
        var viewPortWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getInnerWidth"])(this._$itemContainer);
        var viewPortHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getInnerHeight"])(this._$viewPort);
        var viewPortScrollTop = this._scrollView.scrollTop();
        var viewPortScrollBottom = viewPortScrollTop + viewPortHeight;
        var itemPerRowCount = Math.floor(viewPortWidth / itemWidth);
        var rowPerPageRate = viewPortHeight / itemHeight;
        return {
            itemWidth: itemWidth,
            itemHeight: itemHeight,
            viewPortWidth: viewPortWidth,
            viewPortHeight: viewPortHeight,
            viewPortScrollTop: viewPortScrollTop,
            viewPortScrollBottom: viewPortScrollBottom,
            itemPerRowCount: itemPerRowCount,
            rowPerPageRate: rowPerPageRate
        }
    }
    createItemLayoutModel(index) {
        var layout = this.getLayoutModel();
        if (!layout) {
            return null
        }
        var itemRowIndex = Math.floor(index / layout.itemPerRowCount);
        var itemColumnIndex = index % layout.itemPerRowCount;
        var itemTop = itemRowIndex * layout.itemHeight;
        var itemBottom = itemTop + layout.itemHeight;
        return {
            itemRowIndex: itemRowIndex,
            itemColumnIndex: itemColumnIndex,
            itemTop: itemTop,
            itemBottom: itemBottom
        }
    }
    scrollToItem(index) {
        var layout = this.getLayoutModel();
        if (!layout) {
            return
        }
        var itemRowIndex = Math.floor(index / layout.itemPerRowCount);
        var itemTop = itemRowIndex * layout.itemHeight;
        var itemBottom = itemTop + layout.itemHeight;
        var newScrollTop = layout.viewPortScrollTop;
        if (itemTop < layout.viewPortScrollTop) {
            newScrollTop = itemTop
        } else if (itemBottom > layout.viewPortScrollBottom) {
            newScrollTop = itemBottom - layout.viewPortHeight
        }
        this._scrollView.scrollTo(newScrollTop)
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerThumbnailListBox);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _notify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../notify */ "./node_modules/devextreme/esm/ui/notify.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/* harmony import */ var _file_items_controller__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./file_items_controller */ "./node_modules/devextreme/esm/ui/file_manager/file_items_controller.js");
/* harmony import */ var _ui_file_manager_command_manager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui.file_manager.command_manager */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.command_manager.js");
/* harmony import */ var _ui_file_manager_context_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ui.file_manager.context_menu */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.context_menu.js");
/* harmony import */ var _ui_file_manager_files_tree_view__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ui.file_manager.files_tree_view */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.files_tree_view.js");
/* harmony import */ var _ui_file_manager_item_list_details__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ui.file_manager.item_list.details */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.details.js");
/* harmony import */ var _ui_file_manager_item_list_thumbnails__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ui.file_manager.item_list.thumbnails */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.item_list.thumbnails.js");
/* harmony import */ var _ui_file_manager_toolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ui.file_manager.toolbar */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.toolbar.js");
/* harmony import */ var _ui_file_manager_notification__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ui.file_manager.notification */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification.js");
/* harmony import */ var _ui_file_manager_editing__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ui.file_manager.editing */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.editing.js");
/* harmony import */ var _ui_file_manager_breadcrumbs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ui.file_manager.breadcrumbs */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.breadcrumbs.js");
/* harmony import */ var _ui_file_manager_adaptivity__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ui.file_manager.adaptivity */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.adaptivity.js");
/* harmony import */ var _core_options_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../core/options/utils */ "./node_modules/devextreme/esm/core/options/utils.js");
/* harmony import */ var _core_utils_comparator__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../core/utils/comparator */ "./node_modules/devextreme/esm/core/utils/comparator.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */























var FILE_MANAGER_CLASS = "dx-filemanager";
var FILE_MANAGER_WRAPPER_CLASS = FILE_MANAGER_CLASS + "-wrapper";
var FILE_MANAGER_CONTAINER_CLASS = FILE_MANAGER_CLASS + "-container";
var FILE_MANAGER_DIRS_PANEL_CLASS = FILE_MANAGER_CLASS + "-dirs-panel";
var FILE_MANAGER_EDITING_CONTAINER_CLASS = FILE_MANAGER_CLASS + "-editing-container";
var FILE_MANAGER_ITEMS_PANEL_CLASS = FILE_MANAGER_CLASS + "-items-panel";
var FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS = FILE_MANAGER_CLASS + "-item-custom-thumbnail";
var PARENT_DIRECTORY_KEY_PREFIX = "[*DXPDK*]$40F96F03-FBD8-43DF-91BE-F55F4B8BA871$";
var VIEW_AREAS = {
    folders: "navPane",
    items: "itemView"
};
class FileManager extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_7__["default"] {
    _initTemplates() {}
    _init() {
        super._init();
        this._initActions();
        this._providerUpdateDeferred = null;
        this._lockCurrentPathProcessing = false;
        this._controller = new _file_items_controller__WEBPACK_IMPORTED_MODULE_10__["default"]({
            currentPath: this.option("currentPath"),
            currentPathKeys: this.option("currentPathKeys"),
            rootText: this.option("rootFolderName"),
            fileProvider: this.option("fileSystemProvider"),
            allowedFileExtensions: this.option("allowedFileExtensions"),
            uploadMaxFileSize: this.option("upload").maxFileSize,
            uploadChunkSize: this.option("upload").chunkSize,
            onInitialized: this._onControllerInitialized.bind(this),
            onDataLoading: this._onDataLoading.bind(this),
            onSelectedDirectoryChanged: this._onSelectedDirectoryChanged.bind(this),
            onPathPotentiallyChanged: this._checkPathActuality.bind(this),
            editingEvents: this._actions.editing
        })
    }
    _initMarkup() {
        super._initMarkup();
        this._firstItemViewLoad = true;
        this._lockSelectionProcessing = false;
        this._lockFocusedItemProcessing = false;
        this._itemKeyToFocus = void 0;
        this._commandManager = new _ui_file_manager_command_manager__WEBPACK_IMPORTED_MODULE_11__["FileManagerCommandManager"](this.option("permissions"));
        this.$element().addClass(FILE_MANAGER_CLASS);
        this._createNotificationControl();
        this._initCommandManager()
    }
    _createNotificationControl() {
        var $notificationControl = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass("dx-filemanager-notification-container").appendTo(this.$element());
        this._notificationControl = this._createComponent($notificationControl, _ui_file_manager_notification__WEBPACK_IMPORTED_MODULE_17__["default"], {
            progressPanelContainer: this.$element(),
            contentTemplate: (container, notificationControl) => this._createWrapper(container, notificationControl),
            onActionProgress: e => this._onActionProgress(e),
            positionTarget: ".".concat(FILE_MANAGER_CONTAINER_CLASS),
            showProgressPanel: this.option("notifications.showPanel"),
            showNotificationPopup: this.option("notifications.showPopup")
        })
    }
    _createWrapper(container, notificationControl) {
        this._$wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_WRAPPER_CLASS).appendTo(container);
        this._createEditing(notificationControl);
        var $toolbar = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this._$wrapper);
        this._toolbar = this._createComponent($toolbar, _ui_file_manager_toolbar__WEBPACK_IMPORTED_MODULE_16__["default"], {
            commandManager: this._commandManager,
            generalItems: this.option("toolbar.items"),
            fileItems: this.option("toolbar.fileSelectionItems"),
            itemViewMode: this.option("itemView").mode,
            onItemClick: args => this._actions.onToolbarItemClick(args)
        });
        this._createAdaptivityControl()
    }
    _createAdaptivityControl() {
        var $container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_CONTAINER_CLASS).appendTo(this._$wrapper);
        this._adaptivityControl = this._createComponent($container, _ui_file_manager_adaptivity__WEBPACK_IMPORTED_MODULE_20__["default"], {
            drawerTemplate: container => this._createFilesTreeView(container),
            contentTemplate: container => this._createItemsPanel(container),
            onAdaptiveStateChanged: e => this._onAdaptiveStateChanged(e)
        });
        this._editing.setUploaderSplitterElement(this._adaptivityControl.getSplitterElement())
    }
    _createEditing(notificationControl) {
        var $editingContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_EDITING_CONTAINER_CLASS).appendTo(this.$element());
        this._editing = this._createComponent($editingContainer, _ui_file_manager_editing__WEBPACK_IMPORTED_MODULE_18__["default"], {
            controller: this._controller,
            model: {
                getMultipleSelectedItems: this._getSelectedItemInfos.bind(this)
            },
            getItemThumbnail: this._getItemThumbnailInfo.bind(this),
            notificationControl: notificationControl,
            uploadDropZonePlaceholderContainer: this.$element(),
            rtlEnabled: this.option("rtlEnabled"),
            onSuccess: _ref => {
                var {
                    updatedOnlyFiles: updatedOnlyFiles
                } = _ref;
                return this._redrawComponent(updatedOnlyFiles)
            },
            onError: e => this._onEditingError(e)
        })
    }
    _createItemsPanel($container) {
        this._$itemsPanel = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_ITEMS_PANEL_CLASS).appendTo($container);
        this._createBreadcrumbs(this._$itemsPanel);
        this._createItemView(this._$itemsPanel);
        this._updateUploadDropZone()
    }
    _updateUploadDropZone() {
        var dropZone = this._commandManager.isCommandAvailable("upload") ? this._$itemsPanel : Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this._editing.setUploaderDropZone(dropZone)
    }
    _createFilesTreeView(container) {
        this._filesTreeViewContextMenu = this._createContextMenu(false, VIEW_AREAS.folders);
        var $filesTreeView = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_DIRS_PANEL_CLASS).appendTo(container);
        this._filesTreeView = this._createComponent($filesTreeView, _ui_file_manager_files_tree_view__WEBPACK_IMPORTED_MODULE_13__["default"], {
            storeExpandedState: true,
            contextMenu: this._filesTreeViewContextMenu,
            getDirectories: this.getDirectories.bind(this),
            getCurrentDirectory: this._getCurrentDirectory.bind(this),
            onDirectoryClick: _ref2 => {
                var {
                    itemData: itemData
                } = _ref2;
                return this._setCurrentDirectory(itemData)
            }
        });
        this._filesTreeView.updateCurrentDirectory()
    }
    _createItemView($container, viewMode) {
        this._itemViewContextMenu = this._createContextMenu(true, VIEW_AREAS.items);
        var itemViewOptions = this.option("itemView");
        var options = {
            selectionMode: this.option("selectionMode"),
            selectedItemKeys: this.option("selectedItemKeys"),
            focusedItemKey: this.option("focusedItemKey"),
            contextMenu: this._itemViewContextMenu,
            getItems: this._getItemViewItems.bind(this),
            onError: _ref3 => {
                var {
                    error: error
                } = _ref3;
                return this._showError(error)
            },
            onSelectionChanged: this._onItemViewSelectionChanged.bind(this),
            onFocusedItemChanged: this._onItemViewFocusedItemChanged.bind(this),
            onSelectedItemOpened: this._onSelectedItemOpened.bind(this),
            onContextMenuShowing: e => this._onContextMenuShowing(VIEW_AREAS.items, e),
            getItemThumbnail: this._getItemThumbnailInfo.bind(this),
            customizeDetailColumns: this.option("customizeDetailColumns"),
            detailColumns: this.option("itemView.details.columns")
        };
        var $itemView = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo($container);
        viewMode = viewMode || itemViewOptions.mode;
        var widgetClass = "thumbnails" === viewMode ? _ui_file_manager_item_list_thumbnails__WEBPACK_IMPORTED_MODULE_15__["default"] : _ui_file_manager_item_list_details__WEBPACK_IMPORTED_MODULE_14__["default"];
        this._itemView = this._createComponent($itemView, widgetClass, options)
    }
    _createBreadcrumbs($container) {
        var $breadcrumbs = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo($container);
        this._breadcrumbs = this._createComponent($breadcrumbs, _ui_file_manager_breadcrumbs__WEBPACK_IMPORTED_MODULE_19__["default"], {
            rootFolderDisplayName: this.option("rootFolderName"),
            onCurrentDirectoryChanging: _ref4 => {
                var {
                    currentDirectory: currentDirectory
                } = _ref4;
                return this._setCurrentDirectory(currentDirectory, true)
            }
        });
        this._breadcrumbs.setCurrentDirectory(this._getCurrentDirectory())
    }
    _createContextMenu(isolateCreationItemCommands, viewArea) {
        var $contextMenu = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this._$wrapper);
        return this._createComponent($contextMenu, _ui_file_manager_context_menu__WEBPACK_IMPORTED_MODULE_12__["default"], {
            commandManager: this._commandManager,
            items: this.option("contextMenu.items"),
            onItemClick: args => this._actions.onContextMenuItemClick(args),
            onContextMenuShowing: e => this._onContextMenuShowing(viewArea, e),
            isolateCreationItemCommands: isolateCreationItemCommands,
            viewArea: viewArea
        })
    }
    _initCommandManager() {
        var actions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(this._editing.getCommandActions(), {
            refresh: () => this._refreshAndShowProgress(),
            thumbnails: () => this.option("itemView.mode", "thumbnails"),
            details: () => this.option("itemView.mode", "details"),
            clearSelection: () => this._clearSelection(),
            showNavPane: () => this._adaptivityControl.toggleDrawer()
        });
        this._commandManager.registerActions(actions)
    }
    _onItemViewSelectionChanged(_ref5) {
        var {
            selectedItemInfos: selectedItemInfos,
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            currentSelectedItemKeys: currentSelectedItemKeys,
            currentDeselectedItemKeys: currentDeselectedItemKeys
        } = _ref5;
        this._lockSelectionProcessing = true;
        this.option("selectedItemKeys", selectedItemKeys);
        this._lockSelectionProcessing = false;
        this._actions.onSelectionChanged({
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            currentSelectedItemKeys: currentSelectedItemKeys,
            currentDeselectedItemKeys: currentDeselectedItemKeys
        });
        this._updateToolbar(selectedItemInfos)
    }
    _onItemViewFocusedItemChanged(e) {
        this._lockFocusedItemProcessing = true;
        this.option("focusedItemKey", e.itemKey);
        this._lockFocusedItemProcessing = false;
        this._actions.onFocusedItemChanged({
            item: e.item,
            itemElement: e.itemElement
        })
    }
    _onAdaptiveStateChanged(_ref6) {
        var {
            enabled: enabled
        } = _ref6;
        this._commandManager.setCommandEnabled("showNavPane", enabled);
        this._updateToolbar()
    }
    _onActionProgress(_ref7) {
        var {
            message: message,
            status: status
        } = _ref7;
        this._toolbar.updateRefreshItem(message, status);
        this._updateToolbar()
    }
    _onEditingError(e) {
        var args = Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_9__["extendAttributes"])({}, e, ["errorCode", "errorText", "fileSystemItem"]);
        this._actions.onErrorOccurred(args);
        e.errorText = args.errorText
    }
    _refreshAndShowProgress() {
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__["when"])(this._notificationControl.tryShowProgressPanel(), this._controller.refresh()).then(() => this._filesTreeView.refresh())
    }
    _updateToolbar(selectedItems) {
        var items = selectedItems || this._getSelectedItemInfos();
        this._toolbar.option("contextItems", Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(items, []))
    }
    _switchView(viewMode) {
        this._disposeWidget(this._itemView.option("contextMenu"));
        this._disposeWidget(this._itemView);
        this._createItemView(this._$itemsPanel, viewMode);
        this._toolbar.option({
            itemViewMode: viewMode
        })
    }
    _disposeWidget(widget) {
        widget.dispose();
        widget.$element().remove()
    }
    _clearSelection() {
        this._itemView.clearSelection()
    }
    _showError(message) {
        this._showNotification(message, false)
    }
    _showNotification(message, isSuccess) {
        Object(_notify__WEBPACK_IMPORTED_MODULE_8__["default"])({
            message: message,
            width: 450
        }, isSuccess ? "success" : "error", 5e3)
    }
    _redrawComponent(onlyFileItemsView) {
        this._itemView.refresh().then(() => !onlyFileItemsView && this._filesTreeView.refresh())
    }
    _getItemViewItems() {
        var showFolders = this.option("itemView").showFolders;
        var result = this._controller.getCurrentItems(!showFolders);
        this._updateToolbarWithSelectionOnFirstLoad(result);
        if (this.option("itemView.showParentFolder")) {
            result = Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__["when"])(result).then(items => this._getPreparedItemViewItems(items))
        }
        return result
    }
    _updateToolbarWithSelectionOnFirstLoad(itemsResult) {
        if (!this._firstItemViewLoad) {
            return
        }
        this._firstItemViewLoad = false;
        var selectedItemKeys = this.option("selectedItemKeys");
        if (selectedItemKeys.length > 0) {
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__["when"])(itemsResult).done(items => {
                var selectedItems = Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_9__["findItemsByKeys"])(items, selectedItemKeys);
                if (selectedItems.length > 0) {
                    this._updateToolbar(selectedItems)
                }
            })
        }
    }
    _getPreparedItemViewItems(items) {
        var selectedDir = this._getCurrentDirectory();
        if (selectedDir.fileItem.isRoot()) {
            return items
        }
        var parentDirItem = selectedDir.fileItem.createClone();
        parentDirItem.isParentFolder = true;
        parentDirItem.name = "..";
        parentDirItem.relativeName = "..";
        parentDirItem.key = "".concat(PARENT_DIRECTORY_KEY_PREFIX).concat(selectedDir.fileItem.key);
        var itemsCopy = [...items];
        itemsCopy.unshift({
            fileItem: parentDirItem,
            icon: "parentfolder"
        });
        return itemsCopy
    }
    _onContextMenuShowing(viewArea, e) {
        var _e$itemData;
        var eventArgs = Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_9__["extendAttributes"])({}, e, ["targetElement", "cancel", "event"]);
        eventArgs = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(eventArgs, {
            viewArea: viewArea,
            fileSystemItem: null === (_e$itemData = e.itemData) || void 0 === _e$itemData ? void 0 : _e$itemData.fileItem,
            _isActionButton: e.isActionButton
        });
        this._actions.onContextMenuShowing(eventArgs);
        e.cancel = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(eventArgs.cancel, false)
    }
    _getItemThumbnailInfo(fileInfo) {
        var func = this.option("customizeThumbnail");
        var thumbnail = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(func) ? func(fileInfo.fileItem) : fileInfo.fileItem.thumbnail;
        if (thumbnail) {
            return {
                thumbnail: thumbnail,
                cssClass: FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS
            }
        }
        return {
            thumbnail: fileInfo.icon
        }
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            fileSystemProvider: null,
            currentPath: "",
            currentPathKeys: [],
            rootFolderName: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-rootDirectoryName"),
            selectionMode: "multiple",
            selectedItemKeys: [],
            focusedItemKey: void 0,
            toolbar: {
                items: ["showNavPane", "create", "upload", "switchView", {
                    name: "separator",
                    location: "after"
                }, "refresh"],
                fileSelectionItems: ["download", "separator", "move", "copy", "rename", "separator", "delete", "clearSelection", {
                    name: "separator",
                    location: "after"
                }, "refresh"]
            },
            contextMenu: {
                items: ["create", "upload", "rename", "move", "copy", "delete", "refresh", "download"]
            },
            itemView: {
                details: {
                    columns: ["thumbnail", "name", "dateModified", "size"]
                },
                mode: "details",
                showFolders: true,
                showParentFolder: true
            },
            customizeThumbnail: null,
            customizeDetailColumns: null,
            onContextMenuItemClick: null,
            onContextMenuShowing: null,
            onCurrentDirectoryChanged: null,
            onSelectedFileOpened: null,
            onSelectionChanged: null,
            onFocusedItemChanged: null,
            onToolbarItemClick: null,
            onErrorOccurred: null,
            onDirectoryCreating: null,
            onDirectoryCreated: null,
            onItemRenaming: null,
            onItemRenamed: null,
            onItemDeleting: null,
            onItemDeleted: null,
            onItemCopying: null,
            onItemCopied: null,
            onItemMoving: null,
            onItemMoved: null,
            onFileUploading: null,
            onFileUploaded: null,
            onItemDownloading: null,
            allowedFileExtensions: [],
            upload: {
                maxFileSize: 0,
                chunkSize: 2e5
            },
            permissions: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _ui_file_manager_command_manager__WEBPACK_IMPORTED_MODULE_11__["defaultPermissions"]),
            notifications: {
                showPanel: true,
                showPopup: true
            }
        })
    }
    option(options, value) {
        var optionsToCheck = Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_21__["normalizeOptions"])(options, value);
        var isGetter = arguments.length < 2 && "object" !== Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["type"])(options);
        var isOptionDefined = name => Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(optionsToCheck[name]);
        var isOptionValueDiffers = name => {
            if (!isOptionDefined(name)) {
                return false
            }
            var previousValue = this.option(name);
            var value = optionsToCheck[name];
            return !Object(_core_utils_comparator__WEBPACK_IMPORTED_MODULE_22__["equals"])(previousValue, value)
        };
        if (!isGetter && isOptionDefined("fileSystemProvider")) {
            this._providerUpdateDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__["Deferred"];
            if (isOptionValueDiffers("currentPath") || isOptionValueDiffers("currentPathKeys")) {
                this._lockCurrentPathProcessing = true
            }
        }
        return super.option(...arguments)
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "currentPath":
                var updateFunc = () => {
                    this._lockCurrentPathProcessing = false;
                    return this._controller.setCurrentPath(args.value)
                };
                this._lockCurrentPathProcessing = true;
                this._providerUpdateDeferred ? this._providerUpdateDeferred.then(updateFunc) : updateFunc();
                break;
            case "currentPathKeys":
                var _updateFunc = () => {
                    this._lockCurrentPathProcessing = false;
                    return this._controller.setCurrentPathByKeys(args.value)
                };
                this._lockCurrentPathProcessing = true;
                this._providerUpdateDeferred ? this._providerUpdateDeferred.then(_updateFunc) : _updateFunc();
                break;
            case "selectedItemKeys":
                if (!this._lockSelectionProcessing && this._itemView) {
                    this._itemView.option("selectedItemKeys", args.value)
                }
                break;
            case "focusedItemKey":
                if (!this._lockFocusedItemProcessing && this._itemView) {
                    this._itemView.option("focusedItemKey", args.value)
                }
                break;
            case "rootFolderName":
                this._controller.setRootText(args.value);
                this._invalidate();
                break;
            case "fileSystemProvider":
                if (!this._lockCurrentPathProcessing) {
                    this._providerUpdateDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_3__["Deferred"]
                }
                var pathKeys = this._lockCurrentPathProcessing ? void 0 : this.option("currentPathKeys");
                this._controller.updateProvider(args.value, pathKeys).then(() => this._providerUpdateDeferred.resolve()).always(() => {
                    this._providerUpdateDeferred = null;
                    this.repaint()
                });
                break;
            case "allowedFileExtensions":
                this._controller.setAllowedFileExtensions(args.value);
                this._invalidate();
                break;
            case "upload":
                this._controller.setUploadOptions(this.option("upload"));
                this._invalidate();
                break;
            case "permissions":
                this._commandManager.updatePermissions(this.option("permissions"));
                this._filesTreeViewContextMenu.tryUpdateVisibleContextMenu();
                this._itemViewContextMenu.tryUpdateVisibleContextMenu();
                this._toolbar.updateItemPermissions();
                this._updateUploadDropZone();
                break;
            case "selectionMode":
            case "customizeThumbnail":
            case "customizeDetailColumns":
                this._invalidate();
                break;
            case "itemView":
                if ("itemView.mode" === args.fullName) {
                    this._switchView(args.value)
                } else {
                    this._invalidate()
                }
                break;
            case "toolbar":
                var toolbarOptions = {};
                if ("toolbar" === args.fullName) {
                    if (args.value.items) {
                        toolbarOptions.generalItems = args.value.items
                    }
                    if (args.value.fileSelectionItems) {
                        toolbarOptions.fileItems = args.value.fileSelectionItems
                    }
                }
                if (0 === args.fullName.indexOf("toolbar.items")) {
                    toolbarOptions.generalItems = this.option("toolbar.items")
                }
                if (0 === args.fullName.indexOf("toolbar.fileSelectionItems")) {
                    toolbarOptions.fileItems = this.option("toolbar.fileSelectionItems")
                }
                this._toolbar.option(toolbarOptions);
                break;
            case "contextMenu":
                if ("contextMenu" === args.fullName && args.value.items || 0 === args.fullName.indexOf("contextMenu.items")) {
                    var contextMenuItems = this.option("contextMenu.items");
                    this._filesTreeViewContextMenu.option("items", contextMenuItems);
                    this._itemViewContextMenu.option("items", contextMenuItems)
                }
                break;
            case "notifications":
                this._notificationControl.option("showProgressPanel", this.option("notifications.showPanel"));
                this._notificationControl.option("showNotificationPopup", this.option("notifications.showPopup"));
                break;
            case "onContextMenuItemClick":
            case "onContextMenuShowing":
            case "onCurrentDirectoryChanged":
            case "onSelectedFileOpened":
            case "onSelectionChanged":
            case "onFocusedItemChanged":
            case "onToolbarItemClick":
            case "onErrorOccurred":
                this._actions[name] = this._createActionByOption(name);
                break;
            case "onDirectoryCreating":
            case "onDirectoryCreated":
            case "onItemRenaming":
            case "onItemRenamed":
            case "onItemDeleting":
            case "onItemDeleted":
            case "onItemCopying":
            case "onItemCopied":
            case "onItemMoving":
            case "onItemMoved":
            case "onFileUploading":
            case "onFileUploaded":
            case "onItemDownloading":
                this._actions.editing[name] = this._createActionByOption(name);
                break;
            case "rtlEnabled":
                this._editing.updateDialogRtl(args.value);
                super._optionChanged(args);
                break;
            default:
                super._optionChanged(args)
        }
    }
    _initActions() {
        this._actions = {
            onContextMenuItemClick: this._createActionByOption("onContextMenuItemClick"),
            onContextMenuShowing: this._createActionByOption("onContextMenuShowing"),
            onCurrentDirectoryChanged: this._createActionByOption("onCurrentDirectoryChanged"),
            onSelectedFileOpened: this._createActionByOption("onSelectedFileOpened"),
            onSelectionChanged: this._createActionByOption("onSelectionChanged"),
            onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged"),
            onToolbarItemClick: this._createActionByOption("onToolbarItemClick"),
            onErrorOccurred: this._createActionByOption("onErrorOccurred"),
            editing: {
                onDirectoryCreating: this._createActionByOption("onDirectoryCreating"),
                onDirectoryCreated: this._createActionByOption("onDirectoryCreated"),
                onItemRenaming: this._createActionByOption("onItemRenaming"),
                onItemRenamed: this._createActionByOption("onItemRenamed"),
                onItemDeleting: this._createActionByOption("onItemDeleting"),
                onItemDeleted: this._createActionByOption("onItemDeleted"),
                onItemCopying: this._createActionByOption("onItemCopying"),
                onItemCopied: this._createActionByOption("onItemCopied"),
                onItemMoving: this._createActionByOption("onItemMoving"),
                onItemMoved: this._createActionByOption("onItemMoved"),
                onFileUploading: this._createActionByOption("onFileUploading"),
                onFileUploaded: this._createActionByOption("onFileUploaded"),
                onItemDownloading: this._createActionByOption("onItemDownloading")
            }
        }
    }
    executeCommand(commandName) {
        return this._commandManager.executeCommand(commandName)
    }
    _setCurrentDirectory(directoryInfo, checkActuality) {
        this._controller.setCurrentDirectory(directoryInfo, checkActuality)
    }
    _getCurrentDirectory() {
        return this._controller.getCurrentDirectory()
    }
    _onControllerInitialized(_ref8) {
        var {
            controller: controller
        } = _ref8;
        this._controller = this._controller || controller;
        this._syncToCurrentDirectory()
    }
    _onDataLoading(_ref9) {
        var {
            operation: operation
        } = _ref9;
        var options = null;
        if ("navigation" === operation) {
            options = {
                focusedItemKey: this._itemKeyToFocus,
                selectedItemKeys: this.option("selectedItemKeys")
            };
            this._itemKeyToFocus = void 0
        }
        this._itemView.refresh(options)
    }
    _onSelectedDirectoryChanged() {
        var currentDirectory = this._getCurrentDirectory();
        this._syncToCurrentDirectory();
        this._actions.onCurrentDirectoryChanged({
            directory: currentDirectory.fileItem
        })
    }
    _syncToCurrentDirectory() {
        var currentDirectory = this._getCurrentDirectory();
        if (this._filesTreeView) {
            this._filesTreeView.updateCurrentDirectory()
        }
        if (this._breadcrumbs) {
            this._breadcrumbs.setCurrentDirectory(currentDirectory)
        }
        this._checkPathActuality()
    }
    _checkPathActuality() {
        if (this._lockCurrentPathProcessing) {
            return
        }
        var currentPath = this._controller.getCurrentPath();
        var currentPathKeys = this._controller.getCurrentPathKeys();
        var options = {};
        if (this.option("currentPath") !== currentPath) {
            options.currentPath = currentPath
        }
        if (!Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["equalByValue"])(this.option("currentPathKeys"), currentPathKeys)) {
            options.currentPathKeys = currentPathKeys
        }
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isEmptyObject"])(options)) {
            this.option(options)
        }
    }
    getDirectories(parentDirectoryInfo, skipNavigationOnError) {
        return this._controller.getDirectories(parentDirectoryInfo, skipNavigationOnError)
    }
    _getSelectedItemInfos() {
        return this._itemView ? this._itemView.getSelectedItems() : []
    }
    refresh() {
        return this.executeCommand("refresh")
    }
    getCurrentDirectory() {
        var directoryInfo = this._getCurrentDirectory();
        return directoryInfo && directoryInfo.fileItem || null
    }
    getSelectedItems() {
        return this._getSelectedItemInfos().map(itemInfo => itemInfo.fileItem)
    }
    _onSelectedItemOpened(_ref10) {
        var {
            fileItemInfo: fileItemInfo
        } = _ref10;
        var fileItem = fileItemInfo.fileItem;
        if (!fileItem.isDirectory) {
            this._actions.onSelectedFileOpened({
                file: fileItem
            });
            return
        }
        if (fileItem.isParentFolder) {
            this._itemKeyToFocus = this._getCurrentDirectory().fileItem.key
        }
        var newCurrentDirectory = fileItem.isParentFolder ? this._getCurrentDirectory().parentDirectory : fileItemInfo;
        this._setCurrentDirectory(newCurrentDirectory);
        if (newCurrentDirectory) {
            this._filesTreeView.toggleDirectoryExpandedState(newCurrentDirectory.parentDirectory, true)
        }
    }
}
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_6__["default"])("dxFileManager", FileManager);
/* harmony default export */ __webpack_exports__["default"] = (FileManager);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.messages.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.messages.js ***!
  \*********************************************************************************/
/*! exports provided: FileManagerMessages, ErrorCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileManagerMessages", function() { return FileManagerMessages; });
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../file_management/error_codes */ "./node_modules/devextreme/esm/file_management/error_codes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorCode", function() { return _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.messages.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var FileManagerMessages = {
    get: (errorCode, args) => {
        switch (errorCode) {
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].NoAccess:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorNoAccess");
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].FileExists:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorFileExistsFormat", args);
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].FileNotFound:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorFileNotFoundFormat", args);
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].DirectoryExists:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorDirectoryExistsFormat", args);
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].DirectoryNotFound:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorDirectoryNotFoundFormat", args);
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].WrongFileExtension:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorWrongFileExtension");
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].MaxFileSizeExceeded:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorMaxFileSizeExceeded");
            case _file_management_error_codes__WEBPACK_IMPORTED_MODULE_1__["default"].InvalidSymbols:
                return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorInvalidSymbols")
        }
        return _localization_message__WEBPACK_IMPORTED_MODULE_0__["default"].format("dxFileManager-errorDefault")
    }
};



/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FileManagerNotificationControl; });
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../popup */ "./node_modules/devextreme/esm/ui/popup.js");
/* harmony import */ var _drawer_ui_drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../drawer/ui.drawer */ "./node_modules/devextreme/esm/ui/drawer/ui.drawer.js");
/* harmony import */ var _ui_file_manager_notification_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui.file_manager.notification_manager */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification_manager.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.notification.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_5__["getWindow"])();
var ADAPTIVE_STATE_SCREEN_WIDTH = 1e3;
var FILE_MANAGER_NOTIFICATION_CLASS = "dx-filemanager-notification";
var FILE_MANAGER_NOTIFICATION_DRAWER_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-drawer");
var FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_DRAWER_CLASS, "-panel");
var FILE_MANAGER_NOTIFICATION_POPUP_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-popup");
var FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-popup-error");
var FILE_MANAGER_NOTIFICATION_COMMON_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-common");
var FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-separator");
var FILE_MANAGER_NOTIFICATION_DETAILS_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-details");
var FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-common-no-item");
class FileManagerNotificationControl extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__["default"] {
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        this._isInAdaptiveState = this._isSmallScreen();
        this._managerMap = {};
        this._notificationManagerStubId = null;
        this._setNotificationManager();
        var $progressPanelContainer = this.option("progressPanelContainer");
        var $progressDrawer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_NOTIFICATION_DRAWER_CLASS).appendTo($progressPanelContainer);
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS).appendTo($progressDrawer);
        var drawerOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            opened: false,
            position: "right",
            template: container => this._ensureProgressPanelCreated(container)
        }, this._getProgressDrawerAdaptiveOptions());
        this._progressDrawer = this._createComponent($progressDrawer, _drawer_ui_drawer__WEBPACK_IMPORTED_MODULE_8__["default"], drawerOptions);
        var $drawerContent = $progressDrawer.find(".".concat(FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS)).first();
        var contentRenderer = this.option("contentTemplate");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(contentRenderer)) {
            contentRenderer($drawerContent, this)
        }
    }
    _setNotificationManager(options) {
        options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            onActionProgressStatusChanged: this._raiseActionProgress.bind(this)
        }, options);
        if (!this._notificationManagerStubId) {
            var stubManager = new _ui_file_manager_notification_manager__WEBPACK_IMPORTED_MODULE_9__["NotificationManagerStub"](options);
            this._notificationManagerStubId = stubManager.getId();
            this._managerMap[this._notificationManagerStubId] = stubManager
        }
        if (!this._isProgressDrawerDisabled()) {
            var notificationManagerComponent = this._getProgressManagerComponent();
            options.isActual = true;
            var defaultManager = new notificationManagerComponent(options);
            this._managerMap[defaultManager.getId()] = defaultManager
        }
    }
    _getNotificationManager(operationInfo) {
        var actualManagerId = (null === operationInfo || void 0 === operationInfo ? void 0 : operationInfo[_ui_file_manager_notification_manager__WEBPACK_IMPORTED_MODULE_9__["MANAGER_ID_NAME"]]) || this._getActualNotificationManagerId();
        return this._managerMap[actualManagerId] || this._managerMap[this._notificationManagerStubId]
    }
    _clearManagerMap() {
        var stubManager = this._managerMap[this._notificationManagerStubId];
        delete this._managerMap;
        this._managerMap = {
            [this._notificationManagerStubId]: stubManager
        }
    }
    _getActualNotificationManagerId() {
        return Object.keys(this._managerMap).filter(managerId => this._managerMap[managerId].isActual())[0]
    }
    tryShowProgressPanel() {
        var promise = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"];
        var notificationManager = this._getNotificationManager();
        if (notificationManager.isActionProgressStatusDefault() || this._isProgressDrawerOpened() || this._isProgressDrawerDisabled()) {
            return promise.resolve().promise()
        }
        setTimeout(() => {
            this._progressDrawer.show().done(promise.resolve);
            this._hidePopup();
            notificationManager.tryHideActionProgress()
        });
        return promise.promise()
    }
    addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
        var notificationManager = this._getNotificationManager();
        return notificationManager.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate)
    }
    addOperationDetails(operationInfo, details, showCloseButton) {
        var notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.addOperationDetails(operationInfo, details, showCloseButton)
    }
    updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
        var notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress)
    }
    completeOperationItem(operationInfo, itemIndex, commonProgress) {
        var notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.completeOperationItem(operationInfo, itemIndex, commonProgress)
    }
    completeOperation(operationInfo, commonText, isError, statusText) {
        var notificationManager = this._getNotificationManager(operationInfo);
        if (!isError) {
            this._showPopup(commonText)
        }
        notificationManager.completeOperation(operationInfo, commonText, isError, statusText);
        if (!this._isProgressDrawerOpened() || !notificationManager.hasNoOperations()) {
            notificationManager.updateActionProgressStatus(operationInfo)
        } else {
            notificationManager.tryHideActionProgress()
        }
    }
    completeSingleOperationWithError(operationInfo, errorInfo) {
        var notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.completeSingleOperationWithError(operationInfo, errorInfo);
        this._showPopupError(errorInfo)
    }
    addOperationDetailsError(operationInfo, errorInfo) {
        var notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.addOperationDetailsError(operationInfo, errorInfo);
        this._showPopupError(errorInfo)
    }
    _hideProgressPanel() {
        setTimeout(() => this._progressDrawer.hide())
    }
    _isSmallScreen() {
        if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_5__["hasWindow"])()) {
            return false
        }
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(window) <= ADAPTIVE_STATE_SCREEN_WIDTH
    }
    _dimensionChanged(dimension) {
        if (!(dimension && "height" === dimension)) {
            this._checkAdaptiveState()
        }
    }
    _checkAdaptiveState() {
        var oldState = this._isInAdaptiveState;
        this._isInAdaptiveState = this._isSmallScreen();
        if (oldState !== this._isInAdaptiveState && this._progressDrawer) {
            var notificationManager = this._getNotificationManager();
            if (notificationManager.handleDimensionChanged()) {
                var options = this._getProgressDrawerAdaptiveOptions();
                this._progressDrawer.option(options)
            }
        }
    }
    _getProgressDrawerAdaptiveOptions() {
        if (this._isInAdaptiveState) {
            return {
                openedStateMode: "overlap",
                shading: true,
                closeOnOutsideClick: true
            }
        } else {
            return {
                openedStateMode: "shrink",
                shading: false,
                closeOnOutsideClick: false
            }
        }
    }
    _ensureProgressPanelCreated(container) {
        var notificationManager = this._getNotificationManager();
        notificationManager.ensureProgressPanelCreated(container, {
            onOperationCanceled: _ref => {
                var {
                    info: info
                } = _ref;
                return this._raiseOperationCanceled(info)
            },
            onOperationItemCanceled: _ref2 => {
                var {
                    item: item,
                    itemIndex: itemIndex
                } = _ref2;
                return this._raiseOperationItemCanceled(item, itemIndex)
            },
            onPanelClosed: () => this._hideProgressPanel()
        })
    }
    _getProgressManagerComponent() {
        return _ui_file_manager_notification_manager__WEBPACK_IMPORTED_MODULE_9__["NotificationManager"]
    }
    _isProgressDrawerDisabled() {
        return !this.option("showProgressPanel")
    }
    _isProgressDrawerOpened() {
        return this._progressDrawer.option("opened")
    }
    _hidePopup(forceHide) {
        if (!this.option("showNotificationPopup") && !forceHide) {
            return
        }
        this._getNotificationPopup().hide()
    }
    _showPopup(content, errorMode) {
        if (this._isProgressDrawerOpened() || !this.option("showNotificationPopup")) {
            return
        }
        this._getNotificationPopup().$wrapper().toggleClass(FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS, !!errorMode);
        this._getNotificationPopup().option("contentTemplate", content);
        if (!this._getNotificationPopup().option("visible")) {
            this._getNotificationPopup().show()
        }
    }
    _showPopupError(errorInfo) {
        if (!this.option("showNotificationPopup")) {
            return
        }
        var notificationManager = this._getNotificationManager();
        var $content = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>");
        var $message = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_NOTIFICATION_COMMON_CLASS).text(errorInfo.commonErrorText);
        var $separator = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS);
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo($separator);
        var $details = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_NOTIFICATION_DETAILS_CLASS);
        if (errorInfo.item) {
            notificationManager.createErrorDetailsProgressBox($details, errorInfo.item, errorInfo.detailErrorText)
        } else {
            $message.addClass(FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS);
            notificationManager.renderError($details, errorInfo.detailErrorText)
        }
        $content.append($message, $separator, $details);
        this._showPopup($content, true)
    }
    _getNotificationPopup() {
        if (!this._notificationPopup) {
            var $popup = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_NOTIFICATION_POPUP_CLASS).appendTo(this.$element());
            this._notificationPopup = this._createComponent($popup, _popup__WEBPACK_IMPORTED_MODULE_7__["default"], {
                container: this.$element(),
                width: "auto",
                height: "auto",
                showTitle: false,
                dragEnabled: false,
                shading: false,
                visible: false,
                closeOnOutsideClick: true,
                animation: {
                    duration: 0
                },
                position: {
                    my: "right top",
                    at: "right top",
                    of: this.option("positionTarget"),
                    offset: "-10 -5"
                }
            })
        }
        return this._notificationPopup
    }
    _raiseActionProgress(message, status) {
        this._actions.onActionProgress({
            message: message,
            status: status
        })
    }
    _raiseOperationCanceled(info) {
        this._actions.onOperationCanceled({
            info: info
        })
    }
    _raiseOperationItemCanceled(item, index) {
        this._actions.onOperationItemCanceled({
            item: item,
            itemIndex: index
        })
    }
    _initActions() {
        this._actions = {
            onActionProgress: this._createActionByOption("onActionProgress"),
            onOperationCanceled: this._createActionByOption("onOperationCanceled"),
            onOperationItemCanceled: this._createActionByOption("onOperationItemCanceled")
        }
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(super._getDefaultOptions(), {
            progressPanelContainer: null,
            contentTemplate: null,
            onActionProgress: null,
            onOperationCanceled: null,
            onOperationItemCanceled: null,
            showProgressPanel: true,
            showNotificationPopup: true
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "progressPanelContainer":
            case "contentTemplate":
                break;
            case "showProgressPanel":
                this._setNotificationManager();
                this._getNotificationManager().updateActionProgressStatus();
                if (!args.value) {
                    this._hideProgressPanel();
                    this._clearManagerMap()
                }
                this._progressDrawer.repaint();
                break;
            case "showNotificationPopup":
                if (!args.value) {
                    this._hidePopup(true)
                }
                break;
            case "onActionProgress":
            case "onOperationCanceled":
            case "onOperationItemCanceled":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification.progress_panel.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification.progress_panel.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _progress_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../progress_bar */ "./node_modules/devextreme/esm/ui/progress_bar.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../button */ "./node_modules/devextreme/esm/ui/button.js");
/* harmony import */ var _scroll_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../scroll_view */ "./node_modules/devextreme/esm/ui/scroll_view.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.notification.progress_panel.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var FILE_MANAGER_PROGRESS_PANEL_CLASS = "dx-filemanager-progress-panel";
var FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-container");
var FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-title");
var FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-title-text");
var FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-close-button");
var FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-infos-container");
var FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-separator");
var FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-info");
var FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-common");
var FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-info-with-details");
var FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-details");
var FILE_MANAGER_PROGRESS_BOX_CLASS = "dx-filemanager-progress-box";
var FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-error");
var FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-without-close-button");
var FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-image");
var FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-wrapper");
var FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-common");
var FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-progress-bar");
var FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-close-button");
var DX_CARD_CLASS = "dx-card";
class FileManagerProgressPanel extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_5__["default"] {
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        this._operationCount = 0;
        this.$element().addClass(FILE_MANAGER_PROGRESS_PANEL_CLASS);
        var $scrollView = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this.$element());
        var $container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS).appendTo($scrollView);
        this._scrollView = this._createComponent($scrollView, _scroll_view__WEBPACK_IMPORTED_MODULE_8__["default"], {
            scrollByContent: true,
            scrollByThumb: true,
            showScrollbar: "onScroll"
        });
        var $title = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS).appendTo($container);
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").text(_localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-notificationProgressPanelTitle")).addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS).appendTo($title);
        var $closeButton = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS).appendTo($title);
        this._createComponent($closeButton, _button__WEBPACK_IMPORTED_MODULE_7__["default"], {
            icon: "close",
            stylingMode: "text",
            onClick: () => this._raisePanelClosed()
        });
        this._$infosContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS).appendTo($container);
        this._renderEmptyListText()
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(super._getDefaultOptions(), {
            onOperationClosed: null,
            onOperationCanceled: null,
            onOperationItemCanceled: null,
            onPanelClosed: null
        })
    }
    _initActions() {
        this._actions = {
            onOperationClosed: this._createActionByOption("onOperationClosed"),
            onOperationCanceled: this._createActionByOption("onOperationCanceled"),
            onOperationItemCanceled: this._createActionByOption("onOperationItemCanceled"),
            onPanelClosed: this._createActionByOption("onPanelClosed")
        }
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "test":
                break;
            case "onOperationClosed":
            case "onOperationCanceled":
            case "onOperationItemCanceled":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    addOperation(commonText, showCloseButtonAlways, allowProgressAutoUpdate) {
        if (this._operationCount) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS).prependTo(this._$infosContainer)
        } else {
            this._$infosContainer.empty()
        }
        this._operationCount++;
        var info = {
            customCloseHandling: showCloseButtonAlways,
            allowProgressAutoUpdate: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_2__["ensureDefined"])(allowProgressAutoUpdate, true)
        };
        var $info = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS).prependTo(this._$infosContainer);
        info.$info = $info;
        var $common = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS).appendTo($info);
        info.common = this._createProgressBox($common, {
            commonText: commonText,
            showCloseButton: true,
            showCloseButtonAlways: showCloseButtonAlways,
            onCloseButtonClick: () => this._closeOperation(info)
        });
        return info
    }
    addOperationDetails(info, details, showCloseButton) {
        info.$info.addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS);
        var $details = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS).appendTo(info.$info);
        info.details = details.map((itemInfo, index) => {
            itemInfo.info = info;
            return this._createDetailsItem($details, itemInfo, index, false, showCloseButton)
        })
    }
    _createDetailsItem($container, item, itemIndex, skipProgressBox, showCloseButton) {
        var $detailsItem = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo($container);
        if (-1 !== itemIndex) {
            $detailsItem.addClass(DX_CARD_CLASS)
        }
        return this._createProgressBox($detailsItem, {
            commonText: item.commonText,
            imageUrl: item.imageUrl,
            skipProgressBox: skipProgressBox,
            showCloseButton: showCloseButton,
            showCloseButtonAlways: showCloseButton,
            onCloseButtonClick: () => this._cancelOperationItem(item, itemIndex)
        })
    }
    completeOperationItem(operationInfo, itemIndex, commonProgress) {
        if (operationInfo.allowProgressAutoUpdate) {
            this.updateOperationItemProgress(operationInfo, itemIndex, 100, commonProgress)
        }
        this._setCloseButtonVisible(operationInfo.details[itemIndex], false)
    }
    updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
        operationInfo.common.progressBar.option("value", commonProgress);
        if (operationInfo.details) {
            var detailsItem = operationInfo.details[itemIndex];
            detailsItem.progressBar.option("value", itemProgress)
        }
    }
    completeOperation(info, commonText, isError, statusText) {
        info.completed = true;
        info.common.$commonText.text(commonText);
        if (isError) {
            this._removeProgressBar(info.common)
        } else if (info.allowProgressAutoUpdate) {
            info.common.progressBar.option("value", 100)
        }
        if (statusText) {
            this._setProgressBarText(info.common, statusText)
        }
        this._setCloseButtonVisible(info.common, true)
    }
    completeSingleOperationWithError(info, errorText) {
        var _info$details;
        var detailsItem = null === (_info$details = info.details) || void 0 === _info$details ? void 0 : _info$details[0];
        info.completed = true;
        this._renderOperationError(detailsItem || info.common, errorText);
        this._setCloseButtonVisible(info.common, true);
        if (detailsItem) {
            this._setCloseButtonVisible(detailsItem, false)
        }
    }
    addOperationDetailsError(info, index, errorText) {
        var detailsItem = info.details[index];
        this._renderOperationError(detailsItem, errorText);
        this._setCloseButtonVisible(detailsItem, false)
    }
    _renderError($container, $target, errorText) {
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").text(errorText).addClass(FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS).appendTo($container)
    }
    _renderEmptyListText() {
        this._$infosContainer.text(_localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-notificationProgressPanelEmptyListText"))
    }
    _renderOperationError(info, errorText) {
        this._removeProgressBar(info);
        this._renderError(info.$wrapper, info.$commonText, errorText)
    }
    _removeProgressBar(progressBox) {
        if (progressBox.progressBar) {
            progressBox.progressBar.dispose();
            progressBox.progressBar.$element().remove();
            progressBox.progressBar = null
        }
    }
    _createProgressBox($container, options) {
        $container.addClass(FILE_MANAGER_PROGRESS_BOX_CLASS);
        if (!options.showCloseButtonAlways) {
            $container.addClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS)
        }
        if (options.imageUrl) {
            Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_3__["getImageContainer"])(options.imageUrl).addClass(FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS).appendTo($container)
        }
        var $wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS).appendTo($container);
        var $commonText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS).text(options.commonText).appendTo($wrapper);
        var progressBar = null;
        if (!options.skipProgressBox) {
            var $progressBar = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS).appendTo($wrapper);
            progressBar = this._createComponent($progressBar, _progress_bar__WEBPACK_IMPORTED_MODULE_6__["default"], {
                min: 0,
                max: 100,
                width: "100%",
                validationMessageMode: "always",
                statusFormat: (ratio, value) => this._getStatusString(ratio, value)
            })
        }
        var closeButton = null;
        if (options.showCloseButton) {
            var $button = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS).appendTo($container);
            closeButton = this._createComponent($button, _button__WEBPACK_IMPORTED_MODULE_7__["default"], {
                icon: "dx-filemanager-i dx-filemanager-i-cancel",
                stylingMode: "text",
                visible: options.showCloseButtonAlways,
                onClick: options.onCloseButtonClick
            })
        }
        return {
            $commonText: $commonText,
            progressBar: progressBar,
            $element: $container,
            $wrapper: $wrapper,
            closeButton: closeButton
        }
    }
    _setCloseButtonVisible(progressBox, visible) {
        if (progressBox.closeButton) {
            progressBox.$element.toggleClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS, !visible);
            progressBox.closeButton.option("visible", visible)
        }
    }
    _setProgressBarText(progressBox, text) {
        progressBox.progressBar.option("statusFormat", () => text)
    }
    _closeOperation(info) {
        if (info.customCloseHandling && !info.completed) {
            this._raiseOperationCanceled(info);
            this._setCloseButtonVisible(info.common, false);
            info.details.forEach(item => this._displayClosedOperationItem(item))
        } else {
            this._raiseOperationClosed(info);
            info.$info.next(".".concat(FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS)).remove();
            info.$info.remove();
            this._operationCount--;
            if (!this._operationCount) {
                this._renderEmptyListText()
            }
        }
    }
    _cancelOperationItem(item, itemIndex) {
        this._raiseOperationItemCanceled(item, itemIndex);
        var itemInfo = item.info.details[itemIndex];
        this._displayClosedOperationItem(itemInfo)
    }
    _displayClosedOperationItem(itemInfo) {
        this._setProgressBarText(itemInfo, _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxFileManager-notificationProgressPanelOperationCanceled"));
        this._setCloseButtonVisible(itemInfo, false)
    }
    _getStatusString(ratio, value) {
        return 1 === ratio ? _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("Done") : Math.round(100 * ratio) + "%"
    }
    _raiseOperationClosed(info) {
        this._actions.onOperationClosed({
            info: info
        })
    }
    _raiseOperationCanceled(info) {
        this._actions.onOperationCanceled({
            info: info
        })
    }
    _raiseOperationItemCanceled(item, itemIndex) {
        this._actions.onOperationItemCanceled({
            item: item,
            itemIndex: itemIndex
        })
    }
    _raisePanelClosed() {
        this._actions.onPanelClosed()
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerProgressPanel);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification_manager.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification_manager.js ***!
  \*********************************************************************************************/
/*! exports provided: NotificationManager, NotificationManagerStub, MANAGER_ID_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationManager", function() { return NotificationManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationManagerStub", function() { return NotificationManagerStub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MANAGER_ID_NAME", function() { return MANAGER_ID_NAME; });
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _ui_file_manager_notification_progress_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui.file_manager.notification.progress_panel */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.notification.progress_panel.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.notification_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var FILE_MANAGER_PROGRESS_BOX_CLASS = "dx-filemanager-progress-box";
var FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-error");
var FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-image");
var FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-wrapper");
var FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-common");
var MANAGER_ID_NAME = "__operationInfoManager";
var ACTION_PROGRESS_STATUS = {
    default: "default",
    progress: "progress",
    error: "error",
    success: "success"
};
class NotificationManagerBase {
    constructor(_ref) {
        var {
            onActionProgressStatusChanged: onActionProgressStatusChanged,
            isActual: isActual
        } = _ref;
        this._id = (new _core_guid__WEBPACK_IMPORTED_MODULE_0__["default"]).toString();
        this._isActual = isActual || false;
        this._actionProgressStatus = ACTION_PROGRESS_STATUS.default;
        this._raiseActionProgress = onActionProgressStatusChanged
    }
    getId() {
        return this._id
    }
    isActual() {
        return this._isActual
    }
    createErrorDetailsProgressBox($container, item, errorText) {
        var detailsItem = this._createDetailsItem($container, item);
        this.renderError(detailsItem.$wrapper, errorText)
    }
    renderError($container, errorText) {
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").text(errorText).addClass(FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS).appendTo($container)
    }
    isActionProgressStatusDefault() {
        return this._actionProgressStatus === ACTION_PROGRESS_STATUS.default
    }
    _createDetailsItem($container, item) {
        var $detailsItem = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo($container);
        return this._createProgressBox($detailsItem, {
            commonText: item.commonText,
            imageUrl: item.imageUrl
        })
    }
    _createProgressBox($container, options) {
        $container.addClass(FILE_MANAGER_PROGRESS_BOX_CLASS);
        if (options.imageUrl) {
            Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_3__["getImageContainer"])(options.imageUrl).addClass(FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS).appendTo($container)
        }
        var $wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS).appendTo($container);
        var $commonText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS).text(options.commonText).appendTo($wrapper);
        return {
            $commonText: $commonText,
            $element: $container,
            $wrapper: $wrapper
        }
    }
}
class NotificationManagerStub extends NotificationManagerBase {
    addOperation() {
        return {
            [MANAGER_ID_NAME]: this._id
        }
    }
    addOperationDetails() {}
    updateOperationItemProgress() {}
    completeOperationItem() {}
    completeOperation() {}
    completeSingleOperationWithError() {}
    addOperationDetailsError() {}
    handleDimensionChanged() {
        return false
    }
    ensureProgressPanelCreated() {}
    tryHideActionProgress() {
        this._updateActionProgress("", ACTION_PROGRESS_STATUS.default)
    }
    updateActionProgressStatus() {
        this._updateActionProgress("", ACTION_PROGRESS_STATUS.default)
    }
    _updateActionProgress(message, status) {
        if (status !== ACTION_PROGRESS_STATUS.default && status !== ACTION_PROGRESS_STATUS.progress) {
            return
        }
        this._actionProgressStatus = status;
        this._raiseActionProgress(message, status)
    }
    hasNoOperations() {
        return true
    }
    get _operationInProgressCount() {
        return 0
    }
    set _operationInProgressCount(value) {}
    get _failedOperationCount() {
        return 0
    }
    set _failedOperationCount(value) {}
}
class NotificationManager extends NotificationManagerBase {
    constructor(options) {
        super(options);
        this._failedOperationCount = 0;
        this._operationInProgressCount = 0
    }
    addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
        this._operationInProgressCount++;
        var operationInfo = this._progressPanel.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate);
        operationInfo[MANAGER_ID_NAME] = this._id;
        this._updateActionProgress(processingMessage, ACTION_PROGRESS_STATUS.progress);
        return operationInfo
    }
    addOperationDetails(operationInfo, details, showCloseButton) {
        this._progressPanel.addOperationDetails(operationInfo, details, showCloseButton)
    }
    updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
        this._progressPanel.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress)
    }
    completeOperationItem(operationInfo, itemIndex, commonProgress) {
        this._progressPanel.completeOperationItem(operationInfo, itemIndex, commonProgress)
    }
    completeOperation(operationInfo, commonText, isError, statusText) {
        this._operationInProgressCount--;
        if (isError) {
            this._failedOperationCount++
        }
        this._progressPanel.completeOperation(operationInfo, commonText, isError, statusText)
    }
    completeSingleOperationWithError(operationInfo, errorInfo) {
        this._progressPanel.completeSingleOperationWithError(operationInfo, errorInfo.detailErrorText);
        this._notifyError(errorInfo)
    }
    addOperationDetailsError(operationInfo, errorInfo) {
        this._progressPanel.addOperationDetailsError(operationInfo, errorInfo.itemIndex, errorInfo.detailErrorText);
        this._notifyError(errorInfo)
    }
    handleDimensionChanged() {
        if (this._progressPanel) {
            this._progressPanel.$element().detach()
        }
        return true
    }
    ensureProgressPanelCreated(container, options) {
        if (!this._progressPanel) {
            var $progressPanelElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(container);
            var ProgressPanelClass = this._getProgressPanelComponent();
            this._progressPanel = new ProgressPanelClass($progressPanelElement, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, options, {
                onOperationClosed: _ref2 => {
                    var {
                        info: info
                    } = _ref2;
                    return this._onProgressPanelOperationClosed(info)
                }
            }))
        } else {
            this._progressPanel.$element().appendTo(container)
        }
    }
    _getProgressPanelComponent() {
        return _ui_file_manager_notification_progress_panel__WEBPACK_IMPORTED_MODULE_4__["default"]
    }
    _onProgressPanelOperationClosed(operationInfo) {
        if (operationInfo.hasError) {
            this._failedOperationCount--;
            this.tryHideActionProgress()
        }
    }
    tryHideActionProgress() {
        if (this.hasNoOperations()) {
            this._updateActionProgress("", ACTION_PROGRESS_STATUS.default)
        }
    }
    updateActionProgressStatus(operationInfo) {
        if (operationInfo) {
            var status = 0 === this._failedOperationCount ? ACTION_PROGRESS_STATUS.success : ACTION_PROGRESS_STATUS.error;
            this._updateActionProgress("", status)
        }
    }
    _notifyError(errorInfo) {
        var status = this.hasNoOperations() ? ACTION_PROGRESS_STATUS.default : ACTION_PROGRESS_STATUS.error;
        this._updateActionProgress(errorInfo.commonErrorText, status)
    }
    _updateActionProgress(message, status) {
        this._actionProgressStatus = status;
        this._raiseActionProgress(message, status)
    }
    hasNoOperations() {
        return 0 === this._operationInProgressCount && 0 === this._failedOperationCount
    }
    get _operationInProgressCount() {
        return this._operationInProgressCountInternal
    }
    set _operationInProgressCount(value) {
        this._operationInProgressCountInternal = value
    }
    get _failedOperationCount() {
        return this._failedOperationCountInternal
    }
    set _failedOperationCount(value) {
        this._failedOperationCountInternal = value
    }
}



/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.toolbar.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.toolbar.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.file_manager.common */ "./node_modules/devextreme/esm/ui/file_manager/ui.file_manager.common.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../toolbar */ "./node_modules/devextreme/esm/ui/toolbar.js");
/* harmony import */ var _drop_down_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../drop_down_button */ "./node_modules/devextreme/esm/ui/drop_down_button.js");
/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.toolbar.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var FILE_MANAGER_TOOLBAR_CLASS = "dx-filemanager-toolbar";
var FILE_MANAGER_GENERAL_TOOLBAR_CLASS = "dx-filemanager-general-toolbar";
var FILE_MANAGER_FILE_TOOLBAR_CLASS = "dx-filemanager-file-toolbar";
var FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS = FILE_MANAGER_TOOLBAR_CLASS + "-separator-item";
var FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS = FILE_MANAGER_TOOLBAR_CLASS + "-viewmode-item";
var FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS = FILE_MANAGER_TOOLBAR_CLASS + "-has-large-icon";
var FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS = "dx-filemanager-view-switcher-popup";
var DEFAULT_ITEM_CONFIGS = {
    showNavPane: {
        location: "before"
    },
    create: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    upload: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    refresh: {
        location: "after",
        showText: "inMenu",
        cssClass: FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS,
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    switchView: {
        location: "after"
    },
    download: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    move: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    copy: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    rename: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    delete: {
        location: "before",
        compactMode: {
            showText: "inMenu"
        }
    },
    clearSelection: {
        location: "after",
        locateInMenu: "never",
        compactMode: {
            showText: "inMenu"
        }
    },
    separator: {
        location: "before"
    }
};
var DEFAULT_ITEM_ALLOWED_PROPERTIES = ["visible", "location", "locateInMenu", "disabled", "showText"];
var DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES = ["accessKey", "elementAttr", "height", "hint", "icon", "stylingMode", "tabIndex", "text", "width"];
var ALWAYS_VISIBLE_TOOLBAR_ITEMS = ["separator", "switchView"];
var REFRESH_ICON_MAP = {
    default: "dx-filemanager-i dx-filemanager-i-refresh",
    progress: "dx-filemanager-i dx-filemanager-i-progress",
    success: "dx-filemanager-i dx-filemanager-i-done",
    error: "dx-filemanager-i dx-filemanager-i-danger"
};
var REFRESH_ITEM_PROGRESS_MESSAGE_DELAY = 500;
class FileManagerToolbar extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_7__["default"] {
    _init() {
        super._init();
        this._generalToolbarVisible = true;
        this._refreshItemState = {
            message: "",
            status: "default"
        }
    }
    _initMarkup() {
        this._createItemClickedAction();
        this._$viewSwitcherPopup = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS);
        this._generalToolbar = this._createToolbar(this.option("generalItems"), !this._generalToolbarVisible);
        this._fileToolbar = this._createToolbar(this.option("fileItems"), this._generalToolbarVisible);
        this._$viewSwitcherPopup.appendTo(this.$element());
        this.$element().addClass(FILE_MANAGER_TOOLBAR_CLASS + " " + FILE_MANAGER_GENERAL_TOOLBAR_CLASS)
    }
    _render() {
        super._render();
        var toolbar = this._getVisibleToolbar();
        this._checkCompactMode(toolbar)
    }
    _clean() {
        delete this._commandManager;
        delete this._itemClickedAction;
        delete this._$viewSwitcherPopup;
        delete this._generalToolbar;
        delete this._fileToolbar;
        super._clean()
    }
    _dimensionChanged(dimension) {
        if (!dimension || "height" !== dimension) {
            var toolbar = this._getVisibleToolbar();
            this._checkCompactMode(toolbar)
        }
    }
    _getVisibleToolbar() {
        return this._generalToolbarVisible ? this._generalToolbar : this._fileToolbar
    }
    _createToolbar(items, hidden) {
        var toolbarItems = this._getPreparedItems(items);
        var $toolbar = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(this.$element());
        var result = this._createComponent($toolbar, _toolbar__WEBPACK_IMPORTED_MODULE_8__["default"], {
            items: toolbarItems,
            visible: !hidden,
            onItemClick: args => this._raiseItemClicked(args)
        });
        result.compactMode = false;
        return result
    }
    _getPreparedItems(items) {
        items = items.map(item => {
            var extendedItem = item;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isString"])(item)) {
                extendedItem = {
                    name: item
                }
            }
            var commandName = extendedItem.name;
            var preparedItem = this._configureItemByCommandName(commandName, extendedItem);
            preparedItem.originalItemData = item;
            if ("separator" !== commandName) {
                this._setItemVisibleAvailable(preparedItem)
            }
            return preparedItem
        });
        this._updateSeparatorsVisibility(items);
        return items
    }
    _updateSeparatorsVisibility(items, toolbar) {
        var hasModifications = false;
        var menuItems = this._getMenuItems(toolbar);
        var hasItemsBefore = {
            before: false,
            center: false,
            after: false
        };
        var itemGroups = {
            before: this._getItemsInGroup(items, menuItems, "before"),
            center: this._getItemsInGroup(items, menuItems, "center"),
            after: this._getItemsInGroup(items, menuItems, "after")
        };
        items.forEach((item, i) => {
            var itemLocation = item.location;
            if ("separator" === item.name) {
                var isSeparatorVisible = hasItemsBefore[itemLocation] && this._groupHasItemsAfter(itemGroups[itemLocation]);
                if (item.visible !== isSeparatorVisible) {
                    hasModifications = true;
                    item.visible = isSeparatorVisible
                }
                hasItemsBefore[itemLocation] = false
            } else {
                if (!this._isItemInMenu(menuItems, item)) {
                    hasItemsBefore[itemLocation] = hasItemsBefore[itemLocation] || item.visible
                }
                itemGroups[itemLocation].shift()
            }
        });
        if (toolbar && hasModifications) {
            toolbar.repaint()
        }
        return hasModifications
    }
    _getMenuItems(toolbar) {
        var result = toolbar ? toolbar._getMenuItems() : [];
        return result.map(menuItem => menuItem.originalItemData)
    }
    _isItemInMenu(menuItems, item) {
        return !!menuItems.length && "never" !== Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(item.locateInMenu, "never") && -1 !== menuItems.indexOf(item.originalItemData)
    }
    _getItemsInGroup(items, menuItems, groupName) {
        return items.filter(item => item.location === groupName && !this._isItemInMenu(menuItems, item))
    }
    _groupHasItemsAfter(items) {
        for (var i = 0; i < items.length; i++) {
            if ("separator" !== items[i].name && items[i].visible) {
                return true
            }
        }
        return false
    }
    _configureItemByCommandName(commandName, item) {
        var _result$options;
        var result = {};
        var command = this._commandManager.getCommandByName(commandName);
        if (command) {
            result = this._createCommandItem(command)
        }
        switch (commandName) {
            case "separator":
                result = this._createSeparatorItem();
                break;
            case "switchView":
                result = this._createViewModeItem()
        }
        if (this._isDefaultItem(commandName)) {
            var defaultConfig = DEFAULT_ITEM_CONFIGS[commandName];
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, result, defaultConfig);
            var resultCssClass = result.cssClass || "";
            Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__["extendAttributes"])(result, item, DEFAULT_ITEM_ALLOWED_PROPERTIES);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(item.options)) {
                Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__["extendAttributes"])(result.options, item.options, DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES)
            }
            Object(_ui_file_manager_common__WEBPACK_IMPORTED_MODULE_6__["extendAttributes"])(result.options, item, ["text", "icon"]);
            if (item.cssClass) {
                resultCssClass = "".concat(resultCssClass, " ").concat(item.cssClass)
            }
            if (resultCssClass) {
                result.cssClass = resultCssClass
            }
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(item.visible)) {
                result._autoHide = true
            }
            if ("dxButton" === result.widget) {
                if ("inMenu" === result.showText && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(result.options.hint)) {
                    result.options.hint = result.options.text
                }
                if (result.compactMode && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(result.options.hint)) {
                    this._configureHintForCompactMode(result)
                }
            }
        } else {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, result, item);
            if (!result.widget) {
                result.widget = "dxButton"
            }
            if ("dxButton" === result.widget && !result.compactMode && !result.showText && result.options && result.options.icon && result.options.text) {
                result.compactMode = {
                    showText: "inMenu"
                }
            }
        }
        if (commandName && !result.name) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(result, {
                name: commandName
            })
        }
        result.location = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(result.location, "before");
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(null === (_result$options = result.options) || void 0 === _result$options ? void 0 : _result$options.stylingMode)) {
            if ("dxButton" === result.widget) {
                Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, result, {
                    options: {
                        stylingMode: "text"
                    }
                })
            }
            if ("dxSelectBox" === result.widget) {
                Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, result, {
                    options: {
                        stylingMode: "filled"
                    }
                })
            }
        }
        return result
    }
    _isDefaultItem(commandName) {
        return !!DEFAULT_ITEM_CONFIGS[commandName]
    }
    _createCommandItem(command) {
        return {
            widget: "dxButton",
            options: {
                text: command.text,
                hint: command.hint,
                commandText: command.text,
                icon: command.icon,
                stylingMode: "text",
                onClick: e => this._executeCommand(command)
            }
        }
    }
    _createSeparatorItem() {
        return {
            template: (data, index, element) => {
                Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element).addClass(FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS)
            }
        }
    }
    _createViewModeItem() {
        var commandItems = ["details", "thumbnails"].map(name => {
            var {
                text: text,
                icon: icon
            } = this._commandManager.getCommandByName(name);
            return {
                name: name,
                text: text,
                icon: icon
            }
        });
        var selectedIndex = "thumbnails" === this.option("itemViewMode") ? 1 : 0;
        return {
            cssClass: FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS,
            widget: "dxDropDownButton",
            options: {
                items: commandItems,
                keyExpr: "name",
                selectedItemKey: this.option("itemViewMode"),
                displayExpr: " ",
                hint: commandItems[selectedIndex].text,
                stylingMode: "text",
                showArrowIcon: false,
                useSelectMode: true,
                dropDownOptions: {
                    container: this._$viewSwitcherPopup
                },
                onItemClick: e => this._executeCommand(e.itemData.name)
            }
        }
    }
    _configureHintForCompactMode(item) {
        item.options.hint = "";
        item.compactMode.options = item.compactMode.options || {};
        item.compactMode.options.hint = item.options.text
    }
    _checkCompactMode(toolbar) {
        if (toolbar.compactMode) {
            this._toggleCompactMode(toolbar, false)
        }
        var useCompactMode = this._toolbarHasItemsOverflow(toolbar);
        if (toolbar.compactMode !== useCompactMode) {
            if (!toolbar.compactMode) {
                this._toggleCompactMode(toolbar, useCompactMode)
            }
            toolbar.compactMode = useCompactMode
        } else if (toolbar.compactMode) {
            this._toggleCompactMode(toolbar, true)
        }
    }
    _toolbarHasItemsOverflow(toolbar) {
        var toolbarWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(toolbar.$element());
        var itemsWidth = toolbar._getItemsWidth();
        return toolbarWidth < itemsWidth
    }
    _toggleCompactMode(toolbar, useCompactMode) {
        var hasModifications = false;
        var items = toolbar.option("items");
        items.forEach(item => {
            if (item.compactMode) {
                var optionsSource = null;
                if (useCompactMode) {
                    item.saved = this._getCompactModeOptions(item, item._available);
                    optionsSource = item.compactMode
                } else {
                    optionsSource = item.saved
                }
                var options = this._getCompactModeOptions(optionsSource, item._available);
                Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, item, options);
                hasModifications = true
            }
        });
        hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
        if (hasModifications) {
            toolbar.repaint()
        }
        this._updateSeparatorsVisibility(items, toolbar)
    }
    _getCompactModeOptions(_ref, available) {
        var {
            showText: showText,
            locateInMenu: locateInMenu,
            options: options
        } = _ref;
        return {
            visible: available,
            showText: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(showText, "always"),
            locateInMenu: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(locateInMenu, "never"),
            options: {
                hint: null === options || void 0 === options ? void 0 : options.hint
            }
        }
    }
    _ensureAvailableCommandsVisible(toolbar) {
        var hasModifications = false;
        var items = toolbar.option("items");
        items.forEach(item => {
            if ("separator" !== item.name) {
                var itemVisible = item._available;
                this._setItemVisibleAvailable(item);
                if (item._available !== itemVisible) {
                    hasModifications = true
                }
            }
        });
        hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
        if (hasModifications) {
            toolbar.repaint()
        }
        this._updateSeparatorsVisibility(items, toolbar)
    }
    _setItemVisibleAvailable(item) {
        var _item$originalItemDat;
        var originalVisible = null === (_item$originalItemDat = item.originalItemData) || void 0 === _item$originalItemDat ? void 0 : _item$originalItemDat.visible;
        item._available = this._isToolbarItemAvailable(item);
        item.visible = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(originalVisible) ? originalVisible : item._available
    }
    _fileToolbarHasEffectiveItems() {
        var items = this._fileToolbar.option("items");
        return items.some(item => this._isFileToolbarItemAvailable(item))
    }
    _executeCommand(command) {
        this._commandManager.executeCommand(command)
    }
    _isToolbarItemAvailable(toolbarItem) {
        if (!this._isDefaultItem(toolbarItem.name) || !toolbarItem._autoHide) {
            return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(toolbarItem.visible, true)
        }
        if ("refresh" === toolbarItem.name) {
            return this._generalToolbarVisible || !!this._isRefreshVisibleInFileToolbar
        }
        if (ALWAYS_VISIBLE_TOOLBAR_ITEMS.indexOf(toolbarItem.name) > -1) {
            return true
        }
        return this._isCommandAvailable(toolbarItem.name)
    }
    _isFileToolbarItemAvailable(_ref2) {
        var {
            name: name,
            visible: visible
        } = _ref2;
        return !this._isDefaultItem(name) && Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["ensureDefined"])(visible, true) || "clearSelection" !== name && "refresh" !== name && this._isCommandAvailable(name)
    }
    _isCommandAvailable(name) {
        return this._commandManager.isCommandAvailable(name, this.option("contextItems"))
    }
    _updateItemInToolbar(toolbar, commandName, options) {
        toolbar.beginUpdate();
        var items = toolbar.option("items");
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.name === commandName) {
                toolbar.option("items[".concat(i, "]"), options);
                break
            }
        }
        toolbar.endUpdate()
    }
    _raiseItemClicked(args) {
        var changedArgs = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, args);
        changedArgs.itemData = args.itemData.originalItemData;
        this._itemClickedAction(changedArgs)
    }
    _createItemClickedAction() {
        this._itemClickedAction = this._createActionByOption("onItemClick")
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(super._getDefaultOptions(), {
            commandManager: null,
            generalItems: [],
            fileItems: [],
            contextItems: [],
            itemViewMode: "details",
            onItemClick: null
        })
    }
    _optionChanged(args) {
        var name = args.name;
        switch (name) {
            case "commandManager":
            case "itemViewMode":
            case "generalItems":
            case "fileItems":
                this.repaint();
                break;
            case "contextItems":
                this._update();
                break;
            case "onItemClick":
                this._itemClickedAction = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    updateItemPermissions() {
        this.repaint();
        this._restoreRefreshItemState()
    }
    _restoreRefreshItemState() {
        this.updateRefreshItem(this._refreshItemState.message, this._refreshItemState.status)
    }
    updateRefreshItem(message, status) {
        var generalToolbarOptions = null;
        var text = _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("dxFileManager-commandRefresh");
        var showText = "inMenu";
        this._isRefreshVisibleInFileToolbar = false;
        this._refreshItemState = {
            message: message,
            status: status
        };
        if ("default" === status) {
            generalToolbarOptions = {
                options: {
                    icon: REFRESH_ICON_MAP.default
                }
            }
        } else {
            generalToolbarOptions = {
                options: {
                    icon: REFRESH_ICON_MAP[status]
                }
            };
            this._isRefreshVisibleInFileToolbar = true;
            text = message;
            showText = "always"
        }
        var fileToolbarOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, generalToolbarOptions, {
            visible: this._isRefreshVisibleInFileToolbar
        });
        this._applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions);
        this._refreshItemTextTimeout = this._updateRefreshItemText("progress" === status, text, showText)
    }
    _updateRefreshItemText(isDeferredUpdate, text, showText) {
        var options = {
            showText: showText,
            options: {
                text: text
            }
        };
        if (isDeferredUpdate) {
            return setTimeout(() => {
                this._applyRefreshItemOptions(options);
                this._refreshItemTextTimeout = void 0
            }, REFRESH_ITEM_PROGRESS_MESSAGE_DELAY)
        } else {
            if (this._refreshItemTextTimeout) {
                clearTimeout(this._refreshItemTextTimeout)
            }
            this._applyRefreshItemOptions(options);
            return
        }
    }
    _applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions) {
        if (!fileToolbarOptions) {
            fileToolbarOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, generalToolbarOptions)
        }
        this._updateItemInToolbar(this._generalToolbar, "refresh", generalToolbarOptions);
        this._updateItemInToolbar(this._fileToolbar, "refresh", fileToolbarOptions)
    }
    _update() {
        var showGeneralToolbar = 0 === this.option("contextItems").length || !this._fileToolbarHasEffectiveItems();
        if (this._generalToolbarVisible !== showGeneralToolbar) {
            this._generalToolbar.option("visible", showGeneralToolbar);
            this._fileToolbar.option("visible", !showGeneralToolbar);
            this._generalToolbarVisible = showGeneralToolbar;
            this.$element().toggleClass(FILE_MANAGER_GENERAL_TOOLBAR_CLASS, showGeneralToolbar);
            this.$element().toggleClass(FILE_MANAGER_FILE_TOOLBAR_CLASS, !showGeneralToolbar)
        }
        var toolbar = this._getVisibleToolbar();
        this._ensureAvailableCommandsVisible(toolbar);
        this._checkCompactMode(toolbar)
    }
    get _commandManager() {
        return this.option("commandManager")
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FileManagerToolbar);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/file_uploader.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/file_uploader.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_ajax__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/utils/ajax */ "./node_modules/devextreme/esm/core/utils/ajax.js");
/* harmony import */ var _editor_editor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./editor/editor */ "./node_modules/devextreme/esm/ui/editor/editor.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./button */ "./node_modules/devextreme/esm/ui/button.js");
/* harmony import */ var _progress_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./progress_bar */ "./node_modules/devextreme/esm/ui/progress_bar.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/**
 * DevExtreme (esm/ui/file_uploader.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






















var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_3__["getWindow"])();
var FILEUPLOADER_CLASS = "dx-fileuploader";
var FILEUPLOADER_EMPTY_CLASS = "dx-fileuploader-empty";
var FILEUPLOADER_SHOW_FILE_LIST_CLASS = "dx-fileuploader-show-file-list";
var FILEUPLOADER_DRAGOVER_CLASS = "dx-fileuploader-dragover";
var FILEUPLOADER_WRAPPER_CLASS = "dx-fileuploader-wrapper";
var FILEUPLOADER_CONTAINER_CLASS = "dx-fileuploader-container";
var FILEUPLOADER_CONTENT_CLASS = "dx-fileuploader-content";
var FILEUPLOADER_INPUT_WRAPPER_CLASS = "dx-fileuploader-input-wrapper";
var FILEUPLOADER_INPUT_CONTAINER_CLASS = "dx-fileuploader-input-container";
var FILEUPLOADER_INPUT_LABEL_CLASS = "dx-fileuploader-input-label";
var FILEUPLOADER_INPUT_CLASS = "dx-fileuploader-input";
var FILEUPLOADER_FILES_CONTAINER_CLASS = "dx-fileuploader-files-container";
var FILEUPLOADER_FILE_CONTAINER_CLASS = "dx-fileuploader-file-container";
var FILEUPLOADER_FILE_INFO_CLASS = "dx-fileuploader-file-info";
var FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS = "dx-fileuploader-file-status-message";
var FILEUPLOADER_FILE_CLASS = "dx-fileuploader-file";
var FILEUPLOADER_FILE_NAME_CLASS = "dx-fileuploader-file-name";
var FILEUPLOADER_FILE_SIZE_CLASS = "dx-fileuploader-file-size";
var FILEUPLOADER_BUTTON_CLASS = "dx-fileuploader-button";
var FILEUPLOADER_BUTTON_CONTAINER_CLASS = "dx-fileuploader-button-container";
var FILEUPLOADER_CANCEL_BUTTON_CLASS = "dx-fileuploader-cancel-button";
var FILEUPLOADER_UPLOAD_BUTTON_CLASS = "dx-fileuploader-upload-button";
var FILEUPLOADER_INVALID_CLASS = "dx-fileuploader-invalid";
var FILEUPLOADER_AFTER_LOAD_DELAY = 400;
var FILEUPLOADER_CHUNK_META_DATA_NAME = "chunkMetadata";
var renderFileUploaderInput = () => Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<input>").attr("type", "file");
var isFormDataSupported = () => !!window.FormData;
class FileUploader extends _editor_editor__WEBPACK_IMPORTED_MODULE_13__["default"] {
    _supportedKeys() {
        var click = e => {
            e.preventDefault();
            var $selectButton = this._selectButton.$element();
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].trigger($selectButton, _events_click__WEBPACK_IMPORTED_MODULE_18__["name"])
        };
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(super._supportedKeys(), {
            space: click,
            enter: click
        })
    }
    _setOptionsByReference() {
        super._setOptionsByReference();
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this._optionsByReference, {
            value: true
        })
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(super._getDefaultOptions(), {
            chunkSize: 0,
            value: [],
            selectButtonText: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-selectFile"),
            uploadButtonText: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-upload"),
            labelText: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-dropFile"),
            name: "files[]",
            multiple: false,
            accept: "",
            uploadUrl: "/",
            allowCanceling: true,
            showFileList: true,
            progress: 0,
            dialogTrigger: void 0,
            dropZone: void 0,
            readyToUploadMessage: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-readyToUpload"),
            uploadedMessage: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-uploaded"),
            uploadFailedMessage: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-uploadFailedMessage"),
            uploadAbortedMessage: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-uploadAbortedMessage"),
            uploadMode: "instantly",
            uploadMethod: "POST",
            uploadHeaders: {},
            uploadCustomData: {},
            onBeforeSend: null,
            onUploadStarted: null,
            onUploaded: null,
            onFilesUploaded: null,
            onProgress: null,
            onUploadError: null,
            onUploadAborted: null,
            onDropZoneEnter: null,
            onDropZoneLeave: null,
            allowedFileExtensions: [],
            maxFileSize: 0,
            minFileSize: 0,
            inputAttr: {},
            invalidFileExtensionMessage: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-invalidFileExtension"),
            invalidMaxFileSizeMessage: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-invalidMaxFileSize"),
            invalidMinFileSizeMessage: _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-invalidMinFileSize"),
            extendSelection: true,
            validationMessageMode: "always",
            uploadFile: null,
            uploadChunk: null,
            abortUpload: null,
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            hoverStateEnabled: true,
            useNativeInputClick: false,
            useDragOver: true,
            nativeDropSupported: true,
            _uploadButtonType: "normal"
        })
    }
    _defaultOptionsRules() {
        return super._defaultOptionsRules().concat([{
            device: () => "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].real().deviceType && !_core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }, {
            device: [{
                platform: "android"
            }],
            options: {
                validationMessageOffset: {
                    v: 0
                }
            }
        }, {
            device: () => "desktop" !== _core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].real().deviceType,
            options: {
                useDragOver: false
            }
        }, {
            device: () => !isFormDataSupported(),
            options: {
                uploadMode: "useForm"
            }
        }, {
            device: () => "desktop" !== _core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].real().deviceType,
            options: {
                nativeDropSupported: false
            }
        }, {
            device: () => Object(_themes__WEBPACK_IMPORTED_MODULE_20__["isMaterial"])(),
            options: {
                _uploadButtonType: "default"
            }
        }])
    }
    _initOptions(options) {
        var isLabelTextDefined = "labelText" in options;
        super._initOptions(options);
        if (!isLabelTextDefined && !this._shouldDragOverBeRendered()) {
            this.option("labelText", "")
        }
    }
    _init() {
        super._init();
        this._initFileInput();
        this._initLabel();
        this._setUploadStrategy();
        this._createFiles();
        this._createBeforeSendAction();
        this._createUploadStartedAction();
        this._createUploadedAction();
        this._createFilesUploadedAction();
        this._createProgressAction();
        this._createUploadErrorAction();
        this._createUploadAbortedAction();
        this._createDropZoneEnterAction();
        this._createDropZoneLeaveAction()
    }
    _setUploadStrategy() {
        var strategy = null;
        if (this.option("chunkSize") > 0) {
            var uploadChunk = this.option("uploadChunk");
            strategy = uploadChunk && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(uploadChunk) ? new CustomChunksFileUploadStrategy(this) : new DefaultChunksFileUploadStrategy(this)
        } else {
            var uploadFile = this.option("uploadFile");
            strategy = uploadFile && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(uploadFile) ? new CustomWholeFileUploadStrategy(this) : new DefaultWholeFileUploadStrategy(this)
        }
        this._uploadStrategy = strategy
    }
    _initFileInput() {
        this._isCustomClickEvent = false;
        if (!this._$fileInput) {
            this._$fileInput = renderFileUploaderInput();
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(this._$fileInput, "change", this._inputChangeHandler.bind(this));
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(this._$fileInput, "click", e => {
                e.stopPropagation();
                this._resetInputValue();
                return this.option("useNativeInputClick") || this._isCustomClickEvent
            })
        }
        this._$fileInput.prop({
            multiple: this.option("multiple"),
            accept: this.option("accept"),
            tabIndex: -1
        })
    }
    _inputChangeHandler() {
        if (this._doPreventInputChange) {
            return
        }
        var fileName = this._$fileInput.val().replace(/^.*\\/, "");
        var files = this._$fileInput.prop("files");
        if (files && !files.length && "useForm" !== this.option("uploadMode")) {
            return
        }
        var value = files ? this._getFiles(files) : [{
            name: fileName
        }];
        this._changeValue(value);
        if ("instantly" === this.option("uploadMode")) {
            this._uploadFiles()
        }
    }
    _shouldFileListBeExtended() {
        return "useForm" !== this.option("uploadMode") && this.option("extendSelection") && this.option("multiple")
    }
    _changeValue(value) {
        var files = this._shouldFileListBeExtended() ? this.option("value").slice() : [];
        this.option("value", files.concat(value))
    }
    _getFiles(fileList) {
        var values = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(fileList, (_, value) => values.push(value));
        return values
    }
    _getFile(fileData) {
        var targetFileValue = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isNumeric"])(fileData) ? this.option("value")[fileData] : fileData;
        return this._files.filter(file => file.value === targetFileValue)[0]
    }
    _initLabel() {
        if (!this._$inputLabel) {
            this._$inputLabel = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>")
        }
        this._updateInputLabelText()
    }
    _updateInputLabelText() {
        var correctedValue = this._isInteractionDisabled() ? "" : this.option("labelText");
        this._$inputLabel.text(correctedValue)
    }
    _focusTarget() {
        return this.$element().find("." + FILEUPLOADER_BUTTON_CLASS)
    }
    _getSubmitElement() {
        return this._$fileInput
    }
    _initMarkup() {
        super._initMarkup();
        this.$element().addClass(FILEUPLOADER_CLASS);
        this._renderWrapper();
        this._renderInputWrapper();
        this._renderSelectButton();
        this._renderInputContainer();
        this._renderUploadButton();
        this._preventRecreatingFiles = true;
        this._activeDropZone = null
    }
    _render() {
        this._preventRecreatingFiles = false;
        this._attachDragEventHandlers(this._$inputWrapper);
        this._attachDragEventHandlers(this.option("dropZone"));
        this._renderFiles();
        super._render()
    }
    _createFileProgressBar(file) {
        file.progressBar = this._createProgressBar(file.value.size);
        file.progressBar.$element().appendTo(file.$file);
        this._initStatusMessage(file);
        this._ensureCancelButtonInitialized(file)
    }
    _setStatusMessage(file, message) {
        setTimeout(() => {
            if (this.option("showFileList")) {
                if (file.$statusMessage) {
                    file.$statusMessage.text(message);
                    file.$statusMessage.css("display", "");
                    file.progressBar.$element().remove()
                }
            }
        }, FILEUPLOADER_AFTER_LOAD_DELAY)
    }
    _getUploadAbortedStatusMessage() {
        return "instantly" === this.option("uploadMode") ? this.option("uploadAbortedMessage") : this.option("readyToUploadMessage")
    }
    _createFiles() {
        var value = this.option("value");
        if (this._files && (0 === value.length || !this._shouldFileListBeExtended())) {
            this._preventFilesUploading(this._files);
            this._files = null
        }
        if (!this._files) {
            this._files = []
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(value.slice(this._files.length), (_, value) => {
            var file = this._createFile(value);
            this._validateFile(file);
            this._files.push(file)
        })
    }
    _preventFilesUploading(files) {
        files.forEach(file => this._uploadStrategy.abortUpload(file))
    }
    _validateFile(file) {
        file.isValidFileExtension = this._validateFileExtension(file);
        file.isValidMinSize = this._validateMinFileSize(file);
        file.isValidMaxSize = this._validateMaxFileSize(file)
    }
    _validateFileExtension(file) {
        var allowedExtensions = this.option("allowedFileExtensions");
        var accept = this.option("accept");
        var allowedTypes = this._getAllowedFileTypes(accept);
        var fileExtension = file.value.name.substring(file.value.name.lastIndexOf(".")).toLowerCase();
        if (0 !== accept.length && !this._isFileTypeAllowed(file.value, allowedTypes)) {
            return false
        }
        if (0 === allowedExtensions.length) {
            return true
        }
        for (var i = 0; i < allowedExtensions.length; i++) {
            if (fileExtension === allowedExtensions[i].toLowerCase()) {
                return true
            }
        }
        return false
    }
    _validateMaxFileSize(file) {
        var fileSize = file.value.size;
        var maxFileSize = this.option("maxFileSize");
        return maxFileSize > 0 ? fileSize <= maxFileSize : true
    }
    _validateMinFileSize(file) {
        var fileSize = file.value.size;
        var minFileSize = this.option("minFileSize");
        return minFileSize > 0 ? fileSize >= minFileSize : true
    }
    _createBeforeSendAction() {
        this._beforeSendAction = this._createActionByOption("onBeforeSend", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadStartedAction() {
        this._uploadStartedAction = this._createActionByOption("onUploadStarted", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadedAction() {
        this._uploadedAction = this._createActionByOption("onUploaded", {
            excludeValidators: ["readOnly"]
        })
    }
    _createFilesUploadedAction() {
        this._filesUploadedAction = this._createActionByOption("onFilesUploaded", {
            excludeValidators: ["readOnly"]
        })
    }
    _createProgressAction() {
        this._progressAction = this._createActionByOption("onProgress", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadAbortedAction() {
        this._uploadAbortedAction = this._createActionByOption("onUploadAborted", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadErrorAction() {
        this._uploadErrorAction = this._createActionByOption("onUploadError", {
            excludeValidators: ["readOnly"]
        })
    }
    _createDropZoneEnterAction() {
        this._dropZoneEnterAction = this._createActionByOption("onDropZoneEnter")
    }
    _createDropZoneLeaveAction() {
        this._dropZoneLeaveAction = this._createActionByOption("onDropZoneLeave")
    }
    _createFile(value) {
        return {
            value: value,
            loadedSize: 0,
            onProgress: Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"])(),
            onAbort: Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"])(),
            onLoad: Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"])(),
            onError: Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"])(),
            onLoadStart: Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"])(),
            isValidFileExtension: true,
            isValidMaxSize: true,
            isValidMinSize: true,
            isValid() {
                return this.isValidFileExtension && this.isValidMaxSize && this.isValidMinSize
            },
            isInitialized: false
        }
    }
    _resetFileState(file) {
        file.isAborted = false;
        file.uploadStarted = false;
        file.isStartLoad = false;
        file.loadedSize = 0;
        file.chunksData = void 0;
        file.request = void 0
    }
    _renderFiles() {
        var _this$_validationMess;
        var value = this.option("value");
        if (!this._$filesContainer) {
            this._$filesContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_FILES_CONTAINER_CLASS).appendTo(this._$content)
        } else if (!this._shouldFileListBeExtended() || 0 === value.length) {
            this._$filesContainer.empty()
        }
        var showFileList = this.option("showFileList");
        if (showFileList) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(this._files, (_, file) => {
                if (!file.$file) {
                    this._renderFile(file)
                }
            })
        }
        this.$element().toggleClass(FILEUPLOADER_SHOW_FILE_LIST_CLASS, showFileList);
        this._toggleFileUploaderEmptyClassName();
        this._updateFileNameMaxWidth();
        null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess ? void 0 : _this$_validationMess.repaint()
    }
    _renderFile(file) {
        var value = file.value;
        var $fileContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_FILE_CONTAINER_CLASS).appendTo(this._$filesContainer);
        this._renderFileButtons(file, $fileContainer);
        file.$file = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_FILE_CLASS).appendTo($fileContainer);
        var $fileInfo = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_FILE_INFO_CLASS).appendTo(file.$file);
        file.$statusMessage = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).appendTo(file.$file);
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_FILE_NAME_CLASS).text(value.name).appendTo($fileInfo);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(value.size)) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_FILE_SIZE_CLASS).text(this._getFileSize(value.size)).appendTo($fileInfo)
        }
        if (file.isValid()) {
            file.$statusMessage.text(this.option("readyToUploadMessage"))
        } else {
            if (!file.isValidFileExtension) {
                file.$statusMessage.append(this._createValidationElement("invalidFileExtensionMessage"))
            }
            if (!file.isValidMaxSize) {
                file.$statusMessage.append(this._createValidationElement("invalidMaxFileSizeMessage"))
            }
            if (!file.isValidMinSize) {
                file.$statusMessage.append(this._createValidationElement("invalidMinFileSizeMessage"))
            }
            $fileContainer.addClass(FILEUPLOADER_INVALID_CLASS)
        }
    }
    _createValidationElement(key) {
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<span>").text(this.option(key))
    }
    _updateFileNameMaxWidth() {
        var cancelButtonsCount = this.option("allowCanceling") && "useForm" !== this.option("uploadMode") ? 1 : 0;
        var uploadButtonsCount = "useButtons" === this.option("uploadMode") ? 1 : 0;
        var filesContainerWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._$filesContainer.find("." + FILEUPLOADER_FILE_CONTAINER_CLASS).first()) || Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._$filesContainer);
        var $buttonContainer = this._$filesContainer.find("." + FILEUPLOADER_BUTTON_CONTAINER_CLASS).eq(0);
        var buttonsWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])($buttonContainer) * (cancelButtonsCount + uploadButtonsCount);
        var $fileSize = this._$filesContainer.find("." + FILEUPLOADER_FILE_SIZE_CLASS).eq(0);
        var prevFileSize = $fileSize.text();
        $fileSize.text("1000 Mb");
        var fileSizeWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])($fileSize);
        $fileSize.text(prevFileSize);
        this._$filesContainer.find("." + FILEUPLOADER_FILE_NAME_CLASS).css("maxWidth", filesContainerWidth - buttonsWidth - fileSizeWidth)
    }
    _renderFileButtons(file, $container) {
        var $cancelButton = this._getCancelButton(file);
        $cancelButton && $container.append($cancelButton);
        var $uploadButton = this._getUploadButton(file);
        $uploadButton && $container.append($uploadButton)
    }
    _getCancelButton(file) {
        if ("useForm" === this.option("uploadMode")) {
            return null
        }
        file.cancelButton = this._createComponent(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_BUTTON_CLASS + " " + FILEUPLOADER_CANCEL_BUTTON_CLASS), _button__WEBPACK_IMPORTED_MODULE_14__["default"], {
            onClick: () => this._removeFile(file),
            icon: "close",
            visible: this.option("allowCanceling"),
            disabled: this.option("readOnly"),
            integrationOptions: {},
            hoverStateEnabled: this.option("hoverStateEnabled")
        });
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.cancelButton.$element())
    }
    _getUploadButton(file) {
        if (!file.isValid() || "useButtons" !== this.option("uploadMode")) {
            return null
        }
        file.uploadButton = this._createComponent(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_BUTTON_CLASS + " " + FILEUPLOADER_UPLOAD_BUTTON_CLASS), _button__WEBPACK_IMPORTED_MODULE_14__["default"], {
            onClick: () => this._uploadFile(file),
            icon: "upload",
            hoverStateEnabled: this.option("hoverStateEnabled")
        });
        file.onLoadStart.add(() => file.uploadButton.option({
            visible: false,
            disabled: true
        }));
        file.onAbort.add(() => file.uploadButton.option({
            visible: true,
            disabled: false
        }));
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.uploadButton.$element())
    }
    _removeFile(file) {
        var _file$$file;
        null === (_file$$file = file.$file) || void 0 === _file$$file ? void 0 : _file$$file.parent().remove();
        this._files.splice(Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["inArray"])(file, this._files), 1);
        var value = this.option("value").slice();
        value.splice(Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["inArray"])(file.value, value), 1);
        this._preventRecreatingFiles = true;
        this.option("value", value);
        this._preventRecreatingFiles = false;
        this._toggleFileUploaderEmptyClassName();
        this._resetInputValue(true)
    }
    removeFile(fileData) {
        if ("useForm" === this.option("uploadMode") || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(fileData)) {
            return
        }
        var file = this._getFile(fileData);
        if (file) {
            if (file.uploadStarted) {
                this._preventFilesUploading([file])
            }
            this._removeFile(file)
        }
    }
    _toggleFileUploaderEmptyClassName() {
        this.$element().toggleClass(FILEUPLOADER_EMPTY_CLASS, !this._files.length || this._hasInvalidFile(this._files))
    }
    _hasInvalidFile(files) {
        for (var i = 0; i < files.length; i++) {
            if (!files[i].isValid()) {
                return true
            }
        }
        return false
    }
    _getFileSize(size) {
        var i = 0;
        var labels = [_localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-bytes"), _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-kb"), _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-Mb"), _localization_message__WEBPACK_IMPORTED_MODULE_19__["default"].format("dxFileUploader-Gb")];
        var count = labels.length - 1;
        while (i < count && size >= 1024) {
            size /= 1024;
            i++
        }
        return Math.round(size) + " " + labels[i]
    }
    _renderSelectButton() {
        var $button = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_BUTTON_CLASS).appendTo(this._$inputWrapper);
        this._selectButton = this._createComponent($button, _button__WEBPACK_IMPORTED_MODULE_14__["default"], {
            text: this.option("selectButtonText"),
            focusStateEnabled: false,
            integrationOptions: {},
            disabled: this.option("readOnly"),
            hoverStateEnabled: this.option("hoverStateEnabled")
        });
        this._selectFileDialogHandler = this._selectButtonClickHandler.bind(this);
        if ("desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].real().deviceType) {
            this._selectButton.option("onClick", this._selectFileDialogHandler)
        } else {
            this._attachSelectFileDialogHandler(this._selectButton.$element())
        }
        this._attachSelectFileDialogHandler(this.option("dialogTrigger"))
    }
    _selectButtonClickHandler() {
        if (this.option("useNativeInputClick")) {
            return
        }
        if (this._isInteractionDisabled()) {
            return false
        }
        this._isCustomClickEvent = true;
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].trigger(this._$fileInput, "click");
        this._isCustomClickEvent = false
    }
    _attachSelectFileDialogHandler(target) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(target)) {
            return
        }
        this._detachSelectFileDialogHandler(target);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target), "click", this._selectFileDialogHandler)
    }
    _detachSelectFileDialogHandler(target) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(target)) {
            return
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].off(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target), "click", this._selectFileDialogHandler)
    }
    _renderUploadButton() {
        if ("useButtons" !== this.option("uploadMode")) {
            return
        }
        var $uploadButton = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_BUTTON_CLASS).addClass(FILEUPLOADER_UPLOAD_BUTTON_CLASS).appendTo(this._$content);
        this._uploadButton = this._createComponent($uploadButton, _button__WEBPACK_IMPORTED_MODULE_14__["default"], {
            text: this.option("uploadButtonText"),
            onClick: this._uploadButtonClickHandler.bind(this),
            type: this.option("_uploadButtonType"),
            integrationOptions: {},
            hoverStateEnabled: this.option("hoverStateEnabled")
        })
    }
    _uploadButtonClickHandler() {
        this._uploadFiles()
    }
    _shouldDragOverBeRendered() {
        return !this.option("readOnly") && ("useForm" !== this.option("uploadMode") || this.option("nativeDropSupported"))
    }
    _isInteractionDisabled() {
        return this.option("readOnly") || this.option("disabled")
    }
    _renderInputContainer() {
        this._$inputContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_INPUT_CONTAINER_CLASS).appendTo(this._$inputWrapper);
        this._$fileInput.addClass(FILEUPLOADER_INPUT_CLASS);
        this._renderInput();
        var labelId = "dx-fileuploader-input-label-".concat(new _core_guid__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this._$inputLabel.attr("id", labelId).addClass(FILEUPLOADER_INPUT_LABEL_CLASS).appendTo(this._$inputContainer);
        this.setAria("labelledby", labelId, this._$fileInput)
    }
    _renderInput() {
        if (this.option("useNativeInputClick")) {
            this._selectButton.option("template", this._selectButtonInputTemplate.bind(this))
        } else {
            this._$fileInput.appendTo(this._$inputContainer);
            this._selectButton.option("template", "content")
        }
        this._applyInputAttributes(this.option("inputAttr"))
    }
    _selectButtonInputTemplate(data, content) {
        var $content = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(content);
        var $text = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<span>").addClass("dx-button-text").text(data.text);
        $content.append($text).append(this._$fileInput);
        return $content
    }
    _renderInputWrapper() {
        this._$inputWrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_INPUT_WRAPPER_CLASS).appendTo(this._$content)
    }
    _detachDragEventHandlers(target) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(target)) {
            return
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].off(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target), Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("", this.NAME))
    }
    _attachDragEventHandlers(target) {
        var isCustomTarget = target !== this._$inputWrapper;
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(target) || !this._shouldDragOverBeRendered()) {
            return
        }
        this._detachDragEventHandlers(target);
        target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(target, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("dragenter", this.NAME), this._dragEnterHandler.bind(this, isCustomTarget));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(target, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("dragover", this.NAME), this._dragOverHandler.bind(this, isCustomTarget));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(target, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("dragleave", this.NAME), this._dragLeaveHandler.bind(this, isCustomTarget));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on(target, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["addNamespace"])("drop", this.NAME), this._dropHandler.bind(this, isCustomTarget))
    }
    _applyInputAttributes(customAttributes) {
        this._$fileInput.attr(customAttributes)
    }
    _useInputForDrop() {
        return this.option("nativeDropSupported") && "useForm" === this.option("uploadMode")
    }
    _getDropZoneElement(isCustomTarget, e) {
        var targetList = isCustomTarget ? Array.from(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this.option("dropZone"))) : [this._$inputWrapper];
        targetList = targetList.map(element => Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element).get(0));
        return targetList[targetList.indexOf(e.currentTarget)]
    }
    _dragEnterHandler(isCustomTarget, e) {
        if (this.option("disabled")) {
            return false
        }
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        var dropZoneElement = this._getDropZoneElement(isCustomTarget, e);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(dropZoneElement) && null === this._activeDropZone && this.isMouseOverElement(e, dropZoneElement, false)) {
            this._activeDropZone = dropZoneElement;
            this._tryToggleDropZoneActive(true, isCustomTarget, e)
        }
    }
    _dragOverHandler(isCustomTarget, e) {
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        e.originalEvent.dataTransfer.dropEffect = "copy";
        if (!isCustomTarget) {
            var dropZoneElement = this._getDropZoneElement(false, e);
            if (null === this._activeDropZone && this.isMouseOverElement(e, dropZoneElement, false)) {
                this._dragEnterHandler(false, e)
            }
            if (null !== this._activeDropZone && this._shouldRaiseDragLeave(e, false)) {
                this._dragLeaveHandler(false, e)
            }
        }
    }
    _dragLeaveHandler(isCustomTarget, e) {
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        if (null === this._activeDropZone) {
            return
        }
        if (this._shouldRaiseDragLeave(e, isCustomTarget)) {
            this._tryToggleDropZoneActive(false, isCustomTarget, e);
            this._activeDropZone = null
        }
    }
    _shouldRaiseDragLeave(e, isCustomTarget) {
        return !this.isMouseOverElement(e, this._activeDropZone, !isCustomTarget)
    }
    _tryToggleDropZoneActive(active, isCustom, event) {
        var classAction = active ? "addClass" : "removeClass";
        var mouseAction = active ? "_dropZoneEnterAction" : "_dropZoneLeaveAction";
        this[mouseAction]({
            event: event,
            dropZoneElement: this._activeDropZone
        });
        if (!isCustom) {
            this.$element()[classAction](FILEUPLOADER_DRAGOVER_CLASS)
        }
    }
    _dropHandler(isCustomTarget, e) {
        this._activeDropZone = null;
        if (!isCustomTarget) {
            this.$element().removeClass(FILEUPLOADER_DRAGOVER_CLASS)
        }
        if (this._useInputForDrop() || isCustomTarget && this._isInteractionDisabled()) {
            return
        }
        e.preventDefault();
        var fileList = e.originalEvent.dataTransfer.files;
        var files = this._getFiles(fileList);
        if (!this.option("multiple") && files.length > 1) {
            return
        }
        this._changeValue(files);
        if ("instantly" === this.option("uploadMode")) {
            this._uploadFiles()
        }
    }
    _handleAllFilesUploaded() {
        var areAllFilesLoaded = this._files.every(file => !file.isValid() || file._isError || file._isLoaded || file.isAborted);
        if (areAllFilesLoaded) {
            this._filesUploadedAction()
        }
    }
    _getAllowedFileTypes(acceptSting) {
        if (!acceptSting.length) {
            return []
        }
        return acceptSting.split(",").map(item => item.trim())
    }
    _isFileTypeAllowed(file, allowedTypes) {
        for (var i = 0, n = allowedTypes.length; i < n; i++) {
            var allowedType = allowedTypes[i];
            if ("." === allowedType[0]) {
                allowedType = allowedType.replace(".", "\\.");
                if (file.name.match(new RegExp(allowedType + "$", "i"))) {
                    return true
                }
            } else {
                allowedType = allowedType.replace(new RegExp("\\*", "g"), "");
                if (file.type.match(new RegExp(allowedType, "i"))) {
                    return true
                }
            }
        }
        return false
    }
    _renderWrapper() {
        var $wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_WRAPPER_CLASS).appendTo(this.$element());
        var $container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_CONTAINER_CLASS).appendTo($wrapper);
        this._$content = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(FILEUPLOADER_CONTENT_CLASS).appendTo($container)
    }
    _clean() {
        this._$fileInput.detach();
        delete this._$filesContainer;
        this._detachSelectFileDialogHandler(this.option("dialogTrigger"));
        this._detachDragEventHandlers(this.option("dropZone"));
        if (this._files) {
            this._files.forEach(file => {
                file.$file = null;
                file.$statusMessage = null
            })
        }
        super._clean()
    }
    abortUpload(fileData) {
        if ("useForm" === this.option("uploadMode")) {
            return
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(fileData)) {
            var file = this._getFile(fileData);
            if (file) {
                this._preventFilesUploading([file])
            }
        } else {
            this._preventFilesUploading(this._files)
        }
    }
    upload(fileData) {
        if ("useForm" === this.option("uploadMode")) {
            return
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(fileData)) {
            var file = this._getFile(fileData);
            if (file && isFormDataSupported()) {
                this._uploadFile(file)
            }
        } else {
            this._uploadFiles()
        }
    }
    _uploadFiles() {
        if (isFormDataSupported()) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(this._files, (_, file) => this._uploadFile(file))
        }
    }
    _uploadFile(file) {
        this._uploadStrategy.upload(file)
    }
    _updateProgressBar(file, loadedFileData) {
        file.progressBar && file.progressBar.option({
            value: loadedFileData.loaded,
            showStatus: true
        });
        this._progressAction({
            file: file.value,
            segmentSize: loadedFileData.currentSegmentSize,
            bytesLoaded: loadedFileData.loaded,
            bytesTotal: loadedFileData.total,
            event: loadedFileData.event,
            request: file.request
        })
    }
    _updateTotalProgress(totalFilesSize, totalLoadedFilesSize) {
        var progress = totalFilesSize ? this._getProgressValue(totalLoadedFilesSize / totalFilesSize) : 0;
        this.option("progress", progress);
        this._setLoadedSize(totalLoadedFilesSize)
    }
    _getProgressValue(ratio) {
        return Math.floor(100 * ratio)
    }
    _initStatusMessage(file) {
        file.$statusMessage.css("display", "none")
    }
    _ensureCancelButtonInitialized(file) {
        if (file.isInitialized) {
            return
        }
        file.cancelButton.option("onClick", () => {
            this._preventFilesUploading([file]);
            this._removeFile(file)
        });
        var hideCancelButton = () => {
            setTimeout(() => {
                file.cancelButton.option({
                    visible: false
                })
            }, FILEUPLOADER_AFTER_LOAD_DELAY)
        };
        file.onLoad.add(hideCancelButton);
        file.onError.add(hideCancelButton)
    }
    _createProgressBar(fileSize) {
        return this._createComponent(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>"), _progress_bar__WEBPACK_IMPORTED_MODULE_15__["default"], {
            value: void 0,
            min: 0,
            max: fileSize,
            statusFormat: ratio => this._getProgressValue(ratio) + "%",
            showStatus: false,
            statusPosition: "right"
        })
    }
    _getTotalFilesSize() {
        if (!this._totalFilesSize) {
            this._totalFilesSize = 0;
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(this._files, (_, file) => {
                this._totalFilesSize += file.value.size
            })
        }
        return this._totalFilesSize
    }
    _getTotalLoadedFilesSize() {
        if (!this._totalLoadedFilesSize) {
            this._totalLoadedFilesSize = 0;
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(this._files, (_, file) => {
                this._totalLoadedFilesSize += file.loadedSize
            })
        }
        return this._totalLoadedFilesSize
    }
    _setLoadedSize(value) {
        this._totalLoadedFilesSize = value
    }
    _recalculateProgress() {
        this._totalFilesSize = 0;
        this._totalLoadedFilesSize = 0;
        this._updateTotalProgress(this._getTotalFilesSize(), this._getTotalLoadedFilesSize())
    }
    isMouseOverElement(mouseEvent, element, correctPseudoElements) {
        if (!element) {
            return false
        }
        var beforeHeight = correctPseudoElements ? parseFloat(window.getComputedStyle(element, ":before").height) : 0;
        var afterHeight = correctPseudoElements ? parseFloat(window.getComputedStyle(element, ":after").height) : 0;
        var x = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOffset"])(element).left;
        var y = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOffset"])(element).top + beforeHeight;
        var w = element.offsetWidth;
        var h = element.offsetHeight - beforeHeight - afterHeight;
        var eventX = this._getEventX(mouseEvent);
        var eventY = this._getEventY(mouseEvent);
        return eventX >= x && eventX < x + w && eventY >= y && eventY < y + h
    }
    _getEventX(e) {
        return Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["isTouchEvent"])(e) ? this._getTouchEventX(e) : e.clientX + this._getDocumentScrollLeft()
    }
    _getEventY(e) {
        return Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_17__["isTouchEvent"])(e) ? this._getTouchEventY(e) : e.clientY + this._getDocumentScrollTop()
    }
    _getTouchEventX(e) {
        var touchPoint = null;
        if (e.changedTouches.length > 0) {
            touchPoint = e.changedTouches
        } else if (e.targetTouches.length > 0) {
            touchPoint = e.targetTouches
        }
        return touchPoint ? touchPoint[0].pageX : 0
    }
    _getTouchEventY(e) {
        var touchPoint = null;
        if (e.changedTouches.length > 0) {
            touchPoint = e.changedTouches
        } else if (e.targetTouches.length > 0) {
            touchPoint = e.targetTouches
        }
        return touchPoint ? touchPoint[0].pageY : 0
    }
    _getDocumentScrollTop() {
        var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_21__["default"].getDocument();
        return document.documentElement.scrollTop || document.body.scrollTop
    }
    _getDocumentScrollLeft() {
        var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_21__["default"].getDocument();
        return document.documentElement.scrollLeft || document.body.scrollLeft
    }
    _updateReadOnlyState() {
        var readOnly = this.option("readOnly");
        this._selectButton.option("disabled", readOnly);
        this._files.forEach(file => {
            var _file$cancelButton;
            return null === (_file$cancelButton = file.cancelButton) || void 0 === _file$cancelButton ? void 0 : _file$cancelButton.option("disabled", readOnly)
        });
        this._updateInputLabelText();
        this._attachDragEventHandlers(this._$inputWrapper)
    }
    _updateHoverState() {
        var _this$_selectButton, _this$_uploadButton;
        var value = this.option("hoverStateEnabled");
        null === (_this$_selectButton = this._selectButton) || void 0 === _this$_selectButton ? void 0 : _this$_selectButton.option("hoverStateEnabled", value);
        null === (_this$_uploadButton = this._uploadButton) || void 0 === _this$_uploadButton ? void 0 : _this$_uploadButton.option("hoverStateEnabled", value);
        this._files.forEach(file => {
            var _file$uploadButton, _file$cancelButton2;
            null === (_file$uploadButton = file.uploadButton) || void 0 === _file$uploadButton ? void 0 : _file$uploadButton.option("hoverStateEnabled", value);
            null === (_file$cancelButton2 = file.cancelButton) || void 0 === _file$cancelButton2 ? void 0 : _file$cancelButton2.option("hoverStateEnabled", value)
        })
    }
    _optionChanged(args) {
        var {
            name: name,
            value: value,
            previousValue: previousValue
        } = args;
        switch (name) {
            case "height":
            case "width":
                this._updateFileNameMaxWidth();
                super._optionChanged(args);
                break;
            case "value":
                !value.length && this._$fileInput.val("");
                if (!this._preventRecreatingFiles) {
                    this._createFiles();
                    this._renderFiles()
                }
                this._recalculateProgress();
                super._optionChanged(args);
                break;
            case "name":
                this._initFileInput();
                super._optionChanged(args);
                break;
            case "accept":
                this._initFileInput();
                break;
            case "multiple":
                this._initFileInput();
                if (!args.value) {
                    this.reset()
                }
                break;
            case "readOnly":
                this._updateReadOnlyState();
                super._optionChanged(args);
                break;
            case "disabled":
                this._updateInputLabelText();
                super._optionChanged(args);
                break;
            case "selectButtonText":
                this._selectButton.option("text", value);
                break;
            case "uploadButtonText":
                this._uploadButton && this._uploadButton.option("text", value);
                break;
            case "_uploadButtonType":
                this._uploadButton && this._uploadButton.option("type", value);
                break;
            case "dialogTrigger":
                this._detachSelectFileDialogHandler(previousValue);
                this._attachSelectFileDialogHandler(value);
                break;
            case "dropZone":
                this._detachDragEventHandlers(previousValue);
                this._attachDragEventHandlers(value);
                break;
            case "maxFileSize":
            case "minFileSize":
            case "allowedFileExtensions":
            case "invalidFileExtensionMessage":
            case "invalidMaxFileSizeMessage":
            case "invalidMinFileSizeMessage":
            case "readyToUploadMessage":
            case "uploadedMessage":
            case "uploadFailedMessage":
            case "uploadAbortedMessage":
                this._invalidate();
                break;
            case "labelText":
                this._updateInputLabelText();
                break;
            case "showFileList":
                if (!this._preventRecreatingFiles) {
                    this._renderFiles()
                }
                break;
            case "uploadFile":
            case "uploadChunk":
            case "chunkSize":
                this._setUploadStrategy();
                break;
            case "abortUpload":
            case "uploadUrl":
            case "progress":
            case "uploadMethod":
            case "uploadHeaders":
            case "uploadCustomData":
            case "extendSelection":
                break;
            case "hoverStateEnabled":
                this._updateHoverState();
                super._optionChanged(args);
                break;
            case "allowCanceling":
            case "uploadMode":
                this.reset();
                this._invalidate();
                break;
            case "onBeforeSend":
                this._createBeforeSendAction();
                break;
            case "onUploadStarted":
                this._createUploadStartedAction();
                break;
            case "onUploaded":
                this._createUploadedAction();
                break;
            case "onFilesUploaded":
                this._createFilesUploadedAction();
                break;
            case "onProgress":
                this._createProgressAction();
                break;
            case "onUploadError":
                this._createUploadErrorAction();
                break;
            case "onUploadAborted":
                this._createUploadAbortedAction();
                break;
            case "onDropZoneEnter":
                this._createDropZoneEnterAction();
                break;
            case "onDropZoneLeave":
                this._createDropZoneLeaveAction();
                break;
            case "useNativeInputClick":
                this._renderInput();
                break;
            case "useDragOver":
                this._attachDragEventHandlers(this._$inputWrapper);
                break;
            case "nativeDropSupported":
                this._invalidate();
                break;
            case "inputAttr":
                this._applyInputAttributes(this.option(name));
                break;
            default:
                super._optionChanged(args)
        }
    }
    _resetInputValue(force) {
        if ("useForm" === this.option("uploadMode") && !force) {
            return
        }
        this._doPreventInputChange = true;
        this._$fileInput.val("");
        this._doPreventInputChange = false
    }
    reset() {
        this.option("value", [])
    }
}
class FileBlobReader {
    constructor(file, chunkSize) {
        this.file = file;
        this.chunkSize = chunkSize;
        this.index = 0
    }
    read() {
        if (!this.file) {
            return null
        }
        var result = this.createBlobResult(this.file, this.index, this.chunkSize);
        if (result.isCompleted) {
            this.file = null
        }
        this.index++;
        return result
    }
    createBlobResult(file, index, chunkSize) {
        var currentPosition = index * chunkSize;
        return {
            blob: this.sliceFile(file, currentPosition, chunkSize),
            index: index,
            isCompleted: currentPosition + chunkSize >= file.size
        }
    }
    sliceFile(file, startPos, length) {
        if (file.slice) {
            return file.slice(startPos, startPos + length)
        }
        if (file.webkitSlice) {
            return file.webkitSlice(startPos, startPos + length)
        }
        return null
    }
}
class FileUploadStrategyBase {
    constructor(fileUploader) {
        this.fileUploader = fileUploader
    }
    upload(file) {
        if (file.isInitialized && file.isAborted) {
            this.fileUploader._resetFileState(file)
        }
        if (file.isValid() && !file.uploadStarted) {
            this._prepareFileBeforeUpload(file);
            this._uploadCore(file)
        }
    }
    abortUpload(file) {
        if (file._isError || file._isLoaded || file.isAborted || !file.uploadStarted) {
            return
        }
        file.isAborted = true;
        file.request && file.request.abort();
        if (this._isCustomCallback("abortUpload")) {
            var abortUpload = this.fileUploader.option("abortUpload");
            var arg = this._createUploadArgument(file);
            var deferred = null;
            try {
                var result = abortUpload(file.value, arg);
                deferred = Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["fromPromise"])(result)
            } catch (error) {
                deferred = (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["Deferred"]).reject(error).promise()
            }
            deferred.done(() => file.onAbort.fire()).fail(error => this._handleFileError(file, error))
        }
    }
    _beforeSend(xhr, file) {
        var arg = this._createUploadArgument(file);
        this.fileUploader._beforeSendAction({
            request: xhr,
            file: file.value,
            uploadInfo: arg
        });
        file.request = xhr
    }
    _createUploadArgument(file) {}
    _uploadCore(file) {}
    _isCustomCallback(name) {
        var callback = this.fileUploader.option(name);
        return callback && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(callback)
    }
    _handleProgress(file, e) {
        if (file._isError) {
            return
        }
        file._isProgressStarted = true;
        this._handleProgressCore(file, e)
    }
    _handleProgressCore(file, e) {}
    _handleFileError(file, error) {
        file._isError = true;
        file.onError.fire(error)
    }
    _prepareFileBeforeUpload(file) {
        if (file.$file) {
            var _file$progressBar;
            null === (_file$progressBar = file.progressBar) || void 0 === _file$progressBar ? void 0 : _file$progressBar.dispose();
            this.fileUploader._createFileProgressBar(file)
        }
        if (file.isInitialized) {
            return
        }
        file.onLoadStart.add(this._onUploadStarted.bind(this, file));
        file.onLoad.add(this._onLoadedHandler.bind(this, file));
        file.onError.add(this._onErrorHandler.bind(this, file));
        file.onAbort.add(this._onAbortHandler.bind(this, file));
        file.onProgress.add(this._onProgressHandler.bind(this, file));
        file.isInitialized = true
    }
    _shouldHandleError(file, e) {
        return (this._isStatusError(e.status) || !file._isProgressStarted) && !file.isAborted
    }
    _isStatusError(status) {
        return 400 <= status && status < 500 || 500 <= status && status < 600
    }
    _onUploadStarted(file, e) {
        file.uploadStarted = true;
        this.fileUploader._uploadStartedAction({
            file: file.value,
            event: e,
            request: file.request
        })
    }
    _onAbortHandler(file, e) {
        var args = {
            file: file.value,
            event: e,
            request: file.request,
            message: this.fileUploader._getUploadAbortedStatusMessage()
        };
        this.fileUploader._uploadAbortedAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    }
    _onErrorHandler(file, error) {
        var args = {
            file: file.value,
            event: void 0,
            request: file.request,
            error: error,
            message: this.fileUploader.option("uploadFailedMessage")
        };
        this.fileUploader._uploadErrorAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    }
    _onLoadedHandler(file, e) {
        var args = {
            file: file.value,
            event: e,
            request: file.request,
            message: this.fileUploader.option("uploadedMessage")
        };
        file._isLoaded = true;
        this.fileUploader._uploadedAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    }
    _onProgressHandler(file, e) {
        if (file) {
            var totalFilesSize = this.fileUploader._getTotalFilesSize();
            var totalLoadedFilesSize = this.fileUploader._getTotalLoadedFilesSize();
            var loadedSize = Math.min(e.loaded, file.value.size);
            var segmentSize = loadedSize - file.loadedSize;
            file.loadedSize = loadedSize;
            this.fileUploader._updateTotalProgress(totalFilesSize, totalLoadedFilesSize + segmentSize);
            this.fileUploader._updateProgressBar(file, this._getLoadedData(loadedSize, e.total, segmentSize, e))
        }
    }
    _getLoadedData(loaded, total, currentSegmentSize, event) {
        return {
            loaded: loaded,
            total: total,
            currentSegmentSize: currentSegmentSize
        }
    }
    _extendFormData(formData) {
        var formDataEntries = this.fileUploader.option("uploadCustomData");
        for (var entryName in formDataEntries) {
            if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(formDataEntries[entryName])) {
                formData.append(entryName, formDataEntries[entryName])
            }
        }
    }
}
class ChunksFileUploadStrategyBase extends FileUploadStrategyBase {
    constructor(fileUploader) {
        super(fileUploader);
        this.chunkSize = this.fileUploader.option("chunkSize")
    }
    _uploadCore(file) {
        var realFile = file.value;
        var chunksData = {
            name: realFile.name,
            loadedBytes: 0,
            type: realFile.type,
            blobReader: new FileBlobReader(realFile, this.chunkSize),
            guid: new _core_guid__WEBPACK_IMPORTED_MODULE_2__["default"],
            fileSize: realFile.size,
            count: Math.ceil(realFile.size / this.chunkSize),
            customData: {}
        };
        file.chunksData = chunksData;
        this._sendChunk(file, chunksData)
    }
    _sendChunk(file, chunksData) {
        var chunk = chunksData.blobReader.read();
        chunksData.currentChunk = chunk;
        if (chunk) {
            this._sendChunkCore(file, chunksData, chunk).done(() => {
                if (file.isAborted) {
                    return
                }
                chunksData.loadedBytes += chunk.blob.size;
                file.onProgress.fire({
                    loaded: chunksData.loadedBytes,
                    total: file.value.size
                });
                if (chunk.isCompleted) {
                    file.onLoad.fire()
                }
                setTimeout(() => this._sendChunk(file, chunksData))
            }).fail(error => {
                if (this._shouldHandleError(file, error)) {
                    this._handleFileError(file, error)
                }
            })
        }
    }
    _sendChunkCore(file, chunksData, chunk) {}
    _tryRaiseStartLoad(file) {
        if (!file.isStartLoad) {
            file.isStartLoad = true;
            file.onLoadStart.fire()
        }
    }
    _getEvent(e) {
        return null
    }
    _createUploadArgument(file) {
        return this._createChunksInfo(file.chunksData)
    }
    _createChunksInfo(chunksData) {
        return {
            bytesUploaded: chunksData.loadedBytes,
            chunkCount: chunksData.count,
            customData: chunksData.customData,
            chunkBlob: chunksData.currentChunk.blob,
            chunkIndex: chunksData.currentChunk.index
        }
    }
}
class DefaultChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
    _sendChunkCore(file, chunksData, chunk) {
        return _core_utils_ajax__WEBPACK_IMPORTED_MODULE_12__["default"].sendRequest({
            url: this.fileUploader.option("uploadUrl"),
            method: this.fileUploader.option("uploadMethod"),
            headers: this.fileUploader.option("uploadHeaders"),
            beforeSend: xhr => this._beforeSend(xhr, file),
            upload: {
                onprogress: e => this._handleProgress(file, e),
                onloadstart: () => this._tryRaiseStartLoad(file),
                onabort: () => file.onAbort.fire()
            },
            data: this._createFormData({
                fileName: chunksData.name,
                blobName: this.fileUploader.option("name"),
                blob: chunk.blob,
                index: chunk.index,
                count: chunksData.count,
                type: chunksData.type,
                guid: chunksData.guid,
                size: chunksData.fileSize
            })
        })
    }
    _createFormData(options) {
        var formData = new window.FormData;
        formData.append(options.blobName, options.blob);
        formData.append(FILEUPLOADER_CHUNK_META_DATA_NAME, JSON.stringify({
            FileName: options.fileName,
            Index: options.index,
            TotalCount: options.count,
            FileSize: options.size,
            FileType: options.type,
            FileGuid: options.guid
        }));
        this._extendFormData(formData);
        return formData
    }
}
class CustomChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
    _sendChunkCore(file, chunksData) {
        this._tryRaiseStartLoad(file);
        var chunksInfo = this._createChunksInfo(chunksData);
        var uploadChunk = this.fileUploader.option("uploadChunk");
        try {
            var result = uploadChunk(file.value, chunksInfo);
            return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["fromPromise"])(result)
        } catch (error) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["Deferred"]).reject(error).promise()
        }
    }
    _shouldHandleError(file, error) {
        return true
    }
}
class WholeFileUploadStrategyBase extends FileUploadStrategyBase {
    _uploadCore(file) {
        file.loadedSize = 0;
        this._uploadFile(file).done(() => {
            if (!file.isAborted) {
                file.onLoad.fire()
            }
        }).fail(error => {
            if (this._shouldHandleError(file, error)) {
                this._handleFileError(file, error)
            }
        })
    }
    _uploadFile(file) {}
    _handleProgressCore(file, e) {
        file.onProgress.fire(e)
    }
    _getLoadedData(loaded, total, segmentSize, event) {
        var result = super._getLoadedData(loaded, total, segmentSize, event);
        result.event = event;
        return result
    }
}
class DefaultWholeFileUploadStrategy extends WholeFileUploadStrategyBase {
    _uploadFile(file) {
        return _core_utils_ajax__WEBPACK_IMPORTED_MODULE_12__["default"].sendRequest({
            url: this.fileUploader.option("uploadUrl"),
            method: this.fileUploader.option("uploadMethod"),
            headers: this.fileUploader.option("uploadHeaders"),
            beforeSend: xhr => this._beforeSend(xhr, file),
            upload: {
                onprogress: e => this._handleProgress(file, e),
                onloadstart: () => file.onLoadStart.fire(),
                onabort: () => file.onAbort.fire()
            },
            data: this._createFormData(this.fileUploader.option("name"), file.value)
        })
    }
    _createFormData(fieldName, fieldValue) {
        var formData = new window.FormData;
        formData.append(fieldName, fieldValue, fieldValue.name);
        this._extendFormData(formData);
        return formData
    }
}
class CustomWholeFileUploadStrategy extends WholeFileUploadStrategyBase {
    _uploadFile(file) {
        file.onLoadStart.fire();
        var uploadFile = this.fileUploader.option("uploadFile");
        try {
            var result = uploadFile(file.value, loadedBytes => {
                var arg = {
                    loaded: loadedBytes,
                    total: file.size
                };
                this._handleProgress(file, arg)
            });
            return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["fromPromise"])(result)
        } catch (error) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["Deferred"]).reject(error).promise()
        }
    }
    _shouldHandleError(file, e) {
        return true
    }
}
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_5__["default"])("dxFileUploader", FileUploader);
/* harmony default export */ __webpack_exports__["default"] = (FileUploader);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/notify.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/notify.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/action */ "./node_modules/devextreme/esm/core/action.js");
/* harmony import */ var _core_utils_view_port__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/view_port */ "./node_modules/devextreme/esm/core/utils/view_port.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toast */ "./node_modules/devextreme/esm/ui/toast.js");
/**
 * DevExtreme (esm/ui/notify.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var $notify = null;
var notify = function(message, type, displayTime) {
    var options = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isPlainObject"])(message) ? message : {
        message: message
    };
    var userHiddenAction = options.onHidden;
    Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(options, {
        type: type,
        displayTime: displayTime,
        onHidden: function(args) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(args.element).remove();
            new _core_action__WEBPACK_IMPORTED_MODULE_1__["default"](userHiddenAction, {
                context: args.model
            }).execute(arguments)
        }
    });
    $notify = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(Object(_core_utils_view_port__WEBPACK_IMPORTED_MODULE_2__["value"])());
    new _toast__WEBPACK_IMPORTED_MODULE_5__["default"]($notify, options).show()
};
/* harmony default export */ __webpack_exports__["default"] = (notify);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/progress_bar.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/progress_bar.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _track_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./track_bar */ "./node_modules/devextreme/esm/ui/track_bar.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/**
 * DevExtreme (esm/ui/progress_bar.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var PROGRESSBAR_CLASS = "dx-progressbar";
var PROGRESSBAR_CONTAINER_CLASS = "dx-progressbar-container";
var PROGRESSBAR_RANGE_CONTAINER_CLASS = "dx-progressbar-range-container";
var PROGRESSBAR_RANGE_CLASS = "dx-progressbar-range";
var PROGRESSBAR_WRAPPER_CLASS = "dx-progressbar-wrapper";
var PROGRESSBAR_STATUS_CLASS = "dx-progressbar-status";
var PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER = "dx-progressbar-animating-container";
var PROGRESSBAR_INDETERMINATE_SEGMENT = "dx-progressbar-animating-segment";
var ProgressBar = _track_bar__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(this.callBase(), {
            value: 0,
            statusFormat: function(ratio) {
                return "Progress: " + Math.round(100 * ratio) + "%"
            },
            showStatus: true,
            onComplete: null,
            activeStateEnabled: false,
            statusPosition: "bottom left",
            _animatingSegmentCount: 0
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function(_device) {
                return "android" === _device.platform
            },
            options: {
                _animatingSegmentCount: 2
            }
        }])
    },
    _initMarkup: function() {
        this._renderStatus();
        this._createCompleteAction();
        this.callBase();
        this.$element().addClass(PROGRESSBAR_CLASS);
        this._$wrapper.addClass(PROGRESSBAR_WRAPPER_CLASS);
        this._$bar.addClass(PROGRESSBAR_CONTAINER_CLASS);
        this.setAria("role", "progressbar");
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(PROGRESSBAR_RANGE_CONTAINER_CLASS).appendTo(this._$wrapper).append(this._$bar);
        this._$range.addClass(PROGRESSBAR_RANGE_CLASS);
        this._toggleStatus(this.option("showStatus"))
    },
    _useTemplates: function() {
        return false
    },
    _createCompleteAction: function() {
        this._completeAction = this._createActionByOption("onComplete")
    },
    _renderStatus: function() {
        this._$status = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(PROGRESSBAR_STATUS_CLASS)
    },
    _renderIndeterminateState: function() {
        this._$segmentContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER);
        var segments = this.option("_animatingSegmentCount");
        for (var i = 0; i < segments; i++) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(PROGRESSBAR_INDETERMINATE_SEGMENT).addClass(PROGRESSBAR_INDETERMINATE_SEGMENT + "-" + (i + 1)).appendTo(this._$segmentContainer)
        }
        this._$segmentContainer.appendTo(this._$wrapper)
    },
    _toggleStatus: function(value) {
        var splitPosition = this.option("statusPosition").split(" ");
        if (value) {
            if ("top" === splitPosition[0] || "left" === splitPosition[0]) {
                this._$status.prependTo(this._$wrapper)
            } else {
                this._$status.appendTo(this._$wrapper)
            }
        } else {
            this._$status.detach()
        }
        this._togglePositionClass()
    },
    _togglePositionClass: function() {
        var position = this.option("statusPosition");
        var splitPosition = position.split(" ");
        this._$wrapper.removeClass("dx-position-top-left dx-position-top-right dx-position-bottom-left dx-position-bottom-right dx-position-left dx-position-right");
        var positionClass = "dx-position-" + splitPosition[0];
        if (splitPosition[1]) {
            positionClass += "-" + splitPosition[1]
        }
        this._$wrapper.addClass(positionClass)
    },
    _toggleIndeterminateState: function(value) {
        if (value) {
            this._renderIndeterminateState();
            this._$bar.toggle(false)
        } else {
            this._$bar.toggle(true);
            this._$segmentContainer.remove();
            delete this._$segmentContainer
        }
    },
    _renderValue: function() {
        var val = this.option("value");
        var max = this.option("max");
        if (!val && 0 !== val) {
            this._toggleIndeterminateState(true);
            return
        }
        if (this._$segmentContainer) {
            this._toggleIndeterminateState(false)
        }
        if (val === max) {
            this._completeAction()
        }
        this.callBase();
        this._setStatus()
    },
    _setStatus: function() {
        var format = this.option("statusFormat");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(format)) {
            format = format.bind(this)
        } else {
            format = function(value) {
                return value
            }
        }
        var statusText = format(this._currentRatio, this.option("value"));
        this._$status.text(statusText)
    },
    _dispose: function() {
        this._$status.remove();
        this.callBase()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "statusFormat":
                this._setStatus();
                break;
            case "showStatus":
                this._toggleStatus(args.value);
                break;
            case "statusPosition":
                this._toggleStatus(this.option("showStatus"));
                break;
            case "onComplete":
                this._createCompleteAction();
                break;
            case "_animatingSegmentCount":
                break;
            default:
                this.callBase(args)
        }
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])("dxProgressBar", ProgressBar);
/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/splitter.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/splitter.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SplitterControl; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/ui/splitter.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_5__["getWindow"])();
var SPLITTER_CLASS = "dx-splitter";
var SPLITTER_WRAPPER_CLASS = "".concat(SPLITTER_CLASS, "-wrapper");
var SPLITTER_INACTIVE_CLASS = "".concat(SPLITTER_CLASS, "-inactive");
var SPLITTER_BORDER_CLASS = "".concat(SPLITTER_CLASS, "-border");
var SPLITTER_INITIAL_STATE_CLASS = "".concat(SPLITTER_CLASS, "-initial");
var STATE_DISABLED_CLASS = "dx-state-disabled";
var SPLITTER_MODULE_NAMESPACE = "dxSplitterResizing";
var SPLITTER_POINTER_DOWN_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_4__["default"].down, SPLITTER_MODULE_NAMESPACE);
var SPLITTER_POINTER_MOVE_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_4__["default"].move, SPLITTER_MODULE_NAMESPACE);
var SPLITTER_POINTER_UP_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_4__["default"].up, SPLITTER_MODULE_NAMESPACE);
class SplitterControl extends _widget_ui_widget__WEBPACK_IMPORTED_MODULE_1__["default"] {
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        this._$container = this.option("container");
        this._$leftElement = this.option("leftElement");
        this._$rightElement = this.option("rightElement");
        this.$element().addClass(SPLITTER_WRAPPER_CLASS).addClass(SPLITTER_INITIAL_STATE_CLASS);
        this._$splitterBorder = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SPLITTER_BORDER_CLASS).appendTo(this.$element());
        this._$splitter = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SPLITTER_CLASS).addClass(SPLITTER_INACTIVE_CLASS).appendTo(this._$splitterBorder)
    }
    _initActions() {
        this._actions = {
            onApplyPanelSize: this._createActionByOption("onApplyPanelSize"),
            onActiveStateChanged: this._createActionByOption("onActiveStateChanged")
        }
    }
    _render() {
        super._render();
        this._detachEventHandlers();
        this._attachEventHandlers()
    }
    _clean() {
        this._detachEventHandlers();
        super._clean()
    }
    _attachEventHandlers() {
        var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(this._$splitterBorder, SPLITTER_POINTER_DOWN_EVENT_NAME, this._onMouseDownHandler.bind(this));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(document, SPLITTER_POINTER_MOVE_EVENT_NAME, this._onMouseMoveHandler.bind(this));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(document, SPLITTER_POINTER_UP_EVENT_NAME, this._onMouseUpHandler.bind(this))
    }
    _detachEventHandlers() {
        var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(this._$splitterBorder, SPLITTER_POINTER_DOWN_EVENT_NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(document, SPLITTER_POINTER_MOVE_EVENT_NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(document, SPLITTER_POINTER_UP_EVENT_NAME)
    }
    _dimensionChanged(dimension) {
        if (!dimension || "height" !== dimension) {
            this._containerWidth = this._$container.get(0).clientWidth;
            this._setSplitterPositionLeft({
                needUpdatePanels: true,
                usePercentagePanelsWidth: true
            })
        }
    }
    _onMouseDownHandler(e) {
        e.preventDefault();
        this._offsetX = e.pageX - this._$splitterBorder.offset().left <= this._getSplitterBorderWidth() ? e.pageX - this._$splitterBorder.offset().left : 0;
        this._containerWidth = this._$container.get(0).clientWidth;
        this.$element().removeClass(SPLITTER_INITIAL_STATE_CLASS);
        this._toggleActive(true);
        this._setSplitterPositionLeft({
            needUpdatePanels: true
        })
    }
    _onMouseMoveHandler(e) {
        if (!this._isSplitterActive) {
            return
        }
        this._setSplitterPositionLeft({
            splitterPositionLeft: this._getNewSplitterPositionLeft(e),
            needUpdatePanels: true
        })
    }
    _onMouseUpHandler() {
        if (!this._isSplitterActive) {
            return
        }
        this._leftPanelPercentageWidth = null;
        this._toggleActive(false);
        this._setSplitterPositionLeft({
            needUpdatePanels: true,
            usePercentagePanelsWidth: true
        })
    }
    _getNewSplitterPositionLeft(e) {
        var newSplitterPositionLeft = e.pageX - this._getContainerLeftOffset() - this._offsetX;
        newSplitterPositionLeft = Math.max(0 - this._getSplitterOffset(), newSplitterPositionLeft);
        newSplitterPositionLeft = Math.min(this._containerWidth - this._getSplitterOffset() - this._getSplitterWidth(), newSplitterPositionLeft);
        return newSplitterPositionLeft
    }
    _getContainerLeftOffset() {
        var offsetLeft = this._$container.offset().left;
        if (window) {
            var style = window.getComputedStyle(this._$container.get(0));
            var paddingLeft = parseFloat(style.paddingLeft) || 0;
            var borderLeft = parseFloat(style.borderLeftWidth) || 0;
            offsetLeft += paddingLeft + borderLeft
        }
        return offsetLeft
    }
    _getSplitterOffset() {
        return (this._getSplitterBorderWidth() - this._getSplitterWidth()) / 2
    }
    _getSplitterWidth() {
        return this._$splitter.get(0).clientWidth
    }
    _getSplitterBorderWidth() {
        return this._$splitterBorder.get(0).clientWidth
    }
    _getLeftPanelWidth() {
        return this._$leftElement.get(0).clientWidth
    }
    getSplitterBorderElement() {
        return this._$splitterBorder
    }
    _toggleActive(isActive) {
        this.$element().toggleClass(SPLITTER_INACTIVE_CLASS, !isActive);
        this._$splitter.toggleClass(SPLITTER_INACTIVE_CLASS, !isActive);
        this._isSplitterActive = isActive;
        this._actions.onActiveStateChanged({
            isActive: isActive
        })
    }
    toggleDisabled(isDisabled) {
        this.$element().toggleClass(STATE_DISABLED_CLASS, isDisabled);
        this._$splitter.toggleClass(STATE_DISABLED_CLASS, isDisabled)
    }
    isSplitterMoved() {
        return !this.$element().hasClass(SPLITTER_INITIAL_STATE_CLASS)
    }
    disableSplitterCalculation(value) {
        this._isSplitterCalculationDisabled = value
    }
    _setSplitterPositionLeft() {
        var {
            splitterPositionLeft: splitterPositionLeft = null,
            needUpdatePanels: needUpdatePanels = false,
            usePercentagePanelsWidth: usePercentagePanelsWidth = false
        } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        splitterPositionLeft = splitterPositionLeft || this._getLeftPanelWidth() - this._getSplitterOffset();
        var leftPanelWidth = splitterPositionLeft + this._getSplitterOffset();
        var rightPanelWidth = this._containerWidth - leftPanelWidth;
        if (!this._isSplitterCalculationDisabled) {
            this.$element().css("left", splitterPositionLeft)
        }
        this._leftPanelPercentageWidth = this._leftPanelPercentageWidth || this._convertToPercentage(leftPanelWidth);
        var rightPanelPercentageWidth = this._convertToPercentage(this._containerWidth - this._convertToPixels(this._leftPanelPercentageWidth));
        if (!needUpdatePanels) {
            return
        }
        this._actions.onApplyPanelSize({
            leftPanelWidth: usePercentagePanelsWidth ? "".concat(this._leftPanelPercentageWidth, "%") : leftPanelWidth,
            rightPanelWidth: usePercentagePanelsWidth ? "".concat(rightPanelPercentageWidth, "%") : rightPanelWidth
        })
    }
    _optionChanged(args) {
        switch (args.name) {
            case "initialLeftPanelWidth":
                this._leftPanelPercentageWidth = this._convertToPercentage(args.value);
                this._dimensionChanged();
                break;
            case "leftElement":
                this.repaint();
                break;
            case "onActiveStateChanged":
            case "onApplyPanelSize":
                this._actions[args.name] = this._createActionByOption(args.name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    _convertToPercentage(pixelWidth) {
        return pixelWidth / this._$container.get(0).clientWidth * 100
    }
    _convertToPixels(percentageWidth) {
        return percentageWidth / 100 * this._$container.get(0).clientWidth
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/toast.js":
/*!*************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/toast.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _overlay_ui_overlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./overlay/ui.overlay */ "./node_modules/devextreme/esm/ui/overlay/ui.overlay.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./themes */ "./node_modules/devextreme/esm/ui/themes.js");
/**
 * DevExtreme (esm/ui/toast.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])();











var ready = _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_4__["default"].add;
var TOAST_CLASS = "dx-toast";
var TOAST_CLASS_PREFIX = TOAST_CLASS + "-";
var TOAST_WRAPPER_CLASS = TOAST_CLASS_PREFIX + "wrapper";
var TOAST_CONTENT_CLASS = TOAST_CLASS_PREFIX + "content";
var TOAST_MESSAGE_CLASS = TOAST_CLASS_PREFIX + "message";
var TOAST_ICON_CLASS = TOAST_CLASS_PREFIX + "icon";
var WIDGET_NAME = "dxToast";
var toastTypes = ["info", "warning", "error", "success"];
var TOAST_STACK = [];
var FIRST_Z_INDEX_OFFSET = 8e3;
var visibleToastInstance = null;
var POSITION_ALIASES = {
    top: {
        my: "top",
        at: "top",
        of: null,
        offset: "0 0"
    },
    bottom: {
        my: "bottom",
        at: "bottom",
        of: null,
        offset: "0 -20"
    },
    center: {
        my: "center",
        at: "center",
        of: null,
        offset: "0 0"
    },
    right: {
        my: "center right",
        at: "center right",
        of: null,
        offset: "0 0"
    },
    left: {
        my: "center left",
        at: "center left",
        of: null,
        offset: "0 0"
    }
};
var DEFAULT_BOUNDARY_OFFSET = {
    h: 0,
    v: 0
};
ready((function() {
    _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].subscribeGlobal(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument(), _events_pointer__WEBPACK_IMPORTED_MODULE_9__["default"].down, (function(e) {
        for (var i = TOAST_STACK.length - 1; i >= 0; i--) {
            if (!TOAST_STACK[i]._proxiedDocumentDownHandler(e)) {
                return
            }
        }
    }))
}));
var Toast = _overlay_ui_overlay__WEBPACK_IMPORTED_MODULE_11__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(this.callBase(), {
            message: "",
            type: "info",
            displayTime: 2e3,
            position: "bottom center",
            animation: {
                show: {
                    type: "fade",
                    duration: 400,
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    duration: 400,
                    to: 0
                }
            },
            shading: false,
            height: "auto",
            hideTopOverlayHandler: null,
            closeOnSwipe: true,
            closeOnClick: false,
            resizeEnabled: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "android"
            },
            options: {
                closeOnOutsideClick: true,
                width: "auto",
                position: {
                    at: "bottom left",
                    my: "bottom left",
                    offset: "20 -20"
                },
                animation: {
                    show: {
                        type: "slide",
                        duration: 200,
                        from: {
                            position: {
                                my: "top",
                                at: "bottom",
                                of: window
                            }
                        }
                    },
                    hide: {
                        type: "slide",
                        duration: 200,
                        to: {
                            position: {
                                my: "top",
                                at: "bottom",
                                of: window
                            }
                        }
                    }
                }
            }
        }, {
            device: function(_device) {
                var isPhone = "phone" === _device.deviceType;
                var isAndroid = "android" === _device.platform;
                return isPhone && isAndroid
            },
            options: {
                width: "100vw",
                position: {
                    at: "bottom center",
                    my: "bottom center",
                    offset: "0 0"
                }
            }
        }, {
            device: function(_device2) {
                return "phone" === _device2.deviceType
            },
            options: {
                width: "100vw"
            }
        }, {
            device: function() {
                return Object(_themes__WEBPACK_IMPORTED_MODULE_12__["isMaterial"])()
            },
            options: {
                minWidth: 344,
                maxWidth: 568,
                displayTime: 4e3
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._posStringToObject()
    },
    _renderContentImpl: function() {
        if (this.option("message")) {
            this._message = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(TOAST_MESSAGE_CLASS).text(this.option("message")).appendTo(this.$content())
        }
        this.setAria("role", "alert", this._message);
        if (Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_8__["inArray"])(this.option("type").toLowerCase(), toastTypes) > -1) {
            this.$content().prepend(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(TOAST_ICON_CLASS))
        }
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(TOAST_CLASS);
        this.$wrapper().addClass(TOAST_WRAPPER_CLASS);
        this.$content().addClass(TOAST_CLASS_PREFIX + String(this.option("type")).toLowerCase());
        this.$content().addClass(TOAST_CONTENT_CLASS);
        this._toggleCloseEvents("Swipe");
        this._toggleCloseEvents("Click")
    },
    _renderScrollTerminator: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    _toggleCloseEvents: function(event) {
        var dxEvent = "dx" + event.toLowerCase();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(this.$content(), dxEvent);
        this.option("closeOn" + event) && _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(this.$content(), dxEvent, this.hide.bind(this))
    },
    _posStringToObject: function() {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isString"])(this.option("position"))) {
            return
        }
        var verticalPosition = this.option("position").split(" ")[0];
        var horizontalPosition = this.option("position").split(" ")[1];
        this.option("position", Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({
            boundaryOffset: DEFAULT_BOUNDARY_OFFSET
        }, POSITION_ALIASES[verticalPosition]));
        switch (horizontalPosition) {
            case "center":
            case "left":
            case "right":
                this.option("position").at += " " + horizontalPosition;
                this.option("position").my += " " + horizontalPosition
        }
    },
    _show: function() {
        if (visibleToastInstance && visibleToastInstance !== this) {
            clearTimeout(visibleToastInstance._hideTimeout);
            visibleToastInstance.hide()
        }
        visibleToastInstance = this;
        return this.callBase.apply(this, arguments).done(function() {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = setTimeout(this.hide.bind(this), this.option("displayTime"))
        }.bind(this))
    },
    _hide: function() {
        visibleToastInstance = null;
        return this.callBase.apply(this, arguments)
    },
    _overlayStack: function() {
        return TOAST_STACK
    },
    _zIndexInitValue: function() {
        return this.callBase() + FIRST_Z_INDEX_OFFSET
    },
    _dispose: function() {
        clearTimeout(this._hideTimeout);
        visibleToastInstance = null;
        this.callBase()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "type":
                this.$content().removeClass(TOAST_CLASS_PREFIX + args.previousValue);
                this.$content().addClass(TOAST_CLASS_PREFIX + String(args.value).toLowerCase());
                break;
            case "message":
                if (this._message) {
                    this._message.text(args.value)
                }
                break;
            case "closeOnSwipe":
                this._toggleCloseEvents("Swipe");
                break;
            case "closeOnClick":
                this._toggleCloseEvents("Click");
                break;
            case "displayTime":
                break;
            default:
                this.callBase(args)
        }
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_10__["default"])(WIDGET_NAME, Toast);
/* harmony default export */ __webpack_exports__["default"] = (Toast);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/track_bar.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/track_bar.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _editor_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor/editor */ "./node_modules/devextreme/esm/ui/editor/editor.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _animation_fx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation/fx */ "./node_modules/devextreme/esm/animation/fx.js");
/**
 * DevExtreme (esm/ui/track_bar.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var TRACKBAR_CLASS = "dx-trackbar";
var TRACKBAR_CONTAINER_CLASS = "dx-trackbar-container";
var TRACKBAR_RANGE_CLASS = "dx-trackbar-range";
var TRACKBAR_WRAPPER_CLASS = "dx-trackbar-wrapper";
var TrackBar = _editor_editor__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(this.callBase(), {
            min: 0,
            max: 100,
            value: 0
        })
    },
    _initMarkup: function() {
        this.$element().addClass(TRACKBAR_CLASS);
        this._renderWrapper();
        this._renderContainer();
        this._renderRange();
        this._renderValue();
        this._setRangeStyles();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this._setRangeStyles(this._rangeStylesConfig())
    },
    _renderWrapper: function() {
        this._$wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(TRACKBAR_WRAPPER_CLASS).appendTo(this.$element())
    },
    _renderContainer: function() {
        this._$bar = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(TRACKBAR_CONTAINER_CLASS).appendTo(this._$wrapper)
    },
    _renderRange: function() {
        this._$range = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(TRACKBAR_RANGE_CLASS).appendTo(this._$bar)
    },
    _renderValue: function() {
        var val = this.option("value");
        var min = this.option("min");
        var max = this.option("max");
        if (min > max) {
            return
        }
        if (val < min) {
            this.option("value", min);
            this._currentRatio = 0;
            return
        }
        if (val > max) {
            this.option("value", max);
            this._currentRatio = 1;
            return
        }
        var ratio = min === max ? 0 : (val - min) / (max - min);
        !this._needPreventAnimation && this._setRangeStyles({
            width: 100 * ratio + "%"
        });
        this.setAria({
            valuemin: this.option("min"),
            valuemax: max,
            valuenow: val
        });
        this._currentRatio = ratio
    },
    _rangeStylesConfig: function() {
        return {
            width: 100 * this._currentRatio + "%"
        }
    },
    _setRangeStyles: function(options) {
        _animation_fx__WEBPACK_IMPORTED_MODULE_5__["default"].stop(this._$range);
        if (!options) {
            this._$range.css({
                width: 0
            });
            return
        }
        if (this._needPreventAnimation || !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["hasWindow"])()) {
            return
        }
        _animation_fx__WEBPACK_IMPORTED_MODULE_5__["default"].animate(this._$range, {
            type: "custom",
            duration: 100,
            to: options
        })
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "value":
                this._renderValue();
                this.callBase(args);
                break;
            case "max":
            case "min":
                this._renderValue();
                break;
            default:
                this.callBase(args)
        }
    },
    _dispose: function() {
        _animation_fx__WEBPACK_IMPORTED_MODULE_5__["default"].stop(this._$range);
        this.callBase()
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_2__["default"])("dxTrackBar", TrackBar);
/* harmony default export */ __webpack_exports__["default"] = (TrackBar);


/***/ })

}]);