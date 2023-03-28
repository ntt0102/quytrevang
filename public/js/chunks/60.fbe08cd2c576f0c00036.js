(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[60],{

/***/ "./node_modules/devextreme-vue/core/children-processing.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/children-processing.js ***!
  \*****************************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullAllChildren = exports.isFragment = void 0;
var vue_helper_1 = __webpack_require__(/*! ./vue-helper */ "./node_modules/devextreme-vue/core/vue-helper.js");
function pullAllChildren(directChildren, allChildren, config) {
    if (!directChildren || directChildren.length === 0) {
        return;
    }
    pullConfigComponents(directChildren, allChildren, config);
}
exports.pullAllChildren = pullAllChildren;
function isFragment(node) {
    var patchFlag = node.patchFlag;
    return patchFlag === 128 /* KEYED_FRAGMENT */
        || patchFlag === 256 /* UNKEYED_FRAGMENT */
        || patchFlag === 64 /* STABLE_FRAGMENT */;
}
exports.isFragment = isFragment;
function pullConfigComponents(children, nodes, ownerConfig) {
    children.forEach(function (node) {
        if (isFragment(node) && Array.isArray(node.children)) {
            pullConfigComponents(node.children, nodes, ownerConfig);
        }
        if (!isFragment(node)) {
            nodes.push(node);
        }
        if (!node) {
            return;
        }
        var componentInfo = vue_helper_1.getComponentInfo(node);
        if (!componentInfo || !componentInfo.$_optionName) {
            return;
        }
        var componentChildren = vue_helper_1.configurationChildren(node);
        var initialValues = __assign(__assign({}, componentInfo.$_predefinedProps), vue_helper_1.getNormalizedProps(node.props || {}));
        var config = ownerConfig.createNested(componentInfo.$_optionName, initialValues, componentInfo.$_isCollectionItem, componentInfo.$_expectedChildren);
        node.$_config = config;
        node.$_innerChanges = {};
        if (componentChildren) {
            pullConfigComponents(componentChildren, nodes, config);
        }
    });
}


/***/ }),

/***/ "./node_modules/devextreme-vue/core/component.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme-vue/core/component.js ***!
  \*******************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBaseComponent = exports.initDxComponent = void 0;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
