(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/devextreme/esm/color.js":
/*!**********************************************!*\
  !*** ./node_modules/devextreme/esm/color.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/color.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var standardColorNames = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    feldspar: "d19275",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslateblue: "8470ff",
    lightslategray: "778899",
    lightslategrey: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370d8",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "d87093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    violetred: "d02090",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
};
var standardColorTypes = [{
    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    process: function(colorString) {
        return [parseInt(colorString[1], 10), parseInt(colorString[2], 10), parseInt(colorString[3], 10)]
    }
}, {
    re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*\.*\d+)\)$/,
    process: function(colorString) {
        return [parseInt(colorString[1], 10), parseInt(colorString[2], 10), parseInt(colorString[3], 10), parseFloat(colorString[4])]
    }
}, {
    re: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/,
    process: function(colorString) {
        return [parseInt(colorString[1], 16), parseInt(colorString[2], 16), parseInt(colorString[3], 16)]
    }
}, {
    re: /^#([a-f0-9]{1})([a-f0-9]{1})([a-f0-9]{1})$/,
    process: function(colorString) {
        return [parseInt(colorString[1] + colorString[1], 16), parseInt(colorString[2] + colorString[2], 16), parseInt(colorString[3] + colorString[3], 16)]
    }
}, {
    re: /^hsv\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    process: function(colorString) {
        var h = parseInt(colorString[1], 10);
        var s = parseInt(colorString[2], 10);
        var v = parseInt(colorString[3], 10);
        var rgb = hsvToRgb(h, s, v);
        return [rgb[0], rgb[1], rgb[2], 1, [h, s, v]]
    }
}, {
    re: /^hsl\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    process: function(colorString) {
        var h = parseInt(colorString[1], 10);
        var s = parseInt(colorString[2], 10);
        var l = parseInt(colorString[3], 10);
        var rgb = hslToRgb(h, s, l);
        return [rgb[0], rgb[1], rgb[2], 1, null, [h, s, l]]
    }
}];
var _round = Math.round;

function Color(value) {
    this.baseColor = value;
    var color;
    if (value) {
        color = String(value).toLowerCase().replace(/ /g, "");
        color = standardColorNames[color] ? "#" + standardColorNames[color] : color;
        color = parseColor(color)
    }
    if (!color) {
        this.colorIsInvalid = true
    }
    color = color || {};
    this.r = normalize(color[0]);
    this.g = normalize(color[1]);
    this.b = normalize(color[2]);
    this.a = normalize(color[3], 1, 1);
    if (color[4]) {
        this.hsv = {
            h: color[4][0],
            s: color[4][1],
            v: color[4][2]
        }
    } else {
        this.hsv = toHsvFromRgb(this.r, this.g, this.b)
    }
    if (color[5]) {
        this.hsl = {
            h: color[5][0],
            s: color[5][1],
            l: color[5][2]
        }
    } else {
        this.hsl = toHslFromRgb(this.r, this.g, this.b)
    }
}

function parseColor(color) {
    if ("transparent" === color) {
        return [0, 0, 0, 0]
    }
    var i = 0;
    var ii = standardColorTypes.length;
    var str;
    for (; i < ii; ++i) {
        str = standardColorTypes[i].re.exec(color);
        if (str) {
            return standardColorTypes[i].process(str)
        }
    }
    return null
}

function normalize(colorComponent, def, max) {
    def = def || 0;
    max = max || 255;
    return colorComponent < 0 || isNaN(colorComponent) ? def : colorComponent > max ? max : colorComponent
}

function toHexFromRgb(r, g, b) {
    return "#" + (16777216 | r << 16 | g << 8 | b).toString(16).slice(1)
}

function toHsvFromRgb(r, g, b) {
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var H;
    var S;
    var V = max;
    S = 0 === max ? 0 : 1 - min / max;
    if (max === min) {
        H = 0
    } else {
        switch (max) {
            case r:
                H = (g - b) / delta * 60;
                if (g < b) {
                    H += 360
                }
                break;
            case g:
                H = (b - r) / delta * 60 + 120;
                break;
            case b:
                H = (r - g) / delta * 60 + 240
        }
    }
    S *= 100;
    V *= 100 / 255;
    return {
        h: Math.round(H),
        s: Math.round(S),
        v: Math.round(V)
    }
}

function hsvToRgb(h, s, v) {
    var index = Math.floor(h % 360 / 60);
    var vMin = (100 - s) * v / 100;
    var a = h % 60 / 60 * (v - vMin);
    var vInc = vMin + a;
    var vDec = v - a;
    var r;
    var g;
    var b;
    switch (index) {
        case 0:
            r = v;
            g = vInc;
            b = vMin;
            break;
        case 1:
            r = vDec;
            g = v;
            b = vMin;
            break;
        case 2:
            r = vMin;
            g = v;
            b = vInc;
            break;
        case 3:
            r = vMin;
            g = vDec;
            b = v;
            break;
        case 4:
            r = vInc;
            g = vMin;
            b = v;
            break;
        case 5:
            r = v;
            g = vMin;
            b = vDec
    }
    return [Math.round(2.55 * r), Math.round(2.55 * g), Math.round(2.55 * b)]
}

function calculateHue(r, g, b, delta) {
    var max = Math.max(r, g, b);
    switch (max) {
        case r:
            return (g - b) / delta + (g < b ? 6 : 0);
        case g:
            return (b - r) / delta + 2;
        case b:
            return (r - g) / delta + 4
    }
}

function toHslFromRgb(r, g, b) {
    r = convertTo01Bounds(r, 255);
    g = convertTo01Bounds(g, 255);
    b = convertTo01Bounds(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var maxMinSum = max + min;
    var h;
    var s;
    var l = maxMinSum / 2;
    if (max === min) {
        h = s = 0
    } else {
        var delta = max - min;
        if (l > .5) {
            s = delta / (2 - maxMinSum)
        } else {
            s = delta / maxMinSum
        }
        h = calculateHue(r, g, b, delta);
        h /= 6
    }
    return {
        h: _round(360 * h),
        s: _round(100 * s),
        l: _round(100 * l)
    }
}

function makeColorTint(colorPart, h) {
    var colorTint = h;
    if ("r" === colorPart) {
        colorTint = h + 1 / 3
    }
    if ("b" === colorPart) {
        colorTint = h - 1 / 3
    }
    return colorTint
}

function modifyColorTint(colorTint) {
    if (colorTint < 0) {
        colorTint += 1
    }
    if (colorTint > 1) {
        colorTint -= 1
    }
    return colorTint
}

function hueToRgb(p, q, colorTint) {
    colorTint = modifyColorTint(colorTint);
    if (colorTint < 1 / 6) {
        return p + 6 * (q - p) * colorTint
    }
    if (colorTint < .5) {
        return q
    }
    if (colorTint < 2 / 3) {
        return p + (q - p) * (2 / 3 - colorTint) * 6
    }
    return p
}

function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = convertTo01Bounds(h, 360);
    s = convertTo01Bounds(s, 100);
    l = convertTo01Bounds(l, 100);
    if (0 === s) {
        r = g = b = l
    } else {
        var q = l < .5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hueToRgb(p, q, makeColorTint("r", h));
        g = hueToRgb(p, q, makeColorTint("g", h));
        b = hueToRgb(p, q, makeColorTint("b", h))
    }
    return [_round(255 * r), _round(255 * g), _round(255 * b)]
}

function convertTo01Bounds(n, max) {
    n = Math.min(max, Math.max(0, parseFloat(n)));
    if (Math.abs(n - max) < 1e-6) {
        return 1
    }
    return n % max / parseFloat(max)
}

function isIntegerBetweenMinAndMax(number, min, max) {
    min = min || 0;
    max = max || 255;
    if (number % 1 !== 0 || number < min || number > max || "number" !== typeof number || isNaN(number)) {
        return false
    }
    return true
}
Color.prototype = {
    constructor: Color,
    highlight: function(step) {
        step = step || 10;
        return this.alter(step).toHex()
    },
    darken: function(step) {
        step = step || 10;
        return this.alter(-step).toHex()
    },
    alter: function(step) {
        var result = new Color;
        result.r = normalize(this.r + step);
        result.g = normalize(this.g + step);
        result.b = normalize(this.b + step);
        return result
    },
    blend: function(blendColor, opacity) {
        var other = blendColor instanceof Color ? blendColor : new Color(blendColor);
        var result = new Color;
        result.r = normalize(_round(this.r * (1 - opacity) + other.r * opacity));
        result.g = normalize(_round(this.g * (1 - opacity) + other.g * opacity));
        result.b = normalize(_round(this.b * (1 - opacity) + other.b * opacity));
        return result
    },
    toHex: function() {
        return toHexFromRgb(this.r, this.g, this.b)
    },
    getPureColor: function() {
        var rgb = hsvToRgb(this.hsv.h, 100, 100);
        return new Color("rgb(" + rgb.join(",") + ")")
    },
    isValidHex: function(hex) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex)
    },
    isValidRGB: function(r, g, b) {
        if (!isIntegerBetweenMinAndMax(r) || !isIntegerBetweenMinAndMax(g) || !isIntegerBetweenMinAndMax(b)) {
            return false
        }
        return true
    },
    isValidAlpha: function(a) {
        if (isNaN(a) || a < 0 || a > 1 || "number" !== typeof a) {
            return false
        }
        return true
    },
    colorIsInvalid: false,
    fromHSL: function(hsl) {
        var color = new Color;
        var rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
        color.r = rgb[0];
        color.g = rgb[1];
        color.b = rgb[2];
        return color
    }
};
/* harmony default export */ __webpack_exports__["default"] = (Color);


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/svg.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/svg.js ***!
  \*******************************************************/
/*! exports provided: HIDDEN_FOR_EXPORT, getSvgMarkup, getSvgElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIDDEN_FOR_EXPORT", function() { return HIDDEN_FOR_EXPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSvgMarkup", function() { return getSvgMarkup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSvgElement", function() { return getSvgElement; });
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/**
 * DevExtreme (esm/core/utils/svg.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var window = Object(_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])();

function getMarkup(element, backgroundColor) {
    var temp = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div");
    var clone = element.cloneNode(true);
    if (backgroundColor) {
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_2__["default"])(clone).css("backgroundColor", backgroundColor)
    }
    temp.appendChild(clone);
    return temp.innerHTML
}

function fixNamespaces(markup) {
    var first = true;
    if (-1 === markup.indexOf("xmlns:xlink")) {
        markup = markup.replace("<svg", '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
    }
    markup = markup.replace(/xmlns="[\s\S]*?"/gi, (function(match) {
        if (!first) {
            return ""
        }
        first = false;
        return match
    }));
    return markup.replace(/xmlns:NS1="[\s\S]*?"/gi, "").replace(/NS1:xmlns:xlink="([\s\S]*?)"/gi, 'xmlns:xlink="$1"')
}

function decodeHtmlEntities(markup) {
    return markup.replace(/&quot;/gi, "&#34;").replace(/&amp;/gi, "&#38;").replace(/&apos;/gi, "&#39;").replace(/&lt;/gi, "&#60;").replace(/&gt;/gi, "&#62;").replace(/&nbsp;/gi, "&#160;").replace(/&shy;/gi, "&#173;")
}
var HIDDEN_FOR_EXPORT = "hidden-for-export";
function getSvgMarkup(element, backgroundColor) {
    return fixNamespaces(decodeHtmlEntities(getMarkup(element, backgroundColor)))
}
function getSvgElement(markup) {
    return _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].isNode(markup) ? markup : (new window.DOMParser).parseFromString(markup, "image/svg+xml").childNodes[0]
}


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter.js":
/*!*************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter.js ***!
  \*************************************************/
/*! exports provided: export, fileSaver, excel, image, pdf, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "export", function() { return _export; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "excel", function() { return excel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "image", function() { return image; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pdf", function() { return pdf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _exporter_file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exporter/file_saver */ "./node_modules/devextreme/esm/exporter/file_saver.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fileSaver", function() { return _exporter_file_saver__WEBPACK_IMPORTED_MODULE_0__["fileSaver"]; });

