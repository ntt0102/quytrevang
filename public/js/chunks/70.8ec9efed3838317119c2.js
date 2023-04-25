(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[70],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/file-manager */ "./node_modules/devextreme-vue/file-manager.js");
/* harmony import */ var devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var devextreme_file_management_custom_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! devextreme/file_management/custom_provider */ "./node_modules/devextreme/esm/file_management/custom_provider.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxFileManager: devextreme_vue_file_manager__WEBPACK_IMPORTED_MODULE_1__["DxFileManager"]
  },
  data: function data() {
    return {
      fileSystemProvider: new devextreme_file_management_custom_provider__WEBPACK_IMPORTED_MODULE_2__["default"]({
        getItems: this.getItems,
        createDirectory: this.createDirectory,
        renameItem: this.renameItem,
        deleteItem: this.deleteItem,
        copyItem: this.copyItem,
        moveItem: this.moveItem,
        uploadFileChunk: this.uploadFileChunk
      }),
      currentFolderItems: []
    };
  },
  props: {
    clientPath: {
      type: String,
      "default": ""
    }
  },
  computed: {
    fileManager: function fileManager() {
      return this.$refs.fileManager.instance;
    }
  },
  watch: {
    clientPath: function clientPath() {
      this.fileManager.refresh();
    }
  },
  methods: {
    getItems: function getItems(parentDirectory) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        axios.get("settings/files/getItems?clientPath=".concat(_this.clientPath, "&path=").concat(parentDirectory.path)).then(function (response) {
          // console.log(response.data);
          resolve(response.data);
          _this.currentFolderItems = response.data;
        });
      });
    },
    createDirectory: function createDirectory(parentDirectory, name) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        axios.post("settings/files/createDirectory", {
          clientPath: _this2.clientPath,
          path: parentDirectory.path,
          name: name
        }).then(function (response) {
          // console.log(response.data);
          if (response.data) resolve();else reject();
        });
      });
    },
    renameItem: function renameItem(item, newName) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        axios.post("settings/files/renameItem", {
          clientPath: _this3.clientPath,
          path: item.parentPath,
          oldName: item.name,
          newName: newName
        }).then(function (response) {
          // console.log(response.data);
          if (response.data) resolve();else reject();
        });
      });
    },
    deleteItem: function deleteItem(item) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        axios.post("settings/files/deleteItem", {
          clientPath: _this4.clientPath,
          path: item.path,
          isDirectory: item.isDirectory
        }).then(function (response) {
          // console.log(response.data);
          if (response.data) resolve();else reject();
        });
      });
    },
    copyItem: function copyItem(item, destinationDirectory) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        axios.post("settings/files/copyItem", {
          clientPath: _this5.clientPath,
          fromPath: item.parentPath,
          toPath: destinationDirectory.path,
          name: item.name
        }).then(function (response) {
          // console.log(response.data);
          if (response.data) resolve();else reject();
        });
        resolve();
      });
    },
    moveItem: function moveItem(item, destinationDirectory) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        axios.post("settings/files/moveItem", {
          clientPath: _this6.clientPath,
          fromPath: item.parentPath,
          toPath: destinationDirectory.path,
          name: item.name
        }).then(function (response) {
          // console.log(response.data);
          if (response.data) resolve();else reject();
        });
        resolve();
      });
    },
    uploadFileChunk: function uploadFileChunk(file, uploadInfo, destinationDirectory) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var fileName, config;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fileName = file.name;

                if (!file.type.match(/image.*/)) {
                  _context.next = 6;
                  break;
                }

                config = {
                  file: file,
                  maxSize: _this7.$mc.MAX_SIZE_IMAGE_UPLOAD
                };
                _context.next = 5;
                return _this7.$mf.resizeImage(config);

              case 5:
                file = _context.sent;

              case 6:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var formData = new FormData();
                  formData.append("clientPath", _this7.clientPath);
                  formData.append("file", file);
                  formData.append("name", fileName);
                  formData.append("path", destinationDirectory.path);
                  axios.post("settings/files/uploadFileChunk", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                  }).then(function (response) {
                    // console.log(response.data);
                    if (response.data) resolve();else reject();
                  });
                }));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    copyUrl: function copyUrl() {
      var _this8 = this;

      var items = this.fileManager.getSelectedItems();
      if (items.length > 1) this.$toasted.info(this.$t("admin.settings.files.messages.multiFile"));else if (items[0].isDirectory) this.$toasted.info(this.$t("admin.settings.files.messages.notIsFile"));else {
        var text = "".concat(window.baseURL, "/storage/").concat(this.clientPath, "/").concat(items[0].path);
        navigator.clipboard.writeText(text).then(function () {
          _this8.$toasted.success(_this8.$t("admin.settings.files.messages.copiedUrl"));

          _this8.$emit("copiedUrl", text);
        }, function (err) {
          return _this8.$toasted.error(_this8.$t("admin.settings.files.messages.notCopiedUrl") + "<br>ERROR: " + err);
        });
      }
    },
    onSelectedFileOpened: function onSelectedFileOpened(_ref) {
      var _this9 = this;

      var file = _ref.file;

      if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
        var items = this.currentFolderItems.reduce(function (imgs, f) {
          if (!f.isDirectory) imgs.push({
            src: "".concat(window.baseURL, "/storage/").concat(_this9.clientPath, "/").concat(file.parentPath, "/").concat(f.name),
            title: f.name
          });
          return imgs;
        }, []);
        var pswp = this.$Pswp.open({
          items: items,
          options: {
            index: items.findIndex(function (item) {
              return item.src.includes(file.name);
            })
          }
        });
        pswp.listen("close", function () {
          return _this9.$mf.popRouteHistoryState();
        });
        this.$mf.pushPhotoswipeToHistoryState(pswp);
      } else this.$toasted.info(this.$t("admin.settings.files.messages.notIsImage"));
    },
    onErrorOccurred: function onErrorOccurred(e) {
      var _this10 = this;

      setTimeout(function () {
        return _this10.fileManager.repaint();
      }, 3000);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dx-filemanager .dx-drawer-panel-content.dx-visibility-change-handler {\n  visibility: hidden;\n}\n.dx-filemanager .dx-drawer-shader {\n  visibility: hidden !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
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
        upload: true
      },
      itemView: { mode: "thumbnails" },
      toolbar: {
        fileSelectionItems: [
          {
            widget: "dxButton",
            options: {
              text: _vm.$t("admin.settings.files.copyUrl"),
              hint: _vm.$t("admin.settings.files.copyUrl"),
              icon: "link"
            },
            location: "before",
            onClick: _vm.copyUrl
          },
          "separator",
          "move",
          "copy",
          "rename",
          "separator",
          "delete",
          "clearSelection"
        ]
      }
    },
    on: {
      errorOccurred: _vm.onErrorOccurred,
      selectedFileOpened: _vm.onSelectedFileOpened
    }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/FileManager.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/FileManager.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileManager.vue?vue&type=template&id=6a1d18f6& */ "./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&");
/* harmony import */ var _FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileManager.vue?vue&type=script&lang=js& */ "./resources/js/components/FileManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _FileManager_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileManager.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/FileManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/FileManager.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/FileManager.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./FileManager.vue?vue&type=template&id=6a1d18f6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FileManager.vue?vue&type=template&id=6a1d18f6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileManager_vue_vue_type_template_id_6a1d18f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);