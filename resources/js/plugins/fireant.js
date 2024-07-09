class Encoder {
    constructor(e, t, n, r, o, i, s, a) {
        void 0 === e && (e = new E()),
            void 0 === t && (t = void 0),
            void 0 === n && (n = 100),
            void 0 === r && (r = 2048),
            void 0 === o && (o = !1),
            void 0 === i && (i = !1),
            void 0 === s && (s = !1),
            void 0 === a && (a = !1),
            (this.extensionCodec = e),
            (this.context = t),
            (this.maxDepth = n),
            (this.initialBufferSize = r),
            (this.sortKeys = o),
            (this.forceFloat32 = i),
            (this.ignoreUndefined = s),
            (this.forceIntegerToFloat = a),
            (this.pos = 0),
            (this.view = new DataView(new ArrayBuffer(this.initialBufferSize))),
            (this.bytes = new Uint8Array(this.view.buffer));
    }
    reinitializeState() {
        this.pos = 0;
    }
    encodeSharedRef(e) {
        return (
            this.reinitializeState(),
            this.doEncode(e, 1),
            this.bytes.subarray(0, this.pos)
        );
    }
    encode(e) {
        return (
            this.reinitializeState(),
            this.doEncode(e, 1),
            this.bytes.slice(0, this.pos)
        );
    }
    doEncode(e, t) {
        if (t > this.maxDepth)
            throw new Error("Too deep objects in depth ".concat(t));
        null == e
            ? this.encodeNil()
            : "boolean" === typeof e
            ? this.encodeBoolean(e)
            : "number" === typeof e
            ? this.encodeNumber(e)
            : "string" === typeof e
            ? this.encodeString(e)
            : this.encodeObject(e, t);
    }
    ensureBufferSizeToWrite(e) {
        var t = this.pos + e;
        this.view.byteLength < t && this.resizeBuffer(2 * t);
    }
    resizeBuffer(e) {
        var t = new ArrayBuffer(e),
            n = new Uint8Array(t),
            r = new DataView(t);
        n.set(this.bytes), (this.view = r), (this.bytes = n);
    }
    encodeNil() {
        this.writeU8(192);
    }
    encodeBoolean(e) {
        !1 === e ? this.writeU8(194) : this.writeU8(195);
    }
    encodeNumber(e) {
        Number.isSafeInteger(e) && !this.forceIntegerToFloat
            ? e >= 0
                ? e < 128
                    ? this.writeU8(e)
                    : e < 256
                    ? (this.writeU8(204), this.writeU8(e))
                    : e < 65536
                    ? (this.writeU8(205), this.writeU16(e))
                    : e < 4294967296
                    ? (this.writeU8(206), this.writeU32(e))
                    : (this.writeU8(207), this.writeU64(e))
                : e >= -32
                ? this.writeU8(224 | (e + 32))
                : e >= -128
                ? (this.writeU8(208), this.writeI8(e))
                : e >= -32768
                ? (this.writeU8(209), this.writeI16(e))
                : e >= -2147483648
                ? (this.writeU8(210), this.writeI32(e))
                : (this.writeU8(211), this.writeI64(e))
            : this.forceFloat32
            ? (this.writeU8(202), this.writeF32(e))
            : (this.writeU8(203), this.writeF64(e));
    }
    writeStringHeader(e) {
        if (e < 32) this.writeU8(160 + e);
        else if (e < 256) this.writeU8(217), this.writeU8(e);
        else if (e < 65536) this.writeU8(218), this.writeU16(e);
        else {
            if (!(e < 4294967296))
                throw new Error(
                    "Too long string: ".concat(e, " bytes in UTF-8")
                );
            this.writeU8(219), this.writeU32(e);
        }
    }
    encodeString(e) {
        if (e.length > d) {
            var t = l(e);
            this.ensureBufferSizeToWrite(5 + t),
                this.writeStringHeader(t),
                f(e, this.bytes, this.pos),
                (this.pos += t);
        } else {
            t = l(e);
            this.ensureBufferSizeToWrite(5 + t),
                this.writeStringHeader(t),
                (function (e, t, n) {
                    for (var r = e.length, o = n, i = 0; i < r; ) {
                        var s = e.charCodeAt(i++);
                        if (0 !== (4294967168 & s)) {
                            if (0 === (4294965248 & s))
                                t[o++] = ((s >> 6) & 31) | 192;
                            else {
                                if (s >= 55296 && s <= 56319 && i < r) {
                                    var a = e.charCodeAt(i);
                                    56320 === (64512 & a) &&
                                        (++i,
                                        (s =
                                            ((1023 & s) << 10) +
                                            (1023 & a) +
                                            65536));
                                }
                                0 === (4294901760 & s)
                                    ? ((t[o++] = ((s >> 12) & 15) | 224),
                                      (t[o++] = ((s >> 6) & 63) | 128))
                                    : ((t[o++] = ((s >> 18) & 7) | 240),
                                      (t[o++] = ((s >> 12) & 63) | 128),
                                      (t[o++] = ((s >> 6) & 63) | 128));
                            }
                            t[o++] = (63 & s) | 128;
                        } else t[o++] = s;
                    }
                })(e, this.bytes, this.pos),
                (this.pos += t);
        }
    }
    encodeObject(e, t) {
        var n = this.extensionCodec.tryToEncode(e, this.context);
        if (null != n) this.encodeExtension(n);
        else if (Array.isArray(e)) this.encodeArray(e, t);
        else if (ArrayBuffer.isView(e)) this.encodeBinary(e);
        else {
            if ("object" !== typeof e)
                throw new Error(
                    "Unrecognized object: ".concat(
                        Object.prototype.toString.apply(e)
                    )
                );
            this.encodeMap(e, t);
        }
    }
    encodeBinary(e) {
        var t = e.byteLength;
        if (t < 256) this.writeU8(196), this.writeU8(t);
        else if (t < 65536) this.writeU8(197), this.writeU16(t);
        else {
            if (!(t < 4294967296))
                throw new Error("Too large binary: ".concat(t));
            this.writeU8(198), this.writeU32(t);
        }
        var n = I(e);
        this.writeU8a(n);
    }
    encodeArray(e, t) {
        var n = e.length;
        if (n < 16) this.writeU8(144 + n);
        else if (n < 65536) this.writeU8(220), this.writeU16(n);
        else {
            if (!(n < 4294967296))
                throw new Error("Too large array: ".concat(n));
            this.writeU8(221), this.writeU32(n);
        }
        for (var r = 0, o = e; r < o.length; r++) {
            var i = o[r];
            this.doEncode(i, t + 1);
        }
    }
    countWithoutUndefined(e, t) {
        for (var n = 0, r = 0, o = t; r < o.length; r++) {
            void 0 !== e[o[r]] && n++;
        }
        return n;
    }
    encodeMap(e, t) {
        var n = Object.keys(e);
        this.sortKeys && n.sort();
        var r = this.ignoreUndefined
            ? this.countWithoutUndefined(e, n)
            : n.length;
        if (r < 16) this.writeU8(128 + r);
        else if (r < 65536) this.writeU8(222), this.writeU16(r);
        else {
            if (!(r < 4294967296))
                throw new Error("Too large map object: ".concat(r));
            this.writeU8(223), this.writeU32(r);
        }
        for (var o = 0, i = n; o < i.length; o++) {
            var s = i[o],
                a = e[s];
            (this.ignoreUndefined && void 0 === a) ||
                (this.encodeString(s), this.doEncode(a, t + 1));
        }
    }
    encodeExtension(e) {
        var t = e.data.length;
        if (1 === t) this.writeU8(212);
        else if (2 === t) this.writeU8(213);
        else if (4 === t) this.writeU8(214);
        else if (8 === t) this.writeU8(215);
        else if (16 === t) this.writeU8(216);
        else if (t < 256) this.writeU8(199), this.writeU8(t);
        else if (t < 65536) this.writeU8(200), this.writeU16(t);
        else {
            if (!(t < 4294967296))
                throw new Error("Too large extension object: ".concat(t));
            this.writeU8(201), this.writeU32(t);
        }
        this.writeI8(e.type), this.writeU8a(e.data);
    }
    writeU8(e) {
        this.ensureBufferSizeToWrite(1),
            this.view.setUint8(this.pos, e),
            this.pos++;
    }
    writeU8a(e) {
        var t = e.length;
        this.ensureBufferSizeToWrite(t),
            this.bytes.set(e, this.pos),
            (this.pos += t);
    }
    writeI8(e) {
        this.ensureBufferSizeToWrite(1),
            this.view.setInt8(this.pos, e),
            this.pos++;
    }
    writeU16(e) {
        this.ensureBufferSizeToWrite(2),
            this.view.setUint16(this.pos, e),
            (this.pos += 2);
    }
    writeI16(e) {
        this.ensureBufferSizeToWrite(2),
            this.view.setInt16(this.pos, e),
            (this.pos += 2);
    }
    writeU32(e) {
        this.ensureBufferSizeToWrite(4),
            this.view.setUint32(this.pos, e),
            (this.pos += 4);
    }
    writeI32(e) {
        this.ensureBufferSizeToWrite(4),
            this.view.setInt32(this.pos, e),
            (this.pos += 4);
    }
    writeF32(e) {
        this.ensureBufferSizeToWrite(4),
            this.view.setFloat32(this.pos, e),
            (this.pos += 4);
    }
    writeF64(e) {
        this.ensureBufferSizeToWrite(8),
            this.view.setFloat64(this.pos, e),
            (this.pos += 8);
    }
    writeU64(e) {
        this.ensureBufferSizeToWrite(8),
            (function (e, t, n) {
                var r = n / 4294967296,
                    o = n;
                e.setUint32(t, r), e.setUint32(t + 4, o);
            })(this.view, this.pos, e),
            (this.pos += 8);
    }
    writeI64(e) {
        this.ensureBufferSizeToWrite(8),
            a(this.view, this.pos, e),
            (this.pos += 8);
    }
}