var callbacks_1 = __importDefault(__webpack_require__(/*! devextreme/core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js"));
var events_1 = __webpack_require__(/*! devextreme/events */ "./node_modules/devextreme/esm/events/index.js");
var vue_helper_1 = __webpack_require__(/*! ./vue-helper */ "./node_modules/devextreme-vue/core/vue-helper.js");
var children_processing_1 = __webpack_require__(/*! ./children-processing */ "./node_modules/devextreme-vue/core/children-processing.js");
var configuration_1 = __importStar(__webpack_require__(/*! ./configuration */ "./node_modules/devextreme-vue/core/configuration.js"));
var configuration_component_1 = __webpack_require__(/*! ./configuration-component */ "./node_modules/devextreme-vue/core/configuration-component.js");
var constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/devextreme-vue/core/constants.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme-vue/core/helpers.js");
var templates_manager_1 = __webpack_require__(/*! ./templates-manager */ "./node_modules/devextreme-vue/core/templates-manager.js");
var includeAttrs = ["id", "class", "style"];
function getAttrs(attrs) {
    var attributes = {};
    includeAttrs.forEach(function (attr) {
        var attrValue = attrs[attr];
        if (attrValue) {
            attributes[attr] = attrValue;
        }
    });
    return attributes;
}
function initBaseComponent() {
    return vue_1.defineComponent({
        inheritAttrs: false,
        data: function () {
            return {
                eventBus: callbacks_1.default()
            };
        },
        provide: function () {
            return {
                eventBus: this.eventBus
            };
        },
        render: function () {
            var thisComponent = this;
            var children = [];
            if (thisComponent.$_config.cleanNested) {
                thisComponent.$_config.cleanNested();
            }
            children_processing_1.pullAllChildren(vue_helper_1.defaultSlots(this), children, thisComponent.$_config);
            this.$_processChildren(children);
            return vue_1.h("div", __assign({}, getAttrs(this.$attrs)), children);
        },
        beforeUpdate: function () {
            var thisComponent = this;
            thisComponent.$_config.setPrevNestedOptions(thisComponent.$_config.getNestedOptionValues());
        },
        updated: function () {
            var thisComponent = this;
            var nodes = cleanWidgetNode(this.$el);
            vue_helper_1.getChildren(thisComponent).forEach(function (child) {
                var _a;
                configuration_component_1.initOptionChangedFunc(child.$_config, child.type.props || {}, (_a = child === null || child === void 0 ? void 0 : child.component) === null || _a === void 0 ? void 0 : _a.proxy, child.$_innerChanges);
            });
            thisComponent.$_templatesManager.discover();
            thisComponent.$_instance.beginUpdate();
            if (thisComponent.$_templatesManager.isDirty) {
                thisComponent.$_instance.option("integrationOptions.templates", thisComponent.$_templatesManager.templates);
                var props = thisComponent.$.vnode.props;
                for (var _i = 0, _a = Object.keys(thisComponent.$_templatesManager.templates); _i < _a.length; _i++) {
                    var name_1 = _a[_i];
                    thisComponent.$_instance.option(helpers_1.getTemplatePropName(props, name_1), name_1);
                }
                thisComponent.$_templatesManager.resetDirtyFlag();
            }
            for (var _b = 0, _c = Object.keys(thisComponent.$_pendingOptions); _b < _c.length; _b++) {
                var name_2 = _c[_b];
                thisComponent.$_instance.option(name_2, thisComponent.$_pendingOptions[name_2]);
            }
            thisComponent.$_pendingOptions = {};
            this.$_applyConfigurationChanges();
            thisComponent.$_instance.endUpdate();
            restoreNodes(this.$el, nodes);
            this.eventBus.fire();
        },
        beforeUnmount: function () {
            var thisComponent = this;
            var instance = thisComponent.$_instance;
            if (instance) {
                events_1.triggerHandler(this.$el, constants_1.DX_REMOVE_EVENT);
                instance.dispose();
            }
        },
        created: function () {
            var thisComponent = this;
            var props = vue_helper_1.getComponentProps(this);
            thisComponent.$_config = new configuration_1.default(function (n, v) {
                if (Array.isArray(v)) {
                    thisComponent.$_instance.option(n, v);
                }
                else {
                    thisComponent.$_pendingOptions[n === vue_helper_1.VMODEL_NAME ? "value" : n] = v;
                }
            }, null, props && __assign({}, props), thisComponent.$_expectedChildren);
            thisComponent.$_innerChanges = {};
            thisComponent.$_config.init(this.$props && Object.keys(this.$props));
        },
        methods: {
            $_applyConfigurationChanges: function () {
                var thisComponent = this;
                thisComponent.$_config.componentsCountChanged.forEach(function (_a) {
                    var optionPath = _a.optionPath, isCollection = _a.isCollection, removed = _a.removed;
                    var options = thisComponent.$_config.getNestedOptionValues();
                    if (!isCollection && removed) {
                        thisComponent.$_instance.resetOption(optionPath);
                    }
                    else {
                        thisComponent.$_instance.option(optionPath, helpers_1.getOptionValue(options, optionPath));
                    }
                });
                thisComponent.$_config.cleanComponentsCountChanged();
            },
            $_createWidget: function (element) {
                var thisComponent = this;
                thisComponent.$_pendingOptions = {};
                thisComponent.$_templatesManager = new templates_manager_1.TemplatesManager(this);
                var config = thisComponent.$_config;
                if (config.initialValues.hasOwnProperty(vue_helper_1.VMODEL_NAME)) {
                    config.initialValues.value = vue_helper_1.getVModelValue(config.initialValues);
                }
                var options = __assign(__assign(__assign(__assign({ templatesRenderAsynchronously: thisComponent.$_hasAsyncTemplate }, vue_helper_1.getComponentProps(thisComponent)), config.initialValues), config.getNestedOptionValues()), this.$_getIntegrationOptions());
                var instance = new thisComponent.$_WidgetClass(element, options);
                thisComponent.$_instance = instance;
                instance.on("optionChanged", function (args) { return config.onOptionChanged(args); });
                configuration_1.setEmitOptionChangedFunc(config, thisComponent, thisComponent.$_innerChanges);
                configuration_1.bindOptionWatchers(config, thisComponent, thisComponent.$_innerChanges);
                this.$_createEmitters(instance);
            },
            $_getIntegrationOptions: function () {
                var thisComponent = this;
                var result = __assign({ integrationOptions: {
                        watchMethod: this.$_getWatchMethod(),
                    } }, this.$_getExtraIntegrationOptions());
                if (thisComponent.$_templatesManager.isDirty) {
                    var templates = thisComponent.$_templatesManager.templates;
                    result.integrationOptions.templates = templates;
                    var props = thisComponent.$.vnode.props;
                    for (var _i = 0, _a = Object.keys(templates); _i < _a.length; _i++) {
                        var name_3 = _a[_i];
                        result[helpers_1.getTemplatePropName(props, name_3)] = name_3;
                    }
                    thisComponent.$_templatesManager.resetDirtyFlag();
                }
                return result;
            },
            $_getWatchMethod: function () {
                var _this = this;
                return function (valueGetter, valueChangeCallback, options) {
                    options = options || {};
                    if (!options.skipImmediate) {
                        valueChangeCallback(valueGetter());
                    }
                    return _this.$watch(function () {
                        return valueGetter();
                    }, function (newValue, oldValue) {
                        if (helpers_1.toComparable(oldValue) !== helpers_1.toComparable(newValue) || options.deep) {
                            valueChangeCallback(newValue);
                        }
                    }, {
                        deep: options.deep
                    });
                };
            },
            $_getExtraIntegrationOptions: function () {
                return {};
            },
            $_processChildren: function (_children) {
                return;
            },
            $_createEmitters: function (instance) {
                var _this = this;
                if (this.$attrs) {
                    Object.keys(this.$attrs).forEach(function (listenerName) {
                        var eventName = helpers_1.camelize(listenerName);
                        instance.on(eventName, function (e) {
                            _this.$emit(listenerName, e);
                        });
                    });
                }
            }
        }
    });
}
exports.initBaseComponent = initBaseComponent;
function cleanWidgetNode(node) {
    var removedNodes = [];
    helpers_1.forEachChildNode(node, function (childNode) {
        var parent = childNode.parentNode;
        var isExtension = childNode.hasAttribute && childNode.hasAttribute("isExtension");
        if ((childNode.nodeName === "#comment" || isExtension) && parent) {
            removedNodes.push(childNode);
            parent.removeChild(childNode);
        }
    });
    return removedNodes;
}
function restoreNodes(el, nodes) {
    nodes.forEach(function (node) {
        el.appendChild(node);
    });
}
function initDxComponent() {
    return vue_1.defineComponent({
        extends: initBaseComponent(),
        methods: {
            $_getExtraIntegrationOptions: function () {
                return {
                    onInitializing: function () {
                        this.beginUpdate();
                    }
                };
            },
            $_processChildren: function (children) {
                children.forEach(function (childNode) {
                    if (!childNode || typeof childNode !== "object") {
                        return;
                    }
                    childNode.$_hasOwner = true;
                });
            },
        },
        mounted: function () {
            var _this = this;
            var nodes = cleanWidgetNode(this.$el);
            var thisComponent = this;
            this.$_createWidget(this.$el);
            thisComponent.$_instance.endUpdate();
            restoreNodes(this.$el, nodes);
            if (this.$slots && this.$slots.default) {
                vue_helper_1.getChildren(thisComponent).forEach(function (child) {
                    var childExtenton = child;
                    if (childExtenton && childExtenton.$_isExtension) {
                        childExtenton.$_attachTo(_this.$el);
                    }
                });
            }
        }
    });
}
exports.initDxComponent = initDxComponent;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/config.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme-vue/core/config.js ***!
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOption = void 0;
var config = {
    deepWatch: false
};
function setOptions(options) {
    config = __assign(__assign({}, config), options);
}
function getOption(optionName) {
    return config[optionName];
}
exports.getOption = getOption;
exports.default = setOptions;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/configuration-component.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/configuration-component.js ***!
  \*********************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.getInnerChanges = exports.getConfig = exports.initOptionChangedFunc = exports.initDxConfiguration = void 0;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
var vue_helper_1 = __webpack_require__(/*! ./vue-helper */ "./node_modules/devextreme-vue/core/vue-helper.js");
var configuration_1 = __webpack_require__(/*! ./configuration */ "./node_modules/devextreme-vue/core/configuration.js");
function getConfig(vueInstance) {
    var componentOptions = vue_helper_1.getNodeOptions(vueInstance);
    if (!componentOptions) {
        return;
    }
    return componentOptions.$_config || vueInstance.$_config;
}
exports.getConfig = getConfig;
function getInnerChanges(vueInstance) {
    var componentOptions = vue_helper_1.getNodeOptions(vueInstance);
    if (!componentOptions) {
        return;
    }
    return componentOptions.$_innerChanges || vueInstance.$_innerChanges;
}
exports.getInnerChanges = getInnerChanges;
function initOptionChangedFunc(config, props, vueInstance, innerChanges) {
    if (!config) {
        return;
    }
    config.init(Object.keys(props));
    if (vueInstance) {
        configuration_1.setEmitOptionChangedFunc(config, vueInstance, innerChanges);
    }
}
exports.initOptionChangedFunc = initOptionChangedFunc;
function getComponentInfo(_a, removed) {
    var name = _a.name, isCollectionItem = _a.isCollectionItem, ownerConfig = _a.ownerConfig;
    var parentPath = ownerConfig && ownerConfig.fullPath;
    var optionPath = name && parentPath ? parentPath + "." + name : name || "";
    return {
        optionPath: optionPath,
        isCollection: isCollectionItem,
        removed: removed
    };
}
function initDxConfiguration() {
    return vue_1.defineComponent({
        beforeMount: function () {
            var thisComponent = this;
            var config = getConfig(thisComponent);
            var innerChanges = getInnerChanges(thisComponent);
            initOptionChangedFunc(config, vue_helper_1.getNodeTypeOfComponent(thisComponent).props, thisComponent, innerChanges);
            configuration_1.bindOptionWatchers(config, this, innerChanges);
        },
        mounted: function () {
            if (this.$parent.$_instance) {
                this.$parent.$_config.componentsCountChanged
                    .push(getComponentInfo(getConfig(this)));
            }
        },
        beforeUnmount: function () {
            var config = getConfig(this);
            if (config) {
                this.$parent.$_config.componentsCountChanged
                    .push(getComponentInfo(config, true));
            }
        },
        render: function () {
            return null;
        }
    });
}
exports.initDxConfiguration = initDxConfiguration;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/configuration.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme-vue/core/configuration.js ***!
  \***********************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEmitOptionChangedFunc = exports.bindOptionWatchers = void 0;
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/devextreme-vue/core/config.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme-vue/core/helpers.js");
var vue_helper_1 = __webpack_require__(/*! ./vue-helper */ "./node_modules/devextreme-vue/core/vue-helper.js");
var Configuration = /** @class */ (function () {
    function Configuration(updateFunc, name, initialValues, expectedChildren, isCollectionItem, collectionItemIndex, ownerConfig) {
        this._updateFunc = updateFunc;
        this._name = name;
        this._initialValues = initialValues ? initialValues : {};
        this._nestedConfigurations = [];
        this._isCollectionItem = !!isCollectionItem;
        this._collectionItemIndex = collectionItemIndex;
        this._expectedChildren = expectedChildren || {};
        this._ownerConfig = ownerConfig;
        this._componentChanges = [];
        this.updateValue = this.updateValue.bind(this);
    }
    Object.defineProperty(Configuration.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "fullName", {
        get: function () {
            return this._name && this._isCollectionItem
                ? this._name + "[" + this._collectionItemIndex + "]"
                : this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "componentsCountChanged", {
        get: function () {
            return this._componentChanges;
        },
        enumerable: false,
        configurable: true
    });
    Configuration.prototype.cleanComponentsCountChanged = function () {
        this._componentChanges = [];
    };
    Object.defineProperty(Configuration.prototype, "fullPath", {
        get: function () {
            return this._ownerConfig && this._ownerConfig.fullPath
                ? this._ownerConfig.fullPath + "." + this.fullName
                : this.fullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "ownerConfig", {
        get: function () {
            return this._ownerConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "initialValues", {
        get: function () {
            return this._initialValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "expectedChildren", {
        get: function () {
            return this._expectedChildren;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "nested", {
        get: function () {
            return this._nestedConfigurations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "prevNestedOptions", {
        get: function () {
            return this._prevNestedConfigOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "collectionItemIndex", {
        get: function () {
            return this._collectionItemIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "isCollectionItem", {
        get: function () {
            return this._isCollectionItem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "updateFunc", {
        get: function () {
            return this._updateFunc;
        },
        enumerable: false,
        configurable: true
    });
    Configuration.prototype.init = function (options) {
        this._options = options ? options : [];
    };
    Object.defineProperty(Configuration.prototype, "emitOptionChanged", {
        set: function (handler) {
            this._emitOptionChanged = handler;
        },
        enumerable: false,
        configurable: true
    });
    Configuration.prototype.setPrevNestedOptions = function (value) {
        this._prevNestedConfigOptions = value;
    };
    Configuration.prototype.onOptionChanged = function (args) {
        if (helpers_1.isEqual(args.value, args.previousValue)) {
            return;
        }
        this._onOptionChanged(args.fullName.split("."), args);
    };
    Configuration.prototype.cleanNested = function () {
        this._nestedConfigurations = [];
    };
    Configuration.prototype.createNested = function (name, initialValues, isCollectionItem, expectedChildren) {
        var expected = this._expectedChildren[name];
        var actualName = name;
        var actualIsCollectionItem = isCollectionItem;
        if (expected) {
            actualIsCollectionItem = expected.isCollectionItem;
            if (expected.optionName) {
                actualName = expected.optionName;
            }
        }
        var collectionItemIndex = -1;
        if (actualIsCollectionItem && actualName) {
            collectionItemIndex = this._nestedConfigurations.filter(function (c) { return c._name && c._name === actualName; }).length;
        }
        var configuration = new Configuration(this._updateFunc, actualName, initialValues, expectedChildren, actualIsCollectionItem, collectionItemIndex, this);
        this._nestedConfigurations.push(configuration);
        return configuration;
    };
    Configuration.prototype.updateValue = function (nestedName, value) {
        var fullName = [this.fullPath, nestedName].filter(function (n) { return n; }).join(".");
        this._updateFunc(fullName, value);
    };
    Configuration.prototype.getNestedOptionValues = function () {
        var values = {};
        this._nestedConfigurations.forEach(function (o) {
            if (!o._name) {
                return;
            }
            var nestedValue = __assign(__assign({}, o.initialValues), o.getNestedOptionValues());
            if (!nestedValue) {
                return;
            }
            if (!o._isCollectionItem) {
                values[o._name] = nestedValue;
            }
            else {
                var arr = values[o._name];
                if (!arr || !Array.isArray(arr)) {
                    arr = [];
                    values[o._name] = arr;
                }
                arr.push(nestedValue);
            }
        });
        return values;
    };
    Configuration.prototype.getOptionsToWatch = function () {
        var blackList = {};
        this._nestedConfigurations.forEach(function (c) { return c._name && (blackList[c._name] = true); });
        return this._options.filter(function (o) { return !blackList[o]; });
    };
    Configuration.prototype._onOptionChanged = function (optionRelPath, args) {
        if (optionRelPath.length === 0) {
            return;
        }
        var optionInfo = helpers_1.getOptionInfo(optionRelPath[0]);
        if (optionInfo.isCollection || optionRelPath.length > 1) {
            var nestedConfig = this._getNestedConfig(optionInfo.fullName);
            if (nestedConfig) {
                nestedConfig._onOptionChanged(optionRelPath.slice(1), args);
                return;
            }
            this._tryEmitOptionChanged(optionInfo.name, args.component.option(this.fullPath ? this.fullPath + "." + optionInfo.name : optionInfo.name));
        }
        else {
            this._tryEmitOptionChanged(optionInfo.name, args.value);
        }
    };
    Configuration.prototype._getNestedConfig = function (fullName) {
        for (var _i = 0, _a = this._nestedConfigurations; _i < _a.length; _i++) {
            var nestedConfig = _a[_i];
            if (nestedConfig.fullName === fullName) {
                return nestedConfig;
            }
        }
        return undefined;
    };
    Configuration.prototype._tryEmitOptionChanged = function (name, value) {
        if (this._emitOptionChanged) {
            this._emitOptionChanged(name, value);
        }
    };
    return Configuration;
}());
function bindOptionWatchers(config, vueInstance, innerChanges) {
    var targets = config && config.getOptionsToWatch();
    if (targets) {
        targets.forEach(function (optionName) {
            vueInstance.$watch(optionName, function (value) {
                if (!innerChanges.hasOwnProperty(optionName) ||
                    innerChanges[optionName] !== value) {
                    config.updateValue(optionName, value);
                }
                delete innerChanges[optionName];
            }, { deep: config_1.getOption("deepWatch") });
        });
    }
}
exports.bindOptionWatchers = bindOptionWatchers;
function hasProp(vueInstance, propName) {
    var props = vueInstance.$options.props;
    return props && props.hasOwnProperty(propName);
}
function hasVModelValue(options, props, vnode) {
    var _a;
    return options.model
        && props.hasOwnProperty(vue_helper_1.VMODEL_NAME)
        && ((_a = vnode === null || vnode === void 0 ? void 0 : vnode.props) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(vue_helper_1.VMODEL_NAME));
}
function setEmitOptionChangedFunc(config, vueInstance, innerChanges) {
    config.emitOptionChanged = function (name, value) {
        var _a;
        var props = vueInstance.$props;
        var vnode = (_a = vueInstance === null || vueInstance === void 0 ? void 0 : vueInstance.$) === null || _a === void 0 ? void 0 : _a.vnode;
        if (hasProp(vueInstance, name) && !helpers_1.isEqual(value, props[name]) && vueInstance.$emit) {
            innerChanges[name] = value;
            var eventName = name === "value" && hasVModelValue(vueInstance.$options, props, vnode) ?
                "update:" + vue_helper_1.VMODEL_NAME :
                "update:" + name;
            vueInstance.$emit(eventName, value);
        }
    };
}
exports.setEmitOptionChangedFunc = setEmitOptionChangedFunc;
exports.default = Configuration;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/constants.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme-vue/core/constants.js ***!
  \*******************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.DX_REMOVE_EVENT = exports.DX_TEMPLATE_WRAPPER_CLASS = void 0;
var DX_TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
exports.DX_TEMPLATE_WRAPPER_CLASS = DX_TEMPLATE_WRAPPER_CLASS;
var DX_REMOVE_EVENT = "dxremove";
exports.DX_REMOVE_EVENT = DX_REMOVE_EVENT;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/extension-component.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/extension-component.js ***!
  \*****************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.initDxExtensionComponent = void 0;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
var component_1 = __webpack_require__(/*! ./component */ "./node_modules/devextreme-vue/core/component.js");
var vue_helper_1 = __webpack_require__(/*! ./vue-helper */ "./node_modules/devextreme-vue/core/vue-helper.js");
function initDxExtensionComponent() {
    return vue_1.defineComponent({
        extends: component_1.initBaseComponent(),
        created: function () {
            var nodeOptions = vue_helper_1.getNodeOptions(this);
            nodeOptions.$_isExtension = true;
            nodeOptions.$_attachTo = this.attachTo.bind(this);
        },
        mounted: function () {
            this.$el.setAttribute("isExtension", "true");
            var componentOptions = vue_helper_1.getNodeOptions(this);
            if (componentOptions && componentOptions.$_hasOwner) {
                return;
            }
            this.attachTo(this.$el);
        },
        methods: {
            attachTo: function (element) {
                this.$_createWidget(element);
            }
        }
    });
}
exports.initDxExtensionComponent = initDxExtensionComponent;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/helpers.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme-vue/core/helpers.js ***!
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionInfo = exports.getOptionValue = exports.allKeysAreEqual = exports.forEachChildNode = exports.isEqual = exports.toComparable = exports.camelize = exports.lowercaseFirst = exports.uppercaseFirst = exports.getTemplatePropName = void 0;
function getTemplatePropName(props, templateName) {
    for (var propName in props) {
        if (props[propName] === templateName) {
            return propName;
        }
    }
    return templateName;
}
exports.getTemplatePropName = getTemplatePropName;
function uppercaseFirst(value) {
    return value[0].toUpperCase() + value.substr(1);
}
exports.uppercaseFirst = uppercaseFirst;
function lowercaseFirst(value) {
    return value[0].toLowerCase() + value.substr(1);
}
exports.lowercaseFirst = lowercaseFirst;
function camelize(value) {
    return lowercaseFirst(value.split("-").map(function (v) { return uppercaseFirst(v); }).join(""));
}
exports.camelize = camelize;
function toComparable(value) {
    return value instanceof Date ? value.getTime() : value;
}
exports.toComparable = toComparable;
function isEqual(value1, value2) {
    if (toComparable(value1) === toComparable(value2)) {
        return true;
    }
    if (Array.isArray(value1) && Array.isArray(value2)) {
        return value1.length === 0 && value2.length === 0;
    }
    return false;
}
exports.isEqual = isEqual;
function forEachChildNode(el, callback) {
    Array.prototype.slice.call(el.childNodes).forEach(callback);
}
exports.forEachChildNode = forEachChildNode;
function allKeysAreEqual(obj1, obj2) {
    var obj1Keys = Object.keys(obj1);
    if (obj1Keys.length !== Object.keys(obj2).length) {
        return false;
    }
    for (var _i = 0, obj1Keys_1 = obj1Keys; _i < obj1Keys_1.length; _i++) {
        var key = obj1Keys_1[_i];
        if (!obj2.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
exports.allKeysAreEqual = allKeysAreEqual;
function getOptionValue(options, optionPath) {
    var value = options;
    optionPath.split(".").forEach(function (p) {
        var optionInfo = getOptionInfo(p);
        if (value) {
            value = optionInfo.isCollection ?
                value[optionInfo.name] && value[optionInfo.name][optionInfo.index] :
                value[optionInfo.name];
        }
    });
    return value;
}
exports.getOptionValue = getOptionValue;
function getOptionInfo(name) {
    var parts = name.split("[");
    if (parts.length === 1) {
        return {
            isCollection: false,
            name: name,
            fullName: name
        };
    }
    return {
        isCollection: true,
        name: parts[0],
        fullName: name,
        index: Number(parts[1].slice(0, -1))
    };
}
exports.getOptionInfo = getOptionInfo;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/index.js":
/*!***************************************************!*\
  !*** ./node_modules/devextreme-vue/core/index.js ***!
  \***************************************************/
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


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtensionComponent = exports.createConfigurationComponent = exports.createComponent = void 0;
var vue2Stategy = __importStar(__webpack_require__(/*! ./strategy/vue2/index */ "./node_modules/devextreme-vue/core/strategy/vue2/index.js"));
var vue3Stategy = __importStar(__webpack_require__(/*! ./strategy/vue3/index */ "./node_modules/devextreme-vue/core/strategy/vue3/index.js"));
var version_1 = __webpack_require__(/*! ./version */ "./node_modules/devextreme-vue/core/version.js");
var strategy = version_1.isVue3() ? vue3Stategy : vue2Stategy;
exports.createComponent = strategy.createComponent;
exports.createConfigurationComponent = strategy.createConfigurationComponent;
exports.createExtensionComponent = strategy.createExtensionComponent;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/children-processing.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/children-processing.js ***!
  \*******************************************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullAllChildren = void 0;
function pullAllChildren(directChildren, allChildren, config) {
    if (!directChildren || directChildren.length === 0) {
        return;
    }
    pullConfigComponents(directChildren, allChildren, config);
}
exports.pullAllChildren = pullAllChildren;
function pullConfigComponents(children, nodes, ownerConfig) {
    children.forEach(function (node) {
        nodes.push(node);
        if (!node.componentOptions) {
            return;
        }
        var configComponent = node.componentOptions.Ctor;
        if (!configComponent.$_optionName) {
            return;
        }
        var initialValues = __assign(__assign({}, configComponent.$_predefinedProps), node.componentOptions.propsData);
        var config = ownerConfig.createNested(configComponent.$_optionName, initialValues, configComponent.$_isCollectionItem, configComponent.$_expectedChildren);
        node.componentOptions.$_config = config;
        node.componentOptions.$_innerChanges = {};
        if (node.componentOptions.children) {
            pullConfigComponents(node.componentOptions.children, nodes, config);
        }
    });
}


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/component.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/component.js ***!
  \*********************************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = exports.DxComponent = void 0;
var VueType = __importStar(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js"));
var events_1 = __webpack_require__(/*! devextreme/events */ "./node_modules/devextreme/esm/events/index.js");
var children_processing_1 = __webpack_require__(/*! ./children-processing */ "./node_modules/devextreme-vue/core/strategy/vue2/children-processing.js");
var configuration_1 = __importStar(__webpack_require__(/*! ./configuration */ "./node_modules/devextreme-vue/core/strategy/vue2/configuration.js"));
var configuration_component_1 = __webpack_require__(/*! ./configuration-component */ "./node_modules/devextreme-vue/core/strategy/vue2/configuration-component.js");
var constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/devextreme-vue/core/strategy/vue2/constants.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme-vue/core/strategy/vue2/helpers.js");
var templates_manager_1 = __webpack_require__(/*! ./templates-manager */ "./node_modules/devextreme-vue/core/strategy/vue2/templates-manager.js");
var Vue = VueType.default || VueType;
var BaseComponent = function () { return Vue.extend({
    inheritAttrs: false,
    data: function () {
        return {
            eventBus: new Vue()
        };
    },
    provide: function () {
        return {
            eventBus: this.eventBus
        };
    },
    render: function (createElement) {
        var children = [];
        if (this.$_config.cleanNested) {
            this.$_config.cleanNested();
        }
        children_processing_1.pullAllChildren(this.$slots.default, children, this.$_config);
        this.$_processChildren(children);
        return createElement("div", {
            attrs: { id: this.$attrs.id }
        }, children);
    },
    beforeUpdate: function () {
        this.$_config.setPrevNestedOptions(this.$_config.getNestedOptionValues());
    },
    updated: function () {
        var _a, _b;
        this.$children.forEach(function (child) { return configuration_component_1.initOptionChangedFunc(configuration_component_1.getConfig(child), child, configuration_component_1.getInnerChanges(child)); });
        this.$_templatesManager.discover();
        this.$_instance.beginUpdate();
        if (this.$_templatesManager.isDirty) {
            this.$_instance.option("integrationOptions.templates", this.$_templatesManager.templates);
            var props = (_b = (_a = this.$vnode) === null || _a === void 0 ? void 0 : _a.componentOptions) === null || _b === void 0 ? void 0 : _b.propsData;
            for (var _i = 0, _c = Object.keys(this.$_templatesManager.templates); _i < _c.length; _i++) {
                var name_1 = _c[_i];
                this.$_instance.option(helpers_1.getTemplatePropName(props, name_1), name_1);
            }
            this.$_templatesManager.resetDirtyFlag();
        }
        for (var _d = 0, _e = Object.keys(this.$_pendingOptions); _d < _e.length; _d++) {
            var name_2 = _e[_d];
            this.$_instance.option(name_2, this.$_pendingOptions[name_2]);
        }
        this.$_pendingOptions = {};
        this.$_applyConfigurationChanges();
        this.$_instance.endUpdate();
        this.eventBus.$emit("updated");
    },
    beforeDestroy: function () {
        var instance = this.$_instance;
        if (instance) {
            events_1.triggerHandler(this.$el, constants_1.DX_REMOVE_EVENT);
            instance.dispose();
        }
    },
    created: function () {
        var _this = this;
        this.$_config = new configuration_1.default(function (n, v) { return _this.$_pendingOptions[n] = v; }, null, this.$options.propsData && __assign({}, this.$options.propsData), this.$_expectedChildren);
        this.$_innerChanges = {};
        this.$_config.init(this.$props && Object.keys(this.$props));
    },
    methods: {
        $_applyConfigurationChanges: function () {
            var _this = this;
            this.$_config.componentsCountChanged.forEach(function (_a) {
                var optionPath = _a.optionPath, isCollection = _a.isCollection, removed = _a.removed;
                var options = _this.$_config.getNestedOptionValues();
                if (!isCollection && removed) {
                    _this.$_instance.resetOption(optionPath);
                }
                else {
                    _this.$_instance.option(optionPath, helpers_1.getOptionValue(options, optionPath));
                }
            });
            this.$_config.cleanComponentsCountChanged();
        },
        $_createWidget: function (element) {
            var thisComponent = this;
            thisComponent.$_pendingOptions = {};
            thisComponent.$_templatesManager = new templates_manager_1.TemplatesManager(this);
            var config = this.$_config;
            var options = __assign(__assign(__assign(__assign({}, this.$options.propsData), config.initialValues), config.getNestedOptionValues()), this.$_getIntegrationOptions());
            var instance = new this.$_WidgetClass(element, options);
            thisComponent.$_instance = instance;
            instance.on("optionChanged", function (args) { return config.onOptionChanged(args); });
            configuration_1.setEmitOptionChangedFunc(config, this, this.$_innerChanges);
            configuration_1.bindOptionWatchers(config, this, this.$_innerChanges);
            this.$_createEmitters(instance);
        },
        $_getIntegrationOptions: function () {
            var _a, _b;
            var result = __assign({ integrationOptions: {
                    watchMethod: this.$_getWatchMethod(),
                } }, this.$_getExtraIntegrationOptions());
            if (this.$_templatesManager.isDirty) {
                var templates = this.$_templatesManager.templates;
                result.integrationOptions.templates = templates;
                var props = (_b = (_a = this.$vnode) === null || _a === void 0 ? void 0 : _a.componentOptions) === null || _b === void 0 ? void 0 : _b.propsData;
                for (var _i = 0, _c = Object.keys(templates); _i < _c.length; _i++) {
                    var name_3 = _c[_i];
                    result[helpers_1.getTemplatePropName(props, name_3)] = name_3;
                }
                this.$_templatesManager.resetDirtyFlag();
            }
            return result;
        },
        $_getWatchMethod: function () {
            var _this = this;
            return function (valueGetter, valueChangeCallback, options) {
                options = options || {};
                if (!options.skipImmediate) {
                    valueChangeCallback(valueGetter());
                }
                return _this.$watch(function () {
                    return valueGetter();
                }, function (newValue, oldValue) {
                    if (helpers_1.toComparable(oldValue) !== helpers_1.toComparable(newValue) || options.deep) {
                        valueChangeCallback(newValue);
                    }
                }, {
                    deep: options.deep
                });
            };
        },
        $_getExtraIntegrationOptions: function () {
            return {};
        },
        $_processChildren: function (_children) {
            return;
        },
        $_createEmitters: function (instance) {
            var _this = this;
            Object.keys(this.$listeners).forEach(function (listenerName) {
                var eventName = helpers_1.camelize(listenerName);
                instance.on(eventName, function (e) {
                    _this.$emit(listenerName, e);
                });
            });
        }
    }
}); };
exports.BaseComponent = BaseComponent;
function cleanWidgetNode(node) {
    var removedNodes = [];
    helpers_1.forEachChildNode(node, function (childNode) {
        var parent = childNode.parentNode;
        var isExtension = childNode.hasAttribute && childNode.hasAttribute("isExtension");
        if ((childNode.nodeName === "#comment" || isExtension) && parent) {
            removedNodes.push(childNode);
            parent.removeChild(childNode);
        }
    });
    return removedNodes;
}
function restoreNodes(el, nodes) {
    nodes.forEach(function (node) {
        el.appendChild(node);
    });
}
var DxComponent = function () { return BaseComponent().extend({
    methods: {
        $_getExtraIntegrationOptions: function () {
            return {
                onInitializing: function () {
                    this.beginUpdate();
                }
            };
        },
        $_processChildren: function (children) {
            children.forEach(function (childNode) {
                if (!childNode.componentOptions) {
                    return;
                }
                childNode.componentOptions.$_hasOwner = true;
            });
        },
    },
    mounted: function () {
        var _this = this;
        var nodes = cleanWidgetNode(this.$el);
        this.$_createWidget(this.$el);
        this.$_instance.endUpdate();
        restoreNodes(this.$el, nodes);
        if (this.$slots && this.$slots.default) {
            this.$slots.default.forEach(function (child) {
                var childExtension = child.componentInstance;
                if (childExtension && childExtension.$_isExtension) {
                    childExtension.attachTo(_this.$el);
                }
            });
        }
    }
}); };
exports.DxComponent = DxComponent;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/config.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/config.js ***!
  \******************************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOption = void 0;
var config = {
    useLegacyTemplateEngine: false
};
function setOptions(options) {
    config = __assign(__assign({}, config), options);
}
function getOption(optionName) {
    return config[optionName];
}
exports.getOption = getOption;
exports.default = setOptions;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/configuration-component.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/configuration-component.js ***!
  \***********************************************************************************/
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


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInnerChanges = exports.getConfig = exports.initOptionChangedFunc = exports.DxConfiguration = void 0;
var VueType = __importStar(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js"));
var Vue = VueType.default || VueType;
var configuration_1 = __webpack_require__(/*! ./configuration */ "./node_modules/devextreme-vue/core/strategy/vue2/configuration.js");
function getConfig(vueInstance) {
    if (!vueInstance.$vnode) {
        return;
    }
    var componentOptions = vueInstance.$vnode.componentOptions;
    return componentOptions && componentOptions.$_config;
}
exports.getConfig = getConfig;
function getInnerChanges(vueInstance) {
    if (!vueInstance.$vnode) {
        return;
    }
    var componentOptions = vueInstance.$vnode.componentOptions;
    return componentOptions && componentOptions.$_innerChanges;
}
exports.getInnerChanges = getInnerChanges;
function initOptionChangedFunc(config, vueInstance, innerChanges) {
    if (!config) {
        return;
    }
    config.init(Object.keys(vueInstance.$props));
    configuration_1.setEmitOptionChangedFunc(config, vueInstance, innerChanges);
}
exports.initOptionChangedFunc = initOptionChangedFunc;
function getComponentInfo(_a, removed) {
    var name = _a.name, isCollectionItem = _a.isCollectionItem, ownerConfig = _a.ownerConfig;
    var parentPath = ownerConfig && ownerConfig.fullPath;
    var optionPath = name && parentPath ? parentPath + "." + name : name || "";
    return {
        optionPath: optionPath,
        isCollection: isCollectionItem,
        removed: removed
    };
}
var DxConfiguration = function () { return Vue.extend({
    beforeMount: function () {
        var config = getConfig(this);
        var innerChanges = getInnerChanges(this);
        initOptionChangedFunc(config, this, innerChanges);
        configuration_1.bindOptionWatchers(config, this, innerChanges);
    },
    mounted: function () {
        if (this.$parent.$_instance) {
            this.$parent.$_config.componentsCountChanged
                .push(getComponentInfo(getConfig(this)));
        }
    },
    beforeDestroy: function () {
        this.$parent.$_config.componentsCountChanged
            .push(getComponentInfo(getConfig(this), true));
    },
    render: function (createElement) {
        return createElement();
    }
}); };
exports.DxConfiguration = DxConfiguration;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/configuration.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/configuration.js ***!
  \*************************************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEmitOptionChangedFunc = exports.bindOptionWatchers = void 0;
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme-vue/core/strategy/vue2/helpers.js");
var Configuration = /** @class */ (function () {
    function Configuration(updateFunc, name, initialValues, expectedChildren, isCollectionItem, collectionItemIndex, ownerConfig) {
        this._updateFunc = updateFunc;
        this._name = name;
        this._initialValues = initialValues ? initialValues : {};
        this._nestedConfigurations = [];
        this._isCollectionItem = !!isCollectionItem;
        this._collectionItemIndex = collectionItemIndex;
        this._expectedChildren = expectedChildren || {};
        this._ownerConfig = ownerConfig;
        this._componentChanges = [];
        this.updateValue = this.updateValue.bind(this);
    }
    Object.defineProperty(Configuration.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "fullName", {
        get: function () {
            return this._name && this._isCollectionItem
                ? this._name + "[" + this._collectionItemIndex + "]"
                : this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "componentsCountChanged", {
        get: function () {
            return this._componentChanges;
        },
        enumerable: false,
        configurable: true
    });
    Configuration.prototype.cleanComponentsCountChanged = function () {
        this._componentChanges = [];
    };
    Object.defineProperty(Configuration.prototype, "fullPath", {
        get: function () {
            return this._ownerConfig && this._ownerConfig.fullPath
                ? this._ownerConfig.fullPath + "." + this.fullName
                : this.fullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "ownerConfig", {
        get: function () {
            return this._ownerConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "initialValues", {
        get: function () {
            return this._initialValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "expectedChildren", {
        get: function () {
            return this._expectedChildren;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "nested", {
        get: function () {
            return this._nestedConfigurations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "prevNestedOptions", {
        get: function () {
            return this._prevNestedConfigOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "collectionItemIndex", {
        get: function () {
            return this._collectionItemIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "isCollectionItem", {
        get: function () {
            return this._isCollectionItem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "updateFunc", {
        get: function () {
            return this._updateFunc;
        },
        enumerable: false,
        configurable: true
    });
    Configuration.prototype.init = function (options) {
        this._options = options ? options : [];
    };
    Object.defineProperty(Configuration.prototype, "emitOptionChanged", {
        set: function (handler) {
            this._emitOptionChanged = handler;
        },
        enumerable: false,
        configurable: true
    });
    Configuration.prototype.setPrevNestedOptions = function (value) {
        this._prevNestedConfigOptions = value;
    };
    Configuration.prototype.onOptionChanged = function (args) {
        if (helpers_1.isEqual(args.value, args.previousValue)) {
            return;
        }
        this._onOptionChanged(args.fullName.split("."), args);
    };
    Configuration.prototype.cleanNested = function () {
        this._nestedConfigurations = [];
    };
    Configuration.prototype.createNested = function (name, initialValues, isCollectionItem, expectedChildren) {
        var expected = this._expectedChildren[name];
        var actualName = name;
        var actualIsCollectionItem = isCollectionItem;
        if (expected) {
            actualIsCollectionItem = expected.isCollectionItem;
            if (expected.optionName) {
                actualName = expected.optionName;
            }
        }
        var collectionItemIndex = -1;
        if (actualIsCollectionItem && actualName) {
            collectionItemIndex = this._nestedConfigurations.filter(function (c) { return c._name && c._name === actualName; }).length;
        }
        var configuration = new Configuration(this._updateFunc, actualName, initialValues, expectedChildren, actualIsCollectionItem, collectionItemIndex, this);
        this._nestedConfigurations.push(configuration);
        return configuration;
    };
    Configuration.prototype.updateValue = function (nestedName, value) {
        var fullName = [this.fullPath, nestedName].filter(function (n) { return n; }).join(".");
        this._updateFunc(fullName, value);
    };
    Configuration.prototype.getNestedOptionValues = function () {
        var values = {};
        this._nestedConfigurations.forEach(function (o) {
            if (!o._name) {
                return;
            }
            var nestedValue = __assign(__assign({}, o.initialValues), o.getNestedOptionValues());
            if (!nestedValue) {
                return;
            }
            if (!o._isCollectionItem) {
                values[o._name] = nestedValue;
            }
            else {
                var arr = values[o._name];
                if (!arr || !Array.isArray(arr)) {
                    arr = [];
                    values[o._name] = arr;
                }
                arr.push(nestedValue);
            }
        });
        return values;
    };
    Configuration.prototype.getOptionsToWatch = function () {
        var blackList = {};
        this._nestedConfigurations.forEach(function (c) { return c._name && (blackList[c._name] = true); });
        return this._options.filter(function (o) { return !blackList[o]; });
    };
    Configuration.prototype._onOptionChanged = function (optionRelPath, args) {
        if (optionRelPath.length === 0) {
            return;
        }
        var optionInfo = helpers_1.getOptionInfo(optionRelPath[0]);
        if (optionInfo.isCollection || optionRelPath.length > 1) {
            var nestedConfig = this._getNestedConfig(optionInfo.fullName);
            if (nestedConfig) {
                nestedConfig._onOptionChanged(optionRelPath.slice(1), args);
                return;
            }
            this._tryEmitOptionChanged(optionInfo.name, args.component.option(this.fullPath ? this.fullPath + "." + optionInfo.name : optionInfo.name));
        }
        else {
            this._tryEmitOptionChanged(optionInfo.name, args.value);
        }
    };
    Configuration.prototype._getNestedConfig = function (fullName) {
        for (var _i = 0, _a = this._nestedConfigurations; _i < _a.length; _i++) {
            var nestedConfig = _a[_i];
            if (nestedConfig.fullName === fullName) {
                return nestedConfig;
            }
        }
        return undefined;
    };
    Configuration.prototype._tryEmitOptionChanged = function (name, value) {
        if (this._emitOptionChanged) {
            this._emitOptionChanged(name, value);
        }
    };
    return Configuration;
}());
function bindOptionWatchers(config, vueInstance, innerChanges) {
    var targets = config && config.getOptionsToWatch();
    if (targets) {
        targets.forEach(function (optionName) {
            vueInstance.$watch(optionName, function (value) {
                if (!innerChanges.hasOwnProperty(optionName) ||
                    innerChanges[optionName] !== value) {
                    config.updateValue(optionName, value);
                }
                delete innerChanges[optionName];
            });
        });
    }
}
exports.bindOptionWatchers = bindOptionWatchers;
function setEmitOptionChangedFunc(config, vueInstance, innerChanges) {
    config.emitOptionChanged = function (name, value) {
        if (!helpers_1.isEqual(value, vueInstance.$props[name])) {
            innerChanges[name] = value;
            vueInstance.$emit("update:" + name, value);
        }
    };
}
exports.setEmitOptionChangedFunc = setEmitOptionChangedFunc;
exports.default = Configuration;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/constants.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/constants.js ***!
  \*********************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.DX_REMOVE_EVENT = exports.DX_TEMPLATE_WRAPPER_CLASS = void 0;
var DX_TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
exports.DX_TEMPLATE_WRAPPER_CLASS = DX_TEMPLATE_WRAPPER_CLASS;
var DX_REMOVE_EVENT = "dxremove";
exports.DX_REMOVE_EVENT = DX_REMOVE_EVENT;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/errors.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/errors.js ***!
  \******************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_MULTIPLE_ROOTS_ERROR = void 0;
exports.TEMPLATE_MULTIPLE_ROOTS_ERROR = "Template must have a single root node.";


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/extension-component.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/extension-component.js ***!
  \*******************************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.DxExtensionComponent = void 0;
var component_1 = __webpack_require__(/*! ./component */ "./node_modules/devextreme-vue/core/strategy/vue2/component.js");
var DxExtensionComponent = function () { return component_1.BaseComponent().extend({
    created: function () {
        this.$_isExtension = true;
    },
    mounted: function () {
        this.$el.setAttribute("isExtension", "true");
        if (this.$vnode && this.$vnode.componentOptions.$_hasOwner) {
            return;
        }
        this.attachTo(this.$el);
    },
    methods: {
        attachTo: function (element) {
            this.$_createWidget(element);
        }
    }
}); };
exports.DxExtensionComponent = DxExtensionComponent;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/helpers.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/helpers.js ***!
  \*******************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionInfo = exports.getOptionValue = exports.allKeysAreEqual = exports.forEachChildNode = exports.isEqual = exports.toComparable = exports.camelize = exports.lowercaseFirst = exports.uppercaseFirst = exports.getTemplatePropName = void 0;
function getTemplatePropName(props, templateName) {
    for (var propName in props) {
        if (props[propName] === templateName) {
            return propName;
        }
    }
    return templateName;
}
exports.getTemplatePropName = getTemplatePropName;
function uppercaseFirst(value) {
    return value[0].toUpperCase() + value.substr(1);
}
exports.uppercaseFirst = uppercaseFirst;
function lowercaseFirst(value) {
    return value[0].toLowerCase() + value.substr(1);
}
exports.lowercaseFirst = lowercaseFirst;
function camelize(value) {
    return lowercaseFirst(value.split("-").map(function (v) { return uppercaseFirst(v); }).join(""));
}
exports.camelize = camelize;
function toComparable(value) {
    return value instanceof Date ? value.getTime() : value;
}
exports.toComparable = toComparable;
function isEqual(value1, value2) {
    if (toComparable(value1) === toComparable(value2)) {
        return true;
    }
    if (Array.isArray(value1) && Array.isArray(value2)) {
        return value1.length === 0 && value2.length === 0;
    }
    return false;
}
exports.isEqual = isEqual;
function forEachChildNode(el, callback) {
    Array.prototype.slice.call(el.childNodes).forEach(callback);
}
exports.forEachChildNode = forEachChildNode;
function allKeysAreEqual(obj1, obj2) {
    var obj1Keys = Object.keys(obj1);
    if (obj1Keys.length !== Object.keys(obj2).length) {
        return false;
    }
    for (var _i = 0, obj1Keys_1 = obj1Keys; _i < obj1Keys_1.length; _i++) {
        var key = obj1Keys_1[_i];
        if (!obj2.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
exports.allKeysAreEqual = allKeysAreEqual;
function getOptionValue(options, optionPath) {
    var value = options;
    optionPath.split(".").forEach(function (p) {
        var optionInfo = getOptionInfo(p);
        if (value) {
            value = optionInfo.isCollection ?
                value[optionInfo.name] && value[optionInfo.name][optionInfo.index] :
                value[optionInfo.name];
        }
    });
    return value;
}
exports.getOptionValue = getOptionValue;
function getOptionInfo(name) {
    var parts = name.split("[");
    if (parts.length === 1) {
        return {
            isCollection: false,
            name: name,
            fullName: name
        };
    }
    return {
        isCollection: true,
        name: parts[0],
        fullName: name,
        index: Number(parts[1].slice(0, -1))
    };
}
exports.getOptionInfo = getOptionInfo;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/index.js ***!
  \*****************************************************************/
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


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtensionComponent = exports.createConfigurationComponent = exports.createComponent = void 0;
var VueType = __importStar(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js"));
var Vue = VueType.default || VueType;
var component_1 = __webpack_require__(/*! ./component */ "./node_modules/devextreme-vue/core/strategy/vue2/component.js");
var configuration_component_1 = __webpack_require__(/*! ./configuration-component */ "./node_modules/devextreme-vue/core/strategy/vue2/configuration-component.js");
var extension_component_1 = __webpack_require__(/*! ./extension-component */ "./node_modules/devextreme-vue/core/strategy/vue2/extension-component.js");
function createComponent(config) {
    config.extends = component_1.DxComponent();
    return Vue.extend(config);
}
exports.createComponent = createComponent;
function createConfigurationComponent(config) {
    config.extends = configuration_component_1.DxConfiguration();
    return Vue.extend(config);
}
exports.createConfigurationComponent = createConfigurationComponent;
function createExtensionComponent(config) {
    config.extends = extension_component_1.DxExtensionComponent();
    return Vue.extend(config);
}
exports.createExtensionComponent = createExtensionComponent;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/templates-discovering.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/templates-discovering.js ***!
  \*********************************************************************************/
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


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discover = exports.mountTemplate = void 0;
var VueType = __importStar(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js"));
var errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/devextreme-vue/core/strategy/vue2/errors.js");
var TEMPLATE_PROP = "template";
var Vue = VueType.default || VueType;
function asConfigurable(component) {
    if (!component.$vnode) {
        return undefined;
    }
    var configurable = component.$vnode.componentOptions;
    if (!configurable.$_config || !configurable.$_config.name) {
        return undefined;
    }
    return configurable;
}
function hasTemplate(component) {
    return TEMPLATE_PROP in component.$props && (component.$vnode.data && component.$vnode.data.scopedSlots);
}
function discover(component) {
    var templates = {};
    for (var slotName in component.$scopedSlots) {
        if (slotName === "default" && component.$slots.default) {
            continue;
        }
        var slot = component.$scopedSlots[slotName];
        if (!slot) {
            continue;
        }
        templates[slotName] = slot;
    }
    for (var _i = 0, _a = component.$children; _i < _a.length; _i++) {
        var childComponent = _a[_i];
        var configurable = asConfigurable(childComponent);
        if (!configurable) {
            continue;
        }
        var defaultSlot = childComponent.$scopedSlots.default;
        if (!defaultSlot || !hasTemplate(childComponent)) {
            continue;
        }
        var templateName = configurable.$_config.fullPath + "." + TEMPLATE_PROP;
        templates[templateName] = defaultSlot;
    }
    return templates;
}
exports.discover = discover;
function mountTemplate(getSlot, parent, data, name, placeholder) {
    return new Vue({
        el: placeholder,
        name: name,
        inject: ["eventBus"],
        parent: parent,
        created: function () {
            var _this = this;
            this.eventBus.$on("updated", function () {
                _this.$forceUpdate();
            });
        },
        render: function (createElement) {
            var content = getSlot()(data);
            if (!content) {
                return createElement("div");
            }
            if (content.length > 1) {
                throw new Error(errors_1.TEMPLATE_MULTIPLE_ROOTS_ERROR);
            }
            return content[0];
        },
        destroyed: function () {
            // T857821
            this.eventBus.$off("updated");
        }
    });
}
exports.mountTemplate = mountTemplate;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue2/templates-manager.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue2/templates-manager.js ***!
  \*****************************************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesManager = void 0;
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/devextreme-vue/core/strategy/vue2/config.js");
var templates_discovering_1 = __webpack_require__(/*! ./templates-discovering */ "./node_modules/devextreme-vue/core/strategy/vue2/templates-discovering.js");
var dom_adapter_1 = __importDefault(__webpack_require__(/*! devextreme/core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js"));
var events_1 = __webpack_require__(/*! devextreme/events */ "./node_modules/devextreme/esm/events/index.js");
var constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/devextreme-vue/core/strategy/vue2/constants.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme-vue/core/strategy/vue2/helpers.js");
var TemplatesManager = /** @class */ (function () {
    function TemplatesManager(component) {
        this._slots = {};
        this._templates = {};
        this._isDirty = false;
        this._component = component;
        this.discover();
    }
    TemplatesManager.prototype.discover = function () {
        var slots = templates_discovering_1.discover(this._component);
        this._slots = __assign(__assign({}, this._slots), slots);
        if (!helpers_1.allKeysAreEqual(this._templates, slots)) {
            this._prepareTemplates();
        }
    };
    Object.defineProperty(TemplatesManager.prototype, "templates", {
        get: function () {
            return this._templates;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TemplatesManager.prototype, "isDirty", {
        get: function () {
            return this._isDirty;
        },
        enumerable: false,
        configurable: true
    });
    TemplatesManager.prototype.resetDirtyFlag = function () {
        this._isDirty = false;
    };
    TemplatesManager.prototype._prepareTemplates = function () {
        this._templates = {};
        for (var _i = 0, _a = Object.keys(this._slots); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this._templates[name_1] = this.createDxTemplate(name_1);
        }
        this._isDirty = true;
    };
    TemplatesManager.prototype.createDxTemplate = function (name) {
        var _this = this;
        return {
            render: function (data) {
                var scopeData = config_1.getOption("useLegacyTemplateEngine")
                    ? data.model
                    : { data: data.model, index: data.index };
                var container = data.container.get ? data.container.get(0) : data.container;
                var placeholder = document.createElement("div");
                container.appendChild(placeholder);
                var mountedTemplate = templates_discovering_1.mountTemplate(function () { return _this._slots[name]; }, _this._component, scopeData, name, placeholder);
                var element = mountedTemplate.$el;
                dom_adapter_1.default.setClass(element, constants_1.DX_TEMPLATE_WRAPPER_CLASS, true);
                if (element.nodeType === Node.TEXT_NODE) {
                    var removalListener = document.createElement(container.nodeName === "TABLE" ? "tbody" : "span");
                    removalListener.style.display = "none";
                    container.appendChild(removalListener);
                    events_1.one(removalListener, constants_1.DX_REMOVE_EVENT, mountedTemplate.$destroy.bind(mountedTemplate));
                }
                else {
                    events_1.one(element, constants_1.DX_REMOVE_EVENT, mountedTemplate.$destroy.bind(mountedTemplate));
                }
                return element;
            }
        };
    };
    return TemplatesManager;
}());
exports.TemplatesManager = TemplatesManager;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/strategy/vue3/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/strategy/vue3/index.js ***!
  \*****************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtensionComponent = exports.createConfigurationComponent = exports.createComponent = void 0;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
var component_1 = __webpack_require__(/*! ../../component */ "./node_modules/devextreme-vue/core/component.js");
var configuration_component_1 = __webpack_require__(/*! ../../configuration-component */ "./node_modules/devextreme-vue/core/configuration-component.js");
var extension_component_1 = __webpack_require__(/*! ../../extension-component */ "./node_modules/devextreme-vue/core/extension-component.js");
var vue_helper_1 = __webpack_require__(/*! ../../vue-helper */ "./node_modules/devextreme-vue/core/vue-helper.js");
function createComponent(config) {
    config.extends = component_1.initDxComponent();
    if (config.model) {
        vue_helper_1.setVModel(config);
    }
    return vue_1.defineComponent(config);
}
exports.createComponent = createComponent;
function createConfigurationComponent(config) {
    config.extends = configuration_component_1.initDxConfiguration();
    return vue_1.defineComponent(config);
}
exports.createConfigurationComponent = createConfigurationComponent;
function createExtensionComponent(config) {
    config.extends = extension_component_1.initDxExtensionComponent();
    return vue_1.defineComponent(config);
}
exports.createExtensionComponent = createExtensionComponent;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/templates-discovering.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/templates-discovering.js ***!
  \*******************************************************************/
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


Object.defineProperty(exports, "__esModule", { value: true });
exports.discover = exports.mountTemplate = void 0;
var vue_helper_1 = __webpack_require__(/*! ./vue-helper */ "./node_modules/devextreme-vue/core/vue-helper.js");
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
var TEMPLATE_PROP = "template";
function asConfigurable(component) {
    var componentOptions = component;
    if (!componentOptions) {
        return;
    }
    if (!componentOptions.$_config || !componentOptions.$_config.name) {
        return undefined;
    }
    return componentOptions;
}
function hasTemplate(component) {
    return TEMPLATE_PROP in component.type.props && vue_helper_1.configurationTemplate(component);
}
function discover(component) {
    var templates = {};
    var namedTeplates = vue_helper_1.declaredTemplates(component);
    for (var slotName in namedTeplates) {
        if (slotName === "default" && component.$slots.default) {
            continue;
        }
        var slot = namedTeplates[slotName];
        if (!slot) {
            continue;
        }
        templates[slotName] = slot;
    }
    var componentChildren = vue_helper_1.getChildren(component);
    for (var _i = 0, componentChildren_1 = componentChildren; _i < componentChildren_1.length; _i++) {
        var childComponent = componentChildren_1[_i];
        var configurable = asConfigurable(childComponent);
        if (!configurable) {
            continue;
        }
        var defaultSlot = vue_helper_1.configurationDefaultTemplate(childComponent);
        if (!defaultSlot || !hasTemplate(childComponent)) {
            continue;
        }
        var templateName = configurable.$_config.fullPath + "." + TEMPLATE_PROP;
        templates[templateName] = defaultSlot;
    }
    return templates;
}
exports.discover = discover;
function clearConfiguration(content) {
    var newContent = [];
    content.forEach(function (item) {
        var configurable = vue_helper_1.getConfigurationOptions(item);
        if (!configurable || !configurable.$_optionName) {
            newContent.push(item);
        }
    });
    return newContent;
}
function mountTemplate(getSlot, parent, data, name, placeholder) {
    return vue_helper_1.mount({
        name: name,
        inject: ["eventBus"],
        created: function () {
            this.eventBus.add(this.$_updatedHandler);
        },
        mounted: function () {
            data.onRendered();
        },
        unmounted: function () {
            this.eventBus.remove(this.$_updatedHandler);
        },
        methods: {
            $_updatedHandler: function () {
                this.$forceUpdate();
            }
        },
        render: function () {
            var content = clearConfiguration(getSlot()(data));
            if (!content) {
                return vue_1.h("div");
            }
            return content.length > 1 ? content : content[0];
        }
    }, parent, placeholder);
}
exports.mountTemplate = mountTemplate;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/templates-manager.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme-vue/core/templates-manager.js ***!
  \***************************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesManager = void 0;
var templates_discovering_1 = __webpack_require__(/*! ./templates-discovering */ "./node_modules/devextreme-vue/core/templates-discovering.js");
var dom_adapter_1 = __importDefault(__webpack_require__(/*! devextreme/core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js"));
var events_1 = __webpack_require__(/*! devextreme/events */ "./node_modules/devextreme/esm/events/index.js");
var constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/devextreme-vue/core/constants.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme-vue/core/helpers.js");
var TemplatesManager = /** @class */ (function () {
    function TemplatesManager(component) {
        this._slots = {};
        this._templates = {};
        this._isDirty = false;
        this._component = component;
        this.discover();
    }
    TemplatesManager.prototype.discover = function () {
        var slots = templates_discovering_1.discover(this._component);
        this._slots = __assign(__assign({}, this._slots), slots);
        if (!helpers_1.allKeysAreEqual(this._templates, slots)) {
            this._prepareTemplates();
        }
    };
    Object.defineProperty(TemplatesManager.prototype, "templates", {
        get: function () {
            return this._templates;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TemplatesManager.prototype, "isDirty", {
        get: function () {
            return this._isDirty;
        },
        enumerable: false,
        configurable: true
    });
    TemplatesManager.prototype.resetDirtyFlag = function () {
        this._isDirty = false;
    };
    TemplatesManager.prototype._prepareTemplates = function () {
        this._templates = {};
        for (var _i = 0, _a = Object.keys(this._slots); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this._templates[name_1] = this.createDxTemplate(name_1);
        }
        this._isDirty = true;
    };
    TemplatesManager.prototype.createDxTemplate = function (name) {
        var _this = this;
        return {
            render: function (data) {
                var rendered = (function (onRendered, counter) {
                    if (counter === void 0) { counter = 0; }
                    return function () {
                        if (counter === 1 && onRendered) {
                            onRendered();
                        }
                        counter++;
                    };
                })(data.onRendered);
                var scopeData = { data: data.model, index: data.index, onRendered: rendered };
                var placeholder = document.createElement("div");
                var container = data.container.get ? data.container.get(0) : data.container;
                container.appendChild(placeholder);
                var mountedTemplate = templates_discovering_1.mountTemplate(function () { return _this._slots[name]; }, _this._component, scopeData, name, placeholder);
                var element = mountedTemplate.$el;
                container.removeChild(placeholder);
                while (placeholder.firstChild) {
                    container.appendChild(placeholder.firstChild);
                }
                dom_adapter_1.default.setClass(element, constants_1.DX_TEMPLATE_WRAPPER_CLASS, true);
                if (element.nodeType === Node.TEXT_NODE) {
                    var removalListener = document.createElement(container.nodeName === "TABLE" ? "tbody" : "span");
                    removalListener.style.display = "none";
                    container.appendChild(removalListener);
                    events_1.one(removalListener, constants_1.DX_REMOVE_EVENT, mountedTemplate.$.appContext.app.unmount.bind(mountedTemplate));
                }
                else {
                    events_1.one(element, constants_1.DX_REMOVE_EVENT, mountedTemplate.$.appContext.app.unmount.bind(mountedTemplate));
                }
                rendered();
                return element;
            }
        };
    };
    return TemplatesManager;
}());
exports.TemplatesManager = TemplatesManager;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/version.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme-vue/core/version.js ***!
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


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVue3 = exports.getVueVersion = void 0;
var VueType = __importStar(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js"));
var Vue = VueType.default || VueType;
function getVueVersion() {
    var currentVersion = Vue.version;
    return Number(currentVersion.split(".")[0]);
}
exports.getVueVersion = getVueVersion;
function isVue3() {
    return getVueVersion() === 3;
}
exports.isVue3 = isVue3;


/***/ }),

/***/ "./node_modules/devextreme-vue/core/vue-helper.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme-vue/core/vue-helper.js ***!
  \********************************************************/
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


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigurationOptions = exports.setVModel = exports.getVModelValue = exports.getNodeTypeOfComponent = exports.getNodeOptions = exports.usedConfigurationProps = exports.getComponentProps = exports.mount = exports.defaultSlots = exports.declaredTemplates = exports.configurationTemplate = exports.configurationDefaultTemplate = exports.configurationChildren = exports.getNormalizedProps = exports.getComponentInfo = exports.getChildren = exports.VMODEL_NAME = void 0;
var vue_1 = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme-vue/core/helpers.js");
var children_processing_1 = __webpack_require__(/*! ./children-processing */ "./node_modules/devextreme-vue/core/children-processing.js");
exports.VMODEL_NAME = "modelValue";
function getChildren(component) {
    if (!hasChildren(component) || !component.$_config) {
        return [];
    }
    var children = component.$.subTree && component.$.subTree.children;
    if (!Array.isArray(children)) {
        return [];
    }
    return children.filter(function (child) {
        if (!children_processing_1.isFragment(child)) {
            return child;
        }
        return;
    });
}
exports.getChildren = getChildren;
function getComponentInfo(component) {
    return getConfigurationOptions(component);
}
exports.getComponentInfo = getComponentInfo;
function getNormalizedProps(props) {
    var result = {};
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            result[helpers_1.camelize(propName)] = props[propName];
        }
    }
    return result;
}
exports.getNormalizedProps = getNormalizedProps;
function configurationChildren(component) {
    if (!component.children || !component.children.default) {
        return [];
    }
    return findConfigurationComponents(component.children.default());
}
exports.configurationChildren = configurationChildren;
function configurationDefaultTemplate(node) {
    if (!node.children || node.children === "object" || !node.children.default) {
        return;
    }
    return hasInlineTemplate(node.children.default()) ? node.children.default : undefined;
}
exports.configurationDefaultTemplate = configurationDefaultTemplate;
function configurationTemplate(node) {
    return configurationDefaultTemplate(node);
}
exports.configurationTemplate = configurationTemplate;
function declaredTemplates(component) {
    return component.$slots;
}
exports.declaredTemplates = declaredTemplates;
function defaultSlots(component) {
    var templates = declaredTemplates(component);
    if (!templates.default) {
        return [];
    }
    return templates.default();
}
exports.defaultSlots = defaultSlots;
function mount(options, parent, el) {
    var template = vue_1.createApp(options);
    template.provide("eventBus", parent.eventBus);
    setAppContext(template, parent);
    return template.mount(el);
}
exports.mount = mount;
function getComponentProps(component) {
    var props = component.$.vnode.props || {};
    return getNormalizedProps(props);
}
exports.getComponentProps = getComponentProps;
function usedConfigurationProps(node) {
    return node.props;
}
exports.usedConfigurationProps = usedConfigurationProps;
function getNodeOptions(component) {
    if (component.$) {
        return component.$.vnode;
    }
    return component;
}
exports.getNodeOptions = getNodeOptions;
function getNodeTypeOfComponent(component) {
    return component.$.vnode.type;
}
exports.getNodeTypeOfComponent = getNodeTypeOfComponent;
function getVModelValue(options) {
    return options[exports.VMODEL_NAME];
}
exports.getVModelValue = getVModelValue;
function setVModel(config) {
    var _a;
    var eventName = "update:" + exports.VMODEL_NAME;
    config.model.prop = exports.VMODEL_NAME;
    config.model.event = eventName;
    config.props.modelValue = {};
    config.emits = __assign(__assign({}, config.emits), (_a = {}, _a["" + eventName] = null, _a));
}
exports.setVModel = setVModel;
function setCustomPluginsData(appContext, parentAppContext) {
    for (var prop in parentAppContext) {
        if (!appContext.hasOwnProperty(prop) && parentAppContext.hasOwnProperty(prop)) {
            appContext[prop] = parentAppContext[prop];
        }
    }
}
function setAppContext(template, parent) {
    template._context.components = Object.assign(parent.$.appContext.components, template._context.components);
    Object.setPrototypeOf(template._context.provides, Object.getPrototypeOf(parent.$.provides));
    Object.assign(template._context.provides, parent.$.appContext.provides);
    template._context.config = parent.$.appContext.config;
    template._context.directives = parent.$.appContext.directives;
    template._context.mixins = parent.$.appContext.mixins;
    setCustomPluginsData(template._context.app, parent.$.appContext.app);
}
function findConfigurationComponents(children) {
    return children.filter(function (child) {
        if (children_processing_1.isFragment(child)) {
            return findConfigurationComponents(child.children || []);
        }
        var childType = child.type;
        if (childType && typeof childType === "object" && childType.$_optionName) {
            delete child.$_config;
            delete child.$_innerChanges;
            return child;
        }
        return;
    });
}
function hasInlineTemplate(children) {
    var hasTemplate = false;
    children.forEach(function (child) {
        if (!isConfiguration(child) && !children_processing_1.isFragment(child) && !isComment(child)) {
            hasTemplate = true;
        }
    });
    return hasTemplate;
}
function isComment(node) {
    var nodeType = node.type;
    var type = typeof nodeType === "symbol" ? nodeType.toString() : nodeType;
    return type === "Symbol(Comment)" || (type === "Symbol()" && !node.children);
}
function isConfiguration(child) {
    return child.type && typeof child.type === "object" && child.type.$_optionName;
}
function getConfigurationOptions(node) {
    return node.type;
}
exports.getConfigurationOptions = getConfigurationOptions;
function hasChildren(component) {
    return component.$.vnode && component.$.vnode.children && component.$.vnode.children.default;
}


/***/ }),

/***/ "./node_modules/devextreme/esm/animation/frame.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/animation/frame.js ***!
  \********************************************************/
/*! exports provided: requestAnimationFrame, cancelAnimationFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return requestAnimationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return cancelAnimationFrame; });
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_call_once__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/call_once */ "./node_modules/devextreme/esm/core/utils/call_once.js");
/**
 * DevExtreme (esm/animation/frame.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_0__["hasWindow"])() ? Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])() : {};

var FRAME_ANIMATION_STEP_TIME = 1e3 / 60;
var request = function(callback) {
    return setTimeout(callback, FRAME_ANIMATION_STEP_TIME)
};
var cancel = function(requestID) {
    clearTimeout(requestID)
};
var setAnimationFrameMethods = Object(_core_utils_call_once__WEBPACK_IMPORTED_MODULE_1__["default"])((function() {
    var nativeRequest = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var nativeCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
    if (nativeRequest && nativeCancel) {
        request = nativeRequest;
        cancel = nativeCancel
    }
    if (nativeRequest && !nativeCancel) {
        var canceledRequests = {};
        request = function(callback) {
            var requestId = nativeRequest.call(window, (function() {
                try {
                    if (requestId in canceledRequests) {
                        return
                    }
                    callback.apply(this, arguments)
                } finally {
                    delete canceledRequests[requestId]
                }
            }));
            return requestId
        };
        cancel = function(requestId) {
            canceledRequests[requestId] = true
        }
    }
}));
function requestAnimationFrame() {
    setAnimationFrameMethods();
    return request.apply(window, arguments)
}
function cancelAnimationFrame() {
    setAnimationFrameMethods();
    cancel.apply(window, arguments)
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/action.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme/esm/core/action.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Action; });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/**
 * DevExtreme (esm/core/action.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




class Action {
    constructor(action, config) {
        config = config || {};
        this._action = action;
        this._context = config.context || Object(_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])();
        this._beforeExecute = config.beforeExecute;
        this._afterExecute = config.afterExecute;
        this._component = config.component;
        this._validatingTargetName = config.validatingTargetName;
        var excludeValidators = this._excludeValidators = {};
        if (config.excludeValidators) {
            for (var i = 0; i < config.excludeValidators.length; i++) {
                excludeValidators[config.excludeValidators[i]] = true
            }
        }
    }
    execute() {
        var e = {
            action: this._action,
            args: Array.prototype.slice.call(arguments),
            context: this._context,
            component: this._component,
            validatingTargetName: this._validatingTargetName,
            cancel: false,
            handled: false
        };
        var beforeExecute = this._beforeExecute;
        var afterExecute = this._afterExecute;
        var argsBag = e.args[0] || {};
        if (!this._validateAction(e)) {
            return
        }
        null === beforeExecute || void 0 === beforeExecute ? void 0 : beforeExecute.call(this._context, e);
        if (e.cancel) {
            return
        }
        var result = this._executeAction(e);
        if (argsBag.cancel) {
            return
        }
        null === afterExecute || void 0 === afterExecute ? void 0 : afterExecute.call(this._context, e);
        return result
    }
    _validateAction(e) {
        var excludeValidators = this._excludeValidators;
        var {
            executors: executors
        } = Action;
        for (var name in executors) {
            if (!excludeValidators[name]) {
                var _executor$validate;
                var executor = executors[name];
                null === (_executor$validate = executor.validate) || void 0 === _executor$validate ? void 0 : _executor$validate.call(executor, e);
                if (e.cancel) {
                    return false
                }
            }
        }
        return true
    }
    _executeAction(e) {
        var result;
        var {
            executors: executors
        } = Action;
        for (var name in executors) {
            var _executor$execute;
            var executor = executors[name];
            null === (_executor$execute = executor.execute) || void 0 === _executor$execute ? void 0 : _executor$execute.call(executor, e);
            if (e.handled) {
                result = e.result;
                break
            }
        }
        return result
    }
    static registerExecutor(name, executor) {
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(name)) {
            Object(_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(name, Action.registerExecutor);
            return
        }
        Action.executors[name] = executor
    }
    static unregisterExecutor() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        Object(_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(args, (function() {
            delete Action.executors[this]
        }))
    }
}
Action.executors = {};
var createValidatorByTargetElement = condition => e => {
    if (!e.args.length) {
        return
    }
    var args = e.args[0];
    var element = args[e.validatingTargetName] || args.element;
    if (element && condition(Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element))) {
        e.cancel = true
    }
};
Action.registerExecutor({
    disabled: {
        validate: createValidatorByTargetElement($target => $target.is(".dx-state-disabled, .dx-state-disabled *"))
    },
    readOnly: {
        validate: createValidatorByTargetElement($target => $target.is(".dx-state-readonly, .dx-state-readonly *:not(.dx-state-independent)"))
    },
    undefined: {
        execute: e => {
            if (!e.action) {
                e.result = void 0;
                e.handled = true
            }
        }
    },
    func: {
        execute: e => {
            if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(e.action)) {
                e.result = e.action.call(e.context, e.args[0]);
                e.handled = true
            }
        }
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/core/component.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/core/component.js ***!
  \*******************************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./node_modules/devextreme/esm/core/config.js");
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _options_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options/index */ "./node_modules/devextreme/esm/core/options/index.js");
/* harmony import */ var _options_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options/utils */ "./node_modules/devextreme/esm/core/options/utils.js");
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./action */ "./node_modules/devextreme/esm/core/action.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _utils_callbacks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _events_strategy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events_strategy */ "./node_modules/devextreme/esm/core/events_strategy.js");
/* harmony import */ var _utils_public_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/public_component */ "./node_modules/devextreme/esm/core/utils/public_component.js");
/* harmony import */ var _postponed_operations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./postponed_operations */ "./node_modules/devextreme/esm/core/postponed_operations.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/**
 * DevExtreme (esm/core/component.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */














var getEventName = actionName => actionName.charAt(2).toLowerCase() + actionName.substr(3);
var isInnerOption = optionName => 0 === optionName.indexOf("_", 0);
var Component = _class__WEBPACK_IMPORTED_MODULE_4__["default"].inherit({
    _setDeprecatedOptions() {
        this._deprecatedOptions = {}
    },
    _getDeprecatedOptions() {
        return this._deprecatedOptions
    },
    _getDefaultOptions: () => ({
        onInitialized: null,
        onOptionChanged: null,
        onDisposing: null,
        defaultOptionsRules: null
    }),
    _defaultOptionsRules: () => [],
    _setOptionsByDevice(rules) {
        this._options.applyRules(rules)
    },
    _convertRulesToOptions: rules => Object(_options_utils__WEBPACK_IMPORTED_MODULE_3__["convertRulesToOptions"])(rules),
    _isInitialOptionValue(name) {
        return this._options.isInitial(name)
    },
    _setOptionsByReference() {
        this._optionsByReference = {}
    },
    _getOptionsByReference() {
        return this._optionsByReference
    },
    ctor() {
        var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        var {
            _optionChangedCallbacks: _optionChangedCallbacks,
            _disposingCallbacks: _disposingCallbacks
        } = options;
        this.NAME = Object(_utils_public_component__WEBPACK_IMPORTED_MODULE_9__["name"])(this.constructor);
        this._eventsStrategy = _events_strategy__WEBPACK_IMPORTED_MODULE_8__["EventsStrategy"].create(this, options.eventsStrategy);
        this._updateLockCount = 0;
        this._optionChangedCallbacks = _optionChangedCallbacks || Object(_utils_callbacks__WEBPACK_IMPORTED_MODULE_7__["default"])();
        this._disposingCallbacks = _disposingCallbacks || Object(_utils_callbacks__WEBPACK_IMPORTED_MODULE_7__["default"])();
        this.postponedOperations = new _postponed_operations__WEBPACK_IMPORTED_MODULE_10__["PostponedOperations"];
        this._createOptions(options)
    },
    _createOptions(options) {
        this.beginUpdate();
        try {
            this._setOptionsByReference();
            this._setDeprecatedOptions();
            this._options = new _options_index__WEBPACK_IMPORTED_MODULE_2__["Options"](this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
            this._options.onChanging((name, previousValue, value) => this._initialized && this._optionChanging(name, previousValue, value));
            this._options.onDeprecated((option, info) => this._logDeprecatedOptionWarning(option, info));
            this._options.onChanged((name, value, previousValue) => this._notifyOptionChanged(name, value, previousValue));
            this._options.onStartChange(() => this.beginUpdate());
            this._options.onEndChange(() => this.endUpdate());
            this._options.addRules(this._defaultOptionsRules());
            if (options && options.onInitializing) {
                options.onInitializing.apply(this, [options])
            }
            this._setOptionsByDevice(options.defaultOptionsRules);
            this._initOptions(options)
        } finally {
            this.endUpdate()
        }
    },
    _initOptions(options) {
        this.option(options)
    },
    _init() {
        this._createOptionChangedAction();
        this.on("disposing", args => {
            this._disposingCallbacks.fireWith(this, [args])
        })
    },
    _logDeprecatedOptionWarning(option, info) {
        var message = info.message || "Use the '".concat(info.alias, "' option instead");
        _errors__WEBPACK_IMPORTED_MODULE_6__["default"].log("W0001", this.NAME, option, info.since, message)
    },
    _logDeprecatedComponentWarning(since, alias) {
        _errors__WEBPACK_IMPORTED_MODULE_6__["default"].log("W0000", this.NAME, since, "Use the '".concat(alias, "' widget instead"))
    },
    _createOptionChangedAction() {
        this._optionChangedAction = this._createActionByOption("onOptionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _createDisposingAction() {
        this._disposingAction = this._createActionByOption("onDisposing", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _optionChanged(args) {
        switch (args.name) {
            case "onDisposing":
            case "onInitialized":
                break;
            case "onOptionChanged":
                this._createOptionChangedAction()
        }
    },
    _dispose() {
        this._optionChangedCallbacks.empty();
        this._createDisposingAction();
        this._disposingAction();
        this._eventsStrategy.dispose();
        this._options.dispose();
        this._disposed = true
    },
    _lockUpdate() {
        this._updateLockCount++
    },
    _unlockUpdate() {
        this._updateLockCount = Math.max(this._updateLockCount - 1, 0)
    },
    _isUpdateAllowed() {
        return 0 === this._updateLockCount
    },
    _isInitializingRequired() {
        return !this._initializing && !this._initialized
    },
    isInitialized() {
        return this._initialized
    },
    _commitUpdate() {
        this.postponedOperations.callPostponedOperations();
        this._isInitializingRequired() && this._initializeComponent()
    },
    _initializeComponent() {
        this._initializing = true;
        try {
            this._init()
        } finally {
            this._initializing = false;
            this._lockUpdate();
            this._createActionByOption("onInitialized", {
                excludeValidators: ["disabled", "readOnly"]
            })();
            this._unlockUpdate();
            this._initialized = true
        }
    },
    instance() {
        return this
    },
    beginUpdate: function() {
        this._lockUpdate()
    },
    endUpdate: function() {
        this._unlockUpdate();
        this._isUpdateAllowed() && this._commitUpdate()
    },
    _optionChanging: _utils_common__WEBPACK_IMPORTED_MODULE_12__["noop"],
    _notifyOptionChanged(option, value, previousValue) {
        if (this._initialized) {
            var optionNames = [option].concat(this._options.getAliasesByName(option));
            for (var i = 0; i < optionNames.length; i++) {
                var name = optionNames[i];
                var args = {
                    name: Object(_utils_data__WEBPACK_IMPORTED_MODULE_13__["getPathParts"])(name)[0],
                    fullName: name,
                    value: value,
                    previousValue: previousValue
                };
                if (!isInnerOption(name)) {
                    this._optionChangedCallbacks.fireWith(this, [Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(this._defaultActionArgs(), args)]);
                    this._optionChangedAction(Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, args))
                }
                if (!this._disposed && this._cancelOptionChange !== name) {
                    this._optionChanged(args)
                }
            }
        }
    },
    initialOption(name) {
        return this._options.initial(name)
    },
    _defaultActionConfig() {
        return {
            context: this,
            component: this
        }
    },
    _defaultActionArgs() {
        return {
            component: this
        }
    },
    _createAction(actionSource, config) {
        var action;
        return e => {
            if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(e)) {
                e = {}
            }
            if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_11__["isPlainObject"])(e)) {
                e = {
                    actionValue: e
                }
            }
            action = action || new _action__WEBPACK_IMPORTED_MODULE_5__["default"](actionSource, Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(config, this._defaultActionConfig()));
            return action.execute.call(action, Object(_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(e, this._defaultActionArgs()))
        }
    },
    _createActionByOption(optionName, config) {
        var _this = this;
        var action;
        var eventName;
        var actionFunc;
        var result = function() {
            if (!eventName) {
                config = config || {};
                if ("string" !== typeof optionName) {
                    throw _errors__WEBPACK_IMPORTED_MODULE_6__["default"].Error("E0008")
                }
                if (0 === optionName.indexOf("on")) {
                    eventName = getEventName(optionName)
                }
                actionFunc = _this.option()[optionName]
            }
            if (!action && !actionFunc && !config.beforeExecute && !config.afterExecute && !_this._eventsStrategy.hasEvent(eventName)) {
                return
            }
            if (!action) {
                var beforeExecute = config.beforeExecute;
                config.beforeExecute = function() {
                    for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        props[_key2] = arguments[_key2]
                    }
                    beforeExecute && beforeExecute.apply(_this, props);
                    _this._eventsStrategy.fireEvent(eventName, props[0].args)
                };
                action = _this._createAction(actionFunc, config)
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            if (Object(_config__WEBPACK_IMPORTED_MODULE_0__["default"])().wrapActionsBeforeExecute) {
                var beforeActionExecute = _this.option("beforeActionExecute") || _utils_common__WEBPACK_IMPORTED_MODULE_12__["noop"];
                var wrappedAction = beforeActionExecute(_this, action, config) || action;
                return wrappedAction.apply(_this, args)
            }
            return action.apply(_this, args)
        };
        if (Object(_config__WEBPACK_IMPORTED_MODULE_0__["default"])().wrapActionsBeforeExecute) {
            return result
        }
        var onActionCreated = this.option("onActionCreated") || _utils_common__WEBPACK_IMPORTED_MODULE_12__["noop"];
        return onActionCreated(this, result, config) || result
    },
    on(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    },
    hasActionSubscription: function(actionName) {
        return !!this._options.silent(actionName) || this._eventsStrategy.hasEvent(getEventName(actionName))
    },
    isOptionDeprecated(name) {
        return this._options.isDeprecated(name)
    },
    _setOptionWithoutOptionChange(name, value) {
        this._cancelOptionChange = name;
        this.option(name, value);
        this._cancelOptionChange = false
    },
    _getOptionValue(name, context) {
        var value = this.option(name);
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(value)) {
            return value.bind(context)()
        }
        return value
    },
    option() {
        return this._options.option(...arguments)
    },
    resetOption(name) {
        this.beginUpdate();
        this._options.reset(name);
        this.endUpdate()
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/core/component_registrator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/component_registrator.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _component_registrator_callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component_registrator_callbacks */ "./node_modules/devextreme/esm/core/component_registrator_callbacks.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _utils_public_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/public_component */ "./node_modules/devextreme/esm/core/utils/public_component.js");
/**
 * DevExtreme (esm/core/component_registrator.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var registerComponent = function(name, namespace, componentClass) {
    if (!componentClass) {
        componentClass = namespace
    } else {
        namespace[name] = componentClass
    }
    Object(_utils_public_component__WEBPACK_IMPORTED_MODULE_3__["name"])(componentClass, name);
    _component_registrator_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"].fire(name, componentClass)
};
var registerRendererComponent = function(name, componentClass) {
    _renderer__WEBPACK_IMPORTED_MODULE_0__["default"].fn[name] = function(options) {
        var isMemberInvoke = "string" === typeof options;
        var result;
        if (isMemberInvoke) {
            var memberName = options;
            var memberArgs = [].slice.call(arguments).slice(1);
            this.each((function() {
                var instance = componentClass.getInstance(this);
                if (!instance) {
                    throw _errors__WEBPACK_IMPORTED_MODULE_2__["default"].Error("E0009", name)
                }
                var member = instance[memberName];
                var memberValue = member.apply(instance, memberArgs);
                if (void 0 === result) {
                    result = memberValue
                }
            }))
        } else {
            this.each((function() {
                var instance = componentClass.getInstance(this);
                if (instance) {
                    instance.option(options)
                } else {
                    new componentClass(this, options)
                }
            }));
            result = this
        }
        return result
    }
};
_component_registrator_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"].add(registerRendererComponent);
/* harmony default export */ __webpack_exports__["default"] = (registerComponent);


/***/ }),

/***/ "./node_modules/devextreme/esm/core/component_registrator_callbacks.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/component_registrator_callbacks.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _memorized_callbacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memorized_callbacks */ "./node_modules/devextreme/esm/core/memorized_callbacks.js");
/**
 * DevExtreme (esm/core/component_registrator_callbacks.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = (new _memorized_callbacks__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/devextreme/esm/core/dom_component.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/dom_component.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./node_modules/devextreme/esm/core/config.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/resize_callbacks */ "./node_modules/devextreme/esm/core/utils/resize_callbacks.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component */ "./node_modules/devextreme/esm/core/component.js");
/* harmony import */ var _template_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template_manager */ "./node_modules/devextreme/esm/core/template_manager.js");
/* harmony import */ var _utils_public_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/public_component */ "./node_modules/devextreme/esm/core/utils/public_component.js");
/* harmony import */ var _element_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _utils_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_short__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../events/short */ "./node_modules/devextreme/esm/events/short.js");
/**
 * DevExtreme (esm/core/dom_component.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
















var {
    abstract: abstract
} = _component__WEBPACK_IMPORTED_MODULE_4__["Component"];
var DOMComponent = _component__WEBPACK_IMPORTED_MODULE_4__["Component"].inherit({
    _getDefaultOptions() {
        return Object(_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            width: void 0,
            height: void 0,
            rtlEnabled: Object(_config__WEBPACK_IMPORTED_MODULE_1__["default"])().rtlEnabled,
            elementAttr: {},
            disabled: false,
            integrationOptions: {}
        }, this._useTemplates() ? _template_manager__WEBPACK_IMPORTED_MODULE_5__["TemplateManager"].createDefaultOptions() : {})
    },
    ctor(element, options) {
        this._customClass = null;
        this._createElement(element);
        Object(_utils_public_component__WEBPACK_IMPORTED_MODULE_6__["attachInstanceToElement"])(this._$element, this, this._dispose);
        this.callBase(options)
    },
    _createElement(element) {
        this._$element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element)
    },
    _getSynchronizableOptionsForCreateComponent: () => ["rtlEnabled", "disabled", "templatesRenderAsynchronously"],
    _checkFunctionValueDeprecation: function(optionNames) {
        if (!this.option("_ignoreFunctionValueDeprecation")) {
            optionNames.forEach(optionName => {
                if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_13__["isFunction"])(this.option(optionName))) {
                    _errors__WEBPACK_IMPORTED_MODULE_2__["default"].log("W0017", optionName)
                }
            })
        }
    },
    _visibilityChanged: abstract,
    _dimensionChanged: abstract,
    _init() {
        this.callBase();
        this._checkFunctionValueDeprecation(["width", "height", "maxHeight", "maxWidth", "minHeight", "minWidth", "popupHeight", "popupWidth"]);
        this._attachWindowResizeCallback();
        this._initTemplateManager()
    },
    _setOptionsByDevice(instanceCustomRules) {
        this.callBase([].concat(this.constructor._classCustomRules || [], instanceCustomRules || []))
    },
    _isInitialOptionValue(name) {
        var isCustomOption = this.constructor._classCustomRules && Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), name);
        return !isCustomOption && this.callBase(name)
    },
    _attachWindowResizeCallback() {
        if (this._isDimensionChangeSupported()) {
            var windowResizeCallBack = this._windowResizeCallBack = this._dimensionChanged.bind(this);
            _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_3__["default"].add(windowResizeCallBack)
        }
    },
    _isDimensionChangeSupported() {
        return this._dimensionChanged !== abstract
    },
    _renderComponent() {
        this._initMarkup();
        Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_14__["hasWindow"])() && this._render()
    },
    _initMarkup() {
        var {
            rtlEnabled: rtlEnabled
        } = this.option() || {};
        this._renderElementAttributes();
        this._toggleRTLDirection(rtlEnabled);
        this._renderVisibilityChange();
        this._renderDimensions()
    },
    _render() {
        this._attachVisibilityChangeHandlers()
    },
    _renderElementAttributes() {
        var {
            elementAttr: elementAttr
        } = this.option() || {};
        var attributes = Object(_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])({}, elementAttr);
        var classNames = attributes.class;
        delete attributes.class;
        this.$element().attr(attributes).removeClass(this._customClass).addClass(classNames);
        this._customClass = classNames
    },
    _renderVisibilityChange() {
        if (this._isDimensionChangeSupported()) {
            this._attachDimensionChangeHandlers()
        }
        if (this._isVisibilityChangeSupported()) {
            var $element = this.$element();
            $element.addClass("dx-visibility-change-handler")
        }
    },
    _renderDimensions() {
        var $element = this.$element();
        var element = $element.get(0);
        var width = this._getOptionValue("width", element);
        var height = this._getOptionValue("height", element);
        if (this._isCssUpdateRequired(element, height, width)) {
            $element.css({
                width: null === width ? "" : width,
                height: null === height ? "" : height
            })
        }
    },
    _isCssUpdateRequired: (element, height, width) => !!(Object(_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(width) || Object(_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(height) || element.style.width || element.style.height),
    _attachDimensionChangeHandlers() {
        var $el = this.$element();
        var namespace = "".concat(this.NAME, "VisibilityChange");
        _events_short__WEBPACK_IMPORTED_MODULE_15__["resize"].off($el, {
            namespace: namespace
        });
        _events_short__WEBPACK_IMPORTED_MODULE_15__["resize"].on($el, () => this._dimensionChanged(), {
            namespace: namespace
        })
    },
    _attachVisibilityChangeHandlers() {
        if (this._isVisibilityChangeSupported()) {
            var $el = this.$element();
            var namespace = "".concat(this.NAME, "VisibilityChange");
            this._isHidden = !this._isVisible();
            _events_short__WEBPACK_IMPORTED_MODULE_15__["visibility"].off($el, {
                namespace: namespace
            });
            _events_short__WEBPACK_IMPORTED_MODULE_15__["visibility"].on($el, () => this._checkVisibilityChanged("shown"), () => this._checkVisibilityChanged("hiding"), {
                namespace: namespace
            })
        }
    },
    _isVisible() {
        var $element = this.$element();
        return $element.is(":visible")
    },
    _checkVisibilityChanged(action) {
        var isVisible = this._isVisible();
        if (isVisible) {
            if ("hiding" === action && !this._isHidden) {
                this._visibilityChanged(false);
                this._isHidden = true
            } else if ("shown" === action && this._isHidden) {
                this._isHidden = false;
                this._visibilityChanged(true)
            }
        }
    },
    _isVisibilityChangeSupported() {
        return this._visibilityChanged !== abstract && Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_14__["hasWindow"])()
    },
    _clean: _utils_common__WEBPACK_IMPORTED_MODULE_11__["noop"],
    _modelByElement() {
        var {
            modelByElement: modelByElement
        } = this.option();
        var $element = this.$element();
        return modelByElement ? modelByElement($element) : void 0
    },
    _invalidate() {
        if (this._isUpdateAllowed()) {
            throw _errors__WEBPACK_IMPORTED_MODULE_2__["default"].Error("E0007")
        }
        this._requireRefresh = true
    },
    _refresh() {
        this._clean();
        this._renderComponent()
    },
    _dispose() {
        this._templateManager && this._templateManager.dispose();
        this.callBase();
        this._clean();
        this._detachWindowResizeCallback()
    },
    _detachWindowResizeCallback() {
        if (this._isDimensionChangeSupported()) {
            _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_3__["default"].remove(this._windowResizeCallBack)
        }
    },
    _toggleRTLDirection(rtl) {
        var $element = this.$element();
        $element.toggleClass("dx-rtl", rtl)
    },
    _createComponent(element, component) {
        var config = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        var synchronizableOptions = Object(_utils_common__WEBPACK_IMPORTED_MODULE_11__["grep"])(this._getSynchronizableOptionsForCreateComponent(), value => !(value in config));
        var {
            integrationOptions: integrationOptions
        } = this.option();
        var {
            nestedComponentOptions: nestedComponentOptions
        } = this.option();
        nestedComponentOptions = nestedComponentOptions || _utils_common__WEBPACK_IMPORTED_MODULE_11__["noop"];
        var nestedComponentConfig = Object(_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])({
            integrationOptions: integrationOptions
        }, nestedComponentOptions(this));
        synchronizableOptions.forEach(optionName => nestedComponentConfig[optionName] = this.option(optionName));
        this._extendConfig(config, nestedComponentConfig);
        var instance = void 0;
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_13__["isString"])(component)) {
            var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element)[component](config);
            instance = $element[component]("instance")
        } else if (element) {
            instance = component.getInstance(element);
            if (instance) {
                instance.option(config)
            } else {
                instance = new component(element, config)
            }
        }
        if (instance) {
            var optionChangedHandler = _ref => {
                var {
                    name: name,
                    value: value
                } = _ref;
                if (Object(_utils_array__WEBPACK_IMPORTED_MODULE_12__["inArray"])(name, synchronizableOptions) >= 0) {
                    instance.option(name, value)
                }
            };
            this.on("optionChanged", optionChangedHandler);
            instance.on("disposing", () => this.off("optionChanged", optionChangedHandler))
        }
        return instance
    },
    _extendConfig(config, extendConfig) {
        Object(_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(extendConfig, (key, value) => {
            !Object.prototype.hasOwnProperty.call(config, key) && (config[key] = value)
        })
    },
    _defaultActionConfig() {
        var $element = this.$element();
        var context = this._modelByElement($element);
        return Object(_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            context: context
        })
    },
    _defaultActionArgs() {
        var $element = this.$element();
        var model = this._modelByElement($element);
        var element = this.element();
        return Object(_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            element: element,
            model: model
        })
    },
    _optionChanged(args) {
        switch (args.name) {
            case "width":
            case "height":
                this._renderDimensions();
                break;
            case "rtlEnabled":
                this._invalidate();
                break;
            case "elementAttr":
                this._renderElementAttributes();
                break;
            case "disabled":
            case "integrationOptions":
                break;
            default:
                this.callBase(args)
        }
    },
    _removeAttributes(element) {
        var attrs = element.attributes;
        for (var i = attrs.length - 1; i >= 0; i--) {
            var attr = attrs[i];
            if (attr) {
                var {
                    name: name
                } = attr;
                if (!name.indexOf("aria-") || -1 !== name.indexOf("dx-") || "role" === name || "style" === name || "tabindex" === name) {
                    element.removeAttribute(name)
                }
            }
        }
    },
    _removeClasses(element) {
        element.className = element.className.split(" ").filter(cssClass => 0 !== cssClass.lastIndexOf("dx-", 0)).join(" ")
    },
    _updateDOMComponent(renderRequired) {
        if (renderRequired) {
            this._renderComponent()
        } else if (this._requireRefresh) {
            this._requireRefresh = false;
            this._refresh()
        }
    },
    endUpdate() {
        var renderRequired = this._isInitializingRequired();
        this.callBase();
        this._isUpdateAllowed() && this._updateDOMComponent(renderRequired)
    },
    $element() {
        return this._$element
    },
    element() {
        var $element = this.$element();
        return Object(_core_element__WEBPACK_IMPORTED_MODULE_10__["getPublicElement"])($element)
    },
    dispose() {
        var element = this.$element().get(0);
        Object(_element_data__WEBPACK_IMPORTED_MODULE_7__["cleanDataRecursive"])(element, true);
        element.textContent = "";
        this._removeAttributes(element);
        this._removeClasses(element)
    },
    resetOption(optionName) {
        this.callBase(optionName);
        if ("width" === optionName || "height" === optionName) {
            var initialOption = this.initialOption(optionName);
            !Object(_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(initialOption) && this.$element().css(optionName, "")
        }
    },
    _getAnonymousTemplateName() {
        return
    },
    _initTemplateManager() {
        if (this._templateManager || !this._useTemplates()) {
            return
        }
        var {
            integrationOptions: integrationOptions = {}
        } = this.option();
        var {
            createTemplate: createTemplate
        } = integrationOptions;
        this._templateManager = new _template_manager__WEBPACK_IMPORTED_MODULE_5__["TemplateManager"](createTemplate, this._getAnonymousTemplateName());
        this._initTemplates()
    },
    _initTemplates() {
        var {
            templates: templates,
            anonymousTemplateMeta: anonymousTemplateMeta
        } = this._templateManager.extractTemplates(this.$element());
        var anonymousTemplate = this.option("integrationOptions.templates.".concat(anonymousTemplateMeta.name));
        templates.forEach(_ref2 => {
            var {
                name: name,
                template: template
            } = _ref2;
            this._options.silent("integrationOptions.templates.".concat(name), template)
        });
        if (anonymousTemplateMeta.name && !anonymousTemplate) {
            this._options.silent("integrationOptions.templates.".concat(anonymousTemplateMeta.name), anonymousTemplateMeta.template);
            this._options.silent("_hasAnonymousTemplateContent", true)
        }
    },
    _getTemplateByOption(optionName) {
        return this._getTemplate(this.option(optionName))
    },
    _getTemplate(templateSource) {
        var templates = this.option("integrationOptions.templates");
        var isAsyncTemplate = this.option("templatesRenderAsynchronously");
        var skipTemplates = this.option("integrationOptions.skipTemplates");
        return this._templateManager.getTemplate(templateSource, templates, {
            isAsyncTemplate: isAsyncTemplate,
            skipTemplates: skipTemplates
        }, this)
    },
    _saveTemplate(name, template) {
        this._setOptionWithoutOptionChange("integrationOptions.templates." + name, this._templateManager._createTemplate(template))
    },
    _useTemplates: () => true
});
DOMComponent.getInstance = function(element) {
    return Object(_utils_public_component__WEBPACK_IMPORTED_MODULE_6__["getInstanceByElement"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element), this)
};
DOMComponent.defaultOptions = function(rule) {
    this._classCustomRules = this._classCustomRules || [];
    this._classCustomRules.push(rule)
};
/* harmony default export */ __webpack_exports__["default"] = (DOMComponent);


/***/ }),

/***/ "./node_modules/devextreme/esm/core/element.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/core/element.js ***!
  \*****************************************************/
/*! exports provided: getPublicElement, setPublicElementWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPublicElement", function() { return getPublicElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPublicElementWrapper", function() { return setPublicElementWrapper; });
/**
 * DevExtreme (esm/core/element.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var strategy = function(element) {
    return element && element.get(0)
};
function getPublicElement(element) {
    return strategy(element)
}
function setPublicElementWrapper(newStrategy) {
    strategy = newStrategy
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/options/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/options/index.js ***!
  \***********************************************************/
/*! exports provided: Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return Options; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _option_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./option_manager */ "./node_modules/devextreme/esm/core/options/option_manager.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/core/options/utils.js");
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/**
 * DevExtreme (esm/core/options/index.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







class Options {
    constructor(options, defaultOptions, optionsByReference, deprecatedOptions) {
        this._deprecatedCallback;
        this._startChangeCallback;
        this._endChangeCallback;
        this._default = defaultOptions;
        this._deprecated = deprecatedOptions;
        this._deprecatedNames = [];
        this._initDeprecatedNames();
        this._optionManager = new _option_manager__WEBPACK_IMPORTED_MODULE_3__["OptionManager"](options, optionsByReference);
        this._optionManager.onRelevantNamesPrepared((options, name, value, silent) => this._setRelevantNames(options, name, value, silent));
        this._cachedOptions = {};
        this._rules = []
    }
    set _initial(value) {
        this._initialOptions = value
    }
    get _initial() {
        if (!this._initialOptions) {
            var rulesOptions = this._getByRules(this.silent("defaultOptionsRules"));
            this._initialOptions = this._default;
            this._optionManager._setByReference(this._initialOptions, rulesOptions)
        }
        return this._initialOptions
    }
    _initDeprecatedNames() {
        for (var optionName in this._deprecated) {
            this._deprecatedNames.push(optionName)
        }
    }
    _getByRules(rules) {
        rules = Array.isArray(rules) ? this._rules.concat(rules) : this._rules;
        return Object(_utils__WEBPACK_IMPORTED_MODULE_5__["convertRulesToOptions"])(rules)
    }
    _notifyDeprecated(option) {
        var info = this._deprecated[option];
        if (info) {
            this._deprecatedCallback(option, info)
        }
    }
    _setRelevantNames(options, name, value, silent) {
        if (name) {
            var normalizedName = this._normalizeName(name, silent);
            if (normalizedName && normalizedName !== name) {
                this._setField(options, normalizedName, value);
                this._clearField(options, name)
            }
        }
    }
    _setField(options, fullName, value) {
        var fieldName = "";
        var fieldObject = null;
        do {
            fieldName = fieldName ? ".".concat(fieldName) : "";
            fieldName = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["getFieldName"])(fullName) + fieldName;
            fullName = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["getParentName"])(fullName);
            fieldObject = fullName ? this._optionManager.get(options, fullName, false) : options
        } while (!fieldObject);
        fieldObject[fieldName] = value
    }
    _clearField(options, name) {
        delete options[name];
        var previousFieldName = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["getParentName"])(name);
        var fieldObject = previousFieldName ? this._optionManager.get(options, previousFieldName, false) : options;
        if (fieldObject) {
            delete fieldObject[Object(_utils__WEBPACK_IMPORTED_MODULE_5__["getFieldName"])(name)]
        }
    }
    _normalizeName(name, silent) {
        if (this._deprecatedNames.length && name) {
            for (var i = 0; i < this._deprecatedNames.length; i++) {
                if (this._deprecatedNames[i] === name) {
                    var deprecate = this._deprecated[name];
                    if (deprecate) {
                        !silent && this._notifyDeprecated(name);
                        return deprecate.alias || name
                    }
                }
            }
        }
        return name
    }
    addRules(rules) {
        this._rules = rules.concat(this._rules)
    }
    applyRules(rules) {
        var options = this._getByRules(rules);
        this.silent(options)
    }
    dispose() {
        this._deprecatedCallback = _utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
        this._startChangeCallback = _utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
        this._endChangeCallback = _utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
        this._optionManager.dispose()
    }
    onChanging(callBack) {
        this._optionManager.onChanging(callBack)
    }
    onChanged(callBack) {
        this._optionManager.onChanged(callBack)
    }
    onDeprecated(callBack) {
        this._deprecatedCallback = callBack
    }
    onStartChange(callBack) {
        this._startChangeCallback = callBack
    }
    onEndChange(callBack) {
        this._endChangeCallback = callBack
    }
    isInitial(name) {
        var value = this.silent(name);
        var initialValue = this.initial(name);
        var areFunctions = Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(value) && Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(initialValue);
        return areFunctions ? value.toString() === initialValue.toString() : Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__["equalByValue"])(value, initialValue)
    }
    initial(name) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_5__["getNestedOptionValue"])(this._initial, name)
    }
    option(options, value) {
        var isGetter = arguments.length < 2 && "object" !== Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["type"])(options);
        if (isGetter) {
            return this._optionManager.get(void 0, this._normalizeName(options))
        } else {
            this._startChangeCallback();
            try {
                this._optionManager.set(options, value)
            } finally {
                this._endChangeCallback()
            }
        }
    }
    silent(options, value) {
        var isGetter = arguments.length < 2 && "object" !== Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["type"])(options);
        if (isGetter) {
            return this._optionManager.get(void 0, options, void 0, true)
        } else {
            this._optionManager.set(options, value, void 0, true)
        }
    }
    reset(name) {
        if (name) {
            var fullPath = Object(_utils_data__WEBPACK_IMPORTED_MODULE_4__["getPathParts"])(name);
            var value = fullPath.reduce((value, field) => value ? value[field] : this.initial(field), null);
            var defaultValue = Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(value) ? Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, value) : value;
            this._optionManager.set(name, defaultValue, false)
        }
    }
    getAliasesByName(name) {
        return Object.keys(this._deprecated).filter(aliasName => name === this._deprecated[aliasName].alias)
    }
    isDeprecated(name) {
        return Object.prototype.hasOwnProperty.call(this._deprecated, name)
    }
    cache(name, options) {
        var isGetter = arguments.length < 2;
        if (isGetter) {
            return this._cachedOptions[name]
        } else {
            this._cachedOptions[name] = Object(_utils_extend__WEBPACK_IMPORTED_MODULE_6__["extend"])(this._cachedOptions[name], options)
        }
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/options/option_manager.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/options/option_manager.js ***!
  \********************************************************************/
/*! exports provided: OptionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionManager", function() { return OptionManager; });
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _utils_comparator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/comparator */ "./node_modules/devextreme/esm/core/utils/comparator.js");
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/core/options/utils.js");
/**
 * DevExtreme (esm/core/options/option_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var cachedGetters = {};
var cachedSetters = {};
class OptionManager {
    constructor(options, optionsByReference) {
        this._options = options;
        this._optionsByReference = optionsByReference;
        this._changingCallback;
        this._changedCallback;
        this._namePreparedCallbacks
    }
    _setByReference(options, rulesOptions) {
        Object(_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, options, rulesOptions);
        for (var fieldName in this._optionsByReference) {
            if (Object.prototype.hasOwnProperty.call(rulesOptions, fieldName)) {
                options[fieldName] = rulesOptions[fieldName]
            }
        }
    }
    _setPreparedValue(name, value, merge, silent) {
        var previousValue = this.get(this._options, name, false);
        if (!Object(_utils_comparator__WEBPACK_IMPORTED_MODULE_2__["equals"])(previousValue, value)) {
            var path = Object(_utils_data__WEBPACK_IMPORTED_MODULE_0__["getPathParts"])(name);
            !silent && this._changingCallback(name, previousValue, value);
            cachedSetters[name] = cachedSetters[name] || Object(_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileSetter"])(name);
            cachedSetters[name](this._options, value, {
                functionsAsIs: true,
                merge: Object(_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(merge) ? merge : !this._optionsByReference[name],
                unwrapObservables: path.length > 1 && !!this._optionsByReference[path[0]]
            });
            !silent && this._changedCallback(name, value, previousValue)
        }
    }
    _prepareRelevantNames(options, name, value, silent) {
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_4__["isPlainObject"])(value)) {
            for (var valueName in value) {
                this._prepareRelevantNames(options, "".concat(name, ".").concat(valueName), value[valueName])
            }
        }
        this._namePreparedCallbacks(options, name, value, silent)
    }
    get() {
        var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._options;
        var name = arguments.length > 1 ? arguments[1] : void 0;
        var unwrapObservables = arguments.length > 2 ? arguments[2] : void 0;
        cachedGetters[name] = cachedGetters[name] || Object(_utils_data__WEBPACK_IMPORTED_MODULE_0__["compileGetter"])(name);
        return cachedGetters[name](options, {
            functionsAsIs: true,
            unwrapObservables: unwrapObservables
        })
    }
    set(options, value, merge, silent) {
        options = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeOptions"])(options, value);
        for (var name in options) {
            this._prepareRelevantNames(options, name, options[name], silent)
        }
        for (var _name in options) {
            this._setPreparedValue(_name, options[_name], merge, silent)
        }
    }
    onRelevantNamesPrepared(callBack) {
        this._namePreparedCallbacks = callBack
    }
    onChanging(callBack) {
        this._changingCallback = callBack
    }
    onChanged(callBack) {
        this._changedCallback = callBack
    }
    dispose() {
        this._changingCallback = _utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"];
        this._changedCallback = _utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"]
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/options/utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/options/utils.js ***!
  \***********************************************************/
/*! exports provided: convertRulesToOptions, normalizeOptions, deviceMatch, getFieldName, getParentName, getNestedOptionValue, createDefaultOptionRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertRulesToOptions", function() { return convertRulesToOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeOptions", function() { return normalizeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceMatch", function() { return deviceMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFieldName", function() { return getFieldName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentName", function() { return getParentName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNestedOptionValue", function() { return getNestedOptionValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDefaultOptionRules", function() { return createDefaultOptionRules; });
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/**
 * DevExtreme (esm/core/options/utils.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var cachedGetters = {};
var convertRulesToOptions = rules => {
    var currentDevice = _devices__WEBPACK_IMPORTED_MODULE_0__["default"].current();
    return rules.reduce((options, _ref) => {
        var {
            device: device,
            options: ruleOptions
        } = _ref;
        var deviceFilter = device || {};
        var match = Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
        if (match) {
            Object(_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, options, ruleOptions)
        }
        return options
    }, {})
};
var normalizeOptions = (options, value) => "string" !== typeof options ? options : {
    [options]: value
};
var deviceMatch = (device, filter) => Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isEmptyObject"])(filter) || Object(_utils_common__WEBPACK_IMPORTED_MODULE_2__["findBestMatches"])(device, [filter]).length > 0;
var getFieldName = fullName => fullName.substr(fullName.lastIndexOf(".") + 1);
var getParentName = fullName => fullName.substr(0, fullName.lastIndexOf("."));
var getNestedOptionValue = function(optionsObject, name) {
    cachedGetters[name] = cachedGetters[name] || Object(_utils_data__WEBPACK_IMPORTED_MODULE_4__["compileGetter"])(name);
    return cachedGetters[name](optionsObject, {
        functionsAsIs: true
    })
};
var createDefaultOptionRules = function() {
    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return options
};


/***/ }),

/***/ "./node_modules/devextreme/esm/core/polyfills/promise.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/polyfills/promise.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/**
 * DevExtreme (esm/core/polyfills/promise.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var promise = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["hasWindow"])() ? Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])().Promise : Promise;
if (!promise) {
    promise = function(resolver) {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["Deferred"];
        resolver(d.resolve.bind(this), d.reject.bind(this));
        return d.promise()
    };
    promise.resolve = function(val) {
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["Deferred"]).resolve(val).promise()
    };
    promise.reject = function(val) {
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["Deferred"]).reject(val).promise()
    };
    promise.all = function(promises) {
        return _core_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["when"].apply(this, promises).then((function() {
            return [].slice.call(arguments)
        }))
    }
}
/* harmony default export */ __webpack_exports__["default"] = (promise);


/***/ }),

/***/ "./node_modules/devextreme/esm/core/postponed_operations.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/postponed_operations.js ***!
  \******************************************************************/
/*! exports provided: PostponedOperations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostponedOperations", function() { return PostponedOperations; });
/* harmony import */ var _utils_deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/core/postponed_operations.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


class PostponedOperations {
    constructor() {
        this._postponedOperations = {}
    }
    add(key, fn, postponedPromise) {
        if (key in this._postponedOperations) {
            postponedPromise && this._postponedOperations[key].promises.push(postponedPromise)
        } else {
            var completePromise = new _utils_deferred__WEBPACK_IMPORTED_MODULE_0__["Deferred"];
            this._postponedOperations[key] = {
                fn: fn,
                completePromise: completePromise,
                promises: postponedPromise ? [postponedPromise] : []
            }
        }
        return this._postponedOperations[key].completePromise.promise()
    }
    callPostponedOperations() {
        for (var key in this._postponedOperations) {
            var operation = this._postponedOperations[key];
            if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(operation)) {
                if (operation.promises && operation.promises.length) {
                    Object(_utils_deferred__WEBPACK_IMPORTED_MODULE_0__["when"])(...operation.promises).done(operation.fn).then(operation.completePromise.resolve)
                } else {
                    operation.fn().done(operation.completePromise.resolve)
                }
            }
        }
        this._postponedOperations = {}
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/template_manager.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/template_manager.js ***!
  \**************************************************************/
/*! exports provided: TemplateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateManager", function() { return TemplateManager; });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _templates_function_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/function_template */ "./node_modules/devextreme/esm/core/templates/function_template.js");
/* harmony import */ var _templates_empty_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./templates/empty_template */ "./node_modules/devextreme/esm/core/templates/empty_template.js");
/* harmony import */ var _utils_template_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/template_manager */ "./node_modules/devextreme/esm/core/utils/template_manager.js");
/**
 * DevExtreme (esm/core/template_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var TEXT_NODE = 3;
var ANONYMOUS_TEMPLATE_NAME = "template";
var TEMPLATE_OPTIONS_NAME = "dxTemplate";
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var DX_POLYMORPH_WIDGET_TEMPLATE = new _templates_function_template__WEBPACK_IMPORTED_MODULE_4__["FunctionTemplate"](_ref => {
    var {
        model: model,
        parent: parent
    } = _ref;
    var widgetName = model.widget;
    if (!widgetName) {
        return Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])()
    }
    var widgetElement = Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>");
    var widgetOptions = model.options || {};
    if (parent) {
        parent._createComponent(widgetElement, widgetName, widgetOptions)
    } else {
        widgetElement[widgetName](widgetOptions)
    }
    return widgetElement
});
class TemplateManager {
    constructor(createElement, anonymousTemplateName) {
        this._tempTemplates = [];
        this._defaultTemplates = {};
        this._anonymousTemplateName = anonymousTemplateName || ANONYMOUS_TEMPLATE_NAME;
        this._createElement = createElement || _utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["defaultCreateElement"];
        this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this)
    }
    static createDefaultOptions() {
        return {
            integrationOptions: {
                watchMethod: function(fn, callback) {
                    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (!options.skipImmediate) {
                        callback(fn())
                    }
                    return _utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"]
                },
                templates: {
                    "dx-polymorph-widget": DX_POLYMORPH_WIDGET_TEMPLATE
                },
                useDeferUpdateForTemplates: true
            }
        }
    }
    get anonymousTemplateName() {
        return this._anonymousTemplateName
    }
    addDefaultTemplates(templates) {
        this._defaultTemplates = Object(_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, this._defaultTemplates, templates)
    }
    dispose() {
        this._tempTemplates.forEach(tempTemplate => {
            tempTemplate.template.dispose && tempTemplate.template.dispose()
        });
        this._tempTemplates = []
    }
    extractTemplates($el) {
        var templates = this._extractTemplates($el);
        var anonymousTemplateMeta = this._extractAnonymousTemplate($el);
        return {
            templates: templates,
            anonymousTemplateMeta: anonymousTemplateMeta
        }
    }
    _extractTemplates($el) {
        var templates = Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["findTemplates"])($el, TEMPLATE_OPTIONS_NAME);
        var suitableTemplates = Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["suitableTemplatesByName"])(templates);
        templates.forEach(_ref2 => {
            var {
                element: element,
                options: {
                    name: name
                }
            } = _ref2;
            if (element === suitableTemplates[name]) {
                Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).addClass(TEMPLATE_WRAPPER_CLASS).detach()
            } else {
                Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).remove()
            }
        });
        return Object.keys(suitableTemplates).map(name => ({
            name: name,
            template: this._createTemplate(suitableTemplates[name])
        }))
    }
    _extractAnonymousTemplate($el) {
        var $anonymousTemplate = $el.contents().detach();
        var $notJunkTemplateContent = $anonymousTemplate.filter((_, element) => {
            var isTextNode = element.nodeType === TEXT_NODE;
            var isEmptyText = Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).text().trim().length < 1;
            return !(isTextNode && isEmptyText)
        });
        return $notJunkTemplateContent.length > 0 ? {
            template: this._createTemplate($anonymousTemplate),
            name: this._anonymousTemplateName
        } : {}
    }
    _createTemplateIfNeeded(templateSource) {
        var cachedTemplate = this._tempTemplates.filter(tempTemplate => tempTemplate.source === Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["templateKey"])(templateSource))[0];
        if (cachedTemplate) {
            return cachedTemplate.template
        }
        var template = this._createTemplate(templateSource);
        this._tempTemplates.push({
            template: template,
            source: Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["templateKey"])(templateSource)
        });
        return template
    }
    _createTemplate(templateSource) {
        return this._createElement(Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["validateTemplateSource"])(templateSource))
    }
    getTemplate(templateSource, templates, _ref3, context) {
        var {
            isAsyncTemplate: isAsyncTemplate,
            skipTemplates: skipTemplates
        } = _ref3;
        if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(templateSource)) {
            return Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["acquireTemplate"])(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates)
        }
        return new _templates_function_template__WEBPACK_IMPORTED_MODULE_4__["FunctionTemplate"](options => {
            var templateSourceResult = templateSource.apply(context, Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["getNormalizedTemplateArgs"])(options));
            if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(templateSourceResult)) {
                return new _templates_empty_template__WEBPACK_IMPORTED_MODULE_5__["EmptyTemplate"]
            }
            var dispose = false;
            var template = Object(_utils_template_manager__WEBPACK_IMPORTED_MODULE_6__["acquireTemplate"])(templateSourceResult, templateSource => {
                if (templateSource.nodeType || Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isRenderer"])(templateSource) && !Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(templateSource).is("script")) {
                    return new _templates_function_template__WEBPACK_IMPORTED_MODULE_4__["FunctionTemplate"](() => templateSource)
                }
                dispose = true;
                return this._createTemplate(templateSource)
            }, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
            var result = template.render(options);
            dispose && template.dispose && template.dispose();
            return result
        })
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/child_default_template.js":
/*!******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/child_default_template.js ***!
  \******************************************************************************/
/*! exports provided: ChildDefaultTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildDefaultTemplate", function() { return ChildDefaultTemplate; });
/* harmony import */ var _template_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template_base */ "./node_modules/devextreme/esm/core/templates/template_base.js");
/**
 * DevExtreme (esm/core/templates/child_default_template.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

class ChildDefaultTemplate extends _template_base__WEBPACK_IMPORTED_MODULE_0__["TemplateBase"] {
    constructor(name) {
        super();
        this.name = name
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/empty_template.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/empty_template.js ***!
  \**********************************************************************/
/*! exports provided: EmptyTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyTemplate", function() { return EmptyTemplate; });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _template_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template_base */ "./node_modules/devextreme/esm/core/templates/template_base.js");
/**
 * DevExtreme (esm/core/templates/empty_template.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


class EmptyTemplate extends _template_base__WEBPACK_IMPORTED_MODULE_1__["TemplateBase"] {
    _renderCore() {
        return Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])()
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/function_template.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/function_template.js ***!
  \*************************************************************************/
/*! exports provided: FunctionTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionTemplate", function() { return FunctionTemplate; });
/* harmony import */ var _template_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template_base */ "./node_modules/devextreme/esm/core/templates/template_base.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/**
 * DevExtreme (esm/core/templates/function_template.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


class FunctionTemplate extends _template_base__WEBPACK_IMPORTED_MODULE_0__["TemplateBase"] {
    constructor(render) {
        super();
        this._render = render
    }
    _renderCore(options) {
        return Object(_utils_dom__WEBPACK_IMPORTED_MODULE_1__["normalizeTemplateElement"])(this._render(options))
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/template.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/template.js ***!
  \****************************************************************/
/*! exports provided: Template */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _template_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template_base */ "./node_modules/devextreme/esm/core/templates/template_base.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _template_engine_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template_engine_registry */ "./node_modules/devextreme/esm/core/templates/template_engine_registry.js");
/* harmony import */ var _template_engines__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template_engines */ "./node_modules/devextreme/esm/core/templates/template_engines.js");
/**
 * DevExtreme (esm/core/templates/template.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_3__["registerTemplateEngine"])("default", {
    compile: element => Object(_utils_dom__WEBPACK_IMPORTED_MODULE_2__["normalizeTemplateElement"])(element),
    render: (template, model, index) => template.clone()
});
Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_3__["setTemplateEngine"])("default");
class Template extends _template_base__WEBPACK_IMPORTED_MODULE_1__["TemplateBase"] {
    constructor(element) {
        super();
        this._element = element
    }
    _renderCore(options) {
        var transclude = options.transclude;
        if (!transclude && !this._compiledTemplate) {
            this._compiledTemplate = Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_3__["getCurrentTemplateEngine"])().compile(this._element)
        }
        return Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").append(transclude ? this._element : Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_3__["getCurrentTemplateEngine"])().render(this._compiledTemplate, options.model, options.index)).contents()
    }
    source() {
        return Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(this._element).clone()
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/template_base.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/template_base.js ***!
  \*********************************************************************/
/*! exports provided: renderedCallbacks, TemplateBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderedCallbacks", function() { return renderedCallbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateBase", function() { return TemplateBase; });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _utils_callbacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _events_visibility_change__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/visibility_change */ "./node_modules/devextreme/esm/events/visibility_change.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../errors */ "./node_modules/devextreme/esm/core/errors.js");
/**
 * DevExtreme (esm/core/templates/template_base.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var renderedCallbacks = Object(_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])({
    syncStrategy: true
});
class TemplateBase {
    render(options) {
        options = options || {};
        var onRendered = options.onRendered;
        delete options.onRendered;
        var $result = this._renderCore(options);
        this._ensureResultInContainer($result, options.container);
        renderedCallbacks.fire($result, options.container);
        onRendered && onRendered();
        return $result
    }
    _ensureResultInContainer($result, container) {
        if (!container) {
            return
        }
        var $container = Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(container);
        var resultInContainer = Object(_utils_dom__WEBPACK_IMPORTED_MODULE_3__["contains"])($container.get(0), $result.get(0));
        $container.append($result);
        if (resultInContainer) {
            return
        }
        var resultInBody = _dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getBody().contains($container.get(0));
        if (!resultInBody) {
            return
        }
        Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_4__["triggerShownEvent"])($result)
    }
    _renderCore() {
        throw _errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E0001")
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/template_engine_registry.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/template_engine_registry.js ***!
  \********************************************************************************/
/*! exports provided: registerTemplateEngine, setTemplateEngine, getCurrentTemplateEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerTemplateEngine", function() { return registerTemplateEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTemplateEngine", function() { return setTemplateEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTemplateEngine", function() { return getCurrentTemplateEngine; });
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./node_modules/devextreme/esm/core/errors.js");
/**
 * DevExtreme (esm/core/templates/template_engine_registry.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var templateEngines = {};
var currentTemplateEngine;
function registerTemplateEngine(name, templateEngine) {
    templateEngines[name] = templateEngine
}
function setTemplateEngine(templateEngine) {
    if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(templateEngine)) {
        currentTemplateEngine = templateEngines[templateEngine];
        if (!currentTemplateEngine) {
            throw _errors__WEBPACK_IMPORTED_MODULE_1__["default"].Error("E0020", templateEngine)
        }
    } else {
        currentTemplateEngine = templateEngine
    }
}
function getCurrentTemplateEngine() {
    return currentTemplateEngine
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/template_engines.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/template_engines.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _template_engine_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template_engine_registry */ "./node_modules/devextreme/esm/core/templates/template_engine_registry.js");
/**
 * DevExtreme (esm/core/templates/template_engines.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_1__["registerTemplateEngine"])("jquery-tmpl", {
    compile: element => Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["extractTemplateMarkup"])(element),
    render: (template, data) => jQuery.tmpl(template, data)
});
Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_1__["registerTemplateEngine"])("jsrender", {
    compile: element => (jQuery ? jQuery : jsrender).templates(Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["extractTemplateMarkup"])(element)),
    render: (template, data) => template.render(data)
});
Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_1__["registerTemplateEngine"])("mustache", {
    compile: element => Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["extractTemplateMarkup"])(element),
    render: (template, data) => Mustache.render(template, data)
});
Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_1__["registerTemplateEngine"])("hogan", {
    compile: element => Hogan.compile(Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["extractTemplateMarkup"])(element)),
    render: (template, data) => template.render(data)
});
Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_1__["registerTemplateEngine"])("underscore", {
    compile: element => _.template(Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["extractTemplateMarkup"])(element)),
    render: (template, data) => template(data)
});
Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_1__["registerTemplateEngine"])("handlebars", {
    compile: element => Handlebars.compile(Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["extractTemplateMarkup"])(element)),
    render: (template, data) => template(data)
});
Object(_template_engine_registry__WEBPACK_IMPORTED_MODULE_1__["registerTemplateEngine"])("doT", {
    compile: element => doT.template(Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["extractTemplateMarkup"])(element)),
    render: (template, data) => template(data)
});


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/browser.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/browser.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window */ "./node_modules/devextreme/esm/core/utils/window.js");
/**
 * DevExtreme (esm/core/utils/browser.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var navigator = Object(_window__WEBPACK_IMPORTED_MODULE_1__["getNavigator"])();
var webkitRegExp = /(webkit)[ /]([\w.]+)/;
var mozillaRegExp = /(mozilla)(?:.*? rv:([\w.]+))/;
var browserFromUA = ua => {
    ua = ua.toLowerCase();
    var result = {};
    var matches = webkitRegExp.exec(ua) || ua.indexOf("compatible") < 0 && mozillaRegExp.exec(ua) || [];
    var browserName = matches[1];
    var browserVersion = matches[2];
    if ("webkit" === browserName) {
        result.webkit = true;
        if (ua.indexOf("chrome") >= 0 || ua.indexOf("crios") >= 0) {
            browserName = "chrome";
            browserVersion = /(?:chrome|crios)\/(\d+\.\d+)/.exec(ua);
            browserVersion = browserVersion && browserVersion[1]
        } else if (ua.indexOf("fxios") >= 0) {
            browserName = "mozilla";
            browserVersion = /fxios\/(\d+\.\d+)/.exec(ua);
            browserVersion = browserVersion && browserVersion[1]
        } else if (ua.indexOf("safari") >= 0 && /version|phantomjs/.test(ua)) {
            browserName = "safari";
            browserVersion = /(?:version|phantomjs)\/([0-9.]+)/.exec(ua);
            browserVersion = browserVersion && browserVersion[1]
        } else {
            browserName = "unknown";
            browserVersion = /applewebkit\/([0-9.]+)/.exec(ua);
            browserVersion = browserVersion && browserVersion[1]
        }
    }
    if (browserName) {
        result[browserName] = true;
        result.version = browserVersion
    }
    return result
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({
    _fromUA: browserFromUA
}, browserFromUA(navigator.userAgent)));


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/comparator.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/comparator.js ***!
  \**************************************************************/
/*! exports provided: equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony import */ var _dom_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/core/utils/comparator.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var hasNegation = function(oldValue, newValue) {
    return 1 / oldValue === 1 / newValue
};
var equals = function(oldValue, newValue) {
    oldValue = Object(_data__WEBPACK_IMPORTED_MODULE_1__["toComparable"])(oldValue, true);
    newValue = Object(_data__WEBPACK_IMPORTED_MODULE_1__["toComparable"])(newValue, true);
    if (oldValue && newValue && Object(_type__WEBPACK_IMPORTED_MODULE_2__["isRenderer"])(oldValue) && Object(_type__WEBPACK_IMPORTED_MODULE_2__["isRenderer"])(newValue)) {
        return newValue.is(oldValue)
    }
    var oldValueIsNaN = oldValue !== oldValue;
    var newValueIsNaN = newValue !== newValue;
    if (oldValueIsNaN && newValueIsNaN) {
        return true
    }
    if (0 === oldValue && 0 === newValue) {
        return hasNegation(oldValue, newValue)
    }
    if (null === oldValue || "object" !== typeof oldValue || _dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].isElementNode(oldValue)) {
        return oldValue === newValue
    }
    return false
};


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/dom.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/dom.js ***!
  \*******************************************************/
/*! exports provided: resetActiveElement, clearSelection, closestCommonParent, extractTemplateMarkup, normalizeTemplateElement, clipboardText, contains, createTextElementHiddenCopy, insertBefore, replaceWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetActiveElement", function() { return resetActiveElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSelection", function() { return clearSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closestCommonParent", function() { return closestCommonParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractTemplateMarkup", function() { return extractTemplateMarkup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeTemplateElement", function() { return normalizeTemplateElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clipboardText", function() { return clipboardText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextElementHiddenCopy", function() { return createTextElementHiddenCopy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertBefore", function() { return insertBefore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceWith", function() { return replaceWith; });
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./window */ "./node_modules/devextreme/esm/core/utils/window.js");
/**
 * DevExtreme (esm/core/utils/dom.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var window = Object(_window__WEBPACK_IMPORTED_MODULE_4__["getWindow"])();
var resetActiveElement = () => {
    var activeElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].getActiveElement();
    if (activeElement && activeElement !== _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].getBody()) {
        var _activeElement$blur;
        null === (_activeElement$blur = activeElement.blur) || void 0 === _activeElement$blur ? void 0 : _activeElement$blur.call(activeElement)
    }
};
var clearSelection = () => {
    var selection = window.getSelection();
    if (!selection) {
        return
    }
    if ("Caret" === selection.type) {
        return
    }
    if (selection.empty) {
        selection.empty()
    } else if (selection.removeAllRanges) {
        try {
            selection.removeAllRanges()
        } catch (e) {}
    }
};
var closestCommonParent = (startTarget, endTarget) => {
    var $startTarget = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(startTarget);
    var $endTarget = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(endTarget);
    if ($startTarget[0] === $endTarget[0]) {
        return $startTarget[0]
    }
    var $startParents = $startTarget.parents();
    var $endParents = $endTarget.parents();
    var startingParent = Math.min($startParents.length, $endParents.length);
    for (var i = -startingParent; i < 0; i++) {
        if ($startParents.get(i) === $endParents.get(i)) {
            return $startParents.get(i)
        }
    }
};
var extractTemplateMarkup = element => {
    element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
    var templateTag = element.length && element.filter((function() {
        var $node = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this);
        return $node.is("script[type]") && $node.attr("type").indexOf("script") < 0
    }));
    if (templateTag.length) {
        return templateTag.eq(0).html()
    } else {
        element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").append(element);
        return element.html()
    }
};
var normalizeTemplateElement = element => {
    var $element = Object(_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(element) && (element.nodeType || Object(_type__WEBPACK_IMPORTED_MODULE_3__["isRenderer"])(element)) ? Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element) : Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").html(element).contents();
    if (1 === $element.length) {
        if ($element.is("script")) {
            $element = normalizeTemplateElement($element.html().trim())
        } else if ($element.is("table")) {
            $element = $element.children("tbody").contents()
        }
    }
    return $element
};
var clipboardText = (event, text) => {
    var clipboard = event.originalEvent && event.originalEvent.clipboardData || window.clipboardData;
    if (!text) {
        return clipboard && clipboard.getData("Text")
    }
    clipboard && clipboard.setData("Text", text)
};
var contains = (container, element) => {
    if (!element) {
        return false
    }
    if (_core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].isTextNode(element)) {
        element = element.parentNode
    }
    if (_core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].isDocument(container)) {
        return container.documentElement.contains(element)
    }
    if (Object(_type__WEBPACK_IMPORTED_MODULE_3__["isWindow"])(container)) {
        return contains(container.document, element)
    }
    return container.contains ? container.contains(element) : !!(element.compareDocumentPosition(container) & element.DOCUMENT_POSITION_CONTAINS)
};
var createTextElementHiddenCopy = (element, text, options) => {
    var elementStyles = window.getComputedStyle(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element).get(0));
    var includePaddings = options && options.includePaddings;
    return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").text(text).css({
        fontStyle: elementStyles.fontStyle,
        fontVariant: elementStyles.fontVariant,
        fontWeight: elementStyles.fontWeight,
        fontSize: elementStyles.fontSize,
        fontFamily: elementStyles.fontFamily,
        letterSpacing: elementStyles.letterSpacing,
        border: elementStyles.border,
        paddingTop: includePaddings ? elementStyles.paddingTop : "",
        paddingRight: includePaddings ? elementStyles.paddingRight : "",
        paddingBottom: includePaddings ? elementStyles.paddingBottom : "",
        paddingLeft: includePaddings ? elementStyles.paddingLeft : "",
        visibility: "hidden",
        whiteSpace: "pre",
        position: "absolute",
        float: "left"
    })
};
var insertBefore = (element, newElement) => {
    if (newElement) {
        _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].insertElement(element.parentNode, newElement, element)
    }
    return element
};
var replaceWith = (element, newElement) => {
    if (!(newElement && newElement[0])) {
        return
    }
    if (newElement.is(element)) {
        return element
    }
    Object(_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(newElement, (_, currentElement) => {
        insertBefore(element[0], currentElement)
    });
    element.remove();
    return newElement
};


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/public_component.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/public_component.js ***!
  \********************************************************************/
/*! exports provided: attachInstanceToElement, getInstanceByElement, name */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachInstanceToElement", function() { return attachInstanceToElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstanceByElement", function() { return getInstanceByElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return getName; });
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _polyfills_weak_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../polyfills/weak_map */ "./node_modules/devextreme/esm/core/polyfills/weak_map.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _events_remove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/remove */ "./node_modules/devextreme/esm/events/remove.js");
/**
 * DevExtreme (esm/core/utils/public_component.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var COMPONENT_NAMES_DATA_KEY = "dxComponents";
var ANONYMOUS_COMPONENT_DATA_KEY = "dxPrivateComponent";
var componentNames = new _polyfills_weak_map__WEBPACK_IMPORTED_MODULE_2__["default"];
var nextAnonymousComponent = 0;
var getName = function(componentClass, newName) {
    if (Object(_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(newName)) {
        componentNames.set(componentClass, newName);
        return
    }
    if (!componentNames.has(componentClass)) {
        var generatedName = ANONYMOUS_COMPONENT_DATA_KEY + nextAnonymousComponent++;
        componentNames.set(componentClass, generatedName);
        return generatedName
    }
    return componentNames.get(componentClass)
};
function attachInstanceToElement($element, componentInstance, disposeFn) {
    var data = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_0__["data"])($element.get(0));
    var name = getName(componentInstance.constructor);
    data[name] = componentInstance;
    if (disposeFn) {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].one($element, _events_remove__WEBPACK_IMPORTED_MODULE_4__["removeEvent"], (function() {
            disposeFn.call(componentInstance)
        }))
    }
    if (!data[COMPONENT_NAMES_DATA_KEY]) {
        data[COMPONENT_NAMES_DATA_KEY] = []
    }
    data[COMPONENT_NAMES_DATA_KEY].push(name)
}
function getInstanceByElement($element, componentClass) {
    var name = getName(componentClass);
    return Object(_core_element_data__WEBPACK_IMPORTED_MODULE_0__["data"])($element.get(0), name)
}



/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/support.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/support.js ***!
  \***********************************************************/
/*! exports provided: touchEvents, pointerEvents, styleProp, stylePropPrefix, supportProp, inputType, touch, transition, transitionEndEventName, animation, nativeScrolling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchEvents", function() { return touchEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointerEvents", function() { return pointerEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportProp", function() { return supportProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputType", function() { return inputType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return touch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitionEndEventName", function() { return transitionEndEventName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animation", function() { return animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nativeScrolling", function() { return nativeScrolling; });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _call_once__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./call_once */ "./node_modules/devextreme/esm/core/utils/call_once.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style */ "./node_modules/devextreme/esm/core/utils/style.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "styleProp", function() { return _style__WEBPACK_IMPORTED_MODULE_5__["styleProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stylePropPrefix", function() { return _style__WEBPACK_IMPORTED_MODULE_5__["stylePropPrefix"]; });

/**
 * DevExtreme (esm/core/utils/support.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var {
    maxTouchPoints: maxTouchPoints
} = Object(_window__WEBPACK_IMPORTED_MODULE_3__["getNavigator"])();
var transitionEndEventNames = {
    webkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    transition: "transitionend"
};
var supportProp = function(prop) {
    return !!Object(_style__WEBPACK_IMPORTED_MODULE_5__["styleProp"])(prop)
};
var isNativeScrollingSupported = function() {
    var {
        platform: platform,
        version: version,
        mac: isMac
    } = _devices__WEBPACK_IMPORTED_MODULE_4__["default"].real();
    var isObsoleteAndroid = version && version[0] < 4 && "android" === platform;
    var isNativeScrollDevice = !isObsoleteAndroid && Object(_array__WEBPACK_IMPORTED_MODULE_0__["inArray"])(platform, ["ios", "android"]) > -1 || isMac;
    return isNativeScrollDevice
};
var inputType = function(type) {
    if ("text" === type) {
        return true
    }
    var input = _dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("input");
    try {
        input.setAttribute("type", type);
        input.value = "wrongValue";
        return !input.value
    } catch (e) {
        return false
    }
};
var detectTouchEvents = function(hasWindowProperty, maxTouchPoints) {
    return (hasWindowProperty("ontouchstart") || !!maxTouchPoints) && !hasWindowProperty("callPhantom")
};
var detectPointerEvent = function(hasWindowProperty) {
    return hasWindowProperty("PointerEvent")
};
var touchEvents = detectTouchEvents(_window__WEBPACK_IMPORTED_MODULE_3__["hasProperty"], maxTouchPoints);
var pointerEvents = detectPointerEvent(_window__WEBPACK_IMPORTED_MODULE_3__["hasProperty"]);
var touchPointersPresent = !!maxTouchPoints;

var touch = touchEvents || pointerEvents && touchPointersPresent;
var transition = Object(_call_once__WEBPACK_IMPORTED_MODULE_2__["default"])((function() {
    return supportProp("transition")
}));
var transitionEndEventName = Object(_call_once__WEBPACK_IMPORTED_MODULE_2__["default"])((function() {
    return transitionEndEventNames[Object(_style__WEBPACK_IMPORTED_MODULE_5__["styleProp"])("transition")]
}));
var animation = Object(_call_once__WEBPACK_IMPORTED_MODULE_2__["default"])((function() {
    return supportProp("animation")
}));
var nativeScrolling = isNativeScrollingSupported();


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/template_manager.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/template_manager.js ***!
  \********************************************************************/
/*! exports provided: findTemplates, suitableTemplatesByName, addOneRenderedCall, getNormalizedTemplateArgs, validateTemplateSource, templateKey, defaultCreateElement, acquireIntegrationTemplate, acquireTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findTemplates", function() { return findTemplates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "suitableTemplatesByName", function() { return suitableTemplatesByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOneRenderedCall", function() { return addOneRenderedCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizedTemplateArgs", function() { return getNormalizedTemplateArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTemplateSource", function() { return validateTemplateSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateKey", function() { return templateKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCreateElement", function() { return defaultCreateElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acquireIntegrationTemplate", function() { return acquireIntegrationTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acquireTemplate", function() { return acquireTemplate; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/devextreme/esm/core/config.js");
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _templates_child_default_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/child_default_template */ "./node_modules/devextreme/esm/core/templates/child_default_template.js");
/* harmony import */ var _templates_empty_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../templates/empty_template */ "./node_modules/devextreme/esm/core/templates/empty_template.js");
/* harmony import */ var _templates_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../templates/template */ "./node_modules/devextreme/esm/core/templates/template.js");
/* harmony import */ var _templates_template_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../templates/template_base */ "./node_modules/devextreme/esm/core/templates/template_base.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/core/utils/template_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */













var findTemplates = (element, name) => {
    var templates = Object(_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])(element).contents().filter("[".concat("data-options", '*="').concat(name, '"]'));
    return [].slice.call(templates).map(element => {
        var optionsString = Object(_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])(element).attr("data-options") || "";
        return {
            element: element,
            options: Object(_config__WEBPACK_IMPORTED_MODULE_0__["default"])().optionsParser(optionsString)[name]
        }
    }).filter(template => !!template.options)
};
var suitableTemplatesByName = rawTemplates => {
    var templatesMap = Object(_array__WEBPACK_IMPORTED_MODULE_8__["groupBy"])(rawTemplates, template => template.options.name);
    if (templatesMap[void 0]) {
        throw _errors__WEBPACK_IMPORTED_MODULE_2__["default"].Error("E0023")
    }
    var result = {};
    Object.keys(templatesMap).forEach(name => {
        var _findBestMatches$;
        var suitableTemplate = null === (_findBestMatches$ = Object(_common__WEBPACK_IMPORTED_MODULE_9__["findBestMatches"])(_devices__WEBPACK_IMPORTED_MODULE_1__["default"].current(), templatesMap[name], template => template.options)[0]) || void 0 === _findBestMatches$ ? void 0 : _findBestMatches$.element;
        if (suitableTemplate) {
            result[name] = suitableTemplate
        }
    });
    return result
};
var addOneRenderedCall = template => {
    var render = template.render.bind(template);
    return Object(_extend__WEBPACK_IMPORTED_MODULE_11__["extend"])({}, template, {
        render(options) {
            var templateResult = render(options);
            options && options.onRendered && options.onRendered();
            return templateResult
        }
    })
};
var getNormalizedTemplateArgs = options => {
    var args = [];
    if ("model" in options) {
        args.push(options.model)
    }
    if ("index" in options) {
        args.push(options.index)
    }
    args.push(options.container);
    return args
};
var validateTemplateSource = templateSource => "string" === typeof templateSource ? Object(_dom__WEBPACK_IMPORTED_MODULE_10__["normalizeTemplateElement"])(templateSource) : templateSource;
var templateKey = templateSource => Object(_type__WEBPACK_IMPORTED_MODULE_12__["isRenderer"])(templateSource) && templateSource[0] || templateSource;
var defaultCreateElement = element => new _templates_template__WEBPACK_IMPORTED_MODULE_6__["Template"](element);
var acquireIntegrationTemplate = (templateSource, templates, isAsyncTemplate, skipTemplates) => {
    var integrationTemplate = null;
    if (!skipTemplates || -1 === skipTemplates.indexOf(templateSource)) {
        integrationTemplate = templates[templateSource];
        if (integrationTemplate && !(integrationTemplate instanceof _templates_template_base__WEBPACK_IMPORTED_MODULE_7__["TemplateBase"]) && !isAsyncTemplate) {
            integrationTemplate = addOneRenderedCall(integrationTemplate)
        }
    }
    return integrationTemplate
};
var acquireTemplate = (templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) => {
    if (null == templateSource) {
        return new _templates_empty_template__WEBPACK_IMPORTED_MODULE_5__["EmptyTemplate"]
    }
    if (templateSource instanceof _templates_child_default_template__WEBPACK_IMPORTED_MODULE_4__["ChildDefaultTemplate"]) {
        return defaultTemplates[templateSource.name]
    }
    if (templateSource instanceof _templates_template_base__WEBPACK_IMPORTED_MODULE_7__["TemplateBase"]) {
        return templateSource
    }
    if (Object(_type__WEBPACK_IMPORTED_MODULE_12__["isFunction"])(templateSource.render) && !Object(_type__WEBPACK_IMPORTED_MODULE_12__["isRenderer"])(templateSource)) {
        return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource)
    }
    if (templateSource.nodeType || Object(_type__WEBPACK_IMPORTED_MODULE_12__["isRenderer"])(templateSource)) {
        return createTemplate(Object(_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])(templateSource))
    }
    return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource)
};


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/version.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/version.js ***!
  \***********************************************************/
/*! exports provided: compare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compare", function() { return compare; });
/**
 * DevExtreme (esm/core/utils/version.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
function compare(x, y, maxLevel) {
    function normalizeArg(value) {
        if ("string" === typeof value) {
            return value.split(".")
        }
        if ("number" === typeof value) {
            return [value]
        }
        return value
    }
    x = normalizeArg(x);
    y = normalizeArg(y);
    var length = Math.max(x.length, y.length);
    if (isFinite(maxLevel)) {
        length = Math.min(length, maxLevel)
    }
    for (var i = 0; i < length; i++) {
        var xItem = parseInt(x[i] || 0, 10);
        var yItem = parseInt(y[i] || 0, 10);
        if (xItem < yItem) {
            return -1
        }
        if (xItem > yItem) {
            return 1
        }
    }
    return 0
}


/***/ }),

/***/ "./node_modules/devextreme/esm/events/click.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/events/click.js ***!
  \*****************************************************/
/*! exports provided: name */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return CLICK_EVENT_NAME; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _animation_frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation/frame */ "./node_modules/devextreme/esm/animation/frame.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _utils_event_nodes_disposing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/event_nodes_disposing */ "./node_modules/devextreme/esm/events/utils/event_nodes_disposing.js");
/* harmony import */ var _pointer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/emitter */ "./node_modules/devextreme/esm/events/core/emitter.js");
/* harmony import */ var _core_emitter_registrator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/* harmony import */ var _core_utils_version__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/version */ "./node_modules/devextreme/esm/core/utils/version.js");
/**
 * DevExtreme (esm/events/click.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */












var CLICK_EVENT_NAME = "dxclick";
var TOUCH_BOUNDARY = 10;
var abs = Math.abs;
var isInput = function(element) {
    return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).is("input, textarea, select, button ,:focus, :focus *")
};
var misc = {
    requestAnimationFrame: _animation_frame__WEBPACK_IMPORTED_MODULE_5__["requestAnimationFrame"],
    cancelAnimationFrame: _animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"]
};
var ClickEmitter = _core_emitter__WEBPACK_IMPORTED_MODULE_9__["default"].inherit({
    ctor: function(element) {
        this.callBase(element);
        this._makeElementClickable(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element))
    },
    _makeElementClickable: function($element) {
        if (!$element.attr("onclick")) {
            $element.attr("onclick", "void(0)")
        }
    },
    start: function(e) {
        this._blurPrevented = e.isDefaultPrevented();
        this._startTarget = e.target;
        this._startEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["eventData"])(e)
    },
    end: function(e) {
        if (this._eventOutOfElement(e, this.getElement().get(0)) || e.type === _pointer__WEBPACK_IMPORTED_MODULE_8__["default"].cancel) {
            this._cancel(e);
            return
        }
        if (!isInput(e.target) && !this._blurPrevented) {
            Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_4__["resetActiveElement"])()
        }
        this._accept(e);
        this._clickAnimationFrame = misc.requestAnimationFrame(function() {
            this._fireClickEvent(e)
        }.bind(this))
    },
    _eventOutOfElement: function(e, element) {
        var target = e.target;
        var targetChanged = !Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_4__["contains"])(element, target) && element !== target;
        var gestureDelta = Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["eventDelta"])(Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["eventData"])(e), this._startEventData);
        var boundsExceeded = abs(gestureDelta.x) > TOUCH_BOUNDARY || abs(gestureDelta.y) > TOUCH_BOUNDARY;
        return targetChanged || boundsExceeded
    },
    _fireClickEvent: function(e) {
        this._fireEvent(CLICK_EVENT_NAME, e, {
            target: Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_4__["closestCommonParent"])(this._startTarget, e.target)
        })
    },
    dispose: function() {
        misc.cancelAnimationFrame(this._clickAnimationFrame)
    }
});
var realDevice = _core_devices__WEBPACK_IMPORTED_MODULE_2__["default"].real();
var useNativeClick = realDevice.generic || realDevice.ios && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_11__["compare"])(realDevice.version, [9, 3]) >= 0 || realDevice.android && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_11__["compare"])(realDevice.version, [5]) >= 0;
! function() {
    var isNativeClickEvent = function(target) {
        return useNativeClick || Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(target).closest(".dx-native-click").length
    };
    var prevented = null;
    var lastFiredEvent = null;

    function onNodeRemove() {
        lastFiredEvent = null
    }
    var clickHandler = function(e) {
        var originalEvent = e.originalEvent;
        var eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
        var leftButton = !e.which || 1 === e.which;
        if (leftButton && !prevented && isNativeClickEvent(e.target) && !eventAlreadyFired) {
            if (originalEvent) {
                originalEvent.DXCLICK_FIRED = true
            }
            Object(_utils_event_nodes_disposing__WEBPACK_IMPORTED_MODULE_7__["unsubscribeNodesDisposing"])(lastFiredEvent, onNodeRemove);
            lastFiredEvent = originalEvent;
            Object(_utils_event_nodes_disposing__WEBPACK_IMPORTED_MODULE_7__["subscribeNodesDisposing"])(lastFiredEvent, onNodeRemove);
            Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["fireEvent"])({
                type: CLICK_EVENT_NAME,
                originalEvent: e
            })
        }
    };
    ClickEmitter = ClickEmitter.inherit({
        _makeElementClickable: function($element) {
            if (!isNativeClickEvent($element)) {
                this.callBase($element)
            }
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on($element, "click", clickHandler)
        },
        configure: function(data) {
            this.callBase(data);
            if (data.useNative) {
                this.getElement().addClass("dx-native-click")
            }
        },
        start: function(e) {
            prevented = null;
            if (!isNativeClickEvent(e.target)) {
                this.callBase(e)
            }
        },
        end: function(e) {
            if (!isNativeClickEvent(e.target)) {
                this.callBase(e)
            }
        },
        cancel: function() {
            prevented = true
        },
        dispose: function() {
            this.callBase();
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].off(this.getElement(), "click", clickHandler)
        }
    })
}();
! function() {
    var desktopDevice = _core_devices__WEBPACK_IMPORTED_MODULE_2__["default"].real().generic;
    if (!desktopDevice) {
        var startTarget = null;
        var blurPrevented = false;
        var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].getDocument();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].subscribeGlobal(document, Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])(_pointer__WEBPACK_IMPORTED_MODULE_8__["default"].down, "NATIVE_CLICK_FIXER"), (function(e) {
            startTarget = e.target;
            blurPrevented = e.isDefaultPrevented()
        }));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].subscribeGlobal(document, Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])("click", "NATIVE_CLICK_FIXER"), (function(e) {
            var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target);
            if (!blurPrevented && startTarget && !$target.is(startTarget) && !Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(startTarget).is("label") && isInput($target)) {
                Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_4__["resetActiveElement"])()
            }
            startTarget = null;
            blurPrevented = false
        }))
    }
}();
Object(_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_10__["default"])({
    emitter: ClickEmitter,
    bubble: true,
    events: [CLICK_EVENT_NAME]
});



