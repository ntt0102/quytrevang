(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[63],{

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectWithoutPropertiesLoose; });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/base_component.js":
/*!************************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/base_component.js ***!
  \************************************************************************/
/*! exports provided: BaseInfernoComponent, InfernoComponent, InfernoWrapperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseInfernoComponent", function() { return BaseInfernoComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfernoComponent", function() { return InfernoComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfernoWrapperComponent", function() { return InfernoWrapperComponent; });
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _effect_host__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect_host */ "./node_modules/@devextreme/runtime/esm/inferno/effect_host.js");


const areObjectsEqual = (firstObject, secondObject) => {
    const bothAreObjects = firstObject instanceof Object && secondObject instanceof Object;
    if (!bothAreObjects) {
        return firstObject === secondObject;
    }
    const firstObjectKeys = Object.keys(firstObject);
    const secondObjectKeys = Object.keys(secondObject);
    if (firstObjectKeys.length !== secondObjectKeys.length) {
        return false;
    }
    const hasDifferentElement = firstObjectKeys.some((key) => firstObject[key] !== secondObject[key]);
    return !hasDifferentElement;
};
class BaseInfernoComponent extends inferno__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this._pendingContext = this.context;
    }
    componentWillReceiveProps(_, context) {
        this._pendingContext = context !== null && context !== void 0 ? context : {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (!areObjectsEqual(this.props, nextProps)
            || !areObjectsEqual(this.state, nextState)
            || !areObjectsEqual(this.context, this._pendingContext));
    }
}
class InfernoComponent extends BaseInfernoComponent {
    constructor() {
        super(...arguments);
        this._effects = [];
    }
    createEffects() {
        return [];
    }
    updateEffects() { }
    componentWillMount() {
        _effect_host__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].lock();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentWillUpdate(_nextProps, _nextState, _context) {
        _effect_host__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].lock();
    }
    componentDidMount() {
        _effect_host__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].callbacks.push(() => { this._effects = this.createEffects(); });
        _effect_host__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].callEffects();
    }
    componentDidUpdate() {
        _effect_host__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].callbacks.push(() => this.updateEffects());
        _effect_host__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].callEffects();
    }
    destroyEffects() {
        this._effects.forEach((e) => e.dispose());
    }
    componentWillUnmount() {
        this.destroyEffects();
    }
}
class InfernoWrapperComponent extends InfernoComponent {
    constructor() {
        super(...arguments);
        this.vDomElement = null;
    }
    vDomUpdateClasses() {
        const el = this.vDomElement;
        const currentClasses = el.className.length
            ? el.className.split(' ')
            : [];
        const addedClasses = currentClasses.filter((className) => el.dxClasses.previous.indexOf(className) < 0);
        const removedClasses = el.dxClasses.previous.filter((className) => currentClasses.indexOf(className) < 0);
        addedClasses.forEach((value) => {
            const indexInRemoved = el.dxClasses.removed.indexOf(value);
            if (indexInRemoved > -1) {
                el.dxClasses.removed.splice(indexInRemoved, 1);
            }
            else {
                el.dxClasses.added.push(value);
            }
        });
        removedClasses.forEach((value) => {
            const indexInAdded = el.dxClasses.added.indexOf(value);
            if (indexInAdded > -1) {
                el.dxClasses.added.splice(indexInAdded, 1);
            }
            else {
                el.dxClasses.removed.push(value);
            }
        });
    }
    componentDidMount() {
        const el = Object(inferno__WEBPACK_IMPORTED_MODULE_0__["findDOMfromVNode"])(this.$LI, true);
        this.vDomElement = el;
        super.componentDidMount();
        el.dxClasses = el.dxClasses || {
            removed: [], added: [], previous: [],
        };
        el.dxClasses.previous = (el === null || el === void 0 ? void 0 : el.className.length) ? el.className.split(' ')
            : [];
    }
    componentDidUpdate() {
        super.componentDidUpdate();
        const el = this.vDomElement;
        if (el !== null) {
            el.dxClasses.added.forEach((className) => el.classList.add(className));
            el.dxClasses.removed.forEach((className) => el.classList.remove(className));
            el.dxClasses.previous = el.className.length
                ? el.className.split(' ')
                : [];
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate = super.shouldComponentUpdate(nextProps, nextState);
        if (shouldUpdate) {
            this.vDomUpdateClasses();
        }
        return shouldUpdate;
    }
}


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/create_context.js":
/*!************************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/create_context.js ***!
  \************************************************************************/
/*! exports provided: createContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return createContext; });
const createContext = function (defaultValue) {
    return defaultValue;
};


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/effect.js":
/*!****************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/effect.js ***!
  \****************************************************************/
/*! exports provided: InfernoEffect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfernoEffect", function() { return InfernoEffect; });
class InfernoEffect {
    constructor(effect, dependency) {
        this.effect = effect;
        this.dependency = dependency;
        this.destroy = effect();
    }
    update(dependency) {
        const currentDependency = this.dependency;
        if (dependency) {
            this.dependency = dependency;
        }
        if (!dependency || dependency.some((d, i) => currentDependency[i] !== d)) {
            this.dispose();
            this.destroy = this.effect();
        }
    }
    dispose() {
        if (this.destroy) {
            this.destroy();
        }
    }
}


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/effect_host.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/effect_host.js ***!
  \*********************************************************************/
/*! exports provided: InfernoEffectHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfernoEffectHost", function() { return InfernoEffectHost; });
const InfernoEffectHost = {
    lockCount: 0,
    lock() {
        this.lockCount++;
    },
    callbacks: [],
    callEffects() {
        this.lockCount--;
        if (this.lockCount < 0) {
            throw new Error('Unexpected Effect Call');
        }
        if (this.lockCount === 0) {
            const effects = this.callbacks;
            this.callbacks = [];
            effects.forEach((callback) => callback());
        }
    },
};


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/index.js ***!
  \***************************************************************/
/*! exports provided: BaseInfernoComponent, InfernoComponent, InfernoWrapperComponent, createContext, InfernoEffect, InfernoEffectHost, Portal, createReRenderEffect, normalizeStyles, hydrate, renderTemplate, hasTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_component */ "./node_modules/@devextreme/runtime/esm/inferno/base_component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseInfernoComponent", function() { return _base_component__WEBPACK_IMPORTED_MODULE_0__["BaseInfernoComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfernoComponent", function() { return _base_component__WEBPACK_IMPORTED_MODULE_0__["InfernoComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfernoWrapperComponent", function() { return _base_component__WEBPACK_IMPORTED_MODULE_0__["InfernoWrapperComponent"]; });

/* harmony import */ var _create_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_context */ "./node_modules/@devextreme/runtime/esm/inferno/create_context.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return _create_context__WEBPACK_IMPORTED_MODULE_1__["createContext"]; });

/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effect */ "./node_modules/@devextreme/runtime/esm/inferno/effect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfernoEffect", function() { return _effect__WEBPACK_IMPORTED_MODULE_2__["InfernoEffect"]; });

/* harmony import */ var _effect_host__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./effect_host */ "./node_modules/@devextreme/runtime/esm/inferno/effect_host.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfernoEffectHost", function() { return _effect_host__WEBPACK_IMPORTED_MODULE_3__["InfernoEffectHost"]; });

/* harmony import */ var _portal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./portal */ "./node_modules/@devextreme/runtime/esm/inferno/portal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Portal", function() { return _portal__WEBPACK_IMPORTED_MODULE_4__["Portal"]; });

/* harmony import */ var _re_render_effect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./re_render_effect */ "./node_modules/@devextreme/runtime/esm/inferno/re_render_effect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReRenderEffect", function() { return _re_render_effect__WEBPACK_IMPORTED_MODULE_5__["createReRenderEffect"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./node_modules/@devextreme/runtime/esm/inferno/utils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalizeStyles", function() { return _utils__WEBPACK_IMPORTED_MODULE_6__["normalizeStyles"]; });

/* harmony import */ var _mocked_hydrate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mocked/hydrate */ "./node_modules/@devextreme/runtime/esm/inferno/mocked/hydrate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return _mocked_hydrate__WEBPACK_IMPORTED_MODULE_7__["hydrate"]; });

/* harmony import */ var _render_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./render_template */ "./node_modules/@devextreme/runtime/esm/inferno/render_template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderTemplate", function() { return _render_template__WEBPACK_IMPORTED_MODULE_8__["renderTemplate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasTemplate", function() { return _render_template__WEBPACK_IMPORTED_MODULE_8__["hasTemplate"]; });












/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/mocked/hydrate.js":
/*!************************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/mocked/hydrate.js ***!
  \************************************************************************/
/*! exports provided: hydrate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return hydrate; });
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared */ "./node_modules/@devextreme/runtime/esm/inferno/mocked/shared.js");


function isSameInnerHTML(dom, innerHTML) {
    const tempdom = document.createElement('i');
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
}
function findLastDOMFromVNode(vNode) {
    let flags;
    let children;
    while (vNode) {
        flags = vNode.flags;
        if (flags & 2033 /* DOMRef */) {
            return vNode.dom;
        }
        children = vNode.children;
        if (flags & 8192 /* Fragment */) {
            vNode = vNode.childFlags === 2 /* HasVNodeChildren */ ? children : children[children.length - 1];
        }
        else if (flags & 4 /* ComponentClass */) {
            vNode = children.$LI;
        }
        else {
            vNode = children;
        }
    }
    return null;
}
function isSamePropsInnerHTML(dom, props) {
    return Boolean(props && props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html && isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
}
function hydrateComponent(vNode, parentDOM, dom, context, isSVG, isClass, lifecycle) {
    const type = vNode.type;
    const ref = vNode.ref;
    const props = vNode.props || inferno__WEBPACK_IMPORTED_MODULE_0__["EMPTY_OBJ"];
    let currentNode;
    if (isClass) {
        const instance = Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_CI"])(vNode, type, props, context, isSVG, lifecycle);
        const input = instance.$LI;
        currentNode = hydrateVNode(input, parentDOM, dom, instance.$CX, isSVG, lifecycle);
        Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_MCCC"])(ref, instance, lifecycle);
    }
    else {
        const input = Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_HI"])(Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_RFC"])(vNode, context));
        currentNode = hydrateVNode(input, parentDOM, dom, context, isSVG, lifecycle);
        vNode.children = input;
        Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_MFCC"])(vNode, lifecycle);
    }
    return currentNode;
}
function hydrateChildren(parentVNode, parentNode, currentNode, context, isSVG, lifecycle) {
    const childFlags = parentVNode.childFlags;
    const children = parentVNode.children;
    const props = parentVNode.props;
    const flags = parentVNode.flags;
    if (childFlags !== 1 /* HasInvalidChildren */) {
        if (childFlags === 2 /* HasVNodeChildren */) {
            if (Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isNull"])(currentNode)) {
                Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_M"])(children, parentNode, context, isSVG, null, lifecycle);
            }
            else {
                currentNode = hydrateVNode(children, parentNode, currentNode, context, isSVG, lifecycle);
                currentNode = currentNode ? currentNode.nextSibling : null;
            }
        }
        else if (childFlags === 16 /* HasTextChildren */) {
            if (Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isNull"])(currentNode)) {
                parentNode.appendChild(document.createTextNode(children));
            }
            else if (parentNode.childNodes.length !== 1 || currentNode.nodeType !== 3) {
                parentNode.textContent = children;
            }
            else if (currentNode.nodeValue !== children) {
                currentNode.nodeValue = children;
            }
            currentNode = null;
        }
        else if (childFlags & 12 /* MultipleChildren */) {
            let prevVNodeIsTextNode = false;
            for (let i = 0, len = children.length; i < len; ++i) {
                const child = children[i];
                if (Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isNull"])(currentNode) || (prevVNodeIsTextNode && (child.flags & 16 /* Text */) > 0)) {
                    Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_M"])(child, parentNode, context, isSVG, currentNode, lifecycle);
                }
                else {
                    currentNode = hydrateVNode(child, parentNode, currentNode, context, isSVG, lifecycle);
                    currentNode = currentNode ? currentNode.nextSibling : null;
                }
                prevVNodeIsTextNode = (child.flags & 16 /* Text */) > 0;
            }
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        if ((flags & 8192 /* Fragment */) === 0) {
            let nextSibling = null;
            while (currentNode) {
                nextSibling = currentNode.nextSibling;
                parentNode.removeChild(currentNode);
                currentNode = nextSibling;
            }
        }
    }
    else if (!Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isNull"])(parentNode.firstChild) && !isSamePropsInnerHTML(parentNode, props)) {
        parentNode.textContent = ''; // dom has content, but VNode has no children remove everything from DOM
        if (flags & 448 /* FormElement */) {
            // If element is form element, we need to clear defaultValue also
            parentNode.defaultValue = '';
        }
    }
}
function hydrateElement(vNode, parentDOM, dom, context, isSVG, lifecycle) {
    const props = vNode.props;
    const className = vNode.className;
    const flags = vNode.flags;
    const ref = vNode.ref;
    isSVG = isSVG || (flags & 32 /* SvgElement */) > 0;
    if (dom.nodeType !== 1) {
        Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_ME"])(vNode, null, context, isSVG, null, lifecycle);
        parentDOM.replaceChild(vNode.dom, dom);
    }
    else {
        vNode.dom = dom;
        hydrateChildren(vNode, dom, dom.firstChild, context, isSVG, lifecycle);
        if (!Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isNull"])(props)) {
            Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_MP"])(vNode, flags, props, dom, isSVG);
        }
        if (Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isNullOrUndef"])(className)) {
            if (dom.className !== '') {
                dom.removeAttribute('class');
            }
        }
        else if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
        Object(inferno__WEBPACK_IMPORTED_MODULE_0__["_MR"])(ref, dom, lifecycle);
    }
    return vNode.dom;
}
function hydrateText(vNode, parentDOM, dom) {
    if (dom.nodeType !== 3) {
        parentDOM.replaceChild((vNode.dom = document.createTextNode(vNode.children)), dom);
    }
    else {
        const text = vNode.children;
        if (dom.nodeValue !== text) {
            dom.nodeValue = text;
        }
        vNode.dom = dom;
    }
    return vNode.dom;
}
function hydrateFragment(vNode, parentDOM, dom, context, isSVG, lifecycle) {
    const children = vNode.children;
    if (vNode.childFlags === 2 /* HasVNodeChildren */) {
        hydrateText(children, parentDOM, dom);
        return children.dom;
    }
    hydrateChildren(vNode, parentDOM, dom, context, isSVG, lifecycle);
    return findLastDOMFromVNode(children[children.length - 1]);
}
function hydrateVNode(vNode, parentDOM, currentDom, context, isSVG, lifecycle) {
    const flags = (vNode.flags |= 16384 /* InUse */);
    if (flags & 14 /* Component */) {
        return hydrateComponent(vNode, parentDOM, currentDom, context, isSVG, (flags & 4 /* ComponentClass */) > 0, lifecycle);
    }
    if (flags & 481 /* Element */) {
        return hydrateElement(vNode, parentDOM, currentDom, context, isSVG, lifecycle);
    }
    if (flags & 16 /* Text */) {
        return hydrateText(vNode, parentDOM, currentDom);
    }
    if (flags & 512 /* Void */) {
        return (vNode.dom = currentDom);
    }
    if (flags & 8192 /* Fragment */) {
        return hydrateFragment(vNode, parentDOM, currentDom, context, isSVG, lifecycle);
    }
    Object(_shared__WEBPACK_IMPORTED_MODULE_1__["throwError"])();
    return null;
}
function hydrate(input, parentDOM, callback) {
    let dom = parentDOM.firstChild;
    if (Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isNull"])(dom)) {
        Object(inferno__WEBPACK_IMPORTED_MODULE_0__["render"])(input, parentDOM, callback);
    }
    else {
        const lifecycle = [];
        if (!Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isInvalid"])(input)) {
            dom = hydrateVNode(input, parentDOM, dom, {}, false, lifecycle);
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom && (dom = dom.nextSibling)) {
            parentDOM.removeChild(dom);
        }
        if (lifecycle.length > 0) {
            let listener;
            while ((listener = lifecycle.shift()) !== undefined) {
                listener();
            }
        }
    }
    parentDOM.$V = input;
    if (Object(_shared__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(callback)) {
        callback();
    }
}


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/mocked/shared.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/mocked/shared.js ***!
  \***********************************************************************/
/*! exports provided: ERROR_MSG, isNullOrUndef, isInvalid, isFunction, isNull, throwError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_MSG", function() { return ERROR_MSG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNullOrUndef", function() { return isNullOrUndef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInvalid", function() { return isInvalid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return throwError; });
const ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
function isNullOrUndef(o) {
    return o === void 0 || o === null;
}
function isInvalid(o) {
    return o === null || o === false || o === true || o === void 0;
}
function isFunction(o) {
    return typeof o === 'function';
}
function isNull(o) {
    return o === null;
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(`Inferno Error: ${message}`);
}


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/portal.js":
/*!****************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/portal.js ***!
  \****************************************************************/
/*! exports provided: Portal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Portal", function() { return Portal; });
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");

const Portal = ({ container, children }) => {
    if (container) {
        return Object(inferno__WEBPACK_IMPORTED_MODULE_0__["createPortal"])(children, container);
    }
    return null;
};


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/re_render_effect.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/re_render_effect.js ***!
  \**************************************************************************/
/*! exports provided: createReRenderEffect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReRenderEffect", function() { return createReRenderEffect; });
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect */ "./node_modules/@devextreme/runtime/esm/inferno/effect.js");


const createReRenderEffect = () => new _effect__WEBPACK_IMPORTED_MODULE_1__["InfernoEffect"](() => {
    Object(inferno__WEBPACK_IMPORTED_MODULE_0__["rerender"])();
}, []);


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/render_template.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/render_template.js ***!
  \*************************************************************************/
/*! exports provided: renderTemplate, hasTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderTemplate", function() { return renderTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTemplate", function() { return hasTemplate; });
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var inferno_create_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inferno-create-element */ "./node_modules/inferno-create-element/dist/index.esm.js");


function renderTemplate(template, props, _component) {
    setTimeout(() => {
        var _a;
        Object(inferno__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(inferno_create_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(template, props), (_a = props.container) === null || _a === void 0 ? void 0 : _a.get(0));
    }, 0);
}
const hasTemplate = (name, properties, _component) => !!properties[name];


/***/ }),

/***/ "./node_modules/@devextreme/runtime/esm/inferno/utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@devextreme/runtime/esm/inferno/utils.js ***!
  \***************************************************************/
/*! exports provided: normalizeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeStyles", function() { return normalizeStyles; });
const NUMBER_STYLES = [
    'animation-iteration-count',
    'border-image-outset',
    'border-image-slice',
    'border-image-width',
    'box-flex',
    'box-flex-group',
    'box-ordinal-group',
    'column-count',
    'fill-opacity',
    'flex',
    'flex-grow',
    'flex-negative',
    'flex-order',
    'flex-positive',
    'flex-shrink',
    'flood-opacity',
    'font-weight',
    'grid-column',
    'grid-row',
    'line-clamp',
    'line-height',
    'opacity',
    'order',
    'orphans',
    'stop-opacity',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'tab-size',
    'widows',
    'z-index',
    'zoom',
];
const uppercasePattern = /[A-Z]/g;
const kebabCase = (str) => str.replace(uppercasePattern, '-$&').toLowerCase();
const isNumeric = (value) => {
    if (typeof value === 'number')
        return true;
    return !isNaN(Number(value));
};
const getNumberStyleValue = (style, value) => (NUMBER_STYLES.indexOf(style) > -1 ? value : `${value}px`);
const normalizeStyles = (styles) => {
    if (!(styles instanceof Object))
        return undefined;
    return Object.keys(styles).reduce((result, key) => {
        const value = styles[key];
        const kebabString = kebabCase(key);
        result[kebabString] = isNumeric(value)
            ? getNumberStyleValue(kebabString, value)
            : value;
        return result;
    }, {});
};


/***/ }),