/* harmony import */ var _exporter_excel_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exporter/excel_creator */ "./node_modules/devextreme/esm/exporter/excel_creator.js");
/* harmony import */ var _exporter_image_creator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exporter/image_creator */ "./node_modules/devextreme/esm/exporter/image_creator.js");
/* harmony import */ var _exporter_svg_creator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exporter/svg_creator */ "./node_modules/devextreme/esm/exporter/svg_creator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _exporter_excel_format_converter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./exporter/excel_format_converter */ "./node_modules/devextreme/esm/exporter/excel_format_converter.js");
/* harmony import */ var _exporter_pdf_creator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exporter/pdf_creator */ "./node_modules/devextreme/esm/exporter/pdf_creator.js");
/**
 * DevExtreme (esm/exporter.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









function _export(data, options, getData) {
    if (!data) {
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"]).resolve()
    }
    var exportingAction = options.exportingAction;
    var exportedAction = options.exportedAction;
    var fileSavingAction = options.fileSavingAction;
    var eventArgs = {
        fileName: options.fileName,
        format: options.format,
        cancel: false
    };
    Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(exportingAction) && exportingAction(eventArgs);
    if (!eventArgs.cancel) {
        return getData(data, options).then(blob => {
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(exportedAction) && exportedAction();
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(fileSavingAction)) {
                eventArgs.data = blob;
                fileSavingAction(eventArgs)
            }
            if (!eventArgs.cancel) {
                _exporter_file_saver__WEBPACK_IMPORTED_MODULE_0__["fileSaver"].saveAs(eventArgs.fileName, options.format, blob, options.proxyUrl, options.forceProxy)
            }
        })
    }
    return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"]).resolve()
}

var excel = {
    creator: _exporter_excel_creator__WEBPACK_IMPORTED_MODULE_1__["ExcelCreator"],
    getData: _exporter_excel_creator__WEBPACK_IMPORTED_MODULE_1__["getData"],
    formatConverter: _exporter_excel_format_converter__WEBPACK_IMPORTED_MODULE_6__["default"]
};
var image = {
    creator: _exporter_image_creator__WEBPACK_IMPORTED_MODULE_2__["imageCreator"],
    getData: _exporter_image_creator__WEBPACK_IMPORTED_MODULE_2__["getData"],
    testFormats: _exporter_image_creator__WEBPACK_IMPORTED_MODULE_2__["testFormats"]
};
var pdf = {
    getData: _exporter_pdf_creator__WEBPACK_IMPORTED_MODULE_7__["getData"]
};
var svg = {
    creator: _exporter_svg_creator__WEBPACK_IMPORTED_MODULE_3__["svgCreator"],
    getData: _exporter_svg_creator__WEBPACK_IMPORTED_MODULE_3__["getData"]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.cell_alignment_helper.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.cell_alignment_helper.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.cell_alignment_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var cellAlignmentHelper = {
    tryCreateTag: function(sourceObj) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(sourceObj)) {
            result = {
                vertical: sourceObj.vertical,
                wrapText: sourceObj.wrapText,
                horizontal: sourceObj.horizontal
            };
            if (cellAlignmentHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
            result = {};
            if (void 0 !== source.horizontal) {
                result.horizontal = source.horizontal
            }
            if (void 0 !== source.vertical) {
                result.vertical = source.vertical
            }
            if (void 0 !== source.wrapText) {
                result.wrapText = source.wrapText
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return cellAlignmentHelper.isEmpty(leftTag) && cellAlignmentHelper.isEmpty(rightTag) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(leftTag) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rightTag) && leftTag.vertical === rightTag.vertical && leftTag.wrapText === rightTag.wrapText && leftTag.horizontal === rightTag.horizontal
    },
    isEmpty: function(tag) {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.vertical) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.wrapText) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.horizontal)
    },
    toXml: function(tag) {
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("alignment", {
            vertical: tag.vertical,
            wrapText: Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.wrapText) ? Number(tag.wrapText) : void 0,
            horizontal: tag.horizontal
        })
    }
};
/* harmony default export */ __webpack_exports__["default"] = (cellAlignmentHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.cell_format_helper.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.cell_format_helper.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/* harmony import */ var _excel_cell_alignment_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./excel.cell_alignment_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.cell_alignment_helper.js");
/* harmony import */ var _excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./excel.fill_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.fill_helper.js");
/* harmony import */ var _excel_font_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./excel.font_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.font_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.cell_format_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var cellFormatHelper = {
    tryCreateTag: function(sourceObj, sharedItemsContainer) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(sourceObj)) {
            var numberFormatId;
            if ("number" === typeof sourceObj.numberFormat) {
                numberFormatId = sourceObj.numberFormat
            } else {
                numberFormatId = sharedItemsContainer.registerNumberFormat(sourceObj.numberFormat)
            }
            var fill = sourceObj.fill;
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(fill)) {
                fill = _excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].tryCreateFillFromSimpleFormat(sourceObj)
            }
            result = {
                numberFormatId: numberFormatId,
                alignment: _excel_cell_alignment_helper__WEBPACK_IMPORTED_MODULE_2__["default"].tryCreateTag(sourceObj.alignment),
                fontId: sharedItemsContainer.registerFont(sourceObj.font),
                fillId: sharedItemsContainer.registerFill(fill)
            };
            if (cellFormatHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result;
        if (null === source) {
            result = null
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
            result = {};
            if (void 0 !== source.numberFormat) {
                result.numberFormat = source.numberFormat
            }
            if (void 0 !== source.fill) {
                result.fill = _excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].copy(source.fill)
            } else {
                _excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].copySimpleFormat(source, result)
            }
            if (void 0 !== source.alignment) {
                result.alignment = _excel_cell_alignment_helper__WEBPACK_IMPORTED_MODULE_2__["default"].copy(source.alignment)
            }
            if (void 0 !== source.font) {
                result.font = _excel_font_helper__WEBPACK_IMPORTED_MODULE_4__["default"].copy(source.font)
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return cellFormatHelper.isEmpty(leftTag) && cellFormatHelper.isEmpty(rightTag) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(leftTag) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rightTag) && leftTag.fontId === rightTag.fontId && leftTag.numberFormatId === rightTag.numberFormatId && leftTag.fillId === rightTag.fillId && _excel_cell_alignment_helper__WEBPACK_IMPORTED_MODULE_2__["default"].areEqual(leftTag.alignment, rightTag.alignment)
    },
    isEmpty: function(tag) {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.fontId) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.numberFormatId) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.fillId) && _excel_cell_alignment_helper__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty(tag.alignment)
    },
    toXml: function(tag) {
        var isAlignmentEmpty = _excel_cell_alignment_helper__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty(tag.alignment);
        var applyNumberFormat;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.numberFormatId)) {
            applyNumberFormat = tag.numberFormatId > 0 ? 1 : 0
        }
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("xf", {
            xfId: 0,
            applyAlignment: isAlignmentEmpty ? null : 1,
            fontId: tag.fontId,
            applyNumberFormat: applyNumberFormat,
            fillId: tag.fillId,
            numFmtId: tag.numberFormatId
        }, isAlignmentEmpty ? null : _excel_cell_alignment_helper__WEBPACK_IMPORTED_MODULE_2__["default"].toXml(tag.alignment))
    }
};
/* harmony default export */ __webpack_exports__["default"] = (cellFormatHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.color_helper.js":
/*!**************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.color_helper.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.color_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var colorHelper = {
    _tryConvertColor: function(source) {
        if ("string" !== typeof source) {
            return source
        }
        var result;
        if (source.length > 0 && "#" === source[0]) {
            var colorCode = source.substr(1, source.length);
            if (6 === colorCode.length) {
                result = "FF" + colorCode
            } else if (8 === colorCode.length) {
                result = colorCode[6] + colorCode[7] + colorCode.substr(0, 6)
            } else {
                result = colorCode
            }
        } else {
            result = source
        }
        return result
    },
    tryCreateTag: function(sourceObj) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(sourceObj)) {
            if ("string" === typeof sourceObj) {
                result = {
                    rgb: this._tryConvertColor(sourceObj)
                }
            } else {
                result = {
                    rgb: this._tryConvertColor(sourceObj.rgb),
                    theme: sourceObj.theme
                }
            }
            if (colorHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
            if ("string" === typeof source) {
                result = source
            } else {
                result = {};
                if (void 0 !== source.rgb) {
                    result.rgb = source.rgb
                }
                if (void 0 !== source.theme) {
                    result.theme = source.theme
                }
            }
        }
        return result
    },
    isEmpty: function(tag) {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.rgb) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.theme)
    },
    areEqual: function(leftTag, rightTag) {
        return colorHelper.isEmpty(leftTag) && colorHelper.isEmpty(rightTag) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(leftTag) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rightTag) && leftTag.rgb === rightTag.rgb && leftTag.theme === rightTag.theme
    },
    toXml: function(tagName, tag) {
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml(tagName, {
            rgb: tag.rgb,
            theme: tag.theme
        })
    }
};
/* harmony default export */ __webpack_exports__["default"] = (colorHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.file.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.file.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExcelFile; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/* harmony import */ var _excel_cell_format_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./excel.cell_format_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.cell_format_helper.js");
/* harmony import */ var _excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./excel.fill_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.fill_helper.js");
/* harmony import */ var _excel_font_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./excel.font_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.font_helper.js");
/* harmony import */ var _excel_number_format_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./excel.number_format_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.number_format_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.file.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






class ExcelFile {
    constructor() {
        this._cellFormatTags = [];
        this._fillTags = [];
        this._fontTags = [];
        this._numberFormatTags = [];
        this._fillTags.push(_excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].tryCreateTag({
            patternFill: {
                patternType: "none"
            }
        }))
    }
    registerCellFormat(cellFormat) {
        var result;
        var cellFormatTag = _excel_cell_format_helper__WEBPACK_IMPORTED_MODULE_2__["default"].tryCreateTag(cellFormat, {
            registerFill: this.registerFill.bind(this),
            registerFont: this.registerFont.bind(this),
            registerNumberFormat: this.registerNumberFormat.bind(this)
        });
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(cellFormatTag)) {
            for (var i = 0; i < this._cellFormatTags.length; i++) {
                if (_excel_cell_format_helper__WEBPACK_IMPORTED_MODULE_2__["default"].areEqual(this._cellFormatTags[i], cellFormatTag)) {
                    result = i;
                    break
                }
            }
            if (void 0 === result) {
                result = this._cellFormatTags.push(cellFormatTag) - 1
            }
        }
        return result
    }
    static copyCellFormat(source) {
        return _excel_cell_format_helper__WEBPACK_IMPORTED_MODULE_2__["default"].copy(source)
    }
    generateCellFormatsXml() {
        var cellFormatTagsAsXmlStringsArray = this._cellFormatTags.map(tag => _excel_cell_format_helper__WEBPACK_IMPORTED_MODULE_2__["default"].toXml(tag));
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("cellXfs", {
            count: cellFormatTagsAsXmlStringsArray.length
        }, cellFormatTagsAsXmlStringsArray.join(""))
    }
    registerFill(fill) {
        var result;
        var fillTag = _excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].tryCreateTag(fill);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(fillTag)) {
            for (var i = 0; i < this._fillTags.length; i++) {
                if (_excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].areEqual(this._fillTags[i], fillTag)) {
                    result = i;
                    break
                }
            }
            if (void 0 === result) {
                if (this._fillTags.length < 2) {
                    this._fillTags.push(_excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].tryCreateTag({
                        patternFill: {
                            patternType: "Gray125"
                        }
                    }))
                }
                result = this._fillTags.push(fillTag) - 1
            }
        }
        return result
    }
    generateFillsXml() {
        var tagsAsXmlStringsArray = this._fillTags.map(tag => _excel_fill_helper__WEBPACK_IMPORTED_MODULE_3__["default"].toXml(tag));
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("fills", {
            count: tagsAsXmlStringsArray.length
        }, tagsAsXmlStringsArray.join(""))
    }
    registerFont(font) {
        var result;
        var fontTag = _excel_font_helper__WEBPACK_IMPORTED_MODULE_4__["default"].tryCreateTag(font);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(fontTag)) {
            for (var i = 0; i < this._fontTags.length; i++) {
                if (_excel_font_helper__WEBPACK_IMPORTED_MODULE_4__["default"].areEqual(this._fontTags[i], fontTag)) {
                    result = i;
                    break
                }
            }
            if (void 0 === result) {
                result = this._fontTags.push(fontTag) - 1
            }
        }
        return result
    }
    generateFontsXml() {
        var xmlStringsArray = this._fontTags.map(tag => _excel_font_helper__WEBPACK_IMPORTED_MODULE_4__["default"].toXml(tag));
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("fonts", {
            count: xmlStringsArray.length
        }, xmlStringsArray.join(""))
    }
    _convertNumberFormatIndexToId(index) {
        return 165 + index
    }
    registerNumberFormat(numberFormat) {
        var result;
        var tag = _excel_number_format_helper__WEBPACK_IMPORTED_MODULE_5__["default"].tryCreateTag(numberFormat);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag)) {
            for (var i = 0; i < this._numberFormatTags.length; i++) {
                if (_excel_number_format_helper__WEBPACK_IMPORTED_MODULE_5__["default"].areEqual(this._numberFormatTags[i], tag)) {
                    result = this._numberFormatTags[i][_excel_number_format_helper__WEBPACK_IMPORTED_MODULE_5__["default"].ID_PROPERTY_NAME];
                    break
                }
            }
            if (void 0 === result) {
                tag[_excel_number_format_helper__WEBPACK_IMPORTED_MODULE_5__["default"].ID_PROPERTY_NAME] = this._convertNumberFormatIndexToId(this._numberFormatTags.length);
                result = tag[_excel_number_format_helper__WEBPACK_IMPORTED_MODULE_5__["default"].ID_PROPERTY_NAME];
                this._numberFormatTags.push(tag)
            }
        }
        return result
    }
    generateNumberFormatsXml() {
        if (this._numberFormatTags.length > 0) {
            var xmlStringsArray = this._numberFormatTags.map(tag => _excel_number_format_helper__WEBPACK_IMPORTED_MODULE_5__["default"].toXml(tag));
            return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("numFmts", {
                count: xmlStringsArray.length
            }, xmlStringsArray.join(""))
        } else {
            return ""
        }
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.fill_helper.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.fill_helper.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/* harmony import */ var _excel_pattern_fill_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./excel.pattern_fill_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.pattern_fill_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.fill_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var fillHelper = {
    tryCreateTag: function(sourceObj) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(sourceObj)) {
            result = {
                patternFill: _excel_pattern_fill_helper__WEBPACK_IMPORTED_MODULE_2__["default"].tryCreateTag(sourceObj.patternFill)
            };
            if (fillHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    tryCreateFillFromSimpleFormat: function() {
        var {
            backgroundColor: backgroundColor,
            fillPatternType: fillPatternType,
            fillPatternColor: fillPatternColor
        } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(backgroundColor) && !(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(fillPatternType) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(fillPatternColor))) {
            return {
                patternFill: {
                    patternType: "solid",
                    foregroundColor: {
                        rgb: backgroundColor
                    }
                }
            }
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(fillPatternType) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(fillPatternColor)) {
            return {
                patternFill: {
                    patternType: fillPatternType,
                    foregroundColor: {
                        rgb: fillPatternColor
                    },
                    backgroundColor: {
                        rgb: backgroundColor
                    }
                }
            }
        }
    },
    copySimpleFormat: function(source, target) {
        if (void 0 !== source.backgroundColor) {
            target.backgroundColor = source.backgroundColor
        }
        if (void 0 !== source.fillPatternType) {
            target.fillPatternType = source.fillPatternType
        }
        if (void 0 !== source.fillPatternColor) {
            target.fillPatternColor = source.fillPatternColor
        }
    },
    copy: function(source) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
            result = {};
            if (void 0 !== source.patternFill) {
                result.patternFill = _excel_pattern_fill_helper__WEBPACK_IMPORTED_MODULE_2__["default"].copy(source.patternFill)
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return fillHelper.isEmpty(leftTag) && fillHelper.isEmpty(rightTag) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(leftTag) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rightTag) && _excel_pattern_fill_helper__WEBPACK_IMPORTED_MODULE_2__["default"].areEqual(leftTag.patternFill, rightTag.patternFill)
    },
    isEmpty: function(tag) {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag) || _excel_pattern_fill_helper__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty(tag.patternFill)
    },
    toXml: function(tag) {
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("fill", {}, _excel_pattern_fill_helper__WEBPACK_IMPORTED_MODULE_2__["default"].toXml(tag.patternFill))
    }
};
/* harmony default export */ __webpack_exports__["default"] = (fillHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.font_helper.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.font_helper.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/* harmony import */ var _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./excel.color_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.color_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.font_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var fontHelper = {
    tryCreateTag: function(sourceObj) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(sourceObj)) {
            result = {
                size: sourceObj.size,
                name: sourceObj.name,
                family: sourceObj.family,
                scheme: sourceObj.scheme,
                bold: sourceObj.bold,
                italic: sourceObj.italic,
                underline: sourceObj.underline,
                color: _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].tryCreateTag(sourceObj.color)
            };
            if (fontHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
            result = {};
            if (void 0 !== source.size) {
                result.size = source.size
            }
            if (void 0 !== source.name) {
                result.name = source.name
            }
            if (void 0 !== source.family) {
                result.family = source.family
            }
            if (void 0 !== source.scheme) {
                result.scheme = source.scheme
            }
            if (void 0 !== source.bold) {
                result.bold = source.bold
            }
            if (void 0 !== source.italic) {
                result.italic = source.italic
            }
            if (void 0 !== source.underline) {
                result.underline = source.underline
            }
            if (void 0 !== source.color) {
                result.color = _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].copy(source.color)
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return fontHelper.isEmpty(leftTag) && fontHelper.isEmpty(rightTag) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(leftTag) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rightTag) && leftTag.size === rightTag.size && leftTag.name === rightTag.name && leftTag.family === rightTag.family && leftTag.scheme === rightTag.scheme && (leftTag.bold === rightTag.bold || !leftTag.bold === !rightTag.bold) && (leftTag.italic === rightTag.italic || !leftTag.italic === !rightTag.italic) && leftTag.underline === rightTag.underline && _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].areEqual(leftTag.color, rightTag.color)
    },
    isEmpty: function(tag) {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.size) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.name) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.family) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.scheme) && (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.bold) || !tag.bold) && (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.italic) || !tag.italic) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.underline) && _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty(tag.color)
    },
    toXml: function(tag) {
        var content = [Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.bold) && tag.bold ? _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("b", {}) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.size) ? _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("sz", {
            val: tag.size
        }) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.color) ? _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].toXml("color", tag.color) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.name) ? _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("name", {
            val: tag.name
        }) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.family) ? _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("family", {
            val: tag.family
        }) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.scheme) ? _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("scheme", {
            val: tag.scheme
        }) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.italic) && tag.italic ? _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("i", {}) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.underline) ? _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("u", {
            val: tag.underline
        }) : ""].join("");
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("font", {}, content)
    }
};
/* harmony default export */ __webpack_exports__["default"] = (fontHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.number_format_helper.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.number_format_helper.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.number_format_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var numberFormatHelper = {
    ID_PROPERTY_NAME: "id",
    tryCreateTag: function(sourceObj) {
        var result = null;
        if ("string" === typeof sourceObj) {
            result = {
                formatCode: sourceObj
            };
            if (numberFormatHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return numberFormatHelper.isEmpty(leftTag) && numberFormatHelper.isEmpty(rightTag) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(leftTag) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rightTag) && leftTag.formatCode === rightTag.formatCode
    },
    isEmpty: function(tag) {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.formatCode) || "" === tag.formatCode
    },
    toXml: function(tag) {
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("numFmt", {
            numFmtId: tag[numberFormatHelper.ID_PROPERTY_NAME],
            formatCode: tag.formatCode
        })
    }
};
/* harmony default export */ __webpack_exports__["default"] = (numberFormatHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.pattern_fill_helper.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.pattern_fill_helper.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./excel.tag_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js");
/* harmony import */ var _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./excel.color_helper */ "./node_modules/devextreme/esm/exporter/excel/excel.color_helper.js");
/**
 * DevExtreme (esm/exporter/excel/excel.pattern_fill_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var patternFillHelper = {
    tryCreateTag: function(sourceObj) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(sourceObj)) {
            result = {
                patternType: sourceObj.patternType,
                backgroundColor: _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].tryCreateTag(sourceObj.backgroundColor),
                foregroundColor: _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].tryCreateTag(sourceObj.foregroundColor)
            };
            if (patternFillHelper.isEmpty(result)) {
                result = null
            }
        }
        return result
    },
    copy: function(source) {
        var result = null;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
            result = {};
            if (void 0 !== source.patternType) {
                result.patternType = source.patternType
            }
            if (void 0 !== source.backgroundColor) {
                result.backgroundColor = _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].copy(source.backgroundColor)
            }
            if (void 0 !== source.foregroundColor) {
                result.foregroundColor = _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].copy(source.foregroundColor)
            }
        }
        return result
    },
    areEqual: function(leftTag, rightTag) {
        return patternFillHelper.isEmpty(leftTag) && patternFillHelper.isEmpty(rightTag) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(leftTag) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(rightTag) && leftTag.patternType === rightTag.patternType && _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].areEqual(leftTag.backgroundColor, rightTag.backgroundColor) && _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].areEqual(leftTag.foregroundColor, rightTag.foregroundColor)
    },
    isEmpty: function(tag) {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.patternType)
    },
    toXml: function(tag) {
        var content = [Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.foregroundColor) ? _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].toXml("fgColor", tag.foregroundColor) : "", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(tag.backgroundColor) ? _excel_color_helper__WEBPACK_IMPORTED_MODULE_2__["default"].toXml("bgColor", tag.backgroundColor) : ""].join("");
        return _excel_tag_helper__WEBPACK_IMPORTED_MODULE_1__["default"].toXml("patternFill", {
            patternType: tag.patternType
        }, content)
    }
};
/* harmony default export */ __webpack_exports__["default"] = (patternFillHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel/excel.tag_helper.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/exporter/excel/excel.tag_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var tagHelper = {
    toXml: function(tagName, attributes, content) {
        var result = ["<", tagName];
        for (var attributeName in attributes) {
            var attributeValue = attributes[attributeName];
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(attributeValue)) {
                result.push(" ", attributeName, '="', attributeValue, '"')
            }
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(content) && "" !== content) {
            result.push(">", content, "</", tagName, ">")
        } else {
            result.push(" />")
        }
        return result.join("")
    }
};
/* harmony default export */ __webpack_exports__["default"] = (tagHelper);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel_creator.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel_creator.js ***!
  \***************************************************************/
/*! exports provided: ExcelCreator, getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelCreator", function() { return ExcelCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _ui_widget_ui_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _core_utils_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/string */ "./node_modules/devextreme/esm/core/utils/string.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jszip */ "./node_modules/jszip/dist/jszip.min.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _file_saver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./file_saver */ "./node_modules/devextreme/esm/exporter/file_saver.js");
/* harmony import */ var _excel_format_converter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./excel_format_converter */ "./node_modules/devextreme/esm/exporter/excel_format_converter.js");
/* harmony import */ var _excel_excel_file__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./excel/excel.file */ "./node_modules/devextreme/esm/exporter/excel/excel.file.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/exporter/excel_creator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */











var XML_TAG = '<?xml version="1.0" encoding="utf-8"?>';
var GROUP_SHEET_PR_XML = '<sheetPr><outlinePr summaryBelow="0"/></sheetPr>';
var SINGLE_SHEET_PR_XML = "<sheetPr/>";
var BASE_STYLE_XML2 = '<borders count="1"><border><left style="thin"><color rgb="FFD3D3D3"/></left><right style="thin"><color rgb="FFD3D3D3"/></right><top style="thin"><color rgb="FFD3D3D3"/></top><bottom style="thin"><color rgb="FFD3D3D3"/></bottom></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
var OPEN_XML_FORMAT_URL = "http://schemas.openxmlformats.org";
var RELATIONSHIP_PART_NAME = "rels";
var XL_FOLDER_NAME = "xl";
var WORKBOOK_FILE_NAME = "workbook.xml";
var CONTENTTYPES_FILE_NAME = "[Content_Types].xml";
var SHAREDSTRING_FILE_NAME = "sharedStrings.xml";
var STYLE_FILE_NAME = "styles.xml";
var WORKSHEETS_FOLDER = "worksheets";
var WORKSHEET_FILE_NAME = "sheet1.xml";
var WORKSHEET_HEADER_XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
var VALID_TYPES = {
    boolean: "b",
    date: "d",
    number: "n",
    string: "s"
};
var EXCEL_START_TIME = Date.UTC(1899, 11, 30);
var DAYS_COUNT_BEFORE_29_FEB_1900 = 60;
var MAX_DIGIT_WIDTH_IN_PIXELS = 7;
var UNSUPPORTED_FORMAT_MAPPING = {
    quarter: "shortDate",
    quarterAndYear: "shortDate",
    minute: "longTime",
    millisecond: "longTime"
};
var ExcelCreator = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    _getXMLTag: function(tagName, attributes, content) {
        var result = "<" + tagName;
        var i;
        var length = attributes.length;
        var attr;
        for (i = 0; i < length; i++) {
            attr = attributes[i];
            if (void 0 !== attr.value) {
                result = result + " " + attr.name + '="' + attr.value + '"'
            }
        }
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(content) ? result + ">" + content + "</" + tagName + ">" : result + " />"
    },
    _convertToExcelCellRef: function(zeroBasedRowIndex, zeroBasedCellIndex) {
        var columnName = "";
        var charCode;
        var isCellIndexFound;
        while (!isCellIndexFound) {
            charCode = 65 + (zeroBasedCellIndex >= 26 ? zeroBasedCellIndex % 26 : Math.ceil(zeroBasedCellIndex));
            columnName = String.fromCharCode(charCode) + columnName;
            if (zeroBasedCellIndex >= 26) {
                zeroBasedCellIndex = Math.floor(zeroBasedCellIndex / 26) - 1
            } else {
                isCellIndexFound = true
            }
        }
        return columnName + (zeroBasedRowIndex + 1)
    },
    _convertToExcelCellRefAndTrackMaxIndex: function(rowIndex, cellIndex) {
        if (this._maxRowIndex < Number(rowIndex)) {
            this._maxRowIndex = Number(rowIndex)
        }
        if (this._maxColumnIndex < Number(cellIndex)) {
            this._maxColumnIndex = Number(cellIndex)
        }
        return this._convertToExcelCellRef(rowIndex, cellIndex)
    },
    _getDataType: function(dataType) {
        return VALID_TYPES[dataType] || VALID_TYPES.string
    },
    _tryGetExcelCellDataType: function(object) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(object)) {
            if ("number" === typeof object) {
                if (isFinite(object)) {
                    return VALID_TYPES.number
                } else {
                    return VALID_TYPES.string
                }
            } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isString"])(object)) {
                return VALID_TYPES.string
            } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDate"])(object)) {
                return VALID_TYPES.number
            } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isBoolean"])(object)) {
                return VALID_TYPES.boolean
            }
        }
    },
    _formatObjectConverter: function(format, dataType) {
        var result = {
            format: format,
            precision: format && format.precision,
            dataType: dataType
        };
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isObject"])(format)) {
            return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(result, format, {
                format: format.formatter || format.type,
                currency: format.currency
            })
        }
        return result
    },
    _tryConvertToExcelNumberFormat: function(format, dataType) {
        var newFormat = this._formatObjectConverter(format, dataType);
        format = newFormat.format;
        var currency = newFormat.currency;
        dataType = newFormat.dataType;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(format) && "date" === dataType) {
            format = UNSUPPORTED_FORMAT_MAPPING[format && format.type || format] || format
        }
        return _excel_format_converter__WEBPACK_IMPORTED_MODULE_8__["default"].convertFormat(format, newFormat.precision, dataType, currency)
    },
    _appendString: function(value) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(value)) {
            value = String(value);
            if (value.length) {
                value = Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_5__["encodeHtml"])(value);
                if (void 0 === this._stringHash[value]) {
                    this._stringHash[value] = this._stringArray.length;
                    this._stringArray.push(value)
                }
                return this._stringHash[value]
            }
        }
    },
    _tryGetExcelDateValue: function(date) {
        var days;
        var totalTime;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDate"])(date)) {
            days = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - EXCEL_START_TIME) / 864e5);
            if (days < DAYS_COUNT_BEFORE_29_FEB_1900) {
                days--
            }
            totalTime = (3600 * date.getHours() + 60 * date.getMinutes() + date.getSeconds()) / 86400;
            return days + totalTime
        }
    },
    _prepareValue: function(rowIndex, cellIndex) {
        var dataProvider = this._dataProvider;
        var {
            cellSourceData: cellSourceData
        } = dataProvider.getCellData(rowIndex, cellIndex) || {};
        var {
            value: value
        } = dataProvider.getCellData(rowIndex, cellIndex) || {};
        var sourceValue;
        var type = this._getDataType(dataProvider.getCellType(rowIndex, cellIndex));
        if (type === VALID_TYPES.date && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDate"])(value)) {
            type = VALID_TYPES.string
        }
        switch (type) {
            case VALID_TYPES.string:
                sourceValue = value;
                value = this._appendString(value);
                break;
            case VALID_TYPES.date:
                sourceValue = value;
                value = this._tryGetExcelDateValue(value);
                type = VALID_TYPES.number
        }
        return {
            value: value,
            type: type,
            sourceValue: sourceValue,
            cellSourceData: cellSourceData
        }
    },
    _callCustomizeExcelCell: function(_ref) {
        var {
            dataProvider: dataProvider,
            value: value,
            style: style,
            sourceData: sourceData
        } = _ref;
        var styleCopy = _excel_excel_file__WEBPACK_IMPORTED_MODULE_9__["default"].copyCellFormat(style);
        var args = {
            value: value,
            numberFormat: styleCopy.numberFormat,
            clearStyle: function() {
                this.horizontalAlignment = null;
                this.verticalAlignment = null;
                this.wrapTextEnabled = null;
                this.font = null;
                this.numberFormat = null
            }
        };
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(styleCopy)) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(styleCopy.alignment)) {
                args.horizontalAlignment = styleCopy.alignment.horizontal;
                args.verticalAlignment = styleCopy.alignment.vertical;
                args.wrapTextEnabled = styleCopy.alignment.wrapText
            }
            args.backgroundColor = styleCopy.backgroundColor;
            args.fillPatternType = styleCopy.fillPatternType;
            args.fillPatternColor = styleCopy.fillPatternColor;
            args.font = styleCopy.font
        }
        dataProvider.customizeExcelCell(args, sourceData);
        var newStyle = styleCopy || {};
        newStyle.font = args.font;
        newStyle.alignment = newStyle.alignment || {};
        newStyle.alignment.horizontal = args.horizontalAlignment;
        newStyle.alignment.vertical = args.verticalAlignment;
        newStyle.alignment.wrapText = args.wrapTextEnabled;
        newStyle.backgroundColor = args.backgroundColor;
        newStyle.fillPatternType = args.fillPatternType;
        newStyle.fillPatternColor = args.fillPatternColor;
        newStyle.numberFormat = args.numberFormat;
        return {
            value: args.value,
            style: newStyle
        }
    },
    _getDataArray: function() {
        var rowIndex;
        var cellIndex;
        var cellsArray;
        var cellData;
        var result = [];
        var dataProvider = this._dataProvider;
        var rowsLength = dataProvider.getRowsCount();
        var columns = dataProvider.getColumns();
        var cellsLength;
        for (rowIndex = 0; rowIndex < rowsLength; rowIndex++) {
            cellsArray = [];
            cellsLength = columns.length;
            for (cellIndex = 0; cellIndex !== cellsLength; cellIndex++) {
                cellData = this._prepareValue(rowIndex, cellIndex);
                var styleArrayIndex = dataProvider.getStyleId(rowIndex, cellIndex);
                var cellStyleId = this._styleArrayIndexToCellStyleIdMap[styleArrayIndex];
                if (dataProvider.hasCustomizeExcelCell && dataProvider.hasCustomizeExcelCell()) {
                    var value = cellData.sourceValue || cellData.value;
                    var modifiedExcelCell = this._callCustomizeExcelCell({
                        dataProvider: dataProvider,
                        value: value,
                        style: this._styleArray[styleArrayIndex],
                        sourceData: cellData.cellSourceData
                    });
                    if (modifiedExcelCell.value !== value) {
                        if (typeof modifiedExcelCell.value !== typeof value || "number" === typeof modifiedExcelCell.value && !isFinite(modifiedExcelCell.value)) {
                            var cellDataType = this._tryGetExcelCellDataType(modifiedExcelCell.value);
                            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(cellDataType)) {
                                cellData.type = cellDataType
                            }
                        }
                        switch (cellData.type) {
                            case VALID_TYPES.string:
                                cellData.value = this._appendString(modifiedExcelCell.value);
                                break;
                            case VALID_TYPES.date:
                                cellData.value = modifiedExcelCell.value;
                                break;
                            case VALID_TYPES.number:
                                var newValue = modifiedExcelCell.value;
                                var excelDateValue = this._tryGetExcelDateValue(newValue);
                                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(excelDateValue)) {
                                    newValue = excelDateValue
                                }
                                cellData.value = newValue;
                                break;
                            default:
                                cellData.value = modifiedExcelCell.value
                        }
                    }
                    cellStyleId = this._excelFile.registerCellFormat(modifiedExcelCell.style)
                }
                cellsArray.push({
                    style: cellStyleId,
                    value: cellData.value,
                    type: cellData.type
                })
            }
            if (!this._needSheetPr && dataProvider.getGroupLevel(rowIndex) > 0) {
                this._needSheetPr = true
            }
            result.push(cellsArray)
        }
        return result
    },
    _calculateWidth: function(pixelsWidth) {
        pixelsWidth = parseInt(pixelsWidth, 10);
        if (!pixelsWidth || pixelsWidth < 5) {
            pixelsWidth = 100
        }
        return Math.min(255, Math.floor((pixelsWidth - 5) / MAX_DIGIT_WIDTH_IN_PIXELS * 100 + .5) / 100)
    },
    _prepareStyleData: function() {
        var that = this;
        var styles = that._dataProvider.getStyles();
        that._dataProvider.getColumns().forEach((function(column) {
            that._colsArray.push(that._calculateWidth(column.width))
        }));
        var fonts = [{
            size: 11,
            color: {
                theme: 1
            },
            name: "Calibri",
            family: 2,
            scheme: "minor",
            bold: false
        }, {
            size: 11,
            color: {
                theme: 1
            },
            name: "Calibri",
            family: 2,
            scheme: "minor",
            bold: true
        }];
        this._excelFile.registerFont(fonts[0]);
        this._excelFile.registerFont(fonts[1]);
        styles.forEach((function(style) {
            var numberFormat = that._tryConvertToExcelNumberFormat(style.format, style.dataType);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(numberFormat)) {
                numberFormat = 0
            }
            that._styleArray.push({
                font: fonts[Number(!!style.bold)],
                numberFormat: numberFormat,
                alignment: {
                    vertical: "top",
                    wrapText: !!style.wrapText,
                    horizontal: style.alignment || "left"
                }
            })
        }));
        that._styleArrayIndexToCellStyleIdMap = that._styleArray.map(item => this._excelFile.registerCellFormat(item))
    },
    _prepareCellData: function() {
        this._cellsArray = this._getDataArray()
    },
    _createXMLRelationships: function(xmlRelationships) {
        return this._getXMLTag("Relationships", [{
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/package/2006/relationships"
        }], xmlRelationships)
    },
    _createXMLRelationship: function(id, type, target) {
        return this._getXMLTag("Relationship", [{
            name: "Id",
            value: "rId" + id
        }, {
            name: "Type",
            value: OPEN_XML_FORMAT_URL + "/officeDocument/2006/relationships/" + type
        }, {
            name: "Target",
            value: target
        }])
    },
    _getWorkbookContent: function() {
        return XML_TAG + this._getXMLTag("workbook", [{
            name: "xmlns:r",
            value: OPEN_XML_FORMAT_URL + "/officeDocument/2006/relationships"
        }, {
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/spreadsheetml/2006/main"
        }], '<bookViews><workbookView xWindow="0" yWindow="0" windowWidth="0" windowHeight="0"/></bookViews><sheets><sheet name="Sheet" sheetId="1" r:id="rId1" /></sheets><definedNames><definedName name="_xlnm.Print_Titles" localSheetId="0">Sheet!$1:$1</definedName><definedName name="_xlnm._FilterDatabase" hidden="0" localSheetId="0">Sheet!$A$1:$F$6332</definedName></definedNames>')
    },
    _getContentTypesContent: function() {
        return XML_TAG + '<Types xmlns="' + OPEN_XML_FORMAT_URL + '/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="xml" ContentType="application/xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /></Types>'
    },
    _generateStylesXML: function() {
        var folder = this._zip.folder(XL_FOLDER_NAME);
        var XML = "";
        XML += this._excelFile.generateNumberFormatsXml();
        XML += this._excelFile.generateFontsXml();
        XML += this._excelFile.generateFillsXml();
        XML += BASE_STYLE_XML2;
        XML += this._excelFile.generateCellFormatsXml();
        XML += this._getXMLTag("cellStyles", [{
            name: "count",
            value: 1
        }], this._getXMLTag("cellStyle", [{
            name: "name",
            value: "Normal"
        }, {
            name: "xfId",
            value: 0
        }, {
            name: "builtinId",
            value: 0
        }]));
        XML = XML_TAG + this._getXMLTag("styleSheet", [{
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/spreadsheetml/2006/main"
        }], XML);
        folder.file(STYLE_FILE_NAME, XML);
        this._styleArray = []
    },
    _generateStringsXML: function() {
        var folder = this._zip.folder(XL_FOLDER_NAME);
        var stringIndex;
        var stringsLength = this._stringArray.length;
        var sharedStringXml = XML_TAG;
        for (stringIndex = 0; stringIndex < stringsLength; stringIndex++) {
            this._stringArray[stringIndex] = this._getXMLTag("si", [], this._getXMLTag("t", [], this._stringArray[stringIndex]))
        }
        sharedStringXml += this._getXMLTag("sst", [{
            name: "xmlns",
            value: OPEN_XML_FORMAT_URL + "/spreadsheetml/2006/main"
        }, {
            name: "count",
            value: this._stringArray.length
        }, {
            name: "uniqueCount",
            value: this._stringArray.length
        }], this._stringArray.join(""));
        folder.file(SHAREDSTRING_FILE_NAME, sharedStringXml);
        this._stringArray = []
    },
    _getPaneXML: function() {
        var attributes = [{
            name: "activePane",
            value: "bottomLeft"
        }, {
            name: "state",
            value: "frozen"
        }];
        var frozenArea = this._dataProvider.getFrozenArea();
        if (!(frozenArea.x || frozenArea.y)) {
            return ""
        }
        if (frozenArea.x) {
            attributes.push({
                name: "xSplit",
                value: frozenArea.x
            })
        }
        if (frozenArea.y) {
            attributes.push({
                name: "ySplit",
                value: frozenArea.y
            })
        }
        attributes.push({
            name: "topLeftCell",
            value: this._convertToExcelCellRefAndTrackMaxIndex(frozenArea.y, frozenArea.x)
        });
        return this._getXMLTag("pane", attributes)
    },
    _getAutoFilterXML: function(maxCellIndex) {
        if (this._options.autoFilterEnabled) {
            return '<autoFilter ref="A' + this._dataProvider.getHeaderRowCount() + ":" + maxCellIndex + '" />'
        }
        return ""
    },
    _getIgnoredErrorsXML: function(maxCellIndex) {
        if (this._options.ignoreErrors) {
            return '<ignoredErrors><ignoredError sqref="A1:' + maxCellIndex + '" numberStoredAsText="1" /></ignoredErrors>'
        }
        return ""
    },
    _generateWorksheetXML: function() {
        var colIndex;
        var rowIndex;
        var cellData;
        var xmlCells;
        var xmlRows = [];
        var rowsLength = this._cellsArray.length;
        var cellsLength;
        var colsLength = this._colsArray.length;
        var rSpans = "1:" + colsLength;
        var headerRowCount = this._dataProvider.getHeaderRowCount ? this._dataProvider.getHeaderRowCount() : 1;
        var xmlResult = [WORKSHEET_HEADER_XML];
        xmlResult.push(this._needSheetPr ? GROUP_SHEET_PR_XML : SINGLE_SHEET_PR_XML);
        xmlResult.push('<dimension ref="A1:C1"/>');
        xmlResult.push("<sheetViews><sheetView ");
        xmlResult.push(this._rtlEnabled ? 'rightToLeft="1" ' : "");
        xmlResult.push('tabSelected="1" workbookViewId="0">');
        xmlResult.push(this._getPaneXML());
        xmlResult.push("</sheetView></sheetViews>");
        xmlResult.push('<sheetFormatPr defaultRowHeight="15"');
        xmlResult.push(' outlineLevelRow="' + (this._dataProvider.getRowsCount() > 0 ? this._dataProvider.getGroupLevel(0) : 0) + '"');
        xmlResult.push(' x14ac:dyDescent="0.25"/>');
        for (colIndex = 0; colIndex < colsLength; colIndex++) {
            this._colsArray[colIndex] = this._getXMLTag("col", [{
                name: "width",
                value: this._colsArray[colIndex]
            }, {
                name: "min",
                value: Number(colIndex) + 1
            }, {
                name: "max",
                value: Number(colIndex) + 1
            }, {
                name: "customWidth",
                value: 1
            }])
        }
        xmlResult.push(this._getXMLTag("cols", [], this._colsArray.join("")) + "<sheetData>");
        for (rowIndex = 0; rowIndex < rowsLength; rowIndex++) {
            xmlCells = [];
            cellsLength = this._cellsArray[rowIndex].length;
            for (colIndex = 0; colIndex < cellsLength; colIndex++) {
                rowIndex = Number(rowIndex);
                cellData = this._cellsArray[rowIndex][colIndex];
                xmlCells.push(this._getXMLTag("c", [{
                    name: "r",
                    value: this._convertToExcelCellRefAndTrackMaxIndex(rowIndex, colIndex)
                }, {
                    name: "s",
                    value: cellData.style
                }, {
                    name: "t",
                    value: cellData.type
                }], Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(cellData.value) ? this._getXMLTag("v", [], cellData.value) : null))
            }
            xmlRows.push(this._getXMLTag("row", [{
                name: "r",
                value: Number(rowIndex) + 1
            }, {
                name: "spans",
                value: rSpans
            }, {
                name: "outlineLevel",
                value: rowIndex >= headerRowCount ? this._dataProvider.getGroupLevel(rowIndex) : 0
            }, {
                name: "x14ac:dyDescent",
                value: "0.25"
            }], xmlCells.join("")));
            this._cellsArray[rowIndex] = null;
            if (xmlRows.length > 1e4) {
                xmlResult.push(xmlRows.join(""));
                xmlRows = []
            }
        }
        xmlResult.push(xmlRows.join(""));
        xmlRows = [];
        var rightBottomCellRef = this._convertToExcelCellRef(this._maxRowIndex, this._maxColumnIndex);
        xmlResult.push("</sheetData>" + this._getAutoFilterXML(rightBottomCellRef) + this._generateMergingXML() + this._getIgnoredErrorsXML(rightBottomCellRef) + "</worksheet>");
        this._zip.folder(XL_FOLDER_NAME).folder(WORKSHEETS_FOLDER).file(WORKSHEET_FILE_NAME, xmlResult.join(""));
        this._colsArray = [];
        this._cellsArray = [];
        xmlResult = []
    },
    _generateMergingXML: function() {
        var k;
        var l;
        var cellIndex;
        var rowIndex;
        var rowsLength = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(this._dataProvider.getHeaderRowCount) ? this._dataProvider.getHeaderRowCount() : this._dataProvider.getRowsCount();
        var columnsLength = this._dataProvider.getColumns().length;
        var usedArea = [];
        var mergeArray = [];
        var mergeIndex;
        var mergeXML = "";
        for (rowIndex = 0; rowIndex < rowsLength; rowIndex++) {
            for (cellIndex = 0; cellIndex !== columnsLength; cellIndex++) {
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(usedArea[rowIndex]) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(usedArea[rowIndex][cellIndex])) {
                    var cellMerge = this._dataProvider.getCellMerging(rowIndex, cellIndex);
                    if (cellMerge.colspan || cellMerge.rowspan) {
                        mergeArray.push({
                            start: this._convertToExcelCellRefAndTrackMaxIndex(rowIndex, cellIndex),
                            end: this._convertToExcelCellRefAndTrackMaxIndex(rowIndex + (cellMerge.rowspan || 0), cellIndex + (cellMerge.colspan || 0))
                        });
                        for (k = rowIndex; k <= rowIndex + cellMerge.rowspan || 0; k++) {
                            for (l = cellIndex; l <= cellIndex + cellMerge.colspan || 0; l++) {
                                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(usedArea[k])) {
                                    usedArea[k] = []
                                }
                                usedArea[k][l] = true
                            }
                        }
                    }
                }
            }
        }
        var mergeArrayLength = mergeArray.length;
        for (mergeIndex = 0; mergeIndex < mergeArrayLength; mergeIndex++) {
            mergeXML += this._getXMLTag("mergeCell", [{
                name: "ref",
                value: mergeArray[mergeIndex].start + ":" + mergeArray[mergeIndex].end
            }])
        }
        return mergeXML.length ? this._getXMLTag("mergeCells", [{
            name: "count",
            value: mergeArrayLength
        }], mergeXML) : ""
    },
    _generateCommonXML: function() {
        var relsFileContent = XML_TAG + this._createXMLRelationships(this._createXMLRelationship(1, "officeDocument", "xl/" + WORKBOOK_FILE_NAME));
        var folder = this._zip.folder(XL_FOLDER_NAME);
        var relsXML = XML_TAG;
        this._zip.folder("_" + RELATIONSHIP_PART_NAME).file("." + RELATIONSHIP_PART_NAME, relsFileContent);
        var xmlRelationships = this._createXMLRelationship(1, "worksheet", "worksheets/" + WORKSHEET_FILE_NAME) + this._createXMLRelationship(2, "styles", STYLE_FILE_NAME) + this._createXMLRelationship(3, "sharedStrings", SHAREDSTRING_FILE_NAME);
        relsXML += this._createXMLRelationships(xmlRelationships);
        folder.folder("_" + RELATIONSHIP_PART_NAME).file(WORKBOOK_FILE_NAME + ".rels", relsXML);
        folder.file(WORKBOOK_FILE_NAME, this._getWorkbookContent());
        this._zip.file(CONTENTTYPES_FILE_NAME, this._getContentTypesContent())
    },
    _generateContent: function() {
        this._prepareStyleData();
        this._prepareCellData();
        this._generateWorkXML();
        this._generateCommonXML()
    },
    _generateWorkXML: function() {
        this._generateStylesXML();
        this._generateStringsXML();
        this._generateWorksheetXML()
    },
    ctor: function(dataProvider, options) {
        this._rtlEnabled = options && !!options.rtlEnabled;
        this._options = options;
        this._maxRowIndex = 0;
        this._maxColumnIndex = 0;
        this._stringArray = [];
        this._stringHash = {};
        this._styleArray = [];
        this._colsArray = [];
        this._cellsArray = [];
        this._needSheetPr = false;
        this._dataProvider = dataProvider;
        this._excelFile = new _excel_excel_file__WEBPACK_IMPORTED_MODULE_9__["default"];
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(ExcelCreator.JSZip)) {
            this._zip = new ExcelCreator.JSZip
        } else {
            this._zip = null
        }
    },
    _checkZipState: function() {
        if (!this._zip) {
            throw _ui_widget_ui_errors__WEBPACK_IMPORTED_MODULE_4__["default"].Error("E1041", "JSZip")
        }
    },
    ready: function() {
        return this._dataProvider.ready()
    },
    getData: function(isBlob) {
        var options = {
            type: isBlob ? "blob" : "base64",
            compression: "DEFLATE",
            mimeType: _file_saver__WEBPACK_IMPORTED_MODULE_7__["MIME_TYPES"].EXCEL
        };
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
        this._checkZipState();
        this._generateContent();
        if (this._zip.generateAsync) {
            this._zip.generateAsync(options).then(deferred.resolve)
        } else {
            deferred.resolve(this._zip.generate(options))
        }
        return deferred
    }
});
ExcelCreator.JSZip = jszip__WEBPACK_IMPORTED_MODULE_6___default.a;
function getData(data, options) {
    var excelCreator = new ExcelCreator(data, options);
    excelCreator._checkZipState();
    return excelCreator.ready().then(() => excelCreator.getData(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])().Blob)))
}


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/excel_format_converter.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/excel_format_converter.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/string */ "./node_modules/devextreme/esm/core/utils/string.js");
/* harmony import */ var _localization_number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../localization/number */ "./node_modules/devextreme/esm/localization/number.js");
/* harmony import */ var _localization_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../localization/date */ "./node_modules/devextreme/esm/localization/date.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _localization_ldml_date_format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../localization/ldml/date.format */ "./node_modules/devextreme/esm/localization/ldml/date.format.js");
/* harmony import */ var _localization_language_codes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../localization/language_codes */ "./node_modules/devextreme/esm/localization/language_codes.js");
/* harmony import */ var _localization_currency__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../localization/currency */ "./node_modules/devextreme/esm/localization/currency.js");
/**
 * DevExtreme (esm/exporter/excel_format_converter.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var ARABIC_ZERO_CODE = 1632;
var DEFINED_NUMBER_FORMTATS = {
    thousands: "#,##0{0},&quot;K&quot;",
    millions: "#,##0{0},,&quot;M&quot;",
    billions: "#,##0{0},,,&quot;B&quot;",
    trillions: "#,##0{0},,,,&quot;T&quot;",
    percent: "0{0}%",
    decimal: "#{0}",
    fixedpoint: "#,##0{0}",
    exponential: "0{0}E+00",
    currency: " "
};
var PERIOD_REGEXP = /a+/g;
var DAY_REGEXP = /E/g;
var DO_REGEXP = /dE+/g;
var STANDALONE_MONTH_REGEXP = /L/g;
var HOUR_REGEXP = /h/g;
var ANY_REGEXP = /./g;
var excelFormatConverter = {
    _applyPrecision: function(format, precision) {
        var result;
        var i;
        if (precision > 0) {
            result = "decimal" !== format ? "." : "";
            for (i = 0; i < precision; i++) {
                result += "0"
            }
            return result
        }
        return ""
    },
    _hasArabicDigits: function(text) {
        var code;
        for (var i = 0; i < text.length; i++) {
            code = text.charCodeAt(i);
            if (code >= ARABIC_ZERO_CODE && code < ARABIC_ZERO_CODE + 10) {
                return true
            }
        }
        return false
    },
    _convertDateFormatToOpenXml: function(format) {
        return format.split("/").join("\\/").split("'").map((function(datePart, index) {
            if (index % 2 === 0) {
                return datePart.replace(PERIOD_REGEXP, "AM/PM").replace(DO_REGEXP, "d").replace(DAY_REGEXP, "d").replace(STANDALONE_MONTH_REGEXP, "M").replace(HOUR_REGEXP, "H").split("[").join("\\[").split("]").join("\\]")
            }
            if (datePart) {
                return datePart.replace(ANY_REGEXP, "\\$&")
            }
            return "'"
        })).join("")
    },
    _convertDateFormat: function(format) {
        var formattedValue = (_localization_date__WEBPACK_IMPORTED_MODULE_2__["default"].format(new Date(2009, 8, 8, 6, 5, 4), format) || "").toString();
        var result = Object(_localization_ldml_date_format__WEBPACK_IMPORTED_MODULE_4__["getFormat"])(value => _localization_date__WEBPACK_IMPORTED_MODULE_2__["default"].format(value, format));
        if (result) {
            result = this._convertDateFormatToOpenXml(result);
            result = this._getLanguageInfo(formattedValue) + result
        }
        return result
    },
    _getLanguageInfo: function(defaultPattern) {
        var languageID = Object(_localization_language_codes__WEBPACK_IMPORTED_MODULE_5__["getLanguageId"])();
        var languageIDStr = languageID ? languageID.toString(16) : "";
        var languageInfo = "";
        if (this._hasArabicDigits(defaultPattern)) {
            while (languageIDStr.length < 3) {
                languageIDStr = "0" + languageIDStr
            }
            languageInfo = "[$-2010" + languageIDStr + "]"
        } else if (languageIDStr) {
            languageInfo = "[$-" + languageIDStr + "]"
        }
        return languageInfo
    },
    _convertNumberFormat: function(format, precision, currency) {
        var result;
        var excelFormat;
        if ("currency" === format) {
            excelFormat = _localization_number__WEBPACK_IMPORTED_MODULE_1__["default"].getOpenXmlCurrencyFormat(currency)
        } else {
            excelFormat = DEFINED_NUMBER_FORMTATS[format.toLowerCase()]
        }
        if (excelFormat) {
            result = Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_0__["format"])(excelFormat, this._applyPrecision(format, precision))
        }
        return result
    },
    convertFormat: function(format, precision, type, currency) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(format)) {
            if ("date" === type) {
                return excelFormatConverter._convertDateFormat(format)
            } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isString"])(format) && DEFINED_NUMBER_FORMTATS[format.toLowerCase()]) {
                return excelFormatConverter._convertNumberFormat(format, precision, currency)
            }
        }
    }
};
/* harmony default export */ __webpack_exports__["default"] = (excelFormatConverter);


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/file_saver.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/file_saver.js ***!
  \************************************************************/