class Decoder {
    constructor(e, t, n, r, o, i, a, c) {
        void 0 === e && (e = new E()),
            void 0 === t && (t = undefined),
            void 0 === n && (n = 4294967295),
            void 0 === r && (r = 4294967295),
            void 0 === o && (o = 4294967295),
            void 0 === i && (i = 4294967295),
            void 0 === a && (a = 4294967295),
            void 0 === c && (c = undefined),
            (this.extensionCodec = e),
            (this.context = t),
            (this.maxStrLength = n),
            (this.maxBinLength = r),
            (this.maxArrayLength = o),
            (this.maxMapLength = i),
            (this.maxExtLength = a),
            (this.keyDecoder = c),
            (this.totalPos = 0),
            (this.pos = 0),
            (this.view = undefined),
            (this.bytes = undefined),
            (this.headByte = -1),
            (this.stack = []);
    }
    reinitializeState() {
        (this.totalPos = 0), (this.headByte = -1), (this.stack.length = 0);
    }
    setBuffer(e) {
        (this.bytes = I(e)),
            (this.view = (function (e) {
                if (e instanceof ArrayBuffer) return new DataView(e);
                var t = I(e);
                return new DataView(t.buffer, t.byteOffset, t.byteLength);
            })(this.bytes)),
            (this.pos = 0);
    }
    appendBuffer(e) {
        if (-1 !== this.headByte || this.hasRemaining(1)) {
            var t = this.bytes.subarray(this.pos),
                n = I(e),
                r = new Uint8Array(t.length + n.length);
            r.set(t), r.set(n, t.length), this.setBuffer(r);
        } else this.setBuffer(e);
    }
    hasRemaining(e) {
        return this.view.byteLength - this.pos >= e;
    }
    createExtraByteError(e) {
        var t = this.view,
            n = this.pos;
        return new RangeError(
            "Extra "
                .concat(t.byteLength - n, " of ")
                .concat(t.byteLength, " byte(s) found at buffer[")
                .concat(e, "]")
        );
    }
    decode(e) {
        this.reinitializeState(), this.setBuffer(e);
        var t = this.doDecodeSync();
        if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
        return t;
    }
    decodeMulti(e) {
        return A(this, function (t) {
            switch (t.label) {
                case 0:
                    this.reinitializeState(), this.setBuffer(e), (t.label = 1);
                case 1:
                    return this.hasRemaining(1)
                        ? [4, this.doDecodeSync()]
                        : [3, 3];
                case 2:
                    return t.sent(), [3, 1];
                case 3:
                    return [2];
            }
        });
    }
    decodeAsync(e) {
        var t, n, r, o;
        return R(this, void 0, void 0, function () {
            var i, s, a, c, h, l, u, d;
            return A(this, function (f) {
                switch (f.label) {
                    case 0:
                        (i = !1), (f.label = 1);
                    case 1:
                        f.trys.push([1, 6, 7, 12]), (t = N(e)), (f.label = 2);
                    case 2:
                        return [4, t.next()];
                    case 3:
                        if ((n = f.sent()).done) return [3, 5];
                        if (((a = n.value), i))
                            throw this.createExtraByteError(this.totalPos);
                        this.appendBuffer(a);
                        try {
                            (s = this.doDecodeSync()), (i = !0);
                        } catch (p) {
                            if (!(p instanceof W)) throw p;
                        }
                        (this.totalPos += this.pos), (f.label = 4);
                    case 4:
                        return [3, 2];
                    case 5:
                        return [3, 12];
                    case 6:
                        return (
                            (c = f.sent()),
                            (r = {
                                error: c,
                            }),
                            [3, 12]
                        );
                    case 7:
                        return (
                            f.trys.push([7, , 10, 11]),
                            n && !n.done && (o = t.return)
                                ? [4, o.call(t)]
                                : [3, 9]
                        );
                    case 8:
                        f.sent(), (f.label = 9);
                    case 9:
                        return [3, 11];
                    case 10:
                        if (r) throw r.error;
                        return [7];
                    case 11:
                        return [7];
                    case 12:
                        if (i) {
                            if (this.hasRemaining(1))
                                throw this.createExtraByteError(this.totalPos);
                            return [2, s];
                        }
                        throw (
                            ((l = (h = this).headByte),
                            (u = h.pos),
                            (d = h.totalPos),
                            new RangeError(
                                "Insufficient data in parsing "
                                    .concat(T(l), " at ")
                                    .concat(d, " (")
                                    .concat(u, " in the current buffer)")
                            ))
                        );
                }
            });
        });
    }
    decodeArrayStream(e) {
        return this.decodeMultiAsync(e, !0);
    }
    decodeStream(e) {
        return this.decodeMultiAsync(e, !1);
    }
    decodeMultiAsync(e, t) {
        return O(this, arguments, function () {
            var n, r, o, i, s, a, c, h, l;
            return A(this, function (u) {
                switch (u.label) {
                    case 0:
                        (n = t), (r = -1), (u.label = 1);
                    case 1:
                        u.trys.push([1, 13, 14, 19]), (o = N(e)), (u.label = 2);
                    case 2:
                        return [4, B(o.next())];
                    case 3:
                        if ((i = u.sent()).done) return [3, 12];
                        if (((s = i.value), t && 0 === r))
                            throw this.createExtraByteError(this.totalPos);
                        this.appendBuffer(s),
                            n &&
                                ((r = this.readArraySize()),
                                (n = !1),
                                this.complete()),
                            (u.label = 4);
                    case 4:
                        u.trys.push([4, 9, , 10]), (u.label = 5);
                    case 5:
                        return [4, B(this.doDecodeSync())];
                    case 6:
                        return [4, u.sent()];
                    case 7:
                        return u.sent(), 0 === --r ? [3, 8] : [3, 5];
                    case 8:
                        return [3, 10];
                    case 9:
                        if (!((a = u.sent()) instanceof W)) throw a;
                        return [3, 10];
                    case 10:
                        (this.totalPos += this.pos), (u.label = 11);
                    case 11:
                        return [3, 2];
                    case 12:
                        return [3, 19];
                    case 13:
                        return (
                            (c = u.sent()),
                            (h = {
                                error: c,
                            }),
                            [3, 19]
                        );
                    case 14:
                        return (
                            u.trys.push([14, , 17, 18]),
                            i && !i.done && (l = o.return)
                                ? [4, B(l.call(o))]
                                : [3, 16]
                        );
                    case 15:
                        u.sent(), (u.label = 16);
                    case 16:
                        return [3, 18];
                    case 17:
                        if (h) throw h.error;
                        return [7];
                    case 18:
                        return [7];
                    case 19:
                        return [2];
                }
            });
        });
    }
    doDecodeSync() {
        e: for (;;) {
            var e = this.readHeadByte(),
                t = void 0;
            if (e >= 224) t = e - 256;
            else if (e < 192)
                if (e < 128) t = e;
                else if (e < 144) {
                    if (0 !== (r = e - 128)) {
                        this.pushMapState(r), this.complete();
                        continue e;
                    }
                    t = {};
                } else if (e < 160) {
                    if (0 !== (r = e - 144)) {
                        this.pushArrayState(r), this.complete();
                        continue e;
                    }
                    t = [];
                } else {
                    var n = e - 160;
                    t = this.decodeUtf8String(n, 0);
                }
            else if (192 === e) t = null;
            else if (194 === e) t = !1;
            else if (195 === e) t = !0;
            else if (202 === e) t = this.readF32();
            else if (203 === e) t = this.readF64();
            else if (204 === e) t = this.readU8();
            else if (205 === e) t = this.readU16();
            else if (206 === e) t = this.readU32();
            else if (207 === e) t = this.readU64();
            else if (208 === e) t = this.readI8();
            else if (209 === e) t = this.readI16();
            else if (210 === e) t = this.readI32();
            else if (211 === e) t = this.readI64();
            else if (217 === e) {
                n = this.lookU8();
                t = this.decodeUtf8String(n, 1);
            } else if (218 === e) {
                n = this.lookU16();
                t = this.decodeUtf8String(n, 2);
            } else if (219 === e) {
                n = this.lookU32();
                t = this.decodeUtf8String(n, 4);
            } else if (220 === e) {
                if (0 !== (r = this.readU16())) {
                    this.pushArrayState(r), this.complete();
                    continue e;
                }
                t = [];
            } else if (221 === e) {
                if (0 !== (r = this.readU32())) {
                    this.pushArrayState(r), this.complete();
                    continue e;
                }
                t = [];
            } else if (222 === e) {
                if (0 !== (r = this.readU16())) {
                    this.pushMapState(r), this.complete();
                    continue e;
                }
                t = {};
            } else if (223 === e) {
                if (0 !== (r = this.readU32())) {
                    this.pushMapState(r), this.complete();
                    continue e;
                }
                t = {};
            } else if (196 === e) {
                var r = this.lookU8();
                t = this.decodeBinary(r, 1);
            } else if (197 === e) {
                r = this.lookU16();
                t = this.decodeBinary(r, 2);
            } else if (198 === e) {
                r = this.lookU32();
                t = this.decodeBinary(r, 4);
            } else if (212 === e) t = this.decodeExtension(1, 0);
            else if (213 === e) t = this.decodeExtension(2, 0);
            else if (214 === e) t = this.decodeExtension(4, 0);
            else if (215 === e) t = this.decodeExtension(8, 0);
            else if (216 === e) t = this.decodeExtension(16, 0);
            else if (199 === e) {
                r = this.lookU8();
                t = this.decodeExtension(r, 1);
            } else if (200 === e) {
                r = this.lookU16();
                t = this.decodeExtension(r, 2);
            } else {
                if (201 !== e)
                    throw new w("Unrecognized type byte: ".concat(T(e)));
                r = this.lookU32();
                t = this.decodeExtension(r, 4);
            }
            this.complete();
            for (var o = this.stack; o.length > 0; ) {
                var i = o[o.length - 1];
                if (0 === i.type) {
                    if (
                        ((i.array[i.position] = t),
                        i.position++,
                        i.position !== i.size)
                    )
                        continue e;
                    o.pop(), (t = i.array);
                } else {
                    if (1 === i.type) {
                        if (!j(t))
                            throw new w(
                                "The type of key must be string or number but " +
                                    typeof t
                            );
                        if ("__proto__" === t)
                            throw new w("The key __proto__ is not allowed");
                        (i.key = t), (i.type = 2);
                        continue e;
                    }
                    if (
                        ((i.map[i.key] = t),
                        i.readCount++,
                        i.readCount !== i.size)
                    ) {
                        (i.key = null), (i.type = 1);
                        continue e;
                    }
                    o.pop(), (t = i.map);
                }
            }
            return t;
        }
    }
    readHeadByte() {
        return (
            -1 === this.headByte && (this.headByte = this.readU8()),
            this.headByte
        );
    }
    complete() {
        this.headByte = -1;
    }
    readArraySize() {
        var e = this.readHeadByte();
        switch (e) {
            case 220:
                return this.readU16();
            case 221:
                return this.readU32();
            default:
                if (e < 160) return e - 144;
                throw new w("Unrecognized array type byte: ".concat(T(e)));
        }
    }
    pushMapState(e) {
        if (e > this.maxMapLength)
            throw new w(
                "Max length exceeded: map length ("
                    .concat(e, ") > maxMapLengthLength (")
                    .concat(this.maxMapLength, ")")
            );
        this.stack.push({
            type: 1,
            size: e,
            key: null,
            readCount: 0,
            map: {},
        });
    }
    pushArrayState(e) {
        if (e > this.maxArrayLength)
            throw new w(
                "Max length exceeded: array length ("
                    .concat(e, ") > maxArrayLength (")
                    .concat(this.maxArrayLength, ")")
            );
        this.stack.push({
            type: 0,
            size: e,
            array: new Array(e),
            position: 0,
        });
    }
    decodeUtf8String(e, t) {
        var n;
        if (e > this.maxStrLength)
            throw new w(
                "Max length exceeded: UTF-8 byte length ("
                    .concat(e, ") > maxStrLength (")
                    .concat(this.maxStrLength, ")")
            );
        if (this.bytes.byteLength < this.pos + t + e) throw $;
        var r,
            o = this.pos + t;
        return (
            (r =
                this.stateIsMapKey() &&
                (null === (n = this.keyDecoder) || void 0 === n
                    ? void 0
                    : n.canBeCached(e))
                    ? this.keyDecoder.decode(this.bytes, o, e)
                    : e > d
                    ? (function (e, t, n) {
                          var r = e.subarray(t, t + n);
                          return g.decode(r);
                      })(this.bytes, o, e)
                    : p(this.bytes, o, e)),
            (this.pos += t + e),
            r
        );
    }
    stateIsMapKey() {
        return (
            this.stack.length > 0 &&
            1 === this.stack[this.stack.length - 1].type
        );
    }
    decodeBinary(e, t) {
        if (e > this.maxBinLength)
            throw new w(
                "Max length exceeded: bin length ("
                    .concat(e, ") > maxBinLength (")
                    .concat(this.maxBinLength, ")")
            );
        if (!this.hasRemaining(e + t)) throw $;
        var n = this.pos + t,
            r = this.bytes.subarray(n, n + e);
        return (this.pos += t + e), r;
    }
    decodeExtension(e, t) {
        if (e > this.maxExtLength)
            throw new w(
                "Max length exceeded: ext length ("
                    .concat(e, ") > maxExtLength (")
                    .concat(this.maxExtLength, ")")
            );
        var n = this.view.getInt8(this.pos + t),
            r = this.decodeBinary(e, t + 1);
        return this.extensionCodec.decode(r, n, this.context);
    }
    lookU8() {
        return this.view.getUint8(this.pos);
    }
    lookU16() {
        return this.view.getUint16(this.pos);
    }
    lookU32() {
        return this.view.getUint32(this.pos);
    }
    readU8() {
        var e = this.view.getUint8(this.pos);
        return this.pos++, e;
    }
    readI8() {
        var e = this.view.getInt8(this.pos);
        return this.pos++, e;
    }
    readU16() {
        var e = this.view.getUint16(this.pos);
        return (this.pos += 2), e;
    }
    readI16() {
        var e = this.view.getInt16(this.pos);
        return (this.pos += 2), e;
    }
    readU32() {
        var e = this.view.getUint32(this.pos);
        return (this.pos += 4), e;
    }
    readI32() {
        var e = this.view.getInt32(this.pos);
        return (this.pos += 4), e;
    }
    readU64() {
        var e,
            t,
            n =
                ((e = this.view),
                (t = this.pos),
                4294967296 * e.getUint32(t) + e.getUint32(t + 4));
        return (this.pos += 8), n;
    }
    readI64() {
        var e = c(this.view, this.pos);
        return (this.pos += 8), e;
    }
    readF32() {
        var e = this.view.getFloat32(this.pos);
        return (this.pos += 4), e;
    }
    readF64() {
        var e = this.view.getFloat64(this.pos);
        return (this.pos += 8), e;
    }
}

