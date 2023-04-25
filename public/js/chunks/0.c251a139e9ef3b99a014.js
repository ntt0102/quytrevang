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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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

/* WEBPACK VAR INJECTION */(function(Buffer, global, setImmediate) {var require;var require;/*!

JSZip v3.9.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(t){if(true)module.exports=t();else {}}(function(){return function s(a,o,h){function u(r,t){if(!o[r]){if(!a[r]){var e="function"==typeof require&&require;if(!t&&e)return require(r,!0);if(l)return l(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var n=o[r]={exports:{}};a[r][0].call(n.exports,function(t){var e=a[r][1][t];return u(e||t)},n,n.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,t=0;t<h.length;t++)u(h[t]);return u}({1:[function(t,e,r){"use strict";var c=t("./utils"),d=t("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(t){for(var e,r,i,n,s,a,o,h=[],u=0,l=t.length,f=l,d="string"!==c.getTypeOf(t);u<t.length;)f=l-u,i=d?(e=t[u++],r=u<l?t[u++]:0,u<l?t[u++]:0):(e=t.charCodeAt(u++),r=u<l?t.charCodeAt(u++):0,u<l?t.charCodeAt(u++):0),n=e>>2,s=(3&e)<<4|r>>4,a=1<f?(15&r)<<2|i>>6:64,o=2<f?63&i:64,h.push(p.charAt(n)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(t){var e,r,i,n,s,a,o=0,h=0,u="data:";if(t.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(t.charAt(t.length-1)===p.charAt(64)&&f--,t.charAt(t.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=d.uint8array?new Uint8Array(0|f):new Array(0|f);o<t.length;)e=p.indexOf(t.charAt(o++))<<2|(n=p.indexOf(t.charAt(o++)))>>4,r=(15&n)<<4|(s=p.indexOf(t.charAt(o++)))>>2,i=(3&s)<<6|(a=p.indexOf(t.charAt(o++))),l[h++]=e,64!==s&&(l[h++]=r),64!==a&&(l[h++]=i);return l}},{"./support":30,"./utils":32}],2:[function(t,e,r){"use strict";var i=t("./external"),n=t("./stream/DataWorker"),s=t("./stream/Crc32Probe"),a=t("./stream/DataLengthProbe");function o(t,e,r,i,n){this.compressedSize=t,this.uncompressedSize=e,this.crc32=r,this.compression=i,this.compressedContent=n}o.prototype={getContentWorker:function(){var t=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),e=this;return t.on("end",function(){if(this.streamInfo.data_length!==e.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),t},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(t,e,r){return t.pipe(new s).pipe(new a("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",e)},e.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,e,r){"use strict";var i=t("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(t){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},r.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,e,r){"use strict";var i=t("./utils");var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e){return void 0!==t&&t.length?"string"!==i.getTypeOf(t)?function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}(0|e,t,t.length,0):function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e.charCodeAt(a))];return-1^t}(0|e,t,t.length,0):0}},{"./utils":32}],5:[function(t,e,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(t,e,r){"use strict";var i=null;i="undefined"!=typeof Promise?Promise:t("lie"),e.exports={Promise:i}},{lie:37}],7:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,n=t("pako"),s=t("./utils"),a=t("./stream/GenericWorker"),o=i?"uint8array":"array";function h(t,e){a.call(this,"FlateWorker/"+t),this._pako=null,this._pakoAction=t,this._pakoOptions=e,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(t){this.meta=t.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,t.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},r.compressWorker=function(t){return new h("Deflate",t)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,e,r){"use strict";function A(t,e){var r,i="";for(r=0;r<e;r++)i+=String.fromCharCode(255&t),t>>>=8;return i}function i(t,e,r,i,n,s){var a,o,h=t.file,u=t.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),d=I.transformTo("string",O.utf8encode(h.name)),c=h.comment,p=I.transformTo("string",s(c)),m=I.transformTo("string",O.utf8encode(c)),_=d.length!==h.name.length,g=m.length!==c.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};e&&!r||(x.crc32=t.crc32,x.compressedSize=t.compressedSize,x.uncompressedSize=t.uncompressedSize);var S=0;e&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===n?(C=798,z|=function(t,e){var r=t;return t||(r=e?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(t){return 63&(t||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+d,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(i,4)+f+b+p}}var I=t("../utils"),n=t("../stream/GenericWorker"),O=t("../utf8"),B=t("../crc32"),R=t("../signature");function s(t,e,r,i){n.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=e,this.zipPlatform=r,this.encodeFileName=i,this.streamFiles=t,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,n),s.prototype.push=function(t){var e=t.meta.percent||0,r=this.entriesCount,i=this._sources.length;this.accumulate?this.contentBuffer.push(t):(this.bytesWritten+=t.data.length,n.prototype.push.call(this,{data:t.data,meta:{currentFile:this.currentFile,percent:r?(e+100*(r-i-1))/r:100}}))},s.prototype.openedSource=function(t){this.currentSourceOffset=this.bytesWritten,this.currentFile=t.file.name;var e=this.streamFiles&&!t.file.dir;if(e){var r=i(t,e,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(t){this.accumulate=!1;var e=this.streamFiles&&!t.file.dir,r=i(t,e,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),e)this.push({data:function(t){return R.DATA_DESCRIPTOR+A(t.crc32,4)+A(t.compressedSize,4)+A(t.uncompressedSize,4)}(t),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var t=this.bytesWritten,e=0;e<this.dirRecords.length;e++)this.push({data:this.dirRecords[e],meta:{percent:100}});var r=this.bytesWritten-t,i=function(t,e,r,i,n){var s=I.transformTo("string",n(i));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(t,2)+A(t,2)+A(e,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,t,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(t){this._sources.push(t);var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.closedSource(e.previous.streamInfo),e._sources.length?e.prepareNextSource():e.end()}),t.on("error",function(t){e.error(t)}),this},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(t){var e=this._sources;if(!n.prototype.error.call(this,t))return!1;for(var r=0;r<e.length;r++)try{e[r].error(t)}catch(t){}return!0},s.prototype.lock=function(){n.prototype.lock.call(this);for(var t=this._sources,e=0;e<t.length;e++)t[e].lock()},e.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,e,r){"use strict";var u=t("../compressions"),i=t("./ZipFileWorker");r.generateWorker=function(t,a,e){var o=new i(a.streamFiles,e,a.platform,a.encodeFileName),h=0;try{t.forEach(function(t,e){h++;var r=function(t,e){var r=t||e,i=u[r];if(!i)throw new Error(r+" is not a valid compression method !");return i}(e.options.compression,a.compression),i=e.options.compressionOptions||a.compressionOptions||{},n=e.dir,s=e.date;e._compressWorker(r,i).withStreamInfo("file",{name:t,dir:n,date:s,comment:e.comment||"",unixPermissions:e.unixPermissions,dosPermissions:e.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(t){o.error(t)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,e,r){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var t=new i;for(var e in this)"function"!=typeof this[e]&&(t[e]=this[e]);return t}}(i.prototype=t("./object")).loadAsync=t("./load"),i.support=t("./support"),i.defaults=t("./defaults"),i.version="3.9.1",i.loadAsync=function(t,e){return(new i).loadAsync(t,e)},i.external=t("./external"),e.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,e,r){"use strict";var u=t("./utils"),n=t("./external"),i=t("./utf8"),s=t("./zipEntries"),a=t("./stream/Crc32Probe"),l=t("./nodejsUtils");function f(i){return new n.Promise(function(t,e){var r=i.decompressed.getContentWorker().pipe(new a);r.on("error",function(t){e(t)}).on("end",function(){r.streamInfo.crc32!==i.decompressed.crc32?e(new Error("Corrupted zip : CRC32 mismatch")):t()}).resume()})}e.exports=function(t,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:i.utf8decode}),l.isNode&&l.isStream(t)?n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",t,!0,o.optimizedBinaryString,o.base64).then(function(t){var e=new s(o);return e.load(t),e}).then(function(t){var e=[n.Promise.resolve(t)],r=t.files;if(o.checkCRC32)for(var i=0;i<r.length;i++)e.push(f(r[i]));return n.Promise.all(e)}).then(function(t){for(var e=t.shift(),r=e.files,i=0;i<r.length;i++){var n=r[i],s=n.fileNameStr,a=u.resolve(n.fileNameStr);h.file(a,n.decompressed,{binary:!0,optimizedBinaryString:!0,date:n.date,dir:n.dir,comment:n.fileCommentStr.length?n.fileCommentStr:null,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions,createFolders:o.createFolders}),n.dir||(h.file(a).unsafeOriginalName=s)}return e.zipComment.length&&(h.comment=e.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../stream/GenericWorker");function s(t,e){n.call(this,"Nodejs stream input adapter for "+t),this._upstreamEnded=!1,this._bindStream(e)}i.inherits(s,n),s.prototype._bindStream=function(t){var e=this;(this._stream=t).pause(),t.on("data",function(t){e.push({data:t,meta:{percent:0}})}).on("error",function(t){e.isPaused?this.generatedError=t:e.error(t)}).on("end",function(){e.isPaused?e._upstreamEnded=!0:e.end()})},s.prototype.pause=function(){return!!n.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},e.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,e,r){"use strict";var n=t("readable-stream").Readable;function i(t,e,r){n.call(this,e),this._helper=t;var i=this;t.on("data",function(t,e){i.push(t)||i._helper.pause(),r&&r(e)}).on("error",function(t){i.emit("error",t)}).on("end",function(){i.push(null)})}t("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},e.exports=i},{"../utils":32,"readable-stream":16}],14:[function(t,e,r){"use strict";e.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(t,e){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(t,e);if("number"==typeof t)throw new Error('The "data" argument must not be a number');return new Buffer(t,e)},allocBuffer:function(t){if(Buffer.alloc)return Buffer.alloc(t);var e=new Buffer(t);return e.fill(0),e},isBuffer:function(t){return Buffer.isBuffer(t)},isStream:function(t){return t&&"function"==typeof t.on&&"function"==typeof t.pause&&"function"==typeof t.resume}}},{}],15:[function(t,e,r){"use strict";function s(t,e,r){var i,n=u.getTypeOf(e),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(t=g(t)),s.createFolders&&(i=_(t))&&b.call(this,i,!0);var a="string"===n&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(e instanceof d&&0===e.uncompressedSize||s.dir||!e||0===e.length)&&(s.base64=!1,s.binary=!0,e="",s.compression="STORE",n="string");var o=null;o=e instanceof d||e instanceof l?e:p.isNode&&p.isStream(e)?new m(t,e):u.prepareContent(t,e,s.binary,s.optimizedBinaryString,s.base64);var h=new c(t,o,s);this.files[t]=h}var n=t("./utf8"),u=t("./utils"),l=t("./stream/GenericWorker"),a=t("./stream/StreamHelper"),f=t("./defaults"),d=t("./compressedObject"),c=t("./zipObject"),o=t("./generate"),p=t("./nodejsUtils"),m=t("./nodejs/NodejsStreamInputAdapter"),_=function(t){"/"===t.slice(-1)&&(t=t.substring(0,t.length-1));var e=t.lastIndexOf("/");return 0<e?t.substring(0,e):""},g=function(t){return"/"!==t.slice(-1)&&(t+="/"),t},b=function(t,e){return e=void 0!==e?e:f.createFolders,t=g(t),this.files[t]||s.call(this,t,null,{dir:!0,createFolders:e}),this.files[t]};function h(t){return"[object RegExp]"===Object.prototype.toString.call(t)}var i={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(t){var e,r,i;for(e in this.files)i=this.files[e],(r=e.slice(this.root.length,e.length))&&e.slice(0,this.root.length)===this.root&&t(r,i)},filter:function(r){var i=[];return this.forEach(function(t,e){r(t,e)&&i.push(e)}),i},file:function(t,e,r){if(1!==arguments.length)return t=this.root+t,s.call(this,t,e,r),this;if(h(t)){var i=t;return this.filter(function(t,e){return!e.dir&&i.test(t)})}var n=this.files[this.root+t];return n&&!n.dir?n:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(t,e){return e.dir&&r.test(t)});var t=this.root+r,e=b.call(this,t),i=this.clone();return i.root=e.name,i},remove:function(r){r=this.root+r;var t=this.files[r];if(t||("/"!==r.slice(-1)&&(r+="/"),t=this.files[r]),t&&!t.dir)delete this.files[r];else for(var e=this.filter(function(t,e){return e.name.slice(0,r.length)===r}),i=0;i<e.length;i++)delete this.files[e[i].name];return this},generate:function(t){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(t){var e,r={};try{if((r=u.extend(t||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:n.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var i=r.comment||this.comment||"";e=o.generateWorker(this,r,i)}catch(t){(e=new l("error")).error(t)}return new a(e,r.type||"string",r.mimeType)},generateAsync:function(t,e){return this.generateInternalStream(t).accumulate(e)},generateNodeStream:function(t,e){return(t=t||{}).type||(t.type="nodebuffer"),this.generateInternalStream(t).toNodejsStream(e)}};e.exports=i},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,e,r){e.exports=t("stream")},{stream:void 0}],17:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t);for(var e=0;e<this.data.length;e++)t[e]=255&t[e]}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data[this.zero+t]},n.prototype.lastIndexOfSignature=function(t){for(var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===e&&this.data[s+1]===r&&this.data[s+2]===i&&this.data[s+3]===n)return s-this.zero;return-1},n.prototype.readAndCheckSignature=function(t){var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.readData(4);return e===s[0]&&r===s[1]&&i===s[2]&&n===s[3]},n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return[];var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],18:[function(t,e,r){"use strict";var i=t("../utils");function n(t){this.data=t,this.length=t.length,this.index=0,this.zero=0}n.prototype={checkOffset:function(t){this.checkIndex(this.index+t)},checkIndex:function(t){if(this.length<this.zero+t||t<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+t+"). Corrupted zip ?")},setIndex:function(t){this.checkIndex(t),this.index=t},skip:function(t){this.setIndex(this.index+t)},byteAt:function(t){},readInt:function(t){var e,r=0;for(this.checkOffset(t),e=this.index+t-1;e>=this.index;e--)r=(r<<8)+this.byteAt(e);return this.index+=t,r},readString:function(t){return i.transformTo("string",this.readData(t))},readData:function(t){},lastIndexOfSignature:function(t){},readAndCheckSignature:function(t){},readDate:function(){var t=this.readInt(4);return new Date(Date.UTC(1980+(t>>25&127),(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(31&t)<<1))}},e.exports=n},{"../utils":32}],19:[function(t,e,r){"use strict";var i=t("./Uint8ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data.charCodeAt(this.zero+t)},n.prototype.lastIndexOfSignature=function(t){return this.data.lastIndexOf(t)-this.zero},n.prototype.readAndCheckSignature=function(t){return t===this.readData(4)},n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],21:[function(t,e,r){"use strict";var i=t("./ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return new Uint8Array(0);var e=this.data.subarray(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./ArrayReader":17}],22:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../support"),s=t("./ArrayReader"),a=t("./StringReader"),o=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");e.exports=function(t){var e=i.getTypeOf(t);return i.checkSupport(e),"string"!==e||n.uint8array?"nodebuffer"===e?new o(t):n.uint8array?new h(i.transformTo("uint8array",t)):new s(i.transformTo("array",t)):new a(t)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,e,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../utils");function s(t){i.call(this,"ConvertWorker to "+t),this.destType=t}n.inherits(s,i),s.prototype.processChunk=function(t){this.push({data:n.transformTo(this.destType,t.data),meta:t.meta})},e.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../crc32");function s(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(s,i),s.prototype.processChunk=function(t){this.streamInfo.crc32=n(t.data,this.streamInfo.crc32||0),this.push(t)},e.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataLengthProbe for "+t),this.propName=t,this.withStreamInfo(t,0)}i.inherits(s,n),s.prototype.processChunk=function(t){if(t){var e=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=e+t.data.length}n.prototype.processChunk.call(this,t)},e.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataWorker");var e=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,t.then(function(t){e.dataIsReady=!0,e.data=t,e.max=t&&t.length||0,e.type=i.getTypeOf(t),e.isPaused||e._tickAndRepeat()},function(t){e.error(t)})}i.inherits(s,n),s.prototype.cleanUp=function(){n.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var t=null,e=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":t=this.data.substring(this.index,e);break;case"uint8array":t=this.data.subarray(this.index,e);break;case"array":case"nodebuffer":t=this.data.slice(this.index,e)}return this.index=e,this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})},e.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(t,e,r){"use strict";function i(t){this.name=t||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(t){this.emit("data",t)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(t){this.emit("error",t)}return!0},error:function(t){return!this.isFinished&&(this.isPaused?this.generatedError=t:(this.isFinished=!0,this.emit("error",t),this.previous&&this.previous.error(t),this.cleanUp()),!0)},on:function(t,e){return this._listeners[t].push(e),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(t,e){if(this._listeners[t])for(var r=0;r<this._listeners[t].length;r++)this._listeners[t][r].call(this,e)},pipe:function(t){return t.registerPrevious(this)},registerPrevious:function(t){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=t.streamInfo,this.mergeStreamInfo(),this.previous=t;var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.end()}),t.on("error",function(t){e.error(t)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var t=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),t=!0),this.previous&&this.previous.resume(),!t},flush:function(){},processChunk:function(t){this.push(t)},withStreamInfo:function(t,e){return this.extraStreamInfo[t]=e,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var t in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(t)&&(this.streamInfo[t]=this.extraStreamInfo[t])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var t="Worker "+this.name;return this.previous?this.previous+" -> "+t:t}},e.exports=i},{}],29:[function(t,e,r){"use strict";var h=t("../utils"),n=t("./ConvertWorker"),s=t("./GenericWorker"),u=t("../base64"),i=t("../support"),a=t("../external"),o=null;if(i.nodestream)try{o=t("../nodejs/NodejsStreamOutputAdapter")}catch(t){}function l(t,o){return new a.Promise(function(e,r){var i=[],n=t._internalType,s=t._outputType,a=t._mimeType;t.on("data",function(t,e){i.push(t),o&&o(e)}).on("error",function(t){i=[],r(t)}).on("end",function(){try{var t=function(t,e,r){switch(t){case"blob":return h.newBlob(h.transformTo("arraybuffer",e),r);case"base64":return u.encode(e);default:return h.transformTo(t,e)}}(s,function(t,e){var r,i=0,n=null,s=0;for(r=0;r<e.length;r++)s+=e[r].length;switch(t){case"string":return e.join("");case"array":return Array.prototype.concat.apply([],e);case"uint8array":for(n=new Uint8Array(s),r=0;r<e.length;r++)n.set(e[r],i),i+=e[r].length;return n;case"nodebuffer":return Buffer.concat(e);default:throw new Error("concat : unsupported type '"+t+"'")}}(n,i),a);e(t)}catch(t){r(t)}i=[]}).resume()})}function f(t,e,r){var i=e;switch(e){case"blob":case"arraybuffer":i="uint8array";break;case"base64":i="string"}try{this._internalType=i,this._outputType=e,this._mimeType=r,h.checkSupport(i),this._worker=t.pipe(new n(i)),t.lock()}catch(t){this._worker=new s("error"),this._worker.error(t)}}f.prototype={accumulate:function(t){return l(this,t)},on:function(t,e){var r=this;return"data"===t?this._worker.on(t,function(t){e.call(r,t.data,t.meta)}):this._worker.on(t,function(){h.delay(e,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(t){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},t)}},e.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,e,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var i=new ArrayBuffer(0);try{r.blob=0===new Blob([i],{type:"application/zip"}).size}catch(t){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);n.append(i),r.blob=0===n.getBlob("application/zip").size}catch(t){r.blob=!1}}}try{r.nodestream=!!t("readable-stream").Readable}catch(t){r.nodestream=!1}},{"readable-stream":16}],31:[function(t,e,s){"use strict";for(var o=t("./utils"),h=t("./support"),r=t("./nodejsUtils"),i=t("./stream/GenericWorker"),u=new Array(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;u[254]=u[254]=1;function a(){i.call(this,"utf-8 decode"),this.leftOver=null}function l(){i.call(this,"utf-8 encode")}s.utf8encode=function(t){return h.nodebuffer?r.newBufferFrom(t,"utf-8"):function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=h.uint8array?new Uint8Array(o):new Array(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e}(t)},s.utf8decode=function(t){return h.nodebuffer?o.transformTo("nodebuffer",t).toString("utf-8"):function(t){var e,r,i,n,s=t.length,a=new Array(2*s);for(e=r=0;e<s;)if((i=t[e++])<128)a[r++]=i;else if(4<(n=u[i]))a[r++]=65533,e+=n-1;else{for(i&=2===n?31:3===n?15:7;1<n&&e<s;)i=i<<6|63&t[e++],n--;1<n?a[r++]=65533:i<65536?a[r++]=i:(i-=65536,a[r++]=55296|i>>10&1023,a[r++]=56320|1023&i)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(t=o.transformTo(h.uint8array?"uint8array":"array",t))},o.inherits(a,i),a.prototype.processChunk=function(t){var e=o.transformTo(h.uint8array?"uint8array":"array",t.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=e;(e=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),e.set(r,this.leftOver.length)}else e=this.leftOver.concat(e);this.leftOver=null}var i=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}(e),n=e;i!==e.length&&(h.uint8array?(n=e.subarray(0,i),this.leftOver=e.subarray(i,e.length)):(n=e.slice(0,i),this.leftOver=e.slice(i,e.length))),this.push({data:s.utf8decode(n),meta:t.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,i),l.prototype.processChunk=function(t){this.push({data:s.utf8encode(t.data),meta:t.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,e,a){"use strict";var o=t("./support"),h=t("./base64"),r=t("./nodejsUtils"),i=t("set-immediate-shim"),u=t("./external");function n(t){return t}function l(t,e){for(var r=0;r<t.length;++r)e[r]=255&t.charCodeAt(r);return e}a.newBlob=function(e,r){a.checkSupport("blob");try{return new Blob([e],{type:r})}catch(t){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return i.append(e),i.getBlob(r)}catch(t){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(t,e,r){var i=[],n=0,s=t.length;if(s<=r)return String.fromCharCode.apply(null,t);for(;n<s;)"array"===e||"nodebuffer"===e?i.push(String.fromCharCode.apply(null,t.slice(n,Math.min(n+r,s)))):i.push(String.fromCharCode.apply(null,t.subarray(n,Math.min(n+r,s)))),n+=r;return i.join("")},stringifyByChar:function(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(t){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(t){return!1}}()}};function f(t){var e=65536,r=a.getTypeOf(t),i=!0;if("uint8array"===r?i=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(i=s.applyCanBeUsed.nodebuffer),i)for(;1<e;)try{return s.stringifyByChunk(t,r,e)}catch(t){e=Math.floor(e/2)}return s.stringifyByChar(t)}function d(t,e){for(var r=0;r<t.length;r++)e[r]=t[r];return e}a.applyFromCharCode=f;var c={};c.string={string:n,array:function(t){return l(t,new Array(t.length))},arraybuffer:function(t){return c.string.uint8array(t).buffer},uint8array:function(t){return l(t,new Uint8Array(t.length))},nodebuffer:function(t){return l(t,r.allocBuffer(t.length))}},c.array={string:f,array:n,arraybuffer:function(t){return new Uint8Array(t).buffer},uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(t)}},c.arraybuffer={string:function(t){return f(new Uint8Array(t))},array:function(t){return d(new Uint8Array(t),new Array(t.byteLength))},arraybuffer:n,uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(new Uint8Array(t))}},c.uint8array={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return t.buffer},uint8array:n,nodebuffer:function(t){return r.newBufferFrom(t)}},c.nodebuffer={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return c.nodebuffer.uint8array(t).buffer},uint8array:function(t){return d(t,new Uint8Array(t.length))},nodebuffer:n},a.transformTo=function(t,e){if(e=e||"",!t)return e;a.checkSupport(t);var r=a.getTypeOf(e);return c[r][t](e)},a.resolve=function(t){for(var e=t.split("/"),r=[],i=0;i<e.length;i++){var n=e[i];"."===n||""===n&&0!==i&&i!==e.length-1||(".."===n?r.pop():r.push(n))}return r.join("/")},a.getTypeOf=function(t){return"string"==typeof t?"string":"[object Array]"===Object.prototype.toString.call(t)?"array":o.nodebuffer&&r.isBuffer(t)?"nodebuffer":o.uint8array&&t instanceof Uint8Array?"uint8array":o.arraybuffer&&t instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(t){if(!o[t.toLowerCase()])throw new Error(t+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(t){var e,r,i="";for(r=0;r<(t||"").length;r++)i+="\\x"+((e=t.charCodeAt(r))<16?"0":"")+e.toString(16).toUpperCase();return i},a.delay=function(t,e,r){i(function(){t.apply(r||null,e||[])})},a.inherits=function(t,e){function r(){}r.prototype=e.prototype,t.prototype=new r},a.extend=function(){var t,e,r={};for(t=0;t<arguments.length;t++)for(e in arguments[t])arguments[t].hasOwnProperty(e)&&void 0===r[e]&&(r[e]=arguments[t][e]);return r},a.prepareContent=function(r,t,i,n,s){return u.Promise.resolve(t).then(function(i){return o.blob&&(i instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(i)))&&"undefined"!=typeof FileReader?new u.Promise(function(e,r){var t=new FileReader;t.onload=function(t){e(t.target.result)},t.onerror=function(t){r(t.target.error)},t.readAsArrayBuffer(i)}):i}).then(function(t){var e=a.getTypeOf(t);return e?("arraybuffer"===e?t=a.transformTo("uint8array",t):"string"===e&&(s?t=h.decode(t):i&&!0!==n&&(t=function(t){return l(t,o.uint8array?new Uint8Array(t.length):new Array(t.length))}(t))),t):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),n=t("./utils"),s=t("./signature"),a=t("./zipEntry"),o=(t("./utf8"),t("./support"));function h(t){this.files=[],this.loadOptions=t}h.prototype={checkSignature:function(t){if(!this.reader.readAndCheckSignature(t)){this.reader.index-=4;var e=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+n.pretty(e)+", expected "+n.pretty(t)+")")}},isSignature:function(t,e){var r=this.reader.index;this.reader.setIndex(t);var i=this.reader.readString(4)===e;return this.reader.setIndex(r),i},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var t=this.reader.readData(this.zipCommentLength),e=o.uint8array?"uint8array":"array",r=n.transformTo(e,t);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var t,e,r,i=this.zip64EndOfCentralSize-44;0<i;)t=this.reader.readInt(2),e=this.reader.readInt(4),r=this.reader.readData(e),this.zip64ExtensibleData[t]={id:t,length:e,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var t,e;for(t=0;t<this.files.length;t++)e=this.files[t],this.reader.setIndex(e.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),e.readLocalPart(this.reader),e.handleUTF8(),e.processAttributes()},readCentralDir:function(){var t;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(t=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(t);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var t=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(t<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(t);var e=t;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){if(this.zip64=!0,(t=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(t),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var i=e-r;if(0<i)this.isSignature(e,s.CENTRAL_FILE_HEADER)||(this.reader.zero=i);else if(i<0)throw new Error("Corrupted zip: missing "+Math.abs(i)+" bytes.")},prepareReader:function(t){this.reader=i(t)},load:function(t){this.prepareReader(t),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},e.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),s=t("./utils"),n=t("./compressedObject"),a=t("./crc32"),o=t("./utf8"),h=t("./compressions"),u=t("./support");function l(t,e){this.options=t,this.loadOptions=e}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(t){var e,r;if(t.skip(22),this.fileNameLength=t.readInt(2),r=t.readInt(2),this.fileName=t.readData(this.fileNameLength),t.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(e=function(t){for(var e in h)if(h.hasOwnProperty(e)&&h[e].magic===t)return h[e];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new n(this.compressedSize,this.uncompressedSize,this.crc32,e,t.readData(this.compressedSize))},readCentralPart:function(t){this.versionMadeBy=t.readInt(2),t.skip(2),this.bitFlag=t.readInt(2),this.compressionMethod=t.readString(2),this.date=t.readDate(),this.crc32=t.readInt(4),this.compressedSize=t.readInt(4),this.uncompressedSize=t.readInt(4);var e=t.readInt(2);if(this.extraFieldsLength=t.readInt(2),this.fileCommentLength=t.readInt(2),this.diskNumberStart=t.readInt(2),this.internalFileAttributes=t.readInt(2),this.externalFileAttributes=t.readInt(4),this.localHeaderOffset=t.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");t.skip(e),this.readExtraFields(t),this.parseZIP64ExtraField(t),this.fileComment=t.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var t=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==t&&(this.dosPermissions=63&this.externalFileAttributes),3==t&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(t){if(this.extraFields[1]){var e=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(t){var e,r,i,n=t.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});t.index+4<n;)e=t.readInt(2),r=t.readInt(2),i=t.readData(r),this.extraFields[e]={id:e,length:r,value:i};t.setIndex(n)},handleUTF8:function(){var t=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var e=this.findExtraFieldUnicodePath();if(null!==e)this.fileNameStr=e;else{var r=s.transformTo(t,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var i=this.findExtraFieldUnicodeComment();if(null!==i)this.fileCommentStr=i;else{var n=s.transformTo(t,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(n)}}},findExtraFieldUnicodePath:function(){var t=this.extraFields[28789];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileName)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null},findExtraFieldUnicodeComment:function(){var t=this.extraFields[25461];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileComment)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null}},e.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,e,r){"use strict";function i(t,e,r){this.name=t,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=e,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=t("./stream/StreamHelper"),n=t("./stream/DataWorker"),a=t("./utf8"),o=t("./compressedObject"),h=t("./stream/GenericWorker");i.prototype={internalStream:function(t){var e=null,r="string";try{if(!t)throw new Error("No output type specified.");var i="string"===(r=t.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),e=this._decompressWorker();var n=!this._dataBinary;n&&!i&&(e=e.pipe(new a.Utf8EncodeWorker)),!n&&i&&(e=e.pipe(new a.Utf8DecodeWorker))}catch(t){(e=new h("error")).error(t)}return new s(e,r,"")},async:function(t,e){return this.internalStream(t).accumulate(e)},nodeStream:function(t,e){return this.internalStream(t||"nodebuffer").toNodejsStream(e)},_compressWorker:function(t,e){if(this._data instanceof o&&this._data.compression.magic===t.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,t,e)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new n(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)i.prototype[u[f]]=l;e.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,l,e){(function(e){"use strict";var r,i,t=e.MutationObserver||e.WebKitMutationObserver;if(t){var n=0,s=new t(u),a=e.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=n=++n%2}}else if(e.setImmediate||void 0===e.MessageChannel)r="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var o=new e.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var t,e;i=!0;for(var r=h.length;r;){for(e=h,h=[],t=-1;++t<r;)e[t]();r=h.length}i=!1}l.exports=function(t){1!==h.push(t)||i||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(t,e,r){"use strict";var n=t("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],i=["PENDING"];function o(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=i,this.queue=[],this.outcome=void 0,t!==u&&c(this,t)}function h(t,e,r){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(e,r,i){n(function(){var t;try{t=r(i)}catch(t){return l.reject(e,t)}t===e?l.reject(e,new TypeError("Cannot resolve promise with itself")):l.resolve(e,t)})}function d(t){var e=t&&t.then;if(t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof e)return function(){e.apply(t,arguments)}}function c(e,t){var r=!1;function i(t){r||(r=!0,l.reject(e,t))}function n(t){r||(r=!0,l.resolve(e,t))}var s=p(function(){t(n,i)});"error"===s.status&&i(s.value)}function p(t,e){var r={};try{r.value=t(e),r.status="success"}catch(t){r.status="error",r.value=t}return r}(e.exports=o).prototype.finally=function(e){if("function"!=typeof e)return this;var r=this.constructor;return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){throw t})})},o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){if("function"!=typeof t&&this.state===a||"function"!=typeof e&&this.state===s)return this;var r=new this.constructor(u);this.state!==i?f(r,this.state===a?t:e,this.outcome):this.queue.push(new h(r,t,e));return r},h.prototype.callFulfilled=function(t){l.resolve(this.promise,t)},h.prototype.otherCallFulfilled=function(t){f(this.promise,this.onFulfilled,t)},h.prototype.callRejected=function(t){l.reject(this.promise,t)},h.prototype.otherCallRejected=function(t){f(this.promise,this.onRejected,t)},l.resolve=function(t,e){var r=p(d,e);if("error"===r.status)return l.reject(t,r.value);var i=r.value;if(i)c(t,i);else{t.state=a,t.outcome=e;for(var n=-1,s=t.queue.length;++n<s;)t.queue[n].callFulfilled(e)}return t},l.reject=function(t,e){t.state=s,t.outcome=e;for(var r=-1,i=t.queue.length;++r<i;)t.queue[r].callRejected(e);return t},o.resolve=function(t){if(t instanceof this)return t;return l.resolve(new this(u),t)},o.reject=function(t){var e=new this(u);return l.reject(e,t)},o.all=function(t){var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);var s=new Array(i),a=0,e=-1,o=new this(u);for(;++e<i;)h(t[e],e);return o;function h(t,e){r.resolve(t).then(function(t){s[e]=t,++a!==i||n||(n=!0,l.resolve(o,s))},function(t){n||(n=!0,l.reject(o,t))})}},o.race=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var r=t.length,i=!1;if(!r)return this.resolve([]);var n=-1,s=new this(u);for(;++n<r;)a=t[n],e.resolve(a).then(function(t){i||(i=!0,l.resolve(s,t))},function(t){i||(i=!0,l.reject(s,t))});var a;return s}},{immediate:36}],38:[function(t,e,r){"use strict";var i={};(0,t("./lib/utils/common").assign)(i,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),e.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,e,r){"use strict";var a=t("./zlib/deflate"),o=t("./utils/common"),h=t("./utils/strings"),n=t("./zlib/messages"),s=t("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,d=0,c=8;function p(t){if(!(this instanceof p))return new p(t);this.options=o.assign({level:f,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},t||{});var e=this.options;e.raw&&0<e.windowBits?e.windowBits=-e.windowBits:e.gzip&&0<e.windowBits&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(r!==l)throw new Error(n[r]);if(e.header&&a.deflateSetHeader(this.strm,e.header),e.dictionary){var i;if(i="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===u.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,(r=a.deflateSetDictionary(this.strm,i))!==l)throw new Error(n[r]);this._dict_set=!0}}function i(t,e){var r=new p(e);if(r.push(t,!0),r.err)throw r.msg||n[r.err];return r.result}p.prototype.push=function(t,e){var r,i,n=this.strm,s=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:!0===e?4:0,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===u.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new o.Buf8(s),n.next_out=0,n.avail_out=s),1!==(r=a.deflate(n,i))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==n.avail_out&&(0!==n.avail_in||4!==i&&2!==i)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(n.output,n.next_out))):this.onData(o.shrinkBuf(n.output,n.next_out)))}while((0<n.avail_in||0===n.avail_out)&&1!==r);return 4===i?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==i||(this.onEnd(l),!(n.avail_out=0))},p.prototype.onData=function(t){this.chunks.push(t)},p.prototype.onEnd=function(t){t===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Deflate=p,r.deflate=i,r.deflateRaw=function(t,e){return(e=e||{}).raw=!0,i(t,e)},r.gzip=function(t,e){return(e=e||{}).gzip=!0,i(t,e)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,e,r){"use strict";var d=t("./zlib/inflate"),c=t("./utils/common"),p=t("./utils/strings"),m=t("./zlib/constants"),i=t("./zlib/messages"),n=t("./zlib/zstream"),s=t("./zlib/gzheader"),_=Object.prototype.toString;function a(t){if(!(this instanceof a))return new a(t);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&0<=e.windowBits&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(0<=e.windowBits&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),15<e.windowBits&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new n,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,e.windowBits);if(r!==m.Z_OK)throw new Error(i[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(t,e){var r=new a(e);if(r.push(t,!0),r.err)throw r.msg||i[r.err];return r.result}a.prototype.push=function(t,e){var r,i,n,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;i=e===~~e?e:!0===e?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof t?h.input=p.binstring2buf(t):"[object ArrayBuffer]"===_.call(t)?h.input=new Uint8Array(t):h.input=t,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new c.Buf8(u),h.next_out=0,h.avail_out=u),(r=d.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||i!==m.Z_FINISH&&i!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(n=p.utf8border(h.output,h.next_out),s=h.next_out-n,a=p.buf2string(h.output,n),h.next_out=s,h.avail_out=u-s,s&&c.arraySet(h.output,h.output,n,s,0),this.onData(a)):this.onData(c.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(i=m.Z_FINISH),i===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):i!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(t){this.chunks.push(t)},a.prototype.onEnd=function(t){t===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(t,e){return(e=e||{}).raw=!0,o(t,e)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var r=e.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}}return t},r.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,r,i,n){if(e.subarray&&t.subarray)t.set(e.subarray(r,r+i),n);else for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){var e,r,i,n,s,a;for(e=i=0,r=t.length;e<r;e++)i+=t[e].length;for(a=new Uint8Array(i),e=n=0,r=t.length;e<r;e++)s=t[e],a.set(s,n),n+=s.length;return a}},s={arraySet:function(t,e,r,i,n){for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){return[].concat.apply([],t)}};r.setTyped=function(t){t?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,n)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(i)},{}],42:[function(t,e,r){"use strict";var h=t("./common"),n=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var u=new h.Buf8(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function l(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&n))return String.fromCharCode.apply(null,h.shrinkBuf(t,e));for(var r="",i=0;i<e;i++)r+=String.fromCharCode(t[i]);return r}u[254]=u[254]=1,r.string2buf=function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=new h.Buf8(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e},r.buf2binstring=function(t){return l(t,t.length)},r.binstring2buf=function(t){for(var e=new h.Buf8(t.length),r=0,i=e.length;r<i;r++)e[r]=t.charCodeAt(r);return e},r.buf2string=function(t,e){var r,i,n,s,a=e||t.length,o=new Array(2*a);for(r=i=0;r<a;)if((n=t[r++])<128)o[i++]=n;else if(4<(s=u[n]))o[i++]=65533,r+=s-1;else{for(n&=2===s?31:3===s?15:7;1<s&&r<a;)n=n<<6|63&t[r++],s--;1<s?o[i++]=65533:n<65536?o[i++]=n:(n-=65536,o[i++]=55296|n>>10&1023,o[i++]=56320|1023&n)}return l(o,i)},r.utf8border=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}},{"./common":41}],43:[function(t,e,r){"use strict";e.exports=function(t,e,r,i){for(var n=65535&t|0,s=t>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(n=n+e[i++]|0)|0,--a;);n%=65521,s%=65521}return n|s<<16|0}},{}],44:[function(t,e,r){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,e,r){"use strict";var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}},{}],46:[function(t,e,r){"use strict";var h,d=t("../utils/common"),u=t("./trees"),c=t("./adler32"),p=t("./crc32"),i=t("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,n=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(t,e){return t.msg=i[e],e}function T(t){return(t<<1)-(4<t?9:0)}function D(t){for(var e=t.length;0<=--e;)t[e]=0}function F(t){var e=t.state,r=e.pending;r>t.avail_out&&(r=t.avail_out),0!==r&&(d.arraySet(t.output,e.pending_buf,e.pending_out,r,t.next_out),t.next_out+=r,e.pending_out+=r,t.total_out+=r,t.avail_out-=r,e.pending-=r,0===e.pending&&(e.pending_out=0))}function N(t,e){u._tr_flush_block(t,0<=t.block_start?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,F(t.strm)}function U(t,e){t.pending_buf[t.pending++]=e}function P(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function L(t,e){var r,i,n=t.max_chain_length,s=t.strstart,a=t.prev_length,o=t.nice_match,h=t.strstart>t.w_size-z?t.strstart-(t.w_size-z):0,u=t.window,l=t.w_mask,f=t.prev,d=t.strstart+S,c=u[s+a-1],p=u[s+a];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(u[(r=e)+a]===p&&u[r+a-1]===c&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<d);if(i=S-(d-s),s=d-S,a<i){if(t.match_start=e,o<=(a=i))break;c=u[s+a-1],p=u[s+a]}}}while((e=f[e&l])>h&&0!=--n);return a<=t.lookahead?a:t.lookahead}function j(t){var e,r,i,n,s,a,o,h,u,l,f=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=f+(f-z)){for(d.arraySet(t.window,t.window,f,f,0),t.match_start-=f,t.strstart-=f,t.block_start-=f,e=r=t.hash_size;i=t.head[--e],t.head[e]=f<=i?i-f:0,--r;);for(e=r=f;i=t.prev[--e],t.prev[e]=f<=i?i-f:0,--r;);n+=f}if(0===t.strm.avail_in)break;if(a=t.strm,o=t.window,h=t.strstart+t.lookahead,u=n,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,d.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=c(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),t.lookahead+=r,t.lookahead+t.insert>=x)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+x-1])&t.hash_mask,t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<x)););}while(t.lookahead<z&&0!==t.strm.avail_in)}function Z(t,e){for(var r,i;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==r&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r)),t.match_length>=x)if(i=u._tr_tally(t,t.strstart-t.match_start,t.match_length-x),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=x){for(t.match_length--;t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart,0!=--t.match_length;);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function W(t,e){for(var r,i,n;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=x-1,0!==r&&t.prev_length<t.max_lazy_match&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r),t.match_length<=5&&(1===t.strategy||t.match_length===x&&4096<t.strstart-t.match_start)&&(t.match_length=x-1)),t.prev_length>=x&&t.match_length<=t.prev_length){for(n=t.strstart+t.lookahead-x,i=u._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-x),t.lookahead-=t.prev_length-1,t.prev_length-=2;++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!=--t.prev_length;);if(t.match_available=0,t.match_length=x-1,t.strstart++,i&&(N(t,!1),0===t.strm.avail_out))return A}else if(t.match_available){if((i=u._tr_tally(t,0,t.window[t.strstart-1]))&&N(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return A}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=u._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function M(t,e,r,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=r,this.max_chain=i,this.func=n}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*w),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(k+1),this.heap=new d.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=n,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?C:E,t.adler=2===e.wrap?0:1,e.last_flush=l,u._tr_init(e),m):R(t,_)}function K(t){var e=G(t);return e===m&&function(t){t.window_size=2*t.w_size,D(t.head),t.max_lazy_match=h[t.level].max_lazy,t.good_match=h[t.level].good_length,t.nice_match=h[t.level].nice_length,t.max_chain_length=h[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=x-1,t.match_available=0,t.ins_h=0}(t.state),e}function Y(t,e,r,i,n,s){if(!t)return _;var a=1;if(e===g&&(e=6),i<0?(a=0,i=-i):15<i&&(a=2,i-=16),n<1||y<n||r!==v||i<8||15<i||e<0||9<e||s<0||b<s)return R(t,_);8===i&&(i=9);var o=new H;return(t.state=o).strm=t,o.wrap=a,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=s,o.method=r,K(t)}h=[new M(0,0,0,0,function(t,e){var r=65535;for(r>t.pending_buf_size-5&&(r=t.pending_buf_size-5);;){if(t.lookahead<=1){if(j(t),0===t.lookahead&&e===l)return A;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+r;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,N(t,!1),0===t.strm.avail_out))return A;if(t.strstart-t.block_start>=t.w_size-z&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):(t.strstart>t.block_start&&(N(t,!1),t.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(t,e){return Y(t,e,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?_:(t.state.gzhead=e,m):_},r.deflate=function(t,e){var r,i,n,s;if(!t||!t.state||5<e||e<0)return t?R(t,_):_;if(i=t.state,!t.output||!t.input&&0!==t.avail_in||666===i.status&&e!==f)return R(t,0===t.avail_out?-5:_);if(i.strm=t,r=i.last_flush,i.last_flush=e,i.status===C)if(2===i.wrap)t.adler=0,U(i,31),U(i,139),U(i,8),i.gzhead?(U(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),U(i,255&i.gzhead.time),U(i,i.gzhead.time>>8&255),U(i,i.gzhead.time>>16&255),U(i,i.gzhead.time>>24&255),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(U(i,255&i.gzhead.extra.length),U(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(t.adler=p(t.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(U(i,0),U(i,0),U(i,0),U(i,0),U(i,0),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,3),i.status=E);else{var a=v+(i.w_bits-8<<4)<<8;a|=(2<=i.strategy||i.level<2?0:i.level<6?1:6===i.level?2:3)<<6,0!==i.strstart&&(a|=32),a+=31-a%31,i.status=E,P(i,a),0!==i.strstart&&(P(i,t.adler>>>16),P(i,65535&t.adler)),t.adler=1}if(69===i.status)if(i.gzhead.extra){for(n=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending!==i.pending_buf_size));)U(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(73===i.status)if(i.gzhead.name){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.gzindex=0,i.status=91)}else i.status=91;if(91===i.status)if(i.gzhead.comment){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.status=103)}else i.status=103;if(103===i.status&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(t),i.pending+2<=i.pending_buf_size&&(U(i,255&t.adler),U(i,t.adler>>8&255),t.adler=0,i.status=E)):i.status=E),0!==i.pending){if(F(t),0===t.avail_out)return i.last_flush=-1,m}else if(0===t.avail_in&&T(e)<=T(r)&&e!==f)return R(t,-5);if(666===i.status&&0!==t.avail_in)return R(t,-5);if(0!==t.avail_in||0!==i.lookahead||e!==l&&666!==i.status){var o=2===i.strategy?function(t,e){for(var r;;){if(0===t.lookahead&&(j(t),0===t.lookahead)){if(e===l)return A;break}if(t.match_length=0,r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):3===i.strategy?function(t,e){for(var r,i,n,s,a=t.window;;){if(t.lookahead<=S){if(j(t),t.lookahead<=S&&e===l)return A;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=x&&0<t.strstart&&(i=a[n=t.strstart-1])===a[++n]&&i===a[++n]&&i===a[++n]){s=t.strstart+S;do{}while(i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&n<s);t.match_length=S-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=x?(r=u._tr_tally(t,1,t.match_length-x),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):h[i.level].func(i,e);if(o!==O&&o!==B||(i.status=666),o===A||o===O)return 0===t.avail_out&&(i.last_flush=-1),m;if(o===I&&(1===e?u._tr_align(i):5!==e&&(u._tr_stored_block(i,0,0,!1),3===e&&(D(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),F(t),0===t.avail_out))return i.last_flush=-1,m}return e!==f?m:i.wrap<=0?1:(2===i.wrap?(U(i,255&t.adler),U(i,t.adler>>8&255),U(i,t.adler>>16&255),U(i,t.adler>>24&255),U(i,255&t.total_in),U(i,t.total_in>>8&255),U(i,t.total_in>>16&255),U(i,t.total_in>>24&255)):(P(i,t.adler>>>16),P(i,65535&t.adler)),F(t),0<i.wrap&&(i.wrap=-i.wrap),0!==i.pending?m:1)},r.deflateEnd=function(t){var e;return t&&t.state?(e=t.state.status)!==C&&69!==e&&73!==e&&91!==e&&103!==e&&e!==E&&666!==e?R(t,_):(t.state=null,e===E?R(t,-3):m):_},r.deflateSetDictionary=function(t,e){var r,i,n,s,a,o,h,u,l=e.length;if(!t||!t.state)return _;if(2===(s=(r=t.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(t.adler=c(t.adler,e,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new d.Buf8(r.w_size),d.arraySet(u,e,l-r.w_size,r.w_size,0),e=u,l=r.w_size),a=t.avail_in,o=t.next_in,h=t.input,t.avail_in=l,t.next_in=0,t.input=e,j(r);r.lookahead>=x;){for(i=r.strstart,n=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[i+x-1])&r.hash_mask,r.prev[i&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=i,i++,--n;);r.strstart=i,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,t.next_in=o,t.input=h,t.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,e,r){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,e,r){"use strict";e.exports=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C;r=t.state,i=t.next_in,z=t.input,n=i+(t.avail_in-5),s=t.next_out,C=t.output,a=s-(e-t.avail_out),o=s+(t.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;t:do{p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=m[c&g];e:for(;;){if(c>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(c&(1<<y)-1)];continue e}if(32&y){r.mode=12;break t}t.msg="invalid literal/length code",r.mode=30;break t}w=65535&v,(y&=15)&&(p<y&&(c+=z[i++]<<p,p+=8),w+=c&(1<<y)-1,c>>>=y,p-=y),p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=_[c&b];r:for(;;){if(c>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(c&(1<<y)-1)];continue r}t.msg="invalid distance code",r.mode=30;break t}if(k=65535&v,p<(y&=15)&&(c+=z[i++]<<p,(p+=8)<y&&(c+=z[i++]<<p,p+=8)),h<(k+=c&(1<<y)-1)){t.msg="invalid distance too far back",r.mode=30;break t}if(c>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){t.msg="invalid distance too far back",r.mode=30;break t}if(S=d,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=d[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=d[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(i<n&&s<o);i-=w=p>>3,c&=(1<<(p-=w<<3))-1,t.next_in=i,t.next_out=s,t.avail_in=i<n?n-i+5:5-(i-n),t.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(t,e,r){"use strict";var I=t("../utils/common"),O=t("./adler32"),B=t("./crc32"),R=t("./inffast"),T=t("./inftrees"),D=1,F=2,N=0,U=-2,P=1,i=852,n=592;function L(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=P,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new I.Buf32(i),e.distcode=e.distdyn=new I.Buf32(n),e.sane=1,e.back=-1,N):U}function o(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,a(t)):U}function h(t,e){var r,i;return t&&t.state?(i=t.state,e<0?(r=0,e=-e):(r=1+(e>>4),e<48&&(e&=15)),e&&(e<8||15<e)?U:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=r,i.wbits=e,o(t))):U}function u(t,e){var r,i;return t?(i=new s,(t.state=i).window=null,(r=h(t,e))!==N&&(t.state=null),r):U}var l,f,d=!0;function j(t){if(d){var e;for(l=new I.Buf32(512),f=new I.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(T(D,t.lens,0,288,l,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;T(F,t.lens,0,32,f,0,t.work,{bits:5}),d=!1}t.lencode=l,t.lenbits=9,t.distcode=f,t.distbits=5}function Z(t,e,r,i){var n,s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),i>=s.wsize?(I.arraySet(s.window,e,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(i<(n=s.wsize-s.wnext)&&(n=i),I.arraySet(s.window,e,r-i,n,s.wnext),(i-=n)?(I.arraySet(s.window,e,r-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(t){return u(t,15)},r.inflateInit2=u,r.inflate=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return U;12===(r=t.state).mode&&(r.mode=13),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,f=o,d=h,x=N;t:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){t.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){t.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){t.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,t.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){t.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){t.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,i,s,c,k)),512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,r.length-=c),r.length))break t;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(65535&r.check)){t.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),t.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}t.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,2;t.adler=r.check=1,r.mode=12;case 12:if(5===e||6===e)break t;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==e)break;u>>>=2,l-=2;break t;case 2:r.mode=17;break;case 3:t.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){t.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===e)break t;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),h<c&&(c=h),0===c)break t;I.arraySet(n,i,s,c,a),o-=c,s+=c,h-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){t.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){t.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+c>r.nlen+r.ndist){t.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){t.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){t.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===e)break t;case 20:r.mode=21;case 21:if(6<=o&&258<=h){t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,R(t,d),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){t.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){t.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){t.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break t;if(c=d-h,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){t.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=n,p=a-r.offset,c=r.length;for(h<c&&(c=h),h-=c,r.length-=c;n[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break t;n[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break t;o--,u|=i[s++]<<l,l+=8}if(d-=h,t.total_out+=d,r.total+=d,d&&(t.adler=r.check=r.flags?B(r.check,n,d,a-d):O(r.check,n,d,a-d)),d=h,(r.flags?u:L(u))!==r.check){t.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(4294967295&r.total)){t.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break t;case 30:x=-3;break t;case 31:return-4;case 32:default:return U}return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,(r.wsize||d!==t.avail_out&&r.mode<30&&(r.mode<27||4!==e))&&Z(t,t.output,t.next_out,d-t.avail_out)?(r.mode=31,-4):(f-=t.avail_in,d-=t.avail_out,t.total_in+=f,t.total_out+=d,r.total+=d,r.wrap&&d&&(t.adler=r.check=r.flags?B(r.check,n,d,t.next_out-d):O(r.check,n,d,t.next_out-d)),t.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===d||4===e)&&x===N&&(x=-5),x)},r.inflateEnd=function(t){if(!t||!t.state)return U;var e=t.state;return e.window&&(e.window=null),t.state=null,N},r.inflateGetHeader=function(t,e){var r;return t&&t.state?0==(2&(r=t.state).wrap)?U:((r.head=e).done=!1,N):U},r.inflateSetDictionary=function(t,e){var r,i=e.length;return t&&t.state?0!==(r=t.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,e,i,0)!==r.check?-3:Z(t,e,i,i)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,e,r){"use strict";var D=t("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,r,i,n,s,a,o){var h,u,l,f,d,c,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<i;v++)O[e[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===t||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<i;v++)0!==e[r+v]&&(a[B[e[r+v]]++]=v);if(c=0===t?(A=R=a,19):1===t?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,d=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===t&&852<C||2===t&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<c?(m=0,a[v]):a[v]>c?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;n[d+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=e[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),d+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===t&&852<C||2===t&&592<C)return 1;n[l=E&f]=k<<24|x<<16|d-s|0}}return 0!==E&&(n[d+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(t,e,r){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,e,r){"use strict";var n=t("../utils/common"),o=0,h=1;function i(t){for(var e=t.length;0<=--e;)t[e]=0}var s=0,a=29,u=256,l=u+1+a,f=30,d=19,_=2*l+1,g=15,c=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));i(z);var C=new Array(2*f);i(C);var E=new Array(512);i(E);var A=new Array(256);i(A);var I=new Array(a);i(I);var O,B,R,T=new Array(f);function D(t,e,r,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=r,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function F(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function N(t){return t<256?E[t]:E[256+(t>>>7)]}function U(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function P(t,e,r){t.bi_valid>c-r?(t.bi_buf|=e<<t.bi_valid&65535,U(t,t.bi_buf),t.bi_buf=e>>c-t.bi_valid,t.bi_valid+=r-c):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=r)}function L(t,e,r){P(t,r[2*e],r[2*e+1])}function j(t,e){for(var r=0;r|=1&t,t>>>=1,r<<=1,0<--e;);return r>>>1}function Z(t,e,r){var i,n,s=new Array(g+1),a=0;for(i=1;i<=g;i++)s[i]=a=a+r[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=j(s[o]++,o))}}function W(t){var e;for(e=0;e<l;e++)t.dyn_ltree[2*e]=0;for(e=0;e<f;e++)t.dyn_dtree[2*e]=0;for(e=0;e<d;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*m]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function M(t){8<t.bi_valid?U(t,t.bi_buf):0<t.bi_valid&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function H(t,e,r,i){var n=2*e,s=2*r;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[r]}function G(t,e,r){for(var i=t.heap[r],n=r<<1;n<=t.heap_len&&(n<t.heap_len&&H(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!H(e,i,t.heap[n],t.depth));)t.heap[r]=t.heap[n],r=n,n<<=1;t.heap[r]=i}function K(t,e,r){var i,n,s,a,o=0;if(0!==t.last_lit)for(;i=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],n=t.pending_buf[t.l_buf+o],o++,0===i?L(t,n,e):(L(t,(s=A[n])+u+1,e),0!==(a=w[s])&&P(t,n-=I[s],a),L(t,s=N(--i),r),0!==(a=k[s])&&P(t,i-=T[s],a)),o<t.last_lit;);L(t,m,e)}function Y(t,e){var r,i,n,s=e.dyn_tree,a=e.stat_desc.static_tree,o=e.stat_desc.has_stree,h=e.stat_desc.elems,u=-1;for(t.heap_len=0,t.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(t.heap[++t.heap_len]=u=r,t.depth[r]=0):s[2*r+1]=0;for(;t.heap_len<2;)s[2*(n=t.heap[++t.heap_len]=u<2?++u:0)]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=a[2*n+1]);for(e.max_code=u,r=t.heap_len>>1;1<=r;r--)G(t,s,r);for(n=h;r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],G(t,s,1),i=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=i,s[2*n]=s[2*r]+s[2*i],t.depth[n]=(t.depth[r]>=t.depth[i]?t.depth[r]:t.depth[i])+1,s[2*r+1]=s[2*i+1]=n,t.heap[1]=n++,G(t,s,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t,e){var r,i,n,s,a,o,h=e.dyn_tree,u=e.max_code,l=e.stat_desc.static_tree,f=e.stat_desc.has_stree,d=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,m=0;for(s=0;s<=g;s++)t.bl_count[s]=0;for(h[2*t.heap[t.heap_max]+1]=0,r=t.heap_max+1;r<_;r++)p<(s=h[2*h[2*(i=t.heap[r])+1]+1]+1)&&(s=p,m++),h[2*i+1]=s,u<i||(t.bl_count[s]++,a=0,c<=i&&(a=d[i-c]),o=h[2*i],t.opt_len+=o*(s+a),f&&(t.static_len+=o*(l[2*i+1]+a)));if(0!==m){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(i=t.bl_count[s];0!==i;)u<(n=t.heap[--r])||(h[2*n+1]!==s&&(t.opt_len+=(s-h[2*n+1])*h[2*n],h[2*n+1]=s),i--)}}(t,e),Z(s,u,t.bl_count)}function X(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),e[2*(r+1)+1]=65535,i=0;i<=r;i++)n=a,a=e[2*(i+1)+1],++o<h&&n===a||(o<u?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[2*b]++):o<=10?t.bl_tree[2*v]++:t.bl_tree[2*y]++,s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4))}function V(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),i=0;i<=r;i++)if(n=a,a=e[2*(i+1)+1],!(++o<h&&n===a)){if(o<u)for(;L(t,n,t.bl_tree),0!=--o;);else 0!==n?(n!==s&&(L(t,n,t.bl_tree),o--),L(t,b,t.bl_tree),P(t,o-3,2)):o<=10?(L(t,v,t.bl_tree),P(t,o-3,3)):(L(t,y,t.bl_tree),P(t,o-11,7));s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4)}}i(T);var q=!1;function J(t,e,r,i){P(t,(s<<1)+(i?1:0),3),function(t,e,r,i){M(t),i&&(U(t,r),U(t,~r)),n.arraySet(t.pending_buf,t.window,e,r,t.pending),t.pending+=r}(t,e,r,!0)}r._tr_init=function(t){q||(function(){var t,e,r,i,n,s=new Array(g+1);for(i=r=0;i<a-1;i++)for(I[i]=r,t=0;t<1<<w[i];t++)A[r++]=i;for(A[r-1]=i,i=n=0;i<16;i++)for(T[i]=n,t=0;t<1<<k[i];t++)E[n++]=i;for(n>>=7;i<f;i++)for(T[i]=n<<7,t=0;t<1<<k[i]-7;t++)E[256+n++]=i;for(e=0;e<=g;e++)s[e]=0;for(t=0;t<=143;)z[2*t+1]=8,t++,s[8]++;for(;t<=255;)z[2*t+1]=9,t++,s[9]++;for(;t<=279;)z[2*t+1]=7,t++,s[7]++;for(;t<=287;)z[2*t+1]=8,t++,s[8]++;for(Z(z,l+1,s),t=0;t<f;t++)C[2*t+1]=5,C[2*t]=j(t,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,d,p)}(),q=!0),t.l_desc=new F(t.dyn_ltree,O),t.d_desc=new F(t.dyn_dtree,B),t.bl_desc=new F(t.bl_tree,R),t.bi_buf=0,t.bi_valid=0,W(t)},r._tr_stored_block=J,r._tr_flush_block=function(t,e,r,i){var n,s,a=0;0<t.level?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,r=4093624447;for(e=0;e<=31;e++,r>>>=1)if(1&r&&0!==t.dyn_ltree[2*e])return o;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return h;for(e=32;e<u;e++)if(0!==t.dyn_ltree[2*e])return h;return o}(t)),Y(t,t.l_desc),Y(t,t.d_desc),a=function(t){var e;for(X(t,t.dyn_ltree,t.l_desc.max_code),X(t,t.dyn_dtree,t.d_desc.max_code),Y(t,t.bl_desc),e=d-1;3<=e&&0===t.bl_tree[2*S[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),n=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=n&&(n=s)):n=s=r+5,r+4<=n&&-1!==e?J(t,e,r,i):4===t.strategy||s===n?(P(t,2+(i?1:0),3),K(t,z,C)):(P(t,4+(i?1:0),3),function(t,e,r,i){var n;for(P(t,e-257,5),P(t,r-1,5),P(t,i-4,4),n=0;n<i;n++)P(t,t.bl_tree[2*S[n]+1],3);V(t,t.dyn_ltree,e-1),V(t,t.dyn_dtree,r-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,a+1),K(t,t.dyn_ltree,t.dyn_dtree)),W(t),i&&M(t)},r._tr_tally=function(t,e,r){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&r,t.last_lit++,0===e?t.dyn_ltree[2*r]++:(t.matches++,e--,t.dyn_ltree[2*(A[r]+u+1)]++,t.dyn_dtree[2*N(e)]++),t.last_lit===t.lit_bufsize-1},r._tr_align=function(t){P(t,2,3),L(t,m,z),function(t){16===t.bi_valid?(U(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},{"../utils/common":41}],53:[function(t,e,r){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,e,r){"use strict";e.exports="function"==typeof setImmediate?setImmediate:function(){var t=[].slice.apply(arguments);t.splice(1,0,0),setTimeout.apply(null,t)}},{}]},{},[10])(10)});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ })

}]);