/*! exports provided: MIME_TYPES, fileSaver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIME_TYPES", function() { return MIME_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileSaver", function() { return fileSaver; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _ui_widget_ui_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_console__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/console */ "./node_modules/devextreme/esm/core/utils/console.js");
/**
 * DevExtreme (esm/exporter/file_saver.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["getWindow"])();
var navigator = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["getNavigator"])();
var FILE_EXTESIONS = {
    EXCEL: "xlsx",
    CSS: "css",
    PNG: "png",
    JPEG: "jpeg",
    GIF: "gif",
    SVG: "svg",
    PDF: "pdf"
};
var MIME_TYPES = {
    CSS: "text/css",
    EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    PNG: "image/png",
    JPEG: "image/jpeg",
    GIF: "image/gif",
    SVG: "image/svg+xml",
    PDF: "application/pdf"
};
var fileSaver = {
    _revokeObjectURLTimeout: 3e4,
    _getDataUri: function(format, data) {
        var mimeType = this._getMimeType(format);
        return "data:".concat(mimeType, ";base64,").concat(data)
    },
    _getMimeType: function(format) {
        return MIME_TYPES[format] || "application/octet-stream"
    },
    _linkDownloader: function(fileName, href) {
        var exportLinkElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("a");
        exportLinkElement.download = fileName;
        exportLinkElement.href = href;
        exportLinkElement.target = "_blank";
        return exportLinkElement
    },
    _formDownloader: function(proxyUrl, fileName, contentType, data) {
        var formAttributes = {
            method: "post",
            action: proxyUrl,
            enctype: "multipart/form-data"
        };
        var exportForm = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<form>").css({
            display: "none"
        }).attr(formAttributes);

        function setAttributes(element, attributes) {
            for (var key in attributes) {
                element.setAttribute(key, attributes[key])
            }
            return element
        }
        exportForm.append(setAttributes(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("input"), {
            type: "hidden",
            name: "fileName",
            value: fileName
        }));
        exportForm.append(setAttributes(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("input"), {
            type: "hidden",
            name: "contentType",
            value: contentType
        }));
        exportForm.append(setAttributes(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("input"), {
            type: "hidden",
            name: "data",
            value: data
        }));
        exportForm.appendTo("body");
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].trigger(exportForm, "submit");
        if (_events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].trigger(exportForm, "submit")) {
            exportForm.remove()
        }
    },
    _saveByProxy: function(proxyUrl, fileName, format, data) {
        var contentType = this._getMimeType(format);
        return this._formDownloader(proxyUrl, fileName, contentType, data)
    },
    _winJSBlobSave: function(blob, fileName, format) {
        var savePicker = new Windows.Storage.Pickers.FileSavePicker;
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        var fileExtension = FILE_EXTESIONS[format];
        if (fileExtension) {
            var mimeType = this._getMimeType(format);
            savePicker.fileTypeChoices.insert(mimeType, ["." + fileExtension])
        }
        savePicker.suggestedFileName = fileName;
        savePicker.pickSaveFileAsync().then((function(file) {
            if (file) {
                file.openAsync(Windows.Storage.FileAccessMode.readWrite).then((function(outputStream) {
                    var inputStream = blob.msDetachStream();
                    Windows.Storage.Streams.RandomAccessStream.copyAsync(inputStream, outputStream).then((function() {
                        outputStream.flushAsync().done((function() {
                            inputStream.close();
                            outputStream.close()
                        }))
                    }))
                }))
            }
        }))
    },
    _click: function(link) {
        try {
            link.dispatchEvent(new MouseEvent("click", {
                cancelable: true
            }))
        } catch (e) {
            var event = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getDocument().createEvent("MouseEvents");
            event.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            link.dispatchEvent(event)
        }
    },
    _saveBlobAs: function(fileName, format, data) {
        this._blobSaved = false;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(navigator.msSaveOrOpenBlob)) {
            navigator.msSaveOrOpenBlob(data, fileName);
            this._blobSaved = true
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(window.WinJS)) {
            this._winJSBlobSave(data, fileName, format);
            this._blobSaved = true
        } else {
            var URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(URL)) {
                var objectURL = URL.createObjectURL(data);
                var downloadLink = this._linkDownloader(fileName, objectURL);
                setTimeout(() => {
                    URL.revokeObjectURL(objectURL);
                    this._objectUrlRevoked = true
                }, this._revokeObjectURLTimeout);
                this._click(downloadLink)
            } else {
                _core_utils_console__WEBPACK_IMPORTED_MODULE_6__["logger"].warn("window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL is not defined")
            }
        }
    },
    saveAs: function(fileName, format, data, proxyURL, forceProxy) {
        var fileExtension = FILE_EXTESIONS[format];
        if (fileExtension) {
            fileName += "." + fileExtension
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(proxyURL)) {
            _ui_widget_ui_errors__WEBPACK_IMPORTED_MODULE_4__["default"].log("W0001", "Export", "proxyURL", "19.2", "This option is no longer required")
        }
        if (forceProxy) {
            this._saveByProxy(proxyURL, fileName, format, data)
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(window.Blob)) {
            this._saveBlobAs(fileName, format, data)
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(proxyURL) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(navigator.userAgent.match(/iPad/i))) {
            this._saveByProxy(proxyURL, fileName, format, data)
        } else {
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(navigator.userAgent.match(/iPad/i))) {
                _ui_widget_ui_errors__WEBPACK_IMPORTED_MODULE_4__["default"].log("E1034")
            }
            var downloadLink = this._linkDownloader(fileName, this._getDataUri(format, data));
            this._click(downloadLink)
        }
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/image_creator.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/image_creator.js ***!
  \***************************************************************/