/***/ }),

/***/ "./node_modules/devextreme/esm/events/core/emitter.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/core/emitter.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/events/core/emitter.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var Emitter = _core_class__WEBPACK_IMPORTED_MODULE_2__["default"].inherit({
    ctor: function(element) {
        this._$element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
        this._cancelCallback = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_3__["default"])();
        this._acceptCallback = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_3__["default"])()
    },
    getElement: function() {
        return this._$element
    },
    validate: function(e) {
        return !Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["isDxMouseWheelEvent"])(e)
    },
    validatePointers: function(e) {
        return 1 === Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["hasTouches"])(e)
    },
    allowInterruptionByMouseWheel: function() {
        return true
    },
    configure: function(data) {
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(this, data)
    },
    addCancelCallback: function(callback) {
        this._cancelCallback.add(callback)
    },
    removeCancelCallback: function() {
        this._cancelCallback.empty()
    },
    _cancel: function(e) {
        this._cancelCallback.fire(this, e)
    },
    addAcceptCallback: function(callback) {
        this._acceptCallback.add(callback)
    },
    removeAcceptCallback: function() {
        this._acceptCallback.empty()
    },
    _accept: function(e) {
        this._acceptCallback.fire(this, e)
    },
    _requestAccept: function(e) {
        this._acceptRequestEvent = e
    },
    _forgetAccept: function() {
        this._accept(this._acceptRequestEvent);
        this._acceptRequestEvent = null
    },
    start: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    move: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    end: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    cancel: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    reset: function() {
        if (this._acceptRequestEvent) {
            this._accept(this._acceptRequestEvent)
        }
    },
    _fireEvent: function(eventName, e, params) {
        var eventData = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({
            type: eventName,
            originalEvent: e,
            target: this._getEmitterTarget(e),
            delegateTarget: this.getElement().get(0)
        }, params);
        e = Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["fireEvent"])(eventData);
        if (e.cancel) {
            this._cancel(e)
        }
        return e
    },
    _getEmitterTarget: function(e) {
        return (this.delegateSelector ? Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target).closest(this.delegateSelector) : this.getElement()).get(0)
    },
    dispose: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"]
});
/* harmony default export */ __webpack_exports__["default"] = (Emitter);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/core/emitter_registrator.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/core/emitter_registrator.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _event_registrator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./event_registrator */ "./node_modules/devextreme/esm/events/core/event_registrator.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _pointer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _wheel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./wheel */ "./node_modules/devextreme/esm/events/core/wheel.js");
/**
 * DevExtreme (esm/events/core/emitter_registrator.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */













var MANAGER_EVENT = "dxEventManager";
var EMITTER_DATA = "dxEmitter";
var EventManager = _core_class__WEBPACK_IMPORTED_MODULE_5__["default"].inherit({
    ctor: function() {
        this._attachHandlers();
        this.reset();
        this._proxiedCancelHandler = this._cancelHandler.bind(this);
        this._proxiedAcceptHandler = this._acceptHandler.bind(this)
    },
    _attachHandlers: function() {
        _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"].add(function() {
            var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument();
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].subscribeGlobal(document, Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["addNamespace"])(_pointer__WEBPACK_IMPORTED_MODULE_11__["default"].down, MANAGER_EVENT), this._pointerDownHandler.bind(this));
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].subscribeGlobal(document, Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["addNamespace"])(_pointer__WEBPACK_IMPORTED_MODULE_11__["default"].move, MANAGER_EVENT), this._pointerMoveHandler.bind(this));
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].subscribeGlobal(document, Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["addNamespace"])([_pointer__WEBPACK_IMPORTED_MODULE_11__["default"].up, _pointer__WEBPACK_IMPORTED_MODULE_11__["default"].cancel].join(" "), MANAGER_EVENT), this._pointerUpHandler.bind(this));
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].subscribeGlobal(document, Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["addNamespace"])(_wheel__WEBPACK_IMPORTED_MODULE_12__["name"], MANAGER_EVENT), this._mouseWheelHandler.bind(this))
        }.bind(this))
    },
    _eachEmitter: function(callback) {
        var activeEmitters = this._activeEmitters || [];
        var i = 0;
        while (activeEmitters.length > i) {
            var emitter = activeEmitters[i];
            if (false === callback(emitter)) {
                break
            }
            if (activeEmitters[i] === emitter) {
                i++
            }
        }
    },
    _applyToEmitters: function(method, arg) {
        this._eachEmitter((function(emitter) {
            emitter[method].call(emitter, arg)
        }))
    },
    reset: function() {
        this._eachEmitter(this._proxiedCancelHandler);
        this._activeEmitters = []
    },
    resetEmitter: function(emitter) {
        this._proxiedCancelHandler(emitter)
    },
    _pointerDownHandler: function(e) {
        if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["isMouseEvent"])(e) && e.which > 1) {
            return
        }
        this._updateEmitters(e)
    },
    _updateEmitters: function(e) {
        if (!this._isSetChanged(e)) {
            return
        }
        this._cleanEmitters(e);
        this._fetchEmitters(e)
    },
    _isSetChanged: function(e) {
        var currentSet = this._closestEmitter(e);
        var previousSet = this._emittersSet || [];
        var setChanged = currentSet.length !== previousSet.length;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(currentSet, (function(index, emitter) {
            setChanged = setChanged || previousSet[index] !== emitter;
            return !setChanged
        }));
        this._emittersSet = currentSet;
        return setChanged
    },
    _closestEmitter: function(e) {
        var that = this;
        var result = [];
        var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target);

        function handleEmitter(_, emitter) {
            if (!!emitter && emitter.validatePointers(e) && emitter.validate(e)) {
                emitter.addCancelCallback(that._proxiedCancelHandler);
                emitter.addAcceptCallback(that._proxiedAcceptHandler);
                result.push(emitter)
            }
        }
        while ($element.length) {
            var emitters = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])($element.get(0), EMITTER_DATA) || [];
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(emitters, handleEmitter);
            $element = $element.parent()
        }
        return result
    },
    _acceptHandler: function(acceptedEmitter, e) {
        var that = this;
        this._eachEmitter((function(emitter) {
            if (emitter !== acceptedEmitter) {
                that._cancelEmitter(emitter, e)
            }
        }))
    },
    _cancelHandler: function(canceledEmitter, e) {
        this._cancelEmitter(canceledEmitter, e)
    },
    _cancelEmitter: function(emitter, e) {
        var activeEmitters = this._activeEmitters;
        if (e) {
            emitter.cancel(e)
        } else {
            emitter.reset()
        }
        emitter.removeCancelCallback();
        emitter.removeAcceptCallback();
        var emitterIndex = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_7__["inArray"])(emitter, activeEmitters);
        if (emitterIndex > -1) {
            activeEmitters.splice(emitterIndex, 1)
        }
    },
    _cleanEmitters: function(e) {
        this._applyToEmitters("end", e);
        this.reset(e)
    },
    _fetchEmitters: function(e) {
        this._activeEmitters = this._emittersSet.slice();
        this._applyToEmitters("start", e)
    },
    _pointerMoveHandler: function(e) {
        this._applyToEmitters("move", e)
    },
    _pointerUpHandler: function(e) {
        this._updateEmitters(e)
    },
    _mouseWheelHandler: function(e) {
        if (!this._allowInterruptionByMouseWheel()) {
            return
        }
        e.pointers = [null];
        this._pointerDownHandler(e);
        this._adjustWheelEvent(e);
        this._pointerMoveHandler(e);
        e.pointers = [];
        this._pointerUpHandler(e)
    },
    _allowInterruptionByMouseWheel: function() {
        var allowInterruption = true;
        this._eachEmitter((function(emitter) {
            allowInterruption = emitter.allowInterruptionByMouseWheel() && allowInterruption;
            return allowInterruption
        }));
        return allowInterruption
    },
    _adjustWheelEvent: function(e) {
        var closestGestureEmitter = null;
        this._eachEmitter((function(emitter) {
            if (!emitter.gesture) {
                return
            }
            var direction = emitter.getDirection(e);
            if ("horizontal" !== direction && !e.shiftKey || "vertical" !== direction && e.shiftKey) {
                closestGestureEmitter = emitter;
                return false
            }
        }));
        if (!closestGestureEmitter) {
            return
        }
        var direction = closestGestureEmitter.getDirection(e);
        var verticalGestureDirection = "both" === direction && !e.shiftKey || "vertical" === direction;
        var prop = verticalGestureDirection ? "pageY" : "pageX";
        e[prop] += e.delta
    },
    isActive: function(element) {
        var result = false;
        this._eachEmitter((function(emitter) {
            result = result || emitter.getElement().is(element)
        }));
        return result
    }
});
var eventManager = new EventManager;
var EMITTER_SUBSCRIPTION_DATA = "dxEmitterSubscription";
var registerEmitter = function(emitterConfig) {
    var emitterClass = emitterConfig.emitter;
    var emitterName = emitterConfig.events[0];
    var emitterEvents = emitterConfig.events;
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(emitterEvents, (function(_, eventName) {
        Object(_event_registrator__WEBPACK_IMPORTED_MODULE_9__["default"])(eventName, {
            noBubble: !emitterConfig.bubble,
            setup: function(element) {
                var subscriptions = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])(element, EMITTER_SUBSCRIPTION_DATA) || {};
                var emitters = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])(element, EMITTER_DATA) || {};
                var emitter = emitters[emitterName] || new emitterClass(element);
                subscriptions[eventName] = true;
                emitters[emitterName] = emitter;
                Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])(element, EMITTER_DATA, emitters);
                Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])(element, EMITTER_SUBSCRIPTION_DATA, subscriptions)
            },
            add: function(element, handleObj) {
                var emitters = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])(element, EMITTER_DATA);
                var emitter = emitters[emitterName];
                emitter.configure(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_6__["extend"])({
                    delegateSelector: handleObj.selector
                }, handleObj.data), handleObj.type)
            },
            teardown: function(element) {
                var subscriptions = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])(element, EMITTER_SUBSCRIPTION_DATA);
                var emitters = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_4__["data"])(element, EMITTER_DATA);
                var emitter = emitters[emitterName];
                delete subscriptions[eventName];
                var disposeEmitter = true;
                Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(emitterEvents, (function(_, eventName) {
                    disposeEmitter = disposeEmitter && !subscriptions[eventName];
                    return disposeEmitter
                }));
                if (disposeEmitter) {
                    if (eventManager.isActive(element)) {
                        eventManager.resetEmitter(emitter)
                    }
                    emitter && emitter.dispose();
                    delete emitters[emitterName]
                }
            }
        })
    }))
};
/* harmony default export */ __webpack_exports__["default"] = (registerEmitter);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/core/event_registrator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/core/event_registrator.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _event_registrator_callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event_registrator_callbacks */ "./node_modules/devextreme/esm/events/core/event_registrator_callbacks.js");
/**
 * DevExtreme (esm/events/core/event_registrator.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var registerEvent = function(name, eventObject) {
    var strategy = {};
    if ("noBubble" in eventObject) {
        strategy.noBubble = eventObject.noBubble
    }
    if ("bindType" in eventObject) {
        strategy.bindType = eventObject.bindType
    }
    if ("delegateType" in eventObject) {
        strategy.delegateType = eventObject.delegateType
    }
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__["each"])(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], (function(_, methodName) {
        if (!eventObject[methodName]) {
            return
        }
        strategy[methodName] = function() {
            var args = [].slice.call(arguments);
            args.unshift(this);
            return eventObject[methodName].apply(eventObject, args)
        }
    }));
    _event_registrator_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"].fire(name, strategy)
};
registerEvent.callbacks = _event_registrator_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ __webpack_exports__["default"] = (registerEvent);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/core/keyboard_processor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/core/keyboard_processor.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/events/core/keyboard_processor.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var COMPOSITION_START_EVENT = "compositionstart";
var COMPOSITION_END_EVENT = "compositionend";
var KEYDOWN_EVENT = "keydown";
var NAMESPACE = "KeyboardProcessor";
var createKeyDownOptions = e => ({
    keyName: Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["normalizeKeyName"])(e),
    key: e.key,
    code: e.code,
    ctrl: e.ctrlKey,
    location: e.location,
    metaKey: e.metaKey,
    shift: e.shiftKey,
    alt: e.altKey,
    which: e.which,
    originalEvent: e
});
var KeyboardProcessor = _core_class__WEBPACK_IMPORTED_MODULE_2__["default"].inherit({
    _keydown: Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["addNamespace"])(KEYDOWN_EVENT, NAMESPACE),
    _compositionStart: Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["addNamespace"])(COMPOSITION_START_EVENT, NAMESPACE),
    _compositionEnd: Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["addNamespace"])(COMPOSITION_END_EVENT, NAMESPACE),
    ctor: function(options) {
        options = options || {};
        if (options.element) {
            this._element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(options.element)
        }
        if (options.focusTarget) {
            this._focusTarget = options.focusTarget
        }
        this._handler = options.handler;
        if (this._element) {
            this._processFunction = e => {
                var isNotFocusTarget = this._focusTarget && this._focusTarget !== e.target && Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_3__["inArray"])(e.target, Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(this._focusTarget)) < 0;
                var shouldSkipProcessing = this._isComposingJustFinished && 229 === e.which || this._isComposing || isNotFocusTarget;
                this._isComposingJustFinished = false;
                if (!shouldSkipProcessing) {
                    this.process(e)
                }
            };
            this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, this._keydown, this._processFunction);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, this._compositionStart, this._toggleProcessingWithContext);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._element, this._compositionEnd, this._toggleProcessingWithContext)
        }
    },
    dispose: function() {
        if (this._element) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._element, this._keydown, this._processFunction);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._element, this._compositionStart, this._toggleProcessingWithContext);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].off(this._element, this._compositionEnd, this._toggleProcessingWithContext)
        }
        this._element = void 0;
        this._handler = void 0
    },
    process: function(e) {
        this._handler(createKeyDownOptions(e))
    },
    toggleProcessing: function(_ref) {
        var {
            type: type
        } = _ref;
        this._isComposing = type === COMPOSITION_START_EVENT;
        this._isComposingJustFinished = !this._isComposing
    }
});
KeyboardProcessor.createKeyDownOptions = createKeyDownOptions;
/* harmony default export */ __webpack_exports__["default"] = (KeyboardProcessor);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/core/wheel.js":
/*!**********************************************************!*\
  !*** ./node_modules/devextreme/esm/events/core/wheel.js ***!
  \**********************************************************/