/***/ "./node_modules/devextreme/esm/core/inferno_renderer.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/inferno_renderer.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var inferno_create_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno-create-element */ "./node_modules/inferno-create-element/dist/index.esm.js");
/* harmony import */ var _dom_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _element_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _utils_dependency_injector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/dependency_injector */ "./node_modules/devextreme/esm/core/utils/dependency_injector.js");
/**
 * DevExtreme (esm/core/inferno_renderer.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var remove = element => {
    var {
        parentNode: parentNode
    } = element;
    if (parentNode) {
        Object(_element_data__WEBPACK_IMPORTED_MODULE_4__["cleanDataRecursive"])(element);
        parentNode.$V = element.$V;
        Object(inferno__WEBPACK_IMPORTED_MODULE_0__["render"])(null, parentNode);
        parentNode.appendChild(element);
        element.innerHTML = "";
        delete parentNode.$V
    }
    delete element.$V
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_dependency_injector__WEBPACK_IMPORTED_MODULE_5__["default"])({
    createElement: (component, props) => Object(inferno_create_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(component, props),
    remove: remove,
    onAfterRender: () => {
        _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].callEffects()
    },
    onPreRender: () => {
        _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_1__["InfernoEffectHost"].lock()
    },
    render: (component, props, container, replace) => {
        if (!replace) {
            var {
                parentNode: parentNode
            } = container;
            var nextNode = null === container || void 0 === container ? void 0 : container.nextSibling;
            var rootNode = _dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div");
            rootNode.appendChild(container);
            var mountNode = _dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].createDocumentFragment().appendChild(rootNode);
            var vNodeAlreadyExists = !!container.$V;
            vNodeAlreadyExists && remove(container);
            Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_1__["hydrate"])(Object(inferno_create_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(component, props), mountNode);
            container.$V = mountNode.$V;
            if (parentNode) {
                parentNode.insertBefore(container, nextNode)
            }
        } else {
            Object(inferno__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(inferno_create_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(component, props), container)
        }
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/core/polyfills/number.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/polyfills/number.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/**
 * DevExtreme (esm/core/polyfills/number.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var number = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_0__["hasWindow"])() ? Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])().Number : Number;
number.isFinite = number.isFinite || function(value) {
    return "number" === typeof value && isFinite(value)
};
/* harmony default export */ __webpack_exports__["default"] = (number);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.scroll.js":
/*!******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/gesture/emitter.gesture.scroll.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/gesture/emitter.gesture */ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.js");
/* harmony import */ var _events_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/core/emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/* harmony import */ var _animation_frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../animation/frame */ "./node_modules/devextreme/esm/animation/frame.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_version__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/version */ "./node_modules/devextreme/esm/core/utils/version.js");
/**
 * DevExtreme (esm/events/gesture/emitter.gesture.scroll.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var abstract = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].abstract;






var realDevice = _core_devices__WEBPACK_IMPORTED_MODULE_6__["default"].real();
var SCROLL_EVENT = "scroll";
var SCROLL_INIT_EVENT = "dxscrollinit";
var SCROLL_START_EVENT = "dxscrollstart";
var SCROLL_MOVE_EVENT = "dxscroll";
var SCROLL_END_EVENT = "dxscrollend";
var SCROLL_STOP_EVENT = "dxscrollstop";
var SCROLL_CANCEL_EVENT = "dxscrollcancel";
var Locker = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].inherit(function() {
    var NAMESPACED_SCROLL_EVENT = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["addNamespace"])(SCROLL_EVENT, "dxScrollEmitter");
    return {
        ctor: function(element) {
            this._element = element;
            this._locked = false;
            this._proxiedScroll = e => {
                if (!this._disposed) {
                    this._scroll(e)
                }
            };
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        },
        _scroll: abstract,
        check: function(e, callback) {
            if (this._locked) {
                callback()
            }
        },
        dispose: function() {
            this._disposed = true;
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        }
    }
}());
var TimeoutLocker = Locker.inherit({
    ctor: function(element, timeout) {
        this.callBase(element);
        this._timeout = timeout
    },
    _scroll: function() {
        this._prepare();
        this._forget()
    },
    _prepare: function() {
        if (this._timer) {
            this._clearTimer()
        }
        this._locked = true
    },
    _clearTimer: function() {
        clearTimeout(this._timer);
        this._locked = false;
        this._timer = null
    },
    _forget: function() {
        var that = this;
        this._timer = setTimeout((function() {
            that._clearTimer()
        }), this._timeout)
    },
    dispose: function() {
        this.callBase();
        this._clearTimer()
    }
});
var WheelLocker = TimeoutLocker.inherit({
    ctor: function(element) {
        this.callBase(element, 400);
        this._lastWheelDirection = null
    },
    check: function(e, callback) {
        this._checkDirectionChanged(e);
        this.callBase(e, callback)
    },
    _checkDirectionChanged: function(e) {
        if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e)) {
            this._lastWheelDirection = null;
            return
        }
        var direction = e.shiftKey || false;
        var directionChange = null !== this._lastWheelDirection && direction !== this._lastWheelDirection;
        this._lastWheelDirection = direction;
        this._locked = this._locked && !directionChange
    }
});
var PointerLocker = TimeoutLocker.inherit({
    ctor: function(element) {
        this.callBase(element, 400)
    }
});
! function() {
    var ios8_greater = realDevice.ios && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_7__["compare"])(realDevice.version, [8]) >= 0;
    var android5_greater = realDevice.android && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_7__["compare"])(realDevice.version, [5]) >= 0;
    if (!(ios8_greater || android5_greater)) {
        return
    }
    PointerLocker = Locker.inherit({
        _scroll: function() {
            this._locked = true;
            var that = this;
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._scrollFrame);
            this._scrollFrame = Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["requestAnimationFrame"])((function() {
                that._locked = false
            }))
        },
        check: function(e, callback) {
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._scrollFrame);
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._checkFrame);
            var that = this;
            var callBase = this.callBase;
            this._checkFrame = Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["requestAnimationFrame"])((function() {
                callBase.call(that, e, callback);
                that._locked = false
            }))
        },
        dispose: function() {
            this.callBase();
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._scrollFrame);
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._checkFrame)
        }
    })
}();
var ScrollEmitter = _events_gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_3__["default"].inherit(function() {
    var FRAME_DURATION = Math.round(1e3 / 60);
    return {
        ctor: function(element) {
            this.callBase.apply(this, arguments);
            this.direction = "both";
            this._pointerLocker = new PointerLocker(element);
            this._wheelLocker = new WheelLocker(element)
        },
        validate: function() {
            return true
        },
        configure: function(data) {
            if (data.scrollTarget) {
                this._pointerLocker.dispose();
                this._wheelLocker.dispose();
                this._pointerLocker = new PointerLocker(data.scrollTarget);
                this._wheelLocker = new WheelLocker(data.scrollTarget)
            }
            this.callBase(data)
        },
        _init: function(e) {
            this._wheelLocker.check(e, function() {
                if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e)) {
                    this._accept(e)
                }
            }.bind(this));
            this._pointerLocker.check(e, function() {
                var skipCheck = this.isNative && Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isMouseEvent"])(e);
                if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e) && !skipCheck) {
                    this._accept(e)
                }
            }.bind(this));
            this._fireEvent(SCROLL_INIT_EVENT, e);
            this._prevEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e)
        },
        move: function(e) {
            this.callBase.apply(this, arguments);
            e.isScrollingEvent = this.isNative || e.isScrollingEvent
        },
        _start: function(e) {
            this._savedEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e);
            this._fireEvent(SCROLL_START_EVENT, e);
            this._prevEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e)
        },
        _move: function(e) {
            var currentEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e);
            this._fireEvent(SCROLL_MOVE_EVENT, e, {
                delta: Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._prevEventData, currentEventData)
            });
            var delta = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._savedEventData, currentEventData);
            if (delta.time > 200) {
                this._savedEventData = this._prevEventData
            }
            this._prevEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e)
        },
        _end: function(e) {
            var endEventDelta = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._prevEventData, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e));
            var velocity = {
                x: 0,
                y: 0
            };
            if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e) && endEventDelta.time < 100) {
                var delta = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._savedEventData, this._prevEventData);
                var velocityMultiplier = FRAME_DURATION / delta.time;
                velocity = {
                    x: delta.x * velocityMultiplier,
                    y: delta.y * velocityMultiplier
                }
            }
            this._fireEvent(SCROLL_END_EVENT, e, {
                velocity: velocity
            })
        },
        _stop: function(e) {
            this._fireEvent(SCROLL_STOP_EVENT, e)
        },
        cancel: function(e) {
            this.callBase.apply(this, arguments);
            this._fireEvent(SCROLL_CANCEL_EVENT, e)
        },
        dispose: function() {
            this.callBase.apply(this, arguments);
            this._pointerLocker.dispose();
            this._wheelLocker.dispose()
        },
        _clearSelection: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        },
        _toggleGestureCover: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        }
    }
}());
Object(_events_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])({
    emitter: ScrollEmitter,
    events: [SCROLL_INIT_EVENT, SCROLL_START_EVENT, SCROLL_MOVE_EVENT, SCROLL_END_EVENT, SCROLL_STOP_EVENT, SCROLL_CANCEL_EVENT]
});
/* harmony default export */ __webpack_exports__["default"] = ({
    init: SCROLL_INIT_EVENT,
    start: SCROLL_START_EVENT,
    move: SCROLL_MOVE_EVENT,
    end: SCROLL_END_EVENT,
    stop: SCROLL_STOP_EVENT,
    cancel: SCROLL_CANCEL_EVENT,
    scroll: SCROLL_EVENT
});


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/common/config_context.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/common/config_context.js ***!
  \*************************************************************************/
/*! exports provided: ConfigContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigContext", function() { return ConfigContext; });
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/**
 * DevExtreme (esm/renovation/common/config_context.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var ConfigContext = Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_0__["createContext"])(void 0);


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/common/config_provider.js":
/*!**************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/common/config_provider.js ***!
  \**************************************************************************/
/*! exports provided: viewFunction, ConfigProviderProps, ConfigProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigProviderProps", function() { return ConfigProviderProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigProvider", function() { return ConfigProvider; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/**
 * DevExtreme (esm/renovation/common/config_provider.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["children", "rtlEnabled"];

var viewFunction = viewModel => viewModel.props.children;
var ConfigProviderProps = {};
class ConfigProvider extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_2__["BaseInfernoComponent"] {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {}
    }
    getChildContext() {
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.context, {
            ConfigContext: this.config
        })
    }
    get config() {
        if (void 0 !== this.__getterCache.config) {
            return this.__getterCache.config
        }
        return this.__getterCache.config = (() => ({
            rtlEnabled: this.props.rtlEnabled
        }))()
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.rtlEnabled !== nextProps.rtlEnabled) {
            this.__getterCache.config = void 0
        }
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props),
            config: this.config,
            restAttributes: this.restAttributes
        })
    }
}
ConfigProvider.defaultProps = ConfigProviderProps;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/component_wrapper/common/component.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/component_wrapper/common/component.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ComponentWrapper; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _events_core_keyboard_processor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../events/core/keyboard_processor */ "./node_modules/devextreme/esm/events/core/keyboard_processor.js");
/* harmony import */ var _core_inferno_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/inferno_renderer */ "./node_modules/devextreme/esm/core/inferno_renderer.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_dom_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/dom_component */ "./node_modules/devextreme/esm/core/dom_component.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _template_wrapper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./template_wrapper */ "./node_modules/devextreme/esm/renovation/component_wrapper/common/template_wrapper.js");
/* harmony import */ var _utils_update_props_immutable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/update_props_immutable */ "./node_modules/devextreme/esm/renovation/component_wrapper/utils/update_props_immutable.js");
/**
 * DevExtreme (esm/renovation/component_wrapper/common/component.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */












var setDefaultOptionValue = (options, defaultValueGetter) => name => {
    if (Object.prototype.hasOwnProperty.call(options, name) && void 0 === options[name]) {
        options[name] = defaultValueGetter(name)
    }
};
class ComponentWrapper extends _core_dom_component__WEBPACK_IMPORTED_MODULE_6__["default"] {
    constructor(element, options) {
        super(element, options);
        this._shouldRaiseContentReady = false;
        this.validateKeyDownHandler()
    }
    get _propsInfo() {
        return {
            allowNull: [],
            twoWay: [],
            elements: [],
            templates: [],
            props: []
        }
    }
    validateKeyDownHandler() {
        var supportedKeyNames = this.getSupportedKeyNames();
        var hasComponentDefaultKeyHandlers = supportedKeyNames.length > 0;
        var hasComponentKeyDownMethod = "function" === typeof this._viewComponent.prototype.keyDown;
        if (hasComponentDefaultKeyHandlers && !hasComponentKeyDownMethod) {
            throw Error("Component's declaration must have 'keyDown' method.")
        }
    }
    get viewRef() {
        var _this$_viewRef;
        return null === (_this$_viewRef = this._viewRef) || void 0 === _this$_viewRef ? void 0 : _this$_viewRef.current
    }
    _checkContentReadyOption(fullName) {
        var contentReadyOptions = this._getContentReadyOptions().reduce((options, name) => {
            options[name] = true;
            return options
        }, {});
        this._checkContentReadyOption = optionName => !!contentReadyOptions[optionName];
        return this._checkContentReadyOption(fullName)
    }
    _getContentReadyOptions() {
        return ["rtlEnabled"]
    }
    _fireContentReady() {
        this._actionsMap.onContentReady({})
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(true, super._getDefaultOptions(), this._viewComponent.defaultProps, this._propsInfo.twoWay.reduce((options, _ref) => {
            var [name, defaultName, eventName] = _ref;
            return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
                [name]: this._viewComponent.defaultProps[defaultName],
                [eventName]: value => this.option(name, value)
            })
        }, {}), this._propsInfo.templates.reduce((options, name) => Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
            [name]: null
        }), {}))
    }
    _initializeComponent() {
        var _this$_templateManage;
        super._initializeComponent();
        null === (_this$_templateManage = this._templateManager) || void 0 === _this$_templateManage ? void 0 : _this$_templateManage.addDefaultTemplates(this.getDefaultTemplates());
        this._props = this._optionsWithDefaultTemplates(this.option());
        this._propsInfo.templates.forEach(template => {
            this._componentTemplates[template] = this._createTemplateComponent(this._props[template])
        });
        Object.keys(this._getActionConfigsFull()).forEach(name => this._addAction(name));
        this._viewRef = Object(inferno__WEBPACK_IMPORTED_MODULE_1__["createRef"])();
        this.defaultKeyHandlers = this._createDefaultKeyHandlers()
    }
    _initMarkup() {
        var props = this.getProps();
        this._renderWrapper(props)
    }
    _renderWrapper(props) {
        var containerNode = this.$element()[0];
        if (!this._isNodeReplaced) {
            _core_inferno_renderer__WEBPACK_IMPORTED_MODULE_3__["default"].onPreRender()
        }
        _core_inferno_renderer__WEBPACK_IMPORTED_MODULE_3__["default"].render(this._viewComponent, props, containerNode, this._isNodeReplaced);
        if (!this._isNodeReplaced) {
            this._isNodeReplaced = true;
            _core_inferno_renderer__WEBPACK_IMPORTED_MODULE_3__["default"].onAfterRender();
            this._shouldRaiseContentReady = true
        }
        if (this._shouldRaiseContentReady) {
            this._fireContentReady();
            this._shouldRaiseContentReady = false
        }
    }
    _silent(name, value) {
        this._options.silent(name, value)
    }
    _render() {}
    _removeWidget() {
        _core_inferno_renderer__WEBPACK_IMPORTED_MODULE_3__["default"].remove(this.$element()[0])
    }
    _dispose() {
        this._removeWidget();
        super._dispose()
    }
    get elementAttr() {
        if (!this._elementAttr) {
            var {
                attributes: attributes
            } = this.$element()[0];
            var attrs = Array.from(attributes).filter(attr => {
                var _attributes$attr$name;
                return !this._propsInfo.templates.includes(attr.name) && (null === (_attributes$attr$name = attributes[attr.name]) || void 0 === _attributes$attr$name ? void 0 : _attributes$attr$name.specified)
            }).reduce((result, _ref2) => {
                var {
                    name: name,
                    value: value
                } = _ref2;
                var updatedAttributes = result;
                updatedAttributes[name] = value;
                return updatedAttributes
            }, {});
            this._elementAttr = attrs;
            this._storedClasses = this.$element()[0].getAttribute("class") || ""
        }
        var elemStyle = this.$element()[0].style;
        var style = {};
        for (var i = 0; i < elemStyle.length; i += 1) {
            style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i])
        }
        this._elementAttr.style = style;
        this._elementAttr.class = this._storedClasses;
        return this._elementAttr
    }
    _getAdditionalActionConfigs() {
        return {
            onContentReady: {
                excludeValidators: ["disabled", "readOnly"]
            }
        }
    }
    _getAdditionalProps() {
        return []
    }
    _patchOptionValues(options) {
        var {
            allowNull: allowNull,
            elements: elements,
            props: props,
            twoWay: twoWay
        } = this._propsInfo;
        var {
            defaultProps: defaultProps
        } = this._viewComponent;
        var {
            children: children,
            onKeyboardHandled: onKeyboardHandled,
            ref: ref
        } = options;
        var onKeyDown = onKeyboardHandled ? (_, event_options) => {
            onKeyboardHandled(event_options)
        } : void 0;
        var widgetProps = {
            ref: ref,
            children: children,
            onKeyDown: onKeyDown
        };
        [...props, ...this._getAdditionalProps()].forEach(propName => {
            if (Object.prototype.hasOwnProperty.call(options, propName)) {
                widgetProps[propName] = options[propName]
            }
        });
        allowNull.forEach(setDefaultOptionValue(widgetProps, () => null));
        Object.keys(defaultProps).forEach(setDefaultOptionValue(widgetProps, name => defaultProps[name]));
        twoWay.forEach(_ref3 => {
            var [name, defaultName] = _ref3;
            setDefaultOptionValue(widgetProps, () => defaultProps[defaultName])(name)
        });
        elements.forEach(name => {
            if (name in widgetProps) {
                var value = widgetProps[name];
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isRenderer"])(value)) {
                    widgetProps[name] = this._patchElementParam(value)
                }
            }
        });
        return widgetProps
    }
    getSupportedKeyNames() {
        return []
    }
    prepareStyleProp(props) {
        if ("string" === typeof props.style) {
            return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
                style: {},
                cssText: props.style
            })
        }
        return props
    }
    getProps() {
        var _this$elementAttr$cla, _elementAttr$class;
        var {
            elementAttr: elementAttr
        } = this.option();
        var options = this._patchOptionValues(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this._props, {
            ref: this._viewRef,
            children: this._extractDefaultSlot(),
            aria: this._aria
        }));
        this._propsInfo.templates.forEach(template => {
            options[template] = this._componentTemplates[template]
        });
        return this.prepareStyleProp(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, this.elementAttr, elementAttr, {
            className: [...(null !== (_this$elementAttr$cla = this.elementAttr.class) && void 0 !== _this$elementAttr$cla ? _this$elementAttr$cla : "").split(" "), ...(null !== (_elementAttr$class = null === elementAttr || void 0 === elementAttr ? void 0 : elementAttr.class) && void 0 !== _elementAttr$class ? _elementAttr$class : "").split(" ")].filter((c, i, a) => c && a.indexOf(c) === i).join(" ").trim(),
            class: ""
        }, this._actionsMap))
    }
    _getActionConfigs() {
        return {}
    }
    _getActionConfigsFull() {
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this._getActionConfigs(), this._getAdditionalActionConfigs())
    }
    getDefaultTemplates() {
        var defaultTemplates = Object.values(this._templatesInfo);
        var result = {};
        defaultTemplates.forEach(template => {
            result[template] = "dx-renovation-template-mock"
        });
        return result
    }
    get _templatesInfo() {
        return {}
    }
    _optionsWithDefaultTemplates(options) {
        var templateOptions = Object.entries(this._templatesInfo).reduce((result, _ref4) => {
            var _options$templateName;
            var [templateName, templateValue] = _ref4;
            return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, result, {
                [templateName]: null !== (_options$templateName = options[templateName]) && void 0 !== _options$templateName ? _options$templateName : templateValue
            })
        }, {});
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, templateOptions)
    }
    _init() {
        super._init();
        this.customKeyHandlers = {};
        this._actionsMap = {};
        this._aria = {};
        this._componentTemplates = {}
    }
    _createDefaultKeyHandlers() {
        var result = {};
        var keys = this.getSupportedKeyNames();
        keys.forEach(key => {
            result[key] = e => this.viewRef.keyDown(_events_core_keyboard_processor__WEBPACK_IMPORTED_MODULE_2__["default"].createKeyDownOptions(e))
        });
        return result
    }
    _addAction(event, actionToAdd) {
        var action = actionToAdd;
        if (!action) {
            var actionByOption = this._createActionByOption(event, this._getActionConfigsFull()[event]);
            action = actArgs => {
                Object.keys(actArgs).forEach(name => {
                    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(actArgs[name]) && _core_dom_adapter__WEBPACK_IMPORTED_MODULE_5__["default"].isNode(actArgs[name])) {
                        actArgs[name] = Object(_core_element__WEBPACK_IMPORTED_MODULE_8__["getPublicElement"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(actArgs[name]))
                    }
                });
                return actionByOption(actArgs)
            }
        }
        this._actionsMap[event] = action
    }
    _optionChanged(option) {
        var {
            fullName: fullName,
            name: name,
            previousValue: previousValue,
            value: value
        } = option;
        Object(_utils_update_props_immutable__WEBPACK_IMPORTED_MODULE_11__["updatePropsImmutable"])(this._props, this.option(), name, fullName);
        if (this._propsInfo.templates.includes(name) && value !== previousValue) {
            this._componentTemplates[name] = this._createTemplateComponent(value)
        }
        if (name && this._getActionConfigsFull()[name]) {
            this._addAction(name)
        }
        this._shouldRaiseContentReady = this._shouldRaiseContentReady || this._checkContentReadyOption(fullName);
        super._optionChanged(option);
        this._invalidate()
    }
    _extractDefaultSlot() {
        if (this.option("_hasAnonymousTemplateContent")) {
            return _core_inferno_renderer__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(_template_wrapper__WEBPACK_IMPORTED_MODULE_10__["TemplateWrapper"], {
                template: this._getTemplate(this._templateManager.anonymousTemplateName),
                transclude: true
            })
        }
        return null
    }
    _createTemplateComponent(templateOption) {
        if (!templateOption) {
            return
        }
        var template = this._getTemplate(templateOption);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isString"])(template) && "dx-renovation-template-mock" === template) {
            return
        }
        return model => _core_inferno_renderer__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(_template_wrapper__WEBPACK_IMPORTED_MODULE_10__["TemplateWrapper"], {
            template: template,
            model: model
        })
    }
    _wrapKeyDownHandler(initialHandler) {
        return options => {
            var {
                keyName: keyName,
                originalEvent: originalEvent,
                which: which
            } = options;
            var keys = this.customKeyHandlers;
            var func = keys[keyName] || keys[which];
            if (void 0 !== func) {
                var handler = func.bind(this);
                var result = handler(originalEvent, options);
                if (!result) {
                    originalEvent.cancel = true;
                    return originalEvent
                }
            }
            return null === initialHandler || void 0 === initialHandler ? void 0 : initialHandler(originalEvent, options)
        }
    }
    _toPublicElement(element) {
        return Object(_core_element__WEBPACK_IMPORTED_MODULE_8__["getPublicElement"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(element))
    }
    _patchElementParam(value) {
        try {
            var result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(value);
            var element = null === result || void 0 === result ? void 0 : result.get(0);
            return null !== element && void 0 !== element && element.nodeType ? element : value
        } catch (error) {
            return value
        }
    }
    repaint() {
        this._isNodeReplaced = false;
        this._shouldRaiseContentReady = true;
        this._removeWidget();
        this._refresh()
    }
    _supportedKeys() {
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.defaultKeyHandlers, this.customKeyHandlers)
    }
    registerKeyHandler(key, handler) {
        this.customKeyHandlers[key] = handler
    }
    setAria(name, value) {
        this._aria[name] = value;
        this._initMarkup()
    }
}
ComponentWrapper.IS_RENOVATED_WIDGET = false;
ComponentWrapper.IS_RENOVATED_WIDGET = true;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/component_wrapper/common/template_wrapper.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/component_wrapper/common/template_wrapper.js ***!
  \*********************************************************************************************/