/*! exports provided: imageCreator, getData, testFormats, calcScaledInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageCreator", function() { return imageCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testFormats", function() { return testFormats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcScaledInfo", function() { return calcScaledInfo; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color */ "./node_modules/devextreme/esm/color.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/svg */ "./node_modules/devextreme/esm/core/utils/svg.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_inflector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/inflector */ "./node_modules/devextreme/esm/core/utils/inflector.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/exporter/image_creator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_8__["getWindow"])();


var _math = Math;
var PI = _math.PI;
var _min = _math.min;
var _abs = _math.abs;
var _sqrt = _math.sqrt;
var _pow = _math.pow;
var _atan2 = _math.atan2;
var _cos = _math.cos;
var _sin = _math.sin;
var _number = Number;
var IMAGE_QUALITY = 1;
var TEXT_DECORATION_LINE_WIDTH_COEFF = .05;
var DEFAULT_FONT_SIZE = "10px";
var DEFAULT_FONT_FAMILY = "sans-serif";
var DEFAULT_TEXT_COLOR = "#000";
var parseAttributes;

function getStringFromCanvas(canvas, mimeType) {
    var dataURL = canvas.toDataURL(mimeType, IMAGE_QUALITY);
    var imageData = window.atob(dataURL.substring(("data:" + mimeType + ";base64,").length));
    return imageData
}

function arcTo(x1, y1, x2, y2, radius, largeArcFlag, clockwise, context) {
    var cBx = (x1 + x2) / 2;
    var cBy = (y1 + y2) / 2;
    var aB = _atan2(y1 - y2, x1 - x2);
    var k = largeArcFlag ? 1 : -1;
    aB += PI / 180 * 90 * (clockwise ? 1 : -1);
    var opSide = _sqrt(_pow(x2 - x1, 2) + _pow(y2 - y1, 2)) / 2;
    var adjSide = _sqrt(_abs(_pow(radius, 2) - _pow(opSide, 2)));
    var centerX = cBx + k * (adjSide * _cos(aB));
    var centerY = cBy + k * (adjSide * _sin(aB));
    var startAngle = _atan2(y1 - centerY, x1 - centerX);
    var endAngle = _atan2(y2 - centerY, x2 - centerX);
    context.arc(centerX, centerY, radius, startAngle, endAngle, !clockwise)
}

function getElementOptions(element, rootAppended) {
    var attr = parseAttributes(element.attributes || {});
    var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])({}, attr, {
        text: element.textContent.replace(/\s+/g, " "),
        textAlign: "middle" === attr["text-anchor"] ? "center" : attr["text-anchor"]
    });
    var transform = attr.transform;
    var coords;
    if (transform) {
        coords = transform.match(/translate\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*)*/);
        if (coords) {
            coords = coords[0].match(/-*\d+([.]\d+)*/g);
            options.translateX = _number(coords[0]);
            options.translateY = coords[1] ? _number(coords[1]) : 0
        }
        coords = transform.match(/rotate\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*,*\s*-*\d+([.]\d+)*)*/);
        if (coords) {
            coords = coords[0].match(/-*\d+([.]\d+)*/g);
            options.rotationAngle = _number(coords[0]);
            options.rotationX = coords[1] && _number(coords[1]);
            options.rotationY = coords[2] && _number(coords[2])
        }
        coords = transform.match(/scale\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*)*/);
        if (coords) {
            coords = coords[0].match(/-*\d+([.]\d+)*/g);
            options.scaleX = _number(coords[0]);
            if (coords.length > 1) {
                options.scaleY = _number(coords[1])
            } else {
                options.scaleY = options.scaleX
            }
        }
    }
    parseStyles(element, options, rootAppended);
    return options
}

function drawRect(context, options) {
    var x = options.x;
    var y = options.y;
    var width = options.width;
    var height = options.height;
    var cornerRadius = options.rx;
    if (!cornerRadius) {
        context.rect(x, y, width, height)
    } else {
        cornerRadius = _min(cornerRadius, width / 2, height / 2);
        context.save();
        context.translate(x, y);
        context.moveTo(width / 2, 0);
        context.arcTo(width, 0, width, height, cornerRadius);
        context.arcTo(width, height, 0, height, cornerRadius);
        context.arcTo(0, height, 0, 0, cornerRadius);
        context.arcTo(0, 0, cornerRadius, 0, cornerRadius);
        context.lineTo(width / 2, 0);
        context.restore()
    }
}

