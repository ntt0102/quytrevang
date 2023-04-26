(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Chatbot.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var vue_bot_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-bot-ui */ "./node_modules/vue-bot-ui/dist/vue-bot-ui.common.js");
/* harmony import */ var vue_bot_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_bot_ui__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


function similarity(s1, s2) {
  var longer = adjust(s1);
  var shorter = adjust(s2);
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
function editDistance(s1, s2) {
  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
function adjust(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace("gi", "").replace("bang cach nao", "").replace("nhu the nao", "").replace("bao nhieu", "").replace("dau", "").replace("o dau", "").replace("lam gi", "").replace("?", "").toLowerCase().trim();
}
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    VueBotUI: vue_bot_ui__WEBPACK_IMPORTED_MODULE_1__["VueBotUI"]
  },
  data: function data() {
    return {
      data: [],
      topics: [],
      messageData: [],
      botTyping: false,
      botOptions: {
        botTitle: this.$t("components.chatbot.botTitle"),
        colorScheme: this.$scss.baseAccent,
        bubbleBtnSize: 50,
        botAvatarImg: "../../images/android-chrome-512x512.png",
        inputPlaceholder: this.$t("components.chatbot.inputPlaceholder")
      },
      voiceApi: "https://api.voicerss.org/?key=".concat("bd4aed0104b049429786e1ea43ce7a43", "&hl=vi-vn&src="),
      resizeObserver: null
    };
  },
  mounted: function mounted() {
    this.resizeObserver = new ResizeObserver(this.showLatestMessage);
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])(["faqs", "contact"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["name", "sex", "isLoggedin"])), {}, {
    userName: function userName() {
      return !!this.name ? " " + this.name.split(" ").pop() : "";
    },
    userTitle: function userTitle() {
      return this.$t("components.chatbot.title.user".concat(this.sex || ""));
    }
  }),
  watch: {
    isLoggedin: function isLoggedin() {
      this.messageData = [];
    },
    faqs: function faqs() {
      var _this = this;
      __webpack_require__("./resources/js/locales/chatbot lazy recursive ^\\.\\/.*$")("./".concat(window.lang)).then(function (extra) {
        _this.data = [].concat(_toConsumableArray(_this.faqs), _toConsumableArray(extra["default"]));
        _this.topics = _this.faqs.reduce(function (topics, item) {
          if (!topics.includes(item.topic)) topics.push(item.topic);
          return topics;
        }, []);
      });
    }
  },
  methods: {
    onInit: function onInit() {
      var _this2 = this;
      console.log("onInit");
      if (this.$mf.isEmpty(this.messageData)) {
        this.botTyping = true;
        var text = this.$t("components.chatbot.hello").replace("{name}", this.userName).replaceAll("{title}", this.userTitle);
        var audio = new Audio("".concat(this.voiceApi).concat(text));
        audio.play();
        setTimeout(function () {
          _this2.botTyping = false;
          _this2.messageData.push({
            agent: "bot",
            type: "text",
            text: text
          });
        }, 500);
      }
      setTimeout(function () {
        _this2.showLatestMessage();
        _this2.resizeObserver.observe(document.querySelector(".qkb-board-content"));
      }, 0);
    },
    onMsgSend: function onMsgSend(response) {
      var _this3 = this;
      this.messageData.push({
        agent: "user",
        type: "text",
        text: response.text
      });
      this.botTyping = true;
      var replyMessage = this.getResponse(response);
      if (replyMessage.text) {
        var audio = new Audio("".concat(this.voiceApi).concat(replyMessage.text));
        audio.play();
      }
      setTimeout(function () {
        _this3.messageData.push(replyMessage);
        _this3.botTyping = false;
      }, 500);
    },
    getResponse: function getResponse(response) {
      var replyMessage = {
        agent: "bot"
      };
      //
      if (response.action == "postback") {
        switch (response.value) {
          case "question":
            var msg = this.faqs.filter(function (item) {
              return item.question == response.text;
            })[0];
            if (/<\/?[a-z][\s\S]*>/i.test(msg.answer)) {
              replyMessage.type = "button";
              replyMessage.text = this.$t("components.chatbot.detail");
              replyMessage.options = [{
                text: this.$t("components.chatbot.more"),
                value: this.$router.resolve({
                  name: "policy",
                  hash: "#faq",
                  query: {
                    search: msg.question
                  }
                }).href,
                action: "url"
              }];
            } else {
              replyMessage.type = "text";
              replyMessage.text = msg.answer;
            }
            break;
          case "topic":
            replyMessage.type = "button";
            replyMessage.text = this.$t("components.chatbot.questionsInTopic") + " " + response.text;
            var filtered = this.faqs.filter(function (item) {
              return item.topic == response.text;
            });
            replyMessage.options = [];
            filtered.forEach(function (item) {
              replyMessage.options.push({
                text: item.question,
                value: "question",
                action: "postback"
              });
            });
            break;
        }
      } else {
        var matched = this.data.reduce(function (match, item) {
          var point = similarity(item.question, response.text);
          if (point > match.point) match = {
            msg: item,
            point: point
          };
          return match;
        }, {
          msg: {},
          point: 0
        });
        if (matched.point >= 0.6) {
          if (/<\/?[a-z][\s\S]*>/i.test(matched.msg.answer)) {
            replyMessage.type = "button";
            replyMessage.text = this.$t("components.chatbot.detail");
            replyMessage.options = [{
              text: this.$t("components.chatbot.more"),
              value: this.$router.resolve({
                name: "policy",
                hash: "#faq",
                query: {
                  search: matched.msg.question
                }
              }).href,
              action: "url"
            }];
          } else {
            replyMessage.text = matched.msg.answer;
            if (!!matched.msg.url) {
              replyMessage.type = "button";
              replyMessage.options = [{
                text: this.$t("components.chatbot.more"),
                value: matched.msg.url,
                action: "url"
              }];
            } else replyMessage.type = "text";
          }
        } else {
          replyMessage.type = "button";
          replyMessage.text = this.$t("components.chatbot.topicConfirm").replaceAll("{title}", this.userTitle);
          replyMessage.options = [];
          this.topics.forEach(function (item) {
            replyMessage.options.push({
              text: item,
              value: "topic",
              action: "postback"
            });
          });
          replyMessage.options.push({
            text: this.$t("components.chatbot.sendZalo"),
            value: "https://zalo.me/".concat(this.contact.phone),
            action: "url"
          });
        }
      }
      return replyMessage;
    },
    showLatestMessage: function showLatestMessage() {
      document.querySelector(".qkb-board-content .qkb-msg-bubble:last-child").scrollIntoView();
    },
    onDestroy: function onDestroy() {
      this.resizeObserver.unobserve(document.querySelector(".qkb-board-content"));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=template&id=245c3558&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Chatbot.vue?vue&type=template&id=245c3558& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("VueBotUI", {
    attrs: {
      options: _vm.botOptions,
      messages: _vm.messageData,
      "bot-typing": _vm.botTyping,
      "input-disable": false,
      "is-open": false
    },
    on: {
      init: _vm.onInit,
      "msg-send": _vm.onMsgSend,
      destroy: _vm.onDestroy
    }
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".qkb-bot-ui {\n  left: 1.5rem;\n  right: auto !important;\n}\n.qkb-bot-ui .qkb-board {\n  left: 0;\n  right: auto !important;\n}\n.qkb-bot-ui .qkb-bubble-btn {\n  opacity: 0.5;\n}\n.qkb-bot-ui .qkb-bubble-btn:hover {\n  opacity: 1;\n}\n.qkb-bot-ui .qkb-board-action__disable-text {\n  color: black;\n}\n.qkb-bot-ui .qkb-mb-button-options__btn {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 270px;\n}\n.qkb-bot-ui .qkb-msg-bubble-component,\n.qkb-bot-ui .qkb-board-header__title {\n  font-size: unset;\n}\n.qkb-bot-ui .qkb-msg-bubble-component__text {\n  white-space: pre-line;\n}\n.qkb-bot-ui .qkb-board-content::-webkit-scrollbar {\n  width: 6px;\n  background-color: #f5f5f5;\n}\n.qkb-bot-ui .qkb-board-content::-webkit-scrollbar-thumb {\n  background-color: #c1c1c1;\n}\n.qkb-bot-ui .qkb-board-content::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 6px white;\n  background-color: #f5f5f5;\n}\nbody[screen-size=small] .qkb-bot-ui .qkb-board {\n  left: -1rem !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss&");

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

/***/ "./resources/js/components/Chatbot.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Chatbot.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chatbot_vue_vue_type_template_id_245c3558___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chatbot.vue?vue&type=template&id=245c3558& */ "./resources/js/components/Chatbot.vue?vue&type=template&id=245c3558&");
/* harmony import */ var _Chatbot_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chatbot.vue?vue&type=script&lang=js& */ "./resources/js/components/Chatbot.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Chatbot_vue_vue_type_style_index_0_id_245c3558_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss& */ "./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Chatbot_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Chatbot_vue_vue_type_template_id_245c3558___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Chatbot_vue_vue_type_template_id_245c3558___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Chatbot.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Chatbot.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Chatbot.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Chatbot.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_style_index_0_id_245c3558_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=style&index=0&id=245c3558&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_style_index_0_id_245c3558_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_style_index_0_id_245c3558_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_style_index_0_id_245c3558_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_style_index_0_id_245c3558_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Chatbot.vue?vue&type=template&id=245c3558&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Chatbot.vue?vue&type=template&id=245c3558& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_template_id_245c3558___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./Chatbot.vue?vue&type=template&id=245c3558& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Chatbot.vue?vue&type=template&id=245c3558&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_template_id_245c3558___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Chatbot_vue_vue_type_template_id_245c3558___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/locales/chatbot lazy recursive ^\\.\\/.*$":
/*!*********************************************************************!*\
  !*** ./resources/js/locales/chatbot lazy ^\.\/.*$ namespace object ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./vi": [
		"./resources/js/locales/chatbot/vi/index.js",
		7
	],
	"./vi/": [
		"./resources/js/locales/chatbot/vi/index.js",
		7
	],
	"./vi/greeting": [
		"./resources/js/locales/chatbot/vi/greeting.js",
		17
	],
	"./vi/greeting.js": [
		"./resources/js/locales/chatbot/vi/greeting.js",
		17
	],
	"./vi/index": [
		"./resources/js/locales/chatbot/vi/index.js",
		7
	],
	"./vi/index.js": [
		"./resources/js/locales/chatbot/vi/index.js",
		7
	],
	"./vi/me": [
		"./resources/js/locales/chatbot/vi/me.js",
		18
	],
	"./vi/me.js": [
		"./resources/js/locales/chatbot/vi/me.js",
		18
	],
	"./vi/vkiu": [
		"./resources/js/locales/chatbot/vi/vkiu.js",
		19
	],
	"./vi/vkiu.js": [
		"./resources/js/locales/chatbot/vi/vkiu.js",
		19
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./resources/js/locales/chatbot lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ })

}]);