/*! exports provided: TemplateWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateWrapper", function() { return TemplateWrapper; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _utils_shallow_equals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/shallow_equals */ "./node_modules/devextreme/esm/renovation/utils/shallow_equals.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/utils */ "./node_modules/devextreme/esm/renovation/component_wrapper/utils/utils.js");
/* harmony import */ var _core_polyfills_number__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core/polyfills/number */ "./node_modules/devextreme/esm/core/polyfills/number.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/renovation/component_wrapper/common/template_wrapper.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */











class TemplateWrapper extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_1__["InfernoComponent"] {
    constructor(props) {
        super(props);
        this.renderTemplate = this.renderTemplate.bind(this)
    }
    renderTemplate() {
        var _this$props$model;
        var node = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["findDOMfromVNode"])(this.$LI, true);
        var parentNode = node.parentNode;
        var $parent = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(parentNode);
        var $children = $parent.contents();
        var {
            data: data,
            index: index
        } = null !== (_this$props$model = this.props.model) && void 0 !== _this$props$model ? _this$props$model : {
            data: {}
        };
        if (data) {
            Object.keys(data).forEach(name => {
                if (data[name] && _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].isNode(data[name])) {
                    data[name] = Object(_core_element__WEBPACK_IMPORTED_MODULE_7__["getPublicElement"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(data[name]))
                }
            })
        }
        var $result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(this.props.template.render(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
            container: Object(_core_element__WEBPACK_IMPORTED_MODULE_7__["getPublicElement"])($parent),
            transclude: this.props.transclude
        }, !this.props.transclude ? {
            model: data
        } : {}, !this.props.transclude && _core_polyfills_number__WEBPACK_IMPORTED_MODULE_9__["default"].isFinite(index) ? {
            index: index
        } : {})));
        Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_4__["replaceWith"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(node), $result);
        return () => {
            Object(_utils_utils__WEBPACK_IMPORTED_MODULE_8__["removeDifferentElements"])($children, $parent.contents());
            parentNode.appendChild(node)
        }
    }
    shouldComponentUpdate(nextProps) {
        var {
            model: model,
            template: template
        } = this.props;
        var {
            model: nextModel,
            template: nextTemplate
        } = nextProps;
        var sameTemplate = template === nextTemplate;
        if (!sameTemplate) {
            return true
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isDefined"])(model) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isDefined"])(nextModel)) {
            var {
                data: data,
                index: index
            } = model;
            var {
                data: nextData,
                index: nextIndex
            } = nextModel;
            return index !== nextIndex || !Object(_utils_shallow_equals__WEBPACK_IMPORTED_MODULE_3__["shallowEquals"])(data, nextData)
        }
        var sameModel = model === nextModel;
        return !sameModel
    }
    createEffects() {
        return [new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_1__["InfernoEffect"](this.renderTemplate, [this.props.template, this.props.model])]
    }
    updateEffects() {
        this._effects[0].update([this.props.template, this.props.model])
    }
    componentWillUnmount() {}
    render() {
        return null
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/component_wrapper/utils/update_props_immutable.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/component_wrapper/utils/update_props_immutable.js ***!
  \**************************************************************************************************/
/*! exports provided: updatePropsImmutable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePropsImmutable", function() { return updatePropsImmutable; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/**
 * DevExtreme (esm/renovation/component_wrapper/utils/update_props_immutable.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




function cloneObjectValue(value) {
    return Array.isArray(value) ? [...value] : Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, value)
}

function cloneObjectProp(value, prevValue, fullNameParts) {
    var result = fullNameParts.length > 0 && prevValue && value !== prevValue ? cloneObjectValue(prevValue) : cloneObjectValue(value);
    var name = fullNameParts[0];
    if (fullNameParts.length > 1) {
        result[name] = cloneObjectProp(value[name], null === prevValue || void 0 === prevValue ? void 0 : prevValue[name], fullNameParts.slice(1))
    } else if (name) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(value[name])) {
            result[name] = cloneObjectValue(value[name])
        } else {
            result[name] = value[name]
        }
    }
    return result
}
function updatePropsImmutable(props, option, name, fullName) {
    var currentPropsValue = option[name];
    var prevPropsValue = props[name];
    var result = props;
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(currentPropsValue) || name !== fullName && Array.isArray(currentPropsValue)) {
        result[name] = cloneObjectProp(currentPropsValue, prevPropsValue, Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_2__["getPathParts"])(fullName).slice(1))
    } else {
        result[name] = currentPropsValue
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/component_wrapper/utils/utils.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/component_wrapper/utils/utils.js ***!
  \*********************************************************************************/
/*! exports provided: removeDifferentElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDifferentElements", function() { return removeDifferentElements; });
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/**
 * DevExtreme (esm/renovation/component_wrapper/utils/utils.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var removeDifferentElements = ($children, $newChildren) => {
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__["each"])($newChildren, (__, element) => {
        var hasComponent = false;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__["each"])($children, (_, oldElement) => {
            if (element === oldElement) {
                hasComponent = true
            }
        });
        if (!hasComponent && element.parentNode) {
            element.parentNode.removeChild(element)
        }
    })
};


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/common/base_props.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/common/base_props.js ***!
  \************************************************************************/
/*! exports provided: BaseWidgetProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseWidgetProps", function() { return BaseWidgetProps; });
/**
 * DevExtreme (esm/renovation/ui/common/base_props.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var BaseWidgetProps = {
    className: "",
    activeStateEnabled: false,
    disabled: false,
    focusStateEnabled: false,
    hoverStateEnabled: false,
    rtlEnabled: false,
    tabIndex: 0,
    visible: true
};


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/common/widget.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/common/widget.js ***!
  \********************************************************************/
/*! exports provided: viewFunction, WidgetProps, Widget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetProps", function() { return WidgetProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Widget", function() { return Widget; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _events_hover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../events/hover */ "./node_modules/devextreme/esm/events/hover.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _events_short__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../events/short */ "./node_modules/devextreme/esm/events/short.js");
/* harmony import */ var _utils_subscribe_to_event__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/subscribe_to_event */ "./node_modules/devextreme/esm/renovation/utils/subscribe_to_event.js");
/* harmony import */ var _utils_combine_classes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/combine_classes */ "./node_modules/devextreme/esm/renovation/utils/combine_classes.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../core/utils/style */ "./node_modules/devextreme/esm/core/utils/style.js");
/* harmony import */ var _base_props__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./base_props */ "./node_modules/devextreme/esm/renovation/ui/common/base_props.js");
/* harmony import */ var _common_config_context__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/config_context */ "./node_modules/devextreme/esm/renovation/common/config_context.js");
/* harmony import */ var _common_config_provider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../common/config_provider */ "./node_modules/devextreme/esm/renovation/common/config_provider.js");
/* harmony import */ var _utils_resolve_rtl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/resolve_rtl */ "./node_modules/devextreme/esm/renovation/utils/resolve_rtl.js");
/* harmony import */ var _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../core/utils/resize_callbacks */ "./node_modules/devextreme/esm/core/utils/resize_callbacks.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/**
 * DevExtreme (esm/renovation/ui/common/widget.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "addWidgetClass", "aria", "children", "className", "classes", "cssText", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onRootElementRendered", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];

















var DEFAULT_FEEDBACK_HIDE_TIMEOUT = 400;
var DEFAULT_FEEDBACK_SHOW_TIMEOUT = 30;
var getAria = args => Object.keys(args).reduce((r, key) => {
    if (args[key]) {
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, r, {
            ["role" === key || "id" === key ? key : "aria-".concat(key)]: String(args[key])
        })
    }
    return r
}, {});
var viewFunction = viewModel => {
    var widget = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "div", viewModel.cssClasses, viewModel.props.children, 0, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, viewModel.attributes, {
        tabIndex: viewModel.tabIndex,
        title: viewModel.props.hint,
        style: Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["normalizeStyles"])(viewModel.styles)
    }), null, viewModel.widgetElementRef));
    return viewModel.shouldRenderConfigProvider ? Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _common_config_provider__WEBPACK_IMPORTED_MODULE_14__["ConfigProvider"], {
        rtlEnabled: viewModel.rtlEnabled,
        children: widget
    }) : widget
};
var WidgetProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(_base_props__WEBPACK_IMPORTED_MODULE_12__["BaseWidgetProps"]), Object.getOwnPropertyDescriptors({
    _feedbackHideTimeout: DEFAULT_FEEDBACK_HIDE_TIMEOUT,
    _feedbackShowTimeout: DEFAULT_FEEDBACK_SHOW_TIMEOUT,
    cssText: "",
    get aria() {
        return {}
    },
    classes: "",
    name: "",
    addWidgetClass: true
})));