/*! exports provided: name */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return EVENT_NAME; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _event_registrator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event_registrator */ "./node_modules/devextreme/esm/events/core/event_registrator.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/events/core/wheel.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var EVENT_NAME = "dxmousewheel";
var EVENT_NAMESPACE = "dxWheel";
var NATIVE_EVENT_NAME = "wheel";
var PIXEL_MODE = 0;
var DELTA_MUTLIPLIER = 30;
var wheel = {
    setup: function(element) {
        var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on($element, Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["addNamespace"])(NATIVE_EVENT_NAME, EVENT_NAMESPACE), wheel._wheelHandler.bind(wheel))
    },
    teardown: function(element) {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].off(element, ".".concat(EVENT_NAMESPACE))
    },
    _wheelHandler: function(e) {
        var {
            deltaMode: deltaMode,
            deltaY: deltaY,
            deltaX: deltaX,
            deltaZ: deltaZ
        } = e.originalEvent;
        Object(_utils_index__WEBPACK_IMPORTED_MODULE_3__["fireEvent"])({
            type: EVENT_NAME,
            originalEvent: e,
            delta: this._normalizeDelta(deltaY, deltaMode),
            deltaX: deltaX,
            deltaY: deltaY,
            deltaZ: deltaZ,
            deltaMode: deltaMode,
            pointerType: "mouse"
        });
        e.stopPropagation()
    },
    _normalizeDelta(delta) {
        var deltaMode = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : PIXEL_MODE;
        if (deltaMode === PIXEL_MODE) {
            return -delta
        } else {
            return -DELTA_MUTLIPLIER * delta
        }
    }
};
Object(_event_registrator__WEBPACK_IMPORTED_MODULE_2__["default"])(EVENT_NAME, wheel);



