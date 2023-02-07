"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEvent = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["private"] = 0] = "private";
    MessageType[MessageType["room"] = 1] = "room";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class ChatEvent {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ChatEvent = ChatEvent;