function drawImage(context, options, shared) {
    var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
    var image = new window.Image;
    image.onload = function() {
        context.save();
        context.globalAlpha = options.globalAlpha;
        transformElement(context, options);
        clipElement(context, options, shared);
        context.drawImage(image, options.x || 0, options.y || 0, options.width, options.height);
        context.restore();
        d.resolve()
    };
    image.onerror = function() {
        d.resolve()
    };
    image.setAttribute("crossOrigin", "anonymous");
    image.src = options.href || options["xlink:href"];
    return d
}

function drawPath(context, dAttr) {
    var dArray = dAttr.replace(/,/g, " ").split(/([A-Z])/i).filter(item => "" !== item.trim());
    var i = 0;
    var params;
    var prevParams;
    var prevParamsLen;
    do {
        params = (dArray[i + 1] || "").trim().split(" ");
        switch (dArray[i]) {
            case "M":
                context.moveTo(_number(params[0]), _number(params[1]));
                i += 2;
                break;
            case "L":
                for (var j = 0; j < params.length / 2; j++) {
                    context.lineTo(_number(params[2 * j]), _number(params[2 * j + 1]))
                }
                i += 2;
                break;
            case "C":
                context.bezierCurveTo(_number(params[0]), _number(params[1]), _number(params[2]), _number(params[3]), _number(params[4]), _number(params[5]));
                i += 2;
                break;
            case "a":
                prevParams = dArray[i - 1].trim().split(" ");
                prevParamsLen = prevParams.length - 1;
                arcTo(_number(prevParams[prevParamsLen - 1]), _number(prevParams[prevParamsLen]), _number(prevParams[prevParamsLen - 1]) + _number(params[5]), _number(prevParams[prevParamsLen]) + _number(params[6]), _number(params[0]), _number(params[3]), _number(params[4]), context);
                i += 2;
                break;
            case "A":
                prevParams = dArray[i - 1].trim().split(" ");
                prevParamsLen = prevParams.length - 1;
                arcTo(_number(prevParams[prevParamsLen - 1]), _number(prevParams[prevParamsLen]), _number(params[5]), _number(params[6]), _number(params[0]), _number(params[3]), _number(params[4]), context);
                i += 2;
                break;
            case "Z":
                context.closePath();
                i += 1;
                break;
            default:
                i++
        }
    } while (i < dArray.length)
}

function parseStyles(element, options, rootAppended) {
    var style = element.style || {};
    var field;
    for (field in style) {
        if ("" !== style[field]) {
            options[Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_9__["camelize"])(field)] = style[field]
        }
    }
    if (rootAppended && _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].isElementNode(element)) {
        style = window.getComputedStyle(element);
        ["fill", "stroke", "stroke-width", "font-family", "font-size", "font-style", "font-weight"].forEach((function(prop) {
            if (prop in style && "" !== style[prop]) {
                options[Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_9__["camelize"])(prop)] = style[prop]
            }
        }));
        ["opacity", "fill-opacity", "stroke-opacity"].forEach((function(prop) {
            if (prop in style && "" !== style[prop] && "1" !== style[prop]) {
                options[prop] = _number(style[prop])
            }
        }))
    }
    options.textDecoration = options.textDecoration || options.textDecorationLine;
    options.globalAlpha = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(options.opacity) ? options.opacity : options.globalAlpha
}

function parseUrl(urlString) {
    var matches = urlString && urlString.match(/url\(.*#(.*?)["']?\)/i);
    return matches && matches[1]
}

function setFontStyle(context, options) {
    var fontParams = [];
    options.fontSize = options.fontSize || DEFAULT_FONT_SIZE;
    options.fontFamily = options.fontFamily || DEFAULT_FONT_FAMILY;
    options.fill = options.fill || DEFAULT_TEXT_COLOR;
    options.fontStyle && fontParams.push(options.fontStyle);
    options.fontWeight && fontParams.push(options.fontWeight);
    fontParams.push(options.fontSize);
    fontParams.push(options.fontFamily);
    context.font = fontParams.join(" ");
    context.textAlign = options.textAlign;
    context.fillStyle = options.fill;
    context.globalAlpha = options.globalAlpha
}

function drawText(context, options, shared) {
    setFontStyle(context, options);
    applyFilter(context, options, shared);
    options.text && context.fillText(options.text, options.x || 0, options.y || 0);
    strokeElement(context, options, true);
    drawTextDecoration(context, options, shared)
}

function drawTextDecoration(context, options, shared) {
    if (!options.textDecoration || "none" === options.textDecoration) {
        return
    }
    var x = options.x;
    var textWidth = context.measureText(options.text).width;
    var textHeight = parseInt(options.fontSize, 10);
    var lineHeight = textHeight * TEXT_DECORATION_LINE_WIDTH_COEFF < 1 ? 1 : textHeight * TEXT_DECORATION_LINE_WIDTH_COEFF;
    var y = options.y;
    switch (options.textDecoration) {
        case "line-through":
            y -= textHeight / 3 + lineHeight / 2;
            break;
        case "overline":
            y -= textHeight - lineHeight;
            break;
        case "underline":
            y += lineHeight
    }
    context.rect(x, y, textWidth, lineHeight);
    fillElement(context, options, shared);
    strokeElement(context, options)
}

function aggregateOpacity(options) {
    options.strokeOpacity = void 0 !== options["stroke-opacity"] ? options["stroke-opacity"] : 1;
    options.fillOpacity = void 0 !== options["fill-opacity"] ? options["fill-opacity"] : 1;
    if (void 0 !== options.opacity) {
        options.strokeOpacity *= options.opacity;
        options.fillOpacity *= options.opacity
    }
}

function hasTspan(element) {
    var nodes = element.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if ("tspan" === nodes[i].tagName) {
            return true
        }
    }
    return false
}

function drawTextElement(childNodes, context, options, shared) {
    var lines = [];
    var line;
    var offset = 0;
    for (var i = 0; i < childNodes.length; i++) {
        var element = childNodes[i];
        if (void 0 === element.tagName) {
            drawElement(element, context, options, shared)
        } else if ("tspan" === element.tagName || "text" === element.tagName) {
            var elementOptions = getElementOptions(element, shared.rootAppended);
            var mergedOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])({}, options, elementOptions);
            if ("tspan" === element.tagName && hasTspan(element)) {
                drawTextElement(element.childNodes, context, mergedOptions, shared);
                continue
            }
            mergedOptions.textAlign = "start";
            if (!line || void 0 !== elementOptions.x) {
                line = {
                    elements: [],
                    options: [],
                    widths: [],
                    offsets: []
                };
                lines.push(line)
            }
            if (void 0 !== elementOptions.y) {
                offset = 0
            }
            if (void 0 !== elementOptions.dy) {
                offset += parseFloat(elementOptions.dy)
            }
            line.elements.push(element);
            line.options.push(mergedOptions);
            line.offsets.push(offset);
            setFontStyle(context, mergedOptions);
            line.widths.push(context.measureText(mergedOptions.text).width)
        }
    }
    lines.forEach((function(line) {
        var commonWidth = line.widths.reduce((function(commonWidth, width) {
            return commonWidth + width
        }), 0);
        var xDiff = 0;
        var currentOffset = 0;
        if ("center" === options.textAlign) {
            xDiff = commonWidth / 2
        }
        if ("end" === options.textAlign) {
            xDiff = commonWidth
        }
        line.options.forEach((function(o, index) {
            var width = line.widths[index];
            o.x = o.x - xDiff + currentOffset;
            o.y += line.offsets[index];
            currentOffset += width
        }));
        line.elements.forEach((function(element, index) {
            drawTextElement(element.childNodes, context, line.options[index], shared)
        }))
    }))
}

function drawElement(element, context, parentOptions, shared) {
    var tagName = element.tagName;
    var isText = "text" === tagName || "tspan" === tagName || void 0 === tagName;
    var isImage = "image" === tagName;
    var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])({}, parentOptions, getElementOptions(element, shared.rootAppended));
    if ("hidden" === options.visibility || options[_core_utils_svg__WEBPACK_IMPORTED_MODULE_3__["HIDDEN_FOR_EXPORT"]]) {
        return
    }
    context.save();
    !isImage && transformElement(context, options);
    clipElement(context, options, shared);
    aggregateOpacity(options);
    var promise;
    context.beginPath();
    switch (element.tagName) {
        case void 0:
            drawText(context, options, shared);
            break;
        case "text":
        case "tspan":
            drawTextElement(element.childNodes, context, options, shared);
            break;
        case "image":
            promise = drawImage(context, options, shared);
            break;
        case "path":
            drawPath(context, options.d);
            break;
        case "rect":
            drawRect(context, options);
            context.closePath();
            break;
        case "circle":
            context.arc(options.cx, options.cy, options.r, 0, 2 * PI, 1)
    }
    if (!isText) {
        applyFilter(context, options, shared);
        fillElement(context, options, shared);
        strokeElement(context, options)
    }
    applyGradient(context, options, shared, element);
    context.restore();
    return promise
}

function applyGradient(context, options, _ref, element) {
    var {
        gradients: gradients
    } = _ref;
    if (0 === gradients.length) {
        return
    }
    var id = parseUrl(options.fill);
    if (id && gradients[id]) {
        var box = element.getBBox();
        var gradient = context.createLinearGradient(box.x, 0, box.x + box.width, 0);
        gradients[id].forEach(opt => {
            var offset = parseInt(opt.offset.replace(/%/, ""));
            gradient.addColorStop(offset / 100, opt.stopColor)
        });
        context.globalAlpha = options.opacity;
        context.fillStyle = gradient;
        context.fill()
    }
}

function applyFilter(context, options, shared) {
    var filterOptions;
    var id = parseUrl(options.filter);
    if (id) {
        filterOptions = shared.filters[id];
        if (!filterOptions) {
            filterOptions = {
                offsetX: 0,
                offsetY: 0,
                blur: 0,
                color: "#000"
            }
        }
        context.shadowOffsetX = filterOptions.offsetX;
        context.shadowOffsetY = filterOptions.offsetY;
        context.shadowColor = filterOptions.color;
        context.shadowBlur = filterOptions.blur
    }
}

function transformElement(context, options) {
    context.translate(options.translateX || 0, options.translateY || 0);
    options.translateX = void 0;
    options.translateY = void 0;
    if (options.rotationAngle) {
        context.translate(options.rotationX || 0, options.rotationY || 0);
        context.rotate(options.rotationAngle * PI / 180);
        context.translate(-(options.rotationX || 0), -(options.rotationY || 0));
        options.rotationAngle = void 0;
        options.rotationX = void 0;
        options.rotationY = void 0
    }
    if (isFinite(options.scaleX)) {
        context.scale(options.scaleX, options.scaleY);
        options.scaleX = void 0;
        options.scaleY = void 0
    }
}

function clipElement(context, options, shared) {
    if (options["clip-path"]) {
        drawElement(shared.clipPaths[parseUrl(options["clip-path"])], context, {}, shared);
        context.clip();
        options["clip-path"] = void 0
    }
}

function hex2rgba(hexColor, alpha) {
    var color = new _color__WEBPACK_IMPORTED_MODULE_1__["default"](hexColor);
    return "rgba(" + color.r + "," + color.g + "," + color.b + "," + alpha + ")"
}

function createGradient(element) {
    var options = [];
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(element.childNodes, (_, _ref2) => {
        var {
            attributes: attributes
        } = _ref2;
        options.push({
            offset: attributes.offset.value,
            stopColor: attributes["stop-color"].value
        })
    });
    return options
}

function createFilter(element) {
    var color;
    var opacity;
    var filterOptions = {};
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(element.childNodes, (function(_, node) {
        var attr = node.attributes;
        if (!attr.result) {
            return
        }
        switch (attr.result.value) {
            case "gaussianBlurResult":
                filterOptions.blur = _number(attr.stdDeviation.value);
                break;
            case "offsetResult":
                filterOptions.offsetX = _number(attr.dx.value);
                filterOptions.offsetY = _number(attr.dy.value);
                break;
            case "floodResult":
                color = attr["flood-color"] ? attr["flood-color"].value : "#000";
                opacity = attr["flood-opacity"] ? attr["flood-opacity"].value : 1;
                filterOptions.color = hex2rgba(color, opacity)
        }
    }));
    return filterOptions
}

function asyncEach(array, callback) {
    var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
    var i = 0;
    for (; i < array.length; i++) {
        var result = callback(array[i]);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isPromise"])(result)) {
            result.then(() => {
                asyncEach(Array.prototype.slice.call(array, i + 1), callback, d)
            });
            break
        }
    }
    if (i === array.length) {
        d.resolve()
    }
    return d
}

function drawCanvasElements(elements, context, parentOptions, shared) {
    return asyncEach(elements, (function(element) {
        switch (element.tagName && element.tagName.toLowerCase()) {
            case "g":
            case "svg":
                var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])({}, parentOptions, getElementOptions(element, shared.rootAppended));
                context.save();
                transformElement(context, options);
                clipElement(context, options, shared);
                var onDone = () => {
                    context.restore()
                };
                var d = drawCanvasElements(element.childNodes, context, options, shared);
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isPromise"])(d)) {
                    d.then(onDone)
                } else {
                    onDone()
                }
                return d;
            case "defs":
                return drawCanvasElements(element.childNodes, context, {}, shared);
            case "clippath":
                shared.clipPaths[element.attributes.id.textContent] = element.childNodes[0];
                break;
            case "pattern":
                shared.patterns[element.attributes.id.textContent] = element;
                break;
            case "filter":
                shared.filters[element.id] = createFilter(element);
                break;
            case "lineargradient":
                shared.gradients[element.attributes.id.textContent] = createGradient(element);
                break;
            default:
                return drawElement(element, context, parentOptions, shared)
        }
    }))
}

function setLineDash(context, options) {
    var matches = options["stroke-dasharray"] && options["stroke-dasharray"].match(/(\d+)/g);
    if (matches && matches.length) {
        matches = Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["map"])(matches, (function(item) {
            return _number(item)
        }));
        context.setLineDash(matches)
    }
}

function strokeElement(context, options, isText) {
    var stroke = options.stroke;
    if (stroke && "none" !== stroke && 0 !== options["stroke-width"]) {
        setLineDash(context, options);
        context.lineJoin = options["stroke-linejoin"];
        context.lineWidth = options["stroke-width"];
        context.globalAlpha = options.strokeOpacity;
        context.strokeStyle = stroke;
        isText ? context.strokeText(options.text, options.x, options.y) : context.stroke();
        context.globalAlpha = 1
    }
}

function getPattern(context, pattern, shared) {
    var options = getElementOptions(pattern, shared.rootAppended);
    var patternCanvas = imageCreator._createCanvas(options.width, options.height, 0);
    var patternContext = patternCanvas.getContext("2d");
    drawCanvasElements(pattern.childNodes, patternContext, options, shared);
    return context.createPattern(patternCanvas, "repeat")
}

function fillElement(context, options, shared) {
    var fill = options.fill;
    if (fill && "none" !== fill) {
        if (-1 === fill.search(/url/)) {
            context.fillStyle = fill
        } else {
            var pattern = shared.patterns[parseUrl(fill)];
            if (!pattern) {
                return
            }
            context.fillStyle = getPattern(context, pattern, shared)
        }
        context.globalAlpha = options.fillOpacity;
        context.fill();
        context.globalAlpha = 1
    }
}
parseAttributes = function(attributes) {
    var newAttributes = {};
    var attr;
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(attributes, (function(index, item) {
        attr = item.textContent;
        if (isFinite(attr)) {
            attr = _number(attr)
        }
        newAttributes[item.name.toLowerCase()] = attr
    }));
    return newAttributes
};