/***/ }),

/***/ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.js":
/*!***********************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/gesture/emitter.gesture.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/style */ "./node_modules/devextreme/esm/core/utils/style.js");
/* harmony import */ var _core_utils_call_once__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/call_once */ "./node_modules/devextreme/esm/core/utils/call_once.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/emitter */ "./node_modules/devextreme/esm/events/core/emitter.js");
/**
 * DevExtreme (esm/events/gesture/emitter.gesture.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var ready = _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"].add;





var abs = Math.abs;
var SLEEP = 0;
var INITED = 1;
var STARTED = 2;
var TOUCH_BOUNDARY = 10;
var IMMEDIATE_TOUCH_BOUNDARY = 0;
var IMMEDIATE_TIMEOUT = 180;
var supportPointerEvents = function() {
    return Object(_core_utils_style__WEBPACK_IMPORTED_MODULE_3__["styleProp"])("pointer-events")
};
var setGestureCover = Object(_core_utils_call_once__WEBPACK_IMPORTED_MODULE_4__["default"])((function() {
    var isDesktop = "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_2__["default"].real().deviceType;
    if (!supportPointerEvents() || !isDesktop) {
        return _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"]
    }
    var $cover = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass("dx-gesture-cover").css("pointerEvents", "none");
    _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].subscribeGlobal($cover, "dxmousewheel", (function(e) {
        e.preventDefault()
    }));
    ready((function() {
        $cover.appendTo("body")
    }));
    return function(toggle, cursor) {
        $cover.css("pointerEvents", toggle ? "all" : "none");
        toggle && $cover.css("cursor", cursor)
    }
}));
var gestureCover = function(toggle, cursor) {
    var gestureCoverStrategy = setGestureCover();
    gestureCoverStrategy(toggle, cursor)
};
var GestureEmitter = _core_emitter__WEBPACK_IMPORTED_MODULE_11__["default"].inherit({
    gesture: true,
    configure: function(data) {
        this.getElement().css("msTouchAction", data.immediate ? "pinch-zoom" : "");
        this.callBase(data)
    },
    allowInterruptionByMouseWheel: function() {
        return this._stage !== STARTED
    },
    getDirection: function() {
        return this.direction
    },
    _cancel: function() {
        this.callBase.apply(this, arguments);
        this._toggleGestureCover(false);
        this._stage = SLEEP
    },
    start: function(e) {
        if (e._needSkipEvent || Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["needSkipEvent"])(e)) {
            this._cancel(e);
            return
        }
        this._startEvent = Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["createEvent"])(e);
        this._startEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["eventData"])(e);
        this._stage = INITED;
        this._init(e);
        this._setupImmediateTimer()
    },
    _setupImmediateTimer: function() {
        clearTimeout(this._immediateTimer);
        this._immediateAccepted = false;
        if (!this.immediate) {
            return
        }
        this._immediateTimer = setTimeout(function() {
            this._immediateAccepted = true
        }.bind(this), IMMEDIATE_TIMEOUT)
    },
    move: function(e) {
        if (this._stage === INITED && this._directionConfirmed(e)) {
            this._stage = STARTED;
            this._resetActiveElement();
            this._toggleGestureCover(true);
            this._clearSelection(e);
            this._adjustStartEvent(e);
            this._start(this._startEvent);
            if (this._stage === SLEEP) {
                return
            }
            this._requestAccept(e);
            this._move(e);
            this._forgetAccept()
        } else if (this._stage === STARTED) {
            this._clearSelection(e);
            this._move(e)
        }
    },
    _directionConfirmed: function(e) {
        var touchBoundary = this._getTouchBoundary(e);
        var delta = Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["eventDelta"])(this._startEventData, Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["eventData"])(e));
        var deltaX = abs(delta.x);
        var deltaY = abs(delta.y);
        var horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
        var verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
        var direction = this.getDirection(e);
        var bothAccepted = "both" === direction && (horizontalMove || verticalMove);
        var horizontalAccepted = "horizontal" === direction && horizontalMove;
        var verticalAccepted = "vertical" === direction && verticalMove;
        return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted
    },
    _validateMove: function(touchBoundary, mainAxis, crossAxis) {
        return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true)
    },
    _getTouchBoundary: function(e) {
        return this.immediate || Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["isDxMouseWheelEvent"])(e) ? IMMEDIATE_TOUCH_BOUNDARY : TOUCH_BOUNDARY
    },
    _adjustStartEvent: function(e) {
        var touchBoundary = this._getTouchBoundary(e);
        var delta = Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["eventDelta"])(this._startEventData, Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["eventData"])(e));
        this._startEvent.pageX += Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_7__["sign"])(delta.x) * touchBoundary;
        this._startEvent.pageY += Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_7__["sign"])(delta.y) * touchBoundary
    },
    _resetActiveElement: function() {
        if ("ios" === _core_devices__WEBPACK_IMPORTED_MODULE_2__["default"].real().platform && this.getElement().find(":focus").length) {
            Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_5__["resetActiveElement"])()
        }
    },
    _toggleGestureCover: function(toggle) {
        this._toggleGestureCoverImpl(toggle)
    },
    _toggleGestureCoverImpl: function(toggle) {
        var isStarted = this._stage === STARTED;
        if (isStarted) {
            gestureCover(toggle, this.getElement().css("cursor"))
        }
    },
    _clearSelection: function(e) {
        if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["isDxMouseWheelEvent"])(e) || Object(_utils_index__WEBPACK_IMPORTED_MODULE_10__["isTouchEvent"])(e)) {
            return
        }
        Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_5__["clearSelection"])()
    },
    end: function(e) {
        this._toggleGestureCover(false);
        if (this._stage === STARTED) {
            this._end(e)
        } else if (this._stage === INITED) {
            this._stop(e)
        }
        this._stage = SLEEP
    },
    dispose: function() {
        clearTimeout(this._immediateTimer);
        this.callBase.apply(this, arguments);
        this._toggleGestureCover(false)
    },
    _init: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _start: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _move: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _stop: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    _end: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"]
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function(newBoundary) {
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(newBoundary)) {
        TOUCH_BOUNDARY = newBoundary;
        return
    }
    return TOUCH_BOUNDARY
};
/* harmony default export */ __webpack_exports__["default"] = (GestureEmitter);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/hover.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/events/hover.js ***!
  \*****************************************************/