class E {
    constructor() {
        (this.builtInEncoders = []),
            (this.builtInDecoders = []),
            (this.encoders = []),
            (this.decoders = []),
            this.register(S);
    }
    register(e) {
        var t = e.type,
            n = e.encode,
            r = e.decode;
        if (t >= 0) (this.encoders[t] = n), (this.decoders[t] = r);
        else {
            var o = 1 + t;
            (this.builtInEncoders[o] = n), (this.builtInDecoders[o] = r);
        }
    }

    tryToEncode(e, t) {
        for (var n = 0; n < this.builtInEncoders.length; n++) {
            if (null != (r = this.builtInEncoders[n]))
                if (null != (o = r(e, t))) return new _(-1 - n, o);
        }
        for (n = 0; n < this.encoders.length; n++) {
            var r, o;
            if (null != (r = this.encoders[n]))
                if (null != (o = r(e, t))) return new _(n, o);
        }
        return e instanceof _ ? e : null;
    }

    decode(e, t, n) {
        var r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
        return r ? r(e, t, n) : new _(t, e);
    }
}

class q {
    static write(e) {
        let t = e.byteLength || e.length;
        const n = [];
        do {
            let e = 127 & t;
            (t >>= 7), t > 0 && (e |= 128), n.push(e);
        } while (t > 0);
        t = e.byteLength || e.length;
        const r = new Uint8Array(n.length + t);
        return r.set(n, 0), r.set(e, n.length), r.buffer;
    }
    static parse(e) {
        const t = [],
            n = new Uint8Array(e),
            r = [0, 7, 14, 21, 28];
        for (let o = 0; o < e.byteLength; ) {
            let i,
                s = 0,
                a = 0;
            do {
                (i = n[o + s]), (a |= (127 & i) << r[s]), s++;
            } while (s < Math.min(5, e.byteLength - o) && 0 !== (128 & i));
            if (0 !== (128 & i) && s < 5)
                throw new Error("Cannot read message size.");
            if (5 === s && i > 7)
                throw new Error("Messages bigger than 2GB are not supported.");
            if (!(n.byteLength >= o + s + a))
                // throw new Error("Incomplete message.");
                return [];
            t.push(
                n.slice
                    ? n.slice(o + s, o + s + a)
                    : n.subarray(o + s, o + s + a)
            ),
                (o = o + s + a);
        }
        return t;
    }
}