class Widget extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoWrapperComponent"] {
    constructor(props) {
        super(props);
        this.widgetElementRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.state = {
            active: false,
            focused: false,
            hovered: false
        };
        this.setRootElementRef = this.setRootElementRef.bind(this);
        this.activeEffect = this.activeEffect.bind(this);
        this.inactiveEffect = this.inactiveEffect.bind(this);
        this.clickEffect = this.clickEffect.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.focusInEffect = this.focusInEffect.bind(this);
        this.focusOutEffect = this.focusOutEffect.bind(this);
        this.hoverStartEffect = this.hoverStartEffect.bind(this);
        this.hoverEndEffect = this.hoverEndEffect.bind(this);
        this.keyboardEffect = this.keyboardEffect.bind(this);
        this.resizeEffect = this.resizeEffect.bind(this);
        this.windowResizeEffect = this.windowResizeEffect.bind(this);
        this.visibilityEffect = this.visibilityEffect.bind(this);
        this.checkDeprecation = this.checkDeprecation.bind(this);
        this.applyCssTextEffect = this.applyCssTextEffect.bind(this)
    }
    get config() {
        if ("ConfigContext" in this.context) {
            return this.context.ConfigContext
        }
        return _common_config_context__WEBPACK_IMPORTED_MODULE_13__["ConfigContext"]
    }
    createEffects() {
        return [new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.setRootElementRef, []), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.activeEffect, [this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.inactiveEffect, [this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.clickEffect, [this.props.disabled, this.props.name, this.props.onClick]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.focusInEffect, [this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.focusOutEffect, [this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.hoverStartEffect, [this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.hoverEndEffect, [this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.keyboardEffect, [this.props.focusStateEnabled, this.props.onKeyDown]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.resizeEffect, [this.props.name, this.props.onDimensionChanged]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.windowResizeEffect, [this.props.onDimensionChanged]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.visibilityEffect, [this.props.name, this.props.onVisibilityChange]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.checkDeprecation, [this.props.height, this.props.width]), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.applyCssTextEffect, [this.props.cssText]), Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["createReRenderEffect"])()]
    }
    updateEffects() {
        var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11, _this$_effects$12, _this$_effects$13;
        null === (_this$_effects$ = this._effects[1]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]);
        null === (_this$_effects$2 = this._effects[2]) || void 0 === _this$_effects$2 ? void 0 : _this$_effects$2.update([this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]);
        null === (_this$_effects$3 = this._effects[3]) || void 0 === _this$_effects$3 ? void 0 : _this$_effects$3.update([this.props.disabled, this.props.name, this.props.onClick]);
        null === (_this$_effects$4 = this._effects[4]) || void 0 === _this$_effects$4 ? void 0 : _this$_effects$4.update([this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]);
        null === (_this$_effects$5 = this._effects[5]) || void 0 === _this$_effects$5 ? void 0 : _this$_effects$5.update([this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]);
        null === (_this$_effects$6 = this._effects[6]) || void 0 === _this$_effects$6 ? void 0 : _this$_effects$6.update([this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]);
        null === (_this$_effects$7 = this._effects[7]) || void 0 === _this$_effects$7 ? void 0 : _this$_effects$7.update([this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]);
        null === (_this$_effects$8 = this._effects[8]) || void 0 === _this$_effects$8 ? void 0 : _this$_effects$8.update([this.props.focusStateEnabled, this.props.onKeyDown]);
        null === (_this$_effects$9 = this._effects[9]) || void 0 === _this$_effects$9 ? void 0 : _this$_effects$9.update([this.props.name, this.props.onDimensionChanged]);
        null === (_this$_effects$10 = this._effects[10]) || void 0 === _this$_effects$10 ? void 0 : _this$_effects$10.update([this.props.onDimensionChanged]);
        null === (_this$_effects$11 = this._effects[11]) || void 0 === _this$_effects$11 ? void 0 : _this$_effects$11.update([this.props.name, this.props.onVisibilityChange]);
        null === (_this$_effects$12 = this._effects[12]) || void 0 === _this$_effects$12 ? void 0 : _this$_effects$12.update([this.props.height, this.props.width]);
        null === (_this$_effects$13 = this._effects[13]) || void 0 === _this$_effects$13 ? void 0 : _this$_effects$13.update([this.props.cssText])
    }
    setRootElementRef() {
        var {
            onRootElementRendered: onRootElementRendered,
            rootElementRef: rootElementRef
        } = this.props;
        if (rootElementRef) {
            rootElementRef.current = this.widgetElementRef.current
        }
        null === onRootElementRendered || void 0 === onRootElementRendered ? void 0 : onRootElementRendered(this.widgetElementRef.current)
    }
    activeEffect() {
        var {
            _feedbackShowTimeout: _feedbackShowTimeout,
            activeStateEnabled: activeStateEnabled,
            activeStateUnit: activeStateUnit,
            disabled: disabled,
            onActive: onActive
        } = this.props;
        var selector = activeStateUnit;
        if (activeStateEnabled) {
            if (!disabled) {
                return Object(_utils_subscribe_to_event__WEBPACK_IMPORTED_MODULE_8__["subscribeToDxActiveEvent"])(this.widgetElementRef.current, event => {
                    this.setState(__state_argument => ({
                        active: true
                    }));
                    null === onActive || void 0 === onActive ? void 0 : onActive(event)
                }, {
                    timeout: _feedbackShowTimeout,
                    selector: selector
                }, "UIFeedback")
            }
        }
        return
    }
    inactiveEffect() {
        var {
            _feedbackHideTimeout: _feedbackHideTimeout,
            activeStateEnabled: activeStateEnabled,
            activeStateUnit: activeStateUnit,
            onInactive: onInactive
        } = this.props;
        var selector = activeStateUnit;
        if (activeStateEnabled) {
            return Object(_utils_subscribe_to_event__WEBPACK_IMPORTED_MODULE_8__["subscribeToDxInactiveEvent"])(this.widgetElementRef.current, event => {
                if (this.state.active) {
                    this.setState(__state_argument => ({
                        active: false
                    }));
                    null === onInactive || void 0 === onInactive ? void 0 : onInactive(event)
                }
            }, {
                timeout: _feedbackHideTimeout,
                selector: selector
            }, "UIFeedback")
        }
        return
    }
    clickEffect() {
        var {
            disabled: disabled,
            name: name,
            onClick: onClick
        } = this.props;
        var namespace = name;
        if (onClick && !disabled) {
            _events_short__WEBPACK_IMPORTED_MODULE_7__["dxClick"].on(this.widgetElementRef.current, onClick, {
                namespace: namespace
            });
            return () => _events_short__WEBPACK_IMPORTED_MODULE_7__["dxClick"].off(this.widgetElementRef.current, {
                namespace: namespace
            })
        }
        return
    }
    focusInEffect() {
        var {
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            name: name,
            onFocusIn: onFocusIn
        } = this.props;
        var namespace = "".concat(name, "Focus");
        if (focusStateEnabled) {
            if (!disabled) {
                return Object(_utils_subscribe_to_event__WEBPACK_IMPORTED_MODULE_8__["subscribeToDxFocusInEvent"])(this.widgetElementRef.current, event => {
                    if (!event.isDefaultPrevented()) {
                        this.setState(__state_argument => ({
                            focused: true
                        }));
                        null === onFocusIn || void 0 === onFocusIn ? void 0 : onFocusIn(event)
                    }
                }, null, namespace)
            }
        }
        return
    }
    focusOutEffect() {
        var {
            focusStateEnabled: focusStateEnabled,
            name: name,
            onFocusOut: onFocusOut
        } = this.props;
        var namespace = "".concat(name, "Focus");
        if (focusStateEnabled) {
            return Object(_utils_subscribe_to_event__WEBPACK_IMPORTED_MODULE_8__["subscribeToDxFocusOutEvent"])(this.widgetElementRef.current, event => {
                if (!event.isDefaultPrevented() && this.state.focused) {
                    this.setState(__state_argument => ({
                        focused: false
                    }));
                    null === onFocusOut || void 0 === onFocusOut ? void 0 : onFocusOut(event)
                }
            }, null, namespace)
        }
        return
    }
    hoverStartEffect() {
        var {
            activeStateUnit: activeStateUnit,
            disabled: disabled,
            hoverStateEnabled: hoverStateEnabled,
            onHoverStart: onHoverStart
        } = this.props;
        var selector = activeStateUnit;
        if (hoverStateEnabled) {
            if (!disabled) {
                return Object(_utils_subscribe_to_event__WEBPACK_IMPORTED_MODULE_8__["subscribeToDxHoverStartEvent"])(this.widgetElementRef.current, event => {
                    !this.state.active && this.setState(__state_argument => ({
                        hovered: true
                    }));
                    null === onHoverStart || void 0 === onHoverStart ? void 0 : onHoverStart(event)
                }, {
                    selector: selector
                }, "UIFeedback")
            }
        }
        return
    }
    hoverEndEffect() {
        var {
            activeStateUnit: activeStateUnit,
            hoverStateEnabled: hoverStateEnabled,
            onHoverEnd: onHoverEnd
        } = this.props;
        var selector = activeStateUnit;
        if (hoverStateEnabled) {
            return Object(_utils_subscribe_to_event__WEBPACK_IMPORTED_MODULE_8__["subscribeToDxHoverEndEvent"])(this.widgetElementRef.current, event => {
                if (this.state.hovered) {
                    this.setState(__state_argument => ({
                        hovered: false
                    }));
                    null === onHoverEnd || void 0 === onHoverEnd ? void 0 : onHoverEnd(event)
                }
            }, {
                selector: selector
            }, "UIFeedback")
        }
        return
    }
    keyboardEffect() {
        var {
            focusStateEnabled: focusStateEnabled,
            onKeyDown: onKeyDown
        } = this.props;
        if (focusStateEnabled && onKeyDown) {
            var id = _events_short__WEBPACK_IMPORTED_MODULE_7__["keyboard"].on(this.widgetElementRef.current, this.widgetElementRef.current, e => onKeyDown(e));
            return () => _events_short__WEBPACK_IMPORTED_MODULE_7__["keyboard"].off(id)
        }
        return
    }
    resizeEffect() {
        var namespace = "".concat(this.props.name, "VisibilityChange");
        var {
            onDimensionChanged: onDimensionChanged
        } = this.props;
        if (onDimensionChanged) {
            _events_short__WEBPACK_IMPORTED_MODULE_7__["resize"].on(this.widgetElementRef.current, onDimensionChanged, {
                namespace: namespace
            });
            return () => _events_short__WEBPACK_IMPORTED_MODULE_7__["resize"].off(this.widgetElementRef.current, {
                namespace: namespace
            })
        }
        return
    }
    windowResizeEffect() {
        var {
            onDimensionChanged: onDimensionChanged
        } = this.props;
        if (onDimensionChanged) {
            _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_16__["default"].add(onDimensionChanged);
            return () => {
                _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_16__["default"].remove(onDimensionChanged)
            }
        }
        return
    }
    visibilityEffect() {
        var {
            name: name,
            onVisibilityChange: onVisibilityChange
        } = this.props;
        var namespace = "".concat(name, "VisibilityChange");
        if (onVisibilityChange) {
            _events_short__WEBPACK_IMPORTED_MODULE_7__["visibility"].on(this.widgetElementRef.current, () => onVisibilityChange(true), () => onVisibilityChange(false), {
                namespace: namespace
            });
            return () => _events_short__WEBPACK_IMPORTED_MODULE_7__["visibility"].off(this.widgetElementRef.current, {
                namespace: namespace
            })
        }
        return
    }
    checkDeprecation() {
        var {
            height: height,
            width: width
        } = this.props;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isFunction"])(width)) {
            _core_errors__WEBPACK_IMPORTED_MODULE_17__["default"].log("W0017", "width")
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isFunction"])(height)) {
            _core_errors__WEBPACK_IMPORTED_MODULE_17__["default"].log("W0017", "height")
        }
    }
    applyCssTextEffect() {
        var {
            cssText: cssText
        } = this.props;
        if ("" !== cssText) {
            this.widgetElementRef.current.style.cssText = cssText
        }
    }
    get shouldRenderConfigProvider() {
        var {
            rtlEnabled: rtlEnabled
        } = this.props;
        return Object(_utils_resolve_rtl__WEBPACK_IMPORTED_MODULE_15__["resolveRtlEnabledDefinition"])(rtlEnabled, this.config)
    }
    get rtlEnabled() {
        var {
            rtlEnabled: rtlEnabled
        } = this.props;
        return Object(_utils_resolve_rtl__WEBPACK_IMPORTED_MODULE_15__["resolveRtlEnabled"])(rtlEnabled, this.config)
    }
    get attributes() {
        var {
            aria: aria,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            visible: visible
        } = this.props;
        var accessKey = focusStateEnabled && !disabled && this.props.accessKey;
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_10__["extend"])({}, this.restAttributes, accessKey && {
            accessKey: accessKey
        }), getAria(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, aria, {
            disabled: disabled,
            hidden: !visible
        })))
    }
    get styles() {
        var {
            height: height,
            width: width
        } = this.props;
        var style = this.restAttributes.style || {};
        var computedWidth = Object(_core_utils_style__WEBPACK_IMPORTED_MODULE_11__["normalizeStyleProp"])("width", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isFunction"])(width) ? width() : width);
        var computedHeight = Object(_core_utils_style__WEBPACK_IMPORTED_MODULE_11__["normalizeStyleProp"])("height", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isFunction"])(height) ? height() : height);
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, style, {
            height: null !== computedHeight && void 0 !== computedHeight ? computedHeight : style.height,
            width: null !== computedWidth && void 0 !== computedWidth ? computedWidth : style.width
        })
    }
    get cssClasses() {
        var {
            activeStateEnabled: activeStateEnabled,
            addWidgetClass: addWidgetClass,
            className: className,
            classes: classes,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            hoverStateEnabled: hoverStateEnabled,
            onVisibilityChange: onVisibilityChange,
            visible: visible
        } = this.props;
        var isFocusable = !!focusStateEnabled && !disabled;
        var isHoverable = !!hoverStateEnabled && !disabled;
        var canBeActive = !!activeStateEnabled && !disabled;
        var classesMap = {
            "dx-widget": !!addWidgetClass,
            [String(classes)]: !!classes,
            [String(className)]: !!className,
            "dx-state-disabled": !!disabled,
            "dx-state-invisible": !visible,
            "dx-state-focused": !!this.state.focused && isFocusable,
            "dx-state-active": !!this.state.active && canBeActive,
            "dx-state-hover": !!this.state.hovered && isHoverable && !this.state.active,
            "dx-rtl": !!this.rtlEnabled,
            "dx-visibility-change-handler": !!onVisibilityChange
        };
        return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_9__["combineClasses"])(classesMap)
    }
    get tabIndex() {
        var {
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            tabIndex: tabIndex
        } = this.props;
        var isFocusable = focusStateEnabled && !disabled;
        return isFocusable ? tabIndex : void 0
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, _excluded);
        return restProps
    }
    focus() {
        _events_short__WEBPACK_IMPORTED_MODULE_7__["focus"].trigger(this.widgetElementRef.current)
    }
    blur() {
        var activeElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_18__["default"].getActiveElement();
        if (this.widgetElementRef.current === activeElement) {
            activeElement.blur()
        }
    }
    activate() {
        this.setState(__state_argument => ({
            active: true
        }))
    }
    deactivate() {
        this.setState(__state_argument => ({
            active: false
        }))
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props),
            active: this.state.active,
            focused: this.state.focused,
            hovered: this.state.hovered,
            widgetElementRef: this.widgetElementRef,
            config: this.config,
            shouldRenderConfigProvider: this.shouldRenderConfigProvider,
            rtlEnabled: this.rtlEnabled,
            attributes: this.attributes,
            styles: this.styles,
            cssClasses: this.cssClasses,
            tabIndex: this.tabIndex,
            restAttributes: this.restAttributes
        })
    }
}
Widget.defaultProps = WidgetProps;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/utils/combine_classes.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/utils/combine_classes.js ***!
  \*************************************************************************/
/*! exports provided: combineClasses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineClasses", function() { return combineClasses; });
/**
 * DevExtreme (esm/renovation/utils/combine_classes.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
function combineClasses(classesMap) {
    return Object.keys(classesMap).filter(p => classesMap[p]).join(" ")
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/utils/resolve_rtl.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/utils/resolve_rtl.js ***!
  \*********************************************************************/
/*! exports provided: resolveRtlEnabled, resolveRtlEnabledDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveRtlEnabled", function() { return resolveRtlEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveRtlEnabledDefinition", function() { return resolveRtlEnabledDefinition; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/config */ "./node_modules/devextreme/esm/core/config.js");
/**
 * DevExtreme (esm/renovation/utils/resolve_rtl.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


function resolveRtlEnabled(rtlProp, config) {
    if (void 0 !== rtlProp) {
        return rtlProp
    }
    if (void 0 !== (null === config || void 0 === config ? void 0 : config.rtlEnabled)) {
        return config.rtlEnabled
    }
    return Object(_core_config__WEBPACK_IMPORTED_MODULE_1__["default"])().rtlEnabled
}
function resolveRtlEnabledDefinition(rtlProp, config) {
    var isPropDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rtlProp);
    var onlyGlobalDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(Object(_core_config__WEBPACK_IMPORTED_MODULE_1__["default"])().rtlEnabled) && !isPropDefined && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(null === config || void 0 === config ? void 0 : config.rtlEnabled);
    return isPropDefined && rtlProp !== (null === config || void 0 === config ? void 0 : config.rtlEnabled) || onlyGlobalDefined
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/utils/shallow_equals.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/utils/shallow_equals.js ***!
  \************************************************************************/
/*! exports provided: shallowEquals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowEquals", function() { return shallowEquals; });
/**
 * DevExtreme (esm/renovation/utils/shallow_equals.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var shallowEquals = (firstObject, secondObject) => {
    if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
        return false
    }
    return Object.keys(firstObject).every(key => firstObject[key] === secondObject[key])
};


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/utils/subscribe_to_event.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/utils/subscribe_to_event.js ***!
  \****************************************************************************/
/*! exports provided: subscribeToEvent, subscribeToClickEvent, subscribeToScrollEvent, subscribeToScrollInitEvent, subscribeToDXScrollStartEvent, subscribeToDXScrollMoveEvent, subscribeToDXScrollEndEvent, subscribeToDXScrollStopEvent, subscribeToDXScrollCancelEvent, subscribeToDXPointerDownEvent, subscribeToDXPointerUpEvent, subscribeToMouseEnterEvent, subscribeToMouseLeaveEvent, subscribeToKeyDownEvent, subscribeToDxActiveEvent, subscribeToDxInactiveEvent, subscribeToDxHoverStartEvent, subscribeToDxHoverEndEvent, subscribeToDxFocusInEvent, subscribeToDxFocusOutEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToEvent", function() { return subscribeToEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToClickEvent", function() { return subscribeToClickEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToScrollEvent", function() { return subscribeToScrollEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToScrollInitEvent", function() { return subscribeToScrollInitEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDXScrollStartEvent", function() { return subscribeToDXScrollStartEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDXScrollMoveEvent", function() { return subscribeToDXScrollMoveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDXScrollEndEvent", function() { return subscribeToDXScrollEndEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDXScrollStopEvent", function() { return subscribeToDXScrollStopEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDXScrollCancelEvent", function() { return subscribeToDXScrollCancelEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDXPointerDownEvent", function() { return subscribeToDXPointerDownEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDXPointerUpEvent", function() { return subscribeToDXPointerUpEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToMouseEnterEvent", function() { return subscribeToMouseEnterEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToMouseLeaveEvent", function() { return subscribeToMouseLeaveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToKeyDownEvent", function() { return subscribeToKeyDownEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDxActiveEvent", function() { return subscribeToDxActiveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDxInactiveEvent", function() { return subscribeToDxInactiveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDxHoverStartEvent", function() { return subscribeToDxHoverStartEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDxHoverEndEvent", function() { return subscribeToDxHoverEndEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDxFocusInEvent", function() { return subscribeToDxFocusInEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToDxFocusOutEvent", function() { return subscribeToDxFocusOutEvent; });
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/gesture/emitter.gesture.scroll */ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.scroll.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/**
 * DevExtreme (esm/renovation/utils/subscribe_to_event.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





function subscribeToEvent(eventName) {
    return (element, handler, eventData, namespace) => {
        var event = namespace ? Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["addNamespace"])(eventName, namespace) : eventName;
        if (handler) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(element, event, eventData, handler);
            return () => {
                _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off(element, event, handler)
            }
        }
        return
    }
}
var subscribeToClickEvent = subscribeToEvent(_events_click__WEBPACK_IMPORTED_MODULE_1__["name"]);
var subscribeToScrollEvent = subscribeToEvent(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__["default"].scroll);
var subscribeToScrollInitEvent = subscribeToEvent(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__["default"].init);
var subscribeToDXScrollStartEvent = subscribeToEvent(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__["default"].start);
var subscribeToDXScrollMoveEvent = subscribeToEvent(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__["default"].move);
var subscribeToDXScrollEndEvent = subscribeToEvent(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__["default"].end);
var subscribeToDXScrollStopEvent = subscribeToEvent(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__["default"].stop);
var subscribeToDXScrollCancelEvent = subscribeToEvent(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_3__["default"].cancel);
var subscribeToDXPointerDownEvent = subscribeToEvent(_events_pointer__WEBPACK_IMPORTED_MODULE_4__["default"].down);
var subscribeToDXPointerUpEvent = subscribeToEvent(_events_pointer__WEBPACK_IMPORTED_MODULE_4__["default"].up);
var subscribeToMouseEnterEvent = subscribeToEvent("mouseenter");
var subscribeToMouseLeaveEvent = subscribeToEvent("mouseleave");
var subscribeToKeyDownEvent = subscribeToEvent("keydown");
var subscribeToDxActiveEvent = subscribeToEvent("dxactive");
var subscribeToDxInactiveEvent = subscribeToEvent("dxinactive");
var subscribeToDxHoverStartEvent = subscribeToEvent("dxhoverstart");
var subscribeToDxHoverEndEvent = subscribeToEvent("dxhoverend");
var subscribeToDxFocusInEvent = subscribeToEvent("focusin");
var subscribeToDxFocusOutEvent = subscribeToEvent("focusout");


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/validation_engine.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/validation_engine.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_events_strategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/events_strategy */ "./node_modules/devextreme/esm/core/events_strategy.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _localization_number__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../localization/number */ "./node_modules/devextreme/esm/localization/number.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/polyfills/promise */ "./node_modules/devextreme/esm/core/polyfills/promise.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/validation_engine.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */












var STATUS = {
    valid: "valid",
    invalid: "invalid",
    pending: "pending"
};
class BaseRuleValidator {
    constructor() {
        this.NAME = "base"
    }
    defaultMessage(value) {
        return _localization_message__WEBPACK_IMPORTED_MODULE_9__["default"].getFormatter("validation-".concat(this.NAME))(value)
    }
    defaultFormattedMessage(value) {
        return _localization_message__WEBPACK_IMPORTED_MODULE_9__["default"].getFormatter("validation-".concat(this.NAME, "-formatted"))(value)
    }
    _isValueEmpty(value) {
        return !rulesValidators.required.validate(value, {})
    }
    validate(value, rule) {
        var valueArray = Array.isArray(value) ? value : [value];
        var result = true;
        if (valueArray.length) {
            valueArray.every(itemValue => {
                result = this._validate(itemValue, rule);
                return result
            })
        } else {
            result = this._validate(null, rule)
        }
        return result
    }
}
class RequiredRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "required"
    }
    _validate(value, rule) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(value)) {
            return false
        }
        if (false === value) {
            return false
        }
        value = String(value);
        if (rule.trim || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(rule.trim)) {
            value = value.trim()
        }
        return "" !== value
    }
}
class NumericRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "numeric"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        if (rule.useCultureSettings && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isString"])(value)) {
            return !isNaN(_localization_number__WEBPACK_IMPORTED_MODULE_8__["default"].parse(value))
        } else {
            return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isNumeric"])(value)
        }
    }
}
class RangeRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "range"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        var validNumber = rulesValidators.numeric.validate(value, rule);
        var validValue = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(value) && "" !== value;
        var number = validNumber ? parseFloat(value) : validValue && value.valueOf();
        var min = rule.min;
        var max = rule.max;
        if (!(validNumber || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDate"])(value)) && !validValue) {
            return false
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(min)) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(max)) {
                return number >= min && number <= max
            }
            return number >= min
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(max)) {
            return number <= max
        } else {
            throw _core_errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E0101")
        }
    }
}
class StringLengthRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "stringLength"
    }
    _validate(value, rule) {
        var _value;
        value = String(null !== (_value = value) && void 0 !== _value ? _value : "");
        if (rule.trim || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(rule.trim)) {
            value = value.trim()
        }
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        return rulesValidators.range.validate(value.length, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, rule))
    }
}
class CustomRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "custom"
    }
    validate(value, rule) {
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        var validator = rule.validator;
        var dataGetter = validator && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(validator.option) && validator.option("dataGetter");
        var extraParams = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(dataGetter) && dataGetter();
        var params = {
            value: value,
            validator: validator,
            rule: rule
        };
        if (extraParams) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(params, extraParams)
        }
        return rule.validationCallback(params)
    }
}
class AsyncRuleValidator extends CustomRuleValidator {
    constructor() {
        super();
        this.NAME = "async"
    }
    validate(value, rule) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(rule.reevaluate)) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(rule, {
                reevaluate: true
            })
        }
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        var validator = rule.validator;
        var dataGetter = validator && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(validator.option) && validator.option("dataGetter");
        var extraParams = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(dataGetter) && dataGetter();
        var params = {
            value: value,
            validator: validator,
            rule: rule
        };
        if (extraParams) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(params, extraParams)
        }
        var callbackResult = rule.validationCallback(params);
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isPromise"])(callbackResult)) {
            throw _core_errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E0103")
        }
        return this._getWrappedPromise(Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["fromPromise"])(callbackResult).promise())
    }
    _getWrappedPromise(promise) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["Deferred"];
        promise.then((function(res) {
            deferred.resolve(res)
        }), (function(err) {
            var res = {
                isValid: false
            };
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(err)) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isString"])(err)) {
                    res.message = err
                } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isObject"])(err) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(err.message) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isString"])(err.message)) {
                    res.message = err.message
                }
            }
            deferred.resolve(res)
        }));
        return deferred.promise()
    }
}
class CompareRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "compare"
    }
    _validate(value, rule) {
        if (!rule.comparisonTarget) {
            throw _core_errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E0102")
        }
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(rule, {
            reevaluate: true
        });
        var otherValue = rule.comparisonTarget();
        var type = rule.comparisonType || "==";
        switch (type) {
            case "==":
                return value == otherValue;
            case "!=":
                return value != otherValue;
            case "===":
                return value === otherValue;
            case "!==":
                return value !== otherValue;
            case ">":
                return value > otherValue;
            case ">=":
                return value >= otherValue;
            case "<":
                return value < otherValue;
            case "<=":
                return value <= otherValue
        }
    }
}
class PatternRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "pattern"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        var pattern = rule.pattern;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isString"])(pattern)) {
            pattern = new RegExp(pattern)
        }
        return pattern.test(value)
    }
}
class EmailRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "email"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        return rulesValidators.pattern.validate(value, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, rule, {
            pattern: /^[\d\w._-]+@[\d\w._-]+\.[\w]+$/i
        }))
    }
}
var rulesValidators = {
    required: new RequiredRuleValidator,
    numeric: new NumericRuleValidator,
    range: new RangeRuleValidator,
    stringLength: new StringLengthRuleValidator,
    custom: new CustomRuleValidator,
    async: new AsyncRuleValidator,
    compare: new CompareRuleValidator,
    pattern: new PatternRuleValidator,
    email: new EmailRuleValidator
};
var GroupConfig = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    ctor(group) {
        this.group = group;
        this.validators = [];
        this._pendingValidators = [];
        this._onValidatorStatusChanged = this._onValidatorStatusChanged.bind(this);
        this._resetValidationInfo();
        this._eventsStrategy = new _core_events_strategy__WEBPACK_IMPORTED_MODULE_4__["EventsStrategy"](this)
    },
    validate() {
        var result = {
            isValid: true,
            brokenRules: [],
            validators: [],
            status: STATUS.valid,
            complete: null
        };
        this._unsubscribeFromAllChangeEvents();
        this._pendingValidators = [];
        this._resetValidationInfo();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.validators, (_, validator) => {
            var validatorResult = validator.validate();
            result.isValid = result.isValid && validatorResult.isValid;
            if (validatorResult.brokenRules) {
                result.brokenRules = result.brokenRules.concat(validatorResult.brokenRules)
            }
            result.validators.push(validator);
            if (validatorResult.status === STATUS.pending) {
                this._addPendingValidator(validator)
            }
            this._subscribeToChangeEvents(validator)
        });
        if (this._pendingValidators.length) {
            result.status = STATUS.pending
        } else {
            result.status = result.isValid ? STATUS.valid : STATUS.invalid;
            this._unsubscribeFromAllChangeEvents();
            this._raiseValidatedEvent(result)
        }
        this._updateValidationInfo(result);
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, this._validationInfo.result)
    },
    _subscribeToChangeEvents(validator) {
        validator.on("validating", this._onValidatorStatusChanged);
        validator.on("validated", this._onValidatorStatusChanged)
    },
    _unsubscribeFromChangeEvents(validator) {
        validator.off("validating", this._onValidatorStatusChanged);
        validator.off("validated", this._onValidatorStatusChanged)
    },
    _unsubscribeFromAllChangeEvents() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.validators, (_, validator) => {
            this._unsubscribeFromChangeEvents(validator)
        })
    },
    _updateValidationInfo(result) {
        this._validationInfo.result = result;
        if (result.status !== STATUS.pending) {
            return
        }
        if (!this._validationInfo.deferred) {
            this._validationInfo.deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_11__["Deferred"];
            this._validationInfo.result.complete = this._validationInfo.deferred.promise()
        }
    },
    _addPendingValidator(validator) {
        var foundValidator = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["grep"])(this._pendingValidators, (function(val) {
            return val === validator
        }))[0];
        if (!foundValidator) {
            this._pendingValidators.push(validator)
        }
    },
    _removePendingValidator(validator) {
        var index = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(validator, this._pendingValidators);
        if (index >= 0) {
            this._pendingValidators.splice(index, 1)
        }
    },
    _orderBrokenRules(brokenRules) {
        var orderedRules = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.validators, (function(_, validator) {
            var foundRules = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["grep"])(brokenRules, (function(rule) {
                return rule.validator === validator
            }));
            if (foundRules.length) {
                orderedRules = orderedRules.concat(foundRules)
            }
        }));
        return orderedRules
    },
    _updateBrokenRules(result) {
        if (!this._validationInfo.result) {
            return
        }
        var brokenRules = this._validationInfo.result.brokenRules;
        var rules = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["grep"])(brokenRules, (function(rule) {
            return rule.validator !== result.validator
        }));
        if (result.brokenRules) {
            brokenRules = rules.concat(result.brokenRules)
        }
        this._validationInfo.result.brokenRules = this._orderBrokenRules(brokenRules)
    },
    _onValidatorStatusChanged(result) {
        if (result.status === STATUS.pending) {
            this._addPendingValidator(result.validator);
            return
        }
        this._resolveIfComplete(result)
    },
    _resolveIfComplete(result) {
        this._removePendingValidator(result.validator);
        this._updateBrokenRules(result);
        if (!this._pendingValidators.length) {
            this._unsubscribeFromAllChangeEvents();
            if (!this._validationInfo.result) {
                return
            }
            this._validationInfo.result.status = 0 === this._validationInfo.result.brokenRules.length ? STATUS.valid : STATUS.invalid;
            this._validationInfo.result.isValid = this._validationInfo.result.status === STATUS.valid;
            var res = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, this._validationInfo.result, {
                complete: null
            });
            var deferred = this._validationInfo.deferred;
            this._validationInfo.deferred = null;
            this._raiseValidatedEvent(res);
            deferred && setTimeout(() => {
                deferred.resolve(res)
            })
        }
    },
    _raiseValidatedEvent(result) {
        this._eventsStrategy.fireEvent("validated", [result])
    },
    _resetValidationInfo() {
        this._validationInfo = {
            result: null,
            deferred: null
        }
    },
    _synchronizeValidationInfo() {
        if (this._validationInfo.result) {
            this._validationInfo.result.validators = this.validators
        }
    },
    removeRegisteredValidator(validator) {
        var index = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(validator, this.validators);
        if (index > -1) {
            this.validators.splice(index, 1);
            this._synchronizeValidationInfo();
            this._resolveIfComplete({
                validator: validator
            })
        }
    },
    registerValidator(validator) {
        if (Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(validator, this.validators) < 0) {
            this.validators.push(validator);
            this._synchronizeValidationInfo()
        }
    },
    reset() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.validators, (function(_, validator) {
            validator.reset()
        }));
        this._pendingValidators = [];
        this._resetValidationInfo()
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
var ValidationEngine = {
    groups: [],
    getGroupConfig(group) {
        var result = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["grep"])(this.groups, (function(config) {
            return config.group === group
        }));
        if (result.length) {
            return result[0]
        }
    },
    findGroup($element, model) {
        var $dxGroup = $element.parents(".dx-validationgroup").first();
        if ($dxGroup.length) {
            return $dxGroup.dxValidationGroup("instance")
        }
        return model
    },
    initGroups() {
        this.groups = [];
        this.addGroup()
    },
    addGroup(group) {
        var config = this.getGroupConfig(group);
        if (!config) {
            config = new GroupConfig(group);
            this.groups.push(config)
        }
        return config
    },
    removeGroup(group) {
        var config = this.getGroupConfig(group);
        var index = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(config, this.groups);
        if (index > -1) {
            this.groups.splice(index, 1)
        }
        return config
    },
    _setDefaultMessage(info) {
        var {
            rule: rule,
            validator: validator,
            name: name
        } = info;
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(rule.message)) {
            if (validator.defaultFormattedMessage && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(name)) {
                rule.message = validator.defaultFormattedMessage(name)
            } else {
                rule.message = validator.defaultMessage()
            }
        }
    },
    _addBrokenRule(info) {
        var {
            result: result,
            rule: rule
        } = info;
        if (!result.brokenRule) {
            result.brokenRule = rule
        }
        if (!result.brokenRules) {
            result.brokenRules = []
        }
        result.brokenRules.push(rule)
    },
    validate(value, rules, name) {
        var _rules$;
        var result = {
            name: name,
            value: value,
            brokenRule: null,
            brokenRules: null,
            isValid: true,
            validationRules: rules,
            pendingRules: null,
            status: STATUS.valid,
            complete: null
        };
        var validator = null === rules || void 0 === rules ? void 0 : null === (_rules$ = rules[0]) || void 0 === _rules$ ? void 0 : _rules$.validator;
        var asyncRuleItems = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(rules || [], (_, rule) => {
            var ruleValidator = rulesValidators[rule.type];
            var ruleValidationResult;
            if (ruleValidator) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(rule.isValid) && rule.value === value && !rule.reevaluate) {
                    if (!rule.isValid) {
                        result.isValid = false;
                        this._addBrokenRule({
                            result: result,
                            rule: rule
                        });
                        return false
                    }
                    return true
                }
                rule.value = value;
                if ("async" === rule.type) {
                    asyncRuleItems.push({
                        rule: rule,
                        ruleValidator: ruleValidator
                    });
                    return true
                }
                ruleValidationResult = ruleValidator.validate(value, rule);
                rule.isValid = ruleValidationResult;
                if (!ruleValidationResult) {
                    result.isValid = false;
                    this._setDefaultMessage({
                        rule: rule,
                        validator: ruleValidator,
                        name: name
                    });
                    this._addBrokenRule({
                        result: result,
                        rule: rule
                    })
                }
                if (!rule.isValid) {
                    return false
                }
            } else {
                throw _core_errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E0100")
            }
        });
        if (result.isValid && !result.brokenRules && asyncRuleItems.length) {
            result = this._validateAsyncRules({
                value: value,
                items: asyncRuleItems,
                result: result,
                name: name
            })
        }
        this._synchronizeGroupValidationInfo(validator, result);
        result.status = result.pendingRules ? STATUS.pending : result.isValid ? STATUS.valid : STATUS.invalid;
        return result
    },
    _synchronizeGroupValidationInfo(validator, result) {
        var _result$brokenRules;
        if (!validator) {
            return
        }
        var groupConfig = ValidationEngine.getGroupConfig(validator._validationGroup);
        groupConfig._updateBrokenRules.call(groupConfig, {
            validator: validator,
            brokenRules: null !== (_result$brokenRules = result.brokenRules) && void 0 !== _result$brokenRules ? _result$brokenRules : []
        })
    },
    _validateAsyncRules(_ref) {
        var {
            result: result,
            value: value,
            items: items,
            name: name
        } = _ref;
        var asyncResults = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(items, (_, item) => {
            var validateResult = item.ruleValidator.validate(value, item.rule);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isPromise"])(validateResult)) {
                this._updateRuleConfig({
                    rule: item.rule,
                    ruleResult: this._getPatchedRuleResult(validateResult),
                    validator: item.ruleValidator,
                    name: name
                })
            } else {
                if (!result.pendingRules) {
                    result.pendingRules = []
                }
                result.pendingRules.push(item.rule);
                var asyncResult = validateResult.then(res => {
                    var ruleResult = this._getPatchedRuleResult(res);
                    this._updateRuleConfig({
                        rule: item.rule,
                        ruleResult: ruleResult,
                        validator: item.ruleValidator,
                        name: name
                    });
                    return ruleResult
                });
                asyncResults.push(asyncResult)
            }
        });
        if (asyncResults.length) {
            result.complete = _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_10__["default"].all(asyncResults).then(values => this._getAsyncRulesResult({
                result: result,
                values: values
            }))
        }
        return result
    },
    _updateRuleConfig(_ref2) {
        var {
            rule: rule,
            ruleResult: ruleResult,
            validator: validator,
            name: name
        } = _ref2;
        rule.isValid = ruleResult.isValid;
        if (!ruleResult.isValid) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(ruleResult.message) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isString"])(ruleResult.message) && ruleResult.message.length) {
                rule.message = ruleResult.message
            } else {
                this._setDefaultMessage({
                    rule: rule,
                    validator: validator,
                    name: name
                })
            }
        }
    },
    _getPatchedRuleResult(ruleResult) {
        var result;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isObject"])(ruleResult)) {
            result = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, ruleResult);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(result.isValid)) {
                result.isValid = true
            }
        } else {
            result = {
                isValid: Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isBoolean"])(ruleResult) ? ruleResult : true
            }
        }
        return result
    },
    _getAsyncRulesResult(_ref3) {
        var {
            values: values,
            result: result
        } = _ref3;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(values, (index, val) => {
            if (false === val.isValid) {
                result.isValid = val.isValid;
                var rule = result.pendingRules[index];
                this._addBrokenRule({
                    result: result,
                    rule: rule
                })
            }
        });
        result.pendingRules = null;
        result.complete = null;
        result.status = result.isValid ? STATUS.valid : STATUS.invalid;
        return result
    },
    registerValidatorInGroup(group, validator) {
        var groupConfig = ValidationEngine.addGroup(group);
        groupConfig.registerValidator.call(groupConfig, validator)
    },
    _shouldRemoveGroup(group, validatorsInGroup) {
        var isDefaultGroup = void 0 === group;
        var isValidationGroupInstance = group && "dxValidationGroup" === group.NAME;
        return !isDefaultGroup && !isValidationGroupInstance && !validatorsInGroup.length
    },
    removeRegisteredValidator(group, validator) {
        var config = ValidationEngine.getGroupConfig(group);
        if (config) {
            config.removeRegisteredValidator.call(config, validator);
            var validatorsInGroup = config.validators;
            if (this._shouldRemoveGroup(group, validatorsInGroup)) {
                this.removeGroup(group)
            }
        }
    },
    initValidationOptions(options) {
        var initedOptions = {};
        if (options) {
            ["isValid", "validationStatus", "validationError", "validationErrors"].forEach(prop => {
                if (prop in options) {
                    Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(initedOptions, this.synchronizeValidationOptions({
                        name: prop,
                        value: options[prop]
                    }, options))
                }
            })
        }
        return initedOptions
    },
    synchronizeValidationOptions(_ref4, options) {
        var {
            name: name,
            value: value
        } = _ref4;
        switch (name) {
            case "validationStatus":
                var isValid = value === STATUS.valid || value === STATUS.pending;
                return options.isValid !== isValid ? {
                    isValid: isValid
                } : {};
            case "isValid":
                var {
                    validationStatus: validationStatus
                } = options;
                var newStatus = validationStatus;
                if (value && validationStatus === STATUS.invalid) {
                    newStatus = STATUS.valid
                } else if (!value && validationStatus !== STATUS.invalid) {
                    newStatus = STATUS.invalid
                }
                return newStatus !== validationStatus ? {
                    validationStatus: newStatus
                } : {};
            case "validationErrors":
                var validationError = !value || !value.length ? null : value[0];
                return options.validationError !== validationError ? {
                    validationError: validationError
                } : {};
            case "validationError":
                var {
                    validationErrors: validationErrors
                } = options;
                if (!value && validationErrors) {
                    return {
                        validationErrors: null
                    }
                } else if (value && !validationErrors) {
                    return {
                        validationErrors: [value]
                    }
                } else if (value && validationErrors && value !== validationErrors[0]) {
                    validationErrors[0] = value;
                    return {
                        validationErrors: validationErrors.slice()
                    }
                }
        }
        return {}
    },
    validateGroup(group) {
        var groupConfig = ValidationEngine.getGroupConfig(group);
        if (!groupConfig) {
            throw _core_errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E0110")
        }
        return groupConfig.validate()
    },
    resetGroup(group) {
        var groupConfig = ValidationEngine.getGroupConfig(group);
        if (!groupConfig) {
            throw _core_errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E0110")
        }
        return groupConfig.reset()
    }
};
ValidationEngine.initGroups();
/* harmony default export */ __webpack_exports__["default"] = (ValidationEngine);


/***/ }),

/***/ "./node_modules/inferno-create-element/dist/index.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/inferno-create-element/dist/index.esm.js ***!
  \***************************************************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");


function isNullOrUndef(o) {
    return o === void 0 || o === null;
}
function isString(o) {
    return typeof o === 'string';
}
function isUndefined(o) {
    return o === void 0;
}

var componentHooks = {
    onComponentDidMount: 1,
    onComponentDidUpdate: 1,
    onComponentShouldUpdate: 1,
    onComponentWillMount: 1,
    onComponentWillUnmount: 1,
    onComponentWillUpdate: 1
};
function createElement(type, props, _children) {
    var arguments$1 = arguments;
    var children;
    var ref = null;
    var key = null;
    var className = null;
    var flags = 0;
    var newProps;
    var childLen = arguments.length - 2;
    if (childLen === 1) {
        children = _children;
    }
    else if (childLen > 1) {
        children = [];
        while (childLen-- > 0) {
            children[childLen] = arguments$1[childLen + 2];
        }
    }
    if (isString(type)) {
        flags = Object(inferno__WEBPACK_IMPORTED_MODULE_0__["getFlagsForElementVnode"])(type);
        if (!isNullOrUndef(props)) {
            newProps = {};
            for (var prop in props) {
                if (prop === 'className' || prop === 'class') {
                    className = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else if (prop === 'children' && isUndefined(children)) {
                    children = props.children; // always favour children args over props
                }
                else if (prop === 'ref') {
                    ref = props.ref;
                }
                else {
                    if (prop === 'contenteditable') {
                        flags |= 4096 /* ContentEditable */;
                    }
                    newProps[prop] = props[prop];
                }
            }
        }
    }
    else {
        flags = 2 /* ComponentUnknown */;
        if (!isUndefined(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
        }
        if (!isNullOrUndef(props)) {
            newProps = {};
            for (var prop$1 in props) {
                if (prop$1 === 'key') {
                    key = props.key;
                }
                else if (prop$1 === 'ref') {
                    ref = props.ref;
                }
                else if (componentHooks[prop$1] === 1) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[prop$1] = props[prop$1];
                }
                else {
                    newProps[prop$1] = props[prop$1];
                }
            }
        }
        return Object(inferno__WEBPACK_IMPORTED_MODULE_0__["createComponentVNode"])(flags, type, newProps, key, ref);
    }
    if (flags & 8192 /* Fragment */) {
        return Object(inferno__WEBPACK_IMPORTED_MODULE_0__["createFragment"])(childLen === 1 ? [children] : children, 0 /* UnknownChildren */, key);
    }
    return Object(inferno__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(flags, type, className, children, 0 /* UnknownChildren */, newProps, key, ref);
}




/***/ }),

/***/ "./node_modules/inferno/dist/index.esm.js":
/*!************************************************!*\
  !*** ./node_modules/inferno/dist/index.esm.js ***!
  \************************************************/
