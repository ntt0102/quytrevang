(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./resources/js/locales/chatbot/vi sync \\.js$":
/*!*****************************************************************!*\
  !*** ./resources/js/locales/chatbot/vi sync nonrecursive \.js$ ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./greeting.js": "./resources/js/locales/chatbot/vi/greeting.js",
	"./index.js": "./resources/js/locales/chatbot/vi/index.js",
	"./me.js": "./resources/js/locales/chatbot/vi/me.js",
	"./vkiu.js": "./resources/js/locales/chatbot/vi/vkiu.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/js/locales/chatbot/vi sync \\.js$";

/***/ }),

/***/ "./resources/js/locales/chatbot/vi/greeting.js":
/*!*****************************************************!*\
  !*** ./resources/js/locales/chatbot/vi/greeting.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  question: "Hi",
  answer: "Chào mừng quý khách đến với Quỹ Tre Vàng"
}, {
  question: "Hello",
  answer: "Chúc quý khách một ngày tốt lành"
}, {
  question: "Xin chào",
  answer: "Rất vui được giải đáp các câu hỏi của quý khách"
}, {
  question: "Tạm biệt",
  answer: "Tạm biệt quý khách, hẹn gặp lại"
}, {
  question: "Bye",
  answer: "Chào tạm biệt"
}, {
  question: "Test HTML",
  answer: "<img src='https://cdn.tgdd.vn/Files/2021/03/04/1332618/70-status-cau-noi-hay-ve-hoang-hon-khoang-thoi-g-3.jpg' />"
}, {
  question: "Test URL",
  answer: "test answer",
  url: "https://cdn.tgdd.vn/Files/2021/03/04/1332618/70-status-cau-noi-hay-ve-hoang-hon-khoang-thoi-g-3.jpg"
}]);

/***/ }),

/***/ "./resources/js/locales/chatbot/vi/index.js":
/*!**************************************************!*\
  !*** ./resources/js/locales/chatbot/vi/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var files = __webpack_require__("./resources/js/locales/chatbot/vi sync \\.js$");
var modules = [];
files.keys().forEach(function (key) {
  if (key === "./index.js") return;
  modules = [].concat(_toConsumableArray(modules), _toConsumableArray(files(key)["default"]));
});
/* harmony default export */ __webpack_exports__["default"] = (modules);

/***/ }),

/***/ "./resources/js/locales/chatbot/vi/me.js":
/*!***********************************************!*\
  !*** ./resources/js/locales/chatbot/vi/me.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  question: "Bạn là ai?",
  answer: "Tôi là robot trợ lý của trang Quỹ Tre Vàng"
}, {
  question: "Bạn tên gì?",
  answer: "Tên tôi là CB_QTV_01"
}, {
  question: "Bạn làm gì ở đây?",
  answer: "Tôi ở đây để giải đáp các thắc mắc của quý khách"
}, {
  question: "Bạn là nam hay nữ, trai hay gái",
  answer: "Bạn nghĩ tôi là gì :))"
}, {
  question: "Bạn đến từ đâu",
  answer: "Tôi đến từ Việt Nam"
}]);

/***/ }),

/***/ "./resources/js/locales/chatbot/vi/vkiu.js":
/*!*************************************************!*\
  !*** ./resources/js/locales/chatbot/vi/vkiu.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  question: "Bb ơi",
  answer: "A nghe nè"
}, {
  question: "Bb nhớ e hông?",
  answer: "Nhớ"
}, {
  question: "Nhớ nhiều hay ít",
  answer: "Nhiều"
}, {
  question: "Nhiều chừng mô?",
  answer: "Lớn hơn hột le bb"
}, {
  question: "Chúc bb ngày mới vui vẻ",
  answer: "Bb ngày mới tràn đầy năng lượng nghe"
}, {
  question: "Bb ăn cơm chưa",
  answer: "Ăn rồi á, bb ăn chưa?"
}, {
  question: "Bb làm chi đó",
  answer: "Ngồi nhớ bb á"
}, {
  question: "Lố",
  answer: "Thiệt mà"
}, {
  question: "Ghê rứa",
  answer: "Chớ ren"
}, {
  question: "Bb ngủ ngủ nghe",
  answer: "Bb ngủ ngon và mơ siêu ướt nghe"
}, {
  question: "Bb tắm chưa?",
  answer: "Rồi á, bb ren?"
}, {
  question: "Nhớ bb ghê",
  answer: "A cũng nhớ bb"
}]);

/***/ })

}]);