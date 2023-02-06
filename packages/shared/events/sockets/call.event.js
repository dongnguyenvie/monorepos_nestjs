"use strict";
exports.__esModule = true;
exports.CallEvent = void 0;
var CallEvent = /** @class */ (function () {
    function CallEvent(partial) {
        Object.assign(this, partial);
    }
    Object.defineProperty(CallEvent.prototype, "expose", {
        get: function () {
            return {
                roomId: this.roomId,
                initiator: this.initiator,
                callerId: this.callerId,
                signal: this.signal,
                socketId: this.socketId,
                reconnect: this.reconnect
            };
        },
        enumerable: false,
        configurable: true
    });
    return CallEvent;
}());
exports.CallEvent = CallEvent;