/*! exports provided: start, end */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return HOVERSTART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end", function() { return HOVEREND; });
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_event_registrator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/event_registrator */ "./node_modules/devextreme/esm/events/core/event_registrator.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _pointer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/**
 * DevExtreme (esm/events/hover.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var HOVERSTART_NAMESPACE = "dxHoverStart";
var HOVERSTART = "dxhoverstart";
var POINTERENTER_NAMESPACED_EVENT_NAME = Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["addNamespace"])(_pointer__WEBPACK_IMPORTED_MODULE_6__["default"].enter, HOVERSTART_NAMESPACE);
var HOVEREND_NAMESPACE = "dxHoverEnd";
var HOVEREND = "dxhoverend";
var POINTERLEAVE_NAMESPACED_EVENT_NAME = Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["addNamespace"])(_pointer__WEBPACK_IMPORTED_MODULE_6__["default"].leave, HOVEREND_NAMESPACE);
var Hover = _core_class__WEBPACK_IMPORTED_MODULE_2__["default"].inherit({
    noBubble: true,
    ctor: function() {
        this._handlerArrayKeyPath = this._eventNamespace + "_HandlerStore"
    },
    setup: function(element) {
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])(element, this._handlerArrayKeyPath, {})
    },
    add: function(element, handleObj) {
        var that = this;
        var handler = function(e) {
            that._handler(e)
        };
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(element, this._originalEventName, handleObj.selector, handler);
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])(element, this._handlerArrayKeyPath)[handleObj.guid] = handler
    },
    _handler: function(e) {
        if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["isTouchEvent"])(e) || _core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].isSimulator()) {
            return
        }
        Object(_utils_index__WEBPACK_IMPORTED_MODULE_5__["fireEvent"])({
            type: this._eventName,
            originalEvent: e,
            delegateTarget: e.delegateTarget
        })
    },
    remove: function(element, handleObj) {
        var handler = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])(element, this._handlerArrayKeyPath)[handleObj.guid];
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off(element, this._originalEventName, handleObj.selector, handler)
    },
    teardown: function(element) {
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["removeData"])(element, this._handlerArrayKeyPath)
    }
});
var HoverStart = Hover.inherit({
    ctor: function() {
        this._eventNamespace = HOVERSTART_NAMESPACE;
        this._eventName = HOVERSTART;
        this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
        this.callBase()
    },
    _handler: function(e) {
        var pointers = e.pointers || [];
        if (!pointers.length) {
            this.callBase(e)
        }
    }
});
var HoverEnd = Hover.inherit({
    ctor: function() {
        this._eventNamespace = HOVEREND_NAMESPACE;
        this._eventName = HOVEREND;
        this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
        this.callBase()
    }
});
Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])(HOVERSTART, new HoverStart);
Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])(HOVEREND, new HoverEnd);



/***/ }),

/***/ "./node_modules/devextreme/esm/events/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/events/index.js ***!
  \*****************************************************/
/*! exports provided: on, one, off, trigger, triggerHandler, Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "one", function() { return one; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trigger", function() { return trigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerHandler", function() { return triggerHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/**
 * DevExtreme (esm/events/index.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var on = _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on;
var one = _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].one;
var off = _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off;
var trigger = _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].trigger;
var triggerHandler = _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].triggerHandler;
var Event = _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].Event;


/***/ }),

/***/ "./node_modules/devextreme/esm/events/pointer.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/events/pointer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/support */ "./node_modules/devextreme/esm/core/utils/support.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_event_registrator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/event_registrator */ "./node_modules/devextreme/esm/events/core/event_registrator.js");
/* harmony import */ var _pointer_touch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pointer/touch */ "./node_modules/devextreme/esm/events/pointer/touch.js");
/* harmony import */ var _pointer_mouse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pointer/mouse */ "./node_modules/devextreme/esm/events/pointer/mouse.js");
/* harmony import */ var _pointer_mouse_and_touch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pointer/mouse_and_touch */ "./node_modules/devextreme/esm/events/pointer/mouse_and_touch.js");
/**
 * DevExtreme (esm/events/pointer.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var getStrategy = (support, device) => {
    var {
        tablet: tablet,
        phone: phone
    } = device;
    if (support.touch && !(tablet || phone)) {
        return _pointer_mouse_and_touch__WEBPACK_IMPORTED_MODULE_6__["default"]
    }
    if (support.touch) {
        return _pointer_touch__WEBPACK_IMPORTED_MODULE_4__["default"]
    }
    return _pointer_mouse__WEBPACK_IMPORTED_MODULE_5__["default"]
};
var EventStrategy = getStrategy(_core_utils_support__WEBPACK_IMPORTED_MODULE_0__, _core_devices__WEBPACK_IMPORTED_MODULE_2__["default"].real());
Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(EventStrategy.map, (pointerEvent, originalEvents) => {
    Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_3__["default"])(pointerEvent, new EventStrategy(pointerEvent, originalEvents))
});
var pointer = {
    down: "dxpointerdown",
    up: "dxpointerup",
    move: "dxpointermove",
    cancel: "dxpointercancel",
    enter: "dxpointerenter",
    leave: "dxpointerleave",
    over: "dxpointerover",
    out: "dxpointerout"
};
/* harmony default export */ __webpack_exports__["default"] = (pointer);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/pointer/base.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/pointer/base.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/browser */ "./node_modules/devextreme/esm/core/utils/browser.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/events/pointer/base.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var POINTER_EVENTS_NAMESPACE = "dxPointerEvents";
var BaseStrategy = _core_class__WEBPACK_IMPORTED_MODULE_3__["default"].inherit({
    ctor: function(eventName, originalEvents) {
        this._eventName = eventName;
        this._originalEvents = Object(_utils_index__WEBPACK_IMPORTED_MODULE_4__["addNamespace"])(originalEvents, POINTER_EVENTS_NAMESPACE);
        this._handlerCount = 0;
        this.noBubble = this._isNoBubble()
    },
    _isNoBubble: function() {
        var eventName = this._eventName;
        return "dxpointerenter" === eventName || "dxpointerleave" === eventName
    },
    _handler: function(e) {
        var delegateTarget = this._getDelegateTarget(e);
        return this._fireEvent({
            type: this._eventName,
            pointerType: e.pointerType || Object(_utils_index__WEBPACK_IMPORTED_MODULE_4__["eventSource"])(e),
            originalEvent: e,
            delegateTarget: delegateTarget,
            timeStamp: _core_utils_browser__WEBPACK_IMPORTED_MODULE_1__["default"].mozilla ? (new Date).getTime() : e.timeStamp
        })
    },
    _getDelegateTarget: function(e) {
        var delegateTarget;
        if (this.noBubble) {
            delegateTarget = e.delegateTarget
        }
        return delegateTarget
    },
    _fireEvent: function(args) {
        return Object(_utils_index__WEBPACK_IMPORTED_MODULE_4__["fireEvent"])(args)
    },
    _setSelector: function(handleObj) {
        this._selector = this.noBubble && handleObj ? handleObj.selector : null
    },
    _getSelector: function() {
        return this._selector
    },
    setup: function() {
        return true
    },
    add: function(element, handleObj) {
        if (this._handlerCount <= 0 || this.noBubble) {
            element = this.noBubble ? element : _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument();
            this._setSelector(handleObj);
            var that = this;
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(element, this._originalEvents, this._getSelector(), (function(e) {
                that._handler(e)
            }))
        }
        if (!this.noBubble) {
            this._handlerCount++
        }
    },
    remove: function(handleObj) {
        this._setSelector(handleObj);
        if (!this.noBubble) {
            this._handlerCount--
        }
    },
    teardown: function(element) {
        if (this._handlerCount && !this.noBubble) {
            return
        }
        element = this.noBubble ? element : _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument();
        if (this._originalEvents !== "." + POINTER_EVENTS_NAMESPACE) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off(element, this._originalEvents, this._getSelector())
        }
    },
    dispose: function(element) {
        element = this.noBubble ? element : _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off(element, this._originalEvents)
    }
});
/* harmony default export */ __webpack_exports__["default"] = (BaseStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/pointer/mouse.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/pointer/mouse.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/devextreme/esm/events/pointer/base.js");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observer */ "./node_modules/devextreme/esm/events/pointer/observer.js");
/**
 * DevExtreme (esm/events/pointer/mouse.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var eventMap = {
    dxpointerdown: "mousedown",
    dxpointermove: "mousemove",
    dxpointerup: "mouseup",
    dxpointercancel: "",
    dxpointerover: "mouseover",
    dxpointerout: "mouseout",
    dxpointerenter: "mouseenter",
    dxpointerleave: "mouseleave"
};
var normalizeMouseEvent = function(e) {
    e.pointerId = 1;
    return {
        pointers: observer.pointers(),
        pointerId: 1
    }
};
var observer;
var activated = false;
var activateStrategy = function() {
    if (activated) {
        return
    }
    observer = new _observer__WEBPACK_IMPORTED_MODULE_2__["default"](eventMap, (function() {
        return true
    }));
    activated = true
};
var MouseStrategy = _base__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    ctor: function() {
        this.callBase.apply(this, arguments);
        activateStrategy()
    },
    _fireEvent: function(args) {
        return this.callBase(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(normalizeMouseEvent(args.originalEvent), args))
    }
});
MouseStrategy.map = eventMap;
MouseStrategy.normalize = normalizeMouseEvent;
MouseStrategy.activate = activateStrategy;
MouseStrategy.resetObserver = function() {
    observer.reset()
};
/* harmony default export */ __webpack_exports__["default"] = (MouseStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/pointer/mouse_and_touch.js":
/*!***********************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/pointer/mouse_and_touch.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./node_modules/devextreme/esm/events/pointer/base.js");
/* harmony import */ var _mouse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mouse */ "./node_modules/devextreme/esm/events/pointer/mouse.js");
/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./touch */ "./node_modules/devextreme/esm/events/pointer/touch.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/events/pointer/mouse_and_touch.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var eventMap = {
    dxpointerdown: "touchstart mousedown",
    dxpointermove: "touchmove mousemove",
    dxpointerup: "touchend mouseup",
    dxpointercancel: "touchcancel",
    dxpointerover: "mouseover",
    dxpointerout: "mouseout",
    dxpointerenter: "mouseenter",
    dxpointerleave: "mouseleave"
};
var activated = false;
var activateStrategy = function() {
    if (activated) {
        return
    }
    _mouse__WEBPACK_IMPORTED_MODULE_2__["default"].activate();
    activated = true
};
var MouseAndTouchStrategy = _base__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    EVENT_LOCK_TIMEOUT: 100,
    ctor: function() {
        this.callBase.apply(this, arguments);
        activateStrategy()
    },
    _handler: function(e) {
        var isMouse = Object(_utils_index__WEBPACK_IMPORTED_MODULE_4__["isMouseEvent"])(e);
        if (!isMouse) {
            this._skipNextEvents = true
        }
        if (isMouse && this._mouseLocked) {
            return
        }
        if (isMouse && this._skipNextEvents) {
            this._skipNextEvents = false;
            this._mouseLocked = true;
            clearTimeout(this._unlockMouseTimer);
            var that = this;
            this._unlockMouseTimer = setTimeout((function() {
                that._mouseLocked = false
            }), this.EVENT_LOCK_TIMEOUT);
            return
        }
        return this.callBase(e)
    },
    _fireEvent: function(args) {
        var normalizer = Object(_utils_index__WEBPACK_IMPORTED_MODULE_4__["isMouseEvent"])(args.originalEvent) ? _mouse__WEBPACK_IMPORTED_MODULE_2__["default"].normalize : _touch__WEBPACK_IMPORTED_MODULE_3__["default"].normalize;
        return this.callBase(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(normalizer(args.originalEvent), args))
    },
    dispose: function() {
        this.callBase();
        this._skipNextEvents = false;
        this._mouseLocked = false;
        clearTimeout(this._unlockMouseTimer)
    }
});
MouseAndTouchStrategy.map = eventMap;
MouseAndTouchStrategy.resetObserver = _mouse__WEBPACK_IMPORTED_MODULE_2__["default"].resetObserver;
/* harmony default export */ __webpack_exports__["default"] = (MouseAndTouchStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/pointer/observer.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/pointer/observer.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/**
 * DevExtreme (esm/events/pointer/observer.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var addEventsListener = function(events, handler) {
    _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"].add((function() {
        events.split(" ").forEach((function(event) {
            _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].listen(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument(), event, handler, true)
        }))
    }))
};
var Observer = function(eventMap, pointerEquals, onPointerAdding) {
    onPointerAdding = onPointerAdding || function() {};
    var pointers = [];
    var getPointerIndex = function(e) {
        var index = -1;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__["each"])(pointers, (function(i, pointer) {
            if (!pointerEquals(e, pointer)) {
                return true
            }
            index = i;
            return false
        }));
        return index
    };
    var removePointer = function(e) {
        var index = getPointerIndex(e);
        if (index > -1) {
            pointers.splice(index, 1)
        }
    };
    addEventsListener(eventMap.dxpointerdown, (function(e) {
        if (-1 === getPointerIndex(e)) {
            onPointerAdding(e);
            pointers.push(e)
        }
    }));
    addEventsListener(eventMap.dxpointermove, (function(e) {
        pointers[getPointerIndex(e)] = e
    }));
    addEventsListener(eventMap.dxpointerup, removePointer);
    addEventsListener(eventMap.dxpointercancel, removePointer);
    this.pointers = function() {
        return pointers
    };
    this.reset = function() {
        pointers = []
    }
};
/* harmony default export */ __webpack_exports__["default"] = (Observer);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/pointer/touch.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/pointer/touch.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base */ "./node_modules/devextreme/esm/events/pointer/base.js");
/**
 * DevExtreme (esm/events/pointer/touch.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var eventMap = {
    dxpointerdown: "touchstart",
    dxpointermove: "touchmove",
    dxpointerup: "touchend",
    dxpointercancel: "touchcancel",
    dxpointerover: "",
    dxpointerout: "",
    dxpointerenter: "",
    dxpointerleave: ""
};
var normalizeTouchEvent = function(e) {
    var pointers = [];
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(e.touches, (function(_, touch) {
        pointers.push(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({
            pointerId: touch.identifier
        }, touch))
    }));
    return {
        pointers: pointers,
        pointerId: e.changedTouches[0].identifier
    }
};
var skipTouchWithSameIdentifier = function(pointerEvent) {
    return "ios" === _core_devices__WEBPACK_IMPORTED_MODULE_0__["default"].real().platform && ("dxpointerdown" === pointerEvent || "dxpointerup" === pointerEvent)
};
var TouchStrategy = _base__WEBPACK_IMPORTED_MODULE_3__["default"].inherit({
    ctor: function() {
        this.callBase.apply(this, arguments);
        this._pointerId = 0
    },
    _handler: function(e) {
        if (skipTouchWithSameIdentifier(this._eventName)) {
            var touch = e.changedTouches[0];
            if (this._pointerId === touch.identifier && 0 !== this._pointerId) {
                return
            }
            this._pointerId = touch.identifier
        }
        return this.callBase.apply(this, arguments)
    },
    _fireEvent: function(args) {
        return this.callBase(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(normalizeTouchEvent(args.originalEvent), args))
    }
});
TouchStrategy.map = eventMap;
TouchStrategy.normalize = normalizeTouchEvent;
/* harmony default export */ __webpack_exports__["default"] = (TouchStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/remove.js":
/*!******************************************************!*\
  !*** ./node_modules/devextreme/esm/events/remove.js ***!
  \******************************************************/
/*! exports provided: removeEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEvent", function() { return removeEvent; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_event_registrator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/event_registrator */ "./node_modules/devextreme/esm/events/core/event_registrator.js");
/**
 * DevExtreme (esm/events/remove.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var removeEvent = "dxremove";
var eventPropName = "dxRemoveEvent";
Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["beforeCleanData"])((function(elements) {
    elements = [].slice.call(elements);
    for (var i = 0; i < elements.length; i++) {
        var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(elements[i]);
        if ($element.prop(eventPropName)) {
            $element[0][eventPropName] = null;
            _core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].triggerHandler($element, removeEvent)
        }
    }
}));
Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_3__["default"])(removeEvent, {
    noBubble: true,
    setup: function(element) {
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).prop(eventPropName, true)
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/events/short.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/events/short.js ***!
  \*****************************************************/
/*! exports provided: active, resize, hover, visibility, focus, dxClick, click, keyboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "active", function() { return active; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resize", function() { return resize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hover", function() { return hover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibility", function() { return visibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focus", function() { return focus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dxClick", function() { return dxClick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "click", function() { return click; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyboard", function() { return keyboard; });
/* harmony import */ var _core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_keyboard_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/keyboard_processor */ "./node_modules/devextreme/esm/events/core/keyboard_processor.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/events/short.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




function addNamespace(event, namespace) {
    return namespace ? Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__["addNamespace"])(event, namespace) : event
}

function executeAction(action, args) {
    return "function" === typeof action ? action(args) : action.execute(args)
}
var active = {
    on: ($el, active, inactive, opts) => {
        var {
            selector: selector,
            showTimeout: showTimeout,
            hideTimeout: hideTimeout,
            namespace: namespace
        } = opts;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxactive", namespace), selector, {
            timeout: showTimeout
        }, event => executeAction(active, {
            event: event,
            element: event.currentTarget
        }));
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxinactive", namespace), selector, {
            timeout: hideTimeout
        }, event => executeAction(inactive, {
            event: event,
            element: event.currentTarget
        }))
    },
    off: ($el, _ref) => {
        var {
            namespace: namespace,
            selector: selector
        } = _ref;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxactive", namespace), selector);
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxinactive", namespace), selector)
    }
};
var resize = {
    on: function($el, resize) {
        var {
            namespace: namespace
        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxresize", namespace), resize)
    },
    off: function($el) {
        var {
            namespace: namespace
        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxresize", namespace))
    }
};
var hover = {
    on: ($el, start, end, _ref2) => {
        var {
            selector: selector,
            namespace: namespace
        } = _ref2;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxhoverend", namespace), selector, event => end(event));
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxhoverstart", namespace), selector, event => executeAction(start, {
            element: event.target,
            event: event
        }))
    },
    off: ($el, _ref3) => {
        var {
            selector: selector,
            namespace: namespace
        } = _ref3;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxhoverstart", namespace), selector);
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxhoverend", namespace), selector)
    }
};
var visibility = {
    on: ($el, shown, hiding, _ref4) => {
        var {
            namespace: namespace
        } = _ref4;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxhiding", namespace), hiding);
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxshown", namespace), shown)
    },
    off: ($el, _ref5) => {
        var {
            namespace: namespace
        } = _ref5;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxhiding", namespace));
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxshown", namespace))
    }
};
var focus = {
    on: ($el, focusIn, focusOut, _ref6) => {
        var {
            namespace: namespace
        } = _ref6;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("focusin", namespace), focusIn);
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("focusout", namespace), focusOut)
    },
    off: ($el, _ref7) => {
        var {
            namespace: namespace
        } = _ref7;
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("focusin", namespace));
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("focusout", namespace))
    },
    trigger: $el => _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].trigger($el, "focus")
};
var dxClick = {
    on: function($el, click) {
        var {
            namespace: namespace
        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("dxclick", namespace), click)
    },
    off: function($el) {
        var {
            namespace: namespace
        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("dxclick", namespace))
    }
};
var click = {
    on: function($el, click) {
        var {
            namespace: namespace
        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on($el, addNamespace("click", namespace), click)
    },
    off: function($el) {
        var {
            namespace: namespace
        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off($el, addNamespace("click", namespace))
    }
};
var index = 0;
var keyboardProcessors = {};
var generateListenerId = () => "keyboardProcessorId".concat(index++);
var keyboard = {
    on: (element, focusTarget, handler) => {
        var listenerId = generateListenerId();
        keyboardProcessors[listenerId] = new _core_keyboard_processor__WEBPACK_IMPORTED_MODULE_1__["default"]({
            element: element,
            focusTarget: focusTarget,
            handler: handler
        });
        return listenerId
    },
    off: listenerId => {
        if (listenerId && keyboardProcessors[listenerId]) {
            keyboardProcessors[listenerId].dispose();
            delete keyboardProcessors[listenerId]
        }
    },
    _getProcessor: listenerId => keyboardProcessors[listenerId]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/events/utils/add_namespace.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/utils/add_namespace.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/**
 * DevExtreme (esm/events/utils/add_namespace.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var addNamespace = (eventNames, namespace) => {
    if (!namespace) {
        throw _core_errors__WEBPACK_IMPORTED_MODULE_0__["default"].Error("E0017")
    }
    if (Array.isArray(eventNames)) {
        return eventNames.map(eventName => addNamespace(eventName, namespace)).join(" ")
    }
    if (-1 !== eventNames.indexOf(" ")) {
        return addNamespace(eventNames.split(/\s+/g), namespace)
    }
    return "".concat(eventNames, ".").concat(namespace)
};
/* harmony default export */ __webpack_exports__["default"] = (addNamespace);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/utils/event_nodes_disposing.js":
/*!***************************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/utils/event_nodes_disposing.js ***!
  \***************************************************************************/
/*! exports provided: subscribeNodesDisposing, unsubscribeNodesDisposing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeNodesDisposing", function() { return subscribeNodesDisposing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsubscribeNodesDisposing", function() { return unsubscribeNodesDisposing; });
/* harmony import */ var _core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _remove__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../remove */ "./node_modules/devextreme/esm/events/remove.js");
/**
 * DevExtreme (esm/events/utils/event_nodes_disposing.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



function nodesByEvent(event) {
    return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(node => !!node)
}
var subscribeNodesDisposing = (event, callback) => {
    _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].one(nodesByEvent(event), _remove__WEBPACK_IMPORTED_MODULE_1__["removeEvent"], callback)
};
var unsubscribeNodesDisposing = (event, callback) => {
    _core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off(nodesByEvent(event), _remove__WEBPACK_IMPORTED_MODULE_1__["removeEvent"], callback)
};


/***/ }),