function drawBackground(context, width, height, backgroundColor, margin) {
    context.fillStyle = backgroundColor || "#ffffff";
    context.fillRect(-margin, -margin, width + 2 * margin, height + 2 * margin)
}

function createInvisibleDiv() {
    var invisibleDiv = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("div");
    invisibleDiv.style.left = "-9999px";
    invisibleDiv.style.position = "absolute";
    return invisibleDiv
}

function convertSvgToCanvas(svg, canvas, rootAppended) {
    return drawCanvasElements(svg.childNodes, canvas.getContext("2d"), {}, {
        clipPaths: {},
        patterns: {},
        filters: {},
        gradients: {},
        rootAppended: rootAppended
    })
}

function getCanvasFromSvg(markup, _ref3) {
    var {
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        margin: margin,
        svgToCanvas: svgToCanvas = convertSvgToCanvas
    } = _ref3;
    var scaledScreenInfo = calcScaledInfo(width, height);
    var canvas = imageCreator._createCanvas(scaledScreenInfo.width, scaledScreenInfo.height, margin);
    var context = canvas.getContext("2d");
    context.setTransform(scaledScreenInfo.pixelRatio, 0, 0, scaledScreenInfo.pixelRatio, 0, 0);
    var svgElem = Object(_core_utils_svg__WEBPACK_IMPORTED_MODULE_3__["getSvgElement"])(markup);
    var invisibleDiv;
    var markupIsDomElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].isElementNode(markup);
    context.translate(margin, margin);
    _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].getBody().appendChild(canvas);
    if (!markupIsDomElement) {
        invisibleDiv = createInvisibleDiv();
        invisibleDiv.appendChild(svgElem);
        _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].getBody().appendChild(invisibleDiv)
    }
    if (svgElem.attributes.direction) {
        canvas.dir = svgElem.attributes.direction.textContent
    }
    drawBackground(context, width, height, backgroundColor, margin);
    return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["fromPromise"])(svgToCanvas(svgElem, canvas, markupIsDomElement && Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__["contains"])(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].getBody(), markup))).then(() => canvas).always(() => {
        invisibleDiv && _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].getBody().removeChild(invisibleDiv);
        _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].getBody().removeChild(canvas)
    })
}
var imageCreator = {
    getImageData: function(markup, options) {
        var mimeType = "image/" + options.format;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(options.__parseAttributesFn)) {
            parseAttributes = options.__parseAttributesFn
        }
        return getCanvasFromSvg(markup, options).then(canvas => getStringFromCanvas(canvas, mimeType))
    },
    getData: function(markup, options) {
        var that = this;
        return imageCreator.getImageData(markup, options).then(binaryData => {
            var mimeType = "image/" + options.format;
            var data = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(window.Blob) && !options.forceProxy ? that._getBlob(binaryData, mimeType) : that._getBase64(binaryData);
            return data
        })
    },
    _getBlob: function(binaryData, mimeType) {
        var i;
        var dataArray = new Uint8Array(binaryData.length);
        for (i = 0; i < binaryData.length; i++) {
            dataArray[i] = binaryData.charCodeAt(i)
        }
        return new window.Blob([dataArray.buffer], {
            type: mimeType
        })
    },
    _getBase64: function(binaryData) {
        return window.btoa(binaryData)
    },
    _createCanvas(width, height, margin) {
        var canvas = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<canvas>")[0];
        canvas.width = width + 2 * margin;
        canvas.height = height + 2 * margin;
        canvas.hidden = true;
        return canvas
    }
};
function getData(data, options) {
    return imageCreator.getData(data, options)
}
function testFormats(formats) {
    var canvas = imageCreator._createCanvas(100, 100, 0);
    return formats.reduce((function(r, f) {
        var mimeType = ("image/" + f).toLowerCase();
        if (-1 !== canvas.toDataURL(mimeType).indexOf(mimeType)) {
            r.supported.push(f)
        } else {
            r.unsupported.push(f)
        }
        return r
    }), {
        supported: [],
        unsupported: []
    })
}
function calcScaledInfo(width, height) {
    var pixelRatio = window.devicePixelRatio || 1;
    return {
        pixelRatio: pixelRatio,
        width: width * pixelRatio,
        height: height * pixelRatio
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/pdf_creator.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/pdf_creator.js ***!
  \*************************************************************/
/*! exports provided: getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony import */ var _core_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/version */ "./node_modules/devextreme/esm/core/version.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _image_creator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image_creator */ "./node_modules/devextreme/esm/exporter/image_creator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/**
 * DevExtreme (esm/exporter/pdf_creator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])();



var mainPageTemplate = "%PDF-1.3\r\n2 0 obj\r\n<</ProcSet[/PDF/ImageB/ImageC/ImageI]/XObject<</I0 5 0 R>>>>\r\nendobj\r\n4 0 obj\r\n<</Type/Pages/Kids[1 0 R]/Count 1>>\r\nendobj\r\n7 0 obj\r\n<</OpenAction[1 0 R /FitH null]/Type/Catalog/Pages 4 0 R/PageLayout/OneColumn>>\r\nendobj\r\n1 0 obj\r\n<</Type/Page/Resources 2 0 R/MediaBox[0 0 _width_ _height_]/Contents 3 0 R/Parent 4 0 R>>\r\nendobj\r\n";
var contentTemplate = "3 0 obj\r\n<</Length 52>>stream\r\n0.20 w\n0 G\nq _width_ 0 0 _height_ 0.00 0.00 cm /I0 Do Q\r\nendstream\r\nendobj\r\n";
var infoTemplate = "6 0 obj\r\n<</CreationDate _date_/Producer(DevExtreme _version_)>>\r\nendobj\r\n";
var imageStartTemplate = "5 0 obj\r\n<</Type/XObject/Subtype/Image/Width _width_/Height _height_/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length _length_>>stream\r\n";
var imageEndTemplate = "\r\nendstream\r\nendobj\r\n";
var trailerTemplate = "trailer\r\n<<\r\n/Size 8\r\n/Root 7 0 R\r\n/Info 6 0 R\r\n>>\r\nstartxref\r\n_length_\r\n%%EOF";
var xrefTemplate = "xref\r\n0 8\r\n0000000000 65535 f\r\n0000000241 00000 n\r\n0000000010 00000 n\r\n_main_ 00000 n\r\n0000000089 00000 n\r\n_image_ 00000 n\r\n_info_ 00000 n\r\n0000000143 00000 n\r\n";
var pad = function pad(str, len) {
    return str.length < len ? pad("0" + str, len) : str
};
var composePdfString = function(imageString, options, curDate) {
    var margin = 2 * (options.margin || 0);
    var {
        width: width,
        height: height
    } = Object(_image_creator__WEBPACK_IMPORTED_MODULE_2__["calcScaledInfo"])(options.width, options.height);
    width += margin;
    height += margin;
    var widthPt = (.75 * width).toFixed(2);
    var heightPt = (.75 * height).toFixed(2);
    var mainPage = mainPageTemplate.replace("_width_", widthPt).replace("_height_", heightPt);
    var content = contentTemplate.replace("_width_", widthPt).replace("_height_", heightPt);
    var info = infoTemplate.replace("_date_", curDate).replace("_version_", _core_version__WEBPACK_IMPORTED_MODULE_0__["version"]);
    var image = imageStartTemplate.replace("_width_", width).replace("_height_", height).replace("_length_", imageString.length) + imageString + imageEndTemplate;
    var xref = getXref(mainPage.length, content.length, info.length);
    var mainContent = mainPage + content + info + image;
    var trailer = trailerTemplate.replace("_length_", mainContent.length);
    return mainContent + xref + trailer
};

function getXref(mainPageLength, contentLength, infoLength) {
    return xrefTemplate.replace("_main_", pad(mainPageLength + "", 10)).replace("_info_", pad(mainPageLength + contentLength + "", 10)).replace("_image_", pad(mainPageLength + contentLength + infoLength + "", 10))
}
var getCurDate = function() {
    return new Date
};
var getBlob = function(binaryData) {
    var i = 0;
    var dataArray = new Uint8Array(binaryData.length);
    for (; i < binaryData.length; i++) {
        dataArray[i] = binaryData.charCodeAt(i)
    }
    return new window.Blob([dataArray.buffer], {
        type: "application/pdf"
    })
};
var getBase64 = function(binaryData) {
    return window.btoa(binaryData)
};
function getData(data, options) {
    return _image_creator__WEBPACK_IMPORTED_MODULE_2__["imageCreator"].getImageData(data, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, options, {
        format: "JPEG"
    })).then(imageString => {
        var binaryData = composePdfString(imageString, options, getCurDate());
        var pdfData = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(window.Blob) ? getBlob(binaryData) : getBase64(binaryData);
        return pdfData
    })
}


/***/ }),

/***/ "./node_modules/devextreme/esm/exporter/svg_creator.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/exporter/svg_creator.js ***!
  \*************************************************************/
/*! exports provided: svgCreator, getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgCreator", function() { return svgCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/ajax */ "./node_modules/devextreme/esm/core/utils/ajax.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/svg */ "./node_modules/devextreme/esm/core/utils/svg.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/exporter/svg_creator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["getWindow"])();




var svgCreator = {
    _markup: "",
    _imageArray: {},
    _imageDeferreds: [],
    _getBinaryFile: function(src, callback) {
        _core_utils_ajax__WEBPACK_IMPORTED_MODULE_1__["default"].sendRequest({
            url: src,
            method: "GET",
            responseType: "arraybuffer"
        }).done(callback).fail((function() {
            callback(false)
        }))
    },
    _loadImages: function() {
        var that = this;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(that._imageArray, (function(src) {
            var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"];
            that._imageDeferreds.push(deferred);
            that._getBinaryFile(src, (function(response) {
                if (!response) {
                    delete that._imageArray[src];
                    deferred.resolve();
                    return
                }
                var i;
                var binary = "";
                var bytes = new Uint8Array(response);
                var length = bytes.byteLength;
                for (i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i])
                }
                that._imageArray[src] = "data:image/png;base64," + window.btoa(binary);
                deferred.resolve()
            }))
        }))
    },
    _parseImages: function(element) {
        var href;
        var that = this;
        if ("image" === element.tagName) {
            href = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).attr("href") || Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).attr("xlink:href");
            if (!that._imageArray[href]) {
                that._imageArray[href] = ""
            }
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(element.childNodes, (function(_, element) {
            that._parseImages(element)
        }))
    },
    _prepareImages: function(svgElem) {
        this._parseImages(svgElem);
        this._loadImages();
        return _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["when"].apply(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"], this._imageDeferreds)
    },
    getData: function(data, options) {
        var markup;
        var that = this;
        var svgElem = Object(_core_utils_svg__WEBPACK_IMPORTED_MODULE_5__["getSvgElement"])(data);
        var $svgObject = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(svgElem);
        $svgObject.find("[".concat(_core_utils_svg__WEBPACK_IMPORTED_MODULE_5__["HIDDEN_FOR_EXPORT"], "]")).remove();
        markup = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>' + Object(_core_utils_svg__WEBPACK_IMPORTED_MODULE_5__["getSvgMarkup"])($svgObject.get(0), options.backgroundColor);
        return that._prepareImages(svgElem).then(() => {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(that._imageArray, (function(href, dataURI) {
                var regexpString = "href=['|\"]".concat(href, "['|\"]");
                markup = markup.replace(new RegExp(regexpString, "gi"), 'href="'.concat(dataURI, '"'))
            }));
            return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(window.Blob) ? that._getBlob(markup) : that._getBase64(markup)
        })
    },
    _getBlob: function(markup) {
        return new window.Blob([markup], {
            type: "image/svg+xml"
        })
    },
    _getBase64: function(markup) {
        return window.btoa(markup)
    }
};
function getData(data, options) {
    return svgCreator.getData(data, options)
}


/***/ }),

/***/ "./node_modules/devextreme/esm/format_helper.js":
/*!******************************************************!*\
  !*** ./node_modules/devextreme/esm/format_helper.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/* harmony import */ var _localization_number__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localization/number */ "./node_modules/devextreme/esm/localization/number.js");