/*! exports provided: Component, EMPTY_OBJ, Fragment, _CI, _HI, _M, _MCCC, _ME, _MFCC, _MP, _MR, _RFC, __render, createComponentVNode, createFragment, createPortal, createRef, createRenderer, createTextVNode, createVNode, directClone, findDOMfromVNode, forwardRef, getFlagsForElementVnode, linkEvent, normalizeProps, options, render, rerender, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_OBJ", function() { return EMPTY_OBJ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CI", function() { return createClassComponentInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_HI", function() { return normalizeRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_M", function() { return mount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MCCC", function() { return mountClassComponentCallbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ME", function() { return mountElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MFCC", function() { return mountFunctionalComponentCallbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MP", function() { return mountProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MR", function() { return mountRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_RFC", function() { return renderFunctionalComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__render", function() { return __render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComponentVNode", function() { return createComponentVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return createFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return createPortal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return createRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRenderer", function() { return createRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextVNode", function() { return createTextVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVNode", function() { return createVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directClone", function() { return directClone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMfromVNode", function() { return findDOMfromVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forwardRef", function() { return forwardRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFlagsForElementVnode", function() { return getFlagsForElementVnode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkEvent", function() { return linkEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeProps", function() { return normalizeProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return o === void 0 || o === null;
}
function isInvalid(o) {
    return o === null || o === false || o === true || o === void 0;
}
function isFunction(o) {
    return typeof o === 'function';
}
function isString(o) {
    return typeof o === 'string';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isNull(o) {
    return o === null;
}
function isUndefined(o) {
    return o === void 0;
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}

/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    if (isFunction(event)) {
        return { data: data, event: event };
    }
    return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
}
// object.event should always be function, otherwise its badly created object.
function isLinkEventObject(o) {
    return !isNull(o) && typeof o === 'object';
}

// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
var EMPTY_OBJ = {};
var Fragment = '$F';
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function appendChild(parentDOM, dom) {
    parentDOM.appendChild(dom);
}
function insertOrAppend(parentDOM, newNode, nextNode) {
    if (isNull(nextNode)) {
        appendChild(parentDOM, newNode);
    }
    else {
        parentDOM.insertBefore(newNode, nextNode);
    }
}
function documentCreateElement(tag, isSVG) {
    if (isSVG) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }
    return document.createElement(tag);
}
function replaceChild(parentDOM, newDom, lastDom) {
    parentDOM.replaceChild(newDom, lastDom);
}
function removeChild(parentDOM, childNode) {
    parentDOM.removeChild(childNode);
}
function callAll(arrayFn) {
    for (var i = 0; i < arrayFn.length; i++) {
        arrayFn[i]();
    }
}
function findChildVNode(vNode, startEdge, flags) {
    var children = vNode.children;
    if (flags & 4 /* ComponentClass */) {
        return children.$LI;
    }
    if (flags & 8192 /* Fragment */) {
        return vNode.childFlags === 2 /* HasVNodeChildren */ ? children : children[startEdge ? 0 : children.length - 1];
    }
    return children;
}
function findDOMfromVNode(vNode, startEdge) {
    var flags;
    while (vNode) {
        flags = vNode.flags;
        if (flags & 2033 /* DOMRef */) {
            return vNode.dom;
        }
        vNode = findChildVNode(vNode, startEdge, flags);
    }
    return null;
}
function removeVNodeDOM(vNode, parentDOM) {
    do {
        var flags = vNode.flags;
        if (flags & 2033 /* DOMRef */) {
            removeChild(parentDOM, vNode.dom);
            return;
        }
        var children = vNode.children;
        if (flags & 4 /* ComponentClass */) {
            vNode = children.$LI;
        }
        if (flags & 8 /* ComponentFunction */) {
            vNode = children;
        }
        if (flags & 8192 /* Fragment */) {
            if (vNode.childFlags === 2 /* HasVNodeChildren */) {
                vNode = children;
            }
            else {
                for (var i = 0, len = children.length; i < len; ++i) {
                    removeVNodeDOM(children[i], parentDOM);
                }
                return;
            }
        }
    } while (vNode);
}
function moveVNodeDOM(vNode, parentDOM, nextNode) {
    do {
        var flags = vNode.flags;
        if (flags & 2033 /* DOMRef */) {
            insertOrAppend(parentDOM, vNode.dom, nextNode);
            return;
        }
        var children = vNode.children;
        if (flags & 4 /* ComponentClass */) {
            vNode = children.$LI;
        }
        if (flags & 8 /* ComponentFunction */) {
            vNode = children;
        }
        if (flags & 8192 /* Fragment */) {
            if (vNode.childFlags === 2 /* HasVNodeChildren */) {
                vNode = children;
            }
            else {
                for (var i = 0, len = children.length; i < len; ++i) {
                    moveVNodeDOM(children[i], parentDOM, nextNode);
                }
                return;
            }
        }
    } while (vNode);
}
function createDerivedState(instance, nextProps, state) {
    if (instance.constructor.getDerivedStateFromProps) {
        return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
    }
    return state;
}
var renderCheck = {
    v: false
};
var options = {
    componentComparator: null,
    createVNode: null,
    renderComplete: null
};
function setTextContent(dom, children) {
    dom.textContent = children;
}
// Calling this function assumes, nextValue is linkEvent
function isLastValueSameLinkEvent(lastValue, nextValue) {
    return (isLinkEventObject(lastValue) &&
        lastValue.event === nextValue.event &&
        lastValue.data === nextValue.data);
}
function mergeUnsetProperties(to, from) {
    for (var propName in from) {
        if (isUndefined(to[propName])) {
            to[propName] = from[propName];
        }
    }
    return to;
}
function safeCall1(method, arg1) {
    return !!isFunction(method) && (method(arg1), true);
}

var keyPrefix = '$';
function V(childFlags, children, className, flags, key, props, ref, type) {
    this.childFlags = childFlags;
    this.children = children;
    this.className = className;
    this.dom = null;
    this.flags = flags;
    this.key = key === void 0 ? null : key;
    this.props = props === void 0 ? null : props;
    this.ref = ref === void 0 ? null : ref;
    this.type = type;
}
function createVNode(flags, type, className, children, childFlags, props, key, ref) {
    var childFlag = childFlags === void 0 ? 1 /* HasInvalidChildren */ : childFlags;
    var vNode = new V(childFlag, children, className, flags, key, props, ref, type);
    if (options.createVNode) {
        options.createVNode(vNode);
    }
    if (childFlag === 0 /* UnknownChildren */) {
        normalizeChildren(vNode, vNode.children);
    }
    return vNode;
}
function mergeDefaultHooks(flags, type, ref) {
    if (flags & 4 /* ComponentClass */) {
        return ref;
    }
    var defaultHooks = (flags & 32768 /* ForwardRef */ ? type.render : type).defaultHooks;
    if (isNullOrUndef(defaultHooks)) {
        return ref;
    }
    if (isNullOrUndef(ref)) {
        return defaultHooks;
    }
    return mergeUnsetProperties(ref, defaultHooks);
}
function mergeDefaultProps(flags, type, props) {
    // set default props
    var defaultProps = (flags & 32768 /* ForwardRef */ ? type.render : type).defaultProps;
    if (isNullOrUndef(defaultProps)) {
        return props;
    }
    if (isNullOrUndef(props)) {
        return combineFrom(defaultProps, null);
    }
    return mergeUnsetProperties(props, defaultProps);
}
function resolveComponentFlags(flags, type) {
    if (flags & 12 /* ComponentKnown */) {
        return flags;
    }
    if (type.prototype && type.prototype.render) {
        return 4 /* ComponentClass */;
    }
    if (type.render) {
        return 32776 /* ForwardRefComponent */;
    }
    return 8 /* ComponentFunction */;
}
function createComponentVNode(flags, type, props, key, ref) {
    flags = resolveComponentFlags(flags, type);
    var vNode = new V(1 /* HasInvalidChildren */, null, null, flags, key, mergeDefaultProps(flags, type, props), mergeDefaultHooks(flags, type, ref), type);
    if (options.createVNode) {
        options.createVNode(vNode);
    }
    return vNode;
}
function createTextVNode(text, key) {
    return new V(1 /* HasInvalidChildren */, isNullOrUndef(text) || text === true || text === false ? '' : text, null, 16 /* Text */, key, null, null, null);
}
function createFragment(children, childFlags, key) {
    var fragment = createVNode(8192 /* Fragment */, 8192 /* Fragment */, null, children, childFlags, null, key, null);
    switch (fragment.childFlags) {
        case 1 /* HasInvalidChildren */:
            fragment.children = createVoidVNode();
            fragment.childFlags = 2 /* HasVNodeChildren */;
            break;
        case 16 /* HasTextChildren */:
            fragment.children = [createTextVNode(children)];
            fragment.childFlags = 4 /* HasNonKeyedChildren */;
            break;
    }
    return fragment;
}
function normalizeProps(vNode) {
    var props = vNode.props;
    if (props) {
        var flags = vNode.flags;
        if (flags & 481 /* Element */) {
            if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
                normalizeChildren(vNode, props.children);
            }
            if (props.className !== void 0) {
                if (isNullOrUndef(vNode.className)) {
                    vNode.className = props.className || null;
                }
                props.className = undefined;
            }
        }
        if (props.key !== void 0) {
            vNode.key = props.key;
            props.key = undefined;
        }
        if (props.ref !== void 0) {
            if (flags & 8 /* ComponentFunction */) {
                vNode.ref = combineFrom(vNode.ref, props.ref);
            }
            else {
                vNode.ref = props.ref;
            }
            props.ref = undefined;
        }
    }
    return vNode;
}
/*
 * Fragment is different than normal vNode,
 * because when it needs to be cloned we need to clone its children too
 * But not normalize, because otherwise those possibly get KEY and re-mount
 */
function cloneFragment(vNodeToClone) {
    var oldChildren = vNodeToClone.children;
    var childFlags = vNodeToClone.childFlags;
    return createFragment(childFlags === 2 /* HasVNodeChildren */ ? directClone(oldChildren) : oldChildren.map(directClone), childFlags, vNodeToClone.key);
}
function directClone(vNodeToClone) {
    var flags = vNodeToClone.flags & -16385 /* ClearInUse */;
    var props = vNodeToClone.props;
    if (flags & 14 /* Component */) {
        if (!isNull(props)) {
            var propsToClone = props;
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
    }
    if ((flags & 8192 /* Fragment */) === 0) {
        return new V(vNodeToClone.childFlags, vNodeToClone.children, vNodeToClone.className, flags, vNodeToClone.key, props, vNodeToClone.ref, vNodeToClone.type);
    }
    return cloneFragment(vNodeToClone);
}
function createVoidVNode() {
    return createTextVNode('', null);
}
function createPortal(children, container) {
    var normalizedRoot = normalizeRoot(children);
    return createVNode(1024 /* Portal */, 1024 /* Portal */, null, normalizedRoot, 0 /* UnknownChildren */, null, normalizedRoot.key, container);
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        if (!isInvalid(n)) {
            var newKey = currentKey + keyPrefix + index;
            if (isArray(n)) {
                _normalizeVNodes(n, result, 0, newKey);
            }
            else {
                if (isStringOrNumber(n)) {
                    n = createTextVNode(n, newKey);
                }
                else {
                    var oldKey = n.key;
                    var isPrefixedKey = isString(oldKey) && oldKey[0] === keyPrefix;
                    if (n.flags & 81920 /* InUseOrNormalized */ || isPrefixedKey) {
                        n = directClone(n);
                    }
                    n.flags |= 65536 /* Normalized */;
                    if (!isPrefixedKey) {
                        if (isNull(oldKey)) {
                            n.key = newKey;
                        }
                        else {
                            n.key = currentKey + oldKey;
                        }
                    }
                    else if (oldKey.substring(0, currentKey.length) !== currentKey) {
                        n.key = currentKey + oldKey;
                    }
                }
                result.push(n);
            }
        }
    }
}
function getFlagsForElementVnode(type) {
    switch (type) {
        case 'svg':
            return 32 /* SvgElement */;
        case 'input':
            return 64 /* InputElement */;
        case 'select':
            return 256 /* SelectElement */;
        case 'textarea':
            return 128 /* TextareaElement */;
        case Fragment:
            return 8192 /* Fragment */;
        default:
            return 1 /* HtmlElement */;
    }
}
function normalizeChildren(vNode, children) {
    var newChildren;
    var newChildFlags = 1 /* HasInvalidChildren */;
    // Don't change children to match strict equal (===) true in patching
    if (isInvalid(children)) {
        newChildren = children;
    }
    else if (isStringOrNumber(children)) {
        newChildFlags = 16 /* HasTextChildren */;
        newChildren = children;
    }
    else if (isArray(children)) {
        var len = children.length;
        for (var i = 0; i < len; ++i) {
            var n = children[i];
            if (isInvalid(n) || isArray(n)) {
                newChildren = newChildren || children.slice(0, i);
                _normalizeVNodes(children, newChildren, i, '');
                break;
            }
            else if (isStringOrNumber(n)) {
                newChildren = newChildren || children.slice(0, i);
                newChildren.push(createTextVNode(n, keyPrefix + i));
            }
            else {
                var key = n.key;
                var needsCloning = (n.flags & 81920 /* InUseOrNormalized */) > 0;
                var isNullKey = isNull(key);
                var isPrefixed = isString(key) && key[0] === keyPrefix;
                if (needsCloning || isNullKey || isPrefixed) {
                    newChildren = newChildren || children.slice(0, i);
                    if (needsCloning || isPrefixed) {
                        n = directClone(n);
                    }
                    if (isNullKey || isPrefixed) {
                        n.key = keyPrefix + i;
                    }
                    newChildren.push(n);
                }
                else if (newChildren) {
                    newChildren.push(n);
                }
                n.flags |= 65536 /* Normalized */;
            }
        }
        newChildren = newChildren || children;
        if (newChildren.length === 0) {
            newChildFlags = 1 /* HasInvalidChildren */;
        }
        else {
            newChildFlags = 8 /* HasKeyedChildren */;
        }
    }
    else {
        newChildren = children;
        newChildren.flags |= 65536 /* Normalized */;
        if (children.flags & 81920 /* InUseOrNormalized */) {
            newChildren = directClone(children);
        }
        newChildFlags = 2 /* HasVNodeChildren */;
    }
    vNode.children = newChildren;
    vNode.childFlags = newChildFlags;
    return vNode;
}
function normalizeRoot(input) {
    if (isInvalid(input) || isStringOrNumber(input)) {
        return createTextVNode(input, null);
    }
    if (isArray(input)) {
        return createFragment(input, 0 /* UnknownChildren */, null);
    }
    return input.flags & 16384 /* InUse */ ? directClone(input) : input;
}

var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var namespaces = {
    'xlink:actuate': xlinkNS,
    'xlink:arcrole': xlinkNS,
    'xlink:href': xlinkNS,
    'xlink:role': xlinkNS,
    'xlink:show': xlinkNS,
    'xlink:title': xlinkNS,
    'xlink:type': xlinkNS,
    'xml:base': xmlNS,
    'xml:lang': xmlNS,
    'xml:space': xmlNS
};

function getDelegatedEventObject(v) {
    return {
        onClick: v,
        onDblClick: v,
        onFocusIn: v,
        onFocusOut: v,
        onKeyDown: v,
        onKeyPress: v,
        onKeyUp: v,
        onMouseDown: v,
        onMouseMove: v,
        onMouseUp: v,
        onTouchEnd: v,
        onTouchMove: v,
        onTouchStart: v
    };
}
var attachedEventCounts = getDelegatedEventObject(0);
var attachedEvents = getDelegatedEventObject(null);
var syntheticEvents = getDelegatedEventObject(true);
function updateOrAddSyntheticEvent(name, dom) {
    var eventsObject = dom.$EV;
    if (!eventsObject) {
        eventsObject = dom.$EV = getDelegatedEventObject(null);
    }
    if (!eventsObject[name]) {
        if (++attachedEventCounts[name] === 1) {
            attachedEvents[name] = attachEventToDocument(name);
        }
    }
    return eventsObject;
}
function unmountSyntheticEvent(name, dom) {
    var eventsObject = dom.$EV;
    if (eventsObject && eventsObject[name]) {
        if (--attachedEventCounts[name] === 0) {
            document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
            attachedEvents[name] = null;
        }
        eventsObject[name] = null;
    }
}
function handleSyntheticEvent(name, lastEvent, nextEvent, dom) {
    if (isFunction(nextEvent)) {
        updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
    }
    else if (isLinkEventObject(nextEvent)) {
        if (isLastValueSameLinkEvent(lastEvent, nextEvent)) {
            return;
        }
        updateOrAddSyntheticEvent(name, dom)[name] = nextEvent;
    }
    else {
        unmountSyntheticEvent(name, dom);
    }
}
// When browsers fully support event.composedPath we could loop it through instead of using parentNode property
function getTargetNode(event) {
    return isFunction(event.composedPath) ? event.composedPath()[0] : event.target;
}
function dispatchEvents(event, isClick, name, eventData) {
    var dom = getTargetNode(event);
    do {
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (isClick && dom.disabled) {
            return;
        }
        var eventsObject = dom.$EV;
        if (eventsObject) {
            var currentEvent = eventsObject[name];
            if (currentEvent) {
                // linkEvent object
                eventData.dom = dom;
                currentEvent.event ? currentEvent.event(currentEvent.data, event) : currentEvent(event);
                if (event.cancelBubble) {
                    return;
                }
            }
        }
        dom = dom.parentNode;
    } while (!isNull(dom));
}
function stopPropagation() {
    this.cancelBubble = true;
    if (!this.immediatePropagationStopped) {
        this.stopImmediatePropagation();
    }
}
function isDefaultPrevented() {
    return this.defaultPrevented;
}
function isPropagationStopped() {
    return this.cancelBubble;
}
function extendEventProperties(event) {
    // Event data needs to be object to save reference to currentTarget getter
    var eventData = {
        dom: document
    };
    event.isDefaultPrevented = isDefaultPrevented;
    event.isPropagationStopped = isPropagationStopped;
    event.stopPropagation = stopPropagation;
    Object.defineProperty(event, 'currentTarget', {
        configurable: true,
        get: function get() {
            return eventData.dom;
        }
    });
    return eventData;
}
function rootClickEvent(name) {
    return function (event) {
        if (event.button !== 0) {
            // Firefox incorrectly triggers click event for mid/right mouse buttons.
            // This bug has been active for 17 years.
            // https://bugzilla.mozilla.org/show_bug.cgi?id=184051
            event.stopPropagation();
            return;
        }
        dispatchEvents(event, true, name, extendEventProperties(event));
    };
}
function rootEvent(name) {
    return function (event) {
        dispatchEvents(event, false, name, extendEventProperties(event));
    };
}
function attachEventToDocument(name) {
    var attachedEvent = name === 'onClick' || name === 'onDblClick' ? rootClickEvent(name) : rootEvent(name);
    document.addEventListener(normalizeEventName(name), attachedEvent);
    return attachedEvent;
}

function isSameInnerHTML(dom, innerHTML) {
    var tempdom = document.createElement('i');
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
}

function triggerEventListener(props, methodName, e) {
    if (props[methodName]) {
        var listener = props[methodName];
        if (listener.event) {
            listener.event(listener.data, e);
        }
        else {
            listener(e);
        }
    }
    else {
        var nativeListenerName = methodName.toLowerCase();
        if (props[nativeListenerName]) {
            props[nativeListenerName](e);
        }
    }
}
function createWrappedFunction(methodName, applyValue) {
    var fnMethod = function (e) {
        var vNode = this.$V;
        // If vNode is gone by the time event fires, no-op
        if (!vNode) {
            return;
        }
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        if (isString(methodName)) {
            triggerEventListener(props, methodName, e);
        }
        else {
            for (var i = 0; i < methodName.length; ++i) {
                triggerEventListener(props, methodName[i], e);
            }
        }
        if (isFunction(applyValue)) {
            var newVNode = this.$V;
            var newProps = newVNode.props || EMPTY_OBJ;
            applyValue(newProps, dom, false, newVNode);
        }
    };
    Object.defineProperty(fnMethod, 'wrapped', {
        configurable: false,
        enumerable: false,
        value: true,
        writable: false
    });
    return fnMethod;
}

function attachEvent(dom, eventName, handler) {
    var previousKey = "$" + eventName;
    var previousArgs = dom[previousKey];
    if (previousArgs) {
        if (previousArgs[1].wrapped) {
            return;
        }
        dom.removeEventListener(previousArgs[0], previousArgs[1]);
        dom[previousKey] = null;
    }
    if (isFunction(handler)) {
        dom.addEventListener(eventName, handler);
        dom[previousKey] = [eventName, handler];
    }
}

function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
var onTextInputChange = createWrappedFunction('onInput', applyValueInput);
var wrappedOnChange = createWrappedFunction(['onClick', 'onChange'], applyValueInput);
/* tslint:disable-next-line:no-empty */
function emptywrapper(event) {
    event.stopPropagation();
}
emptywrapper.wrapped = true;
function inputEvents(dom, nextPropsOrEmpty) {
    if (isCheckedType(nextPropsOrEmpty.type)) {
        attachEvent(dom, 'change', wrappedOnChange);
        attachEvent(dom, 'click', emptywrapper);
    }
    else {
        attachEvent(dom, 'input', onTextInputChange);
    }
}
function applyValueInput(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.defaultValue = value;
            dom.value = value;
        }
        else if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}

function updateChildOptions(vNode, value) {
    if (vNode.type === 'option') {
        updateChildOption(vNode, value);
    }
    else {
        var children = vNode.children;
        var flags = vNode.flags;
        if (flags & 4 /* ComponentClass */) {
            updateChildOptions(children.$LI, value);
        }
        else if (flags & 8 /* ComponentFunction */) {
            updateChildOptions(children, value);
        }
        else if (vNode.childFlags === 2 /* HasVNodeChildren */) {
            updateChildOptions(children, value);
        }
        else if (vNode.childFlags & 12 /* MultipleChildren */) {
            for (var i = 0, len = children.length; i < len; ++i) {
                updateChildOptions(children[i], value);
            }
        }
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if (props.value === value || (isArray(value) && value.indexOf(props.value) !== -1)) {
        dom.selected = true;
    }
    else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
var onSelectChange = createWrappedFunction('onChange', applyValueSelect);
function selectEvents(dom) {
    attachEvent(dom, 'change', onSelectChange);
}
function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
    var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);
    if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
        dom.multiple = multiplePropInBoolean;
    }
    var index = nextPropsOrEmpty.selectedIndex;
    if (index === -1) {
        dom.selectedIndex = -1;
    }
    var childFlags = vNode.childFlags;
    if (childFlags !== 1 /* HasInvalidChildren */) {
        var value = nextPropsOrEmpty.value;
        if (isNumber(index) && index > -1 && dom.options[index]) {
            value = dom.options[index].value;
        }
        if (mounting && isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        updateChildOptions(vNode, value);
    }
}

