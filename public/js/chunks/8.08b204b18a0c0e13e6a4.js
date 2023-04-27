(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    [8],
    {
        /***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=script&lang=js&":
            /*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! devextreme-vue/file-manager */ "./node_modules/devextreme-vue/file-manager.js"
                    );
                /* harmony import */ var devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_0___default =
                    /*#__PURE__*/ __webpack_require__.n(
                        devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_0__
                    );
                /* harmony import */ var devextreme_file_management_custom_provider__WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! devextreme/file_management/custom_provider */ "./node_modules/devextreme/esm/file_management/custom_provider.js"
                    );
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    return (
                        (_typeof =
                            "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator
                                ? function (obj) {
                                      return typeof obj;
                                  }
                                : function (obj) {
                                      return obj &&
                                          "function" == typeof Symbol &&
                                          obj.constructor === Symbol &&
                                          obj !== Symbol.prototype
                                          ? "symbol"
                                          : typeof obj;
                                  }),
                        _typeof(obj)
                    );
                }
                function _regeneratorRuntime() {
                    "use strict";
                    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
                        function _regeneratorRuntime() {
                            return exports;
                        };
                    var exports = {},
                        Op = Object.prototype,
                        hasOwn = Op.hasOwnProperty,
                        defineProperty =
                            Object.defineProperty ||
                            function (obj, key, desc) {
                                obj[key] = desc.value;
                            },
                        $Symbol = "function" == typeof Symbol ? Symbol : {},
                        iteratorSymbol = $Symbol.iterator || "@@iterator",
                        asyncIteratorSymbol =
                            $Symbol.asyncIterator || "@@asyncIterator",
                        toStringTagSymbol =
                            $Symbol.toStringTag || "@@toStringTag";
                    function define(obj, key, value) {
                        return (
                            Object.defineProperty(obj, key, {
                                value: value,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                            }),
                            obj[key]
                        );
                    }
                    try {
                        define({}, "");
                    } catch (err) {
                        define = function define(obj, key, value) {
                            return (obj[key] = value);
                        };
                    }
                    function wrap(innerFn, outerFn, self, tryLocsList) {
                        var protoGenerator =
                                outerFn &&
                                outerFn.prototype instanceof Generator
                                    ? outerFn
                                    : Generator,
                            generator = Object.create(protoGenerator.prototype),
                            context = new Context(tryLocsList || []);
                        return (
                            defineProperty(generator, "_invoke", {
                                value: makeInvokeMethod(innerFn, self, context),
                            }),
                            generator
                        );
                    }
                    function tryCatch(fn, obj, arg) {
                        try {
                            return { type: "normal", arg: fn.call(obj, arg) };
                        } catch (err) {
                            return { type: "throw", arg: err };
                        }
                    }
                    exports.wrap = wrap;
                    var ContinueSentinel = {};
                    function Generator() {}
                    function GeneratorFunction() {}
                    function GeneratorFunctionPrototype() {}
                    var IteratorPrototype = {};
                    define(IteratorPrototype, iteratorSymbol, function () {
                        return this;
                    });
                    var getProto = Object.getPrototypeOf,
                        NativeIteratorPrototype =
                            getProto && getProto(getProto(values([])));
                    NativeIteratorPrototype &&
                        NativeIteratorPrototype !== Op &&
                        hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
                        (IteratorPrototype = NativeIteratorPrototype);
                    var Gp =
                        (GeneratorFunctionPrototype.prototype =
                        Generator.prototype =
                            Object.create(IteratorPrototype));
                    function defineIteratorMethods(prototype) {
                        ["next", "throw", "return"].forEach(function (method) {
                            define(prototype, method, function (arg) {
                                return this._invoke(method, arg);
                            });
                        });
                    }
                    function AsyncIterator(generator, PromiseImpl) {
                        function invoke(method, arg, resolve, reject) {
                            var record = tryCatch(
                                generator[method],
                                generator,
                                arg
                            );
                            if ("throw" !== record.type) {
                                var result = record.arg,
                                    value = result.value;
                                return value &&
                                    "object" == _typeof(value) &&
                                    hasOwn.call(value, "__await")
                                    ? PromiseImpl.resolve(value.__await).then(
                                          function (value) {
                                              invoke(
                                                  "next",
                                                  value,
                                                  resolve,
                                                  reject
                                              );
                                          },
                                          function (err) {
                                              invoke(
                                                  "throw",
                                                  err,
                                                  resolve,
                                                  reject
                                              );
                                          }
                                      )
                                    : PromiseImpl.resolve(value).then(
                                          function (unwrapped) {
                                              (result.value = unwrapped),
                                                  resolve(result);
                                          },
                                          function (error) {
                                              return invoke(
                                                  "throw",
                                                  error,
                                                  resolve,
                                                  reject
                                              );
                                          }
                                      );
                            }
                            reject(record.arg);
                        }
                        var previousPromise;
                        defineProperty(this, "_invoke", {
                            value: function value(method, arg) {
                                function callInvokeWithMethodAndArg() {
                                    return new PromiseImpl(function (
                                        resolve,
                                        reject
                                    ) {
                                        invoke(method, arg, resolve, reject);
                                    });
                                }
                                return (previousPromise = previousPromise
                                    ? previousPromise.then(
                                          callInvokeWithMethodAndArg,
                                          callInvokeWithMethodAndArg
                                      )
                                    : callInvokeWithMethodAndArg());
                            },
                        });
                    }
                    function makeInvokeMethod(innerFn, self, context) {
                        var state = "suspendedStart";
                        return function (method, arg) {
                            if ("executing" === state)
                                throw new Error("Generator is already running");
                            if ("completed" === state) {
                                if ("throw" === method) throw arg;
                                return doneResult();
                            }
                            for (
                                context.method = method, context.arg = arg;
                                ;

                            ) {
                                var delegate = context.delegate;
                                if (delegate) {
                                    var delegateResult = maybeInvokeDelegate(
                                        delegate,
                                        context
                                    );
                                    if (delegateResult) {
                                        if (delegateResult === ContinueSentinel)
                                            continue;
                                        return delegateResult;
                                    }
                                }
                                if ("next" === context.method)
                                    context.sent = context._sent = context.arg;
                                else if ("throw" === context.method) {
                                    if ("suspendedStart" === state)
                                        throw (
                                            ((state = "completed"), context.arg)
                                        );
                                    context.dispatchException(context.arg);
                                } else
                                    "return" === context.method &&
                                        context.abrupt("return", context.arg);
                                state = "executing";
                                var record = tryCatch(innerFn, self, context);
                                if ("normal" === record.type) {
                                    if (
                                        ((state = context.done
                                            ? "completed"
                                            : "suspendedYield"),
                                        record.arg === ContinueSentinel)
                                    )
                                        continue;
                                    return {
                                        value: record.arg,
                                        done: context.done,
                                    };
                                }
                                "throw" === record.type &&
                                    ((state = "completed"),
                                    (context.method = "throw"),
                                    (context.arg = record.arg));
                            }
                        };
                    }
                    function maybeInvokeDelegate(delegate, context) {
                        var methodName = context.method,
                            method = delegate.iterator[methodName];
                        if (undefined === method)
                            return (
                                (context.delegate = null),
                                ("throw" === methodName &&
                                    delegate.iterator["return"] &&
                                    ((context.method = "return"),
                                    (context.arg = undefined),
                                    maybeInvokeDelegate(delegate, context),
                                    "throw" === context.method)) ||
                                    ("return" !== methodName &&
                                        ((context.method = "throw"),
                                        (context.arg = new TypeError(
                                            "The iterator does not provide a '" +
                                                methodName +
                                                "' method"
                                        )))),
                                ContinueSentinel
                            );
                        var record = tryCatch(
                            method,
                            delegate.iterator,
                            context.arg
                        );
                        if ("throw" === record.type)
                            return (
                                (context.method = "throw"),
                                (context.arg = record.arg),
                                (context.delegate = null),
                                ContinueSentinel
                            );
                        var info = record.arg;
                        return info
                            ? info.done
                                ? ((context[delegate.resultName] = info.value),
                                  (context.next = delegate.nextLoc),
                                  "return" !== context.method &&
                                      ((context.method = "next"),
                                      (context.arg = undefined)),
                                  (context.delegate = null),
                                  ContinueSentinel)
                                : info
                            : ((context.method = "throw"),
                              (context.arg = new TypeError(
                                  "iterator result is not an object"
                              )),
                              (context.delegate = null),
                              ContinueSentinel);
                    }
                    function pushTryEntry(locs) {
                        var entry = { tryLoc: locs[0] };
                        1 in locs && (entry.catchLoc = locs[1]),
                            2 in locs &&
                                ((entry.finallyLoc = locs[2]),
                                (entry.afterLoc = locs[3])),
                            this.tryEntries.push(entry);
                    }
                    function resetTryEntry(entry) {
                        var record = entry.completion || {};
                        (record.type = "normal"),
                            delete record.arg,
                            (entry.completion = record);
                    }
                    function Context(tryLocsList) {
                        (this.tryEntries = [{ tryLoc: "root" }]),
                            tryLocsList.forEach(pushTryEntry, this),
                            this.reset(!0);
                    }
                    function values(iterable) {
                        if (iterable) {
                            var iteratorMethod = iterable[iteratorSymbol];
                            if (iteratorMethod)
                                return iteratorMethod.call(iterable);
                            if ("function" == typeof iterable.next)
                                return iterable;
                            if (!isNaN(iterable.length)) {
                                var i = -1,
                                    next = function next() {
                                        for (; ++i < iterable.length; )
                                            if (hasOwn.call(iterable, i))
                                                return (
                                                    (next.value = iterable[i]),
                                                    (next.done = !1),
                                                    next
                                                );
                                        return (
                                            (next.value = undefined),
                                            (next.done = !0),
                                            next
                                        );
                                    };
                                return (next.next = next);
                            }
                        }
                        return { next: doneResult };
                    }
                    function doneResult() {
                        return { value: undefined, done: !0 };
                    }
                    return (
                        (GeneratorFunction.prototype =
                            GeneratorFunctionPrototype),
                        defineProperty(Gp, "constructor", {
                            value: GeneratorFunctionPrototype,
                            configurable: !0,
                        }),
                        defineProperty(
                            GeneratorFunctionPrototype,
                            "constructor",
                            { value: GeneratorFunction, configurable: !0 }
                        ),
                        (GeneratorFunction.displayName = define(
                            GeneratorFunctionPrototype,
                            toStringTagSymbol,
                            "GeneratorFunction"
                        )),
                        (exports.isGeneratorFunction = function (genFun) {
                            var ctor =
                                "function" == typeof genFun &&
                                genFun.constructor;
                            return (
                                !!ctor &&
                                (ctor === GeneratorFunction ||
                                    "GeneratorFunction" ===
                                        (ctor.displayName || ctor.name))
                            );
                        }),
                        (exports.mark = function (genFun) {
                            return (
                                Object.setPrototypeOf
                                    ? Object.setPrototypeOf(
                                          genFun,
                                          GeneratorFunctionPrototype
                                      )
                                    : ((genFun.__proto__ =
                                          GeneratorFunctionPrototype),
                                      define(
                                          genFun,
                                          toStringTagSymbol,
                                          "GeneratorFunction"
                                      )),
                                (genFun.prototype = Object.create(Gp)),
                                genFun
                            );
                        }),
                        (exports.awrap = function (arg) {
                            return { __await: arg };
                        }),
                        defineIteratorMethods(AsyncIterator.prototype),
                        define(
                            AsyncIterator.prototype,
                            asyncIteratorSymbol,
                            function () {
                                return this;
                            }
                        ),
                        (exports.AsyncIterator = AsyncIterator),
                        (exports.async = function (
                            innerFn,
                            outerFn,
                            self,
                            tryLocsList,
                            PromiseImpl
                        ) {
                            void 0 === PromiseImpl && (PromiseImpl = Promise);
                            var iter = new AsyncIterator(
                                wrap(innerFn, outerFn, self, tryLocsList),
                                PromiseImpl
                            );
                            return exports.isGeneratorFunction(outerFn)
                                ? iter
                                : iter.next().then(function (result) {
                                      return result.done
                                          ? result.value
                                          : iter.next();
                                  });
                        }),
                        defineIteratorMethods(Gp),
                        define(Gp, toStringTagSymbol, "Generator"),
                        define(Gp, iteratorSymbol, function () {
                            return this;
                        }),
                        define(Gp, "toString", function () {
                            return "[object Generator]";
                        }),
                        (exports.keys = function (val) {
                            var object = Object(val),
                                keys = [];
                            for (var key in object) keys.push(key);
                            return (
                                keys.reverse(),
                                function next() {
                                    for (; keys.length; ) {
                                        var key = keys.pop();
                                        if (key in object)
                                            return (
                                                (next.value = key),
                                                (next.done = !1),
                                                next
                                            );
                                    }
                                    return (next.done = !0), next;
                                }
                            );
                        }),
                        (exports.values = values),
                        (Context.prototype = {
                            constructor: Context,
                            reset: function reset(skipTempReset) {
                                if (
                                    ((this.prev = 0),
                                    (this.next = 0),
                                    (this.sent = this._sent = undefined),
                                    (this.done = !1),
                                    (this.delegate = null),
                                    (this.method = "next"),
                                    (this.arg = undefined),
                                    this.tryEntries.forEach(resetTryEntry),
                                    !skipTempReset)
                                )
                                    for (var name in this)
                                        "t" === name.charAt(0) &&
                                            hasOwn.call(this, name) &&
                                            !isNaN(+name.slice(1)) &&
                                            (this[name] = undefined);
                            },
                            stop: function stop() {
                                this.done = !0;
                                var rootRecord = this.tryEntries[0].completion;
                                if ("throw" === rootRecord.type)
                                    throw rootRecord.arg;
                                return this.rval;
                            },
                            dispatchException: function dispatchException(
                                exception
                            ) {
                                if (this.done) throw exception;
                                var context = this;
                                function handle(loc, caught) {
                                    return (
                                        (record.type = "throw"),
                                        (record.arg = exception),
                                        (context.next = loc),
                                        caught &&
                                            ((context.method = "next"),
                                            (context.arg = undefined)),
                                        !!caught
                                    );
                                }
                                for (
                                    var i = this.tryEntries.length - 1;
                                    i >= 0;
                                    --i
                                ) {
                                    var entry = this.tryEntries[i],
                                        record = entry.completion;
                                    if ("root" === entry.tryLoc)
                                        return handle("end");
                                    if (entry.tryLoc <= this.prev) {
                                        var hasCatch = hasOwn.call(
                                                entry,
                                                "catchLoc"
                                            ),
                                            hasFinally = hasOwn.call(
                                                entry,
                                                "finallyLoc"
                                            );
                                        if (hasCatch && hasFinally) {
                                            if (this.prev < entry.catchLoc)
                                                return handle(
                                                    entry.catchLoc,
                                                    !0
                                                );
                                            if (this.prev < entry.finallyLoc)
                                                return handle(entry.finallyLoc);
                                        } else if (hasCatch) {
                                            if (this.prev < entry.catchLoc)
                                                return handle(
                                                    entry.catchLoc,
                                                    !0
                                                );
                                        } else {
                                            if (!hasFinally)
                                                throw new Error(
                                                    "try statement without catch or finally"
                                                );
                                            if (this.prev < entry.finallyLoc)
                                                return handle(entry.finallyLoc);
                                        }
                                    }
                                }
                            },
                            abrupt: function abrupt(type, arg) {
                                for (
                                    var i = this.tryEntries.length - 1;
                                    i >= 0;
                                    --i
                                ) {
                                    var entry = this.tryEntries[i];
                                    if (
                                        entry.tryLoc <= this.prev &&
                                        hasOwn.call(entry, "finallyLoc") &&
                                        this.prev < entry.finallyLoc
                                    ) {
                                        var finallyEntry = entry;
                                        break;
                                    }
                                }
                                finallyEntry &&
                                    ("break" === type || "continue" === type) &&
                                    finallyEntry.tryLoc <= arg &&
                                    arg <= finallyEntry.finallyLoc &&
                                    (finallyEntry = null);
                                var record = finallyEntry
                                    ? finallyEntry.completion
                                    : {};
                                return (
                                    (record.type = type),
                                    (record.arg = arg),
                                    finallyEntry
                                        ? ((this.method = "next"),
                                          (this.next = finallyEntry.finallyLoc),
                                          ContinueSentinel)
                                        : this.complete(record)
                                );
                            },
                            complete: function complete(record, afterLoc) {
                                if ("throw" === record.type) throw record.arg;
                                return (
                                    "break" === record.type ||
                                    "continue" === record.type
                                        ? (this.next = record.arg)
                                        : "return" === record.type
                                        ? ((this.rval = this.arg = record.arg),
                                          (this.method = "return"),
                                          (this.next = "end"))
                                        : "normal" === record.type &&
                                          afterLoc &&
                                          (this.next = afterLoc),
                                    ContinueSentinel
                                );
                            },
                            finish: function finish(finallyLoc) {
                                for (
                                    var i = this.tryEntries.length - 1;
                                    i >= 0;
                                    --i
                                ) {
                                    var entry = this.tryEntries[i];
                                    if (entry.finallyLoc === finallyLoc)
                                        return (
                                            this.complete(
                                                entry.completion,
                                                entry.afterLoc
                                            ),
                                            resetTryEntry(entry),
                                            ContinueSentinel
                                        );
                                }
                            },
                            catch: function _catch(tryLoc) {
                                for (
                                    var i = this.tryEntries.length - 1;
                                    i >= 0;
                                    --i
                                ) {
                                    var entry = this.tryEntries[i];
                                    if (entry.tryLoc === tryLoc) {
                                        var record = entry.completion;
                                        if ("throw" === record.type) {
                                            var thrown = record.arg;
                                            resetTryEntry(entry);
                                        }
                                        return thrown;
                                    }
                                }
                                throw new Error("illegal catch attempt");
                            },
                            delegateYield: function delegateYield(
                                iterable,
                                resultName,
                                nextLoc
                            ) {
                                return (
                                    (this.delegate = {
                                        iterator: values(iterable),
                                        resultName: resultName,
                                        nextLoc: nextLoc,
                                    }),
                                    "next" === this.method &&
                                        (this.arg = undefined),
                                    ContinueSentinel
                                );
                            },
                        }),
                        exports
                    );
                }
                function asyncGeneratorStep(
                    gen,
                    resolve,
                    reject,
                    _next,
                    _throw,
                    key,
                    arg
                ) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }
                    if (info.done) {
                        resolve(value);
                    } else {
                        Promise.resolve(value).then(_next, _throw);
                    }
                }
                function _asyncToGenerator(fn) {
                    return function () {
                        var self = this,
                            args = arguments;
                        return new Promise(function (resolve, reject) {
                            var gen = fn.apply(self, args);
                            function _next(value) {
                                asyncGeneratorStep(
                                    gen,
                                    resolve,
                                    reject,
                                    _next,
                                    _throw,
                                    "next",
                                    value
                                );
                            }
                            function _throw(err) {
                                asyncGeneratorStep(
                                    gen,
                                    resolve,
                                    reject,
                                    _next,
                                    _throw,
                                    "throw",
                                    err
                                );
                            }
                            _next(undefined);
                        });
                    };
                }

                /* harmony default export */ __webpack_exports__["default"] = {
                    components: {
                        DxFileManager:
                            devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_0__[
                                "DxFileManager"
                            ],
                    },
                    data: function data() {
                        return {
                            fileSystemProvider:
                                new devextreme_file_management_custom_provider__WEBPACK_IMPORTED_MODULE_1__[
                                    "default"
                                ]({
                                    getItems: this.getItems,
                                    createDirectory: this.createDirectory,
                                    renameItem: this.renameItem,
                                    deleteItem: this.deleteItem,
                                    copyItem: this.copyItem,
                                    moveItem: this.moveItem,
                                    uploadFileChunk: this.uploadFileChunk,
                                }),
                            currentFolderItems: [],
                        };
                    },
                    props: {
                        clientPath: {
                            type: String,
                            default: "",
                        },
                    },
                    computed: {
                        fileManager: function fileManager() {
                            return this.$refs.fileManager.instance;
                        },
                    },
                    watch: {
                        clientPath: function clientPath() {
                            this.fileManager.refresh();
                        },
                    },
                    methods: {
                        getItems: function getItems(parentDirectory) {
                            var _this = this;
                            return new Promise(function (resolve, reject) {
                                axios
                                    .get(
                                        "settings/files/getItems?clientPath="
                                            .concat(_this.clientPath, "&path=")
                                            .concat(parentDirectory.path)
                                    )
                                    .then(function (response) {
                                        // console.log(response.data);
                                        resolve(response.data);
                                        _this.currentFolderItems =
                                            response.data;
                                    });
                            });
                        },
                        createDirectory: function createDirectory(
                            parentDirectory,
                            name
                        ) {
                            var _this2 = this;
                            return new Promise(function (resolve, reject) {
                                axios
                                    .post("settings/files/createDirectory", {
                                        clientPath: _this2.clientPath,
                                        path: parentDirectory.path,
                                        name: name,
                                    })
                                    .then(function (response) {
                                        // console.log(response.data);
                                        if (response.data) resolve();
                                        else reject();
                                    });
                            });
                        },
                        renameItem: function renameItem(item, newName) {
                            var _this3 = this;
                            return new Promise(function (resolve, reject) {
                                axios
                                    .post("settings/files/renameItem", {
                                        clientPath: _this3.clientPath,
                                        path: item.parentPath,
                                        oldName: item.name,
                                        newName: newName,
                                    })
                                    .then(function (response) {
                                        // console.log(response.data);
                                        if (response.data) resolve();
                                        else reject();
                                    });
                            });
                        },
                        deleteItem: function deleteItem(item) {
                            var _this4 = this;
                            return new Promise(function (resolve, reject) {
                                axios
                                    .post("settings/files/deleteItem", {
                                        clientPath: _this4.clientPath,
                                        path: item.path,
                                        isDirectory: item.isDirectory,
                                    })
                                    .then(function (response) {
                                        // console.log(response.data);
                                        if (response.data) resolve();
                                        else reject();
                                    });
                            });
                        },
                        copyItem: function copyItem(
                            item,
                            destinationDirectory
                        ) {
                            var _this5 = this;
                            return new Promise(function (resolve, reject) {
                                axios
                                    .post("settings/files/copyItem", {
                                        clientPath: _this5.clientPath,
                                        fromPath: item.parentPath,
                                        toPath: destinationDirectory.path,
                                        name: item.name,
                                    })
                                    .then(function (response) {
                                        // console.log(response.data);
                                        if (response.data) resolve();
                                        else reject();
                                    });
                                resolve();
                            });
                        },
                        moveItem: function moveItem(
                            item,
                            destinationDirectory
                        ) {
                            var _this6 = this;
                            return new Promise(function (resolve, reject) {
                                axios
                                    .post("settings/files/moveItem", {
                                        clientPath: _this6.clientPath,
                                        fromPath: item.parentPath,
                                        toPath: destinationDirectory.path,
                                        name: item.name,
                                    })
                                    .then(function (response) {
                                        // console.log(response.data);
                                        if (response.data) resolve();
                                        else reject();
                                    });
                                resolve();
                            });
                        },
                        uploadFileChunk: function uploadFileChunk(
                            file,
                            uploadInfo,
                            destinationDirectory
                        ) {
                            var _this7 = this;
                            return _asyncToGenerator(
                                /*#__PURE__*/ _regeneratorRuntime().mark(
                                    function _callee() {
                                        var fileName, config;
                                        return _regeneratorRuntime().wrap(
                                            function _callee$(_context) {
                                                while (1)
                                                    switch (
                                                        (_context.prev =
                                                            _context.next)
                                                    ) {
                                                        case 0:
                                                            fileName =
                                                                file.name;
                                                            if (
                                                                !file.type.match(
                                                                    /image.*/
                                                                )
                                                            ) {
                                                                _context.next = 6;
                                                                break;
                                                            }
                                                            config = {
                                                                file: file,
                                                                maxSize:
                                                                    _this7.$mc
                                                                        .MAX_SIZE_IMAGE_UPLOAD,
                                                            };
                                                            _context.next = 5;
                                                            return _this7.$mf.resizeImage(
                                                                config
                                                            );
                                                        case 5:
                                                            file =
                                                                _context.sent;
                                                        case 6:
                                                            return _context.abrupt(
                                                                "return",
                                                                new Promise(
                                                                    function (
                                                                        resolve,
                                                                        reject
                                                                    ) {
                                                                        var formData =
                                                                            new FormData();
                                                                        formData.append(
                                                                            "clientPath",
                                                                            _this7.clientPath
                                                                        );
                                                                        formData.append(
                                                                            "file",
                                                                            file
                                                                        );
                                                                        formData.append(
                                                                            "name",
                                                                            fileName
                                                                        );
                                                                        formData.append(
                                                                            "path",
                                                                            destinationDirectory.path
                                                                        );
                                                                        axios
                                                                            .post(
                                                                                "settings/files/uploadFileChunk",
                                                                                formData,
                                                                                {
                                                                                    headers:
                                                                                        {
                                                                                            "Content-Type":
                                                                                                "multipart/form-data",
                                                                                        },
                                                                                }
                                                                            )
                                                                            .then(
                                                                                function (
                                                                                    response
                                                                                ) {
                                                                                    // console.log(response.data);
                                                                                    if (
                                                                                        response.data
                                                                                    )
                                                                                        resolve();
                                                                                    else
                                                                                        reject();
                                                                                }
                                                                            );
                                                                    }
                                                                )
                                                            );
                                                        case 7:
                                                        case "end":
                                                            return _context.stop();
                                                    }
                                            },
                                            _callee
                                        );
                                    }
                                )
                            )();
                        },
                        copyUrl: function copyUrl() {
                            var _this8 = this;
                            var items = this.fileManager.getSelectedItems();
                            if (items.length > 1)
                                this.$toasted.info(
                                    this.$t("settings.files.messages.multiFile")
                                );
                            else if (items[0].isDirectory)
                                this.$toasted.info(
                                    this.$t("settings.files.messages.notIsFile")
                                );
                            else {
                                var text = ""
                                    .concat(window.baseURL, "/storage/")
                                    .concat(this.clientPath, "/")
                                    .concat(items[0].path);
                                navigator.clipboard.writeText(text).then(
                                    function () {
                                        _this8.$toasted.success(
                                            _this8.$t(
                                                "settings.files.messages.copiedUrl"
                                            )
                                        );
                                        _this8.$emit("copiedUrl", text);
                                    },
                                    function (err) {
                                        return _this8.$toasted.error(
                                            _this8.$t(
                                                "settings.files.messages.notCopiedUrl"
                                            ) +
                                                "<br>ERROR: " +
                                                err
                                        );
                                    }
                                );
                            }
                        },
                        onSelectedFileOpened: function onSelectedFileOpened(
                            _ref
                        ) {
                            var _this9 = this;
                            var file = _ref.file;
                            if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                                var items = this.currentFolderItems.reduce(
                                    function (imgs, f) {
                                        if (!f.isDirectory)
                                            imgs.push({
                                                src: ""
                                                    .concat(
                                                        window.baseURL,
                                                        "/storage/"
                                                    )
                                                    .concat(
                                                        _this9.clientPath,
                                                        "/"
                                                    )
                                                    .concat(
                                                        file.parentPath,
                                                        "/"
                                                    )
                                                    .concat(f.name),
                                                title: f.name,
                                            });
                                        return imgs;
                                    },
                                    []
                                );
                                var pswp = this.$Pswp.open({
                                    items: items,
                                    options: {
                                        index: items.findIndex(function (item) {
                                            return item.src.includes(file.name);
                                        }),
                                    },
                                });
                                pswp.listen("close", function () {
                                    return _this9.$mf.popRouteHistoryState();
                                });
                                this.$mf.pushPhotoswipeToHistoryState(pswp);
                            } else
                                this.$toasted.info(
                                    this.$t(
                                        "settings.files.messages.notIsImage"
                                    )
                                );
                        },
                        onErrorOccurred: function onErrorOccurred(e) {
                            var _this10 = this;
                            setTimeout(function () {
                                return _this10.fileManager.repaint();
                            }, 3000);
                        },
                    },
                };

                /***/
            },

        /***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&":
            /*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6& ***!
  \********************************************************************************************************************************************************************************************************************************************/
            /*! exports provided: render, staticRenderFns */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    "render",
                    function () {
                        return render;
                    }
                );
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    "staticRenderFns",
                    function () {
                        return staticRenderFns;
                    }
                );
                var render = function render() {
                    var _vm = this,
                        _c = _vm._self._c;
                    return _c("DxFileManager", {
                        ref: "fileManager",
                        attrs: {
                            "file-system-provider": _vm.fileSystemProvider,
                            permissions: {
                                create: true,
                                copy: true,
                                move: true,
                                delete: true,
                                rename: true,
                                upload: true,
                            },
                            itemView: {
                                mode: "thumbnails",
                            },
                            toolbar: {
                                fileSelectionItems: [
                                    {
                                        widget: "dxButton",
                                        options: {
                                            text: _vm.$t(
                                                "settings.files.copyUrl"
                                            ),
                                            hint: _vm.$t(
                                                "settings.files.copyUrl"
                                            ),
                                            icon: "link",
                                        },
                                        location: "before",
                                        onClick: _vm.copyUrl,
                                    },
                                    "separator",
                                    "move",
                                    "copy",
                                    "rename",
                                    "separator",
                                    "delete",
                                    "clearSelection",
                                ],
                            },
                        },
                        on: {
                            errorOccurred: _vm.onErrorOccurred,
                            selectedFileOpened: _vm.onSelectedFileOpened,
                        },
                    });
                };
                var staticRenderFns = [];
                render._withStripped = true;

                /***/
            },

        /***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss&":
            /*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
            /*! no static exports found */
            /***/ function (module, exports, __webpack_require__) {
                exports = module.exports = __webpack_require__(
                    /*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js"
                )(false);
                // imports

                // module
                exports.push([
                    module.i,
                    ".dx-filemanager .dx-drawer-panel-content.dx-visibility-change-handler {\n  visibility: hidden;\n}\n.dx-filemanager .dx-drawer-shader {\n  visibility: hidden !important;\n}",
                    "",
                ]);

                // exports

                /***/
            },

        /***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss&":
            /*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
            /*! no static exports found */
            /***/ function (module, exports, __webpack_require__) {
                var content = __webpack_require__(
                    /*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss&"
                );

                if (typeof content === "string")
                    content = [[module.i, content, ""]];

                var transform;
                var insertInto;

                var options = { hmr: true };

                options.transform = transform;
                options.insertInto = undefined;

                var update = __webpack_require__(
                    /*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js"
                )(content, options);

                if (content.locals) module.exports = content.locals;

                if (false) {
                }

                /***/
            },

        /***/ "./resources/js/components/FileManager.vue":
            /*!*************************************************!*\
  !*** ./resources/js/components/FileManager.vue ***!
  \*************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! ./FileManager.vue?vue&type=template&id=6a1d18f6& */ "./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&"
                    );
                /* harmony import */ var _FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! ./FileManager.vue?vue&type=script&lang=js& */ "./resources/js/components/FileManager.vue?vue&type=script&lang=js&"
                    );
                /* empty/unused harmony star reexport */ /* harmony import */ var _FileManager_vue_vue_type_style_index_0_id_6a1d18f6_lang_scss___WEBPACK_IMPORTED_MODULE_2__ =
                    __webpack_require__(
                        /*! ./FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss& */ "./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss&"
                    );
                /* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ =
                    __webpack_require__(
                        /*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js"
                    );

                /* normalize component */

                var component = Object(
                    _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[
                        "default"
                    ]
                )(
                    _FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[
                        "default"
                    ],
                    _FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__[
                        "render"
                    ],
                    _FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__[
                        "staticRenderFns"
                    ],
                    false,
                    null,
                    null,
                    null
                );

                /* hot reload */
                if (false) {
                    var api;
                }
                component.options.__file =
                    "resources/js/components/FileManager.vue";
                /* harmony default export */ __webpack_exports__["default"] =
                    component.exports;

                /***/
            },

        /***/ "./resources/js/components/FileManager.vue?vue&type=script&lang=js&":
            /*!**************************************************************************!*\
  !*** ./resources/js/components/FileManager.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=script&lang=js&"
                    );
                /* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[
                    "default"
                ] =
                    _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[
                        "default"
                    ];

                /***/
            },

        /***/ "./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss&":
            /*!***********************************************************************************************!*\
  !*** ./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss& ***!
  \***********************************************************************************************/
            /*! no static exports found */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_6a1d18f6_lang_scss___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&id=6a1d18f6&lang=scss&"
                    );
                /* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_6a1d18f6_lang_scss___WEBPACK_IMPORTED_MODULE_0___default =
                    /*#__PURE__*/ __webpack_require__.n(
                        _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_6a1d18f6_lang_scss___WEBPACK_IMPORTED_MODULE_0__
                    );
                /* harmony reexport (unknown) */ for (var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_6a1d18f6_lang_scss___WEBPACK_IMPORTED_MODULE_0__)
                    if (["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0)
                        (function (key) {
                            __webpack_require__.d(
                                __webpack_exports__,
                                key,
                                function () {
                                    return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_id_6a1d18f6_lang_scss___WEBPACK_IMPORTED_MODULE_0__[
                                        key
                                    ];
                                }
                            );
                        })(__WEBPACK_IMPORT_KEY__);

                /***/
            },

        /***/ "./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&":
            /*!********************************************************************************!*\
  !*** ./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6& ***!
  \********************************************************************************/
            /*! exports provided: render, staticRenderFns */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=template&id=6a1d18f6& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&"
                    );
                /* harmony reexport (safe) */ __webpack_require__.d(
                    __webpack_exports__,
                    "render",
                    function () {
                        return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__[
                            "render"
                        ];
                    }
                );

                /* harmony reexport (safe) */ __webpack_require__.d(
                    __webpack_exports__,
                    "staticRenderFns",
                    function () {
                        return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__[
                            "staticRenderFns"
                        ];
                    }
                );

                /***/
            },
    },
]);