/***/ "./node_modules/devextreme/esm/events/utils/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/events/utils/index.js ***!
  \***********************************************************/
/*! exports provided: eventSource, isPointerEvent, isMouseEvent, isDxMouseWheelEvent, isTouchEvent, isKeyboardEvent, isFakeClickEvent, eventData, eventDelta, hasTouches, forceSkipEvents, stopEventsSkipping, needSkipEvent, setEventFixMethod, createEvent, fireEvent, normalizeKeyName, getChar, addNamespace, isCommandKeyPressed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventSource", function() { return eventSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPointerEvent", function() { return isPointerEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMouseEvent", function() { return isMouseEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDxMouseWheelEvent", function() { return isDxMouseWheelEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTouchEvent", function() { return isTouchEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeyboardEvent", function() { return isKeyboardEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFakeClickEvent", function() { return isFakeClickEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventData", function() { return eventData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventDelta", function() { return eventDelta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTouches", function() { return hasTouches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceSkipEvents", function() { return forceSkipEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopEventsSkipping", function() { return stopEventsSkipping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "needSkipEvent", function() { return needSkipEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEventFixMethod", function() { return setEventFixMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEvent", function() { return createEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fireEvent", function() { return fireEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeKeyName", function() { return normalizeKeyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChar", function() { return getChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNamespace", function() { return addNamespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCommandKeyPressed", function() { return isCommandKeyPressed; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _add_namespace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add_namespace */ "./node_modules/devextreme/esm/events/utils/add_namespace.js");
/* harmony import */ var _core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _ui_widget_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ui/widget/selectors */ "./node_modules/devextreme/esm/ui/widget/selectors.js");
/**
 * DevExtreme (esm/events/utils/index.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var KEY_MAP = {
    backspace: "backspace",
    tab: "tab",
    enter: "enter",
    escape: "escape",
    pageup: "pageUp",
    pagedown: "pageDown",
    end: "end",
    home: "home",
    arrowleft: "leftArrow",
    arrowup: "upArrow",
    arrowright: "rightArrow",
    arrowdown: "downArrow",
    delete: "del",
    " ": "space",
    f: "F",
    a: "A",
    "*": "asterisk",
    "-": "minus",
    alt: "alt",
    control: "control",
    shift: "shift"
};
var LEGACY_KEY_CODES = {
    8: "backspace",
    9: "tab",
    13: "enter",
    27: "escape",
    33: "pageUp",
    34: "pageDown",
    35: "end",
    36: "home",
    37: "leftArrow",
    38: "upArrow",
    39: "rightArrow",
    40: "downArrow",
    46: "del",
    32: "space",
    70: "F",
    65: "A",
    106: "asterisk",
    109: "minus",
    189: "minus",
    173: "minus",
    16: "shift",
    17: "control",
    18: "alt"
};
var EVENT_SOURCES_REGEX = {
    dx: /^dx/i,
    mouse: /(mouse|wheel)/i,
    touch: /^touch/i,
    keyboard: /^key/i,
    pointer: /^(ms)?pointer/i
};
var fixMethod = e => e;
var copyEvent = originalEvent => fixMethod(_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].Event(originalEvent, originalEvent), originalEvent);
var isDxEvent = e => "dx" === eventSource(e);
var isNativeMouseEvent = e => "mouse" === eventSource(e);
var isNativeTouchEvent = e => "touch" === eventSource(e);
var eventSource = _ref => {
    var {
        type: type
    } = _ref;
    var result = "other";
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(EVENT_SOURCES_REGEX, (function(key) {
        if (this.test(type)) {
            result = key;
            return false
        }
    }));
    return result
};
var isPointerEvent = e => "pointer" === eventSource(e);
var isMouseEvent = e => isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "mouse" === e.pointerType;
var isDxMouseWheelEvent = e => e && "dxmousewheel" === e.type;
var isTouchEvent = e => isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "touch" === e.pointerType;
var isKeyboardEvent = e => "keyboard" === eventSource(e);
var isFakeClickEvent = _ref2 => {
    var {
        screenX: screenX,
        offsetX: offsetX,
        pageX: pageX
    } = _ref2;
    return 0 === screenX && !offsetX && 0 === pageX
};
var eventData = _ref3 => {
    var {
        pageX: pageX,
        pageY: pageY,
        timeStamp: timeStamp
    } = _ref3;
    return {
        x: pageX,
        y: pageY,
        time: timeStamp
    }
};
var eventDelta = (from, to) => ({
    x: to.x - from.x,
    y: to.y - from.y,
    time: to.time - from.time || 1
});
var hasTouches = e => {
    var {
        originalEvent: originalEvent,
        pointers: pointers
    } = e;
    if (isNativeTouchEvent(e)) {
        return (originalEvent.touches || []).length
    }
    if (isDxEvent(e)) {
        return (pointers || []).length
    }
    return 0
};
var skipEvents = false;
var forceSkipEvents = () => skipEvents = true;
var stopEventsSkipping = () => skipEvents = false;
var needSkipEvent = e => {
    if (skipEvents) {
        return true
    }
    var {
        target: target
    } = e;
    var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(target);
    var isDropDown = $target.is(".dx-dropdownlist-popup-wrapper *, .dx-dropdownlist-popup-wrapper");
    var isContentEditable = (null === target || void 0 === target ? void 0 : target.isContentEditable) || (null === target || void 0 === target ? void 0 : target.hasAttribute("contenteditable"));
    var touchInEditable = $target.is("input, textarea, select") || isContentEditable;
    if ($target.is(".dx-skip-gesture-event *, .dx-skip-gesture-event") && !isDropDown) {
        return true
    }
    if (isDxMouseWheelEvent(e)) {
        var isTextArea = $target.is("textarea") && $target.hasClass("dx-texteditor-input");
        if (isTextArea || isContentEditable) {
            return false
        }
        var isInputFocused = $target.is("input[type='number'], textarea, select") && $target.is(":focus");
        return isInputFocused
    }
    if (isMouseEvent(e)) {
        return touchInEditable || e.which > 1
    }
    if (isTouchEvent(e)) {
        return touchInEditable && Object(_ui_widget_selectors__WEBPACK_IMPORTED_MODULE_5__["focused"])($target)
    }
};
var setEventFixMethod = func => fixMethod = func;
var createEvent = (originalEvent, args) => {
    var event = copyEvent(originalEvent);
    args && Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(event, args);
    return event
};
var fireEvent = props => {
    var {
        originalEvent: originalEvent,
        delegateTarget: delegateTarget
    } = props;
    var event = createEvent(originalEvent, props);
    _core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].trigger(delegateTarget || event.target, event);
    return event
};
var normalizeKeyName = _ref4 => {
    var {
        key: key,
        which: which
    } = _ref4;
    var originalKey = key;
    var isKeySupported = !!key;
    if (key || which) {
        if (isKeySupported) {
            key = KEY_MAP[key.toLowerCase()]
        }
        if (!isKeySupported || !key && which) {
            key = LEGACY_KEY_CODES[which] || String.fromCharCode(which)
        }
        return key || originalKey
    }
};
var getChar = _ref5 => {
    var {
        key: key,
        which: which
    } = _ref5;
    return key || String.fromCharCode(which)
};
var addNamespace = _add_namespace__WEBPACK_IMPORTED_MODULE_1__["default"];
var isCommandKeyPressed = _ref6 => {
    var {
        ctrlKey: ctrlKey,
        metaKey: metaKey
    } = _ref6;
    return ctrlKey || metaKey
};


/***/ }),

/***/ "./node_modules/devextreme/esm/events/visibility_change.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/visibility_change.js ***!
  \*****************************************************************/
/*! exports provided: triggerShownEvent, triggerHidingEvent, triggerResizeEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerShownEvent", function() { return triggerShownEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerHidingEvent", function() { return triggerHidingEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerResizeEvent", function() { return triggerResizeEvent; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/**
 * DevExtreme (esm/events/visibility_change.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var triggerVisibilityChangeEvent = function(eventName) {
    return function(element) {
        var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element || "body");
        var changeHandlers = $element.filter(".dx-visibility-change-handler").add($element.find(".dx-visibility-change-handler"));
        for (var i = 0; i < changeHandlers.length; i++) {
            _core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].triggerHandler(changeHandlers[i], eventName)
        }
    }
};
var triggerShownEvent = triggerVisibilityChangeEvent("dxshown");
var triggerHidingEvent = triggerVisibilityChangeEvent("dxhiding");
var triggerResizeEvent = triggerVisibilityChangeEvent("dxresize");


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/themes.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/themes.js ***!
  \**************************************************/
/*! exports provided: waitForThemeLoad, isPendingThemeLoaded, init, current, attachCssClasses, detachCssClasses, isMaterial, isGeneric, isDark, isCompact, isWebFontLoaded, waitWebFont, ready, resetTheme, initialized, setDefaultTimeout, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForThemeLoad", function() { return waitForThemeLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPendingThemeLoaded", function() { return isPendingThemeLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "current", function() { return current; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachCssClasses", function() { return attachCssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachCssClasses", function() { return detachCssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMaterial", function() { return isMaterial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGeneric", function() { return isGeneric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDark", function() { return isDark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCompact", function() { return isCompact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebFontLoaded", function() { return isWebFontLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitWebFont", function() { return waitWebFont; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ready", function() { return themeReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetTheme", function() { return resetTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialized", function() { return initialized; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultTimeout", function() { return setDefaultTimeout; });
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/polyfills/promise */ "./node_modules/devextreme/esm/core/polyfills/promise.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_html_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/html_parser */ "./node_modules/devextreme/esm/core/utils/html_parser.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _core_utils_view_port__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/view_port */ "./node_modules/devextreme/esm/core/utils/view_port.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _themes_callback__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./themes_callback */ "./node_modules/devextreme/esm/ui/themes_callback.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/**
 * DevExtreme (esm/ui/themes.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */













var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_10__["getWindow"])();
var ready = _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_8__["default"].add;
var viewPort = _core_utils_view_port__WEBPACK_IMPORTED_MODULE_9__["value"];
var viewPortChanged = _core_utils_view_port__WEBPACK_IMPORTED_MODULE_9__["changeCallback"];
var initDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"];
var DX_LINK_SELECTOR = "link[rel=dx-theme]";
var THEME_ATTR = "data-theme";
var ACTIVE_ATTR = "data-active";
var DX_HAIRLINES_CLASS = "dx-hairlines";
var ANY_THEME = "any";
var context;
var $activeThemeLink;
var knownThemes;
var currentThemeName;
var pendingThemeName;
var defaultTimeout = 15e3;
var THEME_MARKER_PREFIX = "dx.";

function readThemeMarker() {
    if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_10__["hasWindow"])()) {
        return null
    }
    var element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])("<div>", context).addClass("dx-theme-marker").appendTo(context.documentElement);
    var result;
    try {
        result = window.getComputedStyle(element.get(0)).fontFamily;
        if (!result) {
            return null
        }
        result = result.replace(/["']/g, "");
        if (result.substr(0, THEME_MARKER_PREFIX.length) !== THEME_MARKER_PREFIX) {
            return null
        }
        return result.substr(THEME_MARKER_PREFIX.length)
    } finally {
        element.remove()
    }
}
function waitForThemeLoad(themeName) {
    var waitStartTime;
    var timerId;
    var intervalCleared = true;
    pendingThemeName = themeName;

    function handleLoaded() {
        pendingThemeName = null;
        clearInterval(timerId);
        intervalCleared = true;
        _themes_callback__WEBPACK_IMPORTED_MODULE_11__["themeReadyCallback"].fire();
        _themes_callback__WEBPACK_IMPORTED_MODULE_11__["themeReadyCallback"].empty();
        initDeferred.resolve()
    }
    if (isPendingThemeLoaded() || !defaultTimeout) {
        handleLoaded()
    } else {
        if (!intervalCleared) {
            if (pendingThemeName) {
                pendingThemeName = themeName
            }
            return
        }
        waitStartTime = Date.now();
        intervalCleared = false;
        timerId = setInterval((function() {
            var isLoaded = isPendingThemeLoaded();
            var isTimeout = !isLoaded && Date.now() - waitStartTime > defaultTimeout;
            if (isTimeout) {
                _widget_ui_errors__WEBPACK_IMPORTED_MODULE_12__["default"].log("W0004", pendingThemeName)
            }
            if (isLoaded || isTimeout) {
                handleLoaded()
            }
        }), 10)
    }
}
function isPendingThemeLoaded() {
    if (!pendingThemeName) {
        return true
    }
    var anyThemePending = pendingThemeName === ANY_THEME;
    if ("resolved" === initDeferred.state() && anyThemePending) {
        return true
    }
    var themeMarker = readThemeMarker();
    if (themeMarker && anyThemePending) {
        return true
    }
    return themeMarker === pendingThemeName
}

function processMarkup() {
    var $allThemeLinks = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(DX_LINK_SELECTOR, context);
    if (!$allThemeLinks.length) {
        return
    }
    knownThemes = {};
    $activeThemeLink = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_core_utils_html_parser__WEBPACK_IMPORTED_MODULE_6__["parseHTML"])("<link rel=stylesheet>"), context);
    $allThemeLinks.each((function() {
        var link = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(this, context);
        var fullThemeName = link.attr(THEME_ATTR);
        var url = link.attr("href");
        var isActive = "true" === link.attr(ACTIVE_ATTR);
        knownThemes[fullThemeName] = {
            url: url,
            isActive: isActive
        }
    }));
    $allThemeLinks.last().after($activeThemeLink);
    $allThemeLinks.remove()
}

function resolveFullThemeName(desiredThemeName) {
    var desiredThemeParts = desiredThemeName ? desiredThemeName.split(".") : [];
    var result = null;
    if (knownThemes) {
        if (desiredThemeName in knownThemes) {
            return desiredThemeName
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(knownThemes, (function(knownThemeName, themeData) {
            var knownThemeParts = knownThemeName.split(".");
            if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
                return
            }
            if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
                return
            }
            if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
                return
            }
            if (!result || themeData.isActive) {
                result = knownThemeName
            }
            if (themeData.isActive) {
                return false
            }
        }))
    }
    return result
}

function initContext(newContext) {
    try {
        if (newContext !== context) {
            knownThemes = null
        }
    } catch (x) {
        knownThemes = null
    }
    context = newContext
}
function init(options) {
    options = options || {};
    initContext(options.context || _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument());
    if (!context) {
        return
    }
    processMarkup();
    currentThemeName = void 0;
    current(options)
}
function current(options) {
    if (!arguments.length) {
        currentThemeName = currentThemeName || readThemeMarker();
        return currentThemeName
    }
    detachCssClasses(viewPort());
    options = options || {};
    if ("string" === typeof options) {
        options = {
            theme: options
        }
    }
    var isAutoInit = options._autoInit;
    var loadCallback = options.loadCallback;
    var currentThemeData;
    currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
    if (currentThemeName) {
        currentThemeData = knownThemes[currentThemeName]
    }
    if (loadCallback) {
        _themes_callback__WEBPACK_IMPORTED_MODULE_11__["themeReadyCallback"].add(loadCallback)
    }
    if (currentThemeData) {
        $activeThemeLink.attr("href", knownThemes[currentThemeName].url);
        if (_themes_callback__WEBPACK_IMPORTED_MODULE_11__["themeReadyCallback"].has() || "resolved" !== initDeferred.state() || options._forceTimeout) {
            waitForThemeLoad(currentThemeName)
        }
    } else if (isAutoInit) {
        if (Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_10__["hasWindow"])()) {
            waitForThemeLoad(ANY_THEME)
        }
        _themes_callback__WEBPACK_IMPORTED_MODULE_11__["themeReadyCallback"].fire();
        _themes_callback__WEBPACK_IMPORTED_MODULE_11__["themeReadyCallback"].empty()
    } else {
        throw _widget_ui_errors__WEBPACK_IMPORTED_MODULE_12__["default"].Error("E0021", currentThemeName)
    }
    initDeferred.done(() => attachCssClasses(Object(_core_utils_view_port__WEBPACK_IMPORTED_MODULE_9__["originalViewPort"])(), currentThemeName))
}

function getCssClasses(themeName) {
    themeName = themeName || current();
    var result = [];
    var themeNameParts = themeName && themeName.split(".");
    if (themeNameParts) {
        result.push("dx-theme-" + themeNameParts[0], "dx-theme-" + themeNameParts[0] + "-typography");
        if (themeNameParts.length > 1) {
            result.push("dx-color-scheme-" + themeNameParts[1] + (isMaterial(themeName) ? "-" + themeNameParts[2] : ""))
        }
    }
    return result
}
var themeClasses;
function attachCssClasses(element, themeName) {
    themeClasses = getCssClasses(themeName).join(" ");
    Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(element).addClass(themeClasses);
    ! function() {
        var pixelRatio = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_10__["hasWindow"])() && window.devicePixelRatio;
        if (!pixelRatio || pixelRatio < 2) {
            return
        }
        var $tester = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])("<div>");
        $tester.css("border", ".5px solid transparent");
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])("body").append($tester);
        if (1 === Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($tester)) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(element).addClass(DX_HAIRLINES_CLASS);
            themeClasses += " " + DX_HAIRLINES_CLASS
        }
        $tester.remove()
    }()
}
function detachCssClasses(element) {
    Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(element).removeClass(themeClasses)
}

function themeReady(callback) {
    _themes_callback__WEBPACK_IMPORTED_MODULE_11__["themeReadyCallback"].add(callback)
}

function isTheme(themeRegExp, themeName) {
    if (!themeName) {
        themeName = currentThemeName || readThemeMarker()
    }
    return new RegExp(themeRegExp).test(themeName)
}
function isMaterial(themeName) {
    return isTheme("material", themeName)
}
function isGeneric(themeName) {
    return isTheme("generic", themeName)
}
function isDark(themeName) {
    return isTheme("dark", themeName)
}
function isCompact(themeName) {
    return isTheme("compact", themeName)
}
function isWebFontLoaded(text, fontWeight) {
    var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getDocument();
    var testElement = document.createElement("span");
    testElement.style.position = "absolute";
    testElement.style.top = "-9999px";
    testElement.style.left = "-9999px";
    testElement.style.visibility = "hidden";
    testElement.style.fontFamily = "Arial";
    testElement.style.fontSize = "250px";
    testElement.style.fontWeight = fontWeight;
    testElement.innerHTML = text;
    document.body.appendChild(testElement);
    var etalonFontWidth = testElement.offsetWidth;
    testElement.style.fontFamily = "Roboto, RobotoFallback, Arial";
    var testedFontWidth = testElement.offsetWidth;
    testElement.parentNode.removeChild(testElement);
    return etalonFontWidth !== testedFontWidth
}
function waitWebFont(text, fontWeight) {
    return new _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_3__["default"](resolve => {
        var clear = () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            resolve()
        };
        var intervalId = setInterval(() => {
            if (isWebFontLoaded(text, fontWeight)) {
                clear()
            }
        }, 15);
        var timeoutId = setTimeout(clear, 2e3)
    })
}

function autoInit() {
    init({
        _autoInit: true,
        _forceTimeout: true
    });
    if (Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(DX_LINK_SELECTOR, context).length) {
        throw _widget_ui_errors__WEBPACK_IMPORTED_MODULE_12__["default"].Error("E0022")
    }
}
if (Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_10__["hasWindow"])()) {
    autoInit()
} else {
    ready(autoInit)
}
viewPortChanged.add((function(viewPort, prevViewPort) {
    initDeferred.done((function() {
        detachCssClasses(prevViewPort);
        attachCssClasses(viewPort)
    }))
}));
_core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].changed.add((function() {
    init({
        _autoInit: true
    })
}));

function resetTheme() {
    $activeThemeLink && $activeThemeLink.attr("href", "about:blank");
    currentThemeName = null;
    pendingThemeName = null;
    initDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"]
}
function initialized(callback) {
    initDeferred.done(callback)
}
function setDefaultTimeout(timeout) {
    defaultTimeout = timeout
}
/* harmony default export */ __webpack_exports__["default"] = ({
    setDefaultTimeout: setDefaultTimeout,
    initialized: initialized,
    resetTheme: resetTheme,
    ready: themeReady,
    waitWebFont: waitWebFont,
    isWebFontLoaded: isWebFontLoaded,
    isCompact: isCompact,
    isDark: isDark,
    isGeneric: isGeneric,
    isMaterial: isMaterial,
    detachCssClasses: detachCssClasses,
    attachCssClasses: attachCssClasses,
    current: current,
    waitForThemeLoad: waitForThemeLoad,
    isPendingThemeLoaded: isPendingThemeLoaded
});


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/themes_callback.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/themes_callback.js ***!
  \***********************************************************/
/*! exports provided: themeReadyCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "themeReadyCallback", function() { return themeReadyCallback; });
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/**
 * DevExtreme (esm/ui/themes_callback.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var themeReadyCallback = new _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_0__["default"];


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/widget/selectors.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/widget/selectors.js ***!
  \************************************************************/
/*! exports provided: focusable, tabbable, focused */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusable", function() { return focusable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabbable", function() { return tabbable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focused", function() { return focused; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/**
 * DevExtreme (esm/ui/widget/selectors.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var focusableFn = function(element, tabIndex) {
    if (!visible(element)) {
        return false
    }
    var nodeName = element.nodeName.toLowerCase();
    var isTabIndexNotNaN = !isNaN(tabIndex);
    var isDisabled = element.disabled;
    var isDefaultFocus = /^(input|select|textarea|button|object|iframe)$/.test(nodeName);
    var isHyperlink = "a" === nodeName;
    var isFocusable = true;
    var isContentEditable = element.isContentEditable;
    if (isDefaultFocus || isContentEditable) {
        isFocusable = !isDisabled
    } else if (isHyperlink) {
        isFocusable = element.href || isTabIndexNotNaN
    } else {
        isFocusable = isTabIndexNotNaN
    }
    return isFocusable
};

function visible(element) {
    var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
    return $element.is(":visible") && "hidden" !== $element.css("visibility") && "hidden" !== $element.parents().css("visibility")
}
var focusable = function(index, element) {
    return focusableFn(element, Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).attr("tabIndex"))
};
var tabbable = function(index, element) {
    var tabIndex = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).attr("tabIndex");
    return (isNaN(tabIndex) || tabIndex >= 0) && focusableFn(element, tabIndex)
};
var focused = function($element) {
    var element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])($element).get(0);
    return _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveElement() === element
};


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/widget/ui.errors.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/widget/ui.errors.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/error */ "./node_modules/devextreme/esm/core/utils/error.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/**
 * DevExtreme (esm/ui/widget/ui.errors.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


/* harmony default export */ __webpack_exports__["default"] = (Object(_core_utils_error__WEBPACK_IMPORTED_MODULE_0__["default"])(_core_errors__WEBPACK_IMPORTED_MODULE_1__["default"].ERROR_MESSAGES, {
    E1001: "Module '{0}'. Controller '{1}' is already registered",
    E1002: "Module '{0}'. Controller '{1}' does not inherit from DevExpress.ui.dxDataGrid.Controller",
    E1003: "Module '{0}'. View '{1}' is already registered",
    E1004: "Module '{0}'. View '{1}' does not inherit from DevExpress.ui.dxDataGrid.View",
    E1005: "Public method '{0}' is already registered",
    E1006: "Public method '{0}.{1}' does not exist",
    E1007: "State storing cannot be provided due to the restrictions of the browser",
    E1010: "The template does not contain the TextBox widget",
    E1011: 'Items cannot be deleted from the List. Implement the "remove" function in the data store',
    E1012: "Editing type '{0}' with the name '{1}' is unsupported",
    E1016: "Unexpected type of data source is provided for a lookup column",
    E1018: "The 'collapseAll' method cannot be called if you use a remote data source",
    E1019: "Search mode '{0}' is unavailable",
    E1020: "The type cannot be changed after initialization",
    E1021: "{0} '{1}' you are trying to remove does not exist",
    E1022: 'The "markers" option is given an invalid value. Assign an array instead',
    E1023: 'The "routes" option is given an invalid value. Assign an array instead',
    E1025: "This layout is too complex to render",
    E1026: 'The "calculateCustomSummary" function is missing from a field whose "summaryType" option is set to "custom"',
    E1031: "Unknown subscription in the Scheduler widget: '{0}'",
    E1032: "Unknown start date in an appointment: '{0}'",
    E1033: "Unknown step in the date navigator: '{0}'",
    E1034: "The browser does not implement an API for saving files",
    E1035: "The editor cannot be created because of an internal error: {0}",
    E1037: "Invalid structure of grouped data",
    E1038: "The browser does not support local storages for local web pages",
    E1039: "A cell's position cannot be calculated",
    E1040: "The '{0}' key value is not unique within the data array",
    E1041: "The '{0}' script is referenced after the DevExtreme scripts or not referenced at all",
    E1042: "{0} requires the key field to be specified",
    E1043: "Changes cannot be processed due to the incorrectly set key",
    E1044: "The key field specified by the keyExpr option does not match the key field specified in the data store",
    E1045: "Editing requires the key field to be specified in the data store",
    E1046: "The '{0}' key field is not found in data objects",
    E1047: 'The "{0}" field is not found in the fields array',
    E1048: 'The "{0}" operation is not found in the filterOperations array',
    E1049: "Column '{0}': filtering is allowed but the 'dataField' or 'name' option is not specified",
    E1050: "The validationRules option does not apply to third-party editors defined in the editCellTemplate",
    E1051: 'HtmlEditor\'s valueType is "{0}", but the {0} converter was not imported.',
    E1052: '{0} should have the "dataSource" option specified',
    E1053: 'The "buttons" option accepts an array that contains only objects or string values',
    E1054: "All text editor buttons must have names",
    E1055: 'One or several text editor buttons have invalid or non-unique "name" values',
    E1056: 'The {0} widget does not support buttons of the "{1}" type',
    E1058: 'The "startDayHour" must be earlier than the "endDayHour"',
    E1059: "The following column names are not unique: {0}",
    E1060: "All editable columns must have names",
    W1001: 'The "key" option cannot be modified after initialization',
    W1002: "An item with the key '{0}' does not exist",
    W1003: "A group with the key '{0}' in which you are trying to select items does not exist",
    W1004: "The item '{0}' you are trying to select in the group '{1}' does not exist",
    W1005: "Due to column data types being unspecified, data has been loaded twice in order to apply initial filter settings. To resolve this issue, specify data types for all grid columns.",
    W1006: "The map service returned the following error: '{0}'",
    W1007: "No item with key {0} was found in the data source, but this key was used as the parent key for item {1}",
    W1008: "Cannot scroll to the '{0}' date because it does not exist on the current view",
    W1009: "Searching works only if data is specified using the dataSource option",
    W1010: "The capability to select all items works with source data of plain structure only",
    W1011: 'The "keyExpr" option is not applied when dataSource is not an array',
    W1012: "The '{0}' key field is not found in data objects",
    W1013: 'The "message" field in the dialog component was renamed to "messageHtml". Change your code correspondingly. In addition, if you used HTML code in the message, make sure that it is secure',
    W1014: "The Floating Action Button exceeds the recommended speed dial action count. If you need to display more speed dial actions, increase the maxSpeedDialActionCount option value in the global config.",
    W1015: 'The "cellDuration" should divide the range from the "startDayHour" to the "endDayHour" into even intervals',
    W1016: "The '{0}' field in the HTML Editor toolbar item configuration was renamed to '{1}'. Please make a corresponding change in your code.",
    W1017: "The 'key' property is not specified for a lookup data source. Please specify it to prevent requests for the entire dataset when users filter data.",
    W1018: "Infinite scrolling may not work properly with multiple selection. To use these features together, set 'selection.deferred' to true or set 'selection.selectAllMode' to 'page'.",
    W1019: "Filter query string exceeds maximum length limit of {0} characters.",
    W1020: "hideEvent is ignored when the shading property is true"
}));


/***/ })

}]);