var onTextareaInputChange = createWrappedFunction('onInput', applyValueTextArea);
var wrappedOnChange$1 = createWrappedFunction('onChange');
function textAreaEvents(dom, nextPropsOrEmpty) {
    attachEvent(dom, 'input', onTextareaInputChange);
    if (nextPropsOrEmpty.onChange) {
        attachEvent(dom, 'change', wrappedOnChange$1);
    }
}
function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
                dom.defaultValue = defaultValue;
                dom.value = defaultValue;
            }
        }
    }
    else if (domValue !== value) {
        /* There is value so keep it controlled */
        dom.defaultValue = value;
        dom.value = value;
    }
}

function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 64 /* InputElement */) {
        applyValueInput(nextPropsOrEmpty, dom);
    }
    else if (flags & 256 /* SelectElement */) {
        applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
    }
    else if (flags & 128 /* TextareaElement */) {
        applyValueTextArea(nextPropsOrEmpty, dom, mounting);
    }
    if (isControlled) {
        dom.$V = vNode;
    }
}
function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
    if (flags & 64 /* InputElement */) {
        inputEvents(dom, nextPropsOrEmpty);
    }
    else if (flags & 256 /* SelectElement */) {
        selectEvents(dom);
    }
    else if (flags & 128 /* TextareaElement */) {
        textAreaEvents(dom, nextPropsOrEmpty);
    }
}
function isControlledFormElement(nextPropsOrEmpty) {
    return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
}

function createRef() {
    return {
        current: null
    };
}
function forwardRef(render) {
    // @ts-ignore
    return {
        render: render
    };
}
function unmountRef(ref) {
    if (ref) {
        if (!safeCall1(ref, null) && ref.current) {
            ref.current = null;
        }
    }
}
function mountRef(ref, value, lifecycle) {
    if (ref && (isFunction(ref) || ref.current !== void 0)) {
        lifecycle.push(function () {
            if (!safeCall1(ref, value) && ref.current !== void 0) {
                ref.current = value;
            }
        });
    }
}

function remove(vNode, parentDOM) {
    unmount(vNode);
    removeVNodeDOM(vNode, parentDOM);
}
function unmount(vNode) {
    var flags = vNode.flags;
    var children = vNode.children;
    var ref;
    if (flags & 481 /* Element */) {
        ref = vNode.ref;
        var props = vNode.props;
        unmountRef(ref);
        var childFlags = vNode.childFlags;
        if (!isNull(props)) {
            var keys = Object.keys(props);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (syntheticEvents[key]) {
                    unmountSyntheticEvent(key, vNode.dom);
                }
            }
        }
        if (childFlags & 12 /* MultipleChildren */) {
            unmountAllChildren(children);
        }
        else if (childFlags === 2 /* HasVNodeChildren */) {
            unmount(children);
        }
    }
    else if (children) {
        if (flags & 4 /* ComponentClass */) {
            if (isFunction(children.componentWillUnmount)) {
                children.componentWillUnmount();
            }
            unmountRef(vNode.ref);
            children.$UN = true;
            unmount(children.$LI);
        }
        else if (flags & 8 /* ComponentFunction */) {
            ref = vNode.ref;
            if (!isNullOrUndef(ref) && isFunction(ref.onComponentWillUnmount)) {
                ref.onComponentWillUnmount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
            }
            unmount(children);
        }
        else if (flags & 1024 /* Portal */) {
            remove(children, vNode.ref);
        }
        else if (flags & 8192 /* Fragment */) {
            if (vNode.childFlags & 12 /* MultipleChildren */) {
                unmountAllChildren(children);
            }
        }
    }
}
function unmountAllChildren(children) {
    for (var i = 0, len = children.length; i < len; ++i) {
        unmount(children[i]);
    }
}
function clearDOM(dom) {
    // Optimization for clearing dom
    dom.textContent = '';
}
function removeAllChildren(dom, vNode, children) {
    unmountAllChildren(children);
    if (vNode.flags & 8192 /* Fragment */) {
        removeVNodeDOM(vNode, dom);
    }
    else {
        clearDOM(dom);
    }
}

