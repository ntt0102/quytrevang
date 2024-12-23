export function encodeEncapMessage(message) {
  let bb = popByteBuffer();
  _encodeEncapMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeEncapMessage(message, bb) {
  // optional int32 type = 1;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($type));
  }

  // optional bytes payload = 2;
  let $payload = message.payload;
  if ($payload !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $payload.length), writeBytes(bb, $payload);
  }
}

export function decodeEncapMessage(binary) {
  return _decodeEncapMessage(wrapByteBuffer(binary));
}

function _decodeEncapMessage(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 type = 1;
      case 1: {
        message.type = readVarint32(bb);
        break;
      }

      // optional bytes payload = 2;
      case 2: {
        message.payload = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeTick(message) {
  let bb = popByteBuffer();
  _encodeTick(message, bb);
  return toUint8Array(bb);
}

function _encodeTick(message, bb) {
  // optional string symbol = 1;
  let $symbol = message.symbol;
  if ($symbol !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $symbol);
  }

  // optional double matchPrice = 2;
  let $matchPrice = message.matchPrice;
  if ($matchPrice !== undefined) {
    writeVarint32(bb, 17);
    writeDouble(bb, $matchPrice);
  }

  // optional double matchQtty = 3;
  let $matchQtty = message.matchQtty;
  if ($matchQtty !== undefined) {
    writeVarint32(bb, 25);
    writeDouble(bb, $matchQtty);
  }

  // optional google.protobuf.Timestamp time = 4;
  let $time = message.time;
  if ($time !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodegoogle.protobuf.Timestamp($time, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int32 side = 5;
  let $side = message.side;
  if ($side !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($side));
  }

  // optional int32 session = 6;
  let $session = message.session;
  if ($session !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($session));
  }
}

export function decodeTick(binary) {
  return _decodeTick(wrapByteBuffer(binary));
}

function _decodeTick(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string symbol = 1;
      case 1: {
        message.symbol = readString(bb, readVarint32(bb));
        break;
      }

      // optional double matchPrice = 2;
      case 2: {
        message.matchPrice = readDouble(bb);
        break;
      }

      // optional double matchQtty = 3;
      case 3: {
        message.matchQtty = readDouble(bb);
        break;
      }

      // optional google.protobuf.Timestamp time = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.time = _decodegoogle.protobuf.Timestamp(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 side = 5;
      case 5: {
        message.side = readVarint32(bb);
        break;
      }

      // optional int32 session = 6;
      case 6: {
        message.session = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeMarketIndex(message) {
  let bb = popByteBuffer();
  _encodeMarketIndex(message, bb);
  return toUint8Array(bb);
}

function _encodeMarketIndex(message, bb) {
  // optional string marketID = 1;
  let $marketID = message.marketID;
  if ($marketID !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $marketID);
  }

  // optional float totalTrade = 2;
  let $totalTrade = message.totalTrade;
  if ($totalTrade !== undefined) {
    writeVarint32(bb, 21);
    writeFloat(bb, $totalTrade);
  }

  // optional double totalShareTraded = 3;
  let $totalShareTraded = message.totalShareTraded;
  if ($totalShareTraded !== undefined) {
    writeVarint32(bb, 25);
    writeDouble(bb, $totalShareTraded);
  }

  // optional double totalValueTraded = 4;
  let $totalValueTraded = message.totalValueTraded;
  if ($totalValueTraded !== undefined) {
    writeVarint32(bb, 33);
    writeDouble(bb, $totalValueTraded);
  }

  // optional float advance = 5;
  let $advance = message.advance;
  if ($advance !== undefined) {
    writeVarint32(bb, 45);
    writeFloat(bb, $advance);
  }

  // optional float decline = 6;
  let $decline = message.decline;
  if ($decline !== undefined) {
    writeVarint32(bb, 53);
    writeFloat(bb, $decline);
  }

  // optional float noChange = 7;
  let $noChange = message.noChange;
  if ($noChange !== undefined) {
    writeVarint32(bb, 61);
    writeFloat(bb, $noChange);
  }

  // optional float indexValue = 8;
  let $indexValue = message.indexValue;
  if ($indexValue !== undefined) {
    writeVarint32(bb, 69);
    writeFloat(bb, $indexValue);
  }

  // optional float changed = 9;
  let $changed = message.changed;
  if ($changed !== undefined) {
    writeVarint32(bb, 77);
    writeFloat(bb, $changed);
  }

  // optional int64 tradingTime = 10;
  let $tradingTime = message.tradingTime;
  if ($tradingTime !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $tradingTime);
  }

  // optional int64 tradingDate = 11;
  let $tradingDate = message.tradingDate;
  if ($tradingDate !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $tradingDate);
  }

  // optional string floorCode = 12;
  let $floorCode = message.floorCode;
  if ($floorCode !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $floorCode);
  }

  // optional float marketIndex = 13;
  let $marketIndex = message.marketIndex;
  if ($marketIndex !== undefined) {
    writeVarint32(bb, 109);
    writeFloat(bb, $marketIndex);
  }

  // optional float priorMarketIndex = 14;
  let $priorMarketIndex = message.priorMarketIndex;
  if ($priorMarketIndex !== undefined) {
    writeVarint32(bb, 117);
    writeFloat(bb, $priorMarketIndex);
  }

  // optional float highestIndex = 15;
  let $highestIndex = message.highestIndex;
  if ($highestIndex !== undefined) {
    writeVarint32(bb, 125);
    writeFloat(bb, $highestIndex);
  }

  // optional float lowestIndex = 16;
  let $lowestIndex = message.lowestIndex;
  if ($lowestIndex !== undefined) {
    writeVarint32(bb, 133);
    writeFloat(bb, $lowestIndex);
  }

  // optional float shareTraded = 17;
  let $shareTraded = message.shareTraded;
  if ($shareTraded !== undefined) {
    writeVarint32(bb, 141);
    writeFloat(bb, $shareTraded);
  }

  // optional float status = 18;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 149);
    writeFloat(bb, $status);
  }

  // optional float sequence = 19;
  let $sequence = message.sequence;
  if ($sequence !== undefined) {
    writeVarint32(bb, 157);
    writeFloat(bb, $sequence);
  }

  // optional float predictionMarketIndex = 20;
  let $predictionMarketIndex = message.predictionMarketIndex;
  if ($predictionMarketIndex !== undefined) {
    writeVarint32(bb, 165);
    writeFloat(bb, $predictionMarketIndex);
  }

  // optional int32 indexName = 21;
  let $indexName = message.indexName;
  if ($indexName !== undefined) {
    writeVarint32(bb, 168);
    writeVarint64(bb, intToLong($indexName));
  }

  // optional int32 tradingSessionId = 22;
  let $tradingSessionId = message.tradingSessionId;
  if ($tradingSessionId !== undefined) {
    writeVarint32(bb, 176);
    writeVarint64(bb, intToLong($tradingSessionId));
  }

  // optional int64 fluctuationUpperLimitIssueCount = 23;
  let $fluctuationUpperLimitIssueCount = message.fluctuationUpperLimitIssueCount;
  if ($fluctuationUpperLimitIssueCount !== undefined) {
    writeVarint32(bb, 184);
    writeVarint64(bb, $fluctuationUpperLimitIssueCount);
  }

  // optional int64 fluctuationLowerLimitIssueCount = 24;
  let $fluctuationLowerLimitIssueCount = message.fluctuationLowerLimitIssueCount;
  if ($fluctuationLowerLimitIssueCount !== undefined) {
    writeVarint32(bb, 192);
    writeVarint64(bb, $fluctuationLowerLimitIssueCount);
  }

  // optional int64 fluctuationUpIssueVolume = 25;
  let $fluctuationUpIssueVolume = message.fluctuationUpIssueVolume;
  if ($fluctuationUpIssueVolume !== undefined) {
    writeVarint32(bb, 200);
    writeVarint64(bb, $fluctuationUpIssueVolume);
  }

  // optional int64 fluctuationDownIssueVolume = 26;
  let $fluctuationDownIssueVolume = message.fluctuationDownIssueVolume;
  if ($fluctuationDownIssueVolume !== undefined) {
    writeVarint32(bb, 208);
    writeVarint64(bb, $fluctuationDownIssueVolume);
  }

  // optional int64 fluctuationSteadinessIssueVolume = 27;
  let $fluctuationSteadinessIssueVolume = message.fluctuationSteadinessIssueVolume;
  if ($fluctuationSteadinessIssueVolume !== undefined) {
    writeVarint32(bb, 216);
    writeVarint64(bb, $fluctuationSteadinessIssueVolume);
  }
}