function _(e, t) {
    (this.type = e), (this.data = t);
}

function l(e) {
    for (var t = e.length, n = 0, r = 0; r < t; ) {
        var o = e.charCodeAt(r++);
        if (0 !== (4294967168 & o))
            if (0 === (4294965248 & o)) n += 2;
            else {
                if (o >= 55296 && o <= 56319 && r < t) {
                    var i = e.charCodeAt(r);
                    56320 === (64512 & i) &&
                        (++r, (o = ((1023 & o) << 10) + (1023 & i) + 65536));
                }
                n += 0 === (4294901760 & o) ? 3 : 4;
            }
        else n++;
    }
    return n;
}

function f(e, t, n) {
    t.set(u.encode(e), n);
}

function I(e) {
    return e instanceof Uint8Array
        ? e
        : ArrayBuffer.isView(e)
        ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
        : e instanceof ArrayBuffer
        ? new Uint8Array(e)
        : Uint8Array.from(e);
}

const S = {
    type: -1,
    encode: function (e) {
        return e instanceof Date
            ? (function (e) {
                  var t,
                      n = e.sec,
                      r = e.nsec;
                  if (n >= 0 && r >= 0 && n <= b) {
                      if (0 === r && n <= m) {
                          var o = new Uint8Array(4);
                          return (
                              (t = new DataView(o.buffer)).setUint32(0, n), o
                          );
                      }
                      var i = n / 4294967296,
                          s = 4294967295 & n;
                      return (
                          (o = new Uint8Array(8)),
                          (t = new DataView(o.buffer)).setUint32(
                              0,
                              (r << 2) | (3 & i)
                          ),
                          t.setUint32(4, s),
                          o
                      );
                  }
                  return (
                      (o = new Uint8Array(12)),
                      (t = new DataView(o.buffer)).setUint32(0, r),
                      a(t, 4, n),
                      o
                  );
              })(
                  (function (e) {
                      var t = e.getTime(),
                          n = Math.floor(t / 1e3),
                          r = 1e6 * (t - 1e3 * n),
                          o = Math.floor(r / 1e9);
                      return {
                          sec: n + o,
                          nsec: r - 1e9 * o,
                      };
                  })(e)
              )
            : null;
    },
    decode: function (e) {
        var t = (function (e) {
            var t = new DataView(e.buffer, e.byteOffset, e.byteLength);
            switch (e.byteLength) {
                case 4:
                    return {
                        sec: t.getUint32(0),
                        nsec: 0,
                    };
                case 8:
                    var n = t.getUint32(0);
                    return {
                        sec: 4294967296 * (3 & n) + t.getUint32(4),
                        nsec: n >>> 2,
                    };
                case 12:
                    return {
                        sec: c(t, 4),
                        nsec: t.getUint32(0),
                    };
                default:
                    throw new w(
                        "Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(
                            e.length
                        )
                    );
            }
        })(e);
        return new Date(1e3 * t.sec + t.nsec / 1e6);
    },
};

const d = 0;

const u = new TextEncoder();

const g = new TextDecoder();

const encoderInstance = new Encoder();
const decoderInstance = new Decoder();

export const bufferEncode = encoderInstance.encode.bind(encoderInstance);
export const bufferDecode = decoderInstance.decode.bind(decoderInstance);
export const { write: bufferWrite, parse: bufferParse } = q;