function wrapLinkEvent(nextValue) {
    // This variable makes sure there is no "this" context in callback
    var ev = nextValue.event;
    return function (e) {
        ev(nextValue.data, e);
    };
}
function patchEvent(name, lastValue, nextValue, dom) {
    if (isLinkEventObject(nextValue)) {
        if (isLastValueSameLinkEvent(lastValue, nextValue)) {
            return;
        }
        nextValue = wrapLinkEvent(nextValue);
    }
    attachEvent(dom, normalizeEventName(name), nextValue);
}
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    if (isNullOrUndef(nextAttrValue)) {
        dom.removeAttribute('style');
        return;
    }
    var domStyle = dom.style;
    var style;
    var value;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
        for (style in nextAttrValue) {
            // do not add a hasOwnProperty check here, it affects performance
            value = nextAttrValue[style];
            if (value !== lastAttrValue[style]) {
                domStyle.setProperty(style, value);
            }
        }
        for (style in lastAttrValue) {
            if (isNullOrUndef(nextAttrValue[style])) {
                domStyle.removeProperty(style);
            }
        }
    }
    else {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            domStyle.setProperty(style, value);
        }
    }
}
function patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom) {
    var lastHtml = (lastValue && lastValue.__html) || '';
    var nextHtml = (nextValue && nextValue.__html) || '';
    if (lastHtml !== nextHtml) {
        if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
            if (!isNull(lastVNode)) {
                if (lastVNode.childFlags & 12 /* MultipleChildren */) {
                    unmountAllChildren(lastVNode.children);
                }
                else if (lastVNode.childFlags === 2 /* HasVNodeChildren */) {
                    unmount(lastVNode.children);
                }
                lastVNode.children = null;
                lastVNode.childFlags = 1 /* HasInvalidChildren */;
            }
            dom.innerHTML = nextHtml;
        }
    }
}
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
    switch (prop) {
        case 'children':
        case 'childrenType':
        case 'className':
        case 'defaultValue':
        case 'key':
        case 'multiple':
        case 'ref':
        case 'selectedIndex':
            break;
        case 'autoFocus':
            dom.autofocus = !!nextValue;
            break;
        case 'allowfullscreen':
        case 'autoplay':
        case 'capture':
        case 'checked':
        case 'controls':
        case 'default':
        case 'disabled':
        case 'hidden':
        case 'indeterminate':
        case 'loop':
        case 'muted':
        case 'novalidate':
        case 'open':
        case 'readOnly':
        case 'required':
        case 'reversed':
        case 'scoped':
        case 'seamless':
        case 'selected':
            dom[prop] = !!nextValue;
            break;
        case 'defaultChecked':
        case 'value':
        case 'volume':
            if (hasControlledValue && prop === 'value') {
                break;
            }
            var value = isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
            break;
        case 'style':
            patchStyle(lastValue, nextValue, dom);
            break;
        case 'dangerouslySetInnerHTML':
            patchDangerInnerHTML(lastValue, nextValue, lastVNode, dom);
            break;
        default:
            if (syntheticEvents[prop]) {
                handleSyntheticEvent(prop, lastValue, nextValue, dom);
            }
            else if (prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110) {
                patchEvent(prop, lastValue, nextValue, dom);
            }
            else if (isNullOrUndef(nextValue)) {
                dom.removeAttribute(prop);
            }
            else if (isSVG && namespaces[prop]) {
                // We optimize for isSVG being false
                // If we end up in this path we can read property again
                dom.setAttributeNS(namespaces[prop], prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
            break;
    }
}
function mountProps(vNode, flags, props, dom, isSVG) {
    var hasControlledValue = false;
    var isFormElement = (flags & 448 /* FormElement */) > 0;
    if (isFormElement) {
        hasControlledValue = isControlledFormElement(props);
        if (hasControlledValue) {
            addFormElementEventHandlers(flags, dom, props);
        }
    }
    for (var prop in props) {
        // do not add a hasOwnProperty check here, it affects performance
        patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
    }
    if (isFormElement) {
        processElement(flags, vNode, dom, props, true, hasControlledValue);
    }
}

function renderNewInput(instance, props, context) {
    var nextInput = normalizeRoot(instance.render(props, instance.state, context));
    var childContext = context;
    if (isFunction(instance.getChildContext)) {
        childContext = combineFrom(context, instance.getChildContext());
    }
    instance.$CX = childContext;
    return nextInput;
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    var instance = new Component(props, context);
    var usesNewAPI = (instance.$N = Boolean(Component.getDerivedStateFromProps || instance.getSnapshotBeforeUpdate));
    instance.$SVG = isSVG;
    instance.$L = lifecycle;
    vNode.children = instance;
    instance.$BS = false;
    instance.context = context;
    if (instance.props === EMPTY_OBJ) {
        instance.props = props;
    }
    if (!usesNewAPI) {
        if (isFunction(instance.componentWillMount)) {
            instance.$BR = true;
            instance.componentWillMount();
            var pending = instance.$PS;
            if (!isNull(pending)) {
                var state = instance.state;
                if (isNull(state)) {
                    instance.state = pending;
                }
                else {
                    for (var key in pending) {
                        state[key] = pending[key];
                    }
                }
                instance.$PS = null;
            }
            instance.$BR = false;
        }
    }
    else {
        instance.state = createDerivedState(instance, props, instance.state);
    }
    instance.$LI = renderNewInput(instance, props, context);
    return instance;
}
function renderFunctionalComponent(vNode, context) {
    var props = vNode.props || EMPTY_OBJ;
    return vNode.flags & 32768 /* ForwardRef */ ? vNode.type.render(props, vNode.ref, context) : vNode.type(props, context);
}

function mount(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = (vNode.flags |= 16384 /* InUse */);
    if (flags & 481 /* Element */) {
        mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (flags & 4 /* ComponentClass */) {
        mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (flags & 8 /* ComponentFunction */) {
        mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
        mountFunctionalComponentCallbacks(vNode, lifecycle);
    }
    else if (flags & 512 /* Void */ || flags & 16 /* Text */) {
        mountText(vNode, parentDOM, nextNode);
    }
    else if (flags & 8192 /* Fragment */) {
        mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle);
    }
    else if (flags & 1024 /* Portal */) {
        mountPortal(vNode, context, parentDOM, nextNode, lifecycle);
    }
    else ;
}
function mountPortal(vNode, context, parentDOM, nextNode, lifecycle) {
    mount(vNode.children, vNode.ref, context, false, null, lifecycle);
    var placeHolderVNode = createVoidVNode();
    mountText(placeHolderVNode, parentDOM, nextNode);
    vNode.dom = placeHolderVNode.dom;
}
function mountFragment(vNode, context, parentDOM, isSVG, nextNode, lifecycle) {
    var children = vNode.children;
    var childFlags = vNode.childFlags;
    // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
    // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements
    if (childFlags & 12 /* MultipleChildren */ && children.length === 0) {
        childFlags = vNode.childFlags = 2 /* HasVNodeChildren */;
        children = vNode.children = createVoidVNode();
    }
    if (childFlags === 2 /* HasVNodeChildren */) {
        mount(children, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else {
        mountArrayChildren(children, parentDOM, context, isSVG, nextNode, lifecycle);
    }
}
function mountText(vNode, parentDOM, nextNode) {
    var dom = (vNode.dom = document.createTextNode(vNode.children));
    if (!isNull(parentDOM)) {
        insertOrAppend(parentDOM, dom, nextNode);
    }
}
function mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = vNode.flags;
    var props = vNode.props;
    var className = vNode.className;
    var childFlags = vNode.childFlags;
    var dom = (vNode.dom = documentCreateElement(vNode.type, (isSVG = isSVG || (flags & 32 /* SvgElement */) > 0)));
    var children = vNode.children;
    if (!isNullOrUndef(className) && className !== '') {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (childFlags === 16 /* HasTextChildren */) {
        setTextContent(dom, children);
    }
    else if (childFlags !== 1 /* HasInvalidChildren */) {
        var childrenIsSVG = isSVG && vNode.type !== 'foreignObject';
        if (childFlags === 2 /* HasVNodeChildren */) {
            if (children.flags & 16384 /* InUse */) {
                vNode.children = children = directClone(children);
            }
            mount(children, dom, context, childrenIsSVG, null, lifecycle);
        }
        else if (childFlags === 8 /* HasKeyedChildren */ || childFlags === 4 /* HasNonKeyedChildren */) {
            mountArrayChildren(children, dom, context, childrenIsSVG, null, lifecycle);
        }
    }
    if (!isNull(parentDOM)) {
        insertOrAppend(parentDOM, dom, nextNode);
    }
    if (!isNull(props)) {
        mountProps(vNode, flags, props, dom, isSVG);
    }
    mountRef(vNode.ref, dom, lifecycle);
}
function mountArrayChildren(children, dom, context, isSVG, nextNode, lifecycle) {
    for (var i = 0; i < children.length; ++i) {
        var child = children[i];
        if (child.flags & 16384 /* InUse */) {
            children[i] = child = directClone(child);
        }
        mount(child, dom, context, isSVG, nextNode, lifecycle);
    }
}
function mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = createClassComponentInstance(vNode, vNode.type, vNode.props || EMPTY_OBJ, context, isSVG, lifecycle);
    mount(instance.$LI, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
    mountClassComponentCallbacks(vNode.ref, instance, lifecycle);
}
function mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    mount((vNode.children = normalizeRoot(renderFunctionalComponent(vNode, context))), parentDOM, context, isSVG, nextNode, lifecycle);
}
function createClassMountCallback(instance) {
    return function () {
        instance.componentDidMount();
    };
}
function mountClassComponentCallbacks(ref, instance, lifecycle) {
    mountRef(ref, instance, lifecycle);
    if (isFunction(instance.componentDidMount)) {
        lifecycle.push(createClassMountCallback(instance));
    }
}
function createOnMountCallback(ref, vNode) {
    return function () {
        ref.onComponentDidMount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
    };
}
function mountFunctionalComponentCallbacks(vNode, lifecycle) {
    var ref = vNode.ref;
    if (!isNullOrUndef(ref)) {
        safeCall1(ref.onComponentWillMount, vNode.props || EMPTY_OBJ);
        if (isFunction(ref.onComponentDidMount)) {
            lifecycle.push(createOnMountCallback(ref, vNode));
        }
    }
}

function replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    unmount(lastVNode);
    if ((nextVNode.flags & lastVNode.flags & 2033 /* DOMRef */) !== 0) {
        mount(nextVNode, null, context, isSVG, null, lifecycle);
        // Single DOM operation, when we have dom references available
        replaceChild(parentDOM, nextVNode.dom, lastVNode.dom);
    }
    else {
        mount(nextVNode, parentDOM, context, isSVG, findDOMfromVNode(lastVNode, true), lifecycle);
        removeVNodeDOM(lastVNode, parentDOM);
    }
}
function patch(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var nextFlags = (nextVNode.flags |= 16384 /* InUse */);
    if (lastVNode.flags !== nextFlags || lastVNode.type !== nextVNode.type || lastVNode.key !== nextVNode.key || nextFlags & 2048 /* ReCreate */) {
        if (lastVNode.flags & 16384 /* InUse */) {
            replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
        }
        else {
            // Last vNode is not in use, it has crashed at application level. Just mount nextVNode and ignore last one
            mount(nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
        }
    }
    else if (nextFlags & 481 /* Element */) {
        patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle);
    }
    else if (nextFlags & 4 /* ComponentClass */) {
        patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (nextFlags & 8 /* ComponentFunction */) {
        patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (nextFlags & 16 /* Text */) {
        patchText(lastVNode, nextVNode);
    }
    else if (nextFlags & 512 /* Void */) {
        nextVNode.dom = lastVNode.dom;
    }
    else if (nextFlags & 8192 /* Fragment */) {
        patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
    }
    else {
        patchPortal(lastVNode, nextVNode, context, lifecycle);
    }
}
function patchSingleTextChild(lastChildren, nextChildren, parentDOM) {
    if (lastChildren !== nextChildren) {
        if (lastChildren !== '') {
            parentDOM.firstChild.nodeValue = nextChildren;
        }
        else {
            setTextContent(parentDOM, nextChildren);
        }
    }
}
function patchContentEditableChildren(dom, nextChildren) {
    if (dom.textContent !== nextChildren) {
        dom.textContent = nextChildren;
    }
}
function patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    var lastChildren = lastVNode.children;
    var nextChildren = nextVNode.children;
    var lastChildFlags = lastVNode.childFlags;
    var nextChildFlags = nextVNode.childFlags;
    var nextNode = null;
    // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
    // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements
    if (nextChildFlags & 12 /* MultipleChildren */ && nextChildren.length === 0) {
        nextChildFlags = nextVNode.childFlags = 2 /* HasVNodeChildren */;
        nextChildren = nextVNode.children = createVoidVNode();
    }
    var nextIsSingle = (nextChildFlags & 2 /* HasVNodeChildren */) !== 0;
    if (lastChildFlags & 12 /* MultipleChildren */) {
        var lastLen = lastChildren.length;
        // We need to know Fragment's edge node when
        if (
        // It uses keyed algorithm
        (lastChildFlags & 8 /* HasKeyedChildren */ && nextChildFlags & 8 /* HasKeyedChildren */) ||
            // It transforms from many to single
            nextIsSingle ||
            // It will append more nodes
            (!nextIsSingle && nextChildren.length > lastLen)) {
            // When fragment has multiple children there is always at least one vNode
            nextNode = findDOMfromVNode(lastChildren[lastLen - 1], false).nextSibling;
        }
    }
    patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lastVNode, lifecycle);
}
function patchPortal(lastVNode, nextVNode, context, lifecycle) {
    var lastContainer = lastVNode.ref;
    var nextContainer = nextVNode.ref;
    var nextChildren = nextVNode.children;
    patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false, null, lastVNode, lifecycle);
    nextVNode.dom = lastVNode.dom;
    if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
        var node = nextChildren.dom;
        removeChild(lastContainer, node);
        appendChild(nextContainer, node);
    }
}
function patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle) {
    var dom = (nextVNode.dom = lastVNode.dom);
    var lastProps = lastVNode.props;
    var nextProps = nextVNode.props;
    var isFormElement = false;
    var hasControlledValue = false;
    var nextPropsOrEmpty;
    isSVG = isSVG || (nextFlags & 32 /* SvgElement */) > 0;
    // inlined patchProps  -- starts --
    if (lastProps !== nextProps) {
        var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
        nextPropsOrEmpty = nextProps || EMPTY_OBJ;
        if (nextPropsOrEmpty !== EMPTY_OBJ) {
            isFormElement = (nextFlags & 448 /* FormElement */) > 0;
            if (isFormElement) {
                hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
            }
            for (var prop in nextPropsOrEmpty) {
                var lastValue = lastPropsOrEmpty[prop];
                var nextValue = nextPropsOrEmpty[prop];
                if (lastValue !== nextValue) {
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode);
                }
            }
        }
        if (lastPropsOrEmpty !== EMPTY_OBJ) {
            for (var prop$1 in lastPropsOrEmpty) {
                if (isNullOrUndef(nextPropsOrEmpty[prop$1]) && !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                    patchProp(prop$1, lastPropsOrEmpty[prop$1], null, dom, isSVG, hasControlledValue, lastVNode);
                }
            }
        }
    }
    var nextChildren = nextVNode.children;
    var nextClassName = nextVNode.className;
    // inlined patchProps  -- ends --
    if (lastVNode.className !== nextClassName) {
        if (isNullOrUndef(nextClassName)) {
            dom.removeAttribute('class');
        }
        else if (isSVG) {
            dom.setAttribute('class', nextClassName);
        }
        else {
            dom.className = nextClassName;
        }
    }
    if (nextFlags & 4096 /* ContentEditable */) {
        patchContentEditableChildren(dom, nextChildren);
    }
    else {
        patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, dom, context, isSVG && nextVNode.type !== 'foreignObject', null, lastVNode, lifecycle);
    }
    if (isFormElement) {
        processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
    }
    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;
    if (lastRef !== nextRef) {
        unmountRef(lastRef);
        mountRef(nextRef, dom, lifecycle);
    }
}
function replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle) {
    unmount(lastChildren);
    mountArrayChildren(nextChildren, parentDOM, context, isSVG, findDOMfromVNode(lastChildren, true), lifecycle);
    removeVNodeDOM(lastChildren, parentDOM);
}
function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, parentVNode, lifecycle) {
    switch (lastChildFlags) {
        case 2 /* HasVNodeChildren */:
            switch (nextChildFlags) {
                case 2 /* HasVNodeChildren */:
                    patch(lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    remove(lastChildren, parentDOM);
                    break;
                case 16 /* HasTextChildren */:
                    unmount(lastChildren);
                    setTextContent(parentDOM, nextChildren);
                    break;
                default:
                    replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle);
                    break;
            }
            break;
        case 1 /* HasInvalidChildren */:
            switch (nextChildFlags) {
                case 2 /* HasVNodeChildren */:
                    mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    break;
                case 16 /* HasTextChildren */:
                    setTextContent(parentDOM, nextChildren);
                    break;
                default:
                    mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
            }
            break;
        case 16 /* HasTextChildren */:
            switch (nextChildFlags) {
                case 16 /* HasTextChildren */:
                    patchSingleTextChild(lastChildren, nextChildren, parentDOM);
                    break;
                case 2 /* HasVNodeChildren */:
                    clearDOM(parentDOM);
                    mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    clearDOM(parentDOM);
                    break;
                default:
                    clearDOM(parentDOM);
                    mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
            }
            break;
        default:
            switch (nextChildFlags) {
                case 16 /* HasTextChildren */:
                    unmountAllChildren(lastChildren);
                    setTextContent(parentDOM, nextChildren);
                    break;
                case 2 /* HasVNodeChildren */:
                    removeAllChildren(parentDOM, parentVNode, lastChildren);
                    mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    removeAllChildren(parentDOM, parentVNode, lastChildren);
                    break;
                default:
                    var lastLength = lastChildren.length | 0;
                    var nextLength = nextChildren.length | 0;
                    // Fast path's for both algorithms
                    if (lastLength === 0) {
                        if (nextLength > 0) {
                            mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                        }
                    }
                    else if (nextLength === 0) {
                        removeAllChildren(parentDOM, parentVNode, lastChildren);
                    }
                    else if (nextChildFlags === 8 /* HasKeyedChildren */ && lastChildFlags === 8 /* HasKeyedChildren */) {
                        patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, parentVNode, lifecycle);
                    }
                    else {
                        patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, lifecycle);
                    }
                    break;
            }
            break;
    }
}
function createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle) {
    lifecycle.push(function () {
        instance.componentDidUpdate(lastProps, lastState, snapshot);
    });
}
function updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, force, nextNode, lifecycle) {
    var lastState = instance.state;
    var lastProps = instance.props;
    var usesNewAPI = Boolean(instance.$N);
    var hasSCU = isFunction(instance.shouldComponentUpdate);
    if (usesNewAPI) {
        nextState = createDerivedState(instance, nextProps, nextState !== lastState ? combineFrom(lastState, nextState) : nextState);
    }
    if (force || !hasSCU || (hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context))) {
        if (!usesNewAPI && isFunction(instance.componentWillUpdate)) {
            instance.componentWillUpdate(nextProps, nextState, context);
        }
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
        var snapshot = null;
        var nextInput = renderNewInput(instance, nextProps, context);
        if (usesNewAPI && isFunction(instance.getSnapshotBeforeUpdate)) {
            snapshot = instance.getSnapshotBeforeUpdate(lastProps, lastState);
        }
        patch(instance.$LI, nextInput, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
        // Dont update Last input, until patch has been succesfully executed
        instance.$LI = nextInput;
        if (isFunction(instance.componentDidUpdate)) {
            createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle);
        }
    }
    else {
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
    }
}
function patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = (nextVNode.children = lastVNode.children);
    // If Component has crashed, ignore it to stay functional
    if (isNull(instance)) {
        return;
    }
    instance.$L = lifecycle;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;
    var nextState = instance.state;
    if (!instance.$N) {
        if (isFunction(instance.componentWillReceiveProps)) {
            instance.$BR = true;
            instance.componentWillReceiveProps(nextProps, context);
            // If instance component was removed during its own update do nothing.
            if (instance.$UN) {
                return;
            }
            instance.$BR = false;
        }
        if (!isNull(instance.$PS)) {
            nextState = combineFrom(nextState, instance.$PS);
            instance.$PS = null;
        }
    }
    updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, false, nextNode, lifecycle);
    if (lastRef !== nextRef) {
        unmountRef(lastRef);
        mountRef(nextRef, instance, lifecycle);
    }
}
function patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var shouldUpdate = true;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastProps = lastVNode.props;
    var nextHooksDefined = !isNullOrUndef(nextRef);
    var lastInput = lastVNode.children;
    if (nextHooksDefined && isFunction(nextRef.onComponentShouldUpdate)) {
        shouldUpdate = nextRef.onComponentShouldUpdate(lastProps, nextProps);
    }
    if (shouldUpdate !== false) {
        if (nextHooksDefined && isFunction(nextRef.onComponentWillUpdate)) {
            nextRef.onComponentWillUpdate(lastProps, nextProps);
        }
        var nextInput = normalizeRoot(renderFunctionalComponent(nextVNode, context));
        patch(lastInput, nextInput, parentDOM, context, isSVG, nextNode, lifecycle);
        nextVNode.children = nextInput;
        if (nextHooksDefined && isFunction(nextRef.onComponentDidUpdate)) {
            nextRef.onComponentDidUpdate(lastProps, nextProps);
        }
    }
    else {
        nextVNode.children = lastInput;
    }
}
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = (nextVNode.dom = lastVNode.dom);
    if (nextText !== lastVNode.children) {
        dom.nodeValue = nextText;
    }
}
function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength, nextNode, lifecycle) {
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    var nextChild;
    var lastChild;
    for (; i < commonLength; ++i) {
        nextChild = nextChildren[i];
        lastChild = lastChildren[i];
        if (nextChild.flags & 16384 /* InUse */) {
            nextChild = nextChildren[i] = directClone(nextChild);
        }
        patch(lastChild, nextChild, dom, context, isSVG, nextNode, lifecycle);
        lastChildren[i] = nextChild;
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; ++i) {
            nextChild = nextChildren[i];
            if (nextChild.flags & 16384 /* InUse */) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            mount(nextChild, dom, context, isSVG, nextNode, lifecycle);
        }
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; ++i) {
            remove(lastChildren[i], dom);
        }
    }
}
function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength, outerEdge, parentVNode, lifecycle) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var j = 0;
    var aNode = a[j];
    var bNode = b[j];
    var nextPos;
    var nextNode;
    // Step 1
    // tslint:disable-next-line
    outer: {
        // Sync nodes with the same key at the beginning.
        while (aNode.key === bNode.key) {
            if (bNode.flags & 16384 /* InUse */) {
                b[j] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            a[j] = bNode;
            ++j;
            if (j > aEnd || j > bEnd) {
                break outer;
            }
            aNode = a[j];
            bNode = b[j];
        }
        aNode = a[aEnd];
        bNode = b[bEnd];
        // Sync nodes with the same key at the end.
        while (aNode.key === bNode.key) {
            if (bNode.flags & 16384 /* InUse */) {
                b[bEnd] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            a[aEnd] = bNode;
            aEnd--;
            bEnd--;
            if (j > aEnd || j > bEnd) {
                break outer;
            }
            aNode = a[aEnd];
            bNode = b[bEnd];
        }
    }
    if (j > aEnd) {
        if (j <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge;
            while (j <= bEnd) {
                bNode = b[j];
                if (bNode.flags & 16384 /* InUse */) {
                    b[j] = bNode = directClone(bNode);
                }
                ++j;
                mount(bNode, dom, context, isSVG, nextNode, lifecycle);
            }
        }
    }
    else if (j > bEnd) {
        while (j <= aEnd) {
            remove(a[j++], dom);
        }
    }
    else {
        patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle);
    }
}
function patchKeyedChildrenComplex(a, b, context, aLength, bLength, aEnd, bEnd, j, dom, isSVG, outerEdge, parentVNode, lifecycle) {
    var aNode;
    var bNode;
    var nextPos;
    var i = 0;
    var aStart = j;
    var bStart = j;
    var aLeft = aEnd - j + 1;
    var bLeft = bEnd - j + 1;
    var sources = new Int32Array(bLeft + 1);
    // Keep track if its possible to remove whole DOM using textContent = '';
    var canRemoveWholeContent = aLeft === aLength;
    var moved = false;
    var pos = 0;
    var patched = 0;
    // When sizes are small, just loop them through
    if (bLength < 4 || (aLeft | bLeft) < 32) {
        for (i = aStart; i <= aEnd; ++i) {
            aNode = a[i];
            if (patched < bLeft) {
                for (j = bStart; j <= bEnd; j++) {
                    bNode = b[j];
                    if (aNode.key === bNode.key) {
                        sources[j - bStart] = i + 1;
                        if (canRemoveWholeContent) {
                            canRemoveWholeContent = false;
                            while (aStart < i) {
                                remove(a[aStart++], dom);
                            }
                        }
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.flags & 16384 /* InUse */) {
                            b[j] = bNode = directClone(bNode);
                        }
                        patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
                        ++patched;
                        break;
                    }
                }
                if (!canRemoveWholeContent && j > bEnd) {
                    remove(aNode, dom);
                }
            }
            else if (!canRemoveWholeContent) {
                remove(aNode, dom);
            }
        }
    }
    else {
        var keyIndex = {};
        // Map keys by their index
        for (i = bStart; i <= bEnd; ++i) {
            keyIndex[b[i].key] = i;
        }
        // Try to patch same keys
        for (i = aStart; i <= aEnd; ++i) {
            aNode = a[i];
            if (patched < bLeft) {
                j = keyIndex[aNode.key];
                if (j !== void 0) {
                    if (canRemoveWholeContent) {
                        canRemoveWholeContent = false;
                        while (i > aStart) {
                            remove(a[aStart++], dom);
                        }
                    }
                    sources[j - bStart] = i + 1;
                    if (pos > j) {
                        moved = true;
                    }
                    else {
                        pos = j;
                    }
                    bNode = b[j];
                    if (bNode.flags & 16384 /* InUse */) {
                        b[j] = bNode = directClone(bNode);
                    }
                    patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
                    ++patched;
                }
                else if (!canRemoveWholeContent) {
                    remove(aNode, dom);
                }
            }
            else if (!canRemoveWholeContent) {
                remove(aNode, dom);
            }
        }
    }
    // fast-path: if nothing patched remove all old and add all new
    if (canRemoveWholeContent) {
        removeAllChildren(dom, parentVNode, a);
        mountArrayChildren(b, dom, context, isSVG, outerEdge, lifecycle);
    }
    else if (moved) {
        var seq = lis_algorithm(sources);
        j = seq.length - 1;
        for (i = bLeft - 1; i >= 0; i--) {
            if (sources[i] === 0) {
                pos = i + bStart;
                bNode = b[pos];
                if (bNode.flags & 16384 /* InUse */) {
                    b[pos] = bNode = directClone(bNode);
                }
                nextPos = pos + 1;
                mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
            }
            else if (j < 0 || i !== seq[j]) {
                pos = i + bStart;
                bNode = b[pos];
                nextPos = pos + 1;
                moveVNodeDOM(bNode, dom, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge);
            }
            else {
                j--;
            }
        }
    }
    else if (patched !== bLeft) {
        // when patched count doesn't match b length we need to insert those new ones
        // loop backwards so we can use insertBefore
        for (i = bLeft - 1; i >= 0; i--) {
            if (sources[i] === 0) {
                pos = i + bStart;
                bNode = b[pos];
                if (bNode.flags & 16384 /* InUse */) {
                    b[pos] = bNode = directClone(bNode);
                }
                nextPos = pos + 1;
                mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
            }
        }
    }
}
var result;
var p;
var maxLen = 0;
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var arrI = 0;
    var i = 0;
    var j = 0;
    var k = 0;
    var u = 0;
    var v = 0;
    var c = 0;
    var len = arr.length;
    if (len > maxLen) {
        maxLen = len;
        result = new Int32Array(len);
        p = new Int32Array(len);
    }
    for (; i < len; ++i) {
        arrI = arr[i];
        if (arrI !== 0) {
            j = result[k];
            if (arr[j] < arrI) {
                p[i] = j;
                result[++k] = i;
                continue;
            }
            u = 0;
            v = k;
            while (u < v) {
                c = (u + v) >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = k + 1;
    var seq = new Int32Array(u);
    v = result[u - 1];
    while (u-- > 0) {
        seq[u] = v;
        v = p[v];
        result[u] = 0;
    }
    return seq;
}

var hasDocumentAvailable = typeof document !== 'undefined';
if (hasDocumentAvailable) {
    /*
     * Defining $EV and $V properties on Node.prototype
     * fixes v8 "wrong map" de-optimization
     */
    if (window.Node) {
        Node.prototype.$EV = null;
        Node.prototype.$V = null;
    }
}
function __render(input, parentDOM, callback, context) {
    var lifecycle = [];
    var rootInput = parentDOM.$V;
    renderCheck.v = true;
    if (isNullOrUndef(rootInput)) {
        if (!isNullOrUndef(input)) {
            if (input.flags & 16384 /* InUse */) {
                input = directClone(input);
            }
            mount(input, parentDOM, context, false, null, lifecycle);
            parentDOM.$V = input;
            rootInput = input;
        }
    }
    else {
        if (isNullOrUndef(input)) {
            remove(rootInput, parentDOM);
            parentDOM.$V = null;
        }
        else {
            if (input.flags & 16384 /* InUse */) {
                input = directClone(input);
            }
            patch(rootInput, input, parentDOM, context, false, null, lifecycle);
            rootInput = parentDOM.$V = input;
        }
    }
    callAll(lifecycle);
    renderCheck.v = false;
    if (isFunction(callback)) {
        callback();
    }
    if (isFunction(options.renderComplete)) {
        options.renderComplete(rootInput, parentDOM);
    }
}
function render(input, parentDOM, callback, context) {
    if ( callback === void 0 ) callback = null;
    if ( context === void 0 ) context = EMPTY_OBJ;

    __render(input, parentDOM, callback, context);
}
function createRenderer(parentDOM) {
    return function renderer(lastInput, nextInput, callback, context) {
        if (!parentDOM) {
            parentDOM = lastInput;
        }
        render(nextInput, parentDOM, callback, context);
    };
}

var QUEUE = [];
var nextTick = typeof Promise !== 'undefined'
    ? Promise.resolve().then.bind(Promise.resolve())
    : function (a) {
        window.setTimeout(a, 0);
    };
var microTaskPending = false;
function queueStateChanges(component, newState, callback, force) {
    var pending = component.$PS;
    if (isFunction(newState)) {
        newState = newState(pending ? combineFrom(component.state, pending) : component.state, component.props, component.context);
    }
    if (isNullOrUndef(pending)) {
        component.$PS = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (!component.$BR) {
        if (!renderCheck.v) {
            if (QUEUE.length === 0) {
                applyState(component, force);
                if (isFunction(callback)) {
                    callback.call(component);
                }
                return;
            }
        }
        if (QUEUE.indexOf(component) === -1) {
            QUEUE.push(component);
        }
        if (force) {
            component.$F = true;
        }
        if (!microTaskPending) {
            microTaskPending = true;
            nextTick(rerender);
        }
        if (isFunction(callback)) {
            var QU = component.$QU;
            if (!QU) {
                QU = component.$QU = [];
            }
            QU.push(callback);
        }
    }
    else if (isFunction(callback)) {
        component.$L.push(callback.bind(component));
    }
}
function callSetStateCallbacks(component) {
    var queue = component.$QU;
    for (var i = 0; i < queue.length; ++i) {
        queue[i].call(component);
    }
    component.$QU = null;
}
function rerender() {
    var component;
    microTaskPending = false;
    while ((component = QUEUE.shift())) {
        if (!component.$UN) {
            var force = component.$F;
            component.$F = false;
            applyState(component, force);
            if (component.$QU) {
                callSetStateCallbacks(component);
            }
        }
    }
}
function applyState(component, force) {
    if (force || !component.$BR) {
        var pendingState = component.$PS;
        component.$PS = null;
        var lifecycle = [];
        renderCheck.v = true;
        updateClassComponent(component, combineFrom(component.state, pendingState), component.props, findDOMfromVNode(component.$LI, true).parentNode, component.context, component.$SVG, force, null, lifecycle);
        callAll(lifecycle);
        renderCheck.v = false;
    }
    else {
        component.state = component.$PS;
        component.$PS = null;
    }
}
var Component = function Component(props, context) {
    // Public
    this.state = null;
    // Internal properties
    this.$BR = false; // BLOCK RENDER
    this.$BS = true; // BLOCK STATE
    this.$PS = null; // PENDING STATE (PARTIAL or FULL)
    this.$LI = null; // LAST INPUT
    this.$UN = false; // UNMOUNTED
    this.$CX = null; // CHILDCONTEXT
    this.$QU = null; // QUEUE
    this.$N = false; // Uses new lifecycle API Flag
    this.$L = null; // Current lifecycle of this component
    this.$SVG = false; // Flag to keep track if component is inside SVG tree
    this.$F = false; // Force update flag
    this.props = props || EMPTY_OBJ;
    this.context = context || EMPTY_OBJ; // context should not be mutable
};
Component.prototype.forceUpdate = function forceUpdate (callback) {
    if (this.$UN) {
        return;
    }
    // Do not allow double render during force update
    queueStateChanges(this, {}, callback, true);
};
Component.prototype.setState = function setState (newState, callback) {
    if (this.$UN) {
        return;
    }
    if (!this.$BS) {
        queueStateChanges(this, newState, callback, false);
    }
};
Component.prototype.render = function render (_nextProps, _nextState, _nextContext) {
    return null;
};

var version = "7.4.11";




/***/ }),

/***/ "./node_modules/inferno/index.esm.js":
/*!*******************************************!*\
  !*** ./node_modules/inferno/index.esm.js ***!
  \*******************************************/
/*! exports provided: Component, EMPTY_OBJ, Fragment, _CI, _HI, _M, _MCCC, _ME, _MFCC, _MP, _MR, _RFC, __render, createComponentVNode, createFragment, createPortal, createRef, createRenderer, createTextVNode, createVNode, directClone, findDOMfromVNode, forwardRef, getFlagsForElementVnode, linkEvent, normalizeProps, options, render, rerender, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dist/index.esm.js */ "./node_modules/inferno/dist/index.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EMPTY_OBJ", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["EMPTY_OBJ"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["Fragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_CI", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_CI"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_HI", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_HI"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_M", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_M"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_MCCC", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_MCCC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_ME", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_ME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_MFCC", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_MFCC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_MP", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_MP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_MR", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_MR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_RFC", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["_RFC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__render", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["__render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createComponentVNode", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["createComponentVNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["createFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["createPortal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["createRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRenderer", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["createRenderer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTextVNode", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createVNode", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["createVNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directClone", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["directClone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findDOMfromVNode", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["findDOMfromVNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forwardRef", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["forwardRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFlagsForElementVnode", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["getFlagsForElementVnode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linkEvent", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["linkEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalizeProps", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["normalizeProps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "options", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["options"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["rerender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _dist_index_esm_js__WEBPACK_IMPORTED_MODULE_0__["version"]; });



if (true) {
  console.warn('You are running production build of Inferno in development mode. Use dev:module entry point.');
}


/***/ })

}]);