/* harmony import */ var _localization_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localization/date */ "./node_modules/devextreme/esm/localization/date.js");
/* harmony import */ var _core_utils_dependency_injector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/utils/dependency_injector */ "./node_modules/devextreme/esm/core/utils/dependency_injector.js");
/* harmony import */ var _localization_currency__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./localization/currency */ "./node_modules/devextreme/esm/localization/currency.js");
/**
 * DevExtreme (esm/format_helper.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






/* harmony default export */ __webpack_exports__["default"] = (Object(_core_utils_dependency_injector__WEBPACK_IMPORTED_MODULE_4__["default"])({
    format: function(value, _format) {
        var formatIsValid = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(_format) && "" !== _format || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(_format) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(_format);
        var valueIsValid = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(value) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDate"])(value);
        if (!formatIsValid || !valueIsValid) {
            return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value) ? value.toString() : ""
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(_format)) {
            return _format(value)
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(_format)) {
            _format = {
                type: _format
            }
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(value)) {
            return _localization_number__WEBPACK_IMPORTED_MODULE_2__["default"].format(value, _format)
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDate"])(value)) {
            return _localization_date__WEBPACK_IMPORTED_MODULE_3__["default"].format(value, _format)
        }
    },
    getTimeFormat: function(showSecond) {
        return showSecond ? "longtime" : "shorttime"
    },
    _normalizeFormat: function(format) {
        if (!Array.isArray(format)) {
            return format
        }
        if (1 === format.length) {
            return format[0]
        }
        return function(date) {
            return format.map((function(formatPart) {
                return _localization_date__WEBPACK_IMPORTED_MODULE_3__["default"].format(date, formatPart)
            })).join(" ")
        }
    },
    getDateFormatByDifferences: function(dateDifferences, intervalFormat) {
        var resultFormat = [];
        var needSpecialSecondFormatter = intervalFormat && dateDifferences.millisecond && !(dateDifferences.year || dateDifferences.month || dateDifferences.day);
        if (needSpecialSecondFormatter) {
            resultFormat.push((function(date) {
                return date.getSeconds() + date.getMilliseconds() / 1e3 + "s"
            }))
        } else if (dateDifferences.millisecond) {
            resultFormat.push("millisecond")
        }
        if (dateDifferences.hour || dateDifferences.minute || !needSpecialSecondFormatter && dateDifferences.second) {
            resultFormat.unshift(this.getTimeFormat(dateDifferences.second))
        }
        if (dateDifferences.year && dateDifferences.month && dateDifferences.day) {
            if (intervalFormat && "month" === intervalFormat) {
                return "monthandyear"
            } else {
                resultFormat.unshift("shortdate");
                return this._normalizeFormat(resultFormat)
            }
        }
        if (dateDifferences.year && dateDifferences.month) {
            return "monthandyear"
        }
        if (dateDifferences.year && dateDifferences.quarter) {
            return "quarterandyear"
        }
        if (dateDifferences.year) {
            return "year"
        }
        if (dateDifferences.quarter) {
            return "quarter"
        }
        if (dateDifferences.month && dateDifferences.day) {
            if (intervalFormat) {
                resultFormat.unshift((function(date) {
                    return _localization_date__WEBPACK_IMPORTED_MODULE_3__["default"].getMonthNames("abbreviated")[date.getMonth()] + " " + _localization_date__WEBPACK_IMPORTED_MODULE_3__["default"].format(date, "day")
                }))
            } else {
                resultFormat.unshift("monthandday")
            }
            return this._normalizeFormat(resultFormat)
        }
        if (dateDifferences.month) {
            return "month"
        }
        if (dateDifferences.day) {
            if (intervalFormat) {
                resultFormat.unshift("day")
            } else {
                resultFormat.unshift((function(date) {
                    return _localization_date__WEBPACK_IMPORTED_MODULE_3__["default"].format(date, "dayofweek") + ", " + _localization_date__WEBPACK_IMPORTED_MODULE_3__["default"].format(date, "day")
                }))
            }
            return this._normalizeFormat(resultFormat)
        }
        return this._normalizeFormat(resultFormat)
    },
    getDateFormatByTicks: function(ticks) {
        var maxDiff;
        var currentDiff;
        var i;
        if (ticks.length > 1) {
            maxDiff = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].getDatesDifferences(ticks[0], ticks[1]);
            for (i = 1; i < ticks.length - 1; i++) {
                currentDiff = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].getDatesDifferences(ticks[i], ticks[i + 1]);
                if (maxDiff.count < currentDiff.count) {
                    maxDiff = currentDiff
                }
            }
        } else {
            maxDiff = {
                year: true,
                month: true,
                day: true,
                hour: ticks[0].getHours() > 0,
                minute: ticks[0].getMinutes() > 0,
                second: ticks[0].getSeconds() > 0,
                millisecond: ticks[0].getMilliseconds() > 0
            }
        }
        var resultFormat = this.getDateFormatByDifferences(maxDiff);
        return resultFormat
    },
    getDateFormatByTickInterval: function(startValue, endValue, tickInterval) {
        var dateUnitInterval;
        var correctDateDifferences = function(dateDifferences, tickInterval, value) {
            switch (tickInterval) {
                case "year":
                case "quarter":
                    dateDifferences.month = value;
                case "month":
                    dateDifferences.day = value;
                case "week":
                case "day":
                    dateDifferences.hour = value;
                case "hour":
                    dateDifferences.minute = value;
                case "minute":
                    dateDifferences.second = value;
                case "second":
                    dateDifferences.millisecond = value
            }
        };
        tickInterval = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(tickInterval) ? tickInterval.toLowerCase() : tickInterval;
        var dateDifferences = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].getDatesDifferences(startValue, endValue);
        if (startValue !== endValue) {
            ! function(differences, minDate, maxDate) {
                if (!maxDate.getMilliseconds() && maxDate.getSeconds()) {
                    if (maxDate.getSeconds() - minDate.getSeconds() === 1) {
                        differences.millisecond = true;
                        differences.second = false
                    }
                } else if (!maxDate.getSeconds() && maxDate.getMinutes()) {
                    if (maxDate.getMinutes() - minDate.getMinutes() === 1) {
                        differences.second = true;
                        differences.minute = false
                    }
                } else if (!maxDate.getMinutes() && maxDate.getHours()) {
                    if (maxDate.getHours() - minDate.getHours() === 1) {
                        differences.minute = true;
                        differences.hour = false
                    }
                } else if (!maxDate.getHours() && maxDate.getDate() > 1) {
                    if (maxDate.getDate() - minDate.getDate() === 1) {
                        differences.hour = true;
                        differences.day = false
                    }
                } else if (1 === maxDate.getDate() && maxDate.getMonth()) {
                    if (maxDate.getMonth() - minDate.getMonth() === 1) {
                        differences.day = true;
                        differences.month = false
                    }
                } else if (!maxDate.getMonth() && maxDate.getFullYear()) {
                    if (maxDate.getFullYear() - minDate.getFullYear() === 1) {
                        differences.month = true;
                        differences.year = false
                    }
                }
            }(dateDifferences, startValue > endValue ? endValue : startValue, startValue > endValue ? startValue : endValue)
        }
        dateUnitInterval = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].getDateUnitInterval(dateDifferences);
        correctDateDifferences(dateDifferences, dateUnitInterval, true);
        dateUnitInterval = _core_utils_date__WEBPACK_IMPORTED_MODULE_1__["default"].getDateUnitInterval(tickInterval || "second");
        correctDateDifferences(dateDifferences, dateUnitInterval, false);
        dateDifferences[{
            week: "day"
        } [dateUnitInterval] || dateUnitInterval] = true;
        var resultFormat = this.getDateFormatByDifferences(dateDifferences);
        return resultFormat
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/localization/language_codes.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/localization/language_codes.js ***!
  \********************************************************************/
/*! exports provided: getLanguageId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguageId", function() { return getLanguageId; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./node_modules/devextreme/esm/localization/core.js");
/**
 * DevExtreme (esm/localization/language_codes.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var LANGUAGE_CODES = {
    ar: 1,
    bg: 2,
    ca: 3,
    "zh-Hans": 4,
    cs: 5,
    da: 6,
    de: 7,
    el: 8,
    en: 9,
    es: 10,
    fi: 11,
    fr: 12,
    he: 13,
    hu: 14,
    is: 15,
    it: 16,
    ja: 17,
    ko: 18,
    nl: 19,
    no: 20,
    pl: 21,
    pt: 22,
    rm: 23,
    ro: 24,
    ru: 25,
    hr: 26,
    sk: 27,
    sq: 28,
    sv: 29,
    th: 30,
    tr: 31,
    ur: 32,
    id: 33,
    uk: 34,
    be: 35,
    sl: 36,
    et: 37,
    lv: 38,
    lt: 39,
    tg: 40,
    fa: 41,
    vi: 42,
    hy: 43,
    az: 44,
    eu: 45,
    hsb: 46,
    mk: 47,
    tn: 50,
    xh: 52,
    zu: 53,
    af: 54,
    ka: 55,
    fo: 56,
    hi: 57,
    mt: 58,
    se: 59,
    ga: 60,
    ms: 62,
    kk: 63,
    ky: 64,
    sw: 65,
    tk: 66,
    uz: 67,
    tt: 68,
    bn: 69,
    pa: 70,
    gu: 71,
    or: 72,
    ta: 73,
    te: 74,
    kn: 75,
    ml: 76,
    as: 77,
    mr: 78,
    sa: 79,
    mn: 80,
    bo: 81,
    cy: 82,
    km: 83,
    lo: 84,
    gl: 86,
    kok: 87,
    syr: 90,
    si: 91,
    iu: 93,
    am: 94,
    tzm: 95,
    ne: 97,
    fy: 98,
    ps: 99,
    fil: 100,
    dv: 101,
    ha: 104,
    yo: 106,
    quz: 107,
    nso: 108,
    ba: 109,
    lb: 110,
    kl: 111,
    ig: 112,
    ii: 120,
    arn: 122,
    moh: 124,
    br: 126,
    ug: 128,
    mi: 129,
    oc: 130,
    co: 131,
    gsw: 132,
    sah: 133,
    qut: 134,
    rw: 135,
    wo: 136,
    prs: 140,
    gd: 145,
    "ar-SA": 1025,
    "bg-BG": 1026,
    "ca-ES": 1027,
    "zh-TW": 1028,
    "cs-CZ": 1029,
    "da-DK": 1030,
    "de-DE": 1031,
    "el-GR": 1032,
    "en-US": 1033,
    "fi-FI": 1035,
    "fr-FR": 1036,
    "he-IL": 1037,
    "hu-HU": 1038,
    "is-IS": 1039,
    "it-IT": 1040,
    "ja-JP": 1041,
    "ko-KR": 1042,
    "nl-NL": 1043,
    "nb-NO": 1044,
    "pl-PL": 1045,
    "pt-BR": 1046,
    "rm-CH": 1047,
    "ro-RO": 1048,
    "ru-RU": 1049,
    "hr-HR": 1050,
    "sk-SK": 1051,
    "sq-AL": 1052,
    "sv-SE": 1053,
    "th-TH": 1054,
    "tr-TR": 1055,
    "ur-PK": 1056,
    "id-ID": 1057,
    "uk-UA": 1058,
    "be-BY": 1059,
    "sl-SI": 1060,
    "et-EE": 1061,
    "lv-LV": 1062,
    "lt-LT": 1063,
    "tg-Cyrl-TJ": 1064,
    "fa-IR": 1065,
    "vi-VN": 1066,
    "hy-AM": 1067,
    "az-Latn-AZ": 1068,
    "eu-ES": 1069,
    "hsb-DE": 1070,
    "mk-MK": 1071,
    "tn-ZA": 1074,
    "xh-ZA": 1076,
    "zu-ZA": 1077,
    "af-ZA": 1078,
    "ka-GE": 1079,
    "fo-FO": 1080,
    "hi-IN": 1081,
    "mt-MT": 1082,
    "se-NO": 1083,
    "ms-MY": 1086,
    "kk-KZ": 1087,
    "ky-KG": 1088,
    "sw-KE": 1089,
    "tk-TM": 1090,
    "uz-Latn-UZ": 1091,
    "tt-RU": 1092,
    "bn-IN": 1093,
    "pa-IN": 1094,
    "gu-IN": 1095,
    "or-IN": 1096,
    "ta-IN": 1097,
    "te-IN": 1098,
    "kn-IN": 1099,
    "ml-IN": 1100,
    "as-IN": 1101,
    "mr-IN": 1102,
    "sa-IN": 1103,
    "mn-MN": 1104,
    "bo-CN": 1105,
    "cy-GB": 1106,
    "km-KH": 1107,
    "lo-LA": 1108,
    "gl-ES": 1110,
    "kok-IN": 1111,
    "syr-SY": 1114,
    "si-LK": 1115,
    "iu-Cans-CA": 1117,
    "am-ET": 1118,
    "ne-NP": 1121,
    "fy-NL": 1122,
    "ps-AF": 1123,
    "fil-PH": 1124,
    "dv-MV": 1125,
    "ha-Latn-NG": 1128,
    "yo-NG": 1130,
    "quz-BO": 1131,
    "nso-ZA": 1132,
    "ba-RU": 1133,
    "lb-LU": 1134,
    "kl-GL": 1135,
    "ig-NG": 1136,
    "ii-CN": 1144,
    "arn-CL": 1146,
    "moh-CA": 1148,
    "br-FR": 1150,
    "ug-CN": 1152,
    "mi-NZ": 1153,
    "oc-FR": 1154,
    "co-FR": 1155,
    "gsw-FR": 1156,
    "sah-RU": 1157,
    "qut-GT": 1158,
    "rw-RW": 1159,
    "wo-SN": 1160,
    "prs-AF": 1164,
    "gd-GB": 1169,
    "ar-IQ": 2049,
    "zh-CN": 2052,
    "de-CH": 2055,
    "en-GB": 2057,
    "es-MX": 2058,
    "fr-BE": 2060,
    "it-CH": 2064,
    "nl-BE": 2067,
    "nn-NO": 2068,
    "pt-PT": 2070,
    "sr-Latn-CS": 2074,
    "sv-FI": 2077,
    "az-Cyrl-AZ": 2092,
    "dsb-DE": 2094,
    "se-SE": 2107,
    "ga-IE": 2108,
    "ms-BN": 2110,
    "uz-Cyrl-UZ": 2115,
    "bn-BD": 2117,
    "mn-Mong-CN": 2128,
    "iu-Latn-CA": 2141,
    "tzm-Latn-DZ": 2143,
    "quz-EC": 2155,
    "ar-EG": 3073,
    "zh-HK": 3076,
    "de-AT": 3079,
    "en-AU": 3081,
    "es-ES": 3082,
    "fr-CA": 3084,
    "sr-Cyrl-CS": 3098,
    "se-FI": 3131,
    "quz-PE": 3179,
    "ar-LY": 4097,
    "zh-SG": 4100,
    "de-LU": 4103,
    "en-CA": 4105,
    "es-GT": 4106,
    "fr-CH": 4108,
    "hr-BA": 4122,
    "smj-NO": 4155,
    "ar-DZ": 5121,
    "zh-MO": 5124,
    "de-LI": 5127,
    "en-NZ": 5129,
    "es-CR": 5130,
    "fr-LU": 5132,
    "bs-Latn-BA": 5146,
    "smj-SE": 5179,
    "ar-MA": 6145,
    "en-IE": 6153,
    "es-PA": 6154,
    "fr-MC": 6156,
    "sr-Latn-BA": 6170,
    "sma-NO": 6203,
    "ar-TN": 7169,
    "en-ZA": 7177,
    "es-DO": 7178,
    "sr-Cyrl-BA": 7194,
    "sma-SE": 7227,
    "ar-OM": 8193,
    "en-JM": 8201,
    "es-VE": 8202,
    "bs-Cyrl-BA": 8218,
    "sms-FI": 8251,
    "ar-YE": 9217,
    "en-029": 9225,
    "es-CO": 9226,
    "sr-Latn-RS": 9242,
    "smn-FI": 9275,
    "ar-SY": 10241,
    "en-BZ": 10249,
    "es-PE": 10250,
    "sr-Cyrl-RS": 10266,
    "ar-JO": 11265,
    "en-TT": 11273,
    "es-AR": 11274,
    "sr-Latn-ME": 11290,
    "ar-LB": 12289,
    "en-ZW": 12297,
    "es-EC": 12298,
    "sr-Cyrl-ME": 12314,
    "ar-KW": 13313,
    "en-PH": 13321,
    "es-CL": 13322,
    "ar-AE": 14337,
    "es-UY": 14346,
    "ar-BH": 15361,
    "es-PY": 15370,
    "ar-QA": 16385,
    "en-IN": 16393,
    "es-BO": 16394,
    "en-MY": 17417,
    "es-SV": 17418,
    "en-SG": 18441,
    "es-HN": 18442,
    "es-NI": 19466,
    "es-PR": 20490,
    "es-US": 21514,
    "bs-Cyrl": 25626,
    "bs-Latn": 26650,
    "sr-Cyrl": 27674,
    "sr-Latn": 28698,
    smn: 28731,
    "az-Cyrl": 29740,
    sms: 29755,
    zh: 30724,
    nn: 30740,
    bs: 30746,
    "az-Latn": 30764,
    sma: 30779,
    "uz-Cyrl": 30787,
    "mn-Cyrl": 30800,
    "iu-Cans": 30813,
    "zh-Hant": 31748,
    nb: 31764,
    sr: 31770,
    "tg-Cyrl": 31784,
    dsb: 31790,
    smj: 31803,
    "uz-Latn": 31811,
    "mn-Mong": 31824,
    "iu-Latn": 31837,
    "tzm-Latn": 31839,
    "ha-Latn": 31848
};
function getLanguageId() {
    return LANGUAGE_CODES[_core__WEBPACK_IMPORTED_MODULE_0__["default"].locale()]
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/jszip/dist/jszip.min.js":
/*!**********************************************!*\
  !*** ./node_modules/jszip/dist/jszip.min.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, setImmediate, global, process) {var require;var require;/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if(true)module.exports=e();else {}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return require(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

}]);