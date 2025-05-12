/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const models = $root.models = (() => {

    /**
     * Namespace models.
     * @exports models
     * @namespace
     */
    const models = {};

    models.EncapMessage = (function() {

        /**
         * Properties of an EncapMessage.
         * @memberof models
         * @interface IEncapMessage
         * @property {number|null} [type] EncapMessage type
         * @property {Uint8Array|null} [payload] EncapMessage payload
         * @property {models.IEventContext|null} [context] EncapMessage context
         */

        /**
         * Constructs a new EncapMessage.
         * @memberof models
         * @classdesc Represents an EncapMessage.
         * @implements IEncapMessage
         * @constructor
         * @param {models.IEncapMessage=} [properties] Properties to set
         */
        function EncapMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EncapMessage type.
         * @member {number} type
         * @memberof models.EncapMessage
         * @instance
         */
        EncapMessage.prototype.type = 0;

        /**
         * EncapMessage payload.
         * @member {Uint8Array} payload
         * @memberof models.EncapMessage
         * @instance
         */
        EncapMessage.prototype.payload = $util.newBuffer([]);

        /**
         * EncapMessage context.
         * @member {models.IEventContext|null|undefined} context
         * @memberof models.EncapMessage
         * @instance
         */
        EncapMessage.prototype.context = null;

        /**
         * Creates a new EncapMessage instance using the specified properties.
         * @function create
         * @memberof models.EncapMessage
         * @static
         * @param {models.IEncapMessage=} [properties] Properties to set
         * @returns {models.EncapMessage} EncapMessage instance
         */
        EncapMessage.create = function create(properties) {
            return new EncapMessage(properties);
        };

        /**
         * Encodes the specified EncapMessage message. Does not implicitly {@link models.EncapMessage.verify|verify} messages.
         * @function encode
         * @memberof models.EncapMessage
         * @static
         * @param {models.IEncapMessage} message EncapMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EncapMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
            if (message.context != null && Object.hasOwnProperty.call(message, "context"))
                $root.models.EventContext.encode(message.context, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EncapMessage message, length delimited. Does not implicitly {@link models.EncapMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof models.EncapMessage
         * @static
         * @param {models.IEncapMessage} message EncapMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EncapMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EncapMessage message from the specified reader or buffer.
         * @function decode
         * @memberof models.EncapMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {models.EncapMessage} EncapMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EncapMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.models.EncapMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.payload = reader.bytes();
                        break;
                    }
                case 3: {
                        message.context = $root.models.EventContext.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EncapMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof models.EncapMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {models.EncapMessage} EncapMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EncapMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EncapMessage message.
         * @function verify
         * @memberof models.EncapMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EncapMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            if (message.context != null && message.hasOwnProperty("context")) {
                let error = $root.models.EventContext.verify(message.context);
                if (error)
                    return "context." + error;
            }
            return null;
        };

        /**
         * Creates an EncapMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof models.EncapMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {models.EncapMessage} EncapMessage
         */
        EncapMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.models.EncapMessage)
                return object;
            let message = new $root.models.EncapMessage();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length >= 0)
                    message.payload = object.payload;
            if (object.context != null) {
                if (typeof object.context !== "object")
                    throw TypeError(".models.EncapMessage.context: object expected");
                message.context = $root.models.EventContext.fromObject(object.context);
            }
            return message;
        };

        /**
         * Creates a plain object from an EncapMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof models.EncapMessage
         * @static
         * @param {models.EncapMessage} message EncapMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EncapMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = 0;
                if (options.bytes === String)
                    object.payload = "";
                else {
                    object.payload = [];
                    if (options.bytes !== Array)
                        object.payload = $util.newBuffer(object.payload);
                }
                object.context = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            if (message.context != null && message.hasOwnProperty("context"))
                object.context = $root.models.EventContext.toObject(message.context, options);
            return object;
        };

        /**
         * Converts this EncapMessage to JSON.
         * @function toJSON
         * @memberof models.EncapMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EncapMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EncapMessage
         * @function getTypeUrl
         * @memberof models.EncapMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EncapMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/models.EncapMessage";
        };

        return EncapMessage;
    })();

    models.EventContext = (function() {

        /**
         * Properties of an EventContext.
         * @memberof models
         * @interface IEventContext
         * @property {number|null} [action] EventContext action
         * @property {string|null} [source] EventContext source
         */

        /**
         * Constructs a new EventContext.
         * @memberof models
         * @classdesc Represents an EventContext.
         * @implements IEventContext
         * @constructor
         * @param {models.IEventContext=} [properties] Properties to set
         */
        function EventContext(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventContext action.
         * @member {number} action
         * @memberof models.EventContext
         * @instance
         */
        EventContext.prototype.action = 0;

        /**
         * EventContext source.
         * @member {string} source
         * @memberof models.EventContext
         * @instance
         */
        EventContext.prototype.source = "";

        /**
         * Creates a new EventContext instance using the specified properties.
         * @function create
         * @memberof models.EventContext
         * @static
         * @param {models.IEventContext=} [properties] Properties to set
         * @returns {models.EventContext} EventContext instance
         */
        EventContext.create = function create(properties) {
            return new EventContext(properties);
        };

        /**
         * Encodes the specified EventContext message. Does not implicitly {@link models.EventContext.verify|verify} messages.
         * @function encode
         * @memberof models.EventContext
         * @static
         * @param {models.IEventContext} message EventContext message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventContext.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.source);
            return writer;
        };

        /**
         * Encodes the specified EventContext message, length delimited. Does not implicitly {@link models.EventContext.verify|verify} messages.
         * @function encodeDelimited
         * @memberof models.EventContext
         * @static
         * @param {models.IEventContext} message EventContext message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventContext.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EventContext message from the specified reader or buffer.
         * @function decode
         * @memberof models.EventContext
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {models.EventContext} EventContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventContext.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.models.EventContext();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.action = reader.int32();
                        break;
                    }
                case 2: {
                        message.source = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EventContext message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof models.EventContext
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {models.EventContext} EventContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventContext.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EventContext message.
         * @function verify
         * @memberof models.EventContext
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EventContext.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.action != null && message.hasOwnProperty("action"))
                if (!$util.isInteger(message.action))
                    return "action: integer expected";
            if (message.source != null && message.hasOwnProperty("source"))
                if (!$util.isString(message.source))
                    return "source: string expected";
            return null;
        };

        /**
         * Creates an EventContext message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof models.EventContext
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {models.EventContext} EventContext
         */
        EventContext.fromObject = function fromObject(object) {
            if (object instanceof $root.models.EventContext)
                return object;
            let message = new $root.models.EventContext();
            if (object.action != null)
                message.action = object.action | 0;
            if (object.source != null)
                message.source = String(object.source);
            return message;
        };

        /**
         * Creates a plain object from an EventContext message. Also converts values to other types if specified.
         * @function toObject
         * @memberof models.EventContext
         * @static
         * @param {models.EventContext} message EventContext
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventContext.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.action = 0;
                object.source = "";
            }
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = message.action;
            if (message.source != null && message.hasOwnProperty("source"))
                object.source = message.source;
            return object;
        };

        /**
         * Converts this EventContext to JSON.
         * @function toJSON
         * @memberof models.EventContext
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventContext.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventContext
         * @function getTypeUrl
         * @memberof models.EventContext
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/models.EventContext";
        };

        return EventContext;
    })();

    models.Tick = (function() {

        /**
         * Properties of a Tick.
         * @memberof models
         * @interface ITick
         * @property {string|null} [symbol] Tick symbol
         * @property {number|null} [matchPrice] Tick matchPrice
         * @property {number|null} [matchQtty] Tick matchQtty
         * @property {models.ITimestamp|null} [time] Tick time
         * @property {number|null} [side] Tick side
         * @property {number|null} [session] Tick session
         */

        /**
         * Constructs a new Tick.
         * @memberof models
         * @classdesc Represents a Tick.
         * @implements ITick
         * @constructor
         * @param {models.ITick=} [properties] Properties to set
         */
        function Tick(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Tick symbol.
         * @member {string} symbol
         * @memberof models.Tick
         * @instance
         */
        Tick.prototype.symbol = "";

        /**
         * Tick matchPrice.
         * @member {number} matchPrice
         * @memberof models.Tick
         * @instance
         */
        Tick.prototype.matchPrice = 0;

        /**
         * Tick matchQtty.
         * @member {number} matchQtty
         * @memberof models.Tick
         * @instance
         */
        Tick.prototype.matchQtty = 0;

        /**
         * Tick time.
         * @member {models.ITimestamp|null|undefined} time
         * @memberof models.Tick
         * @instance
         */
        Tick.prototype.time = null;

        /**
         * Tick side.
         * @member {number} side
         * @memberof models.Tick
         * @instance
         */
        Tick.prototype.side = 0;

        /**
         * Tick session.
         * @member {number} session
         * @memberof models.Tick
         * @instance
         */
        Tick.prototype.session = 0;

        /**
         * Creates a new Tick instance using the specified properties.
         * @function create
         * @memberof models.Tick
         * @static
         * @param {models.ITick=} [properties] Properties to set
         * @returns {models.Tick} Tick instance
         */
        Tick.create = function create(properties) {
            return new Tick(properties);
        };

        /**
         * Encodes the specified Tick message. Does not implicitly {@link models.Tick.verify|verify} messages.
         * @function encode
         * @memberof models.Tick
         * @static
         * @param {models.ITick} message Tick message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tick.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.symbol != null && Object.hasOwnProperty.call(message, "symbol"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.symbol);
            if (message.matchPrice != null && Object.hasOwnProperty.call(message, "matchPrice"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.matchPrice);
            if (message.matchQtty != null && Object.hasOwnProperty.call(message, "matchQtty"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.matchQtty);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                $root.models.Timestamp.encode(message.time, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.side != null && Object.hasOwnProperty.call(message, "side"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.side);
            if (message.session != null && Object.hasOwnProperty.call(message, "session"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.session);
            return writer;
        };

        /**
         * Encodes the specified Tick message, length delimited. Does not implicitly {@link models.Tick.verify|verify} messages.
         * @function encodeDelimited
         * @memberof models.Tick
         * @static
         * @param {models.ITick} message Tick message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tick.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tick message from the specified reader or buffer.
         * @function decode
         * @memberof models.Tick
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {models.Tick} Tick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tick.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.models.Tick();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.symbol = reader.string();
                        break;
                    }
                case 2: {
                        message.matchPrice = reader.double();
                        break;
                    }
                case 3: {
                        message.matchQtty = reader.double();
                        break;
                    }
                case 4: {
                        message.time = $root.models.Timestamp.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.side = reader.int32();
                        break;
                    }
                case 6: {
                        message.session = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Tick message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof models.Tick
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {models.Tick} Tick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tick.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Tick message.
         * @function verify
         * @memberof models.Tick
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Tick.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                if (!$util.isString(message.symbol))
                    return "symbol: string expected";
            if (message.matchPrice != null && message.hasOwnProperty("matchPrice"))
                if (typeof message.matchPrice !== "number")
                    return "matchPrice: number expected";
            if (message.matchQtty != null && message.hasOwnProperty("matchQtty"))
                if (typeof message.matchQtty !== "number")
                    return "matchQtty: number expected";
            if (message.time != null && message.hasOwnProperty("time")) {
                let error = $root.models.Timestamp.verify(message.time);
                if (error)
                    return "time." + error;
            }
            if (message.side != null && message.hasOwnProperty("side"))
                if (!$util.isInteger(message.side))
                    return "side: integer expected";
            if (message.session != null && message.hasOwnProperty("session"))
                if (!$util.isInteger(message.session))
                    return "session: integer expected";
            return null;
        };

        /**
         * Creates a Tick message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof models.Tick
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {models.Tick} Tick
         */
        Tick.fromObject = function fromObject(object) {
            if (object instanceof $root.models.Tick)
                return object;
            let message = new $root.models.Tick();
            if (object.symbol != null)
                message.symbol = String(object.symbol);
            if (object.matchPrice != null)
                message.matchPrice = Number(object.matchPrice);
            if (object.matchQtty != null)
                message.matchQtty = Number(object.matchQtty);
            if (object.time != null) {
                if (typeof object.time !== "object")
                    throw TypeError(".models.Tick.time: object expected");
                message.time = $root.models.Timestamp.fromObject(object.time);
            }
            if (object.side != null)
                message.side = object.side | 0;
            if (object.session != null)
                message.session = object.session | 0;
            return message;
        };

        /**
         * Creates a plain object from a Tick message. Also converts values to other types if specified.
         * @function toObject
         * @memberof models.Tick
         * @static
         * @param {models.Tick} message Tick
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Tick.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.symbol = "";
                object.matchPrice = 0;
                object.matchQtty = 0;
                object.time = null;
                object.side = 0;
                object.session = 0;
            }
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                object.symbol = message.symbol;
            if (message.matchPrice != null && message.hasOwnProperty("matchPrice"))
                object.matchPrice = options.json && !isFinite(message.matchPrice) ? String(message.matchPrice) : message.matchPrice;
            if (message.matchQtty != null && message.hasOwnProperty("matchQtty"))
                object.matchQtty = options.json && !isFinite(message.matchQtty) ? String(message.matchQtty) : message.matchQtty;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = $root.models.Timestamp.toObject(message.time, options);
            if (message.side != null && message.hasOwnProperty("side"))
                object.side = message.side;
            if (message.session != null && message.hasOwnProperty("session"))
                object.session = message.session;
            return object;
        };

        /**
         * Converts this Tick to JSON.
         * @function toJSON
         * @memberof models.Tick
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Tick.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Tick
         * @function getTypeUrl
         * @memberof models.Tick
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Tick.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/models.Tick";
        };

        return Tick;
    })();

    models.Timestamp = (function() {

        /**
         * Properties of a Timestamp.
         * @memberof models
         * @interface ITimestamp
         * @property {number|Long|null} [seconds] Timestamp seconds
         * @property {number|null} [nanos] Timestamp nanos
         */

        /**
         * Constructs a new Timestamp.
         * @memberof models
         * @classdesc Represents a Timestamp.
         * @implements ITimestamp
         * @constructor
         * @param {models.ITimestamp=} [properties] Properties to set
         */
        function Timestamp(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Timestamp seconds.
         * @member {number|Long} seconds
         * @memberof models.Timestamp
         * @instance
         */
        Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Timestamp nanos.
         * @member {number} nanos
         * @memberof models.Timestamp
         * @instance
         */
        Timestamp.prototype.nanos = 0;

        /**
         * Creates a new Timestamp instance using the specified properties.
         * @function create
         * @memberof models.Timestamp
         * @static
         * @param {models.ITimestamp=} [properties] Properties to set
         * @returns {models.Timestamp} Timestamp instance
         */
        Timestamp.create = function create(properties) {
            return new Timestamp(properties);
        };

        /**
         * Encodes the specified Timestamp message. Does not implicitly {@link models.Timestamp.verify|verify} messages.
         * @function encode
         * @memberof models.Timestamp
         * @static
         * @param {models.ITimestamp} message Timestamp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Timestamp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
            if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
            return writer;
        };

        /**
         * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link models.Timestamp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof models.Timestamp
         * @static
         * @param {models.ITimestamp} message Timestamp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Timestamp message from the specified reader or buffer.
         * @function decode
         * @memberof models.Timestamp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {models.Timestamp} Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Timestamp.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.models.Timestamp();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.seconds = reader.int64();
                        break;
                    }
                case 2: {
                        message.nanos = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Timestamp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof models.Timestamp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {models.Timestamp} Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Timestamp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Timestamp message.
         * @function verify
         * @memberof models.Timestamp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Timestamp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                    return "seconds: integer|Long expected";
            if (message.nanos != null && message.hasOwnProperty("nanos"))
                if (!$util.isInteger(message.nanos))
                    return "nanos: integer expected";
            return null;
        };

        /**
         * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof models.Timestamp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {models.Timestamp} Timestamp
         */
        Timestamp.fromObject = function fromObject(object) {
            if (object instanceof $root.models.Timestamp)
                return object;
            let message = new $root.models.Timestamp();
            if (object.seconds != null)
                if ($util.Long)
                    (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                else if (typeof object.seconds === "string")
                    message.seconds = parseInt(object.seconds, 10);
                else if (typeof object.seconds === "number")
                    message.seconds = object.seconds;
                else if (typeof object.seconds === "object")
                    message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
            if (object.nanos != null)
                message.nanos = object.nanos | 0;
            return message;
        };

        /**
         * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof models.Timestamp
         * @static
         * @param {models.Timestamp} message Timestamp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Timestamp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.seconds = options.longs === String ? "0" : 0;
                object.nanos = 0;
            }
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                if (typeof message.seconds === "number")
                    object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                else
                    object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
            if (message.nanos != null && message.hasOwnProperty("nanos"))
                object.nanos = message.nanos;
            return object;
        };

        /**
         * Converts this Timestamp to JSON.
         * @function toJSON
         * @memberof models.Timestamp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Timestamp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Timestamp
         * @function getTypeUrl
         * @memberof models.Timestamp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/models.Timestamp";
        };

        return Timestamp;
    })();

    return models;
})();

export { $root as default };
