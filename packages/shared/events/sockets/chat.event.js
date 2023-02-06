"use strict";
exports.__esModule = true;
exports.ChatEvent = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["private"] = 0] = "private";
    MessageType[MessageType["room"] = 1] = "room";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var ChatEvent = /** @class */ (function () {
    function ChatEvent(partial) {
        Object.assign(this, partial);
    }
    return ChatEvent;
}());
exports.ChatEvent = ChatEvent;