export function decodeMarketIndex(binary) {
  return _decodeMarketIndex(wrapByteBuffer(binary));
}

function _decodeMarketIndex(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string marketID = 1;
      case 1: {
        message.marketID = readString(bb, readVarint32(bb));
        break;
      }

      // optional float totalTrade = 2;
      case 2: {
        message.totalTrade = readFloat(bb);
        break;
      }

      // optional double totalShareTraded = 3;
      case 3: {
        message.totalShareTraded = readDouble(bb);
        break;
      }

      // optional double totalValueTraded = 4;
      case 4: {
        message.totalValueTraded = readDouble(bb);
        break;
      }

      // optional float advance = 5;
      case 5: {
        message.advance = readFloat(bb);
        break;
      }

      // optional float decline = 6;
      case 6: {
        message.decline = readFloat(bb);
        break;
      }

      // optional float noChange = 7;
      case 7: {
        message.noChange = readFloat(bb);
        break;
      }

      // optional float indexValue = 8;
      case 8: {
        message.indexValue = readFloat(bb);
        break;
      }

      // optional float changed = 9;
      case 9: {
        message.changed = readFloat(bb);
        break;
      }

      // optional int64 tradingTime = 10;
      case 10: {
        message.tradingTime = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 tradingDate = 11;
      case 11: {
        message.tradingDate = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string floorCode = 12;
      case 12: {
        message.floorCode = readString(bb, readVarint32(bb));
        break;
      }

      // optional float marketIndex = 13;
      case 13: {
        message.marketIndex = readFloat(bb);
        break;
      }

      // optional float priorMarketIndex = 14;
      case 14: {
        message.priorMarketIndex = readFloat(bb);
        break;
      }

      // optional float highestIndex = 15;
      case 15: {
        message.highestIndex = readFloat(bb);
        break;
      }

      // optional float lowestIndex = 16;
      case 16: {
        message.lowestIndex = readFloat(bb);
        break;
      }

      // optional float shareTraded = 17;
      case 17: {
        message.shareTraded = readFloat(bb);
        break;
      }

      // optional float status = 18;
      case 18: {
        message.status = readFloat(bb);
        break;
      }

      // optional float sequence = 19;
      case 19: {
        message.sequence = readFloat(bb);
        break;
      }

      // optional float predictionMarketIndex = 20;
      case 20: {
        message.predictionMarketIndex = readFloat(bb);
        break;
      }

      // optional int32 indexName = 21;
      case 21: {
        message.indexName = readVarint32(bb);
        break;
      }

      // optional int32 tradingSessionId = 22;
      case 22: {
        message.tradingSessionId = readVarint32(bb);
        break;
      }

      // optional int64 fluctuationUpperLimitIssueCount = 23;
      case 23: {
        message.fluctuationUpperLimitIssueCount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 fluctuationLowerLimitIssueCount = 24;
      case 24: {
        message.fluctuationLowerLimitIssueCount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 fluctuationUpIssueVolume = 25;
      case 25: {
        message.fluctuationUpIssueVolume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 fluctuationDownIssueVolume = 26;
      case 26: {
        message.fluctuationDownIssueVolume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 fluctuationSteadinessIssueVolume = 27;
      case 27: {
        message.fluctuationSteadinessIssueVolume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

function pushTemporaryLength(bb